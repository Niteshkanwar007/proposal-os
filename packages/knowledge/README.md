# packages/knowledge/

The packages/knowledge package defines the canonical contracts for the Knowledge Layer used by ProposalOS. It intentionally contains NO storage implementation, retrieval logic, embeddings, or external-service integrations — only interfaces and types that describe how knowledge sources and repositories should behave.

Why an abstraction (contracts) and no implementation

- Flexibility: Consumers (reasoning stages, retrieval components) depend on stable contracts rather than a concrete storage backend. Implementations can be swapped (files, SQL, object store, vector DB) without changing business logic.
- Testability: Mock implementations can be used in unit tests to validate reasoning logic without requiring real data stores.
- Separation of concerns: The knowledge package focuses on data shapes and capability contracts; storage, indexing and retrieval are implemented elsewhere.

TODO:
- Define authentication and access-control contracts for knowledge providers.
- Add pagination and streaming contracts for very large datasets.
