/**
 * types/Prompt.ts
 *
 * Domain type for prompt templates and prompt metadata.
 */

import type { Metadata } from '../shared/Metadata';

export interface Prompt {
  id: string;
  name: string;
  description?: string;
  template: string; // template text with placeholders
  language?: string;
  metadata?: Metadata;

  // TODO: include example inputs/outputs and safety/policy metadata
}
