-- EkaNova Solutions database schema (Supabase/PostgreSQL)
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  college text not null,
  project_type text not null,
  service text not null,
  budget text not null,
  message text not null,
  status text not null default 'new',
  dedupe_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists enquiries_email_idx on public.enquiries(email);
create index if not exists enquiries_created_at_idx on public.enquiries(created_at desc);
create index if not exists enquiries_dedupe_hash_idx on public.enquiries(dedupe_hash);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  cover_image text,
  created_at timestamptz not null default now()
);

create index if not exists blog_posts_slug_idx on public.blog_posts(slug);

alter table public.enquiries enable row level security;
alter table public.blog_posts enable row level security;
alter table public.admin_users enable row level security;

create policy "Public can insert enquiries"
on public.enquiries
for insert
to anon
with check (true);

create policy "Admins can read enquiries"
on public.enquiries
for select
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.email = auth.jwt()->>'email'
  )
);

create policy "Public can read blog"
on public.blog_posts
for select
to anon, authenticated
using (true);

create policy "Admins can manage blog"
on public.blog_posts
for all
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.email = auth.jwt()->>'email'
  )
)
with check (
  exists (
    select 1 from public.admin_users au
    where au.email = auth.jwt()->>'email'
  )
);

