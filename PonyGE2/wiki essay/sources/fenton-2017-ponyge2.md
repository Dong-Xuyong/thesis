---
tags: [grammatical-evolution, ponyge2, tooling]
article_number: 28
section: Genetic Programming and Grammatical Evolution
include: yes
authors: Fenton et al.
year: 2017
last_updated: 2026-06-26
---

# Fenton et al. (2017) — *PonyGE2*

## Metadata

- **Raw note:** [Literature Review Articles/28.md](../../Literature%20Review%20Articles/28.md)
- **Raw extraction:** [[../raw/fenton-2017-ponyge2|PDF text extraction]]
- **PDF:** [Fenton_2017_PonyGE2.pdf](../../Literature%20Review%20PDFs/07_Genetic_Programming_Grammatical_Evolution/Fenton_2017_PonyGE2.pdf)
- **DOI / link:** [https://doi.org/10.1145/3067695.3082469](https://doi.org/10.1145/3067695.3082469)
- **Include in Ch. 3?** Yes

## APA citation

Fenton, M., McDermott, J., Fagan, D., Forstenlechner, S., Hemberg, E., & O'Neill, M. (2017). PonyGE2: Grammatical evolution in Python. In *Proceedings of the Genetic and Evolutionary Computation Conference Companion* (pp. 1194-1201). ACM. [https://doi.org/10.1145/3067695.3082469](https://doi.org/10.1145/3067695.3082469)

## Application

Open-source Python reimplementation of GE (successor to single-file PonyGE and Java GEVA). Modular package: `ponyge.py` entry point, separate modules for grammar parsing, linear/ tree mapping, operators, fitness evaluation, and stats. Ships four benchmark problems (string-match, regression, classification, Pymax) plus datasets and `.bnf` grammars. GitHub: [https://github.com/jmmcd/PonyGE2](https://github.com/jmmcd/PonyGE2).

## Reported results

Tooling paper; no benchmark performance headline. Documents reproducibility features: auto-saved parameter files with random seeds, best-fitness generation plots, best-individual logs, and exact run recreation given same grammar, fitness, and datasets.

## Key results to cite

Implementation reference — not a performance claim. Modular Python GE with saved seeds/parameters, benchmark grammars, dual linear + derivation-tree representations, pluggable fitness classes.

## Thesis relevance

Direct implementation of thesis GE engine (`src/` fork/adaptation of PonyGE2). Custom `.bnf` grammar (`mobai.pybnf`) and custom fitness (`hierarchy_auc`: MP discord → synthetic AUC) plug into standard PonyGE2 control flow. Cross-reference methodology chapter; no PonyGE2 benchmark numbers in results chapter.

## Notes from PDF

- **Architecture (Fig. 1):** `algorithm/` (mapper, search loop, step), `operators/` (crossover, mutation, init, replacement), `representation/` (grammar, individual, derivation tree), `fitness/` (classification, regression, string match, extensible).
- **Control flow (Fig. 2):** All blocks parametrisable — custom step loops and search engines without recompiling (vs C/Java GE releases).
- **Dual representation:** Every individual has linear genome *and* full derivation tree; linear or subtree operators usable interchangeably.
- **Grammar parsing:** BNF via regular expressions; supports variable-range productions (e.g., `<var> ::= x1 | ... | xN`) to avoid hard-coding feature counts — relevant pattern for scalable `mobai.pybnf`.
- **Mapping:** Linear codon-based mapping with wrapping, invalid-individual handling, unit-production support; grammar design strongly affects init quality.
- **Operators:** Tournament/truncation selection; four linear + one subtree crossover; codon/genome mutation; generational or steady-state replacement.
- **Fitness extensibility:** New problems need `.bnf` in `grammars/`, fitness class in `fitness/x.py`, optional `datasets/x/Train.csv` — thesis adds custom fitness module for MP+AUC.
- **Reproducibility:** Parameter files capture all settings including seeds; results folders per run.
- **Pymax example:** Grammar generates executable Python functions — demonstrates arbitrary-language output from BNF.

## Cross-references

- Concepts: [[grammatical-evolution]]
- Related sources: [[oneill-2001-grammatical-evolution]], [[oneill-2003-grammatical-evolution-book]]
- Entities: [[ponyge2]], [[mobai-grammar]]
