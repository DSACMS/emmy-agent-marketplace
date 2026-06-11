# Source Provenance Template

Use these templates for source records and extracted knowledge entries. Adapt
headings to the existing Confluence page style, but keep the required fields.

## Source Record

```markdown
# YYYY-MM-DD - source-title - source-id

**Source type:** local-file | url | confluence-page | repository

**Source identifier:** [Stable name for the source.]

**Date ingested:** YYYY-MM-DD

**Ingested by:** [Agent/user/thread if known.]

**Access notes:** [How the source was read and any limits.]

**Safety review:** [No secrets found | needs human review | not uploaded.]

**Generated knowledge entries:**

- [Queue or canonical page title and URL/page ID]
```

## Local File Fields

```text
Original filename: [filename]
File metadata: [extension, size, MIME/type when available]
SHA-256: [checksum]
Attachment: [Confluence attachment link or page attachment reference]
```

## URL Fields

```text
Canonical URL: [URL]
Title: [title if available]
Retrieved at: YYYY-MM-DD HH:MM timezone
```

## External Confluence Fields

```text
Confluence page: [title and URL]
Page ID: [page ID]
Space: [space key]
Version/history: [version or history note when available]
Retrieved at: YYYY-MM-DD HH:MM timezone
```

## Repository Fields

```text
Repository: owner/name
Remote URL: [origin URL]
Local checkout used: [report in final output; omit from portable canonical claims unless needed]
Branch: [branch name]
Commit: [HEAD SHA]
Worktree state: clean | dirty
```

## Extracted Knowledge Queue Entry

```markdown
# YYYY-MM-DD - extracted-topic - source-id

**Status:** needs-review

**Proposed destination:** [Canonical page title/URL, or unknown]

**Summary:** [One or two sentences.]

**Applies to:** [Environment, repo, branch, workflow, ATO area, or system
boundary.]

**Source record:** [Source record URL or page ID]

**Source locator:** [File/page/section/heading/line range/symbol/URL anchor]

**Extracted claim(s):**

- [Claim with evidence locator.]

**Confidence:** high | medium | low

**Applicability:** [Mainline-observed, branch-scoped, local-observation, or
URL/page current as of retrieval.]

**Suggested labels:** emmy, agent-knowledge, needs-review, [source/type labels]

**Open questions:** [What a curator must verify.]
```

Every claim must be traceable to a source record and a source locator.
