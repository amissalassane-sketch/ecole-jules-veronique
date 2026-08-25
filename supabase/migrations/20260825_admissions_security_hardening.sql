-- Security hardening discovered during the admissions foundation audit.
-- Apply after 20260825_admissions_foundation.sql.

-- A public applicant must not create a pre-approved record, inject admin notes,
-- or create a record already marked submitted. The RPC is the public draft path.
drop policy if exists "applicants create own applications" on public.applications;
create policy "applicants create own draft applications" on public.applications for insert to authenticated with check (
  owner_id = auth.uid() and status = 'draft' and submitted_at is null and admin_notes is null and matricule is null
);

-- Allow a signed-in user to check only their own administrator membership. This does
-- not grant them access to any other admin identity or to applications.
create policy "users read own admin membership" on public.admin_users for select to authenticated using (user_id = auth.uid());

-- Metadata must precisely describe the owned Storage object. This stops a client from
-- manually inserting a path for another application/type or mismatching MIME/extension.
create or replace function public.validate_application_document() returns trigger language plpgsql as $$
begin
  if split_part(new.storage_path, '/', 1) <> new.application_id::text
    or split_part(new.storage_path, '/', 2) <> new.document_type::text then
    raise exception 'document path must match application and document type';
  end if;
  if (new.mime_type = 'application/pdf' and new.storage_path !~ '\.pdf$')
    or (new.mime_type = 'image/jpeg' and new.storage_path !~ '\.jpg$')
    or (new.mime_type = 'image/png' and new.storage_path !~ '\.png$') then
    raise exception 'document MIME type must match storage extension';
  end if;
  if new.original_filename ~ '[\\/[:cntrl:]]' then
    raise exception 'unsafe original filename';
  end if;
  return new;
end; $$;
drop trigger if exists application_documents_validate on public.application_documents;
create trigger application_documents_validate before insert or update on public.application_documents
for each row execute function public.validate_application_document();
