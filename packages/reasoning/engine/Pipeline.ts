/**
 * Pipeline.ts
 *
 * Abstract representation of a pipeline: an ordered collection of stages and
 * pipeline-level metadata.
 */

import type { ReasoningStageDescriptor } from '../shared/types';
import type { PipelineResult } from '../contracts/PipelineResult';
import type { ExecutionContext } from './ExecutionContext';

/**
 * Abstract pipeline definition. Concrete pipelines declare the stages and any
 * orchestration rules (parallelism, dependencies, failure policies) in metadata.
 */
export abstract class Pipeline {
  /** Unique id for this pipeline instance */
  public abstract readonly id: string;

  /** Human-friendly name for the pipeline */
  public abstract readonly name: string;

  /** Ordered stage descriptors that comprise the pipeline */
  public abstract readonly stages: ReasoningStageDescriptor[];

  /**
   * Validate the pipeline definition and return a boolean or throw on fatal issues.
   * Implementations may perform structural validation (cycles, missing stages).
   */
  public abstract validate(): boolean;

  /** TODO: add methods for dynamic modification or branching */
}
