# Engineering Implementation Tickets

Use this reference for code, application behavior, CI, observability, data
model, automation, deployment, infrastructure, environments, CMS Cloud,
Terraform, runbooks, operational readiness, or implementation work.

## Field Pattern

- Issue type: usually `Task`; use `Bug` for defects and `Story` only when the
  work is product/API-facing.
- Priority: usually `Low`; use `Medium` or `High` for deadline, migration,
  pilot, production, security, or coordination pressure.
- Labels: include `engineering`.
- Refinement sprint: propose `Ready for Refinement (46737)` only when the ticket
  has been written and is ready for team scoping. Leave it unset while the
  ticket is still being drafted or iterated on.
- Epic Link: search likely epics and list candidates rather than guessing.

## Description Shape

Common headings:

- `Context`
- `Requirements` or `Task`
- `Out of scope`
- `Acceptance Criteria`

Use `Implementation Direction` only when the ticket should name a likely path
while still leaving design details to the engineer.

## Examples From Jira Scan

- `FFS-4485`: engineering task with `engineering`, medium priority, and concise
  Context/Acceptance Criteria.
- `FFS-4501`: engineering task with only `engineering`, low priority, and sparse
  field usage.
- `FFS-4486`: engineering refinement task with `engineering`, low priority, and
  no forced team/epic. New written tickets that are ready for team scoping can
  use `Ready for Refinement` instead of a refinement label.
