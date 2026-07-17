# ProposalOS — Canonical Data Models

This document defines the canonical, versioned JSON data models used by ProposalOS. Every stage of the reasoning pipeline communicates using these contracts. This document is the canonical source of truth for schema fields, semantics, required/optional fields, and validation rules.

General rules (applies to all models)

- Every object MUST contain these top-level fields:
  - id: UUID string (v4) — unique identifier for the object.
  - schema_version: semantic version string (e.g., "1.0.0").
  - created_at: ISO 8601 timestamp (UTC preferred).
  - source_stage: string — canonical stage name that created this object (e.g., "JobDescription", "Facts").

- Every confidence-based conclusion MUST include these fields:
  - confidence: number between 0.0 and 1.0.
  - reasoning: short structured explanation (string) or object describing why the confidence value was chosen.
  - supporting_fact_ids: array of UUIDs referencing Fact objects that substantiate the conclusion.

- Later stages MUST reference earlier stage objects by id rather than duplicating their contents. For example, Inference objects reference fact ids; Strategy references BusinessAnalysis/TechnicalAnalysis/RiskAnalysis ids; Proposal references Narrative/Strategy/Analysis ids, but must NOT contain the original JobDescription.

- All IDs MUST be UUID strings.
- All timestamps MUST use ISO 8601 format (e.g., "2026-07-17T15:00:00Z").
- Arrays SHOULD contain typed objects rather than plain strings where possible.
- Use explicit field names and avoid ambiguous nesting.


Model 1 — JobDescription

Purpose
- Canonical representation of the original job posting or brief. This is the earliest artifact in the pipeline and may include raw text, metadata, and references.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "JobDescription",
  "source": {
    "id": "optional string e.g. posting id",
    "url": "optional URL string",
    "posted_at": "optional ISO8601"
  },
  "title": "string",
  "company": {
    "name": "string",
    "id": "optional string"
  },
  "location": {
    "type": "enum: [remote, onsite, hybrid, unspecified]",
    "value": "optional string"
  },
  "raw_text": "string",
  "sections": [
    {
      "name": "string",
      "text": "string"
    }
  ],
  "metadata": { /* freeform key/value for parsed tags */ }
}

Field descriptions
- id: UUID identifier for this JobDescription object.
- schema_version: model version.
- created_at: creation timestamp.
- source_stage: "JobDescription".
- source: optional provenance fields about where the job came from.
- title: canonical title extracted from posting.
- company: object containing company name and optional external id.
- location: normalized location descriptor.
- raw_text: full raw job posting text (trusted source). This is allowed here because this is the canonical input stage.
- sections: array of extracted sections (responsibilities, requirements, benefits, etc.).
- metadata: small JSON object of tags or attributes (keywords, detected technologies).

Required fields
- id, schema_version, created_at, source_stage, title, company.name, raw_text

Optional fields
- source.*, location.value, sections, metadata

Example JSON

{
  "id": "b3f1f6e9-5c2a-4a8b-9e3c-1f2a9d2a4b3c",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:10:00Z",
  "source_stage": "JobDescription",
  "source": { "url": "https://boards.example.com/job/12345" },
  "title": "Senior Backend Engineer",
  "company": { "name": "ExampleCorp" },
  "location": { "type": "remote" },
  "raw_text": "We are hiring a Senior Backend Engineer to...",
  "sections": [ { "name": "Responsibilities", "text": "Design APIs..." } ],
  "metadata": { "keywords": ["python", "api"] }
}

Validation rules
- id: must be valid UUID string.
- schema_version: must follow semver (x.y.z).
- created_at: must be valid ISO 8601 timestamp.
- raw_text: non-empty string.
- title and company.name: non-empty strings.


Model 2 — Facts

Purpose
- Normalized, verifiable statements extracted from JobDescription and external references. Each fact is atomic, has provenance, and a basic confidence score.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "Facts",
  "job_description_id": "uuid (references JobDescription.id)",
  "facts": [
    {
      "id": "uuid",
      "subject": "string",
      "predicate": "string",
      "object": "string|object",
      "provenance": [ { "source": "string", "url": "optional" } ],
      "confidence": 0.0-1.0
    }
  ]
}

Field descriptions
- job_description_id: reference to the originating JobDescription.
- facts: array of fact records. Each fact contains an id and a simple triple (subject, predicate, object) with provenance and confidence.

Required fields
- id, schema_version, created_at, source_stage, job_description_id, facts (non-empty), each fact.id and fact.predicate and fact.object

Optional fields
- fact.subject (when implicit), provenance.url

Example JSON

{
  "id": "c1a2b3d4-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:11:00Z",
  "source_stage": "Facts",
  "job_description_id": "b3f1f6e9-5c2a-4a8b-9e3c-1f2a9d2a4b3c",
  "facts": [
    {
      "id": "f1e2d3c4-...",
      "subject": "ExampleCorp",
      "predicate": "requires_skill",
      "object": "Python",
      "provenance": [ { "source": "raw_text" } ],
      "confidence": 0.98
    }
  ]
}

Validation rules
- job_description_id: must reference an existing JobDescription id when available.
- Each fact.id: UUID.
- confidence: number between 0.0 and 1.0.
- provenance: at least one provenance entry per fact.


Model 3 — Inference

Purpose
- Structured, labeled conclusions derived from Facts. Inferences are always provenance-linked and carry confidence and reasoning.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "Inference",
  "job_description_id": "uuid",
  "inferences": [
    {
      "id": "uuid",
      "type": "string (ontology label)",
      "claim": "string",
      "confidence": 0.0-1.0,
      "reasoning": "string or object",
      "supporting_fact_ids": ["uuid"],
      "tags": ["string"]
    }
  ]
}

Field descriptions
- type: high-level classification (e.g., "timeline_inference", "implicit_requirement").
- claim: concise statement of the inference.
- supporting_fact_ids: list of Fact ids used to derive the inference.

Required fields
- id, schema_version, created_at, source_stage, job_description_id, inferences (non-empty), each inference.id, claim, confidence, reasoning, supporting_fact_ids

Optional fields
- tags

Example JSON

{
  "id": "i9e8d7c6-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:12:00Z",
  "source_stage": "Inference",
  "job_description_id": "b3f1f6e9-...",
  "inferences": [
    {
      "id": "inf-1111-...",
      "type": "timeline_inference",
      "claim": "Likely 3-month delivery timeline expected",
      "confidence": 0.72,
      "reasoning": "Job mentions immediate start and short-term project milestones",
      "supporting_fact_ids": ["f1e2d3c4-..."],
      "tags": ["schedule"]
    }
  ]
}

Validation rules
- Each inference.supporting_fact_ids must reference Fact ids present in a Facts object for the same job_description_id.
- confidence and reasoning required.


Model 4 — Unknowns

Purpose
- Enumerates prioritized information gaps that must be resolved to reduce risk and improve analysis.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "Unknowns",
  "job_description_id": "uuid",
  "unknowns": [
    {
      "id": "uuid",
      "question": "string",
      "impact_score": 0.0-1.0,
      "priority": "enum: [low, medium, high]",
      "related_fact_ids": ["uuid"],
      "recommended_action": { "type": "string", "details": "string" }
    }
  ]
}

Field descriptions
- question: concise description of the missing information.
- impact_score: numeric estimate of how much this unknown affects decisions.
- related_fact_ids: optional references to Facts that highlight the gap.
- recommended_action: suggested discovery step (e.g., "ask client", "request logs").

Required fields
- id, schema_version, created_at, source_stage, job_description_id, unknowns (non-empty), each unknown.id and question and priority

Optional fields
- impact_score (default 0.5), related_fact_ids, recommended_action.details

Example JSON

{
  "id": "u-2222-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:13:00Z",
  "source_stage": "Unknowns",
  "job_description_id": "b3f1f6e9-...",
  "unknowns": [
    {
      "id": "unk-1-...",
      "question": "Is there an existing CI/CD pipeline?",
      "impact_score": 0.85,
      "priority": "high",
      "related_fact_ids": ["f1e2d3c4-..."],
      "recommended_action": { "type": "ask_client", "details": "Request infra diagram or repo access" }
    }
  ]
}

Validation rules
- priority must be one of the allowed enum values.
- related_fact_ids must reference Facts for the same job_description_id if present.


Model 5 — BusinessAnalysis

Purpose
- Capture business-aligned interpretations: prioritized goals, success metrics, stakeholders, and constraints.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "BusinessAnalysis",
  "job_description_id": "uuid",
  "goals": [ { "id": "uuid", "description": "string", "priority": "string", "supporting_inference_ids": ["uuid"] } ],
  "stakeholders": [ { "id": "uuid", "role": "string", "concerns": ["string"] } ],
  "success_metrics": [ { "id": "uuid", "name": "string", "target": "string", "supporting_fact_ids": ["uuid"] } ],
  "constraints": [ { "id": "uuid", "type": "string", "description": "string", "supporting_fact_ids": ["uuid"] } ],
  "confidence": 0.0-1.0,
  "reasoning": "string",
  "supporting_fact_ids": ["uuid"]
}

Field descriptions
- goals: prioritized business objectives with links to inference ids that justify them.
- stakeholders: named roles and their primary concerns.
- success_metrics: measurable criteria for success and their targets.
- constraints: business constraints (budget limits, time windows).
- top-level confidence/reasoning/supporting_fact_ids: overall business analysis confidence and provenance.

Required fields
- id, schema_version, created_at, source_stage, job_description_id, goals (may be empty but recommended), confidence, reasoning, supporting_fact_ids

Optional fields
- stakeholders, success_metrics, constraints

Example JSON

{
  "id": "ba-3333-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:14:00Z",
  "source_stage": "BusinessAnalysis",
  "job_description_id": "b3f1f6e9-...",
  "goals": [ { "id": "g1-...", "description": "Deliver MVP in 3 months", "priority": "high", "supporting_inference_ids": ["inf-1111-..."] } ],
  "stakeholders": [ { "id": "s1-...", "role": "Hiring Manager", "concerns": ["speed", "cost"] } ],
  "success_metrics": [ { "id": "m1-...", "name": "time_to_mvp", "target": "3 months", "supporting_fact_ids": ["f1e2d3c4-..."] } ],
  "constraints": [ { "id": "c1-...", "type": "budget", "description": "Project budget under $100k", "supporting_fact_ids": [] } ],
  "confidence": 0.7,
  "reasoning": "Based on inferences about immediate timelines and company stage",
  "supporting_fact_ids": ["f1e2d3c4-..."]
}

Validation rules
- Each supporting_inference_ids must reference Inference ids for the same job_description_id.
- confidence present and between 0.0 and 1.0.


Model 6 — TechnicalAnalysis

Purpose
- Structured assessment of technical feasibility, architectures, dependencies, rough effort estimates, and constraints.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "TechnicalAnalysis",
  "job_description_id": "uuid",
  "architecture_options": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "feasibility_score": 0.0-1.0,
      "estimated_effort": { "story_points": "number", "person_months": "number" },
      "dependencies": [ { "id": "uuid", "type": "string", "description": "string" } ],
      "supporting_fact_ids": ["uuid"]
    }
  ],
  "preferred_option_id": "uuid (refers to one of the architecture_options)",
  "constraints": [ { "id": "uuid", "description": "string", "supporting_fact_ids": ["uuid"] } ],
  "confidence": 0.0-1.0,
  "reasoning": "string",
  "supporting_fact_ids": ["uuid"]
}

Field descriptions
- architecture_options: typed options with feasibility and effort estimates.
- preferred_option_id: points to the chosen architecture option id.
- dependencies: external systems or libraries required.

Required fields
- id, schema_version, created_at, source_stage, job_description_id, architecture_options (can be empty but recommended), confidence, reasoning, supporting_fact_ids

Optional fields
- estimated_effort fields, constraints

Example JSON

{
  "id": "ta-4444-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:15:00Z",
  "source_stage": "TechnicalAnalysis",
  "job_description_id": "b3f1f6e9-...",
  "architecture_options": [
    {
      "id": "opt-1-...",
      "name": "API-first microservice",
      "description": "Back-end microservice exposing REST APIs",
      "feasibility_score": 0.9,
      "estimated_effort": { "story_points": 200, "person_months": 4 },
      "dependencies": [ { "id": "dep-1-...", "type": "third_party_api", "description": "Analytics API" } ],
      "supporting_fact_ids": ["f1e2d3c4-..."]
    }
  ],
  "preferred_option_id": "opt-1-...",
  "constraints": [],
  "confidence": 0.8,
  "reasoning": "Matches company stack and timeline",
  "supporting_fact_ids": ["f1e2d3c4-..."]
}

Validation rules
- preferred_option_id, if present, must match an id in architecture_options.
- feasibility_score and confidence must be numbers between 0.0 and 1.0.


Model 7 — RiskAnalysis

Purpose
- Enumerate risks, quantify severity/likelihood, propose mitigations, and estimate residual risk.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "RiskAnalysis",
  "job_description_id": "uuid",
  "risks": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "severity": "enum: [low, medium, high]",
      "likelihood": 0.0-1.0,
      "mitigations": [ { "id": "uuid", "description": "string", "cost_estimate": "optional number" } ],
      "residual_risk_score": 0.0-1.0,
      "supporting_fact_ids": ["uuid"]
    }
  ],
  "overall_risk_score": 0.0-1.0,
  "confidence": 0.0-1.0,
  "reasoning": "string"
}

Field descriptions
- risks: array of discrete risk items with mitigation suggestions.
- residual_risk_score: likelihood*severity heuristic after mitigations.

Required fields
- id, schema_version, created_at, source_stage, job_description_id, risks (non-empty), overall_risk_score, confidence, reasoning

Optional fields
- mitigation cost_estimate

Example JSON

{
  "id": "ra-5555-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:16:00Z",
  "source_stage": "RiskAnalysis",
  "job_description_id": "b3f1f6e9-...",
  "risks": [
    {
      "id": "risk-1-...",
      "title": "Unknown infra maturity",
      "description": "No evidence of CI/CD or testing automation",
      "severity": "high",
      "likelihood": 0.7,
      "mitigations": [ { "id": "mit-1-...", "description": "Discovery sprint to audit infra" } ],
      "residual_risk_score": 0.3,
      "supporting_fact_ids": ["f1e2d3c4-..."]
    }
  ],
  "overall_risk_score": 0.65,
  "confidence": 0.75,
  "reasoning": "Risks inferred from missing infra facts and timeline pressure"
}

Validation rules
- severity must be one of the allowed enums.
- likelihood and residual_risk_score between 0.0 and 1.0.
- each mitigation must have an id and description.


Model 8 — Strategy

Purpose
- Prioritized plan of work (milestones, deliverables, timeline skeleton) that maps back to analyses and risks.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "Strategy",
  "job_description_id": "uuid",
  "milestones": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "due_weeks_from_start": "number",
      "deliverables": [ { "id": "uuid", "name": "string", "description": "string", "supporting_analysis_ids": ["uuid"] } ],
      "dependencies": ["uuid"],
      "priority": "enum: [low, medium, high]"
    }
  ],
  "success_criteria": [ { "id": "uuid", "metric_id": "uuid", "target": "string" } ],
  "rationale_map": [ { "id": "uuid", "source_analysis_id": "uuid", "notes": "string" } ],
  "confidence": 0.0-1.0,
  "reasoning": "string",
  "supporting_analysis_ids": ["uuid"]
}

Field descriptions
- milestones: sequenced work items with deliverables and dependencies.
- supporting_analysis_ids: references to BusinessAnalysis, TechnicalAnalysis, RiskAnalysis ids that justify the strategy.

Required fields
- id, schema_version, created_at, source_stage, job_description_id, milestones (can be empty but recommended), confidence, reasoning, supporting_analysis_ids

Optional fields
- dependencies and success_criteria

Example JSON

{
  "id": "st-6666-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:17:00Z",
  "source_stage": "Strategy",
  "job_description_id": "b3f1f6e9-...",
  "milestones": [
    {
      "id": "m-1-...",
      "title": "Discovery",
      "description": "Two-week discovery sprint to audit infra and clarify unknowns",
      "due_weeks_from_start": 2,
      "deliverables": [ { "id": "d1-...", "name": "Infra Audit", "description": "Report on CI/CD and dependencies", "supporting_analysis_ids": ["ta-4444-..."] } ],
      "dependencies": [],
      "priority": "high"
    }
  ],
  "success_criteria": [ { "id": "sc1-...", "metric_id": "m1-...", "target": "CI pipeline validated" } ],
  "rationale_map": [ { "id": "r1-...", "source_analysis_id": "ra-5555-...", "notes": "Discovery mitigates top risk" } ],
  "confidence": 0.78,
  "reasoning": "Balances speed and risk mitigation",
  "supporting_analysis_ids": ["ba-3333-...","ta-4444-...","ra-5555-..."]
}

Validation rules
- supporting_analysis_ids must reference BusinessAnalysis/TechnicalAnalysis/RiskAnalysis ids.
- milestones' deliverables' supporting_analysis_ids must reference valid analysis ids.
- priority must be one of allowed enum values.


Model 9 — Narrative

Purpose
- Structured argument map and prioritized talking points that will drive the final written proposal. Keeps evidence links rather than producing final prose.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "Narrative",
  "job_description_id": "uuid",
  "thesis": { "id": "uuid", "statement": "string", "supporting_analysis_ids": ["uuid"], "confidence": 0.0-1.0 },
  "sections": [
    {
      "id": "uuid",
      "heading": "string",
      "points": [ { "id": "uuid", "text": "string", "supporting_analysis_ids": ["uuid"] } ],
      "recommended_tone": "string"
    }
  ],
  "confidence": 0.0-1.0,
  "reasoning": "string",
  "supporting_analysis_ids": ["uuid"]
}

Field descriptions
- thesis: central argument and its evidence links.
- sections: ordered argument sections containing points that reference analyses.
- recommended_tone: descriptive metadata for writer (e.g., "concise", "collaborative").

Required fields
- id, schema_version, created_at, source_stage, job_description_id, thesis, sections (can be empty but recommended), confidence, reasoning, supporting_analysis_ids

Optional fields
- recommended_tone

Example JSON

{
  "id": "n-7777-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:18:00Z",
  "source_stage": "Narrative",
  "job_description_id": "b3f1f6e9-...",
  "thesis": { "id": "t1-...", "statement": "Deliver a secure MVP in 3 months by prioritizing discovery and automation", "supporting_analysis_ids": ["st-6666-..."], "confidence": 0.8 },
  "sections": [ { "id": "sec-1-...", "heading": "Executive Summary", "points": [ { "id": "p1-...", "text": "We will start with a two-week discovery...", "supporting_analysis_ids": ["ta-4444-..."] } ], "recommended_tone": "concise" } ],
  "confidence": 0.8,
  "reasoning": "Thesis synthesizes strategy and risk mitigations",
  "supporting_analysis_ids": ["st-6666-..."]
}

Validation rules
- thesis.supporting_analysis_ids must reference a Strategy id.
- points must reference analysis ids; no raw facts should be duplicated here—use references.


Model 10 — Proposal

Purpose
- Final written deliverable rendered from structured reasoning artifacts. Must not contain original raw JobDescription; it should contain references to prior reasoning artifacts for provenance.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "Proposal",
  "narrative_id": "uuid (reference to Narrative.id)",
  "strategy_id": "uuid (reference to Strategy.id)",
  "analysis_ids": [ "uuid" ],
  "full_text": "string",
  "sections": [
    {
      "id": "uuid",
      "name": "string",
      "text": "string",
      "references": [ { "type": "string", "id": "uuid" } ]
    }
  ],
  "version": "string",
  "provenance": { "created_by": "string", "model_version": "string", "tooling": "string" }
}

Field descriptions
- narrative_id and strategy_id: references to Narrative and Strategy objects used to render the proposal.
- analysis_ids: array of referenced BusinessAnalysis/TechnicalAnalysis/RiskAnalysis ids.
- full_text: final rendered proposal as plain text or markdown.
- sections: structured components of the proposal with explicit references back to reasoning artifacts.
- provenance: who/what generated the proposal and which tool/model version was used.

Required fields
- id, schema_version, created_at, source_stage, narrative_id, strategy_id, full_text, sections (at least one), version, provenance

Optional fields
- analysis_ids

Important constraint
- The Proposal MUST NOT include the original JobDescription JSON or raw_text. The Proposal may reference JobDescription indirectly via referenced reasoning object ids, but not embed the original raw_text.

Example JSON

{
  "id": "pr-8888-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:19:00Z",
  "source_stage": "Proposal",
  "narrative_id": "n-7777-...",
  "strategy_id": "st-6666-...",
  "analysis_ids": ["ba-3333-...","ta-4444-...","ra-5555-..."],
  "full_text": "# Executive Summary\nWe recommend...",
  "sections": [ { "id": "s1-...", "name": "Executive Summary", "text": "We recommend starting with...", "references": [ { "type": "Strategy", "id": "st-6666-..." } ] } ],
  "version": "1.0.0",
  "provenance": { "created_by": "writer-service-v1", "model_version": "n/a", "tooling": "render-engine-1" }
}

Validation rules
- narrative_id and strategy_id must reference existing Narrative and Strategy ids for the same job_description_id.
- sections[].references must reference valid reasoning artifacts by type and id.
- Must NOT include job_description_id or raw_text fields embedding the original posting.


Model 11 — Review

Purpose
- Structured review outcomes and recommended edits to the Proposal. Tracks issues, severity, suggested fixes, and sign-off state.

JSON structure

{
  "id": "uuid",
  "schema_version": "1.0.0",
  "created_at": "ISO8601",
  "source_stage": "Review",
  "proposal_id": "uuid (references Proposal.id)",
  "issues": [
    {
      "id": "uuid",
      "location": { "section_id": "uuid", "offset": "number" },
      "title": "string",
      "description": "string",
      "severity": "enum: [minor, major, critical]",
      "suggested_fix": { "type": "string", "patch": "optional structured diff or replacement text" },
      "confidence": 0.0-1.0,
      "supporting_analysis_ids": ["uuid"]
    }
  ],
  "overall_score": 0.0-1.0,
  "sign_off": { "status": "enum: [pending, approved, rejected]", "by": "string", "at": "ISO8601" }
}

Field descriptions
- proposal_id: link to the Proposal being reviewed.
- issues: array of discovered problems with location, severity, and suggested fixes.
- sign_off: governance metadata for final approval.

Required fields
- id, schema_version, created_at, source_stage, proposal_id, issues (can be empty), overall_score, sign_off.status

Optional fields
- sign_off.by and sign_off.at may be null for pending status.

Example JSON

{
  "id": "rev-9999-...",
  "schema_version": "1.0.0",
  "created_at": "2026-07-17T15:20:00Z",
  "source_stage": "Review",
  "proposal_id": "pr-8888-...",
  "issues": [
    {
      "id": "iss-1-...",
      "location": { "section_id": "s1-...", "offset": 0 },
      "title": "Unsubstantiated claim",
      "description": "The timeline claim is not traced to a feasibility assessment.",
      "severity": "major",
      "suggested_fix": { "type": "edit", "patch": "Link timeline claim to TechnicalAnalysis.opt-1-..." },
      "confidence": 0.9,
      "supporting_analysis_ids": ["ta-4444-..."]
    }
  ],
  "overall_score": 0.72,
  "sign_off": { "status": "pending", "by": null, "at": null }
}

Validation rules
- proposal_id must reference an existing Proposal id for the same job_description_id.
- issues[].location.section_id must reference a section id from the Proposal.
- overall_score between 0.0 and 1.0.
- sign_off.status must be one of allowed enums.


Appendix — Cross-model constraints and rules

- No duplication: later models should reference earlier models by id. For example, never copy Fact raw text into Narrative; reference fact ids.
- Canonical provenance: every model should include the originating job_description_id via the referenced artifact (JobDescription is the source of truth). Implementations should be able to reconstruct the full lineage by traversing ids.
- Schema versioning: bump schema_version upon breaking changes. Consumers must validate schema_version before processing.
- Confidence propagation: when a later-stage confidence is computed from multiple earlier confidences, include an explanation in reasoning and list the contributing supporting_fact_ids and supporting_analysis_ids.
- Validation enforcement: implement schema validation that enforces UUID format for ids, ISO 8601 for timestamps, numeric ranges for confidence/score fields, and required fields per model.

This document is the canonical contract for future implementations. Any metadata extensions should be additive and documented as optional fields in a new schema_version.
