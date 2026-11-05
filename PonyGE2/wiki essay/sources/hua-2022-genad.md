---
tags: [telecom, grouped-ts, deep-learning]
article_number: 7
section: Anomaly Detection in Grouped Time Series
include: yes
authors: Hua et al.
year: 2022
last_updated: 2026-06-26
---

# Hua et al. (2022) — *GenAD*

## Metadata

- **Raw note:** [Literature Review Articles/7.md](../../Literature%20Review%20Articles/7.md)
- **PDF:** [Hua_2022_GenAD.pdf](../../Literature%20Review%20PDFs/02_Grouped_Time_Series/Hua_2022_GenAD.pdf)
- **Raw PDF text:** [[../raw/hua-2022-genad|hua-2022-genad]]
- **DOI / link:** [https://doi.org/10.1049/ell2.12683](https://doi.org/10.1049/ell2.12683)
- **Include in Ch. 3?** Yes

## APA citation

Hua, X., Zhu, L., Zhang, S., Li, Z., Wang, S., Deng, C., Feng, J., Zhang, Z., & Wu, W. (2022). GenAD: General unsupervised anomaly detection using multivariate time series for large-scale wireless base stations. *Electronics Letters, 59*(1). [https://doi.org/10.1049/ell2.12683](https://doi.org/10.1049/ell2.12683)

## Application

Unsupervised anomaly monitoring of large-scale wireless base stations (WBS) at China Mobile using 18-dimensional KPI multivariate time series (15-minute intervals). GenAD pre-trains a general reconstruction model on 3,000 unlabeled WBSes, then fine-tunes per station with only 480 labelled points (10 days). Evaluated on 30 labelled WBSes across three geographic areas (10 per area). Baselines: LSTM-NDT, MSCRED, OmniAnomaly. Also tested on public datasets (SMD, MSL, SMAP) and synthetic data.

## Reported results

**China Mobile WBS (GenAD(G), Table 1):**

| Area | Precision | Recall | F1 |
|------|-----------|--------|-----|
| WBS-Area1 | 0.926 | 1.000 | 0.962 |
| WBS-Area2 | 0.932 | 1.000 | 0.965 |
| WBS-Area3 | 0.872 | 1.000 | 0.931 |
| **Total** | **0.910** | **1.000** | **0.953** |

Best baseline (OmniAnomaly) total F1: 0.863 → GenAD(G) +9% absolute F1 improvement. Pre-training halves training time vs GenAD(WP) at same F1. Removing Time-Series Attention drops Area1 total F1 by 4%. GenAD(WP) on public datasets: +2.1% to +4.8% F1 per dataset (+4.3% total); synthetic: +3.4% F1. Public transfer uses only 10% of training data without significant degradation.

## Key results to cite

China Mobile WBS: precision 0.910, recall 1.000, F1 0.953; area F1 0.962, 0.965, 0.931; total F1 +9% over best baseline. Point-adjust segment metric (Su et al. 2019 convention).

## Thesis relevance

Shows cross-entity generalisation across many grouped telecom base stations — a deep-learning grouped-TS comparator. Frame the label regime carefully: China Mobile evaluation uses operator-labelled segments and point-adjust scoring, not sparse expert labels like González TELCO range-F1; high F1 does not contradict the scarcity narrative in other telecom papers. Gap: fixed 18-KPI view per station; no search over which aggregation structure to monitor.

## Notes from PDF

- **Method:** Reconstruction-based VAE-style model with masked-series pre-training (20% dimensions masked, BERT-like), Time-Series Attention, and Multi-Correlation Attention (4 hidden layers, 12 attention heads optimal).
- **Scale:** Millions of WBS in China Mobile; 3,000 unlabeled + 30 labeled stations; 960 points stored per station (10 days × 15 min); 480 train / 480 test split per labeled station.
- **Detection:** Cosh reconstruction loss; threshold η ∈ [−0.01, 0.01] tuned on validation to maximise F1.
- **Component ablation:** Pre-training essential (GenAD(WP) loss ~1000 vs <7 with pre-training); reconstruction beats prediction (LSTM-NDT) on noisy WBS KPIs.
- **Evaluation caveat:** Point-adjust — if any point in an anomaly segment is detected, entire segment counts as correct (Xu et al. 2018).

## Cross-references

- Concepts: [[grouped-time-series]], [[telecom-anomaly-detection]]
- Related sources: [[gonzalez-2024-one-model]]
