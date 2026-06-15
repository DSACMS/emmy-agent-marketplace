# Emmy Knowledge Store Plugin

The Emmy Knowledge Store plugin packages the shared workflows agents use to work
with the Confluence-backed Emmy Agent Knowledge Store. It combines portable
Agent Skills, specialist agent prompts, and an MCP configuration for CMS
Confluence so Codex, Claude Code, and GitHub Copilot CLI can use the same
knowledge-store patterns.

Use this plugin when an Emmy task depends on current product context,
architecture, ATO evidence, runbooks, onboarding notes, troubleshooting history,
prior decisions, source ingestion, queue curation, or knowledge-store cleanup.

## Components

- `plugin.json` is the shared plugin manifest. It advertises the plugin name,
  version, description, bundled skills, and MCP server config.
- `.codex-plugin/plugin.json` adds Codex-facing marketplace metadata,
  capabilities, and default prompt examples.
- `.claude-plugin/plugin.json` provides the Claude Code and GitHub Copilot CLI
  plugin manifest surface.
- `.mcp.json` configures the `cms-atlassian-confluence` MCP server using
  `uvx mcp-atlassian`.
- `skills/emmy-knowledge-store/` provides ambient lookup, durable capture, and
  controlled Confluence update guidance.
- `skills/emmy-artifact-ingest/` provides explicit source ingestion from local
  files, URLs, external Confluence pages, and Emmy repository checkouts.
- `skills/emmy-queue-curate/` provides human-in-the-loop review and promotion of
  existing Knowledge Ingestion Queue entries.
- `skills/emmy-knowledge-cleanup/` provides whole-store audits for duplicates,
  stale facts, label hygiene, page hierarchy, and cleanup planning.
- `agents/emmy-artifact-ingestor.md` is a specialist agent wrapper for source
  ingestion.
- `agents/emmy-queue-curator.md` is a specialist agent wrapper for interactive
  queue review.

The skill directories under this plugin are runtime copies of the canonical
top-level `skills/` components. Keep the copies aligned when changing shared
skill behavior so local marketplace installs continue to work in tools that
cache plugin directories.

## Runtime Requirements

- `uvx` must be available on `PATH`.
- The agent runtime needs network access to `https://confluenceent.cms.gov`.
- Each user must provide their own CMS Confluence Data Center personal access
  token through the `CONFLUENCE_PERSONAL_TOKEN` environment variable.
- The shared Atlassian MCP config also forwards `JIRA_PERSONAL_TOKEN` when
  present so future Jira-enabled plugins can use the same server setup.
- Tokens must stay in the user's environment. Do not paste tokens into chat,
  plugin manifests, or skill files.

The MCP allowlist includes Confluence read, create, update, comment, label, and
attachment tools. Delete, move, and Jira tools are intentionally outside this
plugin's workflow.

## How To Choose A Workflow

| User intent                                               | Use                            |
| --------------------------------------------------------- | ------------------------------ |
| Look up Emmy context while doing another task             | `emmy-knowledge-store`         |
| Propose or capture durable findings from completed work   | `emmy-knowledge-store`         |
| Ingest a source into the store with provenance            | `emmy-artifact-ingest`         |
| Review and promote pending queue entries with a human     | `emmy-queue-curate`            |
| Audit store health, duplicates, labels, or page hierarchy | `emmy-knowledge-cleanup`       |
| Run ingestion as a delegated specialist workflow          | `emmy-artifact-ingestor` agent |
| Run queue review as a delegated specialist workflow       | `emmy-queue-curator` agent     |

The default knowledge-store posture is:

- consult freely;
- capture proactively;
- publish deliberately.

Agents may read relevant Confluence knowledge when a task needs Emmy context.
They should identify durable knowledge produced by their work, but they should
write to Confluence only when the user explicitly asks to capture, persist,
curate, promote, or update knowledge-store content.

## Example Prompts

### Ambient Lookup

```text
Use the Emmy knowledge store while updating the ATO deployment notes. Cite any
Confluence pages that materially shape the answer.
```

```text
Before changing this runbook, check the Emmy knowledge store for prior
troubleshooting notes about the same failure mode.
```

### Durable Capture

```text
Capture the durable knowledge from this completed incident investigation in the
Emmy knowledge store. Queue it for review if any claims are uncertain.
```

```text
At the end of this task, propose any knowledge-store entries that would help the
next agent avoid repeating the same investigation.
```

### Source Ingestion

```text
Use $emmy-artifact-ingest to ingest docs/ato/deployment-notes.md into the Emmy
Knowledge Ingestion Queue with source provenance.
```

```text
Use $emmy-artifact-ingest to ingest the current Emmy API checkout into the
knowledge store. Include repo, branch, commit, source paths, and applicability
for each extracted claim.
```

### Queue Curation

```text
Use $emmy-queue-curate to process the next needs-review Knowledge Ingestion
Queue entry with me.
```

```text
Use the emmy-queue-curator agent to review queue entry 1384894000 with me and
draft canonical text only after I confirm the claims.
```

### Cleanup Audit

```text
Use $emmy-knowledge-cleanup to audit the Emmy Agent Knowledge Store for
duplicate ATO deployment guidance and recommend any page hierarchy changes.
```

```text
Check whether the store has stale queue entries, missing labels, or overlapping
runbook pages. Report proposed cleanup actions before writing anything.
```

### Installation Smoke Test

```text
Use the Emmy knowledge store to read the entry page and list its current
top-level child pages. Do not update Confluence.
```

This verifies that the plugin can load the MCP server, authenticate to
Confluence, and discover the store from the stable entry page.

## Write Safety

Before any Confluence write, the active skill should read its write-safety or
workflow reference file and re-read the target pages. Canonical page updates
should be narrow, evidence-backed, and diffed or re-read before reporting
success. Low-confidence or contested knowledge belongs in a queue entry, not in
canonical content.

Never store secrets, tokens, local scratch paths, private user data, speculative
claims, or unverified conclusions.
