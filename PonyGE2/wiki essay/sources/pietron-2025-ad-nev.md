---
tags: [combinatorial, evolutionary, subspace, anomaly-detection, time-series]
article_number: 30
section: Combinatorial Optimisation for Selecting Time Series
include: yes
authors: Pietroń et al.
year: 2025
last_updated: 2026-10-01
---

# Pietroń et al. (2025) — *AD-NEv: Multilevel Neuroevolution for Multivariate Anomaly Detection*

## Metadata

- **Raw note:** [Literature Review Articles/30.md](../../Literature%20Review%20Articles/30.md)
- **Raw PDF text:** [[../raw/pietron-2025-ad-nev|pietron-2025-ad-nev]]
- **PDF:** [Pietron_2025_AD-NEv_Neuroevolution_Anomaly_Detection.pdf](../../Literature%20Review%20PDFs/05_Combinatorial_Optimisation_Time_Series/Pietron_2025_AD-NEv_Neuroevolution_Anomaly_Detection.pdf) — arXiv 2305.16497 preprint
- **DOI / link:** [https://doi.org/10.1109/TNNLS.2024.3436086](https://doi.org/10.1109/TNNLS.2024.3436086)
- **Include in Ch. 3?** Yes (§3.5, added for Emanuel's "at least one more work" comment)

## APA citation

Pietroń, M., Żurek, D., Faber, K., & Corizzo, R. (2025). AD-NEv: A scalable multilevel neuroevolution framework for multivariate anomaly detection. *IEEE Transactions on Neural Networks and Learning Systems, 36*(5), 8939–8953. [https://doi.org/10.1109/TNNLS.2024.3436086](https://doi.org/10.1109/TNNLS.2024.3436086)

## Application

Multivariate time-series anomaly detection (semi-supervised; training data assumed normal). A **genetic algorithm** runs at three levels:

1. **Subspace evolution** — partitions input series into K subspaces (a series may appear in zero, one or several); chromosome genes mark feature membership.
2. **Model evolution** — evolves an autoencoder architecture per subspace (coDeepNEAT-inspired; window size also mutable).
3. **Non-gradient fine-tuning** — mutates a share of weights (no crossover).

Fitness: negated weighted validation **MSE** (80/20 chronological split) for levels 1–2; **number of false positives** for fine-tuning. Output is a bagging ensemble of the per-subspace models. Benchmarks: SWaT (51 series), WADI-2017/2019 (123), MSL, SMAP.

## Reported results

**Table 2 — point-wise F1 (14 methods):**

| | SWaT | WADI | MSL | SMAP | Mean |
|---|---|---|---|---|---|
| AD-NEv | **0.82** | **0.62** | **0.57** | **0.77** | **0.70** |
| GNN | 0.81 | 0.57 | — | — | — |
| UAE | 0.58 | 0.47 | 0.54 | 0.58 | 0.54 |
| NASA LSTM | 0.13 | 0.20 | 0.55 | 0.59 | 0.37 |

- **Ablation (Table 3):** enhanced subspace + model evolution vs prior baseline [Faber et al. 2021]: +0.01 SWaT, +0.05 WADI, +0.05 MSL, +0.15 SMAP. Fine-tuning adds +0.01, +0.03, +0.07, +0.10.
- **Cost:** total 74 h (SWaT), 131.8 h (WADI), 18.8 h (MSL), 58.2 h (SMAP) on 8 GPUs; subspace level 0.8–18 h. Near-linear scale-up with GPUs.
- Values from arXiv preprint; check against the TNNLS version before quoting.

## Thesis relevance

Closest §3.5 paper to the thesis loop: evolutionary search over **which time series to group**, scored by a detector, for anomaly detection. Contrasts:

- Subspaces are **flat sensor sets**, not grammar-constrained hierarchical aggregations.
- Fitness is **reconstruction loss / false positives**, not AUC on injected anomalies.
- Each fitness evaluation trains a neural network → days of GPU time; thesis uses a cheap, label-free MP discord scorer.
- Point-wise F1 on SWaT/WADI is **not comparable** to thesis synthetic-injection AUC.

## Cross-references

- Concepts: [[combinatorial-optimisation]], [[subspace-anomaly-detection]], [[feature-selection]]
- Related sources: [[linares-barrera-2024-evolutionary-fs-forecasting]], [[contreras-2024-ga-financial-feature-selection]], [[he-2021-mining-anomalies-subspaces]], [[li-2022-vae-ga-outlier-detection]]
