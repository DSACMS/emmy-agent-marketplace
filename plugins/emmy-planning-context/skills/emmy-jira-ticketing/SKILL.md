---
name: emmy-jira-ticketing
description: >-
  Use when interpreting, drafting, refining, or creating Emmy Jira tickets in
  the FFS project, especially when an agent needs to apply team ticket
  conventions, choose issue type/labels/priority, format Jira wiki descriptions,
  inspect similar tickets or epics, or create Jira issues through the CMS
  Atlassian MCP server with explicit human approval.
---

# Emmy Jira Ticketing

## Overview

Use this skill for Emmy Jira work in the CMS `FFS` project. It supports two main
workflows: interpreting existing Jira tickets in light of team conventions, and
drafting or creating new tickets that match those conventions.

## Source Of Truth

- Jira project key: `FFS`
- Jira project name: `Income Verification as a Service`
- Jira base URL: `https://jiraent.cms.gov`
- MCP server: `cms-atlassian-confluence`
- Required environment: `JIRA_PERSONAL_TOKEN`
- Shared MCP config path in the marketplace repo:
  `mcp/cms-atlassian-confluence/.mcp.json`

The skill conventions are based on read-only analysis of `FFS` issues created
from March 15, 2026 through June 15, 2026. Treat these as team conventions, not
Jira platform rules.

## Reference Routing

- Read `references/ffs-ticket-conventions.md` before interpreting a ticket,
  selecting fields, or explaining why a draft does or does not match team
  conventions.
- Read `references/jira-description-templates.md` before drafting a new ticket
  description or converting human notes into Jira wiki markup.

## Interpret Existing Tickets

1. Read the issue with `jira_get_issue`.
2. Parse issue type, status, priority, labels, components, fix versions, team,
   epic link, summary, and description headings.
3. Compare the ticket to the conventions reference.
4. Explain the ticket in plain language:
   - what work it is asking for
   - what area likely owns it, based only on labels/team/epic evidence
   - whether it looks ready or appears to need refinement
   - any missing sections that matter for that issue type
5. Avoid over-reading sparse tickets. Some recent `Story`, `Epic`, `Initiative`,
   and `New Feature` issues have little or no description.

## Draft Or Create Tickets

1. Search for similar recent `FFS` issues with `jira_search` before drafting.
   Also search likely open epics when the request sounds like part of larger
   work.
2. Draft the full issue payload before creating anything:
   - project `FFS`
   - issue type
   - summary
   - Jira wiki description
   - priority
   - labels
   - optional team
   - optional epic link
   - optional components or fix versions only when clearly requested
3. Present the draft and ask for explicit approval before calling
   `jira_create_issue`, `jira_update_issue`, `jira_link_to_epic`,
   `jira_create_issue_link`, or any other Jira write tool.
4. If the human approves creation, create the issue, then re-read it with
   `jira_get_issue`.
5. Report the created key and URL.

## Write Safety

- Never create, update, transition, link, comment on, or delete Jira issues
  without explicit human approval for the final payload.
- A user asking to "draft", "prepare", "write up", "propose", "shape", or "turn
  this into a ticket" is not approval to create the issue.
- If Jira requires `Reporter` and the MCP tool does not default it, ask the
  human which reporter or current user to use.
- Do not set story points, Definition of Ready, components, fix versions, or
  team unless the human supplied them or the evidence is strong.
- Do not create live test tickets unless the human separately approves that
  specific test.

## Tool Use

Use Jira MCP tools from `cms-atlassian-confluence` for Jira reads and writes.
Use Confluence tools only when the ticket request explicitly depends on Goals
Space, Knowledge Store, design docs, runbooks, or other Confluence content.

Do not use this skill to write Emmy Goals Space or Knowledge Store pages. Use
the dedicated planning or knowledge-store skills for those workflows.
