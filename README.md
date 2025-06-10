Here is the updated `README.md` tailored for the current `cotc.schema.v1.json` and project scope, reflecting your governance-first positioning:

---

```markdown
# Chain of Thought Contract (COTC) Governance Framework

A governance-grade system for managing constraint-based AI interactions. COTC formalizes instruction-following into structured, auditable contracts using JSON schemas, validator tiers, and role-defined execution layers.

---

## Overview

The **Chain of Thought Contract (COTC)** framework introduces constraint enforcement into AI-driven workflows. Built to operate beyond the limitations of prompt engineering, COTC enables verifiable structure, behavior monitoring, and deterministic escalation in systems powered by probabilistic models.

This repository includes:

- ✅ Formal COTC schemas
- ⚙️ Validator contracts and audit infrastructure
- 🧪 React-based runtime monitoring
- 📚 Case studies and specification guides

---

## Key Features

### 🧩 JSON Contract Specification
- Typed enforcement of roles, tiers, and constraints
- Schema-based validation of content, pattern, and structural integrity
- Violation handling via `violation_tier`, `fallback_instructions`, and audit fields

### 🔍 React Runtime Validator (`startReactRuntimeMonitoring`)
- Tier 4 corruption detection for React environments
- Detects lifecycle hook tampering (e.g., `useEffect` mutation)
- Compatible with sandboxed or AI-generated runtime environments

### 📜 Canonical Contracts
- `contract.recipe.v1.cotc.json`: Recipe generation enforcement
- `contract.narcissus.v1.cotc.json`: Self-governed agent identity
- `contract.react.runtime.v1.cotc.json`: Runtime environment assurance

### 📖 Documentation & Case Studies
- Lovable collapse (`AIQA-003`) and React corruption (`AIQA-004`) case files
- Design rationale aligned with systems evolution (C→C++, JS→TS)
- Structured deployment paths and adoption guides

---

## Repository Layout

```

./
├── contracts/               # JSON contract files
│   ├── contract.recipe.v1.cotc.json
│   ├── contract.narcissus.v1.cotc.json
│   └── contract.react.runtime.v1.cotc.json
├── schema/
│   └── cotc.schema.v1.json  # Local schema (self-contained)
├── validators/
│   └── startReactRuntimeMonitoring.ts
├── cases/
│   ├── AIQA-003-lovable.md
│   └── AIQA-004-react.md
├── philosophy/
│   └── cotc-vs-prompting.md
└── deliverables.cotc.json   # Project contract dependency map

````

---

## Usage

### Install dependencies (if using validation tooling):

```bash
npm install ajv
````

### Validate a COTC contract

Use your validator of choice (e.g., `Ajv`) against the schema:

```ts
import Ajv from "ajv";
import schema from "./schema/cotc.schema.v1.json";

const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(myContract);

if (!valid) console.error(validate.errors);
```

### React Runtime Validator

```ts
import { startReactRuntimeMonitoring } from './validators/startReactRuntimeMonitoring';

useEffect(() => {
  const stopMonitoring = startReactRuntimeMonitoring();
  return () => stopMonitoring();
}, []);
```

---

## Status & Validation

All contract files conform to `cotc.schema.v1.json`. Violations are tiered:

| Tier | Description                        | Action                     |
| ---- | ---------------------------------- | -------------------------- |
| 0    | Structural collapse                | Halt execution, invalidate |
| 1    | Simulation drift / override        | Escalate with audit        |
| 2    | Constraint violation (e.g. schema) | Fallback or warn           |
| 3    | Missing optional data              | Gracefully continue        |
| 4    | Informational                      | Log only                   |

---

## License

Licensed under the **Apache 2.0 License**.
See [LICENSE](./LICENSE) for terms and usage.

---

## Contributions

We welcome high-integrity contributions. Please ensure:

* New contracts comply with `cotc.schema.v1.json`
* All validator utilities include fallback and audit logic
* Case files are reproducible and anonymized if derived from live deployments

Submit PRs with a clear validator role or contract ID in the title.

---

## Citation

If referencing this project in research or industry documentation, cite:

> **Chain of Thought Contract (COTC) Governance Framework**
> [https://github.com/your-repo/cotc](https://github.com/your-repo/cotc)

```

Let me know if you'd like it versioned with COTC metadata (`contract.readme.v1.cotc.json`) for internal traceability.
```
