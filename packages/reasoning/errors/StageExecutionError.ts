/**
 * errors/StageExecutionError.ts
 *
 * Type definition for errors that occur during a stage execution.
 */

export interface StageExecutionError {
  code: string;
  message: string;
  stageId?: string;
  details?: any;
  // TODO: include step index, attempt count and error classification
}
