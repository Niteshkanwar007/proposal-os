/**
 * contracts/ReasoningStage.ts
 *
 * Interface describing the minimal contract every stage must implement.
 */

import type { ExecutionContext } from '../engine/ExecutionContext';
import type { StageResult } from './StageResult';

/**
 * Minimal interface for a reasoning stage implementation.
 */
export interface ReasoningStage {
  /** Stable identifier for the stage */
  id: string;
  /** Human-friendly name */
  name: string;
  /** Optional configuration */
  config?: Record<string, any>;

  /** Execute the stage given an ExecutionContext and return a StageResult. */
  execute(ctx: ExecutionContext): Promise<StageResult>;
}
