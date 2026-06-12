# Cleanup Protocol

Use this protocol to audit the Emmy Agent Knowledge Store without turning normal
lookup tasks into whole-store maintenance.

## Inventory Pass

Build the inventory from the root outward:

1. Read or inspect the entry page.
2. Get current children for the entry page.
3. For each child, record title, page ID, URL, parent, labels when needed,
   version, and whether it has children.
4. Recurse into children for pages that behave like indexes, queues, registries,
   source collections, topic categories, archives, or canonical areas.
5. Read full content only when a page is a likely cleanup target.

Do not assume page titles from old skill instructions are exhaustive. Treat
known IDs as hints, then rediscover the current tree from Confluence.

## Duplicate And Drift Signals

Flag candidates when two or more pages have:

- same or near-same titles;
- the same source record, queue entry, repository file, Jira issue, or document
  as evidence for overlapping claims;
- repeated canonical facts with different wording;
- conflicting values, dates, statuses, or environment descriptions;
- a queue entry already promoted while another page still repeats the pending
  wording;
- stale references to copied notes when newer Confluence or repo evidence
  exists;
- large mixed-topic sections that force agents to read unrelated content.

Treat duplicate detection as a recommendation task. Do not merge or overwrite
content until a human approves the exact proposed action.

## Child Page Decision Rules

Recommend a new child page when at least one rule is true:

- a topic is durable and appears in several unrelated pages;
- repeated captures need a canonical destination but no page currently matches;
- an existing canonical page mixes multiple stable domains that agents often
  need independently;
- queue entries repeatedly target the same missing destination;
- a source registry, artifact family, runbook family, troubleshooting category,
  or decision set has enough entries to act as an index;
- reading the current parent page requires loading large irrelevant sections for
  common tasks.

Do not recommend a new child page when labels or search are enough:

- the topic is a one-off note;
- the knowledge is low-confidence, contested, or still `needs-review`;
- the grouping is only a temporary project status;
- the grouping reveals sensitive identifiers, personal data, account details, or
  private incident information;
- the content belongs in a queue entry, source record, or existing canonical
  page.

Use labels for cross-cutting facets such as `ato`, `architecture`, `decision`,
`runbook`, `troubleshooting`, `onboarding`, and `needs-review`.

## Cleanup Report

Return a concise report before any write:

- store scope audited;
- candidate duplicates or overlaps;
- stale or contradictory content;
- label or hierarchy gaps;
- proposed new child pages, with parent page and rationale;
- pages that should remain as-is;
- write actions that require approval;
- open questions or evidence gaps.

For each proposed action, include page titles and URLs or page IDs, expected
benefit, risk, and whether the action is reversible without page deletion.
