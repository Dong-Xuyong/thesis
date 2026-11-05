---
tags: [combinatorial, subspace, anomaly-detection]
article_number: 21
section: Combinatorial Optimisation in Anomaly Detection
include: yes
authors: He et al.
year: 2021
last_updated: 2026-06-26
---

# He et al. (2021) — *Mining Anomalies in Subspaces (Financial)*

## Metadata
- **Raw note:** [Literature Review Articles/21.md](../../Literature%20Review%20Articles/21.md)
- **PDF:** [He_2021_Mining_Anomalies_Subspaces.pdf](../../Literature%20Review%20PDFs/06_Combinatorial_Optimisation_Anomaly_Detection/He_2021_Mining_Anomalies_Subspaces.pdf)
- **Raw extraction:** [[../raw/he-2021-mining-anomalies-subspaces|he-2021-mining-anomalies-subspaces]]
- **DOI / link:** https://doi.org/10.1007/978-3-030-86514-6_2
- **Include in Ch. 3?** Yes

## APA citation

He, J., Yeh, C.-C. M., Wu, Y., Wang, L., & Zhang, W. (2021). Mining anomalies in subspaces of high-dimensional time series for financial transactional data. In *Machine Learning and Knowledge Discovery in Databases. Applied Data Science Track* (pp. 19-36). Springer International Publishing. [https://doi.org/10.1007/978-3-030-86514-6_2](https://doi.org/10.1007/978-3-030-86514-6_2)

## Application

Unsupervised **anomaly retrieval** on high-dimensional financial transaction time series at Visa Research scale. Two-module system: (1) **subspace search** over O(2^N) dimension combinations — greedy or evolutionary (μ+λ) heuristics; (2) **discord mining** via DTW nearest-neighbour distances with optimised implementations (51–72% runtime reduction). Hourly sliding-window aggregation of transaction amounts per Merchant Category Code (MCC). Evaluated on synthetic stress tests and real 70 GB production data.

## Reported results

**Real transactional data (16 trials, 1% MCC subset, injected anomalies):**

| Method | Avg. rank ↓ | MAP ↑ | NDCG ↑ | Runtime (s) |
|--------|------------|-------|--------|-------------|
| Random | 15.50 | 0.63 | 0.34 | — |
| All-dimension | 20.75 | 0.36 | 0.24 | 0.02 |
| One-best dimension | 17.31 | 0.47 | 0.28 | 9.58 |
| Hierarchical clustering | 17.31 | 0.47 | 0.28 | 4.17 |
| **Greedy search** | **5.94** | **0.86** | **0.46** | **1,345.50** |
| **Evolutionary search** | 8.63 | 0.72 | 0.39 | **87.62** |

**Production scale:** 70 GB, 600M+ transactions, 415 MCCs. One month / 600M records: greedy 22 min vs evolutionary **1.5 min**. Greedy MAP higher but ~15× slower than evolutionary on real data.

## Key results to cite

70 GB, 600M+ transactions, 415 MCCs, 16 trials. Greedy MAP 0.86 in 1345.50 s vs evolutionary MAP 0.72 in 87.62 s. Production: 22 min vs 1.5 min per month.

## Thesis relevance

Strongest combinatorial-AD analogy: anomalies visible **only in selected subspaces** — same structural claim as thesis (anomalies appear in the right aggregation of telecom dimensions). Two-stage pattern mirrors thesis: search structure (GE grammar) → score with fast detector (MP discord). Speed vs accuracy trade-off in vast search spaces directly relevant. Lead the combinatorial-AD subsection.

## Notes from PDF

- **Motivating example:** 3-D time series where anomaly on day 1 detectable only in dim 0+1 combined, not in individual or all dimensions — false dismissals without subspace search.
- **ATM attack case:** 2013 NYC looting ($2.4M, ~$800/ATM) invisible on individual ATM series or national aggregate; needs correct dimension combination.
- **Greedy search:** O(n²) fixed complexity; no hyperparameters; iteratively merges unit subspaces by anomaly score.
- **Evolutionary search:** (μ+λ) algorithm with binary subspace chromosomes; tunable speed via population/generation settings; requires hyperparameter tuning.
- **Discord module:** DTW-based nearest-neighbour discord mining; DM-V0/V1 implementations with 51–72% runtime reduction depending on subsequence overlap.
- **Baselines fail:** All-dimension and single-dimension worse than random because injected anomalies affect only 1% of unit subspaces.
- **Co-author link:** C.-C. Michael Yeh (Matrix Profile group) — conceptual bridge to MP discord scoring in thesis, though this paper uses DTW not MP.
- **Thesis gap:** Financial MCC subspaces + DTW; no Matrix Profile, no telecom CDR, no grammar-generated hierarchies.

## Cross-references
- Concepts: [[subspace-anomaly-detection]], [[combinatorial-optimisation]], [[time-series-discord]]
- Related sources: [[li-2022-vae-ga-outlier-detection]], [[riahi-madvar-2021-mi-subspace-outliers]], [[yeh-2016-matrix-profile-i]]
- Entities: [[stumpy]]
