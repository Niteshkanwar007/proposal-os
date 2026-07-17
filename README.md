# ProposalOS

> Observe before you write.

ProposalOS is an observation-first AI proposal engine designed to understand the business behind a job before generating a proposal.

Unlike traditional AI proposal writers that immediately begin writing, ProposalOS reconstructs the client's situation, identifies hidden motivations, analyzes technical requirements, and only then produces a proposal.

The writing is the final output, not the primary objective.

---

## Philosophy

Every job post is the visible result of an invisible business problem.

Someone experienced friction.

Something failed.

Growth created complexity.

Priorities changed.

Budgets became available.

Deadlines appeared.

ProposalOS attempts to reconstruct that invisible reality before writing a single sentence.

Because better observations produce better proposals.

---

## Principles

- Observe before writing.
- Think before persuading.
- No templates.
- No generic introductions.
- Every sentence must earn its place.
- Writing should emerge from reasoning, not prompting.

---

## The Engine

```
Job Description
        │
        ▼
Job Parser
        │
        ▼
Business Observer
        │
        ▼
Business Analyst
        │
        ▼
Client Psychology
        │
        ▼
Technical Architect
        │
        ▼
Strategy Engine
        │
        ▼
Proposal Writer
        │
        ▼
Final Reviewer
```

Each stage has exactly one responsibility.

The final proposal is simply the outcome of the reasoning process.

---

## Core Goals

- Understand the client's business before writing.
- Detect hidden requirements.
- Infer unstated problems.
- Estimate complexity.
- Identify risks.
- Recommend proposal strategy.
- Generate natural, human proposals.
- Eliminate repetitive AI writing patterns.

---

## Features (MVP)

- Paste a job description.
- Deep business analysis.
- Technical requirement extraction.
- Hidden risk detection.
- Proposal strategy selection.
- Cover letter generation.
- Upwork question generation.
- Discovery call questions.
- Portfolio recommendation.
- Final proposal review.

Simple interface.

Deep reasoning.

---

## Design Principles

ProposalOS intentionally avoids feature overload.

No CRM.

No Kanban boards.

No dashboards filled with charts.

No unnecessary configuration.

One screen.

One input.

One output.

Everything else happens inside the engine.

---

## Folder Structure

```
proposal-os/

apps/
    web/
    api/

packages/
    agents/
    prompts/
    core/
    shared/

knowledge/
    portfolio/
    resumes/
    company/
    writing/

docs/
```

---

## Future Vision

ProposalOS is not intended to become another proposal generator.

The long-term objective is to build an observation engine capable of understanding businesses, people, buying decisions, technical complexity, and communication strategy before producing any written artifact.

Proposal writing is simply the first application.

---

## Tech Stack

Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend

- FastAPI
- Python
- LangGraph

Database

- PostgreSQL
- pgvector

AI

- GPT-5.5

Deployment

- Vercel
- Railway

---

## Roadmap

### Phase 1

- Job parser
- Observation engine
- Proposal generator
- Proposal reviewer

### Phase 2

- Knowledge retrieval
- Portfolio selection
- Resume selection
- Proposal memory

### Phase 3

- Learning engine
- Proposal scoring
- Strategy optimization

---

## Contributing

ProposalOS is an open-source research project focused on improving AI-assisted proposal writing through structured reasoning rather than template generation.

Contributions are welcome from developers interested in AI systems, reasoning architectures, language models, and developer tooling.

---

## License

MIT License

---

## A Simple Belief

Most proposal tools try to write faster.

ProposalOS tries to understand better.

Everything else follows from that.
