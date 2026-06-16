---
name: emmy-requirements-interpret
description: >-
  Interpret Emmy requirement language without writing. Use when analyzing ATO,
  privacy, security, data-sharing, release, accessibility, or operational source
  text to distinguish true requirements from tasks, evidence, assumptions, open
  questions, and non-requirements.
---

# Emmy Requirements Interpret

Use this skill to teach agents how to read requirement-like source material for
planning. It turns raw text or read-only Confluence content into candidate
requirement records and interpretation notes, but it never persists them.

Requirements are constraints or obligations that shape planning. They differ
from goals, principles, tasks, and evidence:

- A goal says what Emmy is trying to achieve.
- A principle says how Emmy intends to work.
- A task says what someone should do.
- Evidence shows whether a requirement has been satisfied.
- A requirement says what must remain true, what must be completed, or what
  blocks work until resolved.

## Source Of Truth

- Goals Space root: `1398768351`
- Requirements Registry: `1399165621`
- Requirements Registry title: `Requirements Registry`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

This skill is read-only. Do not write to the Goals Space, Knowledge Store, or
Jira from this workflow.

## Supported Inputs

Accept these input forms:

- Pasted text in the conversation.
- Requirement-like text from local files the user names.
- Existing Goals Space requirement pages.
- Named Confluence pages or page IDs when the user asks to interpret them.

Do not upload local files. Do not ingest or persist candidate requirements.

## Interpretation Workflow

1. Identify the source and record source provenance:
   - `human-provided text` for pasted content.
   - filename and date reviewed for local files; do not persist absolute paths.
   - page title, page ID, URL, and version for Confluence pages.
2. Classify each relevant statement into one of:
   - `requirement`
   - `task`
   - `evidence`
   - `assumption`
   - `open_question`
   - `non_requirement`
3. For each true requirement, extract candidate fields:
   - ID if present, otherwise `REQ-###` placeholder.
   - Name.
   - Domain.
   - Status.
   - Authority or source.
   - Owner.
   - Due or review date.
   - Requirement statement.
   - Applicability trigger.
   - Planning impact.
   - Blocking rule.
   - Evidence expectation.
   - Related goals, outcomes, and principles.
   - Evidence links.
   - Open questions.
4. Flag ambiguous statements instead of promoting them to requirements.
5. Return a compact interpretation packet with candidates, classifications,
   warnings, and suggested next action.

## CandidateRequirement Shape

Return candidate records in this shape:

```json
{
  "candidate_requirements": [
    {
      "id": "REQ-###",
      "name": "Maintain valid ATO",
      "domain": "security-authorization",
      "status": "Candidate",
      "authority": "Emmy ATO Tracker",
      "owner": "ISSO / System Owner / Emmy Team",
      "due_or_review_date": "2026-09-21",
      "requirement_statement": "Emmy must maintain authorization to operate before production operation.",
      "applicability": "Production operation and release planning",
      "planning_impact": "Release plans must account for ATO expiration and condition closure.",
      "blocking_rule": "No new non-CMS interfaces without prior approval.",
      "evidence_expectation": "ATO memo, condition closure evidence, CFACTS status, and current POA&M posture.",
      "related_goals": ["GOAL-001"],
      "related_outcomes": ["GOAL-001-O2"],
      "related_principles": ["PRIN-004", "PRIN-005"],
      "evidence_links": [],
      "open_questions": []
    }
  ],
  "classifications": [
    {
      "text": "Upload the SSP to CFACTS by June 9.",
      "classification": "task",
      "reason": "This is work needed to satisfy a requirement, not the requirement itself."
    }
  ],
  "warnings": [],
  "suggested_next_action": "Review candidates with a human, then use emmy-requirements-ingest if persistence is authorized."
}
```

## Interpretation Rules

- Treat words such as `must`, `shall`, `required`, `prohibited`, `cannot`,
  `before`, `unless`, `due`, `expires`, and `approval required` as requirement
  signals, but do not rely on keywords alone.
- Treat artifact names, screenshots, links, and status counts as evidence unless
  they impose an obligation or gate.
- Treat dated checklist items as tasks unless the date creates a release,
  authorization, or compliance gate.
- Treat source statements like `we believe`, `to confirm`, `TBD`, `draft`, or
  `pending review` as assumptions or open questions unless an authority makes
  them binding.
- Preserve source uncertainty. Do not convert a draft or historical source into
  a current active requirement without a current authority.
- If the user asks to add, ingest, update, or persist requirements, draft an
  interpretation packet and state that persistence belongs to
  `emmy-requirements-ingest`.

## Domain Hints

Use concise lowercase domain names such as:

- `security-authorization`
- `privacy`
- `security-controls`
- `data-sharing`
- `release-readiness`
- `accessibility`
- `operations`
- `open-source-governance`

Do not invent sensitive labels, account IDs, or private incident details.

## Constraints

- Read only. Do not create or update Goals Space pages.
- Do not create or update Jira tickets.
- Do not write to the Knowledge Store.
- Do not upload local files or attachments.
- Do not treat candidate requirements as approved requirements.
- Cite page titles and URLs or page IDs when Confluence content materially
  shaped the interpretation.

## MCP Tool Use

Use Confluence MCP read tools such as `confluence_get_page`,
`confluence_get_page_children`, and `confluence_search` only when the user asks
to interpret named Confluence content or requirement pages.
