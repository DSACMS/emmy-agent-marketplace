# Emmy Governance Docs Plugin

The Emmy Governance Docs plugin packages the workflows agents use to develop,
review, and draft Emmy governance documents. It is specific to the SFIV
`Governance` page and the existing governance registry pattern.

Use this plugin when an Emmy task involves thinking through a governance need,
assessing an existing governance document for approval readiness, or creating a
governance document from an already-developed system, process, policy, or
operating model.

## Components

- `plugin.json` is the shared plugin manifest.
- `.codex-plugin/plugin.json` adds Codex-facing marketplace metadata and starter
  prompts.
- `.claude-plugin/plugin.json` provides the Claude Code and GitHub Copilot CLI
  plugin manifest surface.
- `.mcp.json` links to the shared `cms-atlassian-confluence` MCP config.
- `skills/emmy-governance-develop/` facilitates the interactive development of
  governance ideas and produces a chat-only concept packet.
- `skills/emmy-governance-doc-review/` reviews existing governance documents.
- `skills/emmy-governance-doc-draft/` drafts or creates governance documents
  after an explicit Confluence write approval.

The skill directories under this plugin are runtime copies of the canonical
top-level `skills/` components. Keep the copies aligned when changing shared
skill behavior so local marketplace installs continue to include the bundled
skills.

## Runtime Requirements

- `uvx` must be available on `PATH`.
- The agent runtime needs network access to `https://confluenceent.cms.gov`.
- Each user must provide their own CMS Confluence Data Center personal access
  token through `CONFLUENCE_PERSONAL_TOKEN`.
- Tokens must stay in the user's environment. Do not paste tokens into chat,
  plugin manifests, or skill files.

The shared Atlassian MCP config includes Jira tools for compatibility with other
Emmy plugins. This plugin's skills must not use Jira tools.

## How To Choose A Workflow

| User intent                                               | Use                          |
| --------------------------------------------------------- | ---------------------------- |
| Think through a governance need before drafting           | `emmy-governance-develop`    |
| Pressure-test the operating model behind a future doc     | `emmy-governance-develop`    |
| Review a governance page for approval readiness           | `emmy-governance-doc-review` |
| Critique a pasted governance document draft               | `emmy-governance-doc-review` |
| Draft a governance document from a completed process      | `emmy-governance-doc-draft`  |
| Create a Confluence draft under Governance after approval | `emmy-governance-doc-draft`  |
| Align governance work to goals or requirements            | A planning skill first       |
| Create or update Jira tickets                             | `emmy-jira-ticketing`        |

## Example Prompts

```text
Use $emmy-governance-develop to think through this governance idea before
drafting.
```

```text
Use $emmy-governance-develop to pressure-test what decisions are missing from
this CCB process idea.
```

```text
Use $emmy-governance-doc-review to assess this Governance page for approval
readiness.
```

```text
Use $emmy-governance-doc-review to critique this pasted Emmy governance doc and
identify blockers.
```

```text
Use $emmy-governance-doc-draft to draft a governance document from this
already-developed change monitoring process.
```

```text
Use $emmy-governance-doc-draft to create the approved Confluence draft under
Governance.
```

## Governance Defaults

- Parent page: `1398349788`
- Parent title: `Governance`
- Space: `SFIV`
- Registry label: `governance`
- Default page status: `Draft`

The drafting skill produces a preview first. It writes to Confluence only after
the user explicitly approves the final draft.

The development skill is chat-only. It can use targeted Knowledge Store lookup
when relevant, but it does not persist the concept packet or write to
Confluence.
