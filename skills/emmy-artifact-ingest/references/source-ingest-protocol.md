# Source Ingest Protocol

Use this protocol for explicit source ingestion into the Emmy Agent Knowledge
Store.

## Common Workflow

1. Confirm the user explicitly requested ingestion.
2. Classify the source: local file, URL, external Confluence page, or repository
   checkout.
3. Read the knowledge-store entry page and inspect child pages.
4. Find or create `Knowledge Source Registry` and `Knowledge Ingestion Queue`
   only when persistence is authorized.
5. Create one source record per source.
6. Extract evidence-backed knowledge.
7. Create one or more `needs-review` queue entries by default.
8. Link each queue entry back to its source record.
9. Link the source record forward to every queue entry or canonical page created
   from it.
10. Re-read changed pages and report URLs or page IDs.

## Local File

For local files:

- Verify the path exists and is readable.
- Capture filename, file extension, size, MIME/type when available, and SHA-256.
- Scan for secrets, credentials, and sensitive personal data before upload.
- Create a source record in the registry.
- Upload the file as an attachment to the source record.
- Extract knowledge from the local content, not from the attachment URL.
- Queue extracted claims with locators such as page, section, heading, row, or
  file path when available.

Do not upload a file when it appears unsafe to store. Stop and report the safety
concern.

## URL

For URLs:

- Record canonical URL, title when available, retrieval time, and access notes.
- Extract directly from retrieved content.
- Do not upload a copy unless the user explicitly requests archival and the
  content is safe to store.
- Include section headings, anchors, or quoted identifiers as locators when
  available.

If the URL cannot be accessed, stop and ask for a reachable source or local
file.

## External Confluence Page

For Confluence pages outside the knowledge-store tree:

- Read the page through Confluence MCP.
- Record page title, URL, page ID, space, version/history information when
  available, and retrieval time.
- Do not upload a copy of the page.
- Extract from the current page content and cite page IDs or headings as
  locators.

If the page is already inside the knowledge-store tree, treat the request as a
curation or canonical update task rather than source ingestion.

## Repository Checkout

For Emmy repository sources:

- Resolve the repository to a local checkout.
- Record repo identifier, origin remote URL, current branch, HEAD commit SHA,
  and clean/dirty status.
- Extract from local files in the checkout.
- Do not upload repository files and do not treat a `github.com` link as the
  lookup source.
- Include relative paths plus line ranges or symbols for every claim.
- Mark applicability using `branch-applicability.md`.

If a matching local checkout cannot be found, ask the user for a local checkout
path. Do not fall back to GitHub web pages as the source of truth.
