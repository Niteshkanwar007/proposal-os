/**
 * shared/SearchOptions.ts
 *
 * Ancillary options for searching large knowledge sources.
 */

export interface SearchOptions {
  pageSize?: number;
  pageToken?: string;
  sortBy?: string;
  includeMetadata?: boolean;

  // TODO: include timeoutMs, scoring overrides and debug flags
}
