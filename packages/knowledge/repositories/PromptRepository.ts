/**
 * repositories/PromptRepository.ts
 *
 * Contract for managing prompt templates and prompt metadata.
 */

import type { Prompt } from '../types/Prompt';
import type { SearchQuery } from '../shared/SearchQuery';
import type { SearchOptions } from '../shared/SearchOptions';
import type { KnowledgeResult } from '../contracts/KnowledgeResult';

export interface PromptRepository {
  getById(id: string): Promise<Prompt | null>;
  search(query: SearchQuery, options?: SearchOptions): Promise<KnowledgeResult<Prompt>>;

  // TODO: add prompt versioning, templating contracts and policy metadata
}
