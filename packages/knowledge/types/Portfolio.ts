/**
 * types/Portfolio.ts
 *
 * Domain type for portfolio artifacts stored in the knowledge layer.
 */

import type { Metadata } from '../shared/Metadata';

export interface Portfolio {
  id: string;
  title: string;
  summary?: string;
  artifacts?: Array<{ id: string; url?: string; description?: string }>;
  metadata?: Metadata;

  // TODO: add canonical fields for industries, outcomes, and metrics
}
