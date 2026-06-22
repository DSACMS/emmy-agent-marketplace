# Targeted Knowledge Store Lookup

Use targeted Knowledge Store lookup only when it is likely to improve the
governance-development dialog. Do not perform a broad store crawl by default.

## Lookup Signals

Consult the Knowledge Store when the idea involves:

- ATO, CFACTS, CMS ARS, CSRAP, ISSO, System Owner, or security controls.
- Emmy architecture, repositories, deployment, runtime operations, or inherited
  controls.
- Existing runbooks, onboarding guidance, troubleshooting history, or prior team
  decisions.
- Release governance, state-partner communications, open source obligations, or
  cross-team process.
- A claim that may conflict with memory, local notes, or current Confluence.

Skip lookup when the user is brainstorming a lightweight idea and no existing
Emmy context is likely to matter.

## Read Path

Prefer the smallest useful read:

1. Search for the topic using `confluence_search` in `SFIV`.
2. If the search points into the Emmy Agent Knowledge Store, read only the
   relevant page or pages.
3. If broad routing is needed, start from Knowledge Store entry page
   `1381557075` and inspect likely child pages before reading deeply.
4. Cite page titles and URLs or page IDs when findings shape the concept.

## How To Use Findings

Use Knowledge Store findings to:

- identify existing decisions or source pages;
- prevent duplicate governance concepts;
- flag stale or conflicting assumptions;
- name evidence sources;
- suggest stakeholders or approvers;
- ground the operating model in current Emmy practice.

Do not treat Knowledge Store content as automatically current. If a fact is
dated, stale, or source-limited, surface that caveat in the concept packet.

## Write Boundary

This skill is read-only. Do not capture, queue, update, comment on, or label
Knowledge Store pages. If the conversation produces durable knowledge, mention a
possible capture candidate, but do not persist it from this skill.
