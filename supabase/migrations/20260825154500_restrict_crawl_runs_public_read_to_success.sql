-- W09 follow-up: anon must not see failed crawl runs or their error_message.
-- Only the latest successful refresh time is a public-facing signal.

drop policy "public read crawl runs" on public.crawl_runs;

create policy "public read successful crawl runs"
  on public.crawl_runs
  for select
  to anon
  using (status = 'success');
