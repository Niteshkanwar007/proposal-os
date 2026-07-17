/**
 * packages/core/types/strategy.ts
 *
 * Strategy domain contracts.
 */

/** Deliverable descriptor */
export interface Deliverable {
  id: string;
  name: string;
  description?: string;
  supporting_analysis_ids?: string[];
}

/** Milestone descriptor */
export interface Milestone {
  id: string;
  title: string;
  description?: string;
  due_weeks_from_start?: number;
  deliverables?: Deliverable[];
  dependencies?: string[]; // milestone ids
  priority?: 'low' | 'medium' | 'high';
}

/** Strategy payload */
export interface Strategy {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'Strategy';
  job_description_id: string;

  milestones: Milestone[];
  success_criteria?: Array<{ id: string; metric_id: string; target: string }>;
  rationale_map?: Array<{ id: string; source_analysis_id: string; notes?: string }>;

  confidence: number;
  reasoning: string;
  supporting_analysis_ids: string[];

  // TODO: consider adding alternative_strategies array for trade-offs
}
