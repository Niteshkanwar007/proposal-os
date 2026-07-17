/**
 * shared/constants.ts
 *
 * Shared enums and constant type definitions used by the execution framework.
 */

/** Pipeline-level status */
export enum PipelineStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

/** Stage-level status */
export enum StageStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
}

// TODO: add retry policy enums and circuit-breaker states
