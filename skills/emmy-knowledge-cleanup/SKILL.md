---
name: emmy-knowledge-cleanup
description: >-
  Use when a human wants to audit or maintain the Emmy Agent Knowledge Store as
  a whole: find duplicate or overlapping pages and claims, identify stale or
  contradictory content, recommend labels, and decide whether new child pages
  should be added before any Confluence cleanup or reorganization.
---

# Emmy Knowledge Cleanup

Use this skill for explicit knowledge-store maintenance. This is a whole-store
audit and planning workflow, not ordinary ambient lookup, source ingestion, or
queue curation.

## Source Of Truth

- Knowledge-store entry point:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1381557075/Emmy+Agent+Knowledge+Store`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

## Relationship To Other Skills

- Use `emmy-knowledge-store` for targeted context lookup, durable capture, and
  narrow canonical updates.
- Use `emmy-artifact-ingest` for explicit source ingestion from files, URLs,
  external Confluence pages, or repository checkouts.
- Use `emmy-queue-curate` for human review and promotion of existing Knowledge
  Ingestion Queue entries.
- Use this skill only when the task is about store health, duplication,
  hierarchy design, label hygiene, stale content, or page organization.

Read `references/cleanup-protocol.md` before auditing or proposing cleanup.

## Cleanup Workflow

1. Read the entry page and inspect its current child pages. Treat the entry page
   as the only stable root; do not assume the current child list is complete or
   permanent.
2. Build a lightweight store inventory from page metadata, labels, parent-child
   relationships, and brief page summaries. Load full page content only for
   candidate duplicates, contested claims, oversized pages, or proposed cleanup
   targets.
3. Search for exact and near-duplicate titles, repeated source records,
   overlapping canonical claims, stale queue entries, contradictory facts,
   orphan pages, missing labels, and pages whose content has outgrown their
   current parent.
4. Decide whether a new child page is warranted using the decision rules in
   `references/cleanup-protocol.md`.
5. Present a cleanup report in chat with findings, evidence page IDs or URLs,
   proposed actions, risks, and write requirements.
6. Write nothing to Confluence until the human gives explicit approval for the
   specific cleanup action.
7. Before any approved write, run the `emmy-knowledge-store`
   `references/write-safety.md` checks and re-read the pages being changed.
8. After any approved write, re-read or diff changed pages and report the final
   page URLs or IDs.

## Cleanup Boundaries

Do not delete Confluence pages. Do not move pages unless a future tool exposes
an explicit move operation and the human specifically approves that move. Prefer
creating a proposed cleanup plan over performing structural edits.

When cleanup identifies duplicate canonical content, prefer one of these
non-destructive actions after approval:

- update the destination page with a concise canonical version;
- add a note pointing duplicate readers to the canonical page;
- add or correct labels;
- create a new child page for a durable topic area;
- queue uncertain consolidation work for human review.

Do not store secrets, local scratch paths, personal data, speculative claims, or
uncurated conclusions as cleanup output.

## Tool Use

Use Confluence MCP read tools for page, child, label, history, and diff
inspection. Use write, comment, label, attachment, or create tools only after
explicit approval and only for the approved cleanup action.

Do not use Jira tools from this workflow, even though the shared MCP config may
expose them. Do not perform source ingestion from this workflow.
