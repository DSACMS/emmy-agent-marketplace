---
name: emmy-planning-ingest
description: >-
  Ingest Emmy Goals Space principles and goals from pasted text or local files
  into Confluence with a human approval gate. Use only when explicitly asked to
  import, ingest, add, or update Emmy planning principles, goals, outcomes, or
  "principals"; never use for ambient planning lookup, Jira ticket creation, or
  Knowledge Store ingestion.
---

# Emmy Planning Ingest

Use this skill to turn human-provided planning material into normalized Emmy
Goals Space drafts, then write the approved plan to Confluence only after
explicit human authorization.

Treat `principals` as `principles` when the request clearly refers to planning
principles.

## Source Of Truth

- Goals Space root: `1398768351`
- Strategic Principles index: `1398768358`
- Goals Registry index: `1398342919`
- Outcomes Index: `1399162264`
- Planning Log: `1398768357`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`
- The shared plugin MCP config may expose Jira URL, token, and tool settings for
  collision-safe overlap with Jira plugins. This skill uses Confluence only.

This skill writes only to the Emmy Goals Space. Do not write to the Emmy Agent
Knowledge Store. Do not call Jira tools from this skill, even though the shared
MCP config may expose them.

## References

- Read `references/write-safety.md` before any approved Confluence write.
- Read `references/dry-run-fixtures.md` when testing the workflow, doing a
  draft-only run, or comparing an ingest review packet to expected output.

## Supported Inputs

Accept only these v1 source types:

- Pasted text in the conversation.
- Local files the user names or attaches, such as Markdown, text, PDF, Word, or
  other readable planning documents.

Do not ingest URLs, external Confluence pages, repository checkouts, Jira
issues, or Knowledge Store pages in v1. If the user provides an unsupported
source, stop and explain that v1 supports pasted text and local files only.

Use this input shape when the caller provides structured values:

```json
{
  "source_text": "optional pasted planning text",
  "source_files": ["optional/path.md"],
  "ingest_types": "principles | goals | both",
  "requested_status": "Active | Deferred",
  "human_authorization_required": true
}
```

Default `ingest_types` to `both` when the source clearly contains both
principles and goals. Default `requested_status` to `Active` only when the
source or human says the item should be active; otherwise ask.

## Read First

Before drafting or writing:

1. Read Goals Space root `1398768351` and verify it is initialized.
2. Read Strategic Principles index `1398768358`.
3. Read Goals Registry index `1398342919`.
4. Read Outcomes Index `1399162264`.
5. Read existing principle and goal child pages as needed for duplicate
   detection and ID allocation.

If a required page is missing or unreadable, stop and report the page ID. Do not
rely on cached content or memory.

## Source Handling

- For pasted text, cite the source as `human-provided text` with the ingest
  date.
- For local files, inspect the file locally, extract relevant text, and record
  filename, file type, and date reviewed.
- Do not persist local absolute paths to Confluence.
- Do not upload local files or attachments unless the user explicitly asks.
- Stop before writing if the source appears to contain secrets, credentials,
  private personal data, unsupported binary content, or speculative content that
  is not suitable for the Goals Space.

## Draft Objects

Normalize source material into these draft objects.

### PrincipleDraft

```json
{
  "id": "PRIN-001",
  "name": "Principle name",
  "status": "Active",
  "owner": "Owner or team",
  "grounded_in": "Policy, legislation, CMS standard, or program mandate",
  "last_reviewed": "YYYY-MM-DD",
  "principle_statement": "One to three sentences",
  "why_this_matters": "Strategic context",
  "practice_implications": [
    {
      "area": "Area",
      "implication": "Concrete implication"
    }
  ],
  "evaluation_criteria": ["Falsifiable question?"],
  "known_tensions": ["Documented tension"],
  "related_sources": ["Source or link"]
}
```

### GoalDraft

```json
{
  "id": "GOAL-001",
  "name": "Goal name",
  "statement": "Outcome-oriented goal statement",
  "status": "Active",
  "owner": "Owner or team",
  "horizon": "Date or quarter",
  "last_reviewed": "YYYY-MM-DD",
  "why_this_matters": "Strategic context",
  "outcomes": [
    {
      "id": "GOAL-001-O1",
      "statement": "Outcome statement",
      "success_criteria": "Falsifiable success condition",
      "status": "Not Started",
      "jira_epic": null
    }
  ],
  "open_blockers": [],
  "knowledge_store_links": []
}
```

Use `-` for optional text fields only when the source and human approval make
clear the value is intentionally empty. Otherwise ask for the missing value.

## ID And Duplicate Rules

- Allocate new principle IDs as `PRIN-###` from the current maximum.
- Allocate new goal IDs as `GOAL-###` from the current maximum.
- Allocate new outcome IDs as `GOAL-###-O#` within each goal.
- Honor user-provided IDs only when they do not conflict with existing pages,
  index rows, or draft objects.
- Treat near-duplicate principles, goals, or outcomes as review blockers.
  Present the overlap and wait for human direction.
- Check Outcomes Index before approving new outcomes. Exact duplicates must not
  be written as new outcomes.

## Governance Rules

- Active principles and active goals require explicit human approval in the
  current conversation before any Confluence write.
- Do not infer leadership intent. If the source does not clearly identify the
  strategic reason, owner, horizon, status, or success criteria, draft the item
  with warnings and stop before writing.
- Deferred items may be drafted from source material, but never promote a
  deferred or ambiguous item to `Active` by inference.
- Ask the human to resolve conflicts between source material and existing Goals
  Space entries before writing.
- Treat approval to draft, normalize, or review as different from approval to
  write. Only approval to write authorizes Confluence changes.

## Review Packet

Before any write, present a compact review packet containing:

- Proposed principle and goal drafts.
- Proposed child pages to create or update.
- Proposed Strategic Principles and Goals Registry index row changes.
- Proposed Outcomes Index additions or updates.
- Source provenance.
- Duplicate and quality warnings.
- Exact page IDs to be written.
- A Planning Log entry draft.

Ask for explicit approval of the whole write plan. Do not write if approval is
partial, ambiguous, or missing.

## Approved Write Sequence

After explicit approval:

Read `references/write-safety.md`, then:

1. Re-read every page that will be written, including current metadata/version.
2. Create approved principle child pages under Strategic Principles
   `1398768358`, or narrowly update approved existing principle pages.
3. Create approved goal child pages under Goals Registry `1398342919`, or
   narrowly update approved existing goal pages.
4. Update Strategic Principles and Goals Registry index tables narrowly.
   - Remove placeholder rows such as `None yet` or em dash rows only when adding
     the first real row.
   - Update existing rows only when the approved plan explicitly changes them.
5. Update Outcomes Index `1399162264` so every approved goal outcome appears in
   the flat index.
6. Preserve unrelated content and all existing rows not touched by the plan. Add
   or update Change Log rows on changed child pages.
7. Re-read changed pages or fetch diffs and validate the intended entries are
   present.
8. If the user approved the Planning Log entry, append it through the
   `append-planning-log` workflow.
9. Report created or updated page titles, page IDs, URLs, and validation
   results.

Stop rather than guessing if a page changed in a conflicting way, if the table
shape is not recognized, or if the append/create/update location is ambiguous.

## Page Templates

Use the live Confluence templates from the index pages as the structure for new
child pages. Principle pages must include:

- Status, Owner, Grounded in, Last reviewed.
- Principle Statement.
- Why This Matters.
- What This Means in Practice table.
- Agent Evaluation Criteria.
- Known Tensions.
- Related Policies / Sources.
- Change Log.

Goal pages must include:

- Status, Owner, Horizon, Last reviewed.
- Goal Statement.
- Why This Matters.
- Outcomes table.
- Open Blockers.
- Knowledge Store Links.
- Change Log.

## Constraints

- No silent writes.
- No Jira calls and no ticket creation.
- No Knowledge Store writes or reads.
- No unsupported source ingestion.
- No edits to unrelated Goals Space content.
- No uploads of local files unless explicitly requested.
- Always cite pages read and pages written in the final response.
