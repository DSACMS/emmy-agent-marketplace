# Epic And Initiative Tickets

Use this reference when creating or interpreting epics, initiatives, or planning
hierarchy. Also use it when choosing a candidate parent for a child ticket.

## Field Pattern

- Use `Epic` for a body of related work that will collect child tickets.
- Set Epic Name with `customfield_10102`; it can be shorter than the summary.
- Use `Initiative` only for broad strategic work above epics.
- Priority is usually `Low` unless explicit program urgency exists.
- Labels are often sparse. Use broad labels such as `emmy_ato` only when the
  epic itself clearly owns that body of work.

## Description Shape

For epics, use:

- `Summary`
- `Goal`
- `Next Work`

For initiatives, use:

- `Summary`
- `Goals`
- `Notes`

Keep epics concise. Detailed implementation belongs in child tickets.

## Examples From Jira Scan

- `FFS-4234`: CFACTS Controls Phase 2, `emmy_ato`.
- `FFS-4116`: Deployment Management.
- `FFS-4456`: Personalized Flows: Understanding the Gaps, low priority.
