---
tags: [combinatorial, feature-selection, evolutionary]
article_number: 18
section: Combinatorial Optimisation for Selecting Time Series
include: yes
authors: Linares-Barrera et al.
year: 2024
last_updated: 2026-06-26
---

# Linares-Barrera et al. (2024) — *Evolutionary FS for Forecasting*

## Metadata
- **Raw note:** [Literature Review Articles/18.md](../../Literature%20Review%20Articles/18.md)
- **PDF:** [Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf](../../Literature%20Review%20PDFs/05_Combinatorial_Optimisation_Time_Series/Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf)
- **Raw extraction:** [[../raw/linares-barrera-2024-evolutionary-fs-forecasting|linares-barrera-2024-evolutionary-fs-forecasting]]
- **DOI / link:** https://doi.org/10.1145/3605098.3636191
- **Include in Ch. 3?** Yes

## APA citation

Linares-Barrera, M. L., Jimenez-Navarro, M. J., Brito, I. S., Riquelme, J. C., & Martínez-Ballesteros, M. (2024). Evolutionary feature selection for time-series forecasting. In *Proceedings of the 39th ACM/SIGAPP Symposium on Applied Computing* (pp. 395-399). ACM. [https://doi.org/10.1145/3605098.3636191](https://doi.org/10.1145/3605098.3636191)

## Application

Filter-based evolutionary feature selection (**SEISEN**) for multivariate time-series forecasting. A GA minimises the **Conditional Dependence Coefficient (CODEC)** over binary feature-subset chromosomes; selected lags feed an MLP regressor. Evaluated on six multivariate forecasting tasks (Torneo pollutants ×4, Electricity, Traffic) with 70/15/15 train/validation/test splits, fixed-size lag windows, and Bayesian hyperparameter tuning on the validation set.

## Reported results

| Dataset | MAE (no selection) | MAE (SEISEN) | Features (no sel.) | Features (SEISEN) |
|---------|-------------------|--------------|--------------------|-------------------|
| Electricity | 207.193 | 194.400 | 7704 | 3813 |
| Traffic | 0.008 | 0.007 | 20688 | 10316 |
| Torneo NO₂ | 1.400 | 1.380 | 168 | 64 |
| Torneo PM10 | 1.274 | 1.260 | 168 | 58 |

SEISEN improves or matches baseline MAE on four of six datasets while roughly halving feature count on high-dimensional sets (Electricity −50%, Traffic −50%).

## Key results to cite

Electricity MAE/features: 207.193/7704 → 194.400/3813. Traffic: 0.008/20688 → 0.007/10316. SEISEN halves inputs while preserving or improving forecast error.

## Thesis relevance

Shows evolutionary search can reduce time-series input size while preserving or improving performance — direct analogy to pruning uninformative aggregation paths in the thesis grammar. EC + fast subset fitness (CODEC) mirrors GE + MP discord scoring loop; difference is they select lag columns, thesis selects hierarchy branches.

## Notes from PDF

- **Method:** SEISEN = GA + CODEC filter fitness. Binary chromosomes mark features for *removal* (inverse strategy: GA minimises CODEC to identify least-dependent features). GA: 30% elitism, three-parent two-point crossover, 60% mutation rate flipping 80% of genes.
- **Downstream model:** Fully connected MLP (1–2 hidden layers, 50–100 ReLU units); Adam optimizer; early stopping; Bayesian hyperparameter search on validation set.
- **Datasets:** Torneo (168 features each, 4 pollutant targets), Electricity (1095 instances, 7704 features), Traffic (730 instances, 20688 features — 10-min occupancy, predict 1 h ahead).
- **No threshold tuning:** Unlike many filter methods, CODEC evaluates collective subset merit without feature-count thresholds.
- **Authors' finding:** Most effective on high-dimensional datasets; consistently reduces features without compromising efficacy.
- **Thesis gap:** Selects input lags/columns, not interpretable aggregation tree structures over CDR dimensions.

## Cross-references
- Concepts: [[combinatorial-optimisation]], [[feature-selection]]
- Related sources: [[xue-2016-ec-feature-selection-survey]]
