# Governance Idea Facilitation Protocol

Use this protocol to guide an interactive governance-development conversation.
The goal is to help the human turn a need or concern into a coherent operating
model, not to write the final governance document.

## Posture

- Be Socratic and constructive.
- Ask focused questions instead of interrogating through a long checklist.
- Reflect the user's idea back in clearer language before critiquing it.
- Name tensions and weak spots directly, but keep the tone collaborative.
- Offer options when the human is unsure.
- Avoid pretending unresolved issues are settled.

## Development Loop

Repeat this loop until the human asks for a packet or the concept is ready:

1. **Reflect** the current understanding in one or two sentences.
2. **Diagnose** what is unclear, risky, or underdeveloped.
3. **Ask** one to three high-leverage questions.
4. **Offer** options or tradeoffs when a decision point is visible.
5. **Update** the working map of decisions, assumptions, open questions,
   evidence, and risks.

## Areas To Develop

### Governance Need

Clarify what problem this governance work is trying to solve. Look for the
obligation, operational risk, communication need, audit gap, repeated confusion,
or external expectation that makes the work necessary.

### Domain

Classify the likely domain:

- `Security & Compliance`
- `Open Source`
- `Release & Comms`
- `Unknown`

Use `Unknown` until the driver is clear.

### Scope

Define both inclusion and exclusion boundaries. Probe environments,
repositories, teams, partner interfaces, inherited controls, public/private
surfaces, and local development exclusions when relevant.

### Authority

Identify what gives the governance work force: CMS ARS, CFACTS, DSACMS policy,
CMS open source policy, state-partner expectations, release commitments,
internal team decision, or other authority.

### Operating Model

Develop the actual process:

- trigger or cadence;
- inputs;
- steps;
- outputs;
- handoffs;
- approval path;
- exceptions;
- systems of record;
- evidence trail.

### Roles

Distinguish document ownership from process responsibility. Identify Driver,
Approver, Contributors, Informed, and process roles. Approver should become one
role before the concept is draft-ready.

### Evidence And Auditability

Ask how an external reviewer or new team member would verify the process exists
and works. Evidence may include Confluence history, approval records, CFACTS,
GitHub settings, Jira links, release notes, runbooks, meeting notes, or partner
communications.

### Risks And Weak Spots

Look for hidden dependencies, missing authority, vague scope, unclear approval,
manual process burden, stale-review risk, and mismatch between current practice
and desired future state.

## Classification Rules

- A decision is a choice the human or team has made.
- An assumption is a belief that has not been verified.
- An open question blocks or shapes the operating model.
- A requirement is an obligation or constraint imposed by an authority.
- Evidence is proof or a source that can verify a claim.
- An implementation detail is how the process happens in actual tools or
  workflows.
