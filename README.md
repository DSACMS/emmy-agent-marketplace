# Emmy Agent Marketplace

This repository is a shared marketplace for team agent workflows: portable skills, tool integrations, and installable plugins for Codex, Claude Code, and GitHub Copilot CLI.

The main portability target is the [Agent Skills](https://agentskills.io/specification) `SKILL.md` format. Product-specific plugin manifests are kept beside the portable skill content so the same plugin directory can be installed by multiple tools.

## Repository Layout

```text
.
|-- AGENTS.md
|-- README.md
|-- .agents/plugins/marketplace.json
|-- .claude-plugin/marketplace.json
`-- plugins/
    `-- <plugin-name>/
        |-- .codex-plugin/plugin.json
        |-- .claude-plugin/plugin.json
        |-- plugin.json
        |-- skills/<skill-name>/SKILL.md
        |-- agents/
        |-- hooks.json
        `-- .mcp.json
```

Not every plugin needs every optional directory. Start with `skills/<skill-name>/SKILL.md` and the manifests required by the tools you want to support.

## Marketplace Catalogs

- Codex reads the repo-scoped marketplace from `.agents/plugins/marketplace.json`.
- Claude Code reads the marketplace from `.claude-plugin/marketplace.json`.
- GitHub Copilot CLI reads marketplace files from `.github/plugin/marketplace.json` and also recognizes `.claude-plugin/marketplace.json`, so this repo uses the Claude path as the shared Claude/Copilot catalog.

When you add a plugin under `plugins/<plugin-name>/`, add matching entries to both marketplace catalogs.

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

Then open Codex, run `/plugins`, choose the `emmy-agent-marketplace` marketplace, and install the plugin you want. After catalog or plugin changes, refresh with:

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
2. Add portable skills under `plugins/<plugin-name>/skills/<skill-name>/SKILL.md`.
3. Add the manifests needed by your target tools:
   - Codex: `.codex-plugin/plugin.json`
   - Claude Code: `.claude-plugin/plugin.json`
   - GitHub Copilot CLI: `plugin.json`
4. Add entries to `.agents/plugins/marketplace.json` and `.claude-plugin/marketplace.json`.
5. Test local install in the target tools.

## References

- [AGENTS.md open format](https://agents.md/)
- [Agent Skills specification](https://agentskills.io/specification)
- [Codex skills and plugins](https://developers.openai.com/codex/plugins)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Claude Code plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [GitHub Copilot CLI skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [GitHub Copilot CLI plugin marketplaces](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace)
