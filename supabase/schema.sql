-- Opportunity Lens — enquiry storage
-- Run this once in the Supabase SQL editor.
-- The public site never writes with the anon key. The API uses the
-- service role, which bypasses row level security. With no policies,
-- the anon and authenticated roles cannot read or write these rows.

create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  organisation text,
  project_type text not null,
  budget text,
  message text not null,
  preferred_contact text,
  status text not null default 'NEW'
    check (status in ('NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED')),
  attachment_count integer not null default 0 check (attachment_count >= 0),
  attachment_paths text[] not null default '{}'
);

alter table public.project_inquiries enable row level security;

insert into storage.buckets (id, name, public, file_size_limit)
values ('project-files', 'project-files', false, 3670016)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit;

-- No storage policies are created for anon or authenticated.
-- Objects stay private. Download them from the Supabase dashboard,
-- or add a signed-URL admin later. Do not make this bucket public.
