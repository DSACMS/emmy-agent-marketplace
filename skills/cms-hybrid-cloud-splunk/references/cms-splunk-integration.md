# CMS Hybrid Cloud Splunk Integration

Use this reference for CMS Hybrid Cloud Splunk architecture, access, ingestion
paths, indexes, and verification.

## Source Set

CMS Cloud pages used for this skill:

- [Onboarding to Splunk](https://cloud.cms.gov/onboarding-splunk/)
- [Introduction to Splunk](https://cloud.cms.gov/splunk-introduction)
- [Creating a Splunk job code for your application](https://cloud.cms.gov/create-splunk-eua-job-code)
- [Splunk Training](https://cloud.cms.gov/splunk-training)
- [Using Splunk to ingest logs](https://cloud.cms.gov/using-splunk-ingest-logs)
- [Using Splunk to search logs](https://cloud.cms.gov/using-splunk-search-logs)
- [Configuring CloudWatch log agent](https://cloud.cms.gov/configuring-cloudwatch-log-agent)
- [Best practices for logging application development](https://cloud.cms.gov/best-practices-logging-application-development)
- [CMS Search Optimization for Splunk](https://cloud.cms.gov/cms-search-optimization-splunk)

Treat these pages as the authority for CMS Hybrid Cloud Splunk behavior.

## Operating Model

- CMS Hybrid Cloud AWS accounts are described as pre-configured to send logs to
  Splunk.
- Ingestion and human access are separate concerns. Logs can be flowing before a
  user has permission to search them.
- The primary application-log service is CloudWatch Logs.
- Each AWS account is provisioned with a Lambda function that automatically adds
  subscriptions to new CloudWatch log groups and pushes the logs to a Splunk
  Heavy Forwarder.
- From the Heavy Forwarder, logs are parsed where possible and sent to the
  Splunk Indexer cluster. Users search through the Splunk Search Head UI.
- Logs with unsupported formats are still sent to Splunk, but may lack proper
  parsing and field extraction.
- The CMS Cloud introduction page describes Splunk components as Forwarder,
  Indexer, and Search Head. For infrastructure work, prefer the CloudWatch path
  from the ingest guidance unless the user is explicitly working on Universal
  Forwarder installation or upgrade.

## Human Access Workflow

Access to Splunk logs depends on EUA job codes and Splunk admin configuration.
Agents should not imply that creating log infrastructure grants user access.

ADO onboarding flow:

1. A CMS business owner starts creation of the EUA job code. This can take days
   to weeks.
2. Two users need to be approved to use the job code after creation.
3. A help desk ticket provisions Splunk access and includes the job code plus
   every account it should be tied to.
4. CMS Hybrid Cloud Splunk administrators grant access to logs from the
   specified accounts for users with the job code.
5. Splunk configuration deploys overnight.
6. Users verify access the next morning by logging in and checking logs and the
   provided landing application.

Job code requirements:

- A CMS government employee application or product owner creates the job code
  and owns it. Contractors cannot create, own, or manage job code access.
- Recommended naming is `AWS_APPNAME_SPLUNK` for AWS-hosted applications or
  `MAG_APPNAME_SPLUNK` for Microsoft Azure Government.
- The job code must use capital letters. Lowercase requests can be rejected.
- Anyone who needs the application logs requests this job code in EUA.
- After creation, inform the CMS Splunk team of the job code name so it can be
  applied to the Splunk index for the application.
- The CMS Cloud page lists `splunk.cloud.cms.gov` as the application URL for the
  EUA job code request.

## Ingestion Paths

### Preferred Path: CloudWatch Logs

Use CloudWatch Logs for application, system, and custom logs whenever possible.
Gold images include CloudWatch logging for basic operating system events and AWS
account logging. Application teams add application logs through CloudWatch Agent
configuration or service-native CloudWatch log delivery.

Custom application log groups must use one of these patterns:

```text
/aws/ec2/{LogGroupName}/#{SourceType}
/custom/{LogGroupName}/#{SourceType}
```

Use the EC2 pattern for EC2-hosted file logs. Use the custom pattern for custom
logs that do not come from EC2. The `/#` delimiter is required. `{SourceType}`
is the Splunk sourcetype.

### S3 Fallback

CloudWatch Logs is the primary and preferred source. S3 ingestion is only for
AWS services that do not support native CloudWatch logging in this setup.

Each AWS account has an S3 bucket in each supported region for this purpose:

```text
cms-cloud-<account-number>-<region>
```

Supported S3-ingested service logs:

| Path within bucket                       | Service    | Sourcetype                  |
| ---------------------------------------- | ---------- | --------------------------- |
| `AWSLogs/<account>/Cloudfront`           | CloudFront | `aws:cloudfront:accesslogs` |
| `AWSLogs/<account>/elasticloadbalancing` | ELB/ALB    | `aws:elb:accesslogs`        |
| `AWSLogs/<account>/waf`                  | WAF        | `aws:waf`                   |

Do not use S3 for custom log ingestion. Use CloudWatch Logs for custom logs.

## Index Structures

CMS Hybrid Cloud Splunk has three index structures. Ask which structure applies
or use Splunk discovery queries when it is unknown.

### V1 Named Indexes

V1 indexes were customer-selected names, often named for the application. New V1
indexes are no longer created, but existing applications may still use them.

### V2 Account-Based Indexes

V2 indexes are based on AWS account number or MAG subscription.

| Index shape                 | Purpose                          |
| --------------------------- | -------------------------------- |
| `<account>`                 | Base system and application logs |
| `<account>_aws` or `_azure` | Cloud-provider logs              |
| `<account>_security`        | Security logs                    |
| `<account>_flow`            | AWS VPC flow logs                |
| `<account>_metrics`         | Supported system metrics         |

### V3 Common Indexes

V3 uses common indexes plus metadata fields for filtering and access control.

| Index         | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `application` | Application logs, including custom logs         |
| `cloud`       | Cloud provider logs                             |
| `security`    | Security logs from instances and cloud services |
| `system`      | System logs not tied to one application         |
| `vpc`         | VPC traffic logs                                |

Common V3 metadata fields:

| Field             | Meaning                                   |
| ----------------- | ----------------------------------------- |
| `cloudaccount`    | AWS account number or MAG subscription ID |
| `cloudenv`        | CMS Cloud environment such as dev or prod |
| `fismasystem`     | CMS FISMA system acronym                  |
| `applicationname` | Machine-readable application name         |

## Verification Checklist

Use this checklist when reviewing or implementing infrastructure changes:

- Confirm the log source writes to CloudWatch Logs unless it is one of the
  supported S3 service-log sources.
- Confirm custom CloudWatch log groups use the required `/aws/ec2/.../#...` or
  `/custom/.../#...` pattern.
- Confirm the intended sourcetype is present in the log group name for custom
  logs.
- Confirm Lambda logs are JSON-formatted when possible so values parse
  correctly.
- Confirm users have, or are requesting, the correct EUA Splunk job code before
  expecting Search Head access.
- Use Splunk discovery queries to identify indexes, accounts, and sourcetypes
  the user can access.
- Use narrow time windows and exact filters before broad exploratory searches.
