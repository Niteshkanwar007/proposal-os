/**
 * contracts/KnowledgeResult.ts
 *
 * Wrapper describing search results from a knowledge source or provider.
 */

import type { Metadata } from '../shared/Metadata';

/** A typed result item returned by a knowledge search */
export interface KnowledgeItem<T = any> {
  id: string;
  score?: number; // optional relevance score (0.0 - 1.0)
  payload: T;
  metadata?: Metadata;
}

/**
 * Result container for knowledge searches. Implementations should include pagination tokens if applicable.
 */
export interface KnowledgeResult {
  items: KnowledgeItem[];
  total?: number; // total matched (if known)
  nextPageToken?: string;

  // TODO: include timing, provider id and traceability metadata
}
