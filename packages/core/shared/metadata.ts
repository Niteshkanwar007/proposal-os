/**
 * packages/core/shared/metadata.ts
 *
 * Generic metadata utilities used by domain types.
 */

/** Generic key/value bag for extensible metadata. Values are deliberately untyped to allow flexibility. */
export type Metadata = Record<string, any>;
