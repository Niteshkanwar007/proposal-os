# ProposalOS — Technical Architecture

This document describes the layered architecture and guiding principles for ProposalOS: an observation-first reasoning system whose guiding philosophy is “Observe before you write.” The goal is to separate concerns so that observations, reasoning, orchestration, and presentation remain decoupled and independently testable.

## 1. Presentation Layer

Purpose
- Surface the system to humans and integrators. Provide UI and programmable endpoints for driving observation and reviewing outputs.

Responsibilities
- Accept user input and commands, present system status and results, and expose stable API contracts.
- Provide authentication, authorization, rate-limiting, and user-facing validation feedback.

What belongs in this layer
- Web and mobile user interfaces, dashboards, and administrative consoles.
- Public and internal HTTP API endpoints, request/response adapters, and API documentation.
- Input sanitization and presentation-specific formatting (rendering templates, UI views).

What must never belong in this layer
- Domain reasoning, parsing, or long-running orchestration logic.
- Persistent knowledge storage or core business models.
- Any AI model execution or analysis beyond simple display transformations.

---

## 2. Application Layer

Purpose
- Orchestrate workflows, enforce contracts, and validate inputs/outputs between Presentation and Reasoning layers.

Responsibilities
- Implement durable, auditable workflows and process coordination (orchestration) across reasoning components.
- Validate inbound inputs and outbound artifacts against explicit schemas and contracts.
- Translate presentation-level requests into atomic tasks for the reasoning layer and aggregate responses for the presentation layer.

What belongs in this layer
- Workflow engine or orchestration code, job scheduling, retries, and task correlation.
- API adapters that shape requests into deterministic tasks and apply schema validation.
- Input/output contracts (JSON schemas, Protobufs) and integration tests verifying those contracts.

What must never belong in this layer
- Business analysis, domain-specific reasoning, or content generation logic.
- Large knowledge assets or the canonical store of domain content.
- Non-deterministic AI inference or model training processes.

---

## 3. Reasoning Layer

Purpose
- Execute the observation-first reasoning pipeline: transform inputs into observations, analyze them, plan strategies, and produce candidate outputs subject to review.

Responsibilities
- Break down reasoning into composable, testable modules that progressively transform and enrich structured data.
- Ensure each reasoning step emits structured outputs (JSON) and is independently verifiable.

What belongs in this layer
- Parser: deterministic input parsing, normalization, and tokenization components that convert raw inputs into structured representations.
- Observer: telemetry and context collectors that capture environment signals, user behavior, and external facts used by analysis.
- Business Analyst: domain-focused interpretation producing insights about goals, requirements, and business appropriateness.
- Technical Analyst: technical feasibility analysis, constraints identification, and implementation impact assessments.
- Risk Analyzer: threat, compliance, and failure-mode analysis delivering quantified risks and mitigations.
- Strategy Engine: planning and decision logic that synthesizes analyst output into prioritized, multi-step strategies.
- Writer: the component responsible only for rendering the final, human-facing prose or artifacts from structured plan results (subject to the rule that writing is final step).
- Reviewer: automated and human-in-the-loop validation modules that critique and score outputs against policy and quality gates.

What must never belong in this layer
- Presentation concerns (UI rendering, routing) or persistence-specific view models.
- Undocumented or ad-hoc data exchange formats; communication MUST be structured and schema-driven.
- Unbounded or non-testable reasoning steps — every component must yield inspectable, testable outputs.

---

## 4. Knowledge Layer

Purpose
- Provide curated, versioned reference artifacts and fast retrieval for observations and reasoning. Serve as the canonical content and prompt resources for ProposalOS.

Responsibilities
- Store and serve domain artifacts (portfolio items, resumes, company profiles) and prompt templates for reasoning workflows.
- Provide a future-proofed vector database or retrieval store optimized for similarity search and contextual enrichment.

What belongs in this layer
- Portfolio knowledge: structured case studies, project metadata, and exemplar deliverables.
- Resume knowledge: canonical CVs and candidate attributes used for personalization and matching.
- Company knowledge: corporate profiles, industry facts, and structured public data used to contextualize proposals.
- Prompt library: curated, versioned prompt templates and transformation rules for guiding AI-assisted operations.
- Future vector database: a retrieval-optimized store of embeddings and metadata (designed as an abstraction so implementations can evolve).

What must never belong in this layer
- Mutable runtime state for orchestration (task queues, transient job state).
- Presentation assets or UI-specific content rendering logic.
- Embedding or vector indexes without provenance or versioning — knowledge artifacts must be auditable and versioned.

---

## Architecture Principles

- Single Responsibility
  - Each component and layer has one clear reason to change: presentation, orchestration, reasoning, or knowledge. This minimizes coupling and eases testing and evolution.

- Deterministic Inputs and Outputs
  - Modules accept explicit, versioned schemas and produce deterministic, structured outputs to enable reproducibility and reliable testing.

- AI modules communicate using structured JSON
  - All inter-module communication in the reasoning pipeline (and between application and reasoning layers) must use documented JSON schemas to ensure clarity, validation, and automated testing.

- Every reasoning step must be independently testable
  - Design modules so their behaviour can be verified in isolation with unit and integration tests using captured inputs and expected outputs.

- Writing is always the final step
  - The Writer component renders human-facing artifacts only after observation, analysis, strategy, and review are complete. Generation of prose is the terminal action of the pipeline, not part of upstream analysis.
