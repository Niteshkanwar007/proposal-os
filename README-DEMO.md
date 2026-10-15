# ProposalOS Vercel demo

The repository now includes a small Next.js demo at the repository root. It preserves the existing architecture and reasoning packages while providing a deployable, interactive demonstration.

## What works
- Paste a job description or load the included sample.
- Run a deterministic analysis endpoint at `POST /api/analyze`.
- View requirement signals, risks/unknowns, recommended response strategy, discovery questions, and a proposal starting point.
- Copy the draft for manual review.

## Important boundary
This is a functional deterministic demo, not the complete LLM/LangGraph/Postgres product described in the long-term architecture. It requires no API key and does not claim to provide model-generated analysis. The original packages remain in place for continued implementation.

## Deploy to Vercel
Import `Niteshkanwar007/proposal-os` into Vercel. Use the repository root as the Root Directory, Framework Preset `Next.js`, and default build command `next build`. No environment variables are required for the demo.

After deployment, test the sample job, then paste a different brief and confirm all four analysis sections and the draft update.
