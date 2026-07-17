/**
 * packages/core/types/job.ts
 *
 * Canonical JobDescription domain contract.
 */

/**
 * Canonical representation of the original job posting or brief.
 * This interface mirrors the JobDescription model in the architecture docs.
 */
export interface JobDescription {
  /** Unique UUID (v4) for this job object */
  id: string;
  /** Semantic schema version for this type (e.g. "1.0.0") */
  schema_version: string;
  /** ISO 8601 timestamp when the object was created */
  created_at: string;
  /** Source stage name, should be "JobDescription" */
  source_stage: 'JobDescription';

  /** Optional external source metadata */
  source?: {
    id?: string;
    url?: string;
    posted_at?: string; // ISO 8601
  };

  /** Canonical title extracted from the posting */
  title: string;

  /** Company information */
  company: {
    name: string;
    id?: string; // optional external company id
  };

  /** Normalized location descriptor */
  location?: {
    type: 'remote' | 'onsite' | 'hybrid' | 'unspecified';
    value?: string;
  };

  /** Raw posting text. Present only in JobDescription stage. Implementations must not copy raw_text into later-stage Proposal objects. */
  raw_text: string;

  /** Extracted named sections (Responsibilities, Requirements, Benefits, etc.) */
  sections?: Array<{
    name: string;
    text: string;
  }>;

  /** Freeform metadata for indexing and tags */
  metadata?: Record<string, any>;

  // TODO: consider adding source_language, detected_entities, and content_hash for deduplication
}
