# EBJV Supabase setup

This repository contains a **foundation**, not a configured Supabase project. Do not enable the public admissions form until the steps below have been completed and tested.

## 1. Create the Supabase project

1. Create a project in the [Supabase dashboard](https://supabase.com/dashboard).
2. In **Project Settings → API**, copy the **Project URL** and the **publishable / anon key**.
3. Do **not** copy, store, or add the `service_role` key to this frontend project.

## 2. Configure the local frontend

From the repository root:

```bash
cp .env.example .env.local
```

Set only these public browser variables in `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

`.env`, `.env.local`, and `.env.*.local` are ignored by Git. Restart Vite after changing environment variables.

## 3. Apply the database and Storage migrations

Apply every file in `supabase/migrations/` in filename order, using the Supabase SQL editor or Supabase CLI:

1. `20260825_admissions_foundation.sql`
2. `20260825_admissions_security_hardening.sql`

The second migration is required: it hardens applicant insert permissions, validates document metadata/path integrity, and permits a user to verify only their own admin membership.

## 4. Configure authentication

1. In **Authentication → Providers**, enable **Anonymous Sign-Ins**.
2. In **Authentication → Users**, create the first administrator using email/password. The TDR acceptance criterion requires a password of at least 8 characters.
3. Copy that Auth user's UUID.
4. In SQL editor, grant that user administration access:

```sql
insert into public.admin_users(user_id)
values ('AUTH-USER-UUID-HERE');
```

A normal Auth user is not an administrator unless their own Auth UUID is in `admin_users`.

## 5. Verify private document Storage

In **Storage**, verify bucket `application-documents` is private, has a 5 MB limit, and permits only:

- `application/pdf`
- `image/jpeg`
- `image/png`

Never make this bucket public and never use `getPublicUrl()` for application documents. Administrators open documents through a 60-second signed URL after Storage RLS authorization.

## 6. Run and test locally

```bash
npm install
npm run dev
```

In the browser, create a full application, upload required documents, submit with **Finalize at School**, then sign in at `/admin/login` using the seeded administrator. Verify the application and its documents appear in the admin area.

## Required security tests

- A second anonymous applicant cannot read, update, or delete the first applicant's application/documents.
- A normal Auth user outside `admin_users` is redirected from `/admin` and receives no application data through Supabase.
- A document is inaccessible without an authorized signed URL.
- An applicant cannot change a record from `draft` directly to an administrative status.

## F-003

The TDR and annex require a unique matricule in a predefined format but do not define that format. No matricule generator is included. **Implementation blocked pending school-approved matricule format.** Obtain written school approval for the format before adding a database-side generator.
