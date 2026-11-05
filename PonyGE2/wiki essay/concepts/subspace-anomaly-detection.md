---
tags: [subspace, anomaly-detection, combinatorial]
source_count: 4
last_updated: 2026-10-01
---

# Subspace Anomaly Detection

## Definition

Anomalies that are visible only in certain subsets of dimensions or feature combinations — requiring search over O(2^N) subspaces before scoring.

## Papers that use it

- [[he-2021-mining-anomalies-subspaces]] — two-module system (subspace search + DTW discord); greedy MAP 0.86 / 1345 s vs evolutionary MAP 0.72 / 87.62 s; 600M+ transactions, 415 MCCs, 16 trials; production 22 min vs 1.5 min/month
- [[riahi-madvar-2021-mi-subspace-outliers]] — MI-based subspace selection (optional)
- [[li-2022-vae-ga-outlier-detection]] — VAE + GA; AUC up to 0.970 on benchmark datasets
- [[pietron-2025-ad-nev]] — GA evolves multivariate time-series subspaces (SWaT, WADI, MSL, SMAP); point-wise F1 mean 0.70

## Thesis application

Strongest structural analogy to thesis: anomalies may appear only in the **right aggregation** of telecom dimensions (cf. He et al. ATM attack invisible on individual or global views). Thesis uses grammar → aggregated series → MP discord (two-stage: search structure, then score). He et al. greedy/evolutionary speed-quality trade-off directly informs thesis design choices.

## Open questions / gaps

Financial subspace papers use MCC transaction dimensions and DTW scorers; none use Matrix Profile or telecom CDR hierarchies. All-dimension and single-dimension baselines fail worse than random in He et al. — underscores that wrong aggregation destroys detection.

## Related concepts

- [[combinatorial-optimisation]]
- [[feature-selection]]
