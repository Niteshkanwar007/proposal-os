/**
 * types/Resume.ts
 *
 * Domain type for resume artifacts.
 */

import type { Metadata } from '../shared/Metadata';

export interface Resume {
  id: string;
  canonical_name?: string;
  email?: string;
  summary?: string;
  skills?: string[];
  experiences?: Array<{ company?: string; role?: string; start?: string; end?: string; description?: string }>;
  metadata?: Metadata;

  // TODO: consider storing multiple formats (pdf, text) and canonical parsing results
}
