---
name: emmy-planning-context
description: >-
  Load the Emmy Goals Space as ambient planning context from Confluence. Use
  when Emmy work involves planning, goal alignment, ticket proposals, roadmap
  decomposition, outcome selection, prioritization, or checking whether work
  fits current strategic principles and active delivery goals.
---

# Emmy Planning Context

Use this skill to ground Emmy planning work in the current Goals Space before
proposing tickets, outcomes, prioritization, or roadmap changes. The default
posture is: read intent first, return structured context, then let the calling
agent reason.

## Source Of Truth

- Entry point: `https://confluenceent.cms.gov/spaces/SFIV/pages/1398768351`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`
- The shared plugin MCP config may expose Jira URL, token, and tool settings for
  collision-safe overlap with Jira plugins. This skill uses Confluence only.
- Stable page IDs:
  - Goals Space root: `1398768351`
  - Strategic Principles: `1398768358`
  - Goals Registry: `1398342919`
  - Outcomes Index: `1399162264`
  - Planning Log: `1398768357`

This skill complements `emmy-knowledge-store`. Do not load Knowledge Store
content here. Return Knowledge Store links as links only.

## Inputs

Accept these caller options when the user or calling agent provides them:

| Name                 | Type             | Default | Meaning                                                           |
| -------------------- | ---------------- | ------- | ----------------------------------------------------------------- |
| `focus_area`         | `string \| null` | `null`  | Optional topic hint used to narrow active goal pages.             |
| `include_principles` | `boolean`        | `true`  | Whether to load active strategic principles.                      |
| `include_outcomes`   | `boolean`        | `true`  | Whether to load the flat Outcomes Index.                          |
| `include_recent_log` | `boolean`        | `false` | Whether to include recent Planning Log entries for audit context. |
| `recent_log_limit`   | `integer`        | `3`     | Maximum recent log entries when `include_recent_log` is true.     |

## Ambient Read Sequence

Follow this sequence before making Emmy planning proposals:

1. Read the Goals Space root page `1398768351`.
   - Verify the title is `Emmy Goals Space`.
   - Verify the page is initialized by finding the Agent Operating Rules
     section.
   - Stop with a hard error if the root page is missing, unreadable, or
     uninitialized.
2. Read the root page children and verify the expected child pages exist:
   Strategic Principles, Goals Registry, Outcomes Index, and Planning Log.
3. If `include_principles` is true, read Strategic Principles page `1398768358`.
   - Parse the Active Principles table.
   - Ignore placeholder rows such as `-`, `--`, `---`, `None yet`, or em dash
     equivalents.
   - For each row with status `Active`, read the linked child principle page in
     full and extract the fields in the output schema.
4. Read Goals Registry page `1398342919`.
   - Parse the Active Goals table.
   - Ignore placeholder rows.
   - For each row with status `Active`, read the linked child goal page in full
     unless `focus_area` excludes it.
   - Apply `focus_area` by matching case-insensitively against the goal title,
     statement, outcomes, blockers, and link text. If no active goal overlaps,
     return no goals plus a warning.
5. If `include_outcomes` is true, read Outcomes Index page `1399162264`.
   - Parse the All Outcomes table.
   - Ignore placeholder rows.
6. If `include_recent_log` is true, read Planning Log page `1398768357`.
   - Return the most recent log entries up to `recent_log_limit`.
   - Read only for context. Do not append from this skill.
7. Assemble and return the complete `PlanningContext`.

## PlanningContext Shape

Return structured data rather than a prose summary:

```json
{
  "principles": [
    {
      "id": "PRIN-001",
      "name": "Principle name",
      "status": "Active",
      "principle_statement": "Statement text",
      "evaluation_criteria": ["Question?"],
      "known_tensions": ["Documented tension"],
      "source_page_id": "1390000000",
      "source_url": "https://confluenceent.cms.gov/pages/viewpage.action?pageId=1390000000"
    }
  ],
  "goals": [
    {
      "id": "GOAL-001",
      "statement": "Goal statement",
      "status": "Active",
      "owner": "Owner or team",
      "horizon": "Date or quarter",
      "outcomes": [
        {
          "id": "GOAL-001-O1",
          "statement": "Outcome statement",
          "success_criteria": "Falsifiable condition",
          "status": "Not Started",
          "jira_epic": null
        }
      ],
      "open_blockers": [],
      "knowledge_store_links": [],
      "source_page_id": "1390000001",
      "source_url": "https://confluenceent.cms.gov/pages/viewpage.action?pageId=1390000001"
    }
  ],
  "outcomes_index": [
    {
      "outcome_id": "GOAL-001-O1",
      "statement": "Outcome statement",
      "parent_goal": "GOAL-001",
      "status": "Not Started",
      "jira_epic": null
    }
  ],
  "recent_planning_log_entries": [],
  "warnings": [
    {
      "code": "NO_ACTIVE_GOALS",
      "page_id": "1398342919",
      "message": "No active goals found in Goals Registry."
    }
  ],
  "metadata": {
    "loaded_at": "2026-06-15T12:00:00Z",
    "pages_read": ["1398768351"],
    "page_versions": {
      "1398768351": 1
    },
    "focus_area": null,
    "goals_space_url": "https://confluenceent.cms.gov/spaces/SFIV/pages/1398768351"
  }
}
```

Omit `recent_planning_log_entries` only when `include_recent_log` is false.
Always populate `metadata.pages_read` with every page ID consulted.

## Error And Warning Rules

- Missing or uninitialized Goals Space root: stop with a hard error that names
  page `1398768351`.
- Missing expected child page: return a warning and continue when the page is
  not required for the requested inputs; stop if a required page is missing.
- No active principles: return `principles: []` and warning
  `NO_ACTIVE_PRINCIPLES`.
- No active goals: return `goals: []` and warning `NO_ACTIVE_GOALS`.
- Empty Outcomes Index: return `outcomes_index: []` and warning
  `OUTCOMES_INDEX_EMPTY`.
- Unreadable principle or goal child page: add a warning with the page ID, skip
  that item, and continue.
- Mid-sequence page read failure: report the exact page ID. Do not substitute
  memory, cached content, or copied notes.

## Constraints

- Read only. Do not write to Confluence from this skill.
- Do not append to the Planning Log. Use `append-planning-log` only after
  explicit user authorization.
- Do not create, edit, retire, or reorder principles, goals, outcomes, or log
  entries.
- Do not create or propose Jira tickets from this skill. The calling planning
  agent may do that after reading the returned context.
- Do not call Jira tools from this skill, even though the shared MCP config may
  expose them.
- Do not dereference Knowledge Store links or call Knowledge Store skills.
- Cite page titles and URLs or page IDs when Goals Space content materially
  shaped the answer.

## MCP Tool Use

Use Confluence MCP tools such as `confluence_get_page`,
`confluence_get_page_children`, `confluence_search`,
`confluence_get_page_history`, and `confluence_get_page_diff` for reads.

Prefer `convert_to_markdown: true` for normal extraction. Use storage format
only when markdown conversion hides table or link details needed to parse the
context accurately.
