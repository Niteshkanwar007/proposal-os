/**
 * contracts/StageResult.ts
 *
 * Describes the outcome of a single stage execution.
 */

import type { StageStatus } from '../shared/constants';

export interface StageResult {
  stageId: string;
  status: StageStatus;
  startedAt?: string;
  finishedAt?: string;

  /**
   * Reference to output artifact(s) produced by the stage (for example: FactBase.id)
   * Consumers should treat outputReferences as opaque strings that reference persisted artifacts.
   */
  outputReferences?: Array<{ type: string; id: string }>;

  /** Optional error summary if the stage failed */
  error?: { code: string; message: string };

  // TODO: include resource consumption and retry count
}
