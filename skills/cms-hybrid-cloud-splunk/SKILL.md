---
name: cms-hybrid-cloud-splunk
description: >-
  Use when planning, implementing, reviewing, or verifying CMS Hybrid Cloud
  infrastructure that needs Splunk integration, including CloudWatch Logs,
  CloudWatch Agent configuration, S3 service-log fallback, Splunk sourcetypes
  and indexes, EUA job code access, and efficient Splunk Search Head
  verification.
---

# CMS Hybrid Cloud Splunk

## Purpose

Use this skill to help agents manage infrastructure that must integrate with the
CMS Hybrid Cloud Splunk setup. The skill is CMS Hybrid Cloud scoped and not
Emmy-specific.

The skill is a guidance layer. It does not provide live Splunk, AWS, Jira, or
Confluence write authority. If the user asks for repository edits, make normal
repo changes. If the user asks for live infrastructure or service changes, use
only available approved tools and call out any missing permissions.

## Source Authority

- Treat the CMS Cloud pages listed in `references/cms-splunk-integration.md` as
  the source of truth.
- Do not invent Splunk administrator steps, indexes, sourcetypes, access
  workflows, retention rules, or CMS account bootstrap behavior.
- When CMS Cloud guidance and external Splunk or AWS documentation differ, use
  CMS Cloud guidance for CMS Hybrid Cloud integration.
- Use external AWS or Splunk docs only as supplementary links unless the user
  explicitly asks for broader research.
- If a task needs current confirmation and network access is available, refresh
  the relevant CMS Cloud page before making current-state claims.

## Reference Routing

- Read `references/cms-splunk-integration.md` for architecture, onboarding,
  indexes, S3 fallback, and verification.
- Read `references/logging-and-search-patterns.md` for log group naming,
  CloudWatch Agent review, structured logging, sourcetypes, and Splunk search
  examples.
- For access-only questions, read the onboarding and EUA sections in
  `references/cms-splunk-integration.md`.
- For infrastructure-code review, read both reference files before giving
  implementation guidance.

## Core Workflow

1. Identify the log source: EC2 file logs, Lambda, ECS, EKS, API Gateway,
   CloudTrail, VPC flow logs, CloudFront, ELB/ALB, WAF, Windows events, or a
   custom application log.
2. Prefer CloudWatch Logs for CMS Hybrid Cloud ingestion. Use S3 only for the
   documented AWS service logs that cannot write natively to CloudWatch.
3. Confirm custom log group naming follows the CMS pattern:
   `/aws/ec2/{LogGroupName}/#{SourceType}` for EC2-hosted logs or
   `/custom/{LogGroupName}/#{SourceType}` for custom non-EC2 logs.
4. Check that the log content is Splunk-friendly: JSON where practical,
   single-line events, stable fields, no PII/PHI, UTC time, and correlation IDs.
5. Explain how access is handled separately from ingestion: CMS accounts may be
   pre-configured to send logs, while users still need the correct EUA Splunk
   job code and Splunk admin provisioning.
6. Provide a verification path: confirm CloudWatch log groups exist, identify
   expected sourcetype and index behavior, and use narrow Splunk searches with
   index, sourcetype, metadata fields, and short time windows.

## Output Expectations

When advising on an infrastructure change, include:

- the expected ingestion path;
- the log group naming and sourcetype recommendation;
- whether S3 is allowed or CloudWatch is required;
- access or onboarding prerequisites if humans need to search the logs;
- a small Splunk verification query or `tstats` discovery query;
- any CMS-specific caveat or source-page uncertainty.
