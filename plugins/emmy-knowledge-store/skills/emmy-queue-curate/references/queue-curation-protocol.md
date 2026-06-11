# Queue Curation Protocol

Use this protocol when interactively processing the Emmy Knowledge Ingestion
Queue with a human reviewer.

## Entry Selection

1. Read the Emmy Agent Knowledge Store entry page.
2. Read `Knowledge Ingestion Queue` and inspect its child pages.
3. Select the first queue-index row whose status is `needs-review`, unless the
   human named a specific page, topic, source record, or page ID.
4. Read the selected queue entry and its source record.
5. If the proposed destination is clear, read that destination page before
   drafting canonical text. If it is unclear, ask the human to pick a
   destination before any write.

The review unit is one queue entry. Do not batch-promote multiple entries in a
single approval unless the human explicitly names every page and destination.

## Review Packet

Show the human a compact packet before asking for a decision:

- Queue entry title and URL or page ID.
- Status.
- Proposed destination.
- Summary.
- Applies-to scope.
- Source record.
- Source locator.
- Confidence and applicability.
- Extracted claims.
- Open questions.

Ask whether the entry is true enough to ingest. Prefer a concise question such
as: "Is this true enough to promote, or should we correct, defer, reject, or
discuss it?"

## Hybrid Review

Use whole-entry review first. Drill into individual claims only when one of
these happens:

- The human says part of the entry is wrong or incomplete.
- The human is unsure about one claim but comfortable with others.
- The open questions block names specific facts that require confirmation.
- The destination page already contains overlapping or conflicting knowledge.

When drilling in, keep the loop small: ask about the next unresolved claim,
summarize the answer, and continue until the entry is either promotable or
paused.

## Human Responses

Treat responses this way:

| Human response                                        | V1 behavior                                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Confirms the entry                                    | Draft canonical text and ask for explicit final approval before writing.                                 |
| Provides a correction                                 | Update the draft in chat and preserve provenance. Ask follow-up questions only for unresolved ambiguity. |
| Provides new evidence                                 | Incorporate it as additional evidence only if it is safe and traceable.                                  |
| Says "I don't know"                                   | Stop processing the entry without Confluence writes.                                                     |
| Says "ask someone else"                               | Stop processing the entry without Confluence writes.                                                     |
| Says "needs discussion"                               | Stop processing the entry without Confluence writes.                                                     |
| Says it is duplicate, rejected, or should be deferred | Do not promote. In v1, ask for explicit authorization before any non-promotion status write.             |

Human clarification may validate a claim, but it is not automatically source
provenance. If a human supplies a new fact that is not in the queue source, keep
it out of canonical text unless it is backed by a source link, repository
locator, page citation, ticket, PR, or an explicit authoritative human override.

## Write Gate

No Confluence writes are allowed until the human gives explicit final approval
for the selected entry. "Looks good" is enough only when it clearly follows a
final draft and the agent has asked whether to write it.

Before writing:

1. Re-read `emmy-knowledge-store/references/write-safety.md`.
2. Re-read the canonical destination, queue entry, and queue index.
3. Inspect history or diff for the canonical destination and any updated queue
   page.
4. Stop on overlapping edits or changed assumptions.
5. Re-check the draft for secrets, credentials, private user data, speculation,
   local scratch paths, and unsupported claims.

## Promotion Write

After final approval:

1. Update the canonical destination narrowly. Preserve existing structure and
   add the queue entry and source record as provenance.
2. Update the queue entry `Status` field to `promoted`.
3. Update the queue index row status to `promoted`.
4. Do not rely on removing the `needs-review` label; the current MCP allowlist
   can add labels but does not remove labels.
5. Re-read or diff changed pages and report the canonical page, queue entry, and
   queue index URLs or page IDs.

## V1 Status Boundary

V1 live processing actively promotes only from `needs-review` to `promoted`. The
agent may recognize `duplicate`, `deferred`, and `rejected` as human decisions,
but should not write those statuses unless explicitly authorized for that entry.

The following statuses are reserved for a future collaborative workflow and must
not be written by v1:

- `needs-discussion`
- `needs-teammate-review`
- `answered-by-teammate`

Future collaboration may use Confluence comments, assignee-style mentions, a
separate discussion queue, or teammate review artifacts. This protocol reserves
those concepts without implementing them.
