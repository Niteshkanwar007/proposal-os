/**
 * packages/core/types/review.ts
 *
 * Review domain contracts for proposal validation and governance.
 */

/** Location within a proposal (by section and offset) */
export interface ProposalLocation {
  section_id: string;
  offset?: number; // character offset or token index
}

/** Suggested fix or patch */
export interface SuggestedFix {
  type: string; // e.g., "edit", "replace", "link"
  patch?: any; // structured diff or replacement text; keep untyped to allow multiple patch formats
}

/** Single review issue */
export interface ReviewIssue {
  id: string;
  location: ProposalLocation;
  title: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  suggested_fix?: SuggestedFix;
  confidence?: number;
  supporting_analysis_ids?: string[];
}

export interface Review {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'Review';
  proposal_id: string;

  issues: ReviewIssue[];
  overall_score: number;
  sign_off: { status: 'pending' | 'approved' | 'rejected'; by?: string; at?: string };

  // TODO: include reviewer comments and review tool version
}
