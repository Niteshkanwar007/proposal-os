/**
 * ExecutionContext.ts
 *
 * Immutable context object passed to each stage during execution. It contains
 * information about the job, tracing identifiers, and any runtime metadata.
 */

/**
 * Execution context passed to stages and engines.
 */
export interface ExecutionContext {
  /** UUID for the JobDescription this pipeline is operating on */
  jobId: string;

  /** Unique trace id for this execution run (for distributed tracing) */
  traceId?: string;

  /** Timestamp when execution was requested */
  requestedAt?: string; // ISO 8601

  /** Arbitrary runtime metadata that stages may read (but should not mutate) */
  metadata?: Record<string, any>;

  // TODO: include requester identity, auth tokens (handled securely), and locale
}
