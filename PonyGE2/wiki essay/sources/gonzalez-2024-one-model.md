---
tags: [telecom, deep-learning, anomaly-detection]
article_number: 1
section: Anomaly Detection in Telecommunications Networks
include: yes
authors: González et al.
year: 2024
last_updated: 2026-06-26
---

# González et al. (2024) — *One Model to Find Them All*

## Metadata

- **Raw note:** [Literature Review Articles/1.md](../../Literature%20Review%20Articles/1.md)
- **Raw PDF text:** [[../raw/gonzalez-2024-one-model|gonzalez-2024-one-model]]
- **PDF:** [Gonzalez_2024_One_Model_to_Find_Them_All.pdf](../../Literature%20Review%20PDFs/01_Telecom_Anomaly_Detection/Gonzalez_2024_One_Model_to_Find_Them_All.pdf)
- **DOI / link:** [https://doi.org/10.1109/TNSM.2023.3340146](https://doi.org/10.1109/TNSM.2023.3340146)
- **Include in Ch. 3?** Yes

## APA citation

González, G. G., Tagliafico, S. M., Fernández, A., Sena, G. G., Acuña, J., & Casas, P. (2024). One model to find them all: Deep learning for multivariate time-series anomaly detection in mobile network data. *IEEE Transactions on Network and Service Management, 21*(2), 1601-1616. [https://doi.org/10.1109/TNSM.2023.3340146](https://doi.org/10.1109/TNSM.2023.3340146)

## Application

One multivariate **DC-VAE** (Dilated Convolutional VAE) model for anomaly detection in mobile ISP monitoring counters/KPIs. A single model learns the complete 12-dimensional MTS process in real time via causal sliding windows; anomalies are flagged when observations fall outside per-series normal-operation regions (μ ± ασ). Evaluation is on the operational **TELCO** dataset (Jan–Jul 2021, expert NOC labels) with benchmarking against 18 traditional univariate detectors (ENS-15 ensemble), S-EXPS, ARIMA, and S-VAE; secondary evaluation on SWaT with GAN baselines.

## Reported results

**TELCO dataset:** 732,607 samples over 7 months, 12 time series, 5-min granularity, 9,137 labeled anomalies (1.2%). Split: training 310,974 (3 months, 1.8% anomalous); validation 103,680 (1 month, 0.4%); testing 317,953 (3 months, 1.0%).

**DC-VAE test range-metrics (F1_r):** mean recall 67%, precision 47%, F1 52%; **median F1 59%**. F1_r ~60% on 8/12 series; performance varies strongly by series (cf. anomaly density in Table II). On average, DC-VAE is **similar to S-EXPS and ARIMA** but operates multivariately in one model; S-VAE substantially worse (see [[garcia-gonzalez-2022-milets-dc-vae]] for per-series S-VAE numbers). α_m sensitivity thresholds tuned per series on train/validation (grid search 1–5σ) to maximise F1.

**SWaT (secondary):** 51 time series, 11 days, 36 controlled attacks (~5.8% anomalous samples); DC-VAE competitive with literature GAN baselines.

## Key results to cite

DC-VAE on 12 fixed ISP KPIs. TELCO: ~732k samples, 1.2% NOC labels, Jan–Jul 2021. Test range-F1_r: R67%, P47%, F152%, median F159%. ≈S-EXPS/ARIMA; α tuned on labels. Real in-the-wild telecom detection much harder than benchmark datasets.

## Thesis relevance

Strong telecom anomaly-detection example using real mobile operational time series and sparse labels. Core telecom opener: sparse labels, modest F1 on a **fixed 12-series view**. Gap: *which* aggregation to score, not *how* to score a pre-selected view. Do not compare range-F1_r to thesis synthetic AUC without qualification. Merge #6 for S-VAE comparator only (median F1 31% vs 59%).

## Notes from PDF

- **Architecture:** DC-VAE encoder/decoder with dilated causal convolutions; sliding window **T = 512** samples (~2 days), calibrated via MAE and variance score on validation; latent space J ∈ {4, 8}. TPE hyperparameter search (50 trials); DC-VAE trains ≥33% faster than RNN equivalent on Nvidia GTX 1060.
- **Detection rule:** anomaly in series m at time t if |x_m(t) − μ_m(t)| > α_m × σ_m(t); per-series α_m independent.
- **Metrics:** Range-based R_r, P_r, F1_r (Tatbul et al.); correct if ≥1 sample in predicted range overlaps real anomaly range; real ranges pre-smoothed with rectangular convolution for labeling uncertainty.
- **Benchmarks:** 15 univariate detectors → **ENS-15** majority vote (≥4 models); plus S-EXPS, ARIMA, S-VAE (T=1 snapshot VAE). No single method dominates all 12 series.
- **TELCO release:** Public dataset and code at [https://github.com/GastonGarciaGonzalez/DC-VAE](https://github.com/GastonGarciaGonzalez/DC-VAE); full operator data spans ~2 years but only 7 months have expert labels.
- **Authors' finding:** Manual expert labeling is error-prone; outliers in data may not be labeled anomalies and vice versa. Real operational MTS AD is substantially harder than Yahoo/Numenta-style benchmarks.
- **Thesis gap:** Fixed 12-series view chosen before detection; does not search which aggregation/view to monitor.

## Cross-references

- Concepts: [[telecom-anomaly-detection]], [[grouped-time-series]]
- Related sources: [[garcia-gonzalez-2022-milets-dc-vae]], [[mefleh-2025-mahalanobis]]
- Entities: [[telco-dataset]]
