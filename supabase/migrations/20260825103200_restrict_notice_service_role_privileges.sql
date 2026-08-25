-- Keep the crawler role limited to the table operations required by the PRD.

revoke all on table public.notices, public.crawl_runs from service_role;

grant select, insert, update, delete
  on table public.notices, public.crawl_runs
  to service_role;
