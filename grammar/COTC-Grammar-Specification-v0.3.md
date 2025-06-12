# COTC Prompt Grammar Specification v0.3 – Language-Level Standardization

## 0. Historical Framing: From JavaScript to TypeScript, From Prompts to Contracts

The transition from prompt engineering to COTC mirrors the evolution of untyped, free-form programming toward structured, contract-based software development. Just as `JavaScript` allowed flexible but error-prone coding and `TypeScript` introduced a type system to add safety, predictability, and tooling, COTC provides a governance layer that transforms natural language prompts into executable, verifiable contracts.

This analogy clarifies why GCPG is not just a syntactic refinement—it's an infrastructural upgrade that enables:
* Static validation of logical instructions (like a linter or type checker)
* Runtime enforcement of constraints and fallback handling
* Structured prompt auditing, refactoring, and modular reuse

By introducing constraints, structure, and validator tooling, GCPG enables prompts to move from expressive prototypes to infrastructure-grade, contract-governed interactions.

| Evolution Stage      | `JavaScript` → `TypeScript`                | Prompt Engineering → COTC              | CS Principle                           |
| -------------------- | ------------------------------------------- | -------------------------------------- | -------------------------------------- |
| Language Flexibility | Dynamic, permissive                        | Natural, expressive                    | Expressiveness vs. Safety Trade-off   |
| Core Problem         | Lack of safety, no type guarantees         | No validation, high drift risk         | Correctness by Construction            |
| Key Innovation       | Static typing, interfaces                  | Prompt contracts, GCPG grammar         | Formal Specification                   |
| Tooling Enablement   | Linting, IDE autocomplete, refactoring    | Validator chains, audit logs, fallback | Static Analysis & Runtime Verification |
| Developer Discipline | Gradual type adoption, strict modes       | Constraint tiers, step enforcement     | Progressive Enhancement                |
| Result               | Safer, scalable codebases                  | Trustworthy, modular AI interactions   | Compositional Reasoning                |

---

## 1. Introduction

As transformer-based language models become integral to enterprise systems, the need for prompt reliability has become critical. While most prompting practices remain ad hoc, the Chain of Thought Contract (COTC) framework proposes a governed approach to human-AI instruction—treating prompts not merely as inputs, but as executable contracts.

This document introduces the theory and rationale behind a constrained subset of English called *Governance-Compatible Prompt Grammar* (GCPG), which is designed to reduce ambiguity, increase model compliance, and enable enforceable execution tracing. GCPG now enters language-level standardization with defined syntax, instruction types, error constructs, and support for future validator tooling.

---

## 2. Motivation: Coordination Failures in Transformers

Natural language coordination—constructions like "and," "or," "if," and "however"—play a central role in human instruction. But transformer models do not reason over logical trees. Instead, they generate outputs based on statistical token associations and continuation probability. This leads to several recurring prompt failure modes:

* **OR-stashing**: Mixing multiple options into a single incoherent output
* **Partial conjunction**: Completing the first task in a chain but dropping the rest
* **Discourse drift**: Ignoring or inverting contrastive adverbs like "however" or "yet"
* **Unbound conditionals**: Treating "if A then B" as disconnected clauses

These issues become increasingly damaging in high-integrity or multi-phase tasks such as code generation, data validation, or multi-agent workflows.

---

## 3. Theoretical Assumptions

GCPG is grounded in five core claims:

### 3.1 Sequential Attention and Local Coherence Bias

Transformer models, including the most capable current LLMs, do not perform reasoning over formal logical structures by default. Instead, they rely on **sequential attention over token contexts**, producing output based on probabilistic continuation rather than deductive inference.

In the specific case of coordination structures—such as *and*, *or*, *if...then*, and *however*—transformers exhibit a **bias toward local coherence** (i.e., completing the most immediately probable phrase) rather than **global logical consistency** across the full instruction.

This often results in:
* Completing **only part** of a coordinated instruction (e.g., completing A but omitting B in "do A and B")
* **Blending mutually exclusive paths** (e.g., combining features of A and B in "do A or B")
* **Dropping contrastive logic** entirely (e.g., ignoring "however" and continuing the prior point)

This is not due to a lack of capability, but due to the architectural tendency to **maximize continuity**, not verify logical closure. Without enforced structure in the prompt, coordination is treated as a stylistic modifier—not a binding logical operator.

### 3.2 Ambiguity Amplification and Entropy Propagation

Prompt ambiguity introduces measurable instability in transformer model output. Ambiguous coordination inflates the entropy of the model's latent representation, increasing the likelihood of completion variance, logical inconsistency, and hallucination. Three primary ambiguity classes contribute to this effect:

* **Syntactic ambiguity**: Multiple valid parse trees exist (e.g., does "A and B or C" mean (A and B) or C, or A and (B or C)?)
* **Semantic ambiguity**: Logical scope of operators like "either," "not," or "both" is underdetermined
* **Pragmatic ambiguity**: Contextual cues (e.g., "however") may be misaligned or ignored

In aggregate, these forms of ambiguity reduce determinism in model behavior. GCPG mitigates this by requiring disambiguation at the prompt construction level—lowering completion entropy and aligning the token distribution with intended logical frames.

### 3.3 Compositional Semantics and Contractual Decomposition

Complex prompts are functionally equivalent to composed logical programs. The meaning of a compound instruction derives from the meaning of its components *plus* the logic governing their combination.

Traditional natural language prompts often violate compositionality by:
* Omitting preconditions or implicit assumptions
* Overloading conjunctions/disjunctions without scoping rules
* Encoding logical dependency via proximity rather than structure

GCPG reframes prompt construction as a **compositional contract model**:
* **Instruction = (Precondition, Action, Postcondition)**
* **Sequence = Ordered list of typed instructions**
* **Contract = Fully bound and scoping-valid composition of instructions**

This mirrors formal logic systems and software contracts, enabling prompts to be interpreted, audited, and executed with bounded scope and traceable semantics.

### 3.4 Deictic Unreliability and Context Collapse

Deictic terms—such as "this," "you," "now," "here," and "above"—introduce reference ambiguity that transformer models are ill-equipped to resolve reliably. This unreliability stems from the absence of a persistent world model, formal discourse tracking, or explicit anchoring of context over multiple steps.

Types of deixis and their risks include:
* **Person deixis**: "you," "we" → unclear role attribution (user? assistant? validator?)
* **Spatial deixis**: "here," "there" → ambiguous target references
* **Temporal deixis**: "now," "then," "today" → no stable temporal grounding
* **Discourse deixis**: "this section," "above" → no cross-sectional anchoring
* **Social deixis**: titles or honorifics may be misinterpreted as directives or formal logic

In COTC-compliant prompting, deixis must be either avoided or replaced with statically resolved references:
* Use `role: user`, `role: agent` instead of "you"
* Use structural references ("Step 2 of Validation Phase") instead of "this" or "above"
* Use ISO-8601 timestamps or static labels for time references

By collapsing implicit deixis into explicit anchors, GCPG ensures that all referents are computable, traceable, and context-free at execution time.

### 3.5 Punctuation as Structural Ambiguity

Punctuation marks such as commas, semicolons, dashes, and colons are often treated as logical operators in natural language. However, transformer models inconsistently recognize their scope, boundaries, or structural implications. This introduces additional syntactic ambiguity:

* **Comma scope ambiguity**: "A, B and C" may flatten or nest coordination incorrectly
* **Semicolon drift**: "X; Y" is often interpreted as soft continuation, not as a boundary
* **Colon misuse**: "If valid: continue" creates unresolved scope between condition and instruction
* **Parentheses and em dashes**: Often signal embedding or interrupting logic, but LLMs may flatten the structure

These punctuation artifacts frequently serve deictic or referential functions ("the following:", "see above—") that compound ambiguity. GCPG therefore mandates that logical relationships be made explicit through structural primitives rather than punctuation.

**Example Rewrites:**
* "Check X; if valid, continue" → `Condition: If X is valid → Action: Continue`
* "Validate input, then store result" → `Step 1: Validate input. Step 2: Store result.`

GCPG-compliant prompts treat punctuation only as stylistic delimiters. All logic must be conveyed via structured contracts.

---

## 4. Related Work

GCPG draws from:
* **Psycholinguistics**: Models of sentence parsing, working memory, and ambiguity resolution (Just & Carpenter, 1992)
* **Software contracts**: Design by Contract (Meyer, 1997) and declarative interface constraints
* **Prompt engineering**: Chain-of-Thought prompting (Wei et al., 2022), ReAct prompting (Yao et al., 2023)
* **Governance systems**: AI alignment protocols, constitutional AI (Anthropic, 2023), and AIQA's COTC v2.0

However, unlike descriptive studies, GCPG proposes a prescriptive grammar for AI compliance under contract.

---

## 5. Scope of COTC Prompt Grammar

This grammar applies to:
* Any prompt issued under a COTC-compliant contract
* Any model interaction requiring deterministic, phase-structured, or multi-agent execution
* Tasks involving sequential operations, validated decision paths, or fallback logic

Out of scope:
* Open-ended creative generation
* Exploratory or meta-prompting without constraint enforcement

---

## 6. Prompt Grammar Overview

### Core Grammar
```
Coordination ::= Sequential | Conditional | Choice | Fallback
Sequential ::= Step+
Step ::= OrderedInstruction [Precondition] [Postcondition]
Choice ::= Option+ (declared, exclusive)
Conditional ::= Guard → Action
Fallback ::= TryBlock [OnError] [EnsureBlock]
```

### Terminals
* `Step`: Indexable instruction
* `OrderedInstruction`: A typed operation (see 6.1)
* `Guard`: Boolean condition
* `TryBlock`: Primary attempt
* `OnError`: Failure handling
* `EnsureBlock`: Guaranteed follow-up

**Example:**
```
Step 3 (Validate): Ensure token is present
[Precondition: input.token != null]
[Postcondition: validationResult = true]
```

**Expression Syntax**: Preconditions and postconditions use boolean expressions following JavaScript-like syntax. Supported operators include equality (`==`, `!=`, `===`), comparison (`>`, `<`, `>=`, `<=`), and logical operators (`&&`, `||`, `!`). References to variables use dot notation (`input.token`, `response.status`). See Appendix B for the complete expression grammar.

---

## 6.1 Instruction Types

| Type      | Description                           |
| --------- | ------------------------------------- |
| Declare   | Bind configuration or constants       |
| Transform | Stateless transformation              |
| Validate  | Structural/predicate logic            |
| Mutate    | Changes system state (DB, file, etc.) |
| Invoke    | Calls external APIs or agents         |

**Example:**
```
Step 1 (Declare): Schema = Zod  
Step 2 (Transform): CSV → JSON  
Step 3 (Validate): list.length > 0  
Step 4 (Mutate): Save record
```

---

## 6.2 Choice and Binding

```
Choice: Output format  
Option A: JSON  
Option B: YAML  
Declare: format = JSON
```

Instructions must align with declared path.

---

## 6.3 Structured Nesting & Branches

**ConditionGroup:**
```
- Condition A  
- AND:  
    - Condition B  
    - Condition C  
THEN: Action X
```

**Branch:**
```
Branch:  
- If status = 200 → Handle success  
- If status = 401 → Re-authenticate  
- Else → Log error
```

---

## 6.4 Error Handling & Fallbacks

```
Try: Upload file  
OnError: Notify user  
Ensure: Cleanup temp folder
```

---

## 7. Validator Patterns & Rewrites

GCPG validators will support:
* **Step decomposition** for "and"/"then"
* **Choice enforcement** with path tracking
* **Disjunction detection** and forced resolution
* **Punctuation flattening**

📌 *A full EBNF grammar will be released in v0.4 to enable compiler targets and AST-based prompt tooling.*

---

## 8. Cognitive Load and Structural Composability

GCPG lowers cognitive overhead by:
* Replacing implicit coordination with explicit steps
* Making preconditions and outcomes auditable
* Supporting prompt debugging via structural clarity

While less "natural," GCPG is optimized for reliability, and usability will be restored through form-based tools, IDE integrations, and translators.

---

## Appendix A: Dual-Schema Representation for COTC Contracts

To support both runtime enforcement and long-term contract governance, the COTC framework adopts a **dual-schema model**:

### A.1 Purpose
* **JSON Schema** provides compatibility with web-based applications, LLM plugins, real-time validation layers, and developer tooling.
* **XML Schema (XSD)** offers durable, declarative contract encoding suited to regulated environments, archival systems, and structured policy review.

GCPG prompts—defined under contract—may be serialized, validated, and interpreted in either or both formats.

---

### A.2 Conceptual Mapping

| GCPG Element           | JSON Representation                           | XML Representation                       |
| ---------------------- | --------------------------------------------- | ---------------------------------------- |
| `Step`                 | Object with `instruction_type`, `instruction` | `<step type="Transform">...</step>`      |
| `Choice`               | `choices.options[]` + `declared_value`        | `<choice><option>A</option>...</choice>` |
| `ConditionGroup`       | Nested conditional `constraints`              | `<conditionGroup>...</conditionGroup>`   |
| `Fallback` (try/catch) | `fallbacks.try`, `on_error`, `ensure`         | `<try>...</try><onError>...</onError>`   |

---

### A.3 Design Principles
* **Canonical source**: XML may serve as the authoritative grammar for validator compilation, with JSON derived.
* **Runtime-first validation**: JSON Schemas are preferred for execution phase.
* **Archival and traceability**: XML contracts better support longitudinal auditing, policy mapping, and static type enforcement.

---

### A.4 Example: Parallel Serialization

**JSON:**
```json
{
  "contract_id": "validate-token-001",
  "role": "validator",
  "constraint_tier": 1,
  "task_type": "validation",
  "steps": [
    {
      "step_id": "step-1",
      "instruction_type": "Validate",
      "instruction": "Ensure token is not null",
      "precondition": "input.token != null",
      "postcondition": "validationResult === true"
    }
  ]
}
```

**XML:**
```xml
<contract id="validate-token-001" role="validator" tier="1">
  <step id="step-1" type="Validate">
    <instruction>Ensure token is not null</instruction>
    <precondition>input.token != null</precondition>
    <postcondition>validationResult === true</postcondition>
  </step>
</contract>
```

---

### A.5 Future Integration
* Appendix B (v0.4) will define a formal **GCPG XSD**
* A conversion layer (`GCPG.js` or `GCPG.xsl`) will map JSON ↔ XML
* Validators will support both schema formats as first-class citizens under the COTC runtime model

This dual-schema model advances COTC toward full ecosystem portability, regulatory alignment, and infrastructure-grade composability.

---

## Appendix B: Formal GCPG Grammar (EBNF)

This appendix defines the formal grammar for Governance-Compatible Prompt Grammar (GCPG) using Extended Backus–Naur Form (EBNF). This grammar is designed to support compiler-grade validators, structural prompt editors, and AST-based analyzers.

```ebnf
Contract         ::= Header Section+ [Appendix]
Header           ::= 'contract_id' ':' Identifier
                   | 'role' ':' Role
                   | 'constraint_tier' ':' Integer
                   | 'task_type' ':' TaskType
Section          ::= StepBlock | ChoiceBlock | ConditionBlock | FallbackBlock
StepBlock        ::= 'Step' Integer ':' Instruction [Precondition] [Postcondition]
Instruction      ::= InstructionType ':' String
InstructionType  ::= 'Declare' | 'Transform' | 'Validate' | 'Mutate' | 'Invoke'
Precondition     ::= '[' 'Precondition' ':' Expression ']'
Postcondition    ::= '[' 'Postcondition' ':' Expression ']'
ChoiceBlock      ::= 'Choice' ':' Identifier 'Option' ChoiceOption+
ChoiceOption     ::= 'Option' Identifier ':' String
ConditionBlock   ::= 'ConditionGroup' ':' ConditionLogic
ConditionLogic   ::= LogicalGroup | ConditionBranch+
LogicalGroup     ::= ('AND' | 'OR') ':' ConditionBranch+
ConditionBranch  ::= 'If' Expression '→' Action
Action           ::= StepReference | Instruction
StepReference    ::= 'Step' Integer
FallbackBlock    ::= 'Try' ':' Instruction [OnError] [EnsureBlock]
OnError          ::= 'OnError' ':' Action
EnsureBlock      ::= 'Ensure' ':' Instruction
Role             ::= 'validator' | 'executor' | 'auditor' | 'generator'
TaskType         ::= 'validation' | 'bug_fix' | 'enhancement' | 'feature' | 'maintenance'
Expression       ::= BooleanExpression | ComparisonExpression | Identifier
BooleanExpression ::= Expression ('==' | '!=' | '>' | '<') Expression
ComparisonExpression ::= Identifier ('!=' | '===') Literal
Literal          ::= String | Integer | 'true' | 'false' | 'null'
Identifier       ::= String
String           ::= '"' .* '"'
Integer          ::= Digit+
Digit            ::= '0'..'9'
```

This EBNF spec is synchronized with the JSON and XML schema plans and will serve as the canonical reference for GCPG-compliant prompt contracts.

**Complete Contract Example:**
```ebnf
# Example expansion of a full contract:
Contract: "user-validation-flow"
  Header: contract_id="validate-user-001", role="validator", constraint_tier=2
  StepBlock: Step 1 (Declare): userSchema = Zod
  ConditionBlock: If input.userId != null → Step 2
  StepBlock: Step 2 (Validate): Check user exists
    [Precondition: input.userId !== ""]
    [Postcondition: userRecord.found === true]
  FallbackBlock: Try Step 3, OnError Step 4
  StepBlock: Step 3 (Transform): Format user data
  StepBlock: Step 4 (Invoke): Log validation failure
```

---

## Appendix C: Canonical Schema Bundle (JSON + XML)

To operationalize GCPG-based contracts, the Chain of Thought Contract (COTC) framework defines two interoperable schema representations:
* **JSON Schema**: Used for programmatic validation, runtime enforcement, and API compatibility.
* **XML Schema (XSD)**: Used for archival, regulated, and document-based environments where schema fidelity, tooling support, and long-term traceability are required.

Both schemas define the same logical contract structure and are derived from the GCPG EBNF (see Appendix B).

---

### C.1 JSON Schema (v2.0)
* Filename: `cotc.schema.comprehensive.v2.json`
* `$id`: `cotc.schema.comprehensive.v2.json`
* Format: JSON Schema Draft 2020-12
* Primary Use: AI validators, Supabase/TypeScript apps, OpenAPI middleware
* Key Fields: `contract_id`, `role`, `task_type`, `constraints[]`, `governance`

Example reference:
```json
{
  "contract_id": "validate-token-001",
  "role": "validator",
  "constraint_tier": 1,
  "task_type": "validation",
  "constraints": [ { "field": "token", "type": "presence", "violation_tier": 0 } ]
}
```

---

### C.2 XML Schema (v2.0)
* Filename: `cotc.schema.comprehensive.v2.xsd`
* `xmlns`: `http://cotc.schema/v2`
* Primary Use: Enterprise contract governance, archival validation, schema-based tooling
* Supports: Namespaced validation, structured audit pipelines, long-term compliance

Example reference:
```xml
<contract id="validate-token-001" role="validator" tier="1">
  <step id="step-1" type="Validate">
    <instruction>Ensure token is not null</instruction>
    <precondition>input.token != null</precondition>
    <postcondition>validationResult === true</postcondition>
  </step>
</contract>
```

---

### C.3 Schema Alignment Commitments
* All JSON and XML schemas are generated from the same canonical EBNF model (Appendix B).
* Each schema version will include a changelog and mapping reference table.
* A schema translator (`cotc-schema-transform`) will be released to ensure round-trip safety between formats.

---

## Glossary

**COTC (Chain of Thought Contract)**: A governance framework that treats AI prompts as executable contracts with explicit preconditions, postconditions, and validation rules.

**GCPG (Governance-Compatible Prompt Grammar)**: A constrained subset of English designed to reduce ambiguity in AI instructions through structured syntax and explicit logical operators.

**Precondition**: A boolean expression that must be true before an instruction can execute. Defines the required state or input conditions.

**Postcondition**: A boolean expression that should be true after an instruction completes successfully. Defines the expected outcome or state change.

**Deixis/Deictic Terms**: Context-dependent reference words like "this," "you," "here," "now" that require external context to resolve their meaning. GCPG avoids these in favor of explicit references.

**Entropy Propagation**: The tendency for ambiguous language constructs to increase uncertainty in AI model outputs, leading to higher variance in completions and reduced determinism.

**Sequential Attention Bias**: The architectural tendency of transformer models to prioritize local token coherence over global logical consistency across long instruction sequences.

**Coordination Structures**: Linguistic constructs that connect clauses or instructions, including conjunctions ("and," "but"), disjunctions ("or," "either"), and discourse markers ("however," "therefore"). See Section 2 for detailed analysis of coordination failures in transformer models.

**Conjunctions**: Words that connect grammatically equal elements. In GCPG context, includes coordinating conjunctions (and, but, or, so), subordinating conjunctions (if, when, because), and correlative conjunctions (either...or, both...and). Traditional conjunctions are replaced with explicit structural primitives in GCPG to avoid ambiguity.

**Disjunctions**: Logical "or" operations that present multiple exclusive options. In natural language prompts, disjunctions often lead to "OR-stashing" where AI models blend incompatible choices rather than selecting one path.

**Discourse Markers**: Transition words that signal relationships between ideas (however, therefore, meanwhile, furthermore). These often fail in AI processing due to their pragmatic rather than syntactic nature.

**Contractual Decomposition**: The process of breaking down complex natural language instructions into atomic, typed operations with explicit dependencies and validation rules.

**Instruction Types**: Categorical classification of prompt operations: Declare (bind values), Transform (stateless operations), Validate (check conditions), Mutate (change state), Invoke (call external systems).

**Constraint Tier**: A numerical level indicating the strictness of validation and governance applied to a COTC contract, with higher tiers requiring more comprehensive compliance checking.