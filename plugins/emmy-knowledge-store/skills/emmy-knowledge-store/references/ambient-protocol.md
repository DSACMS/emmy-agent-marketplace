# Ambient Protocol

The knowledge store should improve normal Emmy work without turning every task
into a documentation project. Use this protocol when deciding whether to read,
capture, queue, or publish knowledge.

## Decision Matrix

| Situation                                                                                      | Default action                                            | Notes                                                    |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| The task depends on Emmy product, architecture, ATO, runbook, onboarding, or decision context. | Consult the store.                                        | Start from the entry page unless a better page is known. |
| The task is local-only and does not need Emmy context.                                         | Do not consult.                                           | Avoid unnecessary MCP calls.                             |
| Confluence contradicts memory, copied notes, or local scratch docs.                            | Prefer current Confluence, then cite it.                  | Flag conflicts when they matter.                         |
| The task produced a verified, reusable finding.                                                | Prepare a capture candidate.                              | Include evidence, scope, and date verified.              |
| The user asked to capture or persist knowledge but did not name a canonical page.              | Create or update a queue candidate if authorized.         | Use the Agent Capture Queue pattern.                     |
| The user asked for a specific canonical page update.                                           | Update narrowly after the write-safety checks.            | Re-read, inspect history/diff, then write.               |
| Confidence is low or the knowledge is contested.                                               | Queue with `needs-review` or propose in the final answer. | Do not make it canonical yet.                            |

## Durable Knowledge

Capture knowledge only when another developer or agent is likely to reuse it.
Good candidates include:

- Verified team decisions and the reason they matter.
- Stable runbook steps or operational procedures.
- Current architecture, ATO, or system-boundary facts with source evidence.
- Troubleshooting symptoms, root causes, fixes, and validation steps.
- Canonical URLs for repos, dashboards, diagrams, documents, or Confluence
  pages.
- Resolved ambiguity that would otherwise require repeated investigation.

Do not capture:

- Secrets, tokens, personal credentials, or private user data.
- Speculation, guesses, or conclusions without evidence.
- Transient chat notes, scratch commands, or one-off local paths.
- Large copied logs unless the user explicitly asks to attach them and they are
  free of sensitive data.

## Final Answer Behavior

When you used the store, cite the page title and URL or page ID. When you found
durable knowledge but did not have permission to write, include a short
"Knowledge capture candidate" section with the proposed title, summary,
evidence, labels, and whether it should go to the queue or a canonical page.
