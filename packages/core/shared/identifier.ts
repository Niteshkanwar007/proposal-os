/**
 * packages/core/shared/identifier.ts
 *
 * Identifier related types.
 */

/** UUID string (v4) representation. Consumers should validate format. */
export type UUID = string;

/** Minimal typed wrapper for external ids if needed in the future */
export interface ExternalId {
  provider: string;
  id: string;
}
