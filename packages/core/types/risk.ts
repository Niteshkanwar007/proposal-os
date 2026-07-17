/**
 * packages/core/types/risk.ts
 *
 * RiskAnalysis domain contracts.
 */

/** Mitigation suggestion */
export interface Mitigation {
  id: string;
  description: string;
  cost_estimate?: number;
}

/** Single risk item */
export interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  likelihood: number; // 0.0 - 1.0
  mitigations?: Mitigation[];
  residual_risk_score?: number; // 0.0 - 1.0
  supporting_fact_ids?: string[];
}

/** Risk analysis container */
export interface RiskAnalysis {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'RiskAnalysis';
  job_description_id: string;

  risks: RiskItem[];
  overall_risk_score: number;

  confidence: number;
  reasoning: string;

  // TODO: add monitoring_recommendations structure
}
