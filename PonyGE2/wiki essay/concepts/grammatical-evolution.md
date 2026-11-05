---
tags: [grammatical-evolution, method]
source_count: 4
last_updated: 2026-06-26
---

# Grammatical Evolution

## Definition

Evolutionary algorithm that maps a variable-length binary/genotype string to a phenotype via a BNF grammar, guaranteeing syntactically valid structures. Decouples search space (genotype) from solution language (grammar).

## Papers that use it

- [[oneill-2001-grammatical-evolution]] — core GE paper; 8-bit codons select BNF productions; wrapping; symbolic integration/Santa Fe/symbolic regression benchmarks; GE beats GP on 2/3 domains
- [[oneill-2003-grammatical-evolution-book]] — grammar design decoupled from fitness; operator and grammar-engineering detail
- [[fenton-2017-ponyge2]] — modular Python implementation; dual linear + tree representation; pluggable fitness and `.bnf` grammars
- [[koza-1992-genetic-programming]] — GP foundation GE builds on (Ch. 2 mainly)

## Thesis application

BNF grammar (`mobai.pybnf`) defines valid hierarchical aggregation trees over CDR categories. PonyGE2 evolves genomes; fitness = AUC from MP discord on injected anomalies. O'Neill & Ryan (2003) modularity principle: edit grammar to change search space, edit fitness to change quality metric — thesis uses MP+AUC fitness independent of aggregation grammar.

## Mechanism (from #26 PDF)

1. Binary genome → codons (8 bits) → production rule indices
2. BNF expansion until all terminals (wrapping if genome exhausted)
3. Phenotype evaluated by fitness function
4. EA operators on genotype; phenotype always grammar-valid

## Open questions / gaps

GE applied to telecom hierarchy search for anomaly detection is novel in reviewed literature. PonyGE2 thesis fork adds custom fitness (not shipped benchmark problems).

## Related concepts

- [[genetic-programming]]
- [[combinatorial-optimisation]]
- [[hierarchical-time-series]]
- [[matrix-profile]]
- [[auc-fitness]]
