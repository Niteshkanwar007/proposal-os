# packages/reasoning/

The packages/reasoning package defines the execution framework and contracts for orchestrating the ProposalOS reasoning pipeline. It intentionally contains NO runtime implementation, AI calls, or business logic — only abstract classes, interfaces and types that describe the execution model.

Why no implementation here

- Provide a stable, language-level contract for pipeline engines and stages to implement.
- Encourage multiple runtime implementations (synchronous, async, distributed, single-process) to adhere to the same API surface.
- Allow teams to write tests and mock implementations against well-documented interfaces.

TODO:
- Document recommended semantics for retries, idempotency, and timeouts.
- Define integration examples referencing packages/core types.
