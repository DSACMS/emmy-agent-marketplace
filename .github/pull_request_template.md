# Pull Request

## Summary

## Validation

- [ ] `pnpm run check`
- [ ] `pre-commit run --all-files`
- [ ] Gitleaks secret scan passes

## Marketplace Checklist

- [ ] Updated `.agents/plugins/marketplace.json` if Codex installability changed
- [ ] Updated `.claude-plugin/marketplace.json` if Claude/Copilot installability
      changed
- [ ] Plugin source paths resolve under `plugins/`
- [ ] Skill `name` values match their directory names
- [ ] External binaries, MCP servers, network access, and authentication needs
      are documented
