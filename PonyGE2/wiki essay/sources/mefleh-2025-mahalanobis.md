---
tags: [telecom, grouped-ts, mahalanobis]
article_number: 5
section: Anomaly Detection in Grouped Time Series
include: yes
authors: Mefleh et al.
year: 2025
last_updated: 2026-06-26
---

# Mefleh et al. (2025) — *Beyond the Norm (Mahalanobis)*

## Metadata

- **Raw note:** [Literature Review Articles/5.md](../../Literature%20Review%20Articles/5.md)
- **Raw PDF text:** [[../raw/mefleh-2025-mahalanobis|mefleh-2025-mahalanobis]]
- **PDF:** [Mefleh_2025_Beyond_the_Norm_Mahalanobis.pdf](../../Literature%20Review%20PDFs/02_Grouped_Time_Series/Mefleh_2025_Beyond_the_Norm_Mahalanobis.pdf)
- **DOI / link:** [https://doi.org/10.3390/computers14120561](https://doi.org/10.3390/computers14120561)
- **Include in Ch. 3?** Yes

## APA citation

Mefleh, A., Debicki, M. P., Mubarak, A., Saade, M., & Weill, N. (2025). Beyond the norm: Unsupervised anomaly detection in telecommunications with Mahalanobis distance. *Computers, 14*(12), Article 561. [https://doi.org/10.3390/computers14120561](https://doi.org/10.3390/computers14120561)

## Application

Unsupervised **Mahalanobis Distance (MD)** anomaly detection for telecom KPIs with hierarchical aggregation (cells → sectors → sites) and **SHAP** contributor analysis for interpretability. Four sequential experiments optimise KPI **representation** (raw values, denominators, ratio adjustments, learned smoothing constants) before benchmarking against Isolation Forest, LOF, and One-Class SVM on operator data (165 network elements, 44 KPI features).

## Reported results

**AUC progression (Method 1 / raw KPI track):**
| Stage | AUC |
|-------|-----|
| Raw KPI only | 0.77 |
| + KPI denominators (attempt counts) | 0.86 |
| Adjusted ratios + denominators (fixed constant) | 0.93 |
| Learned numerator adjustment + denominators | **0.99** |

Alternative learned adjustments: denominator-only smoothing **0.98**; combined numerator+denominator **0.96**. Lag features (t−24) and seasonal-residual representations underperform raw KPI (AUC 0.62 and 0.73 without denominators).

**Speed (large benchmark, 165 elements):** MD **AUC 0.86 in 1.87 s** vs One-Class SVM **4 h 34 min 15 s** (IF 58.5 s, LOF 9 min 49 s on same hardware).

Eval subsets: Experiment 1 on 20 element IDs; training typically 1 month / 165 IDs; labeled evaluation windows of 3 days.

## Key results to cite

AUC: 0.77 (raw KPI) → 0.86 (denominators) → 0.93 (adjusted + denominator) → 0.99 (learned adjustment). MD AUC 0.86 in 1.87s vs One-Class SVM 4h34m15s.

## Thesis relevance

Lead grouped TS section. **Representation/aggregation dominates scorer choice** — largest AUC gains from changing KPI view, not switching MD to SVM. Strongest telecom evidence that changing the view changes detection quality. Frame gap: Mefleh et al. **hand-design** aggregation and KPI transforms; thesis **searches** valid aggregation trees via GE grammar. Thesis AUC fitness on synthetic injection is related but not directly comparable to operator-labeled AUC here.

## Notes from PDF

- **MD workflow:** Train on normal data → flag high MD scores → SHAP on flagged anomalies only (efficiency) → aggregate scores Cell → Site for localisation.
- **Denominator rationale:** KPI ratios n/d anchored to attempt volume; small denominators amplify spurious anomalies.
- **Experiment 4 constants:** Data-driven — denominator constant = mean attempts per element per window; numerator constant scaled from 99th-quantile reference KPI (log₁₀ transformed for heterogeneity).
- **Seasonality:** Larger windows and seasonal decomposition did **not** help; introduced noise or lost information.
- **Feature selection loop:** Iteratively remove features that improve AUC when dropped (wrapper-style).
- **Thesis gap:** Fixed hierarchy (cell/sector/site) and hand-crafted KPI transforms; no grammar-constrained search over aggregation structures.

## Cross-references

- Concepts: [[grouped-time-series]], [[telecom-anomaly-detection]], [[auc-fitness]]
- Related sources: [[gonzalez-2024-one-model]], [[garcia-gonzalez-2022-milets-dc-vae]]
