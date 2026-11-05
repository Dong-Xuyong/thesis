---
tags: [evaluation, auc, fitness]
source_count: 3
last_updated: 2026-06-26
---

# AUC-Based Fitness Evaluation

## Definition

Using ROC-AUC (or AUROC) as the objective when ranking candidate models or structures, especially when labels come from controlled synthetic injection rather than expert annotation.

## Papers that use it

- [[mefleh-2025-mahalanobis]] — AUC 0.77→0.99 with better KPI representation (telecom)
- [[contreras-2024-ga-financial-feature-selection]] — GA wrapper fitness = AUROC; best 0.61–0.62 on Bitcoin/Ibovespa daily direction (optional)
- [[li-2022-vae-ga-outlier-detection]] — VAEGA AUC up to 0.970 on benchmark datasets

## Thesis application

Thesis fitness = `hierarchy_auc`: ROC-AUC on synthetically injected anomalies (μ±3σ, 168h windows) for each GE candidate aggregation. Contreras et al. validates the GA + AUROC fitness *design* on a different task (financial direction); modest AUROC (~0.6) shows the metric can discriminate among feature subsets even when absolute performance is limited. **Not directly comparable** to expert-label range-F1 in telecom papers without qualification.

## Open questions / gaps

Synthetic injection AUC evaluates separability under known perturbations; real NOC labels may behave differently (see González et al. modest F1 on TELCO). Zhang (2020) optimises detection rate and false alarm alongside accuracy but without accessible AUC values.

## Related concepts

- [[combinatorial-optimisation]]
- [[feature-selection]]
- [[matrix-profile]]
- [[grouped-time-series]]
