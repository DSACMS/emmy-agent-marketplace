# FFS Ticket Conventions

Use these conventions when interpreting or drafting Emmy Jira tickets in the
`FFS` project. They describe observed team practice from recent tickets, not
mandatory Jira platform behavior.

## Evidence Basis

Observed sample:

- Project: `FFS` (`Income Verification as a Service`)
- Window: March 15, 2026 through June 15, 2026
- Sample size: 575 issues

Issue type frequency:

- `Task`: 276
- `Story`: 164
- `Epic`: 55
- `Bug`: 44
- `Initiative`: 24
- `Improvement`: 6
- `New Feature`: 6

Priority frequency:

- `Low`: 439
- `Medium`: 60
- `High`: 54
- `Critical`: 14
- `Blocker`: 8

## Project And Create Fields

- Project key: `FFS`
- Project name: `Income Verification as a Service`
- Jira create metadata showed required fields for common non-epic issues:
  `Issue Type`, `Summary`, `Reporter`, and `Project`.
- `Priority` has a default of `Low`.
- `Epic` additionally requires `Epic Name`.

Useful custom fields:

- Epic Link: `customfield_10100`
- Epic Name: `customfield_10102`
- Team: `customfield_11002`
- Story point estimate: `customfield_19460`
- Definition of Ready: `customfield_13901`

Observed custom-field usage:

- Epic Link appeared on 248 of 575 recent issues.
- Epic Name appeared on 54 of 55 recent epics.
- Team appeared on 333 of 575 recent issues.
- Story point estimate appeared on 0 of 575 recent issues.
- Definition of Ready appeared on 0 of 575 recent issues.

## Issue Type Selection

Default to `Task` unless another type clearly fits.

Use `Bug` for defects, regressions, broken behavior, production incidents, or
clear actual-vs-expected work. Bug tickets commonly include reproduction steps,
expected behavior, screenshots, and acceptance criteria.

Use `Story` for product-facing capability work when the request is naturally a
user story or API/product requirement. Recent `Story` tickets are often sparse,
especially for `emmy_api` work, so do not force long templates when the team is
clearly tracking small API increments.

Use `Epic` for a body of related work that will collect child tickets. Set
`customfield_10102` (`Epic Name`) when creating epics.

Use `Initiative` for broad strategic work above epics. Recent initiatives are
often intentionally sparse.

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

Prefer labels over components. Common recent labels:

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

Known recent Team values:

- `Emmy DevOps Team`
- `FFS IVaaS - State Engagement`
- `FFS IVaaS - Platform`
- `Emmy Data Team`
- `Emmy Product`

Set Team only when supplied by the human, inherited from a strongly matching
epic, or clearly inferable from similar tickets. If unsure, leave it unset and
mention the uncertainty in the draft.

## Components And Versions

Components are rarely used in recent tickets. Do not set components unless the
human asks for one or a matching recent ticket/epic makes the component obvious.

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

Search open epics before drafting child tickets. Epic Link is common enough that
new tasks should usually be considered for an epic, but do not guess one.

Frequent recent Epic Links included:

- `FFS-2639`
- `FFS-4118`
- `FFS-4234`
- `FFS-3962`
- `FFS-3978`
- `FFS-4283`
- `FFS-4116`
- `FFS-3847`
- `FFS-4196`
- `FFS-4455`

When no epic is clearly correct, leave Epic Link unset and list candidate epics
for the human to choose.

## Description Conventions

Common headings across recent tickets:

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
project = FFS AND created >= "2026-03-15" ORDER BY created DESC
project = FFS AND text ~ "household" ORDER BY created DESC
project = FFS AND issuetype = Epic AND status != Done ORDER BY created DESC
project = FFS AND labels in (engineering) ORDER BY created DESC
```
