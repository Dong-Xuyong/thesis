---
tags: [hierarchical-ts, anomaly-detection]
article_number: 10
section: Anomaly Detection in Hierarchical Time Series
include: yes
authors: Huang et al.
year: 2026
last_updated: 2026-06-26
---

# Huang et al. (2026) — *HYDRA*

## Metadata

- **Raw note:** [Literature Review Articles/10.md](../../Literature%20Review%20Articles/10.md)
- **PDF:** [Huang_2026_HYDRA.pdf](../../Literature%20Review%20PDFs/03_Hierarchical_Time_Series/Huang_2026_HYDRA.pdf)
- **Raw PDF text:** [[../raw/huang-2026-hydra|huang-2026-hydra]]
- **DOI / link:** [https://doi.org/10.1145/3802074](https://doi.org/10.1145/3802074)
- **Include in Ch. 3?** Yes

## APA citation

Huang, M., Liu, Q., Boniol, P., & Paparrizos, J. (2026). HYDRA: A multi-level hierarchy-driven approach for robust anomaly detection in time series. *Proceedings of the ACM on Management of Data, 4*(3), 1-30. [https://doi.org/10.1145/3802074](https://doi.org/10.1145/3802074)

## Application

Unsupervised anomaly detection using multi-level time-series hierarchy representations. HYDRA builds hierarchy-driven views of each series and combines detection signals across levels for robustness. Evaluated on the **TSB-AD** benchmark suite (40 datasets) against 40 competing algorithms. General time-series setting — not telecom operational data.

## Reported results

Ranked **first among 40 algorithms** on 40 TSB-AD datasets (per article note and paper abstract/metadata). **Exact per-dataset F1, AUC, or VUS values not found** in accessible sources — state ranking only.

> **PDF extraction note:** `wiki essay/raw/huang-2026-hydra.md` contains text from an unrelated document (quantum batteries, arXiv:2406.06373). HYDRA content could not be deep-verified from raw extraction; claims above follow Literature Review Articles/10.md and bibliographic metadata only.

## Key results to cite

Ranked 1st among 40 algorithms on 40 TSB-AD datasets. No accessible F1/AUC values — cite ranking, not invented metrics.

## Thesis relevance

Supports the argument that multi-level structure can improve robust time-series anomaly detection vs single-level views. General benchmark, not telecom — use as hierarchy-motivation, not as a direct comparator. Gap remains: HYDRA uses predefined multi-level representations, not searched partial aggregations over operational CDR hierarchies.

## Notes from PDF

- **Raw extraction failed:** Local PDF text extraction returned wrong document; no HYDRA method or result details available from `raw/`.
- **From metadata/abstract (unverified in raw):** Multi-level hierarchy-driven approach; TSB-AD benchmark; 40-algorithm comparison; ranked first overall.
- **Do not invent** dataset-level F1/AUC until PDF is re-extracted or paper is read directly.

## Cross-references

- Concepts: [[hierarchical-time-series]]
- Related sources: [[hong-2012-tiresias]]
