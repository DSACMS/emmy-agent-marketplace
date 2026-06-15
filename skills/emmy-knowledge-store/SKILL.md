---
name: emmy-knowledge-store
description: >-
  Use when an Emmy task may benefit from the shared Confluence knowledge store:
  product context, architecture, ATO, onboarding, runbooks, decisions,
  troubleshooting, stale context, prior team knowledge, or durable task
  learnings that should be captured or published through
  cms-atlassian-confluence.
---

# Emmy Knowledge Store

Use this skill to help agents work with the Emmy Agent Knowledge Store as a
shared team memory. The default posture is: consult freely, capture proactively,
publish deliberately.

## Source Of Truth

- Entry point:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1381557075/Emmy+Agent+Knowledge+Store`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

## Dynamic Store Map

Treat the entry-point page as the only stable root. Do not depend on a
hard-coded list of child pages. At the start of a knowledge-store task, inspect
the current entry-page children and use their titles, labels, short page
content, and own children as routing metadata.

Load the smallest useful slice of the store:

1. Read the entry page or get its current children.
2. Build a lightweight map of top-level child pages without content first.
3. Read only likely candidate pages, using search and labels when hierarchy
   alone is not enough.
4. Recurse into children when a page acts like an index, queue, registry,
   category, source collection, or canonical topic area.
5. Treat newly added child pages as valid store structure without requiring a
   skill update unless the source-of-truth root, MCP server, or write policy
   changes.

For broad navigation, duplicate detection, or page-organization questions, read
`references/search-and-labels.md`. For whole-store cleanup, duplicate audits, or
deciding whether to add new child pages, use `$emmy-knowledge-cleanup`.

## Ambient Loop

1. **Consult** current Confluence content when the task may depend on Emmy
   product, architecture, ATO, operational, onboarding, troubleshooting, or
   prior decision context.
2. **Apply** what you learn to the user's task. Cite page titles and URLs or
   page IDs when Confluence content materially shaped the answer or
   implementation.
3. **Capture** durable knowledge discovered during the task: verified decisions,
   reusable facts, canonical links, runbooks, failure resolutions, or resolved
   ambiguity.
4. **Publish or propose** the capture. Only write to Confluence when the user
   explicitly asks to persist, update, curate, or capture knowledge-store
   content. Otherwise, summarize the proposed capture in the final answer.

Read `references/ambient-protocol.md` when deciding whether to consult, propose,
queue, or publish knowledge.

## When To Consult

Consult the knowledge store before making claims about current Emmy context,
prior decisions, architecture, ATO state, team runbooks, onboarding steps, or
operational practices. Also consult when local files, memory, or copied notes
may be stale or conflict with a current team source.

Do not consult for trivial local-only edits, purely mechanical formatting,
commands that do not depend on Emmy context, or tasks where the user explicitly
asks you not to use external knowledge.

For broad or uncertain searches, read `references/search-and-labels.md`.

## Specialized Source Ingestion

Do not use this ambient skill for source ingestion from local files, URLs,
external Confluence pages, or Emmy repository checkouts. When the user
explicitly asks to ingest a source into the knowledge store, use
`$emmy-artifact-ingest` or the `emmy-artifact-ingestor` plugin agent.

When answering from knowledge that came through the ingestion workflow, preserve
source provenance in citations or summaries. For repository-derived knowledge,
re-check the local repository evidence when branch, commit, or dirty-worktree
applicability matters.

## Specialized Queue Curation

Do not use this ambient skill for interactive review of pending Knowledge
Ingestion Queue entries. When the user asks to process, review, curate, verify,
or promote queue entries with a human reviewer, use `$emmy-queue-curate` or the
`emmy-queue-curator` plugin agent.

Queue curation validates one `needs-review` entry at a time and promotes only
after explicit final human approval. If the reviewer does not know, wants a
teammate to answer, or says the entry needs discussion, the v1 curator should
pause without writing Confluence discussion artifacts.

## Capture And Write Policy

Durable knowledge includes verified team decisions, stable procedures, reusable
troubleshooting findings, canonical source links, current architecture or ATO
facts, and context that would help another agent avoid repeating the same
investigation.

Never store secrets, tokens, personal credentials, speculative claims, transient
chat notes, local scratch paths, private user data, or unverified conclusions.

Writing rules:

- No silent canonical updates. Canonical pages may be updated only when the user
  explicitly asks to update or persist knowledge-store content.
- Low-confidence, contested, or not-yet-curated knowledge belongs in an Agent
  Capture Queue entry when the user authorizes persistence.
- Create one capture page per candidate instead of appending many agents' notes
  to the same page.
- Before any Confluence write, read `references/write-safety.md`.
- For multiple agents or concurrent developers, read
  `references/fleet-agent-protocol.md`.
- When drafting page content or a capture candidate, use
  `references/knowledge-entry-template.md`.

## Runtime Requirements

- `uvx` must be available on `PATH` so the plugin can run `uvx mcp-atlassian`.
- The agent environment needs network access to `https://confluenceent.cms.gov`.
- Each user must provide their own CMS Confluence Data Center personal access
  token in `CONFLUENCE_PERSONAL_TOKEN`.
- The shared Atlassian MCP config also forwards `JIRA_PERSONAL_TOKEN` when
  present, but this plugin does not enable Jira tools.

If the MCP server is unavailable or Confluence authentication fails, stop and
tell the user that the plugin needs a valid `CONFLUENCE_PERSONAL_TOKEN` in the
agent environment. Do not ask the user to paste tokens into the chat.

## MCP Tool Use

Start from the entry-point page and inspect its current children unless the user
gives a more specific page URL, page ID, title, or Confluence query. Use
Confluence MCP tools such as `confluence_search`, `confluence_get_page`,
`confluence_get_page_children`, `confluence_get_page_history`, and
`confluence_get_page_diff` for reading.

Use `confluence_create_page`, `confluence_update_page`,
`confluence_add_comment`, `confluence_reply_to_comment`,
`confluence_get_labels`, `confluence_add_label`, `confluence_upload_attachment`,
`confluence_upload_attachments`, `confluence_get_attachments`,
`confluence_download_attachment`, `confluence_download_content_attachments`, and
`confluence_get_page_images` only when they fit an authorized write, comment,
label, or attachment task.

Do not use Jira tools for this skill. Do not delete, move, or reorganize pages
unless a future plugin or an explicit task adds that capability.
