---
tags: [matrix-profile, discord, method]
article_number: 13
section: Matrix Profile and Time-Series Discord Detection
include: yes
authors: Yeh et al.
year: 2017
last_updated: 2026-06-26
---

# Yeh et al. (2017) — *Matrix Profile unifying view (DMKD)*

## Metadata

- **Raw note:** [Literature Review Articles/13.md](../../Literature%20Review%20Articles/13.md)
- **Raw extraction:** [[../raw/yeh-2017-matrix-profile-unifying-view|PDF text extraction]]
- **PDF:** [Yeh_2017_Matrix_Profile_Unifying_View.pdf](../../Literature%20Review%20PDFs/04_Matrix_Profile_Discord_Detection/Yeh_2017_Matrix_Profile_Unifying_View.pdf)
- **DOI / link:** [https://doi.org/10.1007/s10618-017-0519-9](https://doi.org/10.1007/s10618-017-0519-9)
- **Include in Ch. 3?** Yes

## APA citation

Yeh, C.-C. M., Zhu, Y., Ulanova, L., Begum, N., Ding, Y., Dau, H. A., Zimmerman, Z., Silva, D. F., Mueen, A., & Keogh, E. (2017). Time series joins, motifs, discords and shapelets: A unifying view that exploits the matrix profile. *Data Mining and Knowledge Discovery, 32*(1), 83-123. [https://doi.org/10.1007/s10618-017-0519-9](https://doi.org/10.1007/s10618-017-0519-9)

## Application

Exact time-series subsequence all-pairs-similarity-search (TSAPSS) under z-normalized Euclidean distance. The self-join matrix profile simultaneously yields motifs, discords/anomalies, shapelets, semantic segmentation, density estimation, and contrast sets — demonstrated on seismology, music, bioinformatics, activity monitoring, power demand, and medicine. Running example: boiler pressure at 1 min for one year (525,600 points), week-long subsequence windows (10,080).

## Reported results

- Refinery boiler self-join: nested-loop brute force ~153.8 days → STAMP/STOMP **1.2 hours** on desktop.
- STOMP vs STAMP: **4.7× speedup** on ~2M-length series (n = 2²¹, m = 256).
- Cloud scaling: four 16-core Azure VMs reduce 2M join from **4.2 days → 14.1 hours**.
- GPU-STAMP (NVIDIA Tesla K40): **30× speedup** over STAMP on large datasets; self-join at n = 2²¹, m = 256 in **3.24 hours**.
- STOMP time complexity **O(n² log n)**; subsequence-length factor reduced to O(1) vs brute force O(n²m).

## Key results to cite

Join: 153.8 days → 1.2 hours. STOMP 4.7× speedup (~2M length). Cloud: 4.2 days → 14.1 hours. GPU-STAMP 30× over STAMP. Discord = highest point on self-join matrix profile.

## Thesis relevance

Supports Matrix Profile as a practical anomaly/discord scoring method for many candidate series.
Primary Matrix Profile reference. Label-free discord score cheap enough to recompute per candidate in a search loop.

## Notes from PDF

- **Matrix Profile definition:** Vector P where P[i] = Euclidean distance from subsequence starting at i to its nearest non-trivial neighbour; companion index vector I stores neighbour locations. Self-join excludes trivial matches (|p − q| < m).
- **Discord link:** Highest point on the self-join profile is the time series discord; lowest (tied) points are best motif pair (Chandola et al. 2009; Mueen et al. 2009).
- **Algorithms:** STAMP (anytime, random search); STOMP (ordered search, Scalable Time series Ordered-search Matrix Profile); STOMP I (incremental streaming update); GPU-STAMP.
- **Design properties:** Exact (no false positives/dismissals), parameter-free (full join, no distance threshold τ), O(n) space overhead, embarrassingly parallel, deterministic runtime given n, subsequence-length-independent time for STOMP.
- **Threshold problem:** Euclidean distance is unbounded and unintuitive; a single τ can return 0 matches for one half of a dataset and 108 for another — motivates threshold-free full join.
- **Thesis use:** Each GE candidate → aggregated series → self-join MP → max profile value as discord score; STOMP/STUMPY speed makes per-candidate recomputation feasible in evolutionary loop.

## Cross-references

- Concepts: [[matrix-profile]], [[time-series-discord]]
- Related sources: [[yeh-2016-matrix-profile-i]], [[zhu-2016-matrix-profile-ii]], [[keogh-2005-hot-sax]], [[van-onsem-2023-variable-length-motif]]
- Entities: [[stumpy]]
