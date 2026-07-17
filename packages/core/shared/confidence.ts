/**
 * packages/core/shared/confidence.ts
 *
 * Confidence and reasoning primitives used by confidence-bearing objects.
 */

/** Standard confidence envelope */
export interface ConfidenceEnvelope {
  /** numeric confidence between 0.0 and 1.0 */
  confidence: number;
  /** short explanation or structured reasoning */
  reasoning: string | Record<string, any>;
  /** supporting fact ids that substantiate the conclusion */
  supporting_fact_ids: string[];
}
