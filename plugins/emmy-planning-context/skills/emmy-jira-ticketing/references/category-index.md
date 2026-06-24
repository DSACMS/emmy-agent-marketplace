# Jira Ticket Category Index

Use this index after reading `ffs-ticket-conventions.md`. Select the smallest
set of category references that matches the work.

## Category Routing

| Read this reference             | Use when the ticket is about                                                                                                 | Common signals                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `engineering-implementation.md` | Code, application behavior, CI, observability, data model, automation, deployment, infrastructure, environments, or runbooks | `engineering`, implementation, repo, tests, deploy, Terraform |
| `ato-traceability.md`           | ATO, CFACTS, control evidence, implementation statements, governance commitments, assessment readiness                       | `emmy_ato`, `CFACTS`, control IDs such as `CM-01a`            |
| `product-process-story.md`      | Product, state-facing, pilot-ready, policy/process, roadmap, or state TA collaboration work                                  | state collaboration, pilot-ready, process story               |
| `api-state-integration.md`      | Emmy API, state integration, iframe, enrollment, sample payloads, state/partner API behavior                                 | `emmy_api`, API, endpoint, payload, iframe, state hub         |
| `design-content.md`             | Design, content, research, Figma, prototype, UX flows, user-story-shaped design work                                         | `design`, `content`, research, Figma, Explore                 |
| `bug.md`                        | Defect, broken behavior, regression, incident, expected-vs-actual behavior                                                   | `Bug`, fix, error, broken, not working                        |
| `spike-tech-spec.md`            | Spike, tech spec, discovery, investigation, recommendation, options analysis                                                 | `Spike:`, `Tech Spec:`, `Discovery:`, `Explore:`              |
| `epic-initiative.md`            | Epic, initiative, planning hierarchy, or candidate parent selection                                                          | `Epic`, `Initiative`, Epic Name, parent work                  |

## Combining Categories

- Engineering plus ATO: read `engineering-implementation.md` and
  `ato-traceability.md`.
- Deployment, infrastructure, environment, runbook, or operational-readiness
  work uses `engineering-implementation.md`; add `ato-traceability.md` when the
  work affects ATO, CFACTS, governance commitments, or assessment readiness.
- API plus product: read `api-state-integration.md` and
  `product-process-story.md`.
- Design plus content: read `design-content.md`.
- Governance-driven follow-up: use `emmy-governance-followup-ticket` and let it
  load the base Jira references.

## Representative Jira Examples

- Engineering implementation and infrastructure: `FFS-4485`, `FFS-4501`,
  `FFS-4486`, `FFS-4483`, `FFS-4484`, `FFS-4140`
- ATO/governance/control work: `FFS-4339`, `FFS-4503`, `FFS-4511`
- Product/process stories: `FFS-4510`, `FFS-4509`, `FFS-4508`
- API/state integration: `FFS-4505`, `FFS-4504`, `FFS-4489`
- Design/content/discovery: `FFS-4480`, `FFS-4494`, `FFS-4469`
- Bugs: `FFS-4474`, `FFS-4459`, `FFS-4452`
- Spikes/tech specs/discovery: `FFS-4458`, `FFS-4437`, `FFS-4401`
- Epics: `FFS-4234`, `FFS-4116`, `FFS-4456`
