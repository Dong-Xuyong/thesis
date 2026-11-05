---
tags: [genetic-programming, foundational]
source_count: 1
last_updated: 2026-06-26
---

# Genetic Programming

## Definition

Evolutionary approach that evolves program-like structures (trees, graphs) directly in phenotype space via crossover and mutation, using fitness-proportional selection to solve symbolic regression, control, and search problems.

## Papers that use it

- [[koza-1992-genetic-programming]] — foundational book; tree-based program evolution with natural selection (Ch. 2 mainly)

## Thesis application

Background for Ch. 2. GE builds on GP but uses grammar mapping instead of direct tree crossover — search operates on genotypes while BNF guarantees valid aggregation trees. O'Neill & Ryan (2001) compare GE vs GP: GP ramped half-and-half init can advantage GP on regular symbolic targets; GE more consistent across domains. Ch. 3 cites at most one sentence linking GE to GP.

## Open questions / gaps

Not directly used in thesis pipeline — GE via PonyGE2 is the implementation choice. GP tree operators differ from GE linear-genome operators (PonyGE2 supports both representation types).

## Related concepts

- [[grammatical-evolution]]
