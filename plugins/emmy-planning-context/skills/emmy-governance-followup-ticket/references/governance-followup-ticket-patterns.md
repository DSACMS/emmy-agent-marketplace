# Governance Follow-up Ticket Patterns

Use these patterns when turning Emmy governance decisions, ATO control findings,
or governance document gaps into FFS Jira ticket drafts.

## ATO Label Convention

`FFS-4339` used this label set for the PR Review Process governance work:

```text
CFACTS
cm
cm-01a
emmy_ato
engineering
governance
```

Treat that as the model for ATO-impacting governance follow-up tickets: combine
ordinary work-routing labels with ATO traceability labels.

### Work-Routing Labels

- Add `engineering` for implementation, code, repository configuration,
  infrastructure, CI, observability, automation, or technical evidence work.
- Add `needs_refinement` when the ticket is intentionally rough, belongs in the
  engineering refinement backlog, has open scoping questions, or needs team
  review before implementation.
- Add `governance` when the work is caused by a governance document or closes a
  gap in a governance decision.

### ATO Traceability Labels

- Add `emmy_ato` when the work could affect ATO compliance, evidence,
  implementation statements, CFACTS traceability, assessment readiness, or
  control operations.
- Add the control family as a lowercase label. Examples: `cm`, `au`, `ac`, `ia`,
  `ir`, `cp`, `ra`, `sc`, `si`, `pl`.
- Add the control ID as a lowercase label. For example, `CM-01a` becomes
  `cm-01a`.
- Add `CFACTS` when the source ticket, governance document, or acceptance
  criteria mention CFACTS, control implementation statements, control evidence,
  or ARS/CFACTS traceability.

If a control ID uses parentheses or enhancement notation, search Jira for an
existing label precedent first. If no precedent exists, propose the normalized
label in the draft notes and ask the human to confirm.

## Classification

Use these categories to decide the ticket shape:

| Category                    | Use when                                                                      | Typical labels                                                |
| --------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Implementation/remediation  | The governance decision requires a code, repo, config, or system change.      | `engineering`, `needs_refinement`, ATO labels when applicable |
| Evidence production         | The work is to create, link, or update evidence proving the process operates. | `engineering` or `governance`, `emmy_ato`, family, control ID |
| Governance metadata cleanup | A governance page exists but approval/status/review metadata is incomplete.   | `governance`, `emmy_ato`, family, control ID                  |
| Decision blocker            | A policy or owner decision must happen before implementation or approval.     | `needs_refinement`, `governance`, ATO labels when applicable  |
| CFACTS update               | The control implementation statement or evidence reference must be updated.   | `CFACTS`, `emmy_ato`, family, control ID                      |
| Document production/update  | The output is a Confluence governance document.                               | Use the governance doc workflow instead                       |

## CODEOWNERS Example

When the Emmy PR Review Process says CODEOWNERS determines valid reviewers and
repo evidence shows CODEOWNERS is placeholder-only, draft an engineering task
instead of another governance document.

Suggested fields:

- Issue type: `Task`
- Summary shape: `CM-01a: Fix CODEOWNERS for PR review governance`
- Priority: `Low` unless deadline, audit, or security pressure is explicit
- Labels: `engineering`, `needs_refinement`, `governance`, `emmy_ato`, `CFACTS`,
  `cm`, `cm-01a`
- Team: `Emmy DevOps Team` only if the human wants that set or the source
  evidence is strong enough for the draft
- Description sections: `Context`, `Requirements`, `Out of scope`,
  `Acceptance Criteria`

Acceptance criteria should verify both the repository change and the governance
intent. For example:

- CODEOWNERS names the approved DSACMS team or reviewer pool for marketplace
  changes.
- Branch protection or review settings use CODEOWNERS review where applicable.
- The PR or linked evidence shows the governance source was considered.
