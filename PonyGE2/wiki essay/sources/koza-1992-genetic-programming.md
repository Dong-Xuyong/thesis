---
tags: [genetic-programming, foundational]
article_number: 25
section: Genetic Programming and Grammatical Evolution
include: ch2-mainly
authors: Koza
year: 1992
last_updated: 2026-06-26
---

# Koza (1992) — *Genetic Programming* (book)

## Metadata

- **Raw note:** [Literature Review Articles/25.md](../../Literature%20Review%20Articles/25.md)
- **PDF:** Not available (book; library access required)
- **DOI / link:** [https://mitpress.mit.edu/9780262527910/genetic-programming/](https://mitpress.mit.edu/9780262527910/genetic-programming/)
- **Include in Ch. 3?** Ch. 2 mainly

## APA citation

Koza, J. R. (1992). *Genetic programming: On the programming of computers by means of natural selection*. MIT Press.

## Application

Foundational GP framework: populations of program trees evolved via fitness-proportional selection, crossover, and mutation. Demonstrates symbolic regression, control (e.g., cart-pole), planning, and strategy search by evolving Lisp-like S-expressions directly in the phenotype space.

## Reported results

Foundational book with many benchmark examples across problem domains; no single headline quantified metric comparable to modern AUC/F1 reporting. Establishes the GP paradigm that GE later modifies via grammar mapping.

## Key results to cite

Foundational — establishes tree-based program evolution. Ch. 2 background only; Ch. 3 at most one sentence linking GE to GP.

## Thesis relevance

Gives Ch. 2 background for evolving program-like structures rather than tuning fixed parameters. Thesis uses Grammatical Evolution (PonyGE2), not direct GP tree crossover — GE decouples genotype search from grammar-constrained phenotypes. Do not duplicate book summary in applied Ch. 3 review.

## Notes from PDF

*No PDF on disk — ingested from article notes only.*

- **Core idea:** Programs are the individuals; variation operators act on syntax trees; fitness drives natural selection.
- **Contrast with thesis:** GP evolves trees directly; GE maps binary genotypes through BNF grammars — relevant because thesis aggregation trees must be syntactically valid (`mobai.pybnf`).
- **Ch. 3 usage:** Single bridging sentence only (e.g., "GE builds on GP but uses grammar-constrained mapping").

## Cross-references

- Concepts: [[genetic-programming]]
- Related sources: [[oneill-2001-grammatical-evolution]]
