/**
 * Stage.ts
 *
 * Abstract representation of an executable stage within the pipeline. Concrete
 * stage implementations will implement the execute method.
 */

import type { ExecutionContext } from './ExecutionContext';
import type { StageResult } from '../contracts/StageResult';
import type { ReasoningStage } from '../contracts/ReasoningStage';

/**
 * Base abstract Stage class. Implementations should extend this class and
 * implement the execute method to perform stage-specific behavior.
 */
export abstract class Stage implements ReasoningStage {
  /** Stage unique identifier (matches descriptor id) */
  public abstract readonly id: string;

  /** Human readable name for the stage */
  public abstract readonly name: string;

  /** Optional configuration specific to the stage */
  public abstract readonly config?: Record<string, any>;

  /**
   * Execute the stage logic using the provided ExecutionContext.
   * Implementations must return a StageResult describing success/failure and any output references.
   */
  public abstract execute(ctx: ExecutionContext): Promise<StageResult>;

  // TODO: add lifecycle hooks (onStart, onComplete, onError) as protected methods
}
