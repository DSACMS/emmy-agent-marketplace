# ATO Traceability Tickets

Use this reference whenever work could affect ATO compliance, CFACTS, control
implementation statements, control evidence, assessment readiness, control
operations, or an ATO-driven governance commitment.

## Label Convention

Preserve ordinary work-routing labels and add ATO traceability labels. Do not
replace `engineering`, `design`, or `emmy_api` with ATO labels.

Use this pattern when a control is known:

- `emmy_ato`
- control family label, lowercased, such as `cm`, `ac`, `au`, `ia`, `ir`, `cp`,
  `ra`, `sc`, `si`, or `pl`
- control ID label, lowercased, such as `cm-01a`
- `CFACTS` when the source or acceptance criteria mention CFACTS, ARS
  implementation statements, implementation evidence, or control traceability

`FFS-4339` used this model label set for PR Review Process governance work:

```text
CFACTS
cm
cm-01a
emmy_ato
engineering
governance
```

For intentionally rough ATO follow-ups, keep the routing and traceability
labels, then propose `Ready for Refinement (46737)` as the refinement signal.

If a control ID uses parentheses or enhancement notation, search Jira for an
existing label precedent first. If no precedent exists, propose a normalized
lowercase label in draft notes and ask the human to confirm.

## Field Pattern

- Issue type: usually `Task`; use `Story` only when nearby ATO/API work strongly
  uses story shape.
- Priority: `Low` unless deadline, audit, authorization, security, or launch
  pressure is explicit.
- Labels: combine work-routing labels with ATO labels.
- Team: often `Emmy DevOps Team` for CFACTS/control work, but set it only when
  supplied, inherited from a strongly matching epic, or supported by nearby
  tickets.
- Candidate epic: CFACTS Controls Phase 2 (`FFS-4234`) for Phase 2 CFACTS
  control work.

## Description Shape

Common content:

- Control family and control ID when known
- Source of the requirement or evidence gap
- Concrete work needed to close the gap
- Links to Confluence, repo evidence, source tickets, or CFACTS evidence
- Acceptance criteria that verify publication, approval, evidence, or CFACTS
  update when applicable

Keep canonical policy or control text in Confluence/CFACTS. Jira should track
the work and link to the source.

## Examples From Jira Scan

- `FFS-4339`: CM-01a governance document with `CFACTS`, `cm`, `cm-01a`,
  `emmy_ato`, `engineering`, `governance`.
- `FFS-4503`: CM-09 configuration management plan with `cm`, `cm-09`,
  `emmy_ato`, `engineering`, `plan`, and CFACTS Phase 2 epic.
- `FFS-4483`: deploy action with `devops`, `emmy_ato`, and `engineering`.
