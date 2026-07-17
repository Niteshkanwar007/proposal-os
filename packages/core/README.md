# packages/core/

The packages/core package contains canonical TypeScript domain contracts used across the monorepo. It intentionally contains NO business logic, services, or implementation details — only interfaces and types that form the single source of truth for data exchanged between pipeline stages.

Why zero business logic

- Decoupling: Keeping contracts separate from implementation prevents accidental coupling between domain models and service behavior. Implementations in other packages import these interfaces and remain swappable without type drift.
- Testability: With a stable domain contract, unit and integration tests can assert behavior against the same types used in production.
- Traceability: The canonical types make it explicit where provenance, confidence, and lineage fields belong.
- Evolution: Schema changes are managed through schema_version and coordinated updates to these type definitions. TODO: define versioning policy and deprecation guidelines.

TODO:
- Add CONTRIBUTING notes for how to change domain contracts safely (migration strategy, version bumps, compatibility rules).
