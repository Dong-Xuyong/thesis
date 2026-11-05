---
tags: [matrix-profile, combinatorial, method]
article_number: 19
section: Combinatorial Optimisation for Selecting Time Series
include: yes
authors: Yeh et al.
year: 2016
last_updated: 2026-06-26
---

# Yeh et al. (2016) — *Matrix Profile I*

## Metadata
- **Raw note:** [Literature Review Articles/19.md](../../Literature%20Review%20Articles/19.md)
- **PDF:** [Yeh_2016_Matrix_Profile_I.pdf](../../Literature%20Review%20PDFs/05_Combinatorial_Optimisation_Time_Series/Yeh_2016_Matrix_Profile_I.pdf)
- **Raw extraction:** [[../raw/yeh-2016-matrix-profile-i|yeh-2016-matrix-profile-i]]
- **DOI / link:** https://doi.org/10.1109/ICDM.2016.0179
- **Include in Ch. 3?** Yes

## APA citation

Yeh, C.-C. M., Zhu, Y., Ulanova, L., Begum, N., Ding, Y., Dau, H. A., Silva, D. F., Mueen, A., & Keogh, E. (2016). Matrix profile I: All pairs similarity joins for time series: A unifying view that includes motifs, discords and shapelets. In *2016 IEEE 16th International Conference on Data Mining (ICDM)* (pp. 1317-1322). IEEE. [https://doi.org/10.1109/ICDM.2016.0179](https://doi.org/10.1109/ICDM.2016.0179)

## Application

Introduces **STAMP** (Scalable Time series Anytime Matrix Profile) for exact time-series all-pairs similarity joins under z-normalised Euclidean distance. The Matrix Profile computed as a side-effect solves motif discovery, discord (anomaly) detection, shapelet discovery, semantic segmentation, and density estimation. Placed in Ch. 3 combinatorial section as the fast scorer that can evaluate many GE candidate series.

## Reported results

| Benchmark | Before | After | Speedup |
|-----------|--------|-------|---------|
| Refinery self-join (525,600 pts, m=10,080) | ~153.8 days (nested loop) | 6.3 hours (STAMP) | ~585× |
| Shapelet discovery (GunPoint) | 4.2 min brute force | 1.0 + 2.7 s profile method | 68× |
| Cloud monitoring join | 4.2 days | 14.1 hours | ~7× |

STAMP complexity O(n² log n) in theory; empirically closer to O(n²). Space overhead O(n). Also provides STAMPI incremental variant (O(n log n) per update).

## Key results to cite

Refinery self-join: 153.8 days → 6.3 hours. Shapelet: 4.2 min → 1.0 + 2.7 s (68×). Prefer [[yeh-2017-matrix-profile-unifying-view]] for full method exposition.

## Thesis relevance

Selected GE candidate aggregations can be judged via Matrix Profile discord evidence — cheap enough to recompute per individual in the evolutionary loop. Brief cross-reference only; avoid duplicating full MP exposition (use article #13 as primary). Links combinatorial candidate generation to label-free discord scoring.

## Notes from PDF

- **STAMP algorithm:** FFT-based ultra-fast similarity search exploiting subsequence overlap; parameter-free (no similarity threshold τ).
- **Matrix Profile definition:** For each subsequence, stores distance to its nearest non-trivial neighbour (exclusion zone m/2); max profile value = discord score.
- **Refinery example:** 525,600 one-minute pressure readings; week-long subsequences (m=10,080); 132.8B distance computations reduced from 153.8 days to 6.3 hours on desktop.
- **Advantages:** Exact (no false positives/dismissals); O(n) space; anytime approximate variant; incremental/streaming (STAMPI); embarrassingly parallel.
- **Threshold problem:** Euclidean distance unbounded and unintuitive; single τ can yield zero vs 108 matches on similar data — full join avoids this.
- **Side-effect tasks:** Motifs = lowest profile values; discords = highest; shapelets via profile-guided candidate suggestion.
- **Thesis use:** Scorer for GE fitness loop; implementation via [[stumpy]] in thesis code.

## Cross-references
- Concepts: [[matrix-profile]], [[combinatorial-optimisation]], [[time-series-discord]]
- Related sources: [[yeh-2017-matrix-profile-unifying-view]], [[zhu-2016-matrix-profile-ii]]
- Entities: [[stumpy]]
