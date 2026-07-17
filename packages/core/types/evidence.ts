/**
 * packages/core/types/evidence.ts
 *
 * Fact / Evidence contracts extracted from JobDescription and external sources.
 */

import type { JobDescription } from './job';

/**
 * Atomic, verifiable fact record.
 */
export interface Fact {
  id: string; // UUID
  /**
   * Simple triple representation. Keep values small and atomic.
   * subject may be omitted when implicit; consumer should use supporting_fact_ids for provenance.
   */
  subject?: string;
  predicate: string;
  object: string | Record<string, any>;

  /** Evidence provenance records: where this fact was observed */
  provenance: Array<ProvenanceRecord>;

  /** Confidence that this fact was correctly extracted (0.0 - 1.0) */
  confidence: number;
}

/**
 * Container for facts associated with a JobDescription.
 */
export interface FactBase {
  id: string;
  schema_version: string;
  created_at: string;
  source_stage: 'Facts';

  /** Reference to the originating JobDescription.id */
  job_description_id: string;

  /** Normalized facts extracted from the job or external references */
  facts: Fact[];

  // TODO: add extractor_version, extraction_warnings
}

/** Provenance record for a fact */
export interface ProvenanceRecord {
  source: string; // e.g., "raw_text", "company_site", "linked_repo"
  url?: string;
  /** Optional pointer into source (e.g., character offset or section name) */
  locator?: string | { line?: number; char_offset?: number };
}
