# Fleet Agent Protocol

Use this when a developer may have multiple agents running at once, or when
several developers could be updating the knowledge store concurrently.

## Agent Roles

- **Task agent**: reads broadly, applies current knowledge to the task, and
  proposes captures at the end.
- **Capture agent**: creates one queue page per durable candidate when the user
  authorizes persistence.
- **Curator agent**: reviews queue entries, dedupes them, and promotes verified
  knowledge into canonical pages.

A single agent can play more than one role, but it must still follow the write
gates for each role.

## Queue Pattern

Use an `Agent Capture Queue` child page area under the knowledge-store entry
page. If the queue does not exist, inspect the entry page children first. Create
the queue only when the user has explicitly authorized persistence.

Each capture candidate gets its own page. Do not have many agents append to the
same shared page. Use a unique title:

```text
YYYY-MM-DD - short-topic - agent-or-task-id
```

Use the local date for `YYYY-MM-DD`. For `agent-or-task-id`, prefer a branch,
issue, PR, ticket, thread, or task identifier. If none exists, use a short
non-secret suffix such as `agent-note-001`.

## Concurrent Write Rules

Before updating any existing page:

1. Read the page at the start of the task.
2. Immediately before writing, read the page again.
3. Inspect page history and, when available, the diff since the first read.
4. If the page changed, merge only when the change is clearly independent.
5. If the change overlaps, stop and report the conflict instead of overwriting.

Canonical pages should stay stable. If two agents discover similar knowledge,
each should create a separate queue candidate and let a curator merge them.

## Curator Workflow

1. Search the queue for related candidates.
2. Read the target canonical page, history, and recent diff.
3. Deduplicate candidates and preserve their evidence links.
4. Promote only verified, non-secret, reusable knowledge.
5. Add labels and related-page links.
6. Re-read the updated canonical page and report the final URL plus any queue
   candidates that remain unresolved.
