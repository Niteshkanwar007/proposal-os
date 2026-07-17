/**
 * packages/core/types/inference.ts
 *
 * Inference contracts derived from facts.
 */

/**
 * A single inference derived from one or more facts.
 */
export interface Inference {
  id: string;
  type: string; // ontology label, e.g. "timeline_inference"
  claim: string;

  /** Confidence (0.0 - 1.0) for the claim */
  confidence: number;

  /** Structured reasoning or short explanation for the inference */
  reasoning: string | Record<string, any>;

  /** IDs of Fact objects that support this inference */
  supporting_fact_ids: string[];

  tags?: string[];
}

/**
 * Collection wrapper for inferences linked to a job.
 */
export interface InferenceSet {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'Inference';
  job_description_id: string;
  inferences: Inference[];

  // TODO: add inference_engine_version and inference_conflict_tags
}
