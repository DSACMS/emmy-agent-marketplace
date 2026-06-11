# Write Safety

Read this before using any Confluence create, update, comment, label, or
attachment tool.

## Pre-Write Checklist

1. Confirm the user explicitly authorized a knowledge-store write, capture,
   persistence, comment, label, or attachment.
2. Identify the exact target page or parent page.
3. Read the current target page or parent page.
4. Inspect page history and, when updating, the relevant diff.
5. Preserve existing structure and unrelated content.
6. Make the smallest useful change.
7. Include provenance: source links, dates, evidence, confidence, and labels.
8. Re-check for secrets, credentials, personal data, speculative claims, and
   local scratch paths.

## Conflict Handling

If the page changed after your first read, compare the latest content to your
planned edit. Merge only when the new changes are clearly independent. If the
same section changed, stop and report the conflict with the page URL and the
section that needs human review.

## Write Types

- **Canonical update:** Use only for explicit user requests or curator
  promotion. Update a specific section rather than rewriting the full page.
- **Queue candidate:** Use when persistence is authorized but the content needs
  review, dedupe, or a destination page decision.
- **Comment:** Use for low-risk notes on an existing page when a comment is more
  appropriate than editing the page body.
- **Label:** Add only after reading the page and confirming the labels fit.
- **Attachment:** Upload only when the user asked to persist an artifact and the
  artifact is safe to share.

## Post-Write Validation

After writing, re-read the page or fetch the resulting diff. Confirm that the
intended change is present, unrelated content remains intact, labels were added
only as intended, and no disallowed content was introduced. Report the changed
page title and URL or page ID.
