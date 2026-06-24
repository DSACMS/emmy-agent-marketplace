# Jira Description Templates

Use Jira wiki markup in `FFS` ticket descriptions. Prefer concise sections with
specific acceptance criteria over long prose.

Before using a template, read `category-index.md` and the relevant category
reference. Category references define when a template should be sparse,
expanded, or adjusted to match recent team practice.

## Official Template Source

The base description shapes come from the SFIV Confluence page
`Ticket Templates`, page ID `1198533169`, observed at version `7`:
`https://confluenceent.cms.gov/pages/viewpage.action?pageId=1198533169`.

Use the Confluence template headings as the base structure. Category-specific
guidance may add sections, but should not fight the official headings. Do not
copy Confluence placeholders such as `<Your AC here>` or parenthetical
instructions into real drafts.

## Official Template Shapes

Use these shapes when the issue type or source context maps directly to the
Confluence templates.

### Task

```text
h2. Summary
[One sentence that describes the work.]

h2. Context
[Why this work is needed. Include links to source tickets, PRs, Figma,
Confluence, Slack, logs, or incidents when relevant.]

h2. Acceptance Criteria
* [Observable condition for completion]
* Any string changes are translated, when applicable.
* Any new or changed events are updated on the CBV Events Confluence page, when
  applicable.
* Acceptance testing has been performed by a non-technical team member, when
  applicable.
```

### Task (Emmy MVP)

```text
h2. Summary
[One sentence that describes the work.]

h2. Context
Link to designs: [Figma link, when applicable.]

* [Item to implement]
* [Item to implement]

h2. Out of scope
* [Explicit non-goal]

h2. Acceptance Criteria
* [Acceptance criterion]
* Work meets MVP guidelines
** Content must be tokenized, but Spanish translations ARE NOT required.
** Only tokenized link flows must be considered. Generic links flows are NOT in
   scope; they will be added later.
** Activity flow data stored in our data model does not need to be represented
   in the PDF or JSON API; it will be added later.
** No events need to be added to Mixpanel. They will be added later.
* Acceptance testing has been performed by *design and product*.
```

### Bug

```text
h2. Reproduction Steps
# [Step one]
# [Step two]
# [Observed failure]

h2. Expected Behavior
[What should happen instead.]

h2. Screenshots
[Attach or link screenshots when useful, otherwise omit this section.]

h2. Acceptance Criteria
* [Bug is fixed]
* Any string changes are translated, when applicable.
* Any new or changed events are updated on the CBV Events Confluence page, when
  applicable.
* Acceptance testing has been performed by a non-technical team member, when
  applicable.
```

### Bug (Emmy MVP)

```text
h2. Reproduction Steps
# [Step one]
# [Step two]
# [Observed failure]

h2. Expected Behavior
[What should happen instead.]

h2. Screenshots
[Attach or link screenshots when useful, otherwise omit this section.]

h2. Acceptance Criteria
* [Bug is fixed]
* Work meets MVP guidelines
** Content must be tokenized, but Spanish translations ARE NOT required.
** Only tokenized link flows must be considered. Generic links flows are NOT in
   scope; they will be added later.
** Activity flow data stored in our data model does not need to be represented
   in the PDF or JSON API; it will be added later.
** No events need to be added to Mixpanel. They will be added later.
* Acceptance testing has been performed by *design and product*.
```

### Epic

When creating an epic, set `customfield_10102` (`Epic Name`). The Epic Name can
be shorter than the summary when the summary includes a program prefix.

```text
h2. Summary
[Short description of the body of work and why it matters.]

h3. Responsible Designer
[Name or unset.]

h3. Responsible Engineer
[Name or unset.]

h2. Context
[Why this body of work exists.]

h2. Documentation

h3. Requirements Documentation
* [Link or unset.]

h3. Finished Designs
* [Link or unset.]
```

## Category Templates

Use these when category-specific guidance calls for additional structure beyond
the official template shape.

### Engineering Task

```text
h2. Summary
[One sentence that describes the work.]

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

See `engineering-implementation.md` for field and label conventions.

### Engineering Spike Or Tech Spec

```text
h2. Summary
[One sentence that describes the investigation.]

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

See `spike-tech-spec.md` before deciding whether implementation belongs out of
scope.

### Design Task

```text
h2. Summary
[One sentence that describes the design or content work.]

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

h2. Acceptance Criteria
* [Design artifact, prototype, or decision exists]
* [Relevant product/design review completed]

h2. Resources
* [Figma, research notes, related tickets, or Confluence links]
```

Add `Activities` when the ticket is discovery or ideation work with multiple
design activities.

See `design-content.md` for discovery/content variants and acceptance criteria
style.

### API Story

```text
h2. Summary
[One sentence that describes the API or state-integration work.]

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

See `api-state-integration.md`; sparse API stories are common.

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
- Refinement sprint, or `unset`
- Epic Link, or `unset` with candidate epics if found
- Components and fix versions, or `unset`
- Full Jira wiki description

When `Ready for Refinement` is proposed, ask for approval with a concrete
sentence such as:

```text
Do you approve creating this FFS Jira ticket with the payload above and adding
it to Ready for Refinement (46737) after creation?
```

When no sprint placement is proposed, ask:

```text
Do you approve creating this FFS Jira ticket with the payload above?
```
