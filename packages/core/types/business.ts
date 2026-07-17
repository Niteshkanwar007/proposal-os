/**
 * packages/core/types/business.ts
 *
 * BusinessAnalysis domain contracts.
 */

/** Business goal or objective */
export interface BusinessGoal {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | string;
  supporting_inference_ids?: string[];
}

/** Stakeholder descriptor */
export interface Stakeholder {
  id: string;
  role: string;
  concerns?: string[];
}

/** Success metric */
export interface SuccessMetric {
  id: string;
  name: string;
  target: string; // freeform target expression; tests should validate semantics
  supporting_fact_ids?: string[];
}

/** Constraint (business-level) */
export interface BusinessConstraint {
  id: string;
  type: string;
  description: string;
  supporting_fact_ids?: string[];
}

/** Business analysis payload */
export interface BusinessAnalysis {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'BusinessAnalysis';
  job_description_id: string;

  goals: BusinessGoal[];
  stakeholders?: Stakeholder[];
  success_metrics?: SuccessMetric[];
  constraints?: BusinessConstraint[];

  /** Overall confidence for the analysis */
  confidence: number;
  reasoning: string;
  supporting_fact_ids: string[];

  // TODO: add assessment_timestamp and analyst_identity
}
