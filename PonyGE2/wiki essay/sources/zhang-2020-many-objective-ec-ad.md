---
tags: [combinatorial, feature-selection, evolutionary]
article_number: 22
section: Combinatorial Optimisation in Anomaly Detection
include: yes
authors: Zhang & Xie
year: 2020
last_updated: 2026-06-26
---

# Zhang & Xie (2020) — *Many-Objective EC for AD Feature Selection*

## Metadata
- **Raw note:** [Literature Review Articles/22.md](../../Literature%20Review%20Articles/22.md)
- **PDF:** Not downloaded (paywalled or no open-access copy)
- **Raw extraction:** [[../raw/zhang-2020-many-objective-ec-ad|zhang-2020-many-objective-ec-ad]] *(extraction failed — no PDF text)*
- **DOI / link:** https://doi.org/10.1002/cpe.5861
- **Include in Ch. 3?** Yes

## APA citation

Zhang, Z., & Xie, L. (2020). A many-objective integrated evolutionary algorithm for feature selection in anomaly detection. *Concurrency and Computation: Practice and Experience, 32*(22). [https://doi.org/10.1002/cpe.5861](https://doi.org/10.1002/cpe.5861)

## Application

Many-objective evolutionary feature selection for **network intrusion/anomaly detection** on the **NSL-KDD** benchmark. Proposes **IN-MaOEA** (integrated many-objective evolutionary algorithm) with evolution-strategy and dominance-strategy pools plus random probability strategy selection. Optimises five objectives simultaneously: number of selected features, false alarm rate, detection rate, precision, and accuracy. Classifier applied after FS (details in full paper; abstract mentions anomaly detection simulation on NSL-KDD).

## Reported results

Abstract and accessible metadata state IN-MaOEA improves detection performance while reducing feature count vs standard benchmarks, but **exact numeric values not found in accessible text** (paywalled PDF; local extraction failed). Multi-objective trade-off surface reported qualitatively only.

## Key results to cite

Multi-objective: features, false alarm, detection rate, precision, accuracy. No accessible numeric values — state explicitly in thesis prose.

## Thesis relevance

Supports evolutionary optimisation for anomaly-detection feature/structure selection with multiple detection objectives (not just forecast error). Parallel to thesis using detection-oriented fitness (AUC) rather than pure accuracy. Short paragraph only; do not invent metrics. Complements [[he-2021-mining-anomalies-subspaces]] (subspace search) and [[xue-2016-ec-feature-selection-survey]] (EC FS survey).

## Notes from PDF

*No local PDF available. Content below from article note and publisher abstract only.*

- **Algorithm:** IN-MaOEA — builds evolution-strategy pool and dominance-strategy pool; random probability strategy selection for convergence and diversity.
- **Objectives (5):** Feature count, false alarm rate, detection rate, precision, accuracy.
- **Dataset:** NSL-KDD (network intrusion simulation of US Air Force LAN).
- **Claim (abstract):** Effectively improves detection performance while reducing selected features.
- **Limitation:** No quantified results accessible without full paper; cite method design only.
- **Thesis gap:** Column/feature selection on tabular intrusion data; no time-series discord scoring, no telecom operational data, no grammar-defined hierarchies.

## Cross-references
- Concepts: [[combinatorial-optimisation]], [[feature-selection]]
- Related sources: [[xue-2016-ec-feature-selection-survey]], [[he-2021-mining-anomalies-subspaces]]
