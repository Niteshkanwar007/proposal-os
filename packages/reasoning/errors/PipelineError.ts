/**
 * errors/PipelineError.ts
 *
 * Type definition for errors raised at the pipeline level. Implementations may
 * choose to map these to concrete Error subclasses in their runtime.
 */

/** Pipeline-level error descriptor */
export interface PipelineError {
  code: string;
  message: string;
  pipelineId?: string;
  cause?: any; // optional underlying error
  // TODO: include retryable flag and suggested remediation
}
