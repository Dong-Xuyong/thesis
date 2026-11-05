---
tags: [grouped-ts, anomaly-detection]
source_count: 5
last_updated: 2026-06-26
---

# Grouped Time Series Anomaly Detection

## Definition

Anomaly detection where multiple related series (cells, sectors, base stations, network services) are analysed together; **how series are grouped and aggregated** strongly affects detectability.

## Papers that use it

- [[mefleh-2025-mahalanobis]] — AUC 0.77→0.99 as KPI representation improves; cell→site hierarchy; lead grouped section
- [[garcia-gonzalez-2022-milets-dc-vae]] — fixed 12-series multivariate view; S-VAE median F1 31% vs DC-VAE 59%
- [[gonzalez-2024-one-model]] — same TELCO fixed view; journal primary for DC-VAE results
- [[lemaire-2024-urban-events]] — cell-level service-count aggregation; 4-service fusion for urban events
- [[hua-2022-genad]] — cross-entity generalisation across base stations
- [[oguz-2022-multi-tier]] — tier context affects detection quality

## Thesis application

Mefleh et al. provide the strongest quantitative evidence that **representation dominates scorer choice** (22-point AUC gain from KPI transforms vs switching MD to One-Class SVM). Lemaire and Burgueño show aggregation/service selection is manual and partial. Thesis gap: hand-designed aggregation; GE **searches** valid trees via [[mobai-grammar]].

## Open questions / gaps

Hand-crafted denominators, KPI adjustments, and service fusions — no automated search over valid aggregation trees. Fixed hierarchies (cell/sector/site) do not explore alternative groupings over CDR dimensions.

## Related concepts

- [[telecom-anomaly-detection]]
- [[hierarchical-time-series]]
- [[auc-fitness]]
