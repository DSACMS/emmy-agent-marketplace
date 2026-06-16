---
name: emmy-requirements-ingest
description: >-
  Ingest Emmy planning requirements from pasted text, local files, or named
  Confluence pages/page IDs into the Goals Space Requirements Registry with an
  explicit human approval gate. Use only when asked to import, ingest, add, or
  update requirements, compliance obligations, ATO constraints, regulatory
  blockers, due dates, or evidence expectations; never use for ordinary
  principles/goals ingestion, ambient planning lookup, Jira ticket creation, or
  Knowledge Store ingestion.
---

# Emmy Requirements Ingest

Use this skill to turn requirement-like source material into approved Emmy Goals
Space requirement records. Requirements are planning constraints: they say what
must remain true, what blocks work, what authority creates the obligation, and
what evidence is expected.

This workflow consumes `emmy-requirements-interpret` as the interpretation step,
then drafts a write plan. It writes nothing until the human explicitly approves
the full requirement ingestion plan in the current conversation.

## Source Of Truth

- Goals Space root: `1398768351`
- Requirements Registry: `1399165621`
- Requirements Registry title: `Requirements Registry`
- Planning Log: `1398768357`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`
- The shared plugin MCP config may expose Jira URL, token, and tool settings for
  collision-safe overlap with Jira plugins. This skill uses Confluence only.

This skill writes only to Requirements Registry `1399165621` and approved child
requirement pages under that registry. Do not write to the Emmy Agent Knowledge
Store, Jira, Strategic Principles, Goals Registry, or Outcomes Index.

## References

- Read `references/write-safety.md` before any approved Confluence write.
- Use `emmy-requirements-interpret` before drafting persisted requirement
  records.

## Supported Inputs

Accept only these v1 source types:

- Pasted text in the conversation.
- Local files the user names or attaches, such as Markdown, text, PDF, Word, or
  other readable requirement documents.
- Named Confluence pages or Confluence page IDs when the user asks to ingest
  requirement-like content from them.

Do not ingest arbitrary URLs, repository checkouts, Jira issues, or Knowledge
Store pages in v1. If the user provides an unsupported source, stop and explain
that v1 supports pasted text, local files, and named Confluence pages/page IDs.

Use this input shape when the caller provides structured values:

```json
{
  "source_text": "optional pasted requirement text",
  "source_files": ["optional/path.md"],
  "confluence_page_ids": ["1112978748"],
  "requested_status": "Active | Deferred",
  "human_authorization_required": true
}
```

Default `human_authorization_required` to `true`. Default `requested_status` to
`Active` only when the source or human clearly says the requirement is active;
otherwise ask or draft with a status warning.

## Read First

Before drafting or writing:

1. Read Goals Space root `1398768351` and verify it is initialized.
2. Read Requirements Registry `1399165621` and verify it is the
   `Requirements Registry`.
3. Read the registry tables and all linked requirement child pages needed for ID
   allocation and duplicate detection.
4. For named Confluence sources, resolve the page in space `SFIV` by exact title
   or explicit page ID. If multiple pages match a name, ask the human to choose.
   If the page is outside the Goals Space, read it only as source material and
   do not write to it.

If a required Goals Space page is missing or unreadable, stop and report the
page ID. Do not rely on cached content or memory.

## Source Handling

- For pasted text, cite the source as `human-provided text` with the ingest
  date.
- For local files, inspect the file locally, extract relevant text, and record
  filename, file type, and date reviewed.
- For Confluence pages, record title, page ID, URL, version, and date reviewed.
- Do not persist local absolute paths to Confluence.
- Do not upload local files or attachments unless the user explicitly asks.
- Stop before writing if the source appears to contain secrets, credentials,
  private personal data, unsupported binary content, or speculative content that
  is not suitable for the Goals Space.

## Interpretation Step

Use `emmy-requirements-interpret` to classify source statements before drafting
persistence. Preserve these classes in the review packet:

- `requirement`
- `task`
- `evidence`
- `assumption`
- `open_question`
- `non_requirement`

Persist only true requirements. Do not write tasks, evidence links, assumptions,
or open questions as requirements unless the human rewrites them as an
obligation or planning constraint.

## RequirementDraft

Normalize approved candidate requirements into this shape:

```json
{
  "id": "REQ-001",
  "name": "Requirement name",
  "domain": "security-authorization",
  "status": "Active",
  "owner": "Name or team",
  "authority": "Source authority",
  "due_or_review_date": "YYYY-MM-DD or None",
  "last_reviewed": "YYYY-MM-DD",
  "requirement_statement": "What must remain true or be satisfied.",
  "applicability": "When it applies.",
  "planning_impact": "How it affects planning.",
  "blocking_rule": "What blocks work, or None.",
  "evidence_expectation": "Expected evidence.",
  "related_goals": [],
  "related_outcomes": [],
  "related_principles": [],
  "evidence_links": [],
  "open_questions": []
}
```

Use `None` only when the source and human approval make clear the value is
intentionally empty. Otherwise ask for the missing value or include an open
question.

## ID And Duplicate Rules

- Allocate new requirement IDs as `REQ-###` from the current maximum numeric ID
  found in the registry table and requirement child pages.
- Honor user-provided IDs only when they match `REQ-###` and do not conflict
  with existing rows, child pages, or draft objects.
- Allocate IDs after duplicate detection so blocked candidates do not reserve
  numbers.
- Treat exact or near duplicates as write blockers. Check requirement name,
  requirement statement, blocking rule, authority, and applicability.
- For near duplicates, present the overlapping existing requirement and the
  candidate side by side with warning `POSSIBLE_DUPLICATE_REQUIREMENT`.
- For exact duplicates, use warning `DUPLICATE_REQUIREMENT` and do not propose a
  create unless the human explicitly asks to update the existing requirement.

## Review Packet

Before any write, present a compact review packet containing:

- Proposed requirement pages to create or update.
- Proposed Active Requirements table changes.
- Proposed Deferred / Retired Requirements table changes for non-active
  requirements.
- Source provenance for every candidate.
- Interpretation classifications for non-requirement source statements.
- Warnings, duplicate findings, open questions, and blocked candidates.
- Exact target page IDs, including registry `1399165621`.
- Evidence links to record without dereferencing Knowledge Store links.
- A Planning Log entry draft if logging would help the planning record.

Ask for explicit approval of the whole write plan. Treat approval to interpret,
draft, normalize, or review as different from approval to write.

## Approved Write Sequence

After explicit approval:

1. Read `references/write-safety.md`.
2. Re-read Goals Space root `1398768351` and Requirements Registry `1399165621`
   with current metadata/version.
3. Re-read every existing child page that will be updated.
4. Create approved requirement child pages only under Requirements Registry
   `1399165621`, or narrowly update approved existing requirement child pages.
5. Update the Active Requirements table for approved `Active` requirements.
6. If a non-active requirement is approved, create or update a Deferred /
   Retired Requirements table in that section.
7. Remove only placeholder rows when adding the first real row to that table.
8. Preserve unrelated content and all existing rows not touched by the approved
   plan. Add or update Change Log rows on changed child pages.
9. Re-read changed pages or fetch diffs and validate that no requirement entries
   were added beyond the approved plan.
10. If the user approved the Planning Log entry, append it through the
    `append-planning-log` workflow.
11. Report created or updated page titles, page IDs, URLs, and validation
    results.

Stop rather than guessing if a page changed in a conflicting way, if the table
shape is not recognized, if duplicate status is unresolved, or if the approved
plan does not name the write location.

## Requirement Page Template

Use the live Requirements Registry page structure as the source for child-page
formatting. Requirement pages should include:

- Status, Owner, Domain, Authority, Due or review date, Last reviewed.
- Requirement Statement.
- Applicability.
- Planning Impact.
- Blocking Rule.
- Evidence Expectation.
- Related Goals, Outcomes, and Principles.
- Evidence Links.
- Open Questions.
- Change Log.

## Warning Codes

- `UNSUPPORTED_REQUIREMENT_SOURCE`: unsupported URL, repository, Jira issue, or
  Knowledge Store source.
- `REQUIREMENTS_REGISTRY_UNREADABLE`: registry `1399165621` is missing or
  unreadable.
- `REQUIREMENT_FIELD_MISSING`: required draft field is absent or ambiguous.
- `REQUIREMENT_AMBIGUOUS`: source statement might not be binding.
- `DUPLICATE_REQUIREMENT`: exact duplicate detected.
- `POSSIBLE_DUPLICATE_REQUIREMENT`: near duplicate detected.
- `WRITE_APPROVAL_MISSING`: the human has not approved the full write plan.
- `CONFLUENCE_CONFLICT`: target page changed after approval in a way that
  affects the write plan.

## Constraints

- No silent writes.
- No requirement writes without explicit human approval in the current
  conversation.
- No writes outside Requirements Registry `1399165621` and its child pages,
  except an optional approved Planning Log append.
- No Jira calls and no ticket creation.
- No Knowledge Store reads or writes.
- No ordinary principles/goals/outcomes ingestion. Route that material to
  `emmy-planning-ingest`.
- No uploads of local files unless explicitly requested.
- Always cite pages read and pages written in the final response.
