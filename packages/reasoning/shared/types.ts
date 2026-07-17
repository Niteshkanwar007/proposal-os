/**
 * shared/types.ts
 *
 * Reusable type definitions and descriptors for pipelines and stages.
 */

import type { PipelineStatus, StageStatus } from './constants';

/** Minimal descriptor for a stage used by Pipeline definitions */
export interface ReasoningStageDescriptor {
  id: string;
  name: string;
  // Implementation id or component name used by the engine to instantiate the stage
  implementation?: string;
  config?: Record<string, any>;
  dependsOn?: string[]; // stage ids
}

/** Pipeline descriptor used for registration and discovery */
export interface PipelineDescriptor {
  id: string;
  name: string;
  stages: ReasoningStageDescriptor[];
  status?: PipelineStatus;
}

/** Engine configuration skeleton */
export interface ReasoningEngineConfig {
  maxConcurrentStages?: number;
  defaultTimeoutMs?: number;
  // TODO: define retry/backoff defaults and instrumentation hooks
}

/** Minimal logger interface used by engines and stages */
export interface Logger {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}
