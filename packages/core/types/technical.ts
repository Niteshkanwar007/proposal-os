/**
 * packages/core/types/technical.ts
 *
 * TechnicalAnalysis domain contracts.
 */

/** External dependency descriptor */
export interface Dependency {
  id: string;
  type: string; // e.g., "third_party_api", "database", "service"
  description?: string;
}

/** Architecture option */
export interface ArchitectureOption {
  id: string;
  name: string;
  description: string;
  feasibility_score: number; // 0.0 - 1.0
  estimated_effort?: {
    story_points?: number;
    person_months?: number;
  };
  dependencies?: Dependency[];
  supporting_fact_ids?: string[];
}

/** Technical analysis container */
export interface TechnicalAnalysis {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'TechnicalAnalysis';
  job_description_id: string;

  architecture_options: ArchitectureOption[];
  preferred_option_id?: string;
  constraints?: Array<{ id: string; description: string; supporting_fact_ids?: string[] }>;

  confidence: number;
  reasoning: string;
  supporting_fact_ids: string[];

  // TODO: add cost_estimate and schedule_estimate structures
}
