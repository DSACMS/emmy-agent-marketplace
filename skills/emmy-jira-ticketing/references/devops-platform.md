# DevOps And Platform Tickets

Use this reference for deployment, infrastructure, environment, CMS Cloud,
Terraform, runbook, observability, or operational-readiness work.

## Field Pattern

- Issue type: usually `Task`.
- Priority: `Low` by default; `High` is common when migration, deploy readiness,
  CMS Cloud, or launch pressure is explicit.
- Labels: include `engineering`; add `devops` when matching tickets use it or
  the work is explicitly DevOps/platform automation; add `needs_refinement` when
  the ticket is intentionally broad.
- Add `emmy_ato` only when the work affects ATO evidence, control operations,
  deployment governance, CFACTS traceability, or assessment readiness.
- Team: often `Emmy DevOps Team` or `FFS IVaaS - Platform`, but set it only when
  supplied or strongly supported by a matching epic or nearby tickets.
- Candidate epics include Deployment Management (`FFS-4116`), Observability
  (`FFS-4115`), and CFACTS Controls Phase 2 (`FFS-4234`) when relevant.

## Description Shape

Common headings:

- `Context`
- `Requirements` or `Task`
- `Out of scope`
- `Acceptance Criteria`

Acceptance criteria should name observable operational outcomes, such as a
working deploy action, enabled environment capability, passing smoke test,
documented runbook, or linked evidence artifact.

## Examples From Jira Scan

- `FFS-4483`: CMS Cloud deploy action, `devops`, `engineering`,
  `needs_refinement`, `emmy_ato`, high priority, Deployment Management epic.
- `FFS-4484`: CMS Cloud migration action, `devops`, `engineering`,
  `needs_refinement`, high priority.
- `FFS-4140`: Terraform Atlantis, `emmy_ato`, `engineering`, Emmy DevOps Team.
