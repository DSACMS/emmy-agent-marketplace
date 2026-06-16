---
name: emmy-requirements-context
description: >-
  Load active Emmy planning requirements from the Goals Space requirements
  layer. Use when Emmy planning, ticket proposals, release readiness,
  architecture decisions, or goal/outcome alignment need requirement
  constraints, blockers, due dates, owners, or evidence links.
---

# Emmy Requirements Context

Use this skill to load requirement constraints that shape Emmy planning work.
Requirements are part of the Goals Space intent layer: they say what must remain
true, what blocks work, and what evidence is expected before a goal, outcome,
ticket, release, or architecture decision can move forward.

This v1 skill is read-only. It reads the Goals Space `Requirements Registry`
page when present and returns an empty result with a warning if the registry is
missing or unreadable.

## Source Of Truth

- Goals Space root: `1398768351`
- Requirements Registry: `1399165621`
- Requirements Registry title: `Requirements Registry`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`
- Shared plugin MCP config may expose Jira tools. This skill uses Confluence
  only.

This skill complements `emmy-planning-context`. Do not write to the Goals Space,
do not create Jira tickets, and do not dereference Knowledge Store evidence
links. Return Knowledge Store links as links only.

## Inputs

Accept these caller options when supplied:

| Name               | Type             | Default | Meaning                                                           |
| ------------------ | ---------------- | ------- | ----------------------------------------------------------------- |
| `focus_area`       | `string \| null` | `null`  | Optional topic hint used to narrow requirement pages.             |
| `goal_ids`         | `string[]`       | `[]`    | Goal IDs whose related requirements should be loaded.             |
| `outcome_ids`      | `string[]`       | `[]`    | Outcome IDs whose related requirements should be loaded.          |
| `principle_ids`    | `string[]`       | `[]`    | Principle IDs whose related requirements should be loaded.        |
| `include_inactive` | `boolean`        | `false` | Whether to include Deferred, Retired, or Superseded requirements. |

## Read Sequence

1. Read Goals Space root `1398768351`.
   - Verify the title is `Emmy Goals Space`.
   - Stop with a hard error if the root is missing, unreadable, or
     uninitialized.
2. Read Requirements Registry `1399165621` and verify the title is
   `Requirements Registry`.
   - If direct lookup fails, read root children and search for exact title
     `Requirements Registry`.
3. If no registry exists or no readable registry can be found, return:
   - `requirements: []`
   - warning code `REQUIREMENTS_REGISTRY_MISSING`
   - metadata showing the Goals Space root and children were read.
4. Read the Requirements Registry page.
   - Parse the active requirements table when present.
   - Ignore placeholder rows such as `-`, `--`, `---`, `None yet`, or em dash
     equivalents.
   - Include only rows with status `Active` unless `include_inactive` is true.
5. For each matching requirement row, read the linked child requirement page in
   full.
   - Apply `focus_area`, `goal_ids`, `outcome_ids`, and `principle_ids`
     case-insensitively against the requirement name, domain, planning impact,
     blocking rule, related IDs, open questions, and link text.
   - If no requirements match the supplied filters, return an empty list plus a
     warning code `NO_MATCHING_REQUIREMENTS`.
6. Assemble and return `RequirementsContext`.

## RequirementsContext Shape

Return structured data rather than a prose summary:

```json
{
  "requirements": [
    {
      "id": "REQ-ATO-001",
      "name": "Maintain valid ATO",
      "domain": "security-authorization",
      "status": "Active",
      "owner": "ISSO / System Owner / Emmy Team",
      "due_or_review_date": "2026-09-21",
      "authority": "Emmy ATO Tracker",
      "applicability": "Production operation and release planning",
      "planning_impact": "Tickets that create new external interfaces need approval before implementation.",
      "blocking_rule": "No new non-CMS interfaces without prior approval.",
      "related_goals": ["GOAL-001"],
      "related_outcomes": ["GOAL-001-O2"],
      "related_principles": ["PRIN-004", "PRIN-005"],
      "evidence_links": [
        {
          "label": "Emmy ATO Tracker",
          "url": "https://confluenceent.cms.gov/pages/viewpage.action?pageId=1112978748"
        }
      ],
      "open_questions": [],
      "source_page_id": "1390000000",
      "source_url": "https://confluenceent.cms.gov/pages/viewpage.action?pageId=1390000000"
    }
  ],
  "warnings": [
    {
      "code": "REQUIREMENTS_REGISTRY_MISSING",
      "page_id": "1398768351",
      "message": "No Requirements Registry child page exists under the Goals Space root."
    }
  ],
  "metadata": {
    "loaded_at": "2026-06-16T12:00:00Z",
    "pages_read": ["1398768351"],
    "page_versions": {
      "1398768351": 1
    },
    "focus_area": null,
    "requirements_registry_page_id": "1399165621",
    "goals_space_url": "https://confluenceent.cms.gov/spaces/SFIV/pages/1398768351"
  }
}
```

Always populate `metadata.pages_read` with every page ID consulted.

## Requirement Page Expectations

When requirement child pages exist, extract these sections when present:

- Status, Owner, Domain, Authority, Due or review date.
- Requirement statement.
- Applicability trigger.
- Planning impact.
- Blocking rule.
- Evidence expectation.
- Related goals, outcomes, and principles.
- Evidence links.
- Open questions.
- Change log.

If a section is missing, preserve the requirement and add a targeted warning
instead of inventing a value.

## Error And Warning Rules

- Missing or uninitialized Goals Space root: stop with a hard error naming page
  `1398768351`.
- Missing Requirements Registry: return warning `REQUIREMENTS_REGISTRY_MISSING`
  and continue with empty requirements.
- Empty registry table: return warning `REQUIREMENTS_REGISTRY_EMPTY`.
- No matching filtered requirements: return warning `NO_MATCHING_REQUIREMENTS`.
- Unreadable requirement child page: add warning `UNREADABLE_REQUIREMENT_PAGE`,
  skip that requirement, and continue.
- Missing expected fields on a requirement page: add warning
  `REQUIREMENT_FIELD_MISSING`.

## Constraints

- Read only. Do not create, update, retire, or reorder requirements.
- Do not create, update, or transition Jira tickets.
- Do not append to the Planning Log.
- Do not dereference Knowledge Store links or call Knowledge Store skills.
- Do not treat the absence of a registry as proof that no requirements apply.
  Report the missing registry warning.
- Cite page titles and URLs or page IDs when requirement context materially
  shapes the answer.

## MCP Tool Use

Use Confluence MCP tools such as `confluence_get_page`,
`confluence_get_page_children`, `confluence_search`,
`confluence_get_page_history`, and `confluence_get_page_diff` for reads.

Prefer `convert_to_markdown: true` for normal extraction. Use storage format
only when markdown conversion hides table or link details needed to parse the
context accurately.
