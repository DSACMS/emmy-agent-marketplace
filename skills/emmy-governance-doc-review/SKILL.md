---
name: emmy-governance-doc-review
description: >-
  Review and assess Emmy governance documents from Confluence pages, pasted
  text, or local Markdown. Use when asked to read, assess, critique, grade,
  approval-check, or recommend revisions for an Emmy governance document,
  including ATO, open source, release, state communication, or internal
  governance artifacts.
---

# Emmy Governance Doc Review

Use this skill to assess whether an Emmy governance document is clear,
auditable, approval-ready, and aligned with the SFIV governance document
standard.

This workflow is read-only. Do not create, update, label, comment on, or move
Confluence pages. Do not use Jira tools from this workflow.

## Source Of Truth

- Governance parent page: `1398349788`
- Governance parent title: `Governance`
- Governance parent URL:
  `https://confluenceent.cms.gov/spaces/SFIV/pages/1398349788/Governance`
- Confluence space: `SFIV`
- Registry label: `governance`
- MCP server: `cms-atlassian-confluence`
- Required user environment variable: `CONFLUENCE_PERSONAL_TOKEN`

## Reference Routing

Read `references/governance-doc-rubric.md` before reviewing a document. It
contains the approval-readiness rubric, fatal flaws, and narrative memo shape.

## Supported Inputs

Accept these source forms:

- A Confluence page ID, URL, or exact page title.
- Pasted governance document text.
- A local Markdown file named by the user.

For Confluence sources, read the page with metadata and markdown content. Also
read labels when the source is a Confluence page so the memo can note whether
the page participates in the `governance` registry.

## Review Workflow

1. Identify the source and record provenance:
   - page title, page ID, URL, space, version, and labels for Confluence pages;
   - filename and date reviewed for local files;
   - `human-provided text` for pasted content.
2. Confirm whether the document appears to be an Emmy governance document:
   - under the `Governance` parent page, labeled `governance`, or clearly using
     the governance document structure.
3. Apply the rubric in `references/governance-doc-rubric.md`.
4. Distinguish approval blockers from ordinary improvements.
5. Return a narrative memo. Do not return a numeric score unless the user
   explicitly asks for one.

## Output Format

Use this memo structure:

```markdown
## Overall Assessment

[One to three paragraphs.]

## Approval Readiness

[Ready / Not ready / Cannot determine, with concise rationale.]

## Blockers Or Fatal Flaws

[Approval blockers, or "None identified."]

## Section Findings

[Purpose, scope, requirement basis, implementation, roles, tools, metadata,
evidence, maintainability.]

## Recommended Revisions

[Concrete edits or missing facts needed.]

## Unresolved Questions

[Questions for the document owner, or "None."]
```

## Review Rules

- Treat placeholder text as unfinished content, not as an acceptable draft.
- Flag aspirational language when the document should describe current Emmy
  reality.
- Prefer role titles over personal names in ownership fields.
- Approver must be one role, not a team, and must be distinct from Driver.
- Requirement Basis must include the external authority when one exists.
- Scope must include both `Applies To` and `Does Not Apply To`.
- Do not infer approval from status alone; look for approval date, approver,
  page history notes, or explicit source evidence.
- If a document is outside the `Governance` tree or lacks the `governance`
  label, note the registry/auditability gap without failing unrelated content.
