# CMS Hybrid Cloud Splunk Plugin

This plugin packages one skill for agents working with CMS Hybrid Cloud
infrastructure that must integrate with Splunk. It teaches the CMS operational
model for CloudWatch-first log ingestion, supported S3 service-log fallback, EUA
access setup, Splunk indexes, sourcetypes, and search verification.

## Components

- `plugin.json` is the shared plugin manifest.
- `.codex-plugin/plugin.json` adds Codex-facing marketplace metadata and starter
  prompts.
- `.claude-plugin/plugin.json` provides the Claude Code and GitHub Copilot CLI
  plugin manifest surface.
- `skills/cms-hybrid-cloud-splunk/` is the runtime copy of the canonical
  top-level skill.

The skill directory under this plugin is a runtime copy of the canonical
top-level `skills/cms-hybrid-cloud-splunk/` component. Keep the copy aligned
when changing shared skill behavior so local marketplace installs include the
bundled skill.

## Runtime Requirements

This plugin has no MCP server or live service dependency. It provides static CMS
Hybrid Cloud Splunk guidance from CMS Cloud documentation.

The skill does not grant authority to create live AWS, Splunk, Jira, or
Confluence changes. Agents may still edit repository code when the user asks for
implementation work and normal workspace permissions allow it.

## Source Pages

- <https://cloud.cms.gov/onboarding-splunk/>
- <https://cloud.cms.gov/splunk-introduction>
- <https://cloud.cms.gov/create-splunk-eua-job-code>
- <https://cloud.cms.gov/splunk-training>
- <https://cloud.cms.gov/using-splunk-ingest-logs>
- <https://cloud.cms.gov/using-splunk-search-logs>
- <https://cloud.cms.gov/configuring-cloudwatch-log-agent>
- <https://cloud.cms.gov/best-practices-logging-application-development>
- <https://cloud.cms.gov/cms-search-optimization-splunk>

## Example Prompts

```text
Use $cms-hybrid-cloud-splunk to review this Terraform change for CMS Splunk logging compatibility.
```

```text
Use $cms-hybrid-cloud-splunk to plan CloudWatch log groups and sourcetypes for this CMS Hybrid Cloud service.
```

```text
Use $cms-hybrid-cloud-splunk to help verify whether my CloudWatch logs are searchable in Splunk.
```

```text
Use $cms-hybrid-cloud-splunk to explain the EUA Splunk job code workflow for this application.
```
