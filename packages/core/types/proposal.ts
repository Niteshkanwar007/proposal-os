/**
 * packages/core/types/proposal.ts
 *
 * Proposal domain contracts (final written artifact). NOTE: must not embed original raw job text.
 */

/** Reference to an external reasoning artifact */
export interface ArtifactReference {
  type: string; // e.g., "Strategy", "BusinessAnalysis"
  id: string;
}

/** Structured section inside a proposal */
export interface ProposalSection {
  id: string;
  name: string;
  text: string;
  references?: ArtifactReference[];
}

export interface Proposal {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'Proposal';

  narrative_id: string; // reference to Narrative.id
  strategy_id: string; // reference to Strategy.id
  analysis_ids?: string[]; // references to Business/Technical/Risk analyses

  full_text: string; // rendered text (markdown/plain)
  sections: ProposalSection[];

  version: string;
  provenance?: { created_by?: string; model_version?: string; tooling?: string };

  // IMPORTANT: do NOT include JobDescription.raw_text here. Only reference earlier artifacts.
  // TODO: add signing and publication metadata for finalization
}
