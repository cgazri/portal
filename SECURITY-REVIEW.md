# Security review

**Review date:** 2026-11-06

**Scope:** Repository source and the Supabase table grants/RLS metadata supplied during the review for `public.student_records` and `public.flight_prices`.

## Summary

No confirmed public read exposure of student records was established. RLS is enabled on both tables, but the policy definitions were not provided, so row-level access cannot be certified from the available evidence.

The repository contains no verified secret credentials. The Supabase URL and publishable key in the client are public client configuration, not service-role credentials. Sensitive-looking documents are present as untracked files in the local workspace; they were not included in this commit and their deployment exposure was not assessed.

## Finding

| # | Severity | Location | Vulnerability | Confidence |
|---|---|---|---|---|
| 1 | ⚪ LOW | Supabase DB: `public.student_records`, `public.flight_prices` (no repository line) | `anon` has `TRUNCATE`, `REFERENCES`, and `TRIGGER` privileges on both tables; `authenticated` also has `TRUNCATE`. `TRUNCATE` is not constrained by RLS. The supplied evidence does not establish a public API or SQL path that can execute these privileges. | 10/10 |

### Remediation

If these privileges are not required for administration, revoke them from client roles:

```sql
REVOKE TRUNCATE, REFERENCES, TRIGGER
ON TABLE public.student_records, public.flight_prices
FROM anon, authenticated;
```

Keep only the table operations required by the app. In particular, anonymous inserts to `student_records` should remain only if student submissions require them.

## Unverified access controls

RLS was reported enabled and not forced on both tables. Table grants also show `anon` can attempt inserts to `student_records`, while `authenticated` can attempt select/insert/update/delete operations on both tables. The effective row access depends on RLS policies, whose definitions were not supplied. Therefore, this review does not conclude that those roles can read or modify any rows.

Review the policies before certifying student-record privacy. The client-side teacher UID check is not a substitute for database-side authorization.
