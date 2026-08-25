-- EBJV admissions foundation (F-001/F-002). Run with Supabase CLI or SQL editor.
-- The bucket remains private: there is deliberately no public bucket and no public URL policy.

create extension if not exists pgcrypto;

create type public.application_status as enum ('draft', 'submitted', 'under_review', 'contacted', 'accepted', 'declined');
create type public.document_kind as enum ('birth_certificate', 'student_photo', 'previous_report_card');

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  status public.application_status not null default 'draft',
  parent_first_name text not null check (char_length(trim(parent_first_name)) between 1 and 100),
  parent_last_name text not null check (char_length(trim(parent_last_name)) between 1 and 100),
  parent_phone text not null check (char_length(trim(parent_phone)) between 3 and 40),
  parent_email text not null check (char_length(trim(parent_email)) between 3 and 254),
  parent_address text,
  child_first_name text not null check (char_length(trim(child_first_name)) between 1 and 100),
  child_last_name text not null check (char_length(trim(child_last_name)) between 1 and 100),
  child_date_of_birth date not null,
  child_previous_school text,
  requested_program text not null,
  requested_grade text not null,
  school_year text not null,
  admin_notes text,
  matricule text unique
);

create table public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  document_type public.document_kind not null,
  storage_path text not null unique check (storage_path ~ '^[0-9a-f-]{36}/[a-z_]+/[0-9a-f-]{36}\.[a-z0-9]+$'),
  original_filename text not null check (char_length(original_filename) between 1 and 255),
  mime_type text not null check (mime_type in ('application/pdf', 'image/jpeg', 'image/png')),
  file_size integer not null check (file_size > 0 and file_size <= 5242880),
  uploaded_at timestamptz not null default now()
);

create unique index application_one_birth_certificate on public.application_documents(application_id)
  where document_type = 'birth_certificate';
create unique index application_one_student_photo on public.application_documents(application_id)
  where document_type = 'student_photo';
create index applications_status_created_at_idx on public.applications(status, created_at desc);
create index applications_parent_name_idx on public.applications(parent_last_name, parent_first_name);
create index application_documents_application_id_idx on public.application_documents(application_id);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger applications_updated_at before update on public.applications
for each row execute function public.set_updated_at();

-- Creates a draft and returns its database-generated UUID without exposing an application row.
create or replace function public.create_application_draft(payload jsonb)
returns uuid language plpgsql security definer set search_path = public as $$
declare application_id uuid;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  insert into public.applications (
    parent_first_name, parent_last_name, parent_phone, parent_email, parent_address,
    child_first_name, child_last_name, child_date_of_birth, child_previous_school,
    requested_program, requested_grade, school_year
  ) values (
    trim(payload->>'parent_first_name'), trim(payload->>'parent_last_name'), trim(payload->>'parent_phone'), trim(payload->>'parent_email'), nullif(trim(payload->>'parent_address'), ''),
    trim(payload->>'child_first_name'), trim(payload->>'child_last_name'), (payload->>'child_date_of_birth')::date, nullif(trim(payload->>'child_previous_school'), ''),
    trim(payload->>'requested_program'), trim(payload->>'requested_grade'), trim(payload->>'school_year')
  ) returning id into application_id;
  return application_id;
end; $$;
revoke all on function public.create_application_draft(jsonb) from public;
grant execute on function public.create_application_draft(jsonb) to authenticated;

create or replace function public.submit_application(application_id uuid, payload jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  update public.applications set
    parent_first_name = trim(payload->>'parent_first_name'), parent_last_name = trim(payload->>'parent_last_name'),
    parent_phone = trim(payload->>'parent_phone'), parent_email = trim(payload->>'parent_email'), parent_address = nullif(trim(payload->>'parent_address'), ''),
    child_first_name = trim(payload->>'child_first_name'), child_last_name = trim(payload->>'child_last_name'),
    child_date_of_birth = (payload->>'child_date_of_birth')::date, child_previous_school = nullif(trim(payload->>'child_previous_school'), ''),
    requested_program = trim(payload->>'requested_program'), requested_grade = trim(payload->>'requested_grade'), school_year = trim(payload->>'school_year'),
    status = 'submitted', submitted_at = now()
  where id = application_id and owner_id = auth.uid() and status = 'draft';
  if not found then raise exception 'application cannot be submitted'; end if;
end; $$;
revoke all on function public.submit_application(uuid, jsonb) from public;
grant execute on function public.submit_application(uuid, jsonb) to authenticated;

create or replace function public.is_admin() returns boolean language sql stable security definer
set search_path = public as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()) $$;

alter table public.admin_users enable row level security;
alter table public.applications enable row level security;
alter table public.application_documents enable row level security;

-- Anonymous-authenticated applicants may create/update only their own draft/submitted record.
-- They cannot list or read applications; only administrators can select them.
create policy "admins manage admin users" on public.admin_users for all to authenticated using (public.is_admin()) with check (public.is_admin());
-- The public client creates drafts through create_application_draft(), which returns only a UUID.
-- Direct inserts remain available to an authenticated applicant but are still owner-scoped.
create policy "applicants create own applications" on public.applications for insert to authenticated with check (owner_id = auth.uid());
create policy "applicants update own drafts" on public.applications for update to authenticated using (owner_id = auth.uid() and status = 'draft') with check (owner_id = auth.uid() and status = 'draft');
create policy "admins read applications" on public.applications for select to authenticated using (public.is_admin());
create policy "admins update applications" on public.applications for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "applicants add own document metadata" on public.application_documents for insert to authenticated with check (
  exists (select 1 from public.applications a where a.id = application_id and a.owner_id = auth.uid() and a.status = 'draft')
);
create policy "applicants delete own draft document metadata" on public.application_documents for delete to authenticated using (
  exists (select 1 from public.applications a where a.id = application_id and a.owner_id = auth.uid() and a.status = 'draft')
);
create policy "admins read document metadata" on public.application_documents for select to authenticated using (public.is_admin());
create policy "admins manage document metadata" on public.application_documents for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Private application-document bucket. Do not change public to true.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('application-documents', 'application-documents', false, 5242880, array['application/pdf','image/jpeg','image/png'])
on conflict (id) do update set public = false, file_size_limit = 5242880, allowed_mime_types = array['application/pdf','image/jpeg','image/png'];

-- Path format: {application UUID}/{document kind}/{document UUID}.{extension}.
-- Storage object creation is tied to an application owned by the current anonymous-authenticated applicant.
create policy "applicants upload documents to own application" on storage.objects for insert to authenticated with check (
  bucket_id = 'application-documents'
  and name ~ '^[0-9a-f-]{36}/(birth_certificate|student_photo|previous_report_card)/[0-9a-f-]{36}\.(pdf|jpg|png)$'
  and exists (select 1 from public.applications a where a.id::text = (storage.foldername(name))[1] and a.owner_id = auth.uid() and a.status = 'draft')
);
create policy "applicants delete own draft documents" on storage.objects for delete to authenticated using (
  bucket_id = 'application-documents'
  and exists (select 1 from public.applications a where a.id::text = (storage.foldername(name))[1] and a.owner_id = auth.uid() and a.status = 'draft')
);
create policy "admins read application documents" on storage.objects for select to authenticated using (
  bucket_id = 'application-documents' and public.is_admin()
);
create policy "admins manage application documents" on storage.objects for all to authenticated using (
  bucket_id = 'application-documents' and public.is_admin()
) with check (bucket_id = 'application-documents' and public.is_admin());

-- Seed the first admin only from the Supabase SQL editor after creating that Auth user:
-- insert into public.admin_users(user_id) values ('AUTH-USER-UUID-HERE');
-- F-003 intentionally has no generator: TDR/annex require a predefined format, but define none.
