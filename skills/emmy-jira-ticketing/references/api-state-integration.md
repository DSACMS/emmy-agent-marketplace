# API And State Integration Tickets

Use this reference for Emmy API, state integration, iframe, enrollment, bulk
operation, sample payload, partner system, state hub, or public API work.

## Field Pattern

- Issue type: usually `Story`, even for small API increments.
- Priority: usually `Low`; increase only when a state, partner, deadline,
  launch, or blocked integration justifies it.
- Labels: use `emmy_api`. Add state or partner labels such as `rhode_island`,
  `NH`, or `Accenture` only when named by the source.
- Team: often unset; sometimes `Emmy Product` for product-owned API needs. Do
  not infer Team from `emmy_api` alone.
- Epic Link: often unset unless a matching API/state epic is clear.

## Description Shape

Sparse descriptions are common. When drafting from enough source material, use:

- `Context`
- `Product Requirements`
- `Out of Scope`
- `Acceptance Criteria`

Acceptance criteria should cover endpoint behavior, schema/request/response
changes, sample payloads, documentation, compatibility, or state acceptance.

## Examples From Jira Scan

- `FFS-4505`: Hawaii iframe access, `Story`, `emmy_api`, low priority, blocked.
- `FFS-4504`: Hawaii iframe bounce-away request, `Story`, `emmy_api`, low
  priority.
- `FFS-4489`: V1 API spec request, `Story`, `emmy_api`, sparse description.
