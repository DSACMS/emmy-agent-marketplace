# Emmy Governance Document Template

Use this structure when drafting an Emmy governance document. The canonical
Confluence parent is `Governance` page `1398349788`, and registry pages use the
label `governance`.

## Metadata Rules

- `Status` defaults to `Draft`.
- `Domain` must be one of:
  - `Security & Compliance`
  - `Open Source`
  - `Release & Comms`
- `Driver` can be a role or team.
- `Approver` must be exactly one role, not a team or personal name.
- `Contributors` and `Informed` can be roles or teams.
- Use role titles, not names, in people fields.
- `Review Cadence` must be explicit, such as `Annual`, `Semi-Annual`,
  `Per Release`, or `Ad Hoc`.
- Leave `Superseded By`, `Approval Date`, `Last Reviewed`, and `Next Review Due`
  blank for a new draft unless the user supplies values.
- Leave `Control ID` and `Control Family` blank when the document is not tied to
  an ATO control.

## Page Skeleton

```markdown
## Status

|                   |                                                         |
| ----------------- | ------------------------------------------------------- |
| **Domain**        | [Security & Compliance / Open Source / Release & Comms] |
| **Status**        | Draft                                                   |
| **Superseded By** |                                                         |

## Review

|                     |                                               |
| ------------------- | --------------------------------------------- |
| **Approval Date**   |                                               |
| **Review Cadence**  | [Annual / Semi-Annual / Per Release / Ad Hoc] |
| **Last Reviewed**   |                                               |
| **Next Review Due** |                                               |

## DACI

|                  |                      |
| ---------------- | -------------------- |
| **Driver**       | [Role or team]       |
| **Approver**     | [Single role]        |
| **Contributors** | [Role(s) or team(s)] |
| **Informed**     | [Role(s) or team(s)] |

## ATO Control

|                    |                            |
| ------------------ | -------------------------- |
| **Control ID**     | [Blank unless ATO-related] |
| **Control Family** | [Blank unless ATO-related] |

## Purpose

[One paragraph explaining why this document exists, what obligation or
operational need it satisfies, and what outcome it establishes.]

---

## Scope

### Applies To:

- **Environments:** [production, uat, dev, all environments, or N/A]
- **Repositories:** [iv-cbv-payroll, emmy-infra, other, or N/A]
- **Roles:** [roles or teams bound by this process]

### Does Not Apply To:

- [Explicit exclusions.]

## Requirement Basis

> [Quoted requirement or obligation text when applicable.]
>
> - [Source citation.]

---

## Emmy Implementation

### Process Description

[Describe how Emmy actually satisfies the requirement or operates the process
today. Name the real tools, repositories, handoffs, inputs, outputs, and
approval points.]

### Roles and Responsibilities

|          |                                  |
| -------- | -------------------------------- |
| **Role** | **Responsibility**               |
| [Role]   | [Responsibility in this process] |

### Tools and Systems

|                     |                             |
| ------------------- | --------------------------- |
| **Tools / Systems** | **Purpose in This Process** |
| [Tool or system]    | [Purpose]                   |

## Related Tickets

- [Only include when supplied or already present in source.]
```

## Writing Standard

Write for two readers at once:

- a new Emmy team member who needs to operate within the process;
- an external reviewer who needs to verify Emmy satisfies an obligation.

The body must describe current reality. If the source contains a gap, open
question, unresolved cadence, missing approver, or future intent, pause and ask
for the missing fact before drafting the page.

## Section Guidance

### Purpose

Use one paragraph. Name the obligation or operating need and the outcome the
document establishes. Avoid background history unless it is needed to understand
the obligation.

### Scope

Include both inclusions and exclusions. Scope should address environments,
repositories, roles or teams, partner interfaces, inherited services, and local
development exclusions when relevant.

### Requirement Basis

For ATO documents, quote the CMS ARS or control text when supplied. For open
source and release governance, cite the policy, deadline, state communication
commitment, or other driver. If no external obligation exists, state the
internal governance driver instead of inventing a citation.

### Emmy Implementation

Use concrete present-tense language. Name actual systems such as Confluence,
Jira, GitHub, CFACTS, CMS Hybrid Cloud, state partner channels, or Emmy
repositories only when the source supports them.

### Related Tickets

Include this section only when the source supplies Jira tickets or an existing
page already has them. Do not search or create Jira issues from this skill.
