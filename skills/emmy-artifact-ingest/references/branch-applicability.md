# Branch Applicability

Repository-derived knowledge is branch- and commit-scoped. Use this reference
before writing any repository-derived source record or queue entry.

## Applicability Values

- `mainline-observed`: The fact was verified on `main`, `origin/main`, or a
  clean checkout whose HEAD is intended to represent mainline state.
- `branch-scoped`: The fact was verified on a feature branch or non-main branch.
  It may not apply to `main` or other branches.
- `local-observation`: The fact came from a dirty worktree, uncommitted file, or
  local-only state. It must stay `needs-review`.
- `unknown`: The branch or commit could not be determined. Avoid ingesting
  unless the user explicitly asks for a low-confidence queue entry.

## Rules

- Facts from `main` or `origin/main` can be marked as mainline-observed at the
  recorded commit.
- Facts from feature branches must be marked branch-scoped and must not be
  promoted to canonical pages unless the user asks or the agent verifies the
  same fact on the target canonical branch.
- Dirty worktrees cannot be treated as GitHub repository source of truth. They
  may only produce `needs-review` local-observation queue entries.
- Agents using stored knowledge must re-check local repository evidence when
  branch applicability matters.

## Repository Claim Locator

Every repository-derived claim must include:

```text
repo: owner/name
branch: branch-name
commit: full-or-short-sha
relative_path: path/from/repo/root
line_range_or_symbol: lines X-Y or symbol/function/class name
applicability: mainline-observed | branch-scoped | local-observation | unknown
```

When a line range is unstable or unavailable, use the nearest durable symbol and
section heading, then say line range was not recorded.
