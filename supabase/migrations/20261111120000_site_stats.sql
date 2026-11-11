-- =============================================================================
-- site_stats: a live "tickets sold through im-pro.tech systems this month"
-- counter for the public website, without exposing a single ticket row.
--
-- How access works (read this before changing anything)
-- -----------------------------------------------------------------------------
-- 1. public.tickets has RLS enabled and NO policy for `anon`, and `anon` has
--    no table privileges on it. A visitor holding the anon key cannot read,
--    count or filter tickets through the Data API.
--
-- 2. private.tickets_sold_this_month() is SECURITY DEFINER: it runs as its
--    owner, so it can count rows that `anon` cannot see. It returns ONE bigint
--    and takes no arguments, so it cannot be bent into leaking rows. Its
--    search_path is pinned to '' and every name is schema-qualified, so a
--    caller cannot shadow `public.tickets` with their own object.
--    The `private` schema is not in the Data API's exposed schemas, so the
--    function cannot be called directly over HTTP.
--
-- 3. public.site_stats is a view with security_invoker = true: it runs with
--    the CALLER's privileges (not the view owner's), so it can't accidentally
--    become a hole that bypasses RLS on some table added to it later. The only
--    thing it can do for `anon` is call the aggregate function above.
--    `anon` gets SELECT on this view and EXECUTE on that one function — and
--    nothing on the raw tables.
--
-- 4. Realtime: a statement-level trigger recomputes the count and broadcasts
--    {tickets_this_month} with realtime.send() on the PRIVATE channel
--    "site-stats". The RLS policy on realtime.messages lets anon/authenticated
--    RECEIVE on that topic only. There is deliberately no INSERT policy, so no
--    browser can broadcast a fake number on it (a public channel would allow
--    that).
--
-- TODO: public.tickets below is a PLACEHOLDER. If your project already has a
-- tickets table, delete the CREATE TABLE block and adapt `status = 'paid'` and
-- `paid_at` in the function and trigger to your real column names.
-- =============================================================================

create schema if not exists private;
revoke all on schema private from public;
-- anon needs USAGE so the security_invoker view can reach the function.
-- USAGE alone grants nothing on the objects inside the schema.
grant usage on schema private to anon, authenticated;

-- --- Placeholder source table (TODO: replace with your real table) ----------
create table if not exists public.tickets (
  id         uuid primary key default gen_random_uuid(),
  status     text not null default 'pending',
  paid_at    timestamptz,
  created_at timestamptz not null default now()
);

alter table public.tickets enable row level security;
revoke all on table public.tickets from anon;

create index if not exists tickets_paid_at_paid_idx
  on public.tickets (paid_at)
  where status = 'paid';

-- --- Aggregate (the only thing anon can reach) ------------------------------
create or replace function private.tickets_sold_this_month()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)
  from public.tickets as t
  where t.status = 'paid'
    -- "this month" in Bogotá time (UTC-5), not UTC
    and t.paid_at >= (
      date_trunc('month', now() at time zone 'America/Bogota')
      at time zone 'America/Bogota'
    );
$$;

revoke all on function private.tickets_sold_this_month() from public;
grant execute on function private.tickets_sold_this_month() to anon, authenticated;

-- --- The public view ---------------------------------------------------------
create or replace view public.site_stats
with (security_invoker = true)
as
select
  private.tickets_sold_this_month()                                as tickets_this_month,
  (date_trunc('month', now() at time zone 'America/Bogota'))::date as month_start,
  now()                                                            as computed_at;

-- Supabase's default privileges grant everything on new public objects;
-- reset to exactly SELECT.
revoke all on table public.site_stats from anon, authenticated;
grant select on table public.site_stats to anon, authenticated;

comment on view public.site_stats is
  'Aggregate-only stats for im-pro.tech. anon may SELECT this view; never the raw tables.';

-- --- Realtime broadcast ------------------------------------------------------
create or replace function private.broadcast_site_stats()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform realtime.send(
    jsonb_build_object('tickets_this_month', private.tickets_sold_this_month()),
    'tickets_this_month',  -- event
    'site-stats',          -- topic
    true                   -- private channel: receive is governed by RLS below
  );
  return null;
end;
$$;

revoke all on function private.broadcast_site_stats() from public, anon, authenticated;

drop trigger if exists tickets_broadcast_site_stats on public.tickets;
create trigger tickets_broadcast_site_stats
  after insert or update of status, paid_at or delete on public.tickets
  for each statement
  execute function private.broadcast_site_stats();

-- Receive-only access to the "site-stats" topic. No INSERT policy on purpose:
-- if you add INSERT policies on realtime.messages elsewhere, make sure they
-- never match this topic.
drop policy if exists "site-stats: anyone may receive" on realtime.messages;
create policy "site-stats: anyone may receive"
  on realtime.messages
  for select
  to anon, authenticated
  using (
    (select realtime.topic()) = 'site-stats'
    and realtime.messages.extension = 'broadcast'
  );
