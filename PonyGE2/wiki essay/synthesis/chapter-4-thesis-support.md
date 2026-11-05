---
tags: [synthesis, methodology, chapter-4]
source_count: 0
last_updated: 2026-07-30
---

# Chapter 4 vs Implementation — Thesis Support

Audit of `Latex Document/4-materials-methodology.tex` against the Mobai PonyGE2 path (`hierarchy_auc`, `mobai_utils`, `mobai_nop.pybnf`, `parameters/mobai.txt`).

## Verdict

Implementation already encodes the four thesis pillars; Chapter 4 prose mostly does not. **Strongest:** §4.1. **Weakest:** §4.5 Hierarchical Data Structures (near-empty stub of the searchable hierarchy object).

## Section table

| Section | LaTeX | Supports thesis? | In code? | Missing | Fix |
|---------|-------|------------------|----------|---------|-----|
| §4.1 Problem Formulation | Strong | Yes — aggregation view + Partner exclusion | Yes | Crisp optimisation statement; 4.2M vs ~1M | P2 |
| §4.2 Adopted Methodology | Partial | Weakly — says “random” aggregations | Pipeline exists | Four-pillar framing; typos | P1 |
| §4.3 Model Development | Weak | No as written — figure only | Yes — `hierarchy_auc` + STUMPY | Fitness loop documentation | P0 |
| §4.3.1 Genome Structure | Partial | Thinly | Yes — codon params | Finish prose; MAX_TREE_DEPTH 10 vs 20 | P1 |
| §4.4 Anomaly Injection | Partial | Yes — μ±3σ / 168h | Partial — labels in CSV; `set_leaf` | Align_Timestamps; rate clarify | P1 |
| §4.5 Hierarchical Data Structures | Stub | Almost no | Yes — `pheno_to_dict` etc. | Phenotype→leaf worked example | P0 |
| §4.6 GP Implementation | Partial | Partially — params table | Yes — grammar + search | BNF + evaluate pseudocode | P0 |

## Thesis pillars

| Pillar | In Ch. 4 prose? | Implemented? | Gap |
|--------|-----------------|--------------|-----|
| Structure search (GE + BNF) | §4.6 params; grammar in comments | `mobai_nop.pybnf` | Write grammar narrative |
| Matrix Profile scorer | Named in §4.2 only | `stumpy.stump` in `calculate_AUC` | Document in §4.3 |
| Telecom operational data | §4.1 strong | `datasets/Mobai/` | Minor count reconcile |
| AUC on synthetic injection | §4.4 partial | `hierarchy_auc` | Link injection → fitness |

## Cross-references

- Concepts: [[auc-fitness]], [[matrix-profile]], [[grammatical-evolution]], [[hierarchical-time-series]]
- Entities: [[ponyge2]], [[mobai-grammar]], [[mobai-dataset]], [[stumpy]]
- Synthesis: [[research-gap]]
