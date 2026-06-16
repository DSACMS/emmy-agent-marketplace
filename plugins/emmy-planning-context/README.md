# Emmy Planning Context Plugin

This plugin gives agents controlled access to the Emmy Goals Space: the team
intent layer for strategic principles, delivery goals, outcomes, and planning
session audit entries. It also includes a Jira ticketing workflow for drafting,
interpreting, and approval-gated creation of Emmy `FFS` tickets according to
team conventions. Requirements are part of this planning layer: they represent
constraints, blockers, due dates, authorities, and evidence expectations that
shape what work is ready, allowed, or blocked.

Use it alongside `emmy-knowledge-store`: this plugin answers what Emmy is trying
to achieve, while the knowledge-store plugin answers what the team knows.

## Components

| Component                     | Purpose                                                                                                | Writes?                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------- |
| `emmy-planning-context`       | Loads current principles, goals, outcomes, requirements, and optional recent Planning Log context.     | No                          |
| `emmy-requirements-context`   | Loads active planning requirements from a dynamically discovered Requirements Registry.                | No                          |
| `emmy-requirements-interpret` | Interprets requirement-like source text into candidate requirements without persistence.               | No                          |
| `emmy-planning-ingest`        | Drafts and, after explicit approval, writes principles/goals/outcomes from pasted text or local files. | Yes, approval-gated         |
| `append-planning-log`         | Appends one approved planning-session audit entry.                                                     | Yes, approval-gated         |
| `emmy-jira-ticketing`         | Interprets, drafts, and creates `FFS` Jira tickets following Emmy team conventions.                    | Yes, approval-gated         |
| `emmy-planning-ingestor`      | Specialist agent wrapper for planning ingestion requests.                                              | Uses `emmy-planning-ingest` |

## Runtime Requirements

- `uvx` must be available on `PATH` so the plugin can run `uvx mcp-atlassian`.
- The agent environment needs network access to `https://confluenceent.cms.gov`.
- Jira ticketing workflows need network access to `https://jiraent.cms.gov`.
- Each user must provide their own CMS Confluence Data Center personal access
  token in `CONFLUENCE_PERSONAL_TOKEN`.
- The shared Atlassian MCP config also forwards `JIRA_PERSONAL_TOKEN` when
  present and sets `JIRA_URL` to `https://jiraent.cms.gov` so Jira-enabled
  workflows can use the same server setup and tool allowlist.

The shared Atlassian MCP config is intentionally a collision-safe superset. It
may expose Jira settings and tools even when a specific skill uses only
Confluence. Follow the skill instructions for workflow boundaries; do not treat
MCP tool availability as permission to create or edit Jira work.

Do not paste Confluence or Jira tokens into chat. Configure them in the agent
environment.

## Source Pages

- Goals Space root: `1398768351`
- Strategic Principles: `1398768358`
- Goals Registry: `1398342919`
- Outcomes Index: `1399162264`
- Planning Log: `1398768357`
- Requirements Registry: discovered dynamically by exact child title
  `Requirements Registry` when present.

## Example Prompts

Read-only planning context:

```text
Ground this Emmy planning task in the current Goals Space before proposing tickets.
```

Read-only requirements context:

```text
Load applicable Emmy requirements before planning tickets for a new external data connection.
```

Requirement interpretation without writing:

```text
Use $emmy-requirements-interpret to identify which ATO tracker statements are requirements, tasks, evidence, or open questions.
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

Jira ticket drafting:

```text
Use $emmy-jira-ticketing to draft an engineering ticket for improving report transmission observability, but do not create it until I approve the payload.
```

Jira ticket interpretation:

```text
Use $emmy-jira-ticketing to interpret FFS-4463 in light of Emmy Jira conventions.
```

## Safety Boundaries

- No silent Confluence writes.
- No Jira writes unless `emmy-jira-ticketing` drafts the final payload and the
  human explicitly approves creation or update.
- No Jira calls from `emmy-planning-context`, `emmy-requirements-context`,
  `emmy-requirements-interpret`, `emmy-planning-ingest`, or
  `append-planning-log`; those workflows remain Confluence-only.
- No Knowledge Store reads or writes.
- No requirement persistence in v1. Requirements context and interpretation are
  read-only; future ingestion should use a separate approval-gated workflow.
- No local file uploads unless explicitly requested.
- No live principle/goal ingestion unless the human approves the full write
  plan.
- No edits to existing goals, principles, outcomes, or prior log entries unless
  the approved plan names those changes.
- No live Jira test tickets unless the human separately approves that specific
  test.

For Confluence write details, use
`skills/emmy-planning-ingest/references/write-safety.md`.

## Local Validation

Run the normal marketplace checks after changing this plugin:

```bash
pnpm run check
pre-commit run --all-files
pnpm run smoke:marketplace
```
