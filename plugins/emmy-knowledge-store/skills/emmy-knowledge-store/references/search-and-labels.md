# Search And Labels

Use this when the user asks broad Emmy context questions, when search terms are
unclear, or when labeling pages.

## Search Strategy

1. Start from the Emmy Agent Knowledge Store entry page and inspect current
   children without assuming a fixed page list.
2. Build a lightweight tree map: page title, page ID, URL, parent, labels when
   needed, and whether the page has children.
3. Read likely index pages and category pages before reading large canonical
   pages. Recurse into children when a page title or body indicates a queue,
   registry, source collection, topic category, archive, or canonical area.
4. Search exact terms from the user's request.
5. Search synonyms, abbreviations, repo names, service names, and ATO/control
   terms when exact search is thin.
6. Prefer CQL scoped to the `SFIV` space when the tool supports it.
7. Read candidate pages before relying on them. Do not answer from search
   snippets alone.
8. Check page history or diff when currentness matters.
9. Cite page titles and URLs or page IDs in the final answer when the store
   materially shaped the result.

Useful read tools include `confluence_search`, `confluence_get_page`,
`confluence_get_page_children`, `confluence_get_page_history`, and
`confluence_get_page_diff`.

## Hierarchy Heuristics

Use child pages for durable information architecture and labels for
cross-cutting facets.

Prefer reading by hierarchy when the user names a broad area, source registry,
queue, runbook family, artifact collection, or canonical topic. Prefer search
when the user names an exact phrase, service, repository, control, incident
symptom, or decision that could appear across several areas.

Do not add a new hard-coded page title to the skill when a child page is added.
If an old known title or ID is missing, rediscover the page from the entry
children, nearby index pages, labels, and scoped search before assuming the
store is broken.

## Label Conventions

Use lowercase kebab-case labels. Recommended base labels:

- `emmy`
- `agent-knowledge`

Add one or more type labels when accurate:

- `decision`
- `runbook`
- `architecture`
- `ato`
- `troubleshooting`
- `onboarding`
- `needs-review`

Only add labels to pages you have read and are otherwise authorized to modify.
Do not create labels that reveal secrets, account identifiers, personal data, or
private incident details.
