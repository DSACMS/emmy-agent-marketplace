# Bug Tickets

Use this reference for defects, regressions, broken behavior, production
incidents, or clear expected-vs-actual work.

## Field Pattern

- Issue type: `Bug`.
- Priority: `Low` by default; use `Medium`, `High`, `Critical`, or `Blocker`
  when user impact, production risk, launch risk, security, or incident pressure
  is explicit.
- Labels: usually `engineering`; add domain labels when source evidence names
  them.
- Team: often unset or `FFS IVaaS - Platform`; set it only when supplied or
  strongly supported by nearby tickets.
- Epic Link: use only when the bug clearly belongs to a matching epic.

## Description Shape

Descriptions can be sparse in existing Jira bugs. When drafting and source
evidence supports it, prefer:

- `Context`
- `Reproduction Steps`
- `Expected Behavior`
- `Acceptance Criteria`
- `Screenshots` only when useful

If reproduction steps are unknown, state the observed issue and make
investigation part of the task rather than inventing steps.

## Examples From Jira Scan

- `FFS-4474`: session timeout bug, `engineering`, platform Team, sparse
  description.
- `FFS-4459`: routing bug, `engineering`, linked to an epic.
- `FFS-4452`: schema discrepancy bug, `engineering`, platform Team and epic.
