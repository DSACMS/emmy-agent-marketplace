# AGENTS.md

## Repository Purpose

This repository is a shared marketplace for agent skills, tools, and plugins
used by the development team. It should stay usable from Codex, Claude Code, and
GitHub Copilot CLI while keeping reusable workflows as close as possible to open
formats.

## Authoring Principles

- Prefer the Agent Skills `SKILL.md` format for reusable workflows.
- Keep each skill focused on one task, with a lowercase kebab-case `name` that
  matches the skill directory.
- Put portable instructions in `skills/<skill-name>/SKILL.md`; put
  product-specific behavior in product manifests, settings, or wrapper scripts.
- Keep reusable components in one canonical location and expose them from
  plugins with relative symlinks whenever practical.
- Use Model Context Protocol (MCP) for external tools and live service
  integrations when a workflow needs private data or actions.
- Keep generated or local cache files out of the repository.

## Component Reuse Standard

Plugins should be thin installable bundles over shared components, not the
primary place where reusable component source is authored.

- Author reusable skills in top-level component directories, such as
  `skills/<skill-name>/SKILL.md`.
- In `plugins/<plugin-name>/`, link to those canonical components with relative
  symlinks so the same skill can be offered as an individual plugin and inside
  larger bundles without copying files.
- Keep symlink targets inside this marketplace repository. Do not point plugin
  symlinks at absolute paths, user home directories, or files outside the
  marketplace root.
- Put plugin-only manifests, metadata, and wrapper configuration directly in the
  plugin directory.
- If a component cannot be safely symlinked for a target tool, document the
  reason and prefer a generated packaging step over hand-maintained duplicate
  source.

Example:

```text
skills/evidence-review/SKILL.md
plugins/evidence-review/skills/evidence-review -> ../../../skills/evidence-review
plugins/ato-suite/skills/evidence-review -> ../../../skills/evidence-review
```

## Marketplace Layout

Use this structure for shared plugins:

```text
skills/<skill-name>/SKILL.md

plugins/<plugin-name>/
  .codex-plugin/plugin.json
  .claude-plugin/plugin.json
  plugin.json
  skills/<skill-name> -> ../../../skills/<skill-name>
  agents/
  hooks.json
  .mcp.json
```

- `.agents/plugins/marketplace.json` is the Codex marketplace catalog.
- `.claude-plugin/marketplace.json` is the Claude Code marketplace catalog and
  is also recognized by GitHub Copilot CLI.
- Keep catalog entries for the same plugin aligned across both marketplace
  files.

## Plugin Review Checklist

Before adding or changing a plugin:

- Confirm every `SKILL.md` has valid YAML frontmatter with `name` and
  `description`.
- Confirm descriptions say when to use the skill, not only what the skill is.
- Keep secrets, account IDs, credentials, and local machine paths out of
  committed files.
- Document any required external binaries, network access, MCP servers, or
  authentication in the plugin README or skill compatibility notes.
- Test local installation in at least one target tool before publishing the
  plugin to teammates.

## Validation

This repo may contain mostly Markdown and JSON. For each change, run the checks
that match the edited files:

- Full repo check: `pnpm run check`.
- Local hook suite: `pre-commit run --all-files`.
- JSON files: `pnpm run validate:json`.
- Markdown files: `pnpm run lint:markdown`.
- Marketplace or skill changes: `pnpm run validate:marketplace`.
- Secret scan: `pnpm run secrets:scan` if `gitleaks` is installed locally.
- Marketplace installability smoke: CI runs `pnpm run smoke:marketplace` on pull
  request updates; keep this out of pre-commit because it downloads and runs
  Codex and Claude CLIs.
- Plugin changes: test a local install with the relevant CLI where available.

Run `corepack enable` once for your Node installation, then `pnpm install`
before using the validation scripts. Run `pre-commit install` once per checkout
to enable the team's local git hooks.

## Collaboration Notes

- Favor small, reviewable plugin additions over large bundles of unrelated
  workflows.
- Do not silently change a published plugin name; names are used as install
  identifiers and command namespaces.
- When a workflow needs vendor-specific instructions, add a short note
  explaining which tool requires it and why.
