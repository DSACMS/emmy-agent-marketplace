---
name: emmy-governance-followup-ticket
description: >-
  Draft and approval-gate FFS Jira tickets for work created by Emmy governance
  decisions, governance documents, ATO control findings, or implementation gaps.
  Use when a Confluence governance page, ATO/CFACTS control, policy decision,
  repo configuration, or system evidence implies follow-up engineering,
  remediation, evidence, decision, or CFACTS update work.
---

# Emmy Governance Follow-up Ticket

## Overview

Use this skill to turn an Emmy governance decision or governance artifact into a
draft FFS Jira ticket for the work needed to make reality match the decision.
The workflow is read-first and draft-first: inspect the governance source,
verify the implementation gap, search Jira for overlap, draft the payload, and
wait for explicit approval before any Jira write.

## Source Of Truth

- Jira project key: `FFS`
- Jira base URL: `https://jiraent.cms.gov`
- Governance parent page: `1398349788`
- Governance parent title: `Governance`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required environment: `CONFLUENCE_PERSONAL_TOKEN`
- Jira writes additionally require: `JIRA_PERSONAL_TOKEN`

## Reference Routing

- Read `../emmy-jira-ticketing/references/ffs-ticket-conventions.md` before
  selecting issue type, labels, priority, Epic Link, or components.
- Read `../emmy-jira-ticketing/references/category-index.md` before drafting,
  then load the matching category reference files for the concrete work.
- Read `../emmy-jira-ticketing/references/ato-traceability.md` before selecting
  ATO, CFACTS, control-family, or control-ID labels.
- Read `../emmy-jira-ticketing/references/jira-description-templates.md` before
  drafting Jira wiki markup.
- Read `references/governance-followup-ticket-patterns.md` before classifying
  governance follow-up work or using governance-specific examples.
- If the source depends on product, architecture, ATO, or prior decision context
  that is not in the governance page or Jira, use the Emmy Knowledge Store skill
  for a narrow read-only lookup.

## Workflow

1. Record source provenance:
   - For Confluence pages, read page content with metadata and labels. Capture
     title, page ID, URL, space, version, labels, status, approval fields,
     control ID, control family, and requirement basis when present.
   - For Jira source tickets, read issue type, summary, status, labels, Epic
     Link, description, and linked Confluence pages when present.
   - For repo or system evidence, inspect the local file or live source before
     claiming a gap.
2. Extract the follow-up obligation. Classify it as implementation/remediation,
   repo configuration, evidence production, governance metadata cleanup,
   decision blocker, CFACTS update, or document production/update.
3. Search Jira for duplicates and related work before drafting:
   - Search by governance page title and key terms.
   - Search by control ID and family, such as `CM-01a`, `cm-01a`, and `cm`.
   - Search by repository, file, system, or tool names, such as `CODEOWNERS`.
   - Search likely open epics when the work appears part of larger ATO,
     governance, or platform work.
4. Decide whether this skill is still the right workflow:
   - Use this skill for follow-up tickets created because a governance decision
     exposes work to do.
   - Use `emmy-governance-doc-draft` when the primary output is a new or updated
     Confluence governance document.
   - Use `emmy-jira-ticketing` directly for ordinary Jira tickets that are not
     governance-driven.
5. Draft the full payload:
   - Project `FFS`
   - Issue type, usually `Task`
   - Summary
   - Jira wiki description
   - Priority
   - Labels, using the shared ATO traceability reference plus category routing
     labels when applicable
   - Refinement sprint, or `unset`
   - Epic Link, or `unset` with candidate epics if found
   - Components and fix versions, or `unset`
6. Present the draft and ask for explicit approval before calling
   `jira_create_issue`, `jira_update_issue`, `jira_create_remote_issue_link`,
   `jira_add_issues_to_sprint`, `jira_create_issue_link`, or any other Jira
   write tool.
7. If the human approves creation or update, perform only the approved Jira
   write, then re-read the issue and report the key and URL.

## Label Rules

Use `../emmy-jira-ticketing/references/ato-traceability.md` for generic ATO
labeling conventions. This governance workflow adds one extra rule: include
`governance` when the work is directly caused by, or closes a gap in, an Emmy
governance document or governance decision.

Do not replace ordinary routing labels with governance or ATO labels. A
CODEOWNERS fix driven by the PR Review Process, for example, should keep
engineering visibility and also carry CM-01a traceability.

## Drafting Guidance

- Keep canonical policy content in Confluence. Jira should link to the source
  page and track the concrete work.
- Name the governance source and the verified gap in `Context`.
- Put implementation requirements in `Requirements`.
- Keep `Out of scope` short and explicit.
- Use acceptance criteria that prove the gap is closed, such as file changes,
  branch protection settings, reviewer behavior, evidence links, or CFACTS
  updates.
- Do not set story points, Definition of Ready, components, or fix versions
  unless the human supplied them or nearby matching work strongly supports them.
- Do not add an issue to `Ready for Refinement` without explicit approval for
  that sprint placement.

## Write Safety

- Never create, update, transition, link, comment on, or delete Jira issues
  without explicit human approval for the final payload.
- A request to draft, propose, shape, or turn something into a ticket is not
  approval to write to Jira.
- Do not edit Confluence from this workflow. If the task discovers governance
  metadata drift or an incomplete page, draft a follow-up ticket or recommend
  the appropriate governance-doc workflow.
- Do not create live test tickets unless the human separately approves that
  specific test.
