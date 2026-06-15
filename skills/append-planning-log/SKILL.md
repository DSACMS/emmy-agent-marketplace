---
name: append-planning-log
description: >-
  Append an approved Emmy planning-session entry to the Goals Space Planning Log
  in Confluence. Use only when the user explicitly authorizes recording a
  planning session after planning context was read; never use for ambient
  lookup, ticket creation, or editing goals, outcomes, or principles.
---

# Append Planning Log

Use this skill to append one authorized planning-session audit entry to the Emmy
Goals Space Planning Log. This is the write boundary for the planning context
plugin.

## Source Of Truth

- Planning Log page ID: `1398768357`
- Planning Log URL: `https://confluenceent.cms.gov/spaces/SFIV/pages/1398768357`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

## Preconditions

Before writing, confirm all of these are true:

1. The user explicitly authorized appending a Planning Log entry.
2. The caller provides a complete `PlanningLogEntry` draft.
3. The entry describes a real planning session that read the Goals Space.
4. The write target is page `1398768357`.

If any precondition is missing, stop and ask for the missing information. Do not
invent log-entry fields.

## PlanningLogEntry Shape

Require this input object:

```json
{
  "date": "YYYY-MM-DD",
  "session_type": "Session type",
  "goal_or_principle_ids": ["GOAL-001"],
  "agent_read": ["1398768351", "1398342919"],
  "trigger": "What prompted the planning session",
  "outcomes_reviewed": ["GOAL-001-O1"],
  "tickets_proposed": "0 - held",
  "tickets_created": ["FFS-123"],
  "tickets_held": ["Held ticket summary and reason"],
  "human_decisions": ["Approved logging the session"],
  "notes": "Additional context"
}
```

Use `none` or an empty array only when the human-approved draft explicitly says
there were no values.

## Append Sequence

1. Re-read Planning Log page `1398768357` immediately before writing.
   - Include metadata so the current page version is known.
   - Use storage format when needed to preserve existing structure.
2. Verify the page title is `Planning Log`.
3. Find the `Log Entries` section and the final append-only notice.
4. Format the new entry exactly like the page template:

```markdown
## YYYY-MM-DD - [Session Type] - [Goal or Principle ID(s)]

**Agent read:** [Pages consulted: KS sections, Goal pages, Jira epics]
**Trigger:** [What prompted this planning session] **Outcomes reviewed:**
[Outcome IDs considered] **Tickets proposed:** [N] - [created / held / deferred]
**Tickets created:** [Jira ticket keys, or "none"] **Tickets held:** [Summary of
held tickets and reason] **Human decisions:** [Any approvals, rejections,
modifications, or deferrals] **Notes:** [Anything else relevant to future
planning sessions]
```

After formatting the entry:

1. Append the new entry after existing log entries and before the final
   append-only notice when that notice is present.
2. Preserve all prior entries and unrelated page content exactly.
3. Update the page with the smallest possible body change.
4. Re-read the page or fetch the resulting diff.
5. Confirm the new heading and core fields are present.
6. Report the changed page title, page ID, URL, and validation result.

## Safety Rules

- No silent writes. User authorization must be explicit in the current task.
- Do not edit goals, principles, outcomes, or any page other than Planning Log.
- Do not edit, reorder, summarize, or delete previous log entries.
- Do not append if the page structure is ambiguous or the append location cannot
  be identified.
- Do not append if required entry fields are missing.
- Do not include secrets, credentials, private personal data, local scratch
  paths, or speculative claims.
- If the page changed after the first read and before update, compare the latest
  content. Merge only when the change is clearly independent; otherwise stop and
  report the conflict.
- Do not call Jira tools or create tickets.
- Do not update the Outcomes Index from this skill.

## MCP Tool Use

Use Confluence MCP tools such as `confluence_get_page`,
`confluence_get_page_history`, `confluence_get_page_diff`, and
`confluence_update_page` for the append workflow.

If Confluence authentication fails, stop and tell the user that this plugin
needs a valid `CONFLUENCE_PERSONAL_TOKEN` in the agent environment. Do not ask
the user to paste tokens into chat.
