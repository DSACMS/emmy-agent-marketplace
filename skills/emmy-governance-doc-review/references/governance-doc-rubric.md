# Emmy Governance Document Review Rubric

Use this rubric to produce a narrative assessment of an Emmy governance
document. Do not calculate a score by default.

## Approval Readiness

Use one of these readiness findings:

- `Ready`: no fatal flaws; only minor editorial changes remain.
- `Not ready`: at least one fatal flaw or material gap remains.
- `Cannot determine`: required source evidence is unavailable.

## Fatal Flaws

Treat these as approval blockers:

- Missing or untraceable requirement basis for a document that exists to satisfy
  an external obligation.
- Scope does not say both what the document applies to and what it excludes.
- Approver is missing, is a team, or is not distinct from Driver.
- The implementation section describes intent, future plans, or desired state
  instead of how Emmy currently operates.
- The document cannot be audited because approval date, approver, review
  cadence, version history, labels, or evidence pointers are missing.
- The canonical content lives in Jira, chat, or notes instead of a durable
  Confluence artifact.
- Placeholder text remains in a section that must be complete before review.

## Review Areas

### Purpose

Check whether the first substantive paragraph explains why the document exists,
what obligation or operational need it satisfies, and what outcome it
establishes. A reviewer should know whether the document is relevant after
reading this section alone.

### Scope

Check for explicit `Applies To` and `Does Not Apply To` sections. Look for
coverage of environments, repositories, teams, roles, partner interfaces, and
inherited or excluded systems when applicable.

### Requirement Basis

Check whether the document quotes or cites the external authority: CMS ARS,
CFACTS control, DSACMS policy, CMS open source policy, state communication
commitment, release obligation, or other driver. Verbatim quoted control text is
preferred for compliance documents.

### Current-State Accuracy

Check whether the body describes how Emmy actually works today. Flag wording
like "will", "should eventually", "planned", "TBD", or "future process" unless
the text clearly marks a gap and keeps it out of the approved process.

### Process Specificity

Check whether a new Emmy team member could follow the process. The document
should name triggers, steps, handoffs, inputs, outputs, tools, repositories,
systems, and edge cases that matter for operating the process.

### Roles And Accountability

Check both document ownership metadata and process responsibilities:

- Driver owns completion and maintenance.
- Approver is exactly one accountable role.
- Contributors are consulted roles or teams.
- Informed are roles or teams that need change awareness.
- Process roles describe who does what inside the process.

### Evidence And Auditability

Check whether an external reviewer can verify the claim. Useful evidence
includes Confluence page version history, approval date, approver role, control
ID, Jira links, CFACTS references, GitHub settings, runbooks, or other source
links. Do not require every evidence type; require a plausible audit path.

### Maintainability

Check for status, review cadence, last reviewed, next review due, supersession,
and role-based ownership. Flag stale or blank metadata that would cause the
document to age silently.

### Dual-Audience Readability

Check whether the document works for both a new Emmy team member and an external
reviewer who does not know Emmy. Acronyms, internal shorthand, and system names
should be explained enough to make the document stand alone.

## Recommended Revision Style

Make recommendations concrete:

- Prefer "Add a Does Not Apply To bullet excluding local development
  environments" over "clarify scope".
- Prefer "Replace future-tense CCB cadence text with the current cadence or mark
  the cadence as an unresolved blocker" over "be more specific".
- Prefer "Record Approver as ISSO and leave personal names out of metadata" over
  "fix ownership".
