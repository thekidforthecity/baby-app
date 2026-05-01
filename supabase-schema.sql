-- Run this in your Supabase project under: SQL Editor → New Query
-- It creates the responses table and the video storage bucket.

-- 1. Responses table
create table public.responses (
  id           uuid        default gen_random_uuid() primary key,
  week_number  integer     not null unique,
  text_response text,
  video_url    text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- 2. Allow public read/write (this is a private family app — no auth needed)
alter table public.responses enable row level security;

create policy "Allow all operations"
  on public.responses
  for all
  using (true)
  with check (true);

-- 3. Storage bucket for videos
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true);

create policy "Allow video uploads"
  on storage.objects
  for insert
  to public
  with check (bucket_id = 'videos');

create policy "Allow video reads"
  on storage.objects
  for select
  to public
  using (bucket_id = 'videos');
