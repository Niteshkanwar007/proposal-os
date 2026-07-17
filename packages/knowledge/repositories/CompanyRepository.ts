/**
 * repositories/CompanyRepository.ts
 *
 * Contract for accessing company profile artifacts.
 */

import type { Company } from '../types/Company';
import type { SearchQuery } from '../shared/SearchQuery';
import type { SearchOptions } from '../shared/SearchOptions';
import type { KnowledgeResult } from '../contracts/KnowledgeResult';

export interface CompanyRepository {
  getById(id: string): Promise<Company | null>;
  search(query: SearchQuery, options?: SearchOptions): Promise<KnowledgeResult<Company>>;

  // TODO: add sync and enrichment hooks (e.g., enrich with public data)
}
