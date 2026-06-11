# Emmy Agent Marketplace

This repository is a shared marketplace for team agent workflows: portable
skills, tool integrations, and installable plugins for Codex, Claude Code, and
GitHub Copilot CLI.

The main portability target is the
[Agent Skills](https://agentskills.io/specification) `SKILL.md` format.
Product-specific plugin manifests are kept beside the portable skill content so
the same plugin directory can be installed by multiple tools.

## Repository Layout

```text
.
|-- AGENTS.md
|-- README.md
|-- .agents/plugins/marketplace.json
|-- .claude-plugin/marketplace.json
|-- mcp/
|   `-- <mcp-component>/.mcp.json
|-- skills/
|   `-- <skill-name>/SKILL.md
`-- plugins/
    `-- <plugin-name>/
        |-- .codex-plugin/plugin.json
        |-- .claude-plugin/plugin.json
        |-- plugin.json
        |-- skills/<skill-name>/SKILL.md
        |-- .mcp.json
        |-- agents/
        `-- hooks.json
```

Not every plugin needs every optional directory. Start with
`skills/<skill-name>/SKILL.md` and the manifests required by the tools you want
to support.

## Marketplace Catalogs

- Codex reads the repo-scoped marketplace from
  `.agents/plugins/marketplace.json`.
- Claude Code reads the marketplace from `.claude-plugin/marketplace.json`.
- GitHub Copilot CLI reads marketplace files from
  `.github/plugin/marketplace.json` and also recognizes
  `.claude-plugin/marketplace.json`, so this repo uses the Claude path as the
  shared Claude/Copilot catalog.

When you add a plugin under `plugins/<plugin-name>/`, add matching entries to
both marketplace catalogs.

## Component Reuse Standard

Reusable skills and other portable components should have one canonical source
in this repository. Plugins should usually be thin installable bundles that
expose those components with relative symlinks.

For example, a skill can be offered as its own plugin and also included in a
larger suite without copying the skill files:

```text
skills/evidence-review/SKILL.md
plugins/evidence-review/skills/evidence-review -> ../../../skills/evidence-review
plugins/ato-suite/skills/evidence-review -> ../../../skills/evidence-review
```

Use this pattern so teammates can install only the components they need, while
larger plugins can still group related workflows.

Rules for plugin composition:

- Author reusable skills under `skills/<skill-name>/`.
- Link reusable skills into plugins with relative symlinks from the plugin's
  component directories.
- Keep symlink targets inside this repository so installed plugins can be copied
  or cached safely by target tools.
- Author reusable MCP client configs under `mcp/<mcp-component>/.mcp.json` when
  more than one plugin may share the same server.
- Prefer direct relative symlinks from plugin roots to shared top-level
  components when the target tool preserves those links at install time.
- If a target tool caches only the plugin directory and skips symlinks, keep a
  materialized runtime copy at the plugin-facing path and verify it during
  install smoke.
- Put plugin manifests and product-specific wrappers directly in
  `plugins/<plugin-name>/`.
- Avoid hand-maintained duplicate skill files. If duplication is unavoidable for
  a target tool, document why and prefer a generated packaging step.

## Shared MCP Components

MCP configs in `mcp/` are installable only after a plugin links them into its
root and declares `mcpServers` in the relevant plugin manifest. Keep shared
configs free of secrets and use environment variable references for per-user
credentials.

Codex local marketplace installs cache the plugin directory and do not preserve
symlinks in the cached plugin. For Codex installability, the
`emmy-knowledge-store` plugin includes materialized runtime copies at
`plugins/emmy-knowledge-store/skills/emmy-knowledge-store/`,
`plugins/emmy-knowledge-store/skills/emmy-artifact-ingest/`,
`plugins/emmy-knowledge-store/agents/`, and
`plugins/emmy-knowledge-store/.mcp.json`. Keep those runtime copies aligned with
the top-level `skills/`, agent, and `mcp/` sources whenever the canonical
component changes.

For example, `mcp/cms-atlassian-confluence/.mcp.json` runs `uvx mcp-atlassian`
against CMS Confluence Data Center. The `emmy-knowledge-store` plugin links that
config and requires each user to provide `CONFLUENCE_PERSONAL_TOKEN` in their
own environment. The same upstream MCP server also supports
`JIRA_PERSONAL_TOKEN`; Jira-specific plugins can add that requirement later
without duplicating the Confluence MCP component.

## Ambient Knowledge Store Pattern

The `emmy-knowledge-store` plugin is designed for ambient shared-context use by
one developer, many agents, or several developers working concurrently. Its
default behavior is to consult freely, capture proactively, and publish
deliberately.

- Agents may search and read the Emmy Confluence knowledge store when a task
  depends on Emmy product, architecture, ATO, runbook, onboarding,
  troubleshooting, or prior decision context.
- Agents should identify durable knowledge produced by their work, but they
  should only write to Confluence when the user explicitly asks to capture,
  persist, curate, or update knowledge-store content.
- Low-confidence, contested, or not-yet-curated findings should be written as
  one page per candidate in an Agent Capture Queue when persistence is
  authorized. This avoids many agents racing to append to the same page.
- Canonical page updates require a fresh page read plus history or diff review
  immediately before writing. If another developer or agent changed the same
  section, the agent should stop and report the conflict instead of overwriting.
- The Confluence MCP allowlist includes read, create, update, comment, label,
  and attachment tools. Write availability is governed by skill policy and user
  authorization, not by enabling destructive delete or move tools.

## Source Ingestion Pattern

The same plugin also provides an explicit-only `emmy-artifact-ingest` skill and
`emmy-artifact-ingestor` agent for source ingestion. Use this specialized
workflow when the user asks to ingest knowledge from a local file, URL, external
Confluence page, or Emmy repository checkout.

- Local files are uploaded as source-record attachments before knowledge is
  extracted and queued.
- URLs and external Confluence pages are extracted directly and are not uploaded
  by default.
- Emmy repository sources are extracted from local checkouts, not from
  `github.com` pages. Queue entries record repo, branch, commit, source file
  paths, line ranges or symbols, worktree state, and branch applicability.
- The default destination is the Knowledge Ingestion Queue. Canonical pages are
  updated only when the user explicitly asks for promotion or names a
  destination page.
- Every extracted claim links back to a Knowledge Source Registry record, and
  every source record links forward to generated queue entries or canonical
  pages.

## Local Development Setup

Install the local development prerequisites:

- Node.js 26.x with Corepack available
- Python 3
- `pre-commit`

On macOS, `pre-commit` can be installed with Homebrew:

```bash
brew install pre-commit
```

Or with `pipx`:

```bash
pipx install pre-commit
```

After cloning the repository, enable Corepack so Node uses the pinned pnpm
release from `package.json`, then install dependencies:

```bash
corepack enable
pnpm install
```

Install the local git hook:

```bash
pre-commit install --install-hooks
```

This writes `.git/hooks/pre-commit` for your checkout and pre-installs the hook
environments. To verify the full local hook suite before your first commit:

```bash
pre-commit run --all-files
```

The local hooks run JSON/YAML/TOML checks, whitespace checks, Gitleaks,
actionlint, Prettier, Markdown linting, and marketplace validation. The Gitleaks
and actionlint hooks use upstream pre-commit hooks; if your machine does not
already have the required hook runtimes, `pre-commit` will download and cache
them on first run.

## Validation

Run the full repo check:

```bash
pnpm run check
```

Useful targeted checks:

```bash
pnpm run format:check
pnpm run lint:markdown
pnpm run validate:marketplace
pnpm run secrets:scan
```

`pnpm run secrets:scan` requires the `gitleaks` CLI to be available on your
PATH. CI runs the Gitleaks container directly, so the repository does not
require a committed binary or license key.

Marketplace installability smoke tests run in GitHub Actions on pull request
updates, not in pre-commit. They add this checkout as a local marketplace in
isolated Codex and Claude homes, list available plugins, and install listed
plugins when the catalog is non-empty.

## Install In Codex

From a published GitHub repository:

```bash
codex plugin marketplace add DSACMS/emmy-agent-marketplace
codex plugin marketplace list
```

For local development from this checkout:

```bash
codex plugin marketplace add <local dir>
codex plugin marketplace list
```

Then open Codex, run `/plugins`, choose the `emmy-agent-marketplace`
marketplace, and install the plugin you want. After catalog or plugin changes,
refresh with:

```bash
codex plugin marketplace upgrade emmy-agent-marketplace
```

## Install In Claude Code

From a published GitHub repository, run these inside Claude Code:

```text
/plugin marketplace add DSACMS/emmy-agent-marketplace
/plugin marketplace list
/plugin install <plugin-name>@emmy-agent-marketplace
/reload-plugins
```

For local development, add the local checkout instead:

```text
/plugin marketplace add <local dir>
/plugin install <plugin-name>@emmy-agent-marketplace
/reload-plugins
```

To test a plugin before adding it to the marketplace catalog:

```bash
claude --plugin-dir ./plugins/<plugin-name>
```

## Install In GitHub Copilot CLI

From a published GitHub repository:

```bash
copilot plugin marketplace add DSACMS/emmy-agent-marketplace
copilot plugin marketplace list
copilot plugin marketplace browse emmy-agent-marketplace
copilot plugin install <plugin-name>@emmy-agent-marketplace
```

For local development:

```bash
copilot plugin marketplace add <local dir>
copilot plugin marketplace browse emmy-agent-marketplace
copilot plugin install <plugin-name>@emmy-agent-marketplace
```

To test a plugin directly before marketplace distribution:

```bash
copilot plugin install ./plugins/<plugin-name>
copilot plugin list
```

## Add A Plugin

1. Create `plugins/<plugin-name>/`.
2. Add portable skills under `skills/<skill-name>/`.
3. Link the needed skills into `plugins/<plugin-name>/skills/<skill-name>` with
   relative symlinks when the target tool preserves them. If install smoke skips
   symlinks, use a materialized runtime copy instead.
4. If the plugin needs a shared MCP server, add the canonical config under
   `mcp/<mcp-component>/.mcp.json`, then link it into the plugin root as
   `.mcp.json`. Use a plugin-local runtime copy when a target tool requires it.
5. Add the manifests needed by your target tools:
   - Codex: `.codex-plugin/plugin.json`
   - Claude Code: `.claude-plugin/plugin.json`
   - GitHub Copilot CLI: `plugin.json`
6. Add entries to `.agents/plugins/marketplace.json` and
   `.claude-plugin/marketplace.json`.
7. Test local install in the target tools.

## References

- [AGENTS.md open format](https://agents.md/)
- [Agent Skills specification](https://agentskills.io/specification)
- [Codex skills and plugins](https://developers.openai.com/codex/plugins)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Claude Code plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [GitHub Copilot CLI skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [GitHub Copilot CLI plugin marketplaces](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace)
