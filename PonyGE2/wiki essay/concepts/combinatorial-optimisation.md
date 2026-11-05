---
tags: [combinatorial, optimisation]
source_count: 9
last_updated: 2026-10-01
---

# Combinatorial Optimisation for Time Series and Anomaly Detection

## Definition

Selecting subsets of features, series, or subspaces from exponentially large search spaces — typically via evolutionary computation, greedy search, or genetic algorithms — with a fast scorer evaluating each candidate. Feature selection alone has **2^n** possible subsets for n features; exhaustive search impractical (Xue et al. 2016). EC methods valued for global search vs local optima in greedy/heuristic approaches.

## Papers that use it

- [[xue-2016-ec-feature-selection-survey]] — EC for feature selection survey; 2^n search space; GA/PSO/GP/ACO/DE paradigms
- [[linares-barrera-2024-evolutionary-fs-forecasting]] — EC halves features while preserving MAE
- [[yeh-2016-matrix-profile-i]] — candidates judged via MP evidence
- [[contreras-2024-ga-financial-feature-selection]] — GA + AUROC (optional)
- [[pietron-2025-ad-nev]] — GA evolves time-series subspaces + autoencoders for anomaly detection; mean F1 0.70
- [[he-2021-mining-anomalies-subspaces]] — subspace search for financial anomalies
- [[zhang-2020-many-objective-ec-ad]] — many-objective EC on NSL-KDD
- [[riahi-madvar-2021-mi-subspace-outliers]] — MI subspace selection (optional)
- [[li-2022-vae-ga-outlier-detection]] — VAE + GA over feature subsets

## Thesis application

GE over grammar-defined hierarchies is combinatorial structure search. Matrix Profile is the fast scorer; AUC is the fitness — mirroring He et al. (subspace + scorer) and Li et al. (scorer + evolutionary search). Xue et al. (2016) provides the general EC-for-selection framing.

## Open questions / gaps

No reviewed work combines combinatorial structure search with MP discord scoring on telecom data.

## Related concepts

- [[feature-selection]]
- [[subspace-anomaly-detection]]
- [[matrix-profile]]
- [[auc-fitness]]
- [[grammatical-evolution]]
