---
name: emmy-jira-ticketing
description: >-
  Use when interpreting, drafting, refining, or creating Emmy Jira tickets in
  the FFS project, especially when an agent needs to apply team ticket
  conventions for engineering, product, API, design, bug, spike, epic,
  DevOps/platform, or ATO-labeled work; choose issue type/labels/priority;
  format Jira wiki descriptions; inspect similar tickets or epics; or create
  Jira issues through the CMS Atlassian MCP server with explicit human approval.
---

# Emmy Jira Ticketing

## Overview

Use this foundational skill for Emmy Jira work in the CMS `FFS` project. It
supports two main workflows: interpreting existing Jira tickets in light of team
conventions, and drafting or creating new tickets that match those conventions.

This skill is a router over shared Jira conventions. Load the global defaults,
select only the category reference files that match the work, then draft or
interpret the ticket with those conventions. Use specialized skills, such as
`emmy-governance-followup-ticket`, when the request needs deeper source
investigation before Jira drafting.

## Source Of Truth

- Jira project key: `FFS`
- Jira project name: `Income Verification as a Service`
- Jira base URL: `https://jiraent.cms.gov`
- MCP server: `cms-atlassian-confluence`
- Required environment: `JIRA_PERSONAL_TOKEN`
- Shared MCP config path in the marketplace repo:
  `mcp/cms-atlassian-confluence/.mcp.json`

The skill conventions are based on read-only analysis of `FFS` issues created or
updated from March 15, 2026 through June 22, 2026. Treat these as team
conventions, not Jira platform rules.

## Reference Routing

- Always read `references/ffs-ticket-conventions.md` before interpreting a
  ticket, selecting fields, or explaining why a draft does or does not match
  team conventions.
- Read `references/category-index.md` before drafting or substantially refining
  a ticket. Use it to select the smallest relevant category reference set.
- Read `references/ato-traceability.md` whenever work could affect ATO
  compliance, CFACTS, control implementation, control evidence, assessment
  readiness, or governance commitments.
- Read `references/jira-description-templates.md` after selecting category
  references when drafting Jira wiki markup.
- Use `emmy-governance-followup-ticket` instead when the ticket exists because a
  Confluence governance page, ATO control finding, policy decision, repo gap, or
  system evidence creates follow-up work.

## Interpret Existing Tickets

1. Read the issue with `jira_get_issue`.
2. Parse issue type, status, priority, labels, components, fix versions, team,
   epic link, summary, and description headings.
3. Load `references/category-index.md`, select relevant category references, and
   compare the ticket to the global and category conventions.
4. Explain the ticket in plain language:
   - what work it is asking for
   - what area likely owns it, based only on labels/team/epic evidence
   - whether it looks ready or appears to need refinement
   - any missing sections that matter for that issue type
5. Avoid over-reading sparse tickets. Some recent API stories, product stories,
   bugs, epics, initiatives, and new-feature issues have little or no
   description.

## Draft Or Create Tickets

1. Search for similar recent `FFS` issues with `jira_search` before drafting.
   Search by category labels, distinctive nouns, likely state/domain names, and
   likely open epics when the request sounds like part of larger work.
2. Use `references/category-index.md` to choose category references. Combine
   references only when the ticket truly crosses categories, such as DevOps/ATO,
   API/product, or design/content work.
3. Draft the full issue payload before creating anything:
   - project `FFS`
   - issue type
   - summary
   - Jira wiki description
   - priority
   - labels
   - optional team
   - optional epic link
   - optional components or fix versions only when clearly requested
   - applicable requirement constraints when the ticket is grounded in Goals
     Space planning context that includes requirements
4. Present the draft and ask for explicit approval before calling
   `jira_create_issue`, `jira_update_issue`, `jira_link_to_epic`,
   `jira_create_issue_link`, or any other Jira write tool.
5. If the human approves creation, create the issue, then re-read it with
   `jira_get_issue`.
6. Report the created key and URL.

When planning context was loaded before ticket drafting, preserve its
requirement findings in the ticket draft. Include active requirement IDs,
blocking rules, due dates, owners, and evidence gaps in the description when
they affect the work. If the planning context reports
`REQUIREMENTS_REGISTRY_MISSING`, surface that as a planning caveat rather than
claiming no requirements apply.

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
the dedicated planning, requirements, or knowledge-store skills for those
workflows.

## Specialized Skill Extension Contract

Specialized Jira skills should use this skill as the shared convention layer:

- Load `references/ffs-ticket-conventions.md`.
- Load `references/category-index.md` and any category reference files that
  match the draft.
- Load `references/ato-traceability.md` for any ATO-impacting work.
- Preserve this skill's approval gate and field-inference rules.
- Keep source-specific investigation, provenance, and classification in the
  specialized skill rather than duplicating general Jira conventions.
