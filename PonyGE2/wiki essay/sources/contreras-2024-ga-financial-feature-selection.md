---
tags: [combinatorial, ga, auc]
article_number: 20
section: Combinatorial Optimisation for Selecting Time Series
include: optional
authors: Contreras et al.
year: 2024
last_updated: 2026-06-26
---

# Contreras et al. (2024) — *GA for Financial Time-Series Monotonicity*

## Metadata
- **Raw note:** [Literature Review Articles/20.md](../../Literature%20Review%20Articles/20.md)
- **PDF:** [Contreras_2024_GA_Financial_Feature_Selection.pdf](../../Literature%20Review%20PDFs/05_Combinatorial_Optimisation_Time_Series/Contreras_2024_GA_Financial_Feature_Selection.pdf)
- **Raw extraction:** [[../raw/contreras-2024-ga-financial-feature-selection|contreras-2024-ga-financial-feature-selection]]
- **DOI / link:** https://doi.org/10.3390/e26030177
- **Include in Ch. 3?** Optional

## APA citation

Contreras, R. C., Xavier da Silva, V. T., Xavier da Silva, I. T., Viana, M. S., Santos, F. L. dos, Zanin, R. B., Martins, E. F. O., & Guido, R. C. (2024). Genetic algorithm for feature selection applied to financial time series monotonicity prediction: Experimental cases in cryptocurrencies and Brazilian assets. *Entropy, 26*(3), Article 177. [https://doi.org/10.3390/e26030177](https://doi.org/10.3390/e26030177)

## Application

Two GA-based feature-selection systems for **daily direction (up/down) classification** of financial time series. **E1:** Bitcoin with 264+ engineered attributes (commodity indices, hash rate, on-chain metrics). **E2/E3:** Ibovespa index and Vale stock with Brazilian and global market series. GA uses **filter** (correlation-based fitness) or **wrapper** (classifier AUROC as fitness) strategies; classifiers include KNN, SVM, RF, Decision Tree. Two prediction intervals (I1, I2) per asset.

## Reported results

| Asset | Best AUROC | Best accuracy (example) | Notes |
|-------|-----------|------------------------|-------|
| Bitcoin (E1) | 0.61 | 55.45% (SVM, no FS, I2) | Best I1: 0.60 AUROC / 59.81% |
| Ibovespa (E2) | 0.62 | 59.86% (I1, DT + wrapper) | Best I2: 0.61 AUROC / 61.44% |
| Vale (E3) | 0.58 | 57.41% (I2, DT) | Best I1: 0.57 AUROC / 56.34% |

Wrapper GA with AUROC fitness generally outperforms filter on Ibovespa/Vale. Modest AUROC (~0.58–0.62) reflects difficulty of daily direction prediction.

## Key results to cite

Best AUROC: Bitcoin 0.61, Ibovespa 0.62, Vale 0.58. Example best interval: 0.62 AUROC / 59.86% accuracy and 0.61 AUROC / 61.44% accuracy.

## Thesis relevance

Parallel design: evolutionary feature/structure search with **AUROC-style fitness** — same evaluation philosophy as thesis `hierarchy_auc`. Optional cite only if space allows; financial daily-direction task differs from telecom anomaly discord detection. Do not treat modest AUROC as directly comparable to thesis synthetic-injection AUC without qualification.

## Notes from PDF

- **Task:** Binary classification of next-day price movement (monotonicity), not anomaly detection.
- **GA fitness:** Wrapper method uses **AUROC** from held-out classifier evaluation; filter uses correlation-based formula from Cho et al. (2019).
- **Feature sets:** Four input formats tested (D1–D4): raw levels, percentage variation, etc.; percentage variation often competitive with fewer attributes.
- **Hyperparameters:** Population size, generations, mutation rate tuned per experiment; grid search over classifier hyperparameters after FS.
- **Comparison:** Outperforms Mallqui & Fernandes (2019) on AUROC for Bitcoin but not always on accuracy.
- **Thesis gap:** Selects correlated market features, not grammar-defined CDR aggregation trees; AUROC on direction labels ≠ synthetic anomaly injection AUC.

## Cross-references
- Concepts: [[combinatorial-optimisation]], [[auc-fitness]], [[feature-selection]]
- Related sources: [[li-2022-vae-ga-outlier-detection]], [[xue-2016-ec-feature-selection-survey]]
