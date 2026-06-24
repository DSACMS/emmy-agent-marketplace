# Spike, Tech Spec, And Discovery Tickets

Use this reference for spikes, tech specs, discovery, investigation,
recommendations, options analysis, or exploratory planning work.

## Field Pattern

- Issue type: `Task` or `Story`; match nearby tickets for the domain.
- Summary: use prefixes such as `Spike:`, `Tech Spec:`, `Discovery:`, or
  `Explore:` when nearby tickets use that pattern.
- Priority: `Low` by default; design/product discovery can be `High` when
  near-term product direction or pilot readiness depends on it.
- Labels: use the domain label, such as `engineering`, `design`, or `emmy_api`;
- Refinement sprint: propose `Ready for Refinement (46737)` when the work is
  intentionally rough.
- Epic Link: set only when supplied or strongly supported by nearby tickets.

## Description Shape

Common headings:

- `Context`
- `Task`
- `Out of scope`
- `Acceptance Criteria`

Acceptance criteria should require an output such as a written recommendation,
tech spec, comparison, prototype result, comment, decision record, or follow-up
ticket list. Implementation of the chosen solution is usually out of scope.

## Examples From Jira Scan

- `FFS-4458`: `Spike:` engineering tech spec task, high priority.
- `FFS-4437`: `Tech Spec:` story for Plaid integration investigation,
  `engineering`.
- `FFS-4401`: `Discovery:` product/API integration exploration sprint plan, high
  priority.
