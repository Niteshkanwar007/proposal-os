/**
 * contracts/KnowledgeSource.ts
 *
 * Describes a single source of knowledge managed by a provider.
 */

import type { SearchQuery } from '../shared/SearchQuery';
import type { SearchOptions } from '../shared/SearchOptions';
import type { KnowledgeResult } from './KnowledgeResult';

/**
 * Minimal knowledge source contract. A source is a named collection of artifacts (prompts, portfolios, resumes, companies).
 * Implementations may back this with files, SQL tables, object storage, or remote APIs.
 */
export interface KnowledgeSource {
  id: string;
  name: string;
  description?: string;
  /** Logical type of content contained in this source (e.g., "portfolio", "resumes", "company", "prompts") */
  contentType: string;

  /** Search within the source */
  search(query: SearchQuery, options?: SearchOptions): Promise<KnowledgeResult>;

  // TODO: add methods for sync, refresh, and health checks
}
