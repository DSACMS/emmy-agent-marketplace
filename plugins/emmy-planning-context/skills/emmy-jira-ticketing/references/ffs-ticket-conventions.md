# FFS Ticket Conventions

Use these global conventions when interpreting or drafting Emmy Jira tickets in
the `FFS` project. Treat them as team practice, not Jira platform rules.

## Project And Create Fields

- Project key: `FFS`
- Project name: `Income Verification as a Service`
- Required create fields for common non-epic issues are `Issue Type`, `Summary`,
  `Reporter`, and `Project`.
- `Priority` defaults to `Low`.
- `Epic` additionally requires `Epic Name`.

Useful custom fields:

- Epic Link: `customfield_10100`
- Epic Name: `customfield_10102`
- Story point estimate: `customfield_19460`
- Definition of Ready: `customfield_13901`
- Sprint: `customfield_10104`

Do not set story point estimate or Definition of Ready by default.

## Issue Type Defaults

Default to `Task` unless another type clearly fits.

- Use `Bug` for defects, regressions, broken behavior, production incidents, or
  clear actual-vs-expected work.
- Use `Story` for product-facing capability work, API/state integration work, or
  partner-facing requirements when nearby tickets use story shape.
- Use `Epic` for a body of related work that will collect child tickets.
- Use `Initiative` only for broad strategic work above epics.
- Use `Improvement` or `New Feature` only when the human asks for those types or
  matching nearby tickets strongly use them.

## Priority

Default to `Low`.

Use `Medium` when the work has an explicit near-term need, external dependency,
or product/design coordination risk.

Use `High`, `Critical`, or `Blocker` only when the human or source evidence
indicates deadline pressure, live incident impact, production risk, security
risk, pilot launch risk, blocked delivery, or urgent state/product need.

Date-led summaries such as `[6/17] ...` usually indicate deadline-sensitive work
and can justify elevation when the date is near.

## Labels

Prefer labels over components. Preserve human-supplied labels exactly.

Common labels:

- `engineering`
- `design`
- `emmy_api`
- `emmy_ato`
- `governance`
- `CFACTS`
- `NH`
- `content`

Do not use the deprecated `needs_refinement` label. Do not replace it with a
sprint while the ticket is still being drafted or iterated on.

Use state or domain labels such as `NH`, `CFACTS`, `content`, `rhode_island`,
`Accenture`, or `CaseworkerView` only when the request or source evidence names
that scope.

For category-specific label rules, read the matching reference from
`category-index.md`.

## Ready For Refinement Sprint

Use `Ready for Refinement` for tickets that have been written and are ready for
the team to scope the work.

- Board: `5957`
- Sprint name: `Ready for Refinement`
- Sprint ID: `46737`
- Sprint field: `customfield_10104`

Show this in proposed payloads as
`Refinement sprint: Ready for Refinement (46737)` when the approved issue will
be ready for team scoping after creation or update. This is a Jira write action,
not a label. Create or update the issue first, then call
`jira_add_issues_to_sprint` only after the human explicitly approves both the
issue payload and the sprint placement.

Leave the refinement sprint unset when:

- the ticket is still a draft
- the human is still iterating on the ticket wording
- the agent is still gathering source context, acceptance criteria, or scope
- the ticket is not yet written enough for the team to scope

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

Child tickets may inherit labels or priority from an epic only when the epic is
clearly the right parent and matching child tickets show that pattern.

## Description Conventions

Use concise Jira wiki markup. Common section names include:

- `Context`
- `Requirements`
- `Task`
- `Out of scope` or `Out of Scope`
- `Acceptance Criteria` or `ACs`
- `User story`
- `Considerations`
- `Resources`
- `Reproduction Steps`
- `Expected Behavior`
- `Summary`
- `Goal`
- `Next Work`

Sparse descriptions are common for API stories, product stories, epics,
initiatives, new-feature issues, and very small bugs. Missing sections are not
by themselves a reason to propose `Ready for Refinement`; leave the sprint unset
until the ticket is written enough for team scoping.

## Search Patterns

Use JQL like these before interpreting conventions or drafting:

```text
project = FFS ORDER BY created DESC
project = FFS AND text ~ "household" ORDER BY created DESC
project = FFS AND issuetype = Epic AND status != Done ORDER BY updated DESC
project = FFS AND labels in (engineering) ORDER BY created DESC
project = FFS AND labels in (emmy_ato, governance, CFACTS) ORDER BY updated DESC
project = FFS AND summary ~ "Explore" ORDER BY created DESC
Sprint = 46737 ORDER BY updated DESC
```
