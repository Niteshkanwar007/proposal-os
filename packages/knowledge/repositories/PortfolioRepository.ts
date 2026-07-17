/**
 * repositories/PortfolioRepository.ts
 *
 * Contract for accessing portfolio artifacts.
 */

import type { Portfolio } from '../types/Portfolio';
import type { SearchQuery } from '../shared/SearchQuery';
import type { SearchOptions } from '../shared/SearchOptions';
import type { KnowledgeResult } from '../contracts/KnowledgeResult';

export interface PortfolioRepository {
  /** Retrieve a portfolio item by id */
  getById(id: string): Promise<Portfolio | null>;

  /** Search portfolio content */
  search(query: SearchQuery, options?: SearchOptions): Promise<KnowledgeResult<Portfolio>>;

  // TODO: add bulk ingest and metadata update contracts
}
