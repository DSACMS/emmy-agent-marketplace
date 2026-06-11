---
name: emmy-artifact-ingest
description: >-
  Use only when explicitly asked to ingest knowledge into the Emmy Agent
  Knowledge Store from a local file, URL, external Confluence page, or Emmy
  GitHub repository checkout with traceable source provenance.
---

# Emmy Artifact And Repository Ingest

Use this skill for the specialized knowledge-source ingestion workflow. Do not
use it for ordinary knowledge-store lookup, general Confluence updates, or
ambient capture suggestions.

The default ingest mode is Review Queue: create source records and
`needs-review` knowledge entries. Promote to canonical pages only when the user
explicitly asks for promotion or names a canonical destination page.

## Source Of Truth

- Knowledge-store entry point:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1381557075/Emmy+Agent+Knowledge+Store`
- MCP server: `cms-atlassian-confluence`
- Source registry area: `Knowledge Source Registry`
- Ingestion queue area: `Knowledge Ingestion Queue`

## Supported Inputs

Classify the source first:

- **Local file**: upload the file as a Confluence attachment, extract knowledge,
  and cite the source record plus file metadata.
- **URL**: extract directly from the reachable content and do not upload a copy.
- **External Confluence page**: read through Confluence MCP, record page
  metadata, and do not upload a copy.
- **Emmy repository checkout**: extract from a local Git checkout and do not
  upload files. Treat the local checkout as the lookup source, not the
  `github.com` URL.

Read `references/source-ingest-protocol.md` before ingesting any source.

## Provenance Contract

Every extracted claim must be traceable to one source record. Every source
record must link forward to all queue entries or canonical pages created from
that source.

For repository-derived claims, include `repo`, `branch`, `commit`,
`relative_path`, `line_range` or `symbol`, and `applicability`. Read
`references/branch-applicability.md` before writing repository-derived
knowledge.

Use `references/source-provenance-template.md` for source records and queue
entries. Use `references/project-repositories.md` to resolve known Emmy
repository identifiers and local checkouts.

## Ingest Workflow

1. Confirm the user explicitly asked to ingest knowledge into the store.
2. Classify the input as local file, URL, external Confluence page, or
   repository checkout.
3. Inspect the knowledge-store entry page children for the source registry and
   ingestion queue.
4. Create missing registry or queue pages only when the user authorized
   persistence.
5. Create or reuse a source record for the source.
6. Extract only evidence-backed, reusable knowledge.
7. Create `needs-review` queue entries by default, linking each claim to the
   source record.
8. If canonical promotion is explicitly requested, run the normal
   `emmy-knowledge-store` write-safety workflow before updating the page.
9. Re-read or diff changed Confluence pages and report source record plus queue
   or canonical page URLs.

Stop rather than guessing when a source cannot be accessed, a local repository
checkout cannot be found, Confluence authentication fails, or the source appears
to contain secrets or sensitive data that should not be stored.

## Tool Use

Use Confluence MCP tools for page search/read/create/update/comment/label and
attachment upload tasks. Use local shell and structured parsers when available
to inspect files or Git repositories. Do not use Jira tools. Do not delete,
move, or reorganize Confluence pages.
