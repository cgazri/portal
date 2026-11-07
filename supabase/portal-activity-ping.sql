-- Run once in the Supabase SQL Editor. This does not read or expose application data.
BEGIN;

CREATE FUNCTION public.portal_activity_ping()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = pg_catalog
AS $$
    SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_class LIMIT 1);
$$;

REVOKE ALL ON FUNCTION public.portal_activity_ping() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.portal_activity_ping() TO anon, authenticated;

COMMIT;
