---
name: emmy-queue-curate
description: >-
  Use when a human wants to interactively review, validate, and promote pending
  Emmy Knowledge Ingestion Queue entries into canonical knowledge-store content.
---

# Emmy Queue Curation

Use this skill for the human-in-the-loop curation workflow over the Emmy
Knowledge Ingestion Queue. This is a validation and promotion workflow, not a
source-ingestion workflow.

## Source Of Truth

- Knowledge-store entry point:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1381557075/Emmy+Agent+Knowledge+Store`
- MCP server: `cms-atlassian-confluence`
- Ingestion queue area: `Knowledge Ingestion Queue`
- Known queue page ID: `1384894000`
- Source registry area: `Knowledge Source Registry`
- Known source registry page ID: `1380870742`

## Relationship To Other Skills

- Use `emmy-artifact-ingest` to create source records and `needs-review` queue
  entries from local files, URLs, external Confluence pages, or repository
  checkouts.
- Use this skill after queue entries already exist and a human is ready to
  validate one entry at a time.
- Use `emmy-knowledge-store` write-safety rules before any canonical page, queue
  entry, queue index, comment, label, or attachment write.

Read `references/queue-curation-protocol.md` before processing any queue entry.

## Curation Workflow

1. Read the knowledge-store entry page and locate the
   `Knowledge Ingestion Queue`.
2. Read the queue index and choose the first `needs-review` entry in index order
   unless the human names a specific queue entry.
3. Read the queue entry, source record, proposed destination page, and relevant
   destination history or diff when preparing a write.
4. Present a compact review packet: summary, applies-to scope, confidence,
   source record, source locator, proposed destination, extracted claims, and
   open questions.
5. Ask whether the entry is true enough to ingest. Use hybrid review: drill into
   individual claims only when the human flags uncertainty, correction, or
   missing context.
6. Draft canonical text only after the human confirms the entry or supplies
   enough correction to make it accurate.
7. Write nothing to Confluence until the human gives explicit final approval for
   that entry.
8. After final approval, narrowly update the canonical destination, update the
   queue entry status to `promoted`, update the queue index row, re-read or diff
   the changed pages, and report URLs or page IDs.

## Human Uncertainty

If the human says they do not know, wants a teammate to answer, or says the item
needs discussion, stop processing that entry without changing Confluence.
Explain that teammate routing and discussion artifacts are future workflow
features, then ask whether they want to move to another queue entry.

Do not implement future discussion behavior in v1. Do not create discussion
pages, assignee records, teammate mentions, or discussion labels unless a future
plugin explicitly adds that capability.

## Tool Use

Use Confluence MCP read tools for queue, source-record, destination, history,
and diff inspection. Use write tools only after explicit final approval and only
for the authorized queue/canonical updates.

Do not use Jira tools from this workflow, even though the shared MCP config may
expose them. Do not delete, move, or reorganize pages. Do not ingest new sources
from this workflow.
