---
tags: [hierarchical-ts, combinatorial, anomaly-detection]
article_number: 11
section: Anomaly Detection in Hierarchical Time Series
include: yes
authors: Wolff et al.
year: 2022
last_updated: 2026-06-26
---

# Wolff et al. (2022) — *Composite Anomaly Detection via Hierarchical Dynamic Search*

## Metadata

- **Raw note:** [Literature Review Articles/11.md](../../Literature%20Review%20Articles/11.md)
- **PDF:** [Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf](../../Literature%20Review%20PDFs/03_Hierarchical_Time_Series/Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf)
- **Raw PDF text:** [[../raw/wolff-2022-hierarchical-search|wolff-2022-hierarchical-search]]
- **DOI / link:** [https://doi.org/10.1109/ISIT50566.2022.9834631](https://doi.org/10.1109/ISIT50566.2022.9834631)
- **Include in Ch. 3?** Yes

## APA citation

Wolff, B., Gafni, T., Revach, G., Shlezinger, N., & Cohen, K. (2022). Composite anomaly detection via hierarchical dynamic search. In *2022 IEEE International Symposium on Information Theory (ISIT)* (pp. 2421-2426). IEEE. [https://doi.org/10.1109/ISIT50566.2022.9834631](https://doi.org/10.1109/ISIT50566.2022.9834631)

## Application

Active sequential search for anomalous processes in a **known tree-structured hierarchy** of M leaf processes. Decision-maker samples aggregated subsets (internal nodes) or individual leaves under general parametric noise; goal is to identify which leaves are anomalous while minimising sample complexity. **HDS (Hierarchical Dynamic Search):** random walk on tree using GLLR tests at internal nodes and ALLR sequential tests at leaves. Extended to K anomalies. Evaluated on synthetic traffic models and **DARPA intrusion detection** dataset (DoS attack localisation across network interfaces).

## Reported results

**Theory:**

- Detection error: **O(c)** where c ∈ (0,1) is per-sample cost.
- Sample complexity: **order-optimal in M** — Q(π_HDS) ≤ B·log₂M + … ; matches lower bound Ω(log₂M / log(1/(1−ε))) asymptotically.
- Multi-target (K anomalies): risk O(cK) with corresponding log₂M scaling.

**Empirical (synthetic + DARPA):**

- HDS **outperforms Deterministic Search (DS)** and **CBRW** (Confidence Bounds Random Walk) on Bayesian risk across most M values; close to idealised IRW (ideal random walk — best-case oracle).
- Under unknown noise / sequential internal tests, gap between HDS and CBRW widens; HDS detects DoS efficiently from limited samples on DARPA.
- **Exact empirical F1/AUC scores not reported** in accessible text — comparisons are on Bayesian risk / sample efficiency curves.

## Key results to cite

Detection error O(c); order-optimal sample complexity in M. Outperforms CBRW and DS on synthetic and DARPA DoS tasks; no exact classification scores in paper.

## Thesis relevance

Adaptive tree search over hierarchy subsets — same computational stance as partial-hierarchy search in the thesis. Bridge from information-theoretic hierarchical search to GE-generated aggregation candidates: Wolff searches a **fixed known tree**; thesis **evolves** which partial aggregations to score. State missing empirical classification scores; cite theory + risk curves only.

## Notes from PDF

- **Problem framing:** Composite anomaly — abnormal distribution depends on chosen subset of processes; observations at internal nodes are aggregated (potentially lower quality).
- **HDS mechanics:** Internal nodes — fixed-size GLLR comparing children; leaves — sequential ALLR (Robbins-Siegmund) with delayed parameter estimates.
- **vs group testing:** General parametric noise models + adaptive sequential sampling; not Boolean error-free tests.
- **DARPA experiment:** K=1 DoS target among M interfaces; packet inter-arrival times as observations; HDS scales better than IRW/CBRW as M grows.
- **Limitation:** Assumes known tree topology; leaf-target detection (not arbitrary subgraph anomalies).

## Cross-references

- Concepts: [[hierarchical-time-series]], [[combinatorial-optimisation]]
- Related sources: [[hong-2012-tiresias]], [[he-2021-mining-anomalies-subspaces]]
