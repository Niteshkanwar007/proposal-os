/**
 * packages/core/types/unknown.ts
 *
 * Unknowns / information gaps discovered by the pipeline.
 */

/**
 * A single unknown or question that must be resolved.
 */
export interface Unknown {
  id: string;
  question: string;
  impact_score?: number; // 0.0 - 1.0
  priority: 'low' | 'medium' | 'high';

  /** Optional references to facts that highlight the gap */
  related_fact_ids?: string[];

  recommended_action?: {
    type: string; // e.g., "ask_client", "run_discovery"
    details?: string;
  };
}

/**
 * Collection wrapper for unknowns linked to a job.
 */
export interface UnknownsSet {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'Unknowns';
  job_description_id: string;
  unknowns: Unknown[];

  // TODO: add generator_metadata
}
