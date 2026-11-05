---
tags: [telecom, grouped-ts, deep-learning]
article_number: 8
section: Anomaly Detection in Grouped Time Series
include: yes
authors: Oğuz & Kalaycıoğlu
year: 2022
last_updated: 2026-06-26
---

# Oğuz & Kalaycıoğlu (2022) — *Multi-Tiered Cellular Networks (LSTM/1D CNN)*

## Metadata

- **Raw note:** [Literature Review Articles/8.md](../../Literature%20Review%20Articles/8.md)
- **PDF:** [Oguz_2022_Multi_Tiered_Cellular_Networks.pdf](../../Literature%20Review%20PDFs/02_Grouped_Time_Series/Oguz_2022_Multi_Tiered_Cellular_Networks.pdf)
- **Raw PDF text:** [[../raw/oguz-2022-multi-tier|oguz-2022-multi-tier]]
- **DOI / link:** [https://doi.org/10.1186/s13638-022-02183-7](https://doi.org/10.1186/s13638-022-02183-7)
- **Include in Ch. 3?** Yes

## APA citation

Oğuz, H. T., & Kalaycıoğlu, A. (2022). Anomaly detection in multi-tiered cellular networks using LSTM and 1D CNN. *EURASIP Journal on Wireless Communications and Networking, 2022*(1). [https://doi.org/10.1186/s13638-022-02183-7](https://doi.org/10.1186/s13638-022-02183-7)

## Application

Simulated ultra-dense multi-tier cellular (SON) network: femtocell outage detection and four-state classification (healthy, degraded, crippled, catatonic) at femto access point (FAP) level. UE-level SINR and CQI time sequences (2×60 features) classified by LSTM or 1D CNN; UE probability scores aggregated to FAP state via ensemble averaging or majority voting within a region-of-interest (ROI) radius around each FAP. Network: 2 FAPs per macro sector, 5 UEs per femtocell; shadowing σ = 2, 5, 8 dB; ROI = 30, 40, 50 m.

## Reported results

**Four-category accuracy (30 m ROI, 2 dB shadowing):** 1D CNN 80.1%, LSTM 79.08%. At harsher shadowing (5 dB, 8 dB) with 30 m ROI, LSTM outperforms 1D CNN (59.18% vs 56.38%; 50.83% vs 47.43%). Accuracy decreases as ROI or shadowing increases (noisier UE data at ROI boundaries).

**Two-state (healthy vs non-healthy) TPR:** Both classifiers exceed 95% at 2 dB shadowing; best case TPR >95%, overall accuracy >80% for four FAP states. Ensemble averaging consistently beats majority voting.

**Recall by state (30 m, ensemble):** Best at healthy and catatonic; weaker on degraded and crippled intermediate states.

## Key results to cite

2 dB shadowing, 30 m ROI: 1D CNN 80.1%, LSTM 79.08%. Best case TPR >95%, accuracy >80% for four FAP states. Tier/group context (ROI, shadowing, aggregation method) strongly affects detection quality.

## Thesis relevance

Brief supporting point: cellular anomaly detection quality depends on tier/group context and UE aggregation — not a direct thesis comparator. Trim first if word count is tight. Reinforces that representation and grouping dominate over classifier choice, paralleling Mefleh's aggregation argument in a different telecom setting.

## Notes from PDF

- **Four FAP states:** Healthy (30 dBm), degraded (20 dBm), crippled (10 dBm), catatonic (−10 dBm) — power reduction simulates outage subclasses.
- **Pipeline:** Train once on healthy + anomalous UE sequences → tenfold cross-validation on test UEs → aggregate UE posteriors to FAP decision.
- **1D CNN vs LSTM:** 1D CNN better in mild shadowing (salient convolutional patterns); LSTM more noise-resilient in harsh shadowing (gating/memory).
- **ROI trade-off:** Larger ROI adds UEs but boundary UEs overlap with macro-BS characteristics → noisier averages → lower four-category accuracy.
- **SON context:** Sparse users per femtocell (1–5 UEs) make per-FAP aggregation necessary; macro BS monitoring differs.

## Cross-references

- Concepts: [[grouped-time-series]]
- Related sources: [[mefleh-2025-mahalanobis]]
