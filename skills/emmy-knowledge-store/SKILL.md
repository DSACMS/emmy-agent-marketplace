---
name: emmy-knowledge-store
description:
  Use when working with the Emmy Agent Knowledge Store in CMS Confluence,
  including searching, reading, citing, creating, or narrowly updating
  Confluence pages through the cms-atlassian-confluence MCP server.
---

# Emmy Knowledge Store

Use this skill when the user asks for Emmy product context, durable team notes,
or updates to the Emmy Agent Knowledge Store in Confluence.

## Source Of Truth

- Entry point:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1381557075/Emmy+Agent+Knowledge+Store`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

## Runtime Requirements

- `uvx` must be available on `PATH` so the plugin can run `uvx mcp-atlassian`.
- The agent environment needs network access to `https://confluenceent.cms.gov`.
- Each user must provide their own CMS Confluence Data Center personal access
  token in `CONFLUENCE_PERSONAL_TOKEN`.
- `JIRA_PERSONAL_TOKEN` belongs to the same Atlassian Data Center auth pattern,
  but this plugin does not consume it. Future Jira plugins that reuse the same
  MCP server can require it without changing this Confluence knowledge-store
  plugin.

If the MCP server is unavailable or Confluence authentication fails, stop and
tell the user that the plugin needs a valid `CONFLUENCE_PERSONAL_TOKEN` in the
agent environment. Do not ask the user to paste tokens into the chat.

## Read Workflow

1. Start from the entry-point page unless the user gives a more specific page
   URL, page ID, title, or Confluence query.
2. Use Confluence MCP tools such as `confluence_search`, `confluence_get_page`,
   `confluence_get_page_children`, `confluence_get_page_history`, and
   `confluence_get_page_diff`.
3. Prefer current Confluence content over memory, copied notes, or local
   documents when answering questions about the knowledge store.
4. Include page titles and URLs or page IDs when summarizing source-backed
   findings.

## Write Workflow

Only create or update Confluence content when the user explicitly asks for a
knowledge-store change.

Before writing:

1. Read the current target page.
2. Confirm the parent page or exact page ID.
3. Preserve unrelated content and page structure.
4. Make the smallest useful change.
5. Report the changed page title and URL or page ID.

Use `confluence_create_page`, `confluence_update_page`,
`confluence_add_comment`, `confluence_reply_to_comment`,
`confluence_get_labels`, `confluence_add_label`, `confluence_upload_attachment`,
`confluence_upload_attachments`, `confluence_get_attachments`,
`confluence_download_attachment`, `confluence_download_content_attachments`, and
`confluence_get_page_images` when they fit the request.

Do not use Jira tools for this skill. Do not delete, move, or reorganize pages
unless a future plugin or an explicit task adds that capability.
