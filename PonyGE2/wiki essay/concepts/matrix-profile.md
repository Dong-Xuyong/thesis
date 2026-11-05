---
tags: [method, matrix-profile]
source_count: 6
last_updated: 2026-09-07
---

# Matrix Profile

## Definition

Vector **P** where P[i] = z-normalized Euclidean distance from subsequence starting at position i to its nearest **non-trivial** neighbour in the same (self-join) or paired time series. Companion index vector **I** stores neighbour locations. The self-join profile annotates a series as a meta time series: max(P) = discord, min(P) = best motif pair, profile histogram = density estimate (Yeh et al. 2017, Def. 7–9).

Exact computation via STAMP (anytime), STOMP (ordered, O(n² log n), subsequence-length independent), STOMP I (incremental streaming), GPU-STOMP/GPU-STUMP; Python implementation in [[stumpy]].

## Papers that use it

- [[yeh-2017-matrix-profile-unifying-view]] — primary reference; unifying view; 153.8 days → 1.2 h; STOMP 4.7×; GPU-STAMP 30×
- [[yeh-2016-matrix-profile-i]] — MP I speedups; refinery self-join 153.8 days → 6.3 hours
- [[zhu-2016-matrix-profile-ii]] — GPU-STOMP; 100M subsequences in 12 days; O(n²) vs O(n²m)
- [[keogh-2005-hot-sax]] — HOT SAX; discord conceptual foundation (pre-MP)
- [[law-2019-stumpy]] — Python implementation used in thesis
- [[van-onsem-2023-variable-length-motif]] — MP motifs on Skyline telecom-provider KPIs (not discord scoring)

## Thesis application

Each GE candidate produces an aggregated series; STUMPY computes the Matrix Profile; **discord score** (max profile value) ranks anomaly evidence. Cheap enough to recompute per candidate in the evolutionary loop (Yeh 2017, Zhu 2016 headroom).

## Open questions / gaps

Matrix Profile **has** been applied to telecom-provider KPIs for **motif** discovery ([[van-onsem-2023-variable-length-motif]]). It is still not paired with structure search, discord scoring of candidate aggregations, or AUC fitness.

## Related concepts

- [[time-series-discord]]
- [[combinatorial-optimisation]]
- [[auc-fitness]]
