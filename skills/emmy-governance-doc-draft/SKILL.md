---
name: emmy-governance-doc-draft
description: >-
  Draft or create Emmy governance documents from an already-developed system,
  process, policy, or operating model. Use when asked to write, draft, create,
  update, or publish a Confluence governance document for Emmy ATO, open source,
  release, state communication, or internal governance work; do not use to
  develop the underlying plan itself.
---

# Emmy Governance Doc Draft

Use this skill to turn an already-developed Emmy system, process, policy, or
operating model into a structured governance document.

This skill communicates an existing process. It does not design the process,
choose missing operating rules, or decide how Emmy should work. If the source
system is incomplete, pause and ask for the missing facts before drafting.

Do not use Jira tools from this workflow.

## Source Of Truth

- Governance parent page: `1398349788`
- Governance parent title: `Governance`
- Governance parent URL:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1398349788/Governance`
- Confluence space: `SFIV`
- Registry label: `governance`
- Default status: `Draft`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

## Reference Routing

Read `references/governance-doc-template.md` before drafting or updating a
governance document. It contains the required document structure and field
rules.

## Supported Inputs

Accept these source forms:

- Pasted notes describing an already-developed system or process.
- Local Markdown files named by the user.
- Confluence pages or page IDs that describe the source system.
- A user-provided existing governance page ID or URL when the user explicitly
  asks to update that page.

## Required Inputs

Before drafting, confirm these facts are present or explicitly not applicable:

- Document title.
- Domain: `Security & Compliance`, `Open Source`, or `Release & Comms`.
- Purpose or obligation.
- Applies-to scope.
- Does-not-apply exclusions.
- Current process description.
- Process roles and responsibilities.
- Tools and systems, or explicit statement that none are required.
- Driver role or team.
- One Approver role.
- Contributors roles or teams.
- Informed roles or teams.
- Review cadence.
- Requirement citation when an external obligation applies.
- Control ID and Control Family when the document is ATO-related.

If any required fact is missing, ask for that fact before drafting. Do not fill
missing process decisions with invented content.

## Draft Workflow

1. Identify source provenance:
   - page title, page ID, URL, space, and version for Confluence pages;
   - filename and date reviewed for local files;
   - `human-provided text` for pasted content.
2. Determine whether the request is for a new page or an update:
   - new page: default parent is `1398349788`;
   - update: require a page ID or URL and explicit user request to update.
3. Check the required input list.
4. Draft a preview using `references/governance-doc-template.md`.
5. Ask for explicit user approval before calling `confluence_create_page`,
   `confluence_update_page`, `confluence_add_label`, or any other write tool.
6. After approval for a new page:
   - create the child page under parent `1398349788`;
   - apply the `governance` label;
   - re-read the page and labels;
   - report the page title, URL, parent, version, and label confirmation.
7. After approval for an update:
   - re-read the current page immediately before updating;
   - keep the edit narrow to the approved draft;
   - re-read the page and labels after updating.

## Write Safety

- A request to "draft", "prepare", "write", or "shape" is approval to produce a
  preview only, not to write Confluence.
- A request to "create" or "publish" still requires showing the final preview
  and receiving explicit approval before the Confluence write.
- Do not create Jira tickets, update Jira tickets, or add Jira links unless they
  are already supplied in the source content. Use the Emmy Jira ticketing skill
  for Jira work.
- Do not move a page, delete a page, change parent pages, or reorganize the
  Governance tree.
- Do not claim a document is approved unless the source explicitly records
  approval and an approval date.

## Drafting Rules

- Write in present tense and describe current Emmy reality.
- Do not hide gaps in polished prose. If a process decision is missing, pause
  before drafting.
- Use role titles rather than personal names in metadata.
- Approver must be exactly one role and must not be the same as Driver.
- Leave ATO fields blank for non-ATO documents.
- Include Related Tickets only when the user supplied them or they are already
  present in the source.
- Keep public-facing open source material out of scope unless the user provides
  a separate public counterpart. This skill creates internal Confluence
  governance documents.
