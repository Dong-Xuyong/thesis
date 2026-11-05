---
tags: [tool, matrix-profile, thesis]
source_count: 1
last_updated: 2026-06-26
---

# STUMPY

## What it is

Python library for exact Matrix Profile computation (Law, 2019, JOSS). Implements STOMP-family algorithms from [[yeh-2017-matrix-profile-unifying-view]] (Matrix Profile I/unifying view) and [[zhu-2016-matrix-profile-ii]] (GPU-STOMP scalability). Core API: `stump()` computes the profile vector P and index I; discord = max(P).

## Capabilities

- Motif, discord/anomaly, shapelet, semantic segmentation, density estimation
- Time series chains (Zhu et al. 2017)
- Multi-dimensional motif discovery (Yeh, Kavantzas & Keogh 2017)
- Parallel and distributed computation

## Used in

- [[law-2019-stumpy]] — JOSS paper; implementation reference (no headline benchmark)
- [[van-onsem-2023-variable-length-motif]] — uses MP (not necessarily STUMPY) on telecom KPIs for motifs
- Thesis — discord scorer for each GE candidate aggregated series

## Thesis relevance

Label-free scorer in the GE fitness loop. Matrix Profile speed (Yeh 2017: 153.8 days → 1.2 h; Zhu 2016: 100M subsequences in 12 days) makes per-candidate recomputation feasible within evolutionary search. Cite Law (2019) for reproducibility; Yeh (2017) for method.

## Related

- [[matrix-profile]]
- [[time-series-discord]]
