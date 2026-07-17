/**
 * packages/core/shared/provenance.ts
 *
 * Provenance related types used across domain contracts.
 */

/** Provenance record for tracing evidence */
export interface ProvenanceRecord {
  source: string; // e.g., "raw_text", "company_site", "linked_repo"
  url?: string;
  locator?: string | { line?: number; char_offset?: number };
  notes?: string;
}
