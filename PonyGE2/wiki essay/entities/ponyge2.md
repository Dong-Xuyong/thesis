---
tags: [tool, grammatical-evolution, thesis]
source_count: 1
last_updated: 2026-06-26
---

# PonyGE2

## What it is

Open-source Python Grammatical Evolution toolkit (Fenton et al., 2017). Modular refactor of PonyGE/GEVA: grammar parsing, linear + derivation-tree mapping, pluggable operators, extensible fitness classes, reproducible runs with saved seeds/parameters. GitHub: [https://github.com/jmmcd/PonyGE2](https://github.com/jmmcd/PonyGE2).

## Architecture (from #28 PDF)

| Module | Role |
|--------|------|
| `ponyge.py` | Entry point / search loop |
| `representation/grammar.py` | BNF parsing (regex-based) |
| `representation/mapper.py` | Codon mapping, wrapping, invalid handling |
| `operators/` | Crossover, mutation, selection, replacement |
| `fitness/` | Problem-specific evaluators (extensible) |
| `stats/` | Generation logs, best-fitness plots |

Every individual carries both a linear genome and a derivation tree; linear or subtree operators can be mixed.

## Used in

- [[fenton-2017-ponyge2]] — tooling paper
- [[oneill-2001-grammatical-evolution]] — algorithm PonyGE2 implements
- [[oneill-2003-grammatical-evolution-book]] — grammar/fitness modularity PonyGE2 exposes via `.bnf` + fitness class
- Thesis `src/` — GE engine for hierarchy search with custom `hierarchy_auc` fitness

## Thesis relevance

Direct implementation of the structure-search component. Custom grammar in `grammars/mobai.pybnf` (and `mobai_nop.pybnf`) defines valid hierarchical aggregations; custom fitness computes AUC from MP discord scores on synthetically injected anomalies. Parameter files enable exact run reproduction (seeds, generation stats, best individual).

## Adding a thesis problem (PonyGE2 pattern)

Per Fenton et al.: (1) `.bnf` grammar in `grammars/`; (2) fitness class in `fitness/`; (3) optional dataset splits. Thesis follows this pattern with Mobai CDR data and STUMPY-based fitness rather than shipped Vladislavleva/regression benchmarks.

## Related

- [[grammatical-evolution]]
- [[mobai-grammar]]
