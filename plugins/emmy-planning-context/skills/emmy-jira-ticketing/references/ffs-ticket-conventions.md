# FFS Ticket Conventions

Use these conventions when interpreting or drafting Emmy Jira tickets in the
`FFS` project. Treat these as team practice, not mandatory Jira platform rules.

## Project And Create Fields

- Project key: `FFS`
- Project name: `Income Verification as a Service`
- Required create fields for common non-epic issues are `Issue Type`, `Summary`,
  `Reporter`, and `Project`.
- `Priority` has a default of `Low`.
- `Epic` additionally requires `Epic Name`.

Useful custom fields:

- Epic Link: `customfield_10100`
- Epic Name: `customfield_10102`
- Team: `customfield_11002`
- Story point estimate: `customfield_19460`
- Definition of Ready: `customfield_13901`

Do not set story point estimate or Definition of Ready by default.

## Issue Type Selection

Default to `Task` unless another type clearly fits.

Use `Bug` for defects, regressions, broken behavior, production incidents, or
clear actual-vs-expected work. Bug tickets commonly include reproduction steps,
expected behavior, screenshots, and acceptance criteria.

Use `Story` for product-facing capability work when the request is naturally a
user story or API/product requirement. API stories can be concise when they
track a small API increment.

Use `Epic` for a body of related work that will collect child tickets. Set
`customfield_10102` (`Epic Name`) when creating epics.

Use `Initiative` for broad strategic work above epics. Initiatives can be
concise when they are placeholders for planning hierarchy.

Use `Improvement` or `New Feature` only when the human asks for those types or
when matching nearby tickets strongly use them.

## Priority

Default to `Low`.

Use `Medium` when the work has an explicit near-term need, external dependency,
or product/design coordination risk.

Use `High`, `Critical`, or `Blocker` only when the human or source evidence
indicates urgent deadline pressure, live incident impact, production risk,
security risk, pilot launch risk, or blocked delivery.

Date-led summaries such as `[6/17] ...` usually indicate deadline-sensitive work
and can justify elevation when the due date is near.

## Labels

Prefer labels over components. Common labels:

- `engineering`
- `design`
- `emmy_api`
- `needs_refinement`
- `CFACTS`
- `NH`
- `content`

Use `engineering` for implementation, bugs, technical spikes, specs, CI,
observability, infrastructure, and codebase work.

Use `design` for design exploration, Figma/prototype work, client-facing UX
flows, content/design research, and user-story-shaped design tasks.

Use `emmy_api` for API, state integration, enrollment, bulk operation,
Postman/sample payload, and public API work.

Use `needs_refinement` when the ticket is intentionally rough, has open
questions, lacks acceptance criteria, or needs product/design/engineering
shaping before implementation.

Use state or domain labels such as `NH`, `CFACTS`, `content`, or `rhode_island`
only when the request or source evidence names that scope.

## Team Field

Known Team values:

- `Emmy DevOps Team`
- `FFS IVaaS - State Engagement`
- `FFS IVaaS - Platform`
- `Emmy Data Team`
- `Emmy Product`

Set Team only when supplied by the human, inherited from a strongly matching
epic, or clearly inferable from similar tickets. If unsure, leave it unset and
mention the uncertainty in the draft.

## Components And Versions

Do not set components unless the human asks for one or a matching ticket or epic
makes the component obvious.

Known component options include:

- `Data cascade`
- `des`
- `Document uploader`
- `Events Management`
- `Identity Verification`
- `Income reporting / plain language`
- `Invitations Service API`
- `Multi-Provider Search`
- `Payroll Account Authentication`
- `Payroll Account Data Model`
- `Verified attested reuse`

Do not set fix versions or affects versions unless the human names a release,
pilot, or version.

## Hierarchy

Search open epics before drafting child tickets. Consider whether a new ticket
belongs under an epic, but do not guess one.

When no epic is clearly correct, leave Epic Link unset and list candidate epics
for the human to choose.

## Description Conventions

Common headings:

- `Context`
- `Acceptance Criteria`
- `Summary`
- `Out of scope` or `Out of Scope`
- `Expected Behavior`
- `Reproduction Steps`
- `Requirements`
- `User story`
- `Considerations`
- `Resources`
- `Activities`

Engineering-labeled tickets commonly use:

- `Context`
- `Acceptance Criteria`
- `Summary`
- `Out of scope`
- `Task`
- `Requirements`
- `Expected Behavior`
- `Reproduction Steps`

Design-labeled tickets commonly use:

- `User story`
- `Context`
- `Considerations`
- `Out of scope`
- `Acceptance criteria`
- `Resources`
- `Activities`

Bug tickets commonly use:

- `Context`
- `Reproduction Steps`
- `Expected Behavior`
- `Acceptance Criteria`
- optional `Screenshots`

Sparse descriptions are common for API stories, epics, initiatives, and very
small tasks. Treat missing sections as a refinement signal only when the ticket
type and work risk call for more detail.

## Search Patterns

Use JQL like these before interpreting conventions or drafting:

```text
project = FFS ORDER BY created DESC
project = FFS AND text ~ "household" ORDER BY created DESC
project = FFS AND issuetype = Epic AND status != Done ORDER BY created DESC
project = FFS AND labels in (engineering) ORDER BY created DESC
```
