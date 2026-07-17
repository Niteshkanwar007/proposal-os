/**
 * packages/core/types/narrative.ts
 *
 * Narrative domain contracts (structured argument map and talking points).
 */

/** Single narrative point */
export interface NarrativePoint {
  id: string;
  text: string;
  supporting_analysis_ids?: string[];
}

/** Narrative section */
export interface NarrativeSection {
  id: string;
  heading: string;
  points: NarrativePoint[];
  recommended_tone?: string;
}

/** Narrative container */
export interface Narrative {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'Narrative';
  job_description_id: string;

  thesis: { id: string; statement: string; supporting_analysis_ids?: string[]; confidence?: number };
  sections: NarrativeSection[];

  confidence: number;
  reasoning: string;
  supporting_analysis_ids: string[];

  // TODO: allow multiple thesis alternatives and A/B narratives
}
