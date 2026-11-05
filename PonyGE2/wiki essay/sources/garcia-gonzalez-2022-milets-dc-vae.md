---
tags: [telecom, deep-learning, grouped-ts]
article_number: 6
section: Anomaly Detection in Grouped Time Series
include: yes
authors: García González et al.
year: 2022
last_updated: 2026-06-26
---

# García González et al. (2022) — *MILETS DC-VAE*

## Metadata

- **Raw note:** [Literature Review Articles/6.md](../../Literature%20Review%20Articles/6.md)
- **Raw PDF text:** [[../raw/garcia-gonzalez-2022-milets-dc-vae|garcia-gonzalez-2022-milets-dc-vae]]
- **PDF:** [Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf](../../Literature%20Review%20PDFs/02_Grouped_Time_Series/Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf)
- **DOI / link:** [https://kdd-milets.github.io/milets2022/papers/MILETS_2022_paper_3436.pdf](https://kdd-milets.github.io/milets2022/papers/MILETS_2022_paper_3436.pdf)
- **Include in Ch. 3?** Yes

## APA citation

García González, G., Martinez Tagliafico, S., Fernández, A., Gómez, G., Acuña, J., Mariño, C., & Casas, P. (2022). Mining multivariate time-series for anomaly detection in mobile networks: On the usage of variational auto encoders and dilated convolutions. In *Proceedings of the 8th SIGKDD International Workshop on Mining and Learning from Time Series*.

## Application

Workshop precursor to [[gonzalez-2024-one-model]]: introduces **DC-VAE** for multivariate anomaly detection on the operational **TELCO** mobile ISP dataset (12 fixed KPI time series, 5-min granularity, expert labels). Primary workshop contribution here is the **S-VAE comparator** (snapshot VAE, T=1) demonstrating that temporal-aware dilated convolutions roughly **double** range-F1_r vs snapshot VAE. Also benchmarks DC-VAE on SWaT.

## Reported results

**TELCO (same dataset as #1):** 732,607 samples, 7 months, 9,137 anomalies (1.2%). DC-VAE test range-metrics: mean R **67%**, P **47%**, F1 **52%**; median F1 **59%**.

**S-VAE baseline (primary cite from this paper):** mean R **38%**, P **48%**, F1 **33%**; median F1 **31%**. DC-VAE outperforms S-VAE by ~2× on average F1_r; per-series gains vary (e.g., TS9: DC-VAE F1_r 13% vs S-VAE 4%; TS12: DC-VAE 22% vs S-VAE 0%).

Do **not** repeat identical DC-VAE headline numbers in Ch. 3 — cite [[gonzalez-2024-one-model]] as primary; use this paper for S-VAE comparison and workshop context only.

## Key results to cite

Same TELCO DC-VAE results as #1. S-VAE: recall 38%, precision 48%, F1 33%; median F1 31% vs DC-VAE 59%.

## Thesis relevance

Comparator for deep multivariate telecom AD on fixed 12-series view. Merge with #1 — cite 2024 journal as primary. Use 2022 workshop only for S-VAE comparator and evidence that **representation/window length** (T=512 vs T=1) matters as much as model family. Gap unchanged: no search over which series/aggregation to monitor.

## Notes from PDF

- **TELCO split (Table 1):** train 310,974 (3 mo, 1.8% anomalous); val 103,680 (1 mo, 0.4%); test 317,953 (3 mo, 1.0%).
- **S-VAE definition:** 3-layer fully connected VAE; input = MTS snapshot at detection time (T=1); same α calibration procedure as DC-VAE.
- **Per-series F1_r (test, Table 2):** DC-VAE best on TS7 (80%), TS6 (68%); weakest TS9 (13%), TS12 (22%). S-VAE F1_r below 40% on most series.
- **Range metrics:** R_r, P_r, F1_r per Tatbul-style range overlap; evaluations per TS_m independently.
- **Authors' assessment:** Real in-the-wild MTS AD "highly complex"; poor labeling and sensitivity tuning cited for low series; ongoing work to benchmark more methods on TELCO.
- **SWaT:** DC-VAE R 67%, P 94%, F1 78% (controlled testbed; not directly comparable to TELCO operational difficulty).

## Cross-references

- Concepts: [[grouped-time-series]], [[telecom-anomaly-detection]]
- Related sources: [[gonzalez-2024-one-model]]
- Entities: [[telco-dataset]]
