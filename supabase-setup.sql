-- ============================================================================
-- Thisai IAS Academy — Supabase setup
-- Run this ONCE in your Supabase project: Dashboard → SQL Editor → New query →
-- paste all of this → Run. It creates the table that stores every form
-- submission, and locks it down so the public website can only ADD rows
-- (never read, edit or delete them).
-- ============================================================================

-- 1) The table that holds every registration / enquiry / lead.
create table if not exists public.registrations (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  form        text,          -- which form it came from (batch_register, g4_kit_signup, contact, Group 4 Diagnostic, …)
  name        text,
  phone       text,
  email       text,
  program     text,          -- course / interest chosen
  status      text,          -- current preparation status (if asked)
  message     text,          -- free-text message (contact form)
  score       integer,       -- Group 4 diagnostic score, if any
  page        text,          -- page title the form was on
  meta        jsonb          -- the full raw submission, nothing lost
);

create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

-- 2) Turn ON Row-Level Security. With RLS on and no permissive policy,
--    NOBODY can touch the table — then we add exactly one narrow allowance.
alter table public.registrations enable row level security;

-- 3) Allow the website's PUBLIC (anon) key to INSERT rows only.
--    No select / update / delete policy exists for anon, so the public key
--    that ships in the browser can add a registration but can never read the
--    list, change it, or delete it. Safe to publish.
drop policy if exists "anon can insert registrations" on public.registrations;
create policy "anon can insert registrations"
  on public.registrations
  for insert
  to anon
  with check (true);

-- ----------------------------------------------------------------------------
-- WHO CAN READ THE LIST?
--   • You, in the Supabase dashboard → Table Editor → registrations (always,
--     fully secure — the dashboard uses your logged-in account, not the key).
--   • The protected students.html page on the site, where you paste your
--     service_role key at view time (kept only in that browser tab, never in
--     the code). The service_role key bypasses RLS — treat it like a password,
--     only use it on your own device, and never commit it anywhere.
-- ----------------------------------------------------------------------------
