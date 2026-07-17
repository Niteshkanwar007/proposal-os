/**
 * shared/SearchQuery.ts
 *
 * Lightweight search query contract used across repositories and providers.
 */

import type { Metadata } from './Metadata';

export interface SearchQuery {
  /** Free-text query */
  q?: string;
  /** Filters expressed as key/value pairs */
  filters?: Record<string, string | number | boolean>;
  /** Optional metadata constraints */
  metadata?: Metadata;

  // TODO: add language, time-range and structured criteria fields
}
