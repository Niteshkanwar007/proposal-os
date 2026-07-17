/**
 * types/Company.ts
 *
 * Domain type for company profile artifacts.
 */

import type { Metadata } from '../shared/Metadata';

export interface Company {
  id: string;
  name: string;
  domain?: string;
  size?: string; // e.g., "1-10", "100-500"
  industry?: string;
  description?: string;
  metadata?: Metadata;

  // TODO: add canonical public links, stock ticker, and external ids
}
