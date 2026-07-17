/**
 * contracts/KnowledgeProvider.ts
 *
 * High-level provider contract representing a configurable knowledge source implementation.
 * This interface describes capabilities and metadata but does not expose storage details.
 */

import type { KnowledgeSource } from './KnowledgeSource';
import type { KnowledgeResult } from './KnowledgeResult';
import type { SearchQuery } from '../shared/SearchQuery';
import type { SearchOptions } from '../shared/SearchOptions';

/**
 * KnowledgeProvider represents a named provider that can expose one or more KnowledgeSource instances.
 * Implementations might wrap file-system-backed repositories, databases, or remote APIs.
 */
export interface KnowledgeProvider {
  /** Stable provider id */
  id: string;

  /** Human friendly name */
  name: string;

  /** List of sources exposed by this provider */
  sources: KnowledgeSource[];

  /**
   * Search across available sources. Returns a KnowledgeResult wrapper.
   * NOTE: This is a capability contract. Implementations will decide how queries are executed and paginated.
   */
  search(query: SearchQuery, options?: SearchOptions): Promise<KnowledgeResult>;

  // TODO: add provider-level metadata (auth, SLA, health) and lifecycle hooks
}
