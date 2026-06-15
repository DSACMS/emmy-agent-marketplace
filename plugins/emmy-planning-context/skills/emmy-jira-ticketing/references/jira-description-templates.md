# Jira Description Templates

Use Jira wiki markup in `FFS` ticket descriptions. Prefer concise sections with
specific acceptance criteria over long prose.

## Engineering Task

```text
h2. Context
[Why this work is needed. Include links to source tickets, PRs, Figma,
Confluence, Slack, logs, or incidents when relevant.]

h2. Requirements
* [Expected behavior or implementation requirement]
* [Important constraint]
* [Compatibility or migration note]

h2. Out of scope
* [Explicit non-goal]

h2. Acceptance Criteria
* [Observable condition for completion]
* [Testing or review expectation]
```

Use `Implementation Direction` instead of `Requirements` when the ticket should
name a likely technical path but still leave implementation details to the
engineer.

## Engineering Spike Or Tech Spec

```text
h2. Context
[Decision, uncertainty, or technical problem to investigate.]

h2. Task
* [Research or design activity]
* [Comparison, prototype, or documentation expectation]

h2. Out of scope
* Implementing the chosen solution.

h2. Acceptance Criteria
* [Written recommendation, tech spec, comment, or decision record exists]
* [Trade-offs and risks are documented]
```

Use summary prefixes such as `Spike:` or `Tech Spec:` when nearby tickets use
that pattern for similar work.

## Design Task

```text
h2. User story
As a [client/user/team member], I want [capability or understanding], so that
[outcome].

h2. Context
[Research finding, product problem, pilot context, or design rationale.]

h2. Considerations
* [Scenario or design pressure to explore]
* [Question to pressure test]

h2. Out of scope
* [Explicit non-goal]

h2. Acceptance criteria
* [Design artifact, prototype, or decision exists]
* [Relevant product/design review completed]

h2. Resources
* [Figma, research notes, related tickets, or Confluence links]
```

Add `Activities` when the ticket is discovery or ideation work with multiple
design activities.

## Bug

```text
h2. Context
[What is broken, who it affects, and how it was discovered.]

h2. Reproduction Steps
# [Step one]
# [Step two]
# [Observed failure]

h2. Expected Behavior
[What should happen instead.]

h2. Acceptance Criteria
* [Bug is fixed]
* [Regression coverage or manual acceptance is completed]

h2. Screenshots
[Attach or link screenshots when useful, otherwise omit this section.]
```

If the source has actual SQL, logs, or stack traces, include a short excerpt or
link rather than burying the ticket in raw output.

## API Story

```text
h2. Context
[State, partner, or API consumer need.]

h2. Product Requirements
# [API request/response or behavior requirement]
# [Backward compatibility or timing requirement]
# [Documentation/sample payload expectation]

h2. Out of Scope
* [Explicit non-goal]

h2. Acceptance Criteria
* [Endpoint/schema/documentation behavior is complete]
* [Tests or example payloads cover the new behavior]
```

Use label `emmy_api` when the work is API-facing. Add `engineering` only when
nearby similar tickets use both labels or the human asks for it.

## Epic

When creating an epic, set `customfield_10102` (`Epic Name`). The Epic Name can
be shorter than the summary when the summary includes a program prefix.

```text
h2. Summary
[Short description of the body of work and why it matters.]

h2. Goal
* [Outcome the grouped work should achieve]

h2. Next Work
* [Known child-ticket area]
* [Known child-ticket area]
```

Keep epics concise. Detailed implementation usually belongs in child tickets.

## Initiative

```text
h2. Summary
[Broad strategic goal or problem area.]

h2. Goals
* [Outcome or decision the initiative should drive]
* [Outcome or decision the initiative should drive]

h2. Notes
* [Known related epics, docs, or planning context]
```

Initiatives can be sparse when they are placeholders for planning hierarchy.

## Draft Payload Checklist

Before asking for approval, show:

- Issue type
- Summary
- Priority
- Labels
- Team, or `unset`
- Epic Link, or `unset` with candidate epics if found
- Components and fix versions, or `unset`
- Full Jira wiki description

Ask for approval with a concrete sentence such as:

```text
Do you approve creating this FFS Jira ticket with the payload above?
```
