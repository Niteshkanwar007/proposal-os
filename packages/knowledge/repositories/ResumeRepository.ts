/**
 * repositories/ResumeRepository.ts
 *
 * Contract for accessing resume artifacts.
 */

import type { Resume } from '../types/Resume';
import type { SearchQuery } from '../shared/SearchQuery';
import type { SearchOptions } from '../shared/SearchOptions';
import type { KnowledgeResult } from '../contracts/KnowledgeResult';

export interface ResumeRepository {
  getById(id: string): Promise<Resume | null>;
  search(query: SearchQuery, options?: SearchOptions): Promise<KnowledgeResult<Resume>>;

  // TODO: add versioning and canonicalization contracts for resumes
}
