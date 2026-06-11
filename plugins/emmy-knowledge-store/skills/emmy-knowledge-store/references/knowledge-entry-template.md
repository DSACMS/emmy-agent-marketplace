# Knowledge Entry Template

Use these templates when drafting canonical page content or an Agent Capture
Queue candidate. Adapt headings to the existing page structure instead of
forcing a duplicate format.

## Canonical Page Section

```markdown
## [Topic]

**Summary:** [One or two sentences with the durable fact or decision.]

**Applies to:** [Environment, repo, workflow, ATO area, or system boundary.]

**Date verified:** YYYY-MM-DD

**Source/evidence:**

- [Page, PR, commit, ticket, command output summary, or artifact URL]

**Details:**

- [Reusable procedure, decision, constraint, or finding.]
- [Important caveats or version/environment limits.]

**Related pages:**

- [Confluence page title or URL]

**Confidence/staleness:** [High/medium/low; when to re-check.]
```

## Capture Queue Page

```markdown
# YYYY-MM-DD - short-topic - agent-or-task-id

**Status:** needs-review

**Proposed destination:** [Canonical page title/URL, or "unknown".]

**Summary:** [What should future agents know?]

**Applies to:** [Scope.]

**Date observed:** YYYY-MM-DD

**Source/evidence:**

- [URL, page ID, PR, commit, ticket, or concise command-output summary]

**Why this matters:** [How this would improve future tasks.]

**Suggested labels:** emmy, agent-knowledge, [type labels]

**Open questions:** [What a curator should verify before promoting.]

**Do not publish as canonical until:** [Condition, if any.]
```

## Required Fields

Every entry or capture candidate must include summary, applies-to scope,
source/evidence links, date verified or observed, source provenance,
confidence/staleness, related pages when known, and labels.
