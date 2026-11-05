---
tags: [hierarchical-ts, anomaly-detection]
source_count: 4
last_updated: 2026-06-26
---

# Hierarchical Time Series Anomaly Detection

## Definition

Detection and localisation of anomalies using multi-level structure (network → region → cell → KPI), enabling drill-down and composite search over subsets.

## Papers that use it

- [[hong-2012-tiresias]] — ISP call-log hierarchy; ADA 14.2× faster; >94% vs reference; 99.7% identification accuracy
- [[huang-2026-hydra]] — multi-level TSB-AD benchmark; ranked 1st among 40 algorithms (exact metrics unavailable; raw PDF extraction failed)
- [[wolff-2022-hierarchical-search]] — HDS active tree search; O(c) error; order-optimal samples; beats CBRW/DS on DARPA DoS
- [[pang-2022-hierarchical-forecasting]] — forecast-residual detection + adtributor root cause; 1/2/74 hierarchy; not a detection benchmark

## Thesis application

Tiresias and Wolff are closest precedents for hierarchical search/localisation. Tiresias: fixed additive hierarchy + forecasting on ISP logs. Wolff: adaptive sampling on known trees. Pang: hierarchy for interpretation via forecasting. Thesis differs: **GE-generated partial aggregations** + Matrix Profile scorer + AUC fitness.

## Open questions / gaps

Hierarchy literature skews toward forecasting (Pang) or fixed trees (Tiresias, Wolff); detection with **searched** partial hierarchies over telecom CDR remains unaddressed. HYDRA ranking suggests multi-level helps but uses predefined representations.

## Related concepts

- [[telecom-anomaly-detection]]
- [[grouped-time-series]]
- [[combinatorial-optimisation]]
- [[grammatical-evolution]]
