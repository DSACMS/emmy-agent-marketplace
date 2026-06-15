# Planning Ingest Write Safety

Use this reference before any approved `emmy-planning-ingest` Confluence write.
The goal is narrow, reviewable updates to the Emmy Goals Space.

## Pre-Write Checklist

1. Confirm the user explicitly approved the whole write plan in the current
   conversation.
2. Identify every target page ID and whether the operation is create or update.
3. Re-read every target page immediately before writing with metadata/version.
4. Prefer storage format when editing tables or preserving page structure.
5. Compare current content to the reviewed write plan. Stop if the target
   section changed in a way that affects the plan.
6. Check the planned content for secrets, credentials, private personal data,
   unsupported source material, and speculative claims.

## Table Updates

- Preserve table columns, headers, and unrelated rows exactly.
- Remove placeholder rows such as `None yet`, `-`, or em dash rows only when
  adding the first real row to that table.
- Add or update only the rows named in the approved plan.
- Keep active rows in their existing table and do not move achieved, deferred,
  or retired rows unless the approved plan explicitly says to do so.
- For index row links, point to the new or updated child page once Confluence
  returns the page ID or URL.

## Child Page Updates

- Create principle pages only under Strategic Principles `1398768358`.
- Create goal pages only under Goals Registry `1398342919`.
- Use the live index-page templates as the required section structure.
- Add a Change Log row to every created or updated child page.
- Preserve unrelated sections on existing child pages.
- Stop if the source would require changing a goal or principle statement
  without explicit human approval.

## Outcomes Index Sync

- Every approved goal outcome must appear in Outcomes Index `1399162264`.
- Do not write exact duplicate outcomes as new rows.
- For near-duplicates, stop and ask the human to choose whether to reuse,
  update, or create an outcome.
- Use `-` for missing Jira epic values unless the approved plan provides an epic
  key.

## Conflict Handling

If a page changed after the review packet was approved, compare the current page
to the approved plan:

- Continue only when the new changes are clearly unrelated to the planned
  section.
- Stop when the same table row, child page section, or outcome row changed.
- Report the page ID, section, and conflict instead of guessing.

## Post-Write Validation

After each write, re-read the changed page or fetch a diff and confirm:

- New or updated child pages exist in the expected parent location.
- Index rows point to the intended child pages.
- Outcomes Index rows match approved goal outcomes.
- Placeholder rows were removed only when replaced by real rows.
- Change Log rows were added where required.
- No unrelated content changed.

Report changed page titles, page IDs, URLs, and validation results.
