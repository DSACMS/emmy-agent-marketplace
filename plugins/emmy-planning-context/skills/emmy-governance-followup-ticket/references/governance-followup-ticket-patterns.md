# Governance Follow-up Ticket Patterns

Use these patterns when turning Emmy governance decisions, ATO control findings,
or governance document gaps into FFS Jira ticket drafts. Load the base Jira
category references first; this file covers only governance-specific reasoning.

## Governance Source Provenance

For Confluence governance pages, capture:

- Page title, page ID, URL, space, version, status, and labels
- Approval or review fields when present
- Control family, control ID, requirement basis, or CFACTS reference when
  present
- The exact governance commitment that creates follow-up work

For Jira source tickets, capture issue type, summary, status, labels, Team, Epic
Link, description, and linked Confluence pages when present.

For repo or system evidence, inspect the local file or live source before
claiming a gap. Name the file, setting, branch-protection behavior, system
evidence, or artifact that makes the gap concrete.

## Classification

Use these categories to decide whether to draft a Jira ticket and which base
category references to load:

| Category                    | Use when                                                                                                      | Base references                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Implementation/remediation  | The governance decision requires a code, repo, config, or system change.                                      | `engineering-implementation.md`, plus `ato-traceability.md` when applicable         |
| DevOps/platform remediation | The follow-up changes deployment, infrastructure, environment, evidence automation, or operational readiness. | `devops-platform.md`, plus `ato-traceability.md` when applicable                    |
| Evidence production         | The work is to create, link, or update evidence proving the process operates.                                 | `engineering-implementation.md` or `devops-platform.md`, plus `ato-traceability.md` |
| Governance metadata cleanup | A governance page exists but approval/status/review metadata is incomplete.                                   | `ato-traceability.md` when ATO-impacting                                            |
| Decision blocker            | A policy or owner decision must happen before implementation or approval.                                     | `spike-tech-spec.md`, plus `ato-traceability.md` when applicable                    |
| CFACTS update               | The control implementation statement or evidence reference must be updated.                                   | `ato-traceability.md`                                                               |
| Document production/update  | The output is a Confluence governance document.                                                               | Use the governance doc workflow instead                                             |

Add `governance` when the work is caused by a governance document or closes a
gap in a governance decision. Use the shared `ato-traceability.md` reference for
`emmy_ato`, `CFACTS`, control-family, and control-ID label rules.

## Duplicate And Related Work Search

Before drafting, search Jira by:

- Governance page title and key terms
- Confluence page ID or URL when available
- Control ID and family, such as `CM-01a`, `cm-01a`, and `cm`
- Repository, file, setting, system, or tool names, such as `CODEOWNERS`
- Likely open epics for ATO, governance, DevOps, platform, or product work

If related work exists, distinguish duplicate tickets from predecessor,
follow-up, evidence, or parent/child work. Do not close, link, or update related
issues without explicit approval.

## CODEOWNERS Example

When the Emmy PR Review Process says CODEOWNERS determines valid reviewers and
repo evidence shows CODEOWNERS is placeholder-only, draft an engineering task
instead of another governance document.

Suggested fields:

- Issue type: `Task`
- Summary shape: `CM-01a: Fix CODEOWNERS for PR review governance`
- Priority: `Low` unless deadline, audit, or security pressure is explicit
- Labels: `engineering`, `governance`, `emmy_ato`, `CFACTS`, `cm`, `cm-01a`
- Refinement sprint: `Ready for Refinement (46737)` when the follow-up still
  needs engineering shaping
- Team: `Emmy DevOps Team` only if the human wants that set or source evidence
  and nearby tickets strongly support it
- Category references: `engineering-implementation.md`, `ato-traceability.md`,
  and this file
- Description sections: `Context`, `Requirements`, `Out of scope`,
  `Acceptance Criteria`

Acceptance criteria should verify both the repository change and the governance
intent. For example:

- CODEOWNERS names the approved DSACMS team or reviewer pool for the affected
  repository.
- Branch protection or review settings use CODEOWNERS review where applicable.
- The PR, Jira ticket, or linked evidence shows the governance source was
  considered.
