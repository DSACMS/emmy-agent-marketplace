# Emmy Planning Context Plugin

This plugin gives agents controlled access to the Emmy Goals Space: the team
intent layer for strategic principles, delivery goals, outcomes, and planning
session audit entries.

Use it alongside `emmy-knowledge-store`: this plugin answers what Emmy is trying
to achieve, while the knowledge-store plugin answers what the team knows.

## Components

| Component                | Purpose                                                                                                | Writes?                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | --------------------------- |
| `emmy-planning-context`  | Loads current principles, goals, outcomes, and optional recent Planning Log context.                   | No                          |
| `emmy-planning-ingest`   | Drafts and, after explicit approval, writes principles/goals/outcomes from pasted text or local files. | Yes, approval-gated         |
| `append-planning-log`    | Appends one approved planning-session audit entry.                                                     | Yes, approval-gated         |
| `emmy-planning-ingestor` | Specialist agent wrapper for planning ingestion requests.                                              | Uses `emmy-planning-ingest` |

## Runtime Requirements

- `uvx` must be available on `PATH` so the plugin can run `uvx mcp-atlassian`.
- The agent environment needs network access to `https://confluenceent.cms.gov`.
- Jira-specific workflows that reuse this shared config also need network access
  to `https://jiraent.cms.gov`.
- Each user must provide their own CMS Confluence Data Center personal access
  token in `CONFLUENCE_PERSONAL_TOKEN`.
- The shared Atlassian MCP config also forwards `JIRA_PERSONAL_TOKEN` when
  present and sets `JIRA_URL` to `https://jiraent.cms.gov` so future
  Jira-enabled plugins can use the same server setup and tool allowlist.

The shared Atlassian MCP config is intentionally a collision-safe superset. It
may expose Jira settings and tools even when this plugin's planning workflows
use only Confluence. Follow the skill instructions for workflow boundaries; do
not treat MCP tool availability as permission to create or edit Jira work.

Do not paste Confluence tokens into chat. Configure them in the agent
environment.

## Source Pages

- Goals Space root: `1398768351`
- Strategic Principles: `1398768358`
- Goals Registry: `1398342919`
- Outcomes Index: `1399162264`
- Planning Log: `1398768357`

## Example Prompts

Read-only planning context:

```text
Ground this Emmy planning task in the current Goals Space before proposing tickets.
```

Draft ingestion without writing:

```text
Use the planning ingestion workflow to normalize this pasted goal text into a draft review packet, but do not write to Confluence.
```

Approved ingestion:

```text
Ingest these Emmy goals into the Goals Space. Present the write plan first and wait for my approval before writing.
```

Planning Log append:

```text
Append this approved Emmy planning session to the Planning Log.
```

## Safety Boundaries

- No silent Confluence writes.
- No Jira calls and no ticket creation.
- No Knowledge Store reads or writes.
- No local file uploads unless explicitly requested.
- No live principle/goal ingestion unless the human approves the full write
  plan.
- No edits to existing goals, principles, outcomes, or prior log entries unless
  the approved plan names those changes.

For Confluence write details, use
`skills/emmy-planning-ingest/references/write-safety.md`.

## Local Validation

Run the normal marketplace checks after changing this plugin:

```bash
pnpm run check
pre-commit run --all-files
pnpm run smoke:marketplace
```
