# Logging And Search Patterns

Use this reference for CMS Hybrid Cloud log design, CloudWatch Agent review, and
Splunk search patterns.

## Log Group Naming

Application logs that flow through CloudWatch Logs must include the Splunk
sourcetype in the log group name.

```text
/aws/ec2/{LogGroupName}/#{SourceType}
/custom/{LogGroupName}/#{SourceType}
```

Guidance:

- Use `/aws/ec2/...` for EC2 file logs.
- Use `/custom/...` for custom logs that do not come from EC2.
- Keep the `/#` delimiter exactly as shown.
- Choose a source type that Splunk can parse. If unsure, start from CMS default
  sourcetypes or Splunk's common sourcetype list.
- Prefer JSON logs for custom applications.

Selected CMS default mappings:

| Log source                               | Sourcetype                   | Typical V3 index |
| ---------------------------------------- | ---------------------------- | ---------------- |
| `/aws/apigateway/*`                      | `aws:apigateway`             | `cloud`          |
| `/aws/ec2/var/log/audit/audit.log`       | `linux_audit`                | `security`       |
| `/aws/ec2/var/log/secure`                | `linux_secure`               | `security`       |
| `/aws/ec2/var/log/messages`              | `linux_messages_syslog`      | `system`         |
| `/aws/ecs/containerinsights/*`           | `aws:containerinsights`      | `cloud`          |
| `/aws/ecs/fargate/*`                     | `aws:fargate`                | `cloud`          |
| `/aws/eks/*`                             | `aws:eks`                    | `cloud`          |
| `/aws/events/cms-cloud-securityhub-logs` | `aws:securityhub`            | `security`       |
| `/aws/events/guardduty`                  | `aws:cloudwatch:guardduty`   | `cloud`          |
| `/aws/lambda/<function-name>`            | `lambda:function-name`       | `cloud`          |
| `cms-cloud-cloudtrail-logs`              | `aws:cloudtrail`             | `cloud`          |
| `cms-cloud-vpc-flowlogs`                 | `aws:cloudwatchlogs:vpcflow` | Verify in Splunk |
| `/aws/ec2/{LogGroupName}/#{SourceType}`  | Defined in path              | `application`    |
| `/custom/{LogGroupName}/#{SourceType}`   | Defined in path              | `application`    |

The CMS pages include both a V3 `vpc` index description and a default logging
chart where VPC flow logs are shown with `cloud`. Verify the actual index with a
discovery query for the account and sourcetype before hard-coding a query.

## CloudWatch Agent Review

Gold-image users usually already have CloudWatch logging configured. For
non-gold images or custom additions, verify the agent before changing config.

Linux checks:

```bash
sudo systemctl status awslogs
sudo systemctl status amazon-cloudwatch-agent
grep "Detected runAsUser:" /opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log
```

The current agent should run as `cwagent`. If the old `awslogs` agent is still
enabled, migrate carefully and disable it after the new agent is configured.

Windows check:

```powershell
sc.exe query "CWAgentOtelCollector"
```

Additional CloudWatch Agent configuration should live in a persistent custom
directory as JSON. Append it to the existing configuration rather than replacing
the base image config.

Linux append command:

```bash
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a append-config \
  -m ec2 \
  -s \
  -c file:/path/to/the/newMetricFile.json
```

Windows append command:

```powershell
& "$Env:Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-ctl.ps1" `
  -a append-config `
  -m ec2 `
  -s `
  -c file:$Env:path\to\the\newMetricFile.json
```

## Application Logging Quality

Use the CMS logging best practices when shaping application logs:

- Avoid logging PII, PHI, payment data, credentials, tokens, or secrets.
- Use a consistent structure across logs.
- Include timestamp, host name, service name, and log creator.
- Include stable transaction IDs, request IDs, user IDs where appropriate, and
  other correlation IDs.
- Prefer one JSON object per line.
- Keep log events single-line; embedded newlines can confuse collection and
  searching.
- Use UTC timestamps and keep server time synchronized.
- Log meaningful events, audit trails, transactions, and timing information.
- Log asynchronously when possible.
- Keep local log rotation and disk-space alarms in place.
- Use logging levels such as info, warning, error, and debug consistently.

## Search Discovery

Start with discovery when the index structure is unknown.

Find accessible accounts and sourcetypes in a V3 common index:

```spl
| tstats count WHERE index=cloud BY cloudaccount sourcetype
```

Find application sourcetypes:

```spl
| tstats count WHERE index=application BY cloudaccount applicationname sourcetype
```

Find security sourcetypes:

```spl
| tstats count WHERE index=security BY cloudaccount sourcetype
```

Use the shortest useful time range. The CMS page notes that Splunk's default
search window is the last 60 minutes.

## Efficient Search Patterns

Use index and sourcetype at minimum:

```spl
index=cloud sourcetype="aws:cloudtrail" cloudenv=prod awsRegion="us-east-1" earliest=-1h latest=now
```

For V3 application logs, add metadata fields:

```spl
index=application cloudaccount="<account>" applicationname="<app-name>" sourcetype="<sourcetype>" earliest=-30m latest=now
```

For V2 account-based logs:

```spl
index=<account> sourcetype="<sourcetype>" earliest=-30m latest=now
```

Optimization guidance:

- Avoid `index=*` and searches without an index.
- Filter early with index, sourcetype, source, host, and metadata fields.
- Prefer inclusion filters over large `NOT` and `OR` clauses.
- Avoid real-time searches unless they are truly required.
- Avoid expensive commands such as `transaction`, `join`, and unnecessary
  `dedup`; prefer `stats` where possible.
- Use fast mode for alerts and searches when detailed events are not needed.
- Stagger scheduled searches and alerts so they do not all run at the same time.
- Use alerts for monitoring rather than leaving dashboards open indefinitely.

## Infrastructure Review Checklist

For a pull request, Terraform module, CloudFormation template, launch script, or
runbook:

- Identify every service that emits logs and where each log lands first.
- Confirm custom logs use CloudWatch Logs and the CMS log group naming pattern.
- Confirm S3 logging is limited to supported service logs such as CloudFront,
  ELB/ALB, or WAF.
- Confirm new EC2 file logs are collected by CloudWatch Agent through persistent
  JSON configuration.
- Confirm log records avoid sensitive values and are structured for field
  extraction.
- Add or request a verification query that proves events are searchable by
  index, sourcetype, and account/application metadata.
