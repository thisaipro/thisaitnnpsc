-- ============================================================================
-- Thisai IAS Academy — Current Affairs table
-- Run ONCE in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Stores daily current-affairs entries that the website reads and displays.
-- Unlike `registrations`, the PUBLIC is allowed to READ these — but only rows
-- marked published = true. Nobody can write with the public key; new entries
-- are added by the automated daily job using the SECRET key (bypasses RLS).
-- ============================================================================

create table if not exists public.current_affairs (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  ca_date     date not null default (now() at time zone 'Asia/Kolkata')::date, -- the day the item is about
  title_en    text not null,
  title_ta    text,
  body_en     text,           -- short bilingual write-up (plain text; newlines become paragraphs)
  body_ta     text,
  category    text,           -- e.g. National, TN, International, Economy, S&T, Sports, Awards
  source      text,           -- human-readable source name, e.g. "PIB" / "The Hindu"
  source_url  text,           -- link to the original article (optional)
  published   boolean not null default true
);

create index if not exists current_affairs_date_idx on public.current_affairs (ca_date desc, created_at desc);

-- Row-Level Security ON, then allow PUBLIC READ of published rows only.
alter table public.current_affairs enable row level security;

drop policy if exists "public can read published current affairs" on public.current_affairs;
create policy "public can read published current affairs"
  on public.current_affairs
  for select
  to anon
  using (published = true);

-- No insert/update/delete policy for anon → the public key cannot write.
-- The daily automation writes with the secret key, which bypasses RLS.
-- To hide an entry: in Table Editor set its `published` to false (vanishes
-- from the site instantly); to remove it, delete the row.
