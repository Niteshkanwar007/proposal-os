/**
 * contracts/PipelineResult.ts
 *
 * Describes the outcome of pipeline execution.
 */

import type { StageResult } from './StageResult';
import type { PipelineStatus } from '../shared/constants';

export interface PipelineResult {
  pipelineId: string;
  status: PipelineStatus;
  startedAt?: string;
  finishedAt?: string;
  stageResults: StageResult[];
  errors?: Array<{ code: string; message: string; stageId?: string }>;

  // TODO: include metrics and telemetry summary
}
