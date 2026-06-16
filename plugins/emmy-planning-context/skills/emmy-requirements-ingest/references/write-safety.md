# Requirements Ingest Write Safety

Use this reference before any approved `emmy-requirements-ingest` Confluence
write. The goal is narrow, auditable updates to the Emmy Goals Space
Requirements Registry.

## Pre-Write Checklist

1. Confirm the user explicitly approved the whole requirement write plan in the
   current conversation.
2. Identify every target page ID and whether the operation is create or update.
3. Re-read Goals Space root `1398768351` and Requirements Registry `1399165621`
   with metadata/version.
4. Re-read existing requirement child pages that will be updated.
5. Prefer storage format when editing tables or preserving page structure.
6. Compare current content to the reviewed write plan. Stop if the target
   section changed in a way that affects the plan.
7. Re-run duplicate checks against current registry rows and child pages.
8. Check planned content for secrets, credentials, private personal data,
   unsupported source material, and speculative claims.

## Source And Scope

- Write only to Requirements Registry `1399165621` and approved child
  requirement pages under it.
- Do not write to source Confluence pages used for interpretation.
- Do not write to the Knowledge Store, Jira, Strategic Principles, Goals
  Registry, or Outcomes Index.
- Record local file provenance as filename, file type, and date reviewed. Do not
  persist local absolute paths.
- Record Knowledge Store URLs only as evidence links when provided; do not
  dereference or edit Knowledge Store pages.

## Registry Table Updates

- Preserve table columns, headers, and unrelated rows exactly.
- Add approved `Active` requirements to the Active Requirements table.
- Add approved non-active requirements to a Deferred / Retired Requirements
  table. Create that table only when the approved plan requires it and the
  section does not already contain one.
- Remove placeholder rows such as `None yet`, `-`, or em dash rows only when
  adding the first real row to that table.
- Add or update only the rows named in the approved plan.
- For registry row links, point to the created or updated child page once
  Confluence returns the page ID or URL.

## Child Page Updates

- Create requirement pages only under Requirements Registry `1399165621`.
- Use the live registry and existing child-page structure as the required
  section pattern.
- Add a Change Log row to every created or updated requirement child page.
- Preserve unrelated sections on existing child pages.
- Stop if the write would change a requirement statement, applicability,
  blocking rule, or evidence expectation without explicit human approval.

## Duplicate And Conflict Handling

Stop and ask the human for direction when:

- The candidate duplicates an existing requirement name, statement, blocking
  rule, authority, or applicability.
- A page changed after approval in the same table row or child-page section.
- The registry table shape is not recognizable enough for a narrow edit.
- The approved plan omits the status, owner, authority, statement,
  applicability, or planning impact needed for a stable requirement record.

Continue only when concurrent changes are clearly unrelated to the planned
section.

## Post-Write Validation

After each write, re-read the changed page or fetch a diff and confirm:

- New or updated requirement child pages exist under Requirements Registry
  `1399165621`.
- Registry rows point to the intended child pages.
- Active and non-active rows landed in the expected tables.
- Placeholder rows were removed only when replaced by real rows.
- Change Log rows were added where required.
- No requirement entries were added beyond the approved plan.
- No unrelated content changed.

Report changed page titles, page IDs, URLs, and validation results.
