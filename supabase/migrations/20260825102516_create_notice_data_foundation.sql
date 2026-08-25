-- W09: Supabase notice data foundation
-- Public clients may read notices and crawl status. Only service_role may write.

create table public.notices (
  id uuid primary key default gen_random_uuid(),
  source_id text not null,
  title text not null,
  published_at timestamptz not null,
  original_url text not null,
  scraped_at timestamptz not null default now(),

  constraint notices_source_id_check
    check (source_id in ('library', 'language-center', 'industry-center')),
  constraint notices_title_not_blank_check
    check (length(btrim(title)) > 0),
  constraint notices_original_url_not_blank_check
    check (length(btrim(original_url)) > 0),
  constraint notices_source_original_url_key
    unique (source_id, original_url)
);

create index notices_source_published_idx
  on public.notices (source_id, published_at desc);

create table public.crawl_runs (
  id uuid primary key default gen_random_uuid(),
  source_id text not null,
  status text not null,
  item_count integer not null default 0,
  error_message text,
  started_at timestamptz not null,
  finished_at timestamptz not null,

  constraint crawl_runs_source_id_check
    check (source_id in ('library', 'language-center', 'industry-center')),
  constraint crawl_runs_status_check
    check (status in ('success', 'failed')),
  constraint crawl_runs_item_count_check
    check (item_count >= 0),
  constraint crawl_runs_error_message_check
    check (
      (status = 'success' and error_message is null)
      or
      (status = 'failed' and length(btrim(error_message)) > 0)
    ),
  constraint crawl_runs_time_order_check
    check (finished_at >= started_at)
);

create index crawl_runs_source_finished_idx
  on public.crawl_runs (source_id, finished_at desc);

alter table public.notices enable row level security;
alter table public.crawl_runs enable row level security;

-- Remove Supabase's broad default Data API grants, then opt in to read-only access.
revoke all on table public.notices, public.crawl_runs from anon, authenticated;
grant select on table public.notices, public.crawl_runs to anon;

-- Server-side crawlers use SUPABASE_SECRET_KEY/service_role.
grant select, insert, update, delete
  on table public.notices, public.crawl_runs
  to service_role;

create policy "public read notices"
  on public.notices
  for select
  to anon
  using (true);

create policy "public read crawl runs"
  on public.crawl_runs
  for select
  to anon
  using (true);

comment on table public.notices is
  'Metadata for campus notices. Notice bodies and attachments are not stored.';
comment on table public.crawl_runs is
  'Per-source crawler outcomes used to calculate the latest successful refresh.';
comment on column public.notices.source_id is
  'One of library, language-center, or industry-center.';
comment on column public.crawl_runs.source_id is
  'One of library, language-center, or industry-center.';

