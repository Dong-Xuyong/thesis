---
tags: [hierarchical-ts, forecasting]
article_number: 12
section: Anomaly Detection in Hierarchical Time Series
include: yes
authors: Pang et al.
year: 2022
last_updated: 2026-06-26
---

# Pang et al. (2022) — *Hierarchical Forecasting and Root Cause*

## Metadata

- **Raw note:** [Literature Review Articles/12.md](../../Literature%20Review%20Articles/12.md)
- **PDF:** [Pang_2022_Hierarchical_Forecasting_Root_Cause.pdf](../../Literature%20Review%20PDFs/03_Hierarchical_Time_Series/Pang_2022_Hierarchical_Forecasting_Root_Cause.pdf)
- **Raw PDF text:** [[../raw/pang-2022-hierarchical-forecasting|pang-2022-hierarchical-forecasting]]
- **DOI / link:** [https://doi.org/10.5220/0010900500003122](https://doi.org/10.5220/0010900500003122)
- **Include in Ch. 3?** Yes

## APA citation

Pang, Y., Pan, J., Li, X., Zheng, J., Sun, T., & Li, Q. (2022). Exploring enterprise operating indicator data by hierarchical forecasting and root cause analysis. In *Proceedings of the 11th International Conference on Pattern Recognition Applications and Methods* (pp. 716-721). SCITEPRESS. [https://doi.org/10.5220/0010900500003122](https://doi.org/10.5220/0010900500003122)

## Application

Multi-dimensional analysis on hierarchical enterprise operating indicators (financial technology company): **bottom-up LightGBM forecasting** → **top-down forecast allocation** → **forecast-residual anomaly detection** at top level → **adtributor-style root-cause drill-down** to middle and bottom levels. Hierarchy: 1 top (headquarter), 2 middle (bank card type), 74 bottom (administrative division) series; daily count and amount indicators, Jan 2019–Jul 2021. Known anomaly: Apr 18, 2021 transaction-count decline.

## Reported results

**Forecasting accuracy (MAPE, clean 2019–2020 training data, Table 2):**

| Method | Count MAPE | Amount MAPE |
|--------|------------|-------------|
| Lasso Regression | 4.49% | 6.05% |
| XGBoost | 3.85% | 5.33% |
| **LightGBM** | **3.51%** | **4.95%** |

LightGBM detects mid-April anomaly where linear regression misses it (Figure 4). Post-event May forecasts: MAPE 8.74%–20.99% on outlier days (Table 3).

**Root cause (validated against expert knowledge):**

- Middle level: type A1 effect 0.97 vs A2 effect 0.03 (Table 4).
- Bottom level: top-5 divisions under A1 identified (A1B1–A1B5; effects 0.05–0.12; Table 5).

No detection precision/recall/F1 reported — forecasting and drill-down only.

## Key results to cite

Hierarchy: 1 top, 2 middle, 74 bottom series. LightGBM MAPE: count 3.51%, amount 4.95% (beats Lasso and XGBoost). Root-cause location matches expert validation.

## Thesis relevance

Forecast/root-cause drill-down only — **not a detection benchmark**. Useful to show hierarchy literature often targets forecasting + interpretation, not label-free discord scoring. Trim first if space tight. Contrast: Pang detects via forecast residuals at fixed hierarchy; thesis searches which aggregation to score with MP + AUC.

## Notes from PDF

- **Pipeline:** Historical fit (Jan 2019–Aug 2020) → test (Sep 2020–Jul 2021) → 10-day-ahead rolling forecasts → top-level residual threshold for anomaly flag → top-down allocation → adtributor quantifies sub-indicator contribution.
- **Anomaly rule:** Real value outside forecast confidence interval at timestamp → anomaly.
- **Privacy:** Original values and results processed/scaled in paper.
- **Future work (authors):** Finer-grained indicator detection.
- **SARIMA excluded:** Too expensive computationally vs ML baselines.

## Cross-references

- Concepts: [[hierarchical-time-series]]
- Related sources: [[hong-2012-tiresias]]
