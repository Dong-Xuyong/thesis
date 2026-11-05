---
tags: [grammar, thesis]
source_count: 3
last_updated: 2026-06-26
---

# Mobai Grammar (mobai.pybnf)

## What it is

BNF grammar file(s) in `grammars/` defining valid hierarchical aggregation structures over Mobai CDR categories. Variants include `mobai.pybnf` and `mobai_nop.pybnf`. Parsed by PonyGE2's regex-based grammar module; each phenotype is a derivation tree mapped to an executable aggregation over switch/CDR time series.

## Design pattern (from GE literature)

- **O'Neill & Ryan (2001):** BNF productions guarantee syntactically valid programs; genotype search unconstrained.
- **O'Neill & Ryan (2003):** Grammar and fitness independently specified — change aggregation vocabulary without changing AUC/MP fitness.
- **PonyGE2 (Fenton et al.):** Variable-range productions avoid hard-coding feature counts; grammar quality affects random-init distribution.

## Used in

- Thesis Ch. 4 — methodology
- [[fenton-2017-ponyge2]] — framework consuming `.bnf` grammars; documents grammar extensibility pattern
- [[oneill-2001-grammatical-evolution]] — theoretical basis for BNF-constrained structure generation
- [[oneill-2003-grammatical-evolution-book]] — grammar engineering guidance

## Thesis relevance

Decouples **search space** (GE genotypes) from **valid structures** (grammar productions). Each phenotype is an interpretable aggregation tree mapped to a time series for Matrix Profile discord scoring. Analogous to Li et al.'s GA subspace encoding — but grammar enforces telecom-valid hierarchies rather than arbitrary feature subsets.

## Related

- [[grammatical-evolution]]
- [[mobai-dataset]]
- [[ponyge2]]
