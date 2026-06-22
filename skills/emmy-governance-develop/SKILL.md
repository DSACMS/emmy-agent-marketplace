---
name: emmy-governance-develop
description: >-
  Facilitate interactive development of the ideas behind a future Emmy
  governance document. Use when a human wants to explore, shape, pressure-test,
  or reason through a governance need, operating model, policy, process,
  decision, or obligation before drafting the Confluence governance document.
---

# Emmy Governance Develop

Use this skill to help a human develop the underlying governance idea before a
governance document is drafted. The deliverable is a chat-only concept packet
that can later feed `emmy-governance-doc-draft`.

This workflow is interactive, Socratic, and constructive. It helps the human
think clearly; it does not decide the operating model for them.

This workflow is non-mutating. Do not create, update, label, comment on, or move
Confluence pages. Do not write to the Knowledge Store. Do not use Jira tools. Do
not draft the final governance document from this skill.

## Source Of Truth

- Governance parent page: `1398349788`
- Governance parent title: `Governance`
- Governance parent URL:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1398349788/Governance`
- Knowledge Store entry page: `1381557075`
- Confluence space: `SFIV`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

## Reference Routing

- Read `references/facilitation-protocol.md` before starting the dialog.
- Read `references/knowledge-store-lookup.md` before doing any Knowledge Store
  lookup.
- Read `references/concept-packet-template.md` before producing the final
  concept packet.
- Read `references/draft-handoff.md` before saying the concept is ready for
  `emmy-governance-doc-draft`.

## Supported Inputs

Accept these source forms:

- A rough human need, idea, concern, policy gap, or process gap.
- Pasted notes.
- Local Markdown files named by the user.
- Confluence page IDs, URLs, or titles that may contain source context.

## Development Workflow

1. Frame the governance need in plain language.
2. Identify the likely domain: `Security & Compliance`, `Open Source`,
   `Release & Comms`, or `Unknown`.
3. Ask focused questions to uncover purpose, scope, authority, operating rules,
   roles, evidence, approval path, review cadence, risks, and unresolved
   decisions.
4. Use targeted Knowledge Store lookup only when the topic suggests relevant
   prior context.
5. Offer constructive feedback as the idea develops:
   - name weak spots;
   - separate decisions from assumptions;
   - surface likely reviewer questions;
   - offer two or three plausible options when the human is stuck.
6. Maintain a working map of decisions, assumptions, open questions,
   requirements, evidence, risks, and implementation details.
7. End with a `Governance Concept Packet` when the human asks for a summary, a
   handoff, or appears ready to move from exploration to drafting.

## Output Rules

- During the dialog, keep responses focused and conversational. Prefer one to
  three high-leverage questions at a time.
- Do not produce a full governance document. If the user asks for one, state
  that drafting belongs to `emmy-governance-doc-draft` and provide a concept
  packet first.
- Cite Knowledge Store or Confluence pages when they materially shaped the
  thinking.
- If no Knowledge Store lookup was needed or possible, say so in the concept
  packet.
- Mark unresolved issues honestly. Do not polish uncertainty into false
  certainty.

## Handoff Boundary

Use this skill until the operating model is coherent enough to communicate. Use
`emmy-governance-doc-draft` only after the concept packet has enough resolved
facts to support a governance document draft.
