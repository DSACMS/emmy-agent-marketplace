# Search And Labels

Use this when the user asks broad Emmy context questions, when search terms are
unclear, or when labeling pages.

## Search Strategy

1. Start from the Emmy Agent Knowledge Store entry page and inspect children.
2. Search exact terms from the user's request.
3. Search synonyms, abbreviations, repo names, service names, and ATO/control
   terms when exact search is thin.
4. Prefer CQL scoped to the `SFIV` space when the tool supports it.
5. Read candidate pages before relying on them. Do not answer from search
   snippets alone.
6. Check page history or diff when currentness matters.
7. Cite page titles and URLs or page IDs in the final answer when the store
   materially shaped the result.

Useful read tools include `confluence_search`, `confluence_get_page`,
`confluence_get_page_children`, `confluence_get_page_history`, and
`confluence_get_page_diff`.

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
