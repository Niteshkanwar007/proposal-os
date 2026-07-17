/**
 * ReasoningEngine.ts
 *
 * Abstract engine that coordinates pipeline execution. Concrete implementations must
 * implement the abstract methods. No operational logic is included here — only the
 * abstract surface and type contracts.
 */

import type { Pipeline } from './Pipeline';
import type { ExecutionContext } from './ExecutionContext';
import type { PipelineResult } from '../contracts/PipelineResult';
import type { ReasoningEngineConfig } from '../shared/types';

/**
 * Abstract base class for a Reasoning Engine.
 *
 * Implementations should orchestrate Pipeline execution, scheduling, retries and
 * lifecycle management according to the policies expressed in the config.
 */
export abstract class ReasoningEngine {
  /**
   * Configuration used to customize engine behavior.
   * TODO: define concrete configuration fields and defaults in ReasoningEngineConfig.
   */
  protected abstract readonly config: ReasoningEngineConfig;

  /**
   * Initialize engine resources. Implementations may open connections, thread pools, or other resources.
   * No implementation is provided here.
   */
  public abstract initialize(): Promise<void> | void;

  /**
   * Shutdown and cleanup resources.
   */
  public abstract shutdown(): Promise<void> | void;

  /**
   * Execute a pipeline within the provided execution context.
   * Implementations should drive stage execution according to the Pipeline definition and return a PipelineResult.
   */
  public abstract executePipeline(pipeline: Pipeline, ctx: ExecutionContext): Promise<PipelineResult>;

  // TODO: add hooks for instrumentation, metrics, and tracing
}
