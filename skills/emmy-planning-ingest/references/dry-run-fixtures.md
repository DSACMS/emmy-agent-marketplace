# Planning Ingest Dry-Run Fixtures

Use these fixtures to compare draft-only behavior without writing to Confluence.

## Fixture 1: Pasted Principle Text

Source:

```text
Principle: Keep applicant burden low.
Status: Active
Owner: Emmy Team
Grounded in: FFS program direction and user research.
Statement: Emmy should ask applicants for only the information needed to
complete eligibility verification. When a workflow can use verified data that
already exists, it should avoid making the applicant repeat that work.
Evaluation criteria:
- Does this work remove or reduce applicant data entry?
- Does this work avoid asking for information that can be verified elsewhere?
Known tensions:
- Fraud prevention and audit evidence may require some additional questions.
```

Expected `PrincipleDraft` shape:

```json
{
  "id": "PRIN-###",
  "name": "Keep applicant burden low",
  "status": "Active",
  "owner": "Emmy Team",
  "grounded_in": "FFS program direction and user research",
  "last_reviewed": "YYYY-MM-DD",
  "principle_statement": "Emmy should ask applicants for only the information needed to complete eligibility verification. When a workflow can use verified data that already exists, it should avoid making the applicant repeat that work.",
  "why_this_matters": "-",
  "practice_implications": [],
  "evaluation_criteria": [
    "Does this work remove or reduce applicant data entry?",
    "Does this work avoid asking for information that can be verified elsewhere?"
  ],
  "known_tensions": [
    "Fraud prevention and audit evidence may require some additional questions."
  ],
  "related_sources": ["human-provided text"]
}
```

Expected warning:

```json
{
  "code": "MISSING_WHY_THIS_MATTERS",
  "message": "Source did not provide strategic context; draft only until human confirms."
}
```

## Fixture 2: Local Goal File Text

Pretend this content came from `nsc-goal.md`; do not persist the absolute local
path.

```text
# NSC Data Integration Goal

Status: Active
Owner: Emmy Team
Horizon: Q3 2026

Goal Statement:
Emmy can use NSC-provided data to reduce manual verification work while keeping
eligibility decisions auditable.

Why This Matters:
The team needs a reliable path to incorporate external data without weakening
ATO evidence, auditability, or user trust.

Outcomes:
- GOAL-###-O1: NSC data fields needed for Emmy eligibility workflows are mapped
  to current Emmy concepts.
  Success criteria: The mapping is reviewed by product and engineering and
  linked from the goal page.
  Status: Not Started
- GOAL-###-O2: Open ATO questions for NSC data ingestion are documented.
  Success criteria: Security review questions are listed with owners or next
  review steps.
  Status: Not Started

Open blockers:
- Confirm whether NSC data can be stored in the existing boundary.

Knowledge Store Links:
- Emmy ATO boundary notes
```

Expected `GoalDraft` shape:

```json
{
  "id": "GOAL-###",
  "name": "NSC Data Integration Goal",
  "statement": "Emmy can use NSC-provided data to reduce manual verification work while keeping eligibility decisions auditable.",
  "status": "Active",
  "owner": "Emmy Team",
  "horizon": "Q3 2026",
  "last_reviewed": "YYYY-MM-DD",
  "why_this_matters": "The team needs a reliable path to incorporate external data without weakening ATO evidence, auditability, or user trust.",
  "outcomes": [
    {
      "id": "GOAL-###-O1",
      "statement": "NSC data fields needed for Emmy eligibility workflows are mapped to current Emmy concepts.",
      "success_criteria": "The mapping is reviewed by product and engineering and linked from the goal page.",
      "status": "Not Started",
      "jira_epic": null
    },
    {
      "id": "GOAL-###-O2",
      "statement": "Open ATO questions for NSC data ingestion are documented.",
      "success_criteria": "Security review questions are listed with owners or next review steps.",
      "status": "Not Started",
      "jira_epic": null
    }
  ],
  "open_blockers": [
    "Confirm whether NSC data can be stored in the existing boundary."
  ],
  "knowledge_store_links": ["Emmy ATO boundary notes"]
}
```

## Duplicate Warning Example

If an existing Outcomes Index row already says
`Open ATO questions for NSC data ingestion are documented`, pause with:

```json
{
  "code": "POSSIBLE_DUPLICATE_OUTCOME",
  "existing_outcome_id": "GOAL-002-O3",
  "draft_outcome_id": "GOAL-###-O2",
  "message": "Draft outcome appears to overlap an existing outcome. Ask whether to reuse, update, or create a new outcome."
}
```

## Expected Review Packet Shape

```markdown
## Planning Ingest Review

Source provenance:

- human-provided text, reviewed YYYY-MM-DD
- nsc-goal.md, Markdown, reviewed YYYY-MM-DD

Proposed creates:

- PRIN-###: Keep applicant burden low
- GOAL-###: NSC Data Integration Goal

Index updates:

- Add PRIN-### to Strategic Principles Active Principles table
- Add GOAL-### to Goals Registry Active Goals table
- Add GOAL-###-O1 and GOAL-###-O2 to Outcomes Index

Warnings:

- MISSING_WHY_THIS_MATTERS for PRIN-###
- POSSIBLE_DUPLICATE_OUTCOME for GOAL-###-O2

Pages to write after approval:

- 1398768358 Strategic Principles
- 1398342919 Goals Registry
- 1399162264 Outcomes Index
- 1398768357 Planning Log
```
