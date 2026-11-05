---
tags: [combinatorial, subspace, anomaly-detection]
article_number: 23
section: Combinatorial Optimisation in Anomaly Detection
include: optional
authors: Riahi-Madvar et al.
year: 2021
last_updated: 2026-06-26
---

# Riahi-Madvar et al. (2021) — *MI Subspace Selection for Outliers*

## Metadata

- **Raw note:** [Literature Review Articles/23.md](../../Literature%20Review%20Articles/23.md)
- **Raw extraction:** [[../raw/riahi-madvar-2021-mi-subspace-outliers|PDF text extraction]]
- **PDF:** [Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf](../../Literature%20Review%20PDFs/06_Combinatorial_Optimisation_Anomaly_Detection/Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf)
- **DOI / link:** [https://doi.org/10.1016/j.knosys.2020.106733](https://doi.org/10.1016/j.knosys.2020.106733)
- **Include in Ch. 3?** Optional

## APA citation

Riahi-Madvar, M., Akbari Azirani, A., Nasersharif, B., & Raahemi, B. (2021). A new density-based subspace selection method using mutual information for high dimensional outlier detection. *Knowledge-Based Systems, 216*, Article 106733. [https://doi.org/10.1016/j.knosys.2020.106733](https://doi.org/10.1016/j.knosys.2020.106733)

## Application

Two-stage unsupervised pipeline on high-dimensional tabular data: (1) density-based representation plus mutual-information subspace selection (MRD or mRMRD criteria); (2) LOF outlier scoring in the selected low-dimensional projection. Evaluated on 11 real datasets (Reuters-21578, 20Newsgroups, Musk, MNIST, Breast, Ionosphere, etc.) and synthetic datasets D10–D200, compared against LOF, SOD, and HiCS.

## Reported results

- **Table 3 (best AUC % on real data):** mRMRD beats LOF/SOD/HiCS on all 11 datasets; highlights include Reuters-21578 98.51 (vs HiCS 73.46), Musk 91.84 (vs HiCS 89.21), MNIST 88.06 (vs LOF 80.34).
- **Table 5 (5-fold CV average):** mRMRD average AUC 80.14%, rank 1.31; MRD 78.69%, rank 1.77; HiCS 64.35%; LOF 61.21%. Friedman/Iman–Davenport test rejects null (FF = 13.61 > critical 2.61); Bonferroni–Dunn post-hoc confirms mRMRD/MRD significantly better than baselines.
- **Runtime (Table 8, synthetic):** MRD/mRMRD ~0.4–2.6 s vs HiCS 12–280 s and SOD ~13–17 s across D10–D200 dimensions; claimed linear subspace-selection complexity O(N·M) vs HiCS exponential in dimensions.
- **Complexity claim:** Overall O(N·M + N log N) with LOF on projected subspace.

## Key results to cite

Select view first (MI-based mRMRD), then score (LOF). Average cross-validated AUC 80.14% (mRMRD) vs 61.21% (full-space LOF). Best single-dataset AUC 98.51% (Reuters). Sub-second runtime on synthetic high-D vs HiCS minutes. Trim if redundant with #21.

## Thesis relevance

Useful for explaining why selecting the right subspace/view can improve outlier detection. Mirrors thesis two-stage design: grammar selects aggregation structure → Matrix Profile scores discord. Optional cite — He et al. (#21) and Li et al. (#24) are stronger structural analogies for Ch. 3.

## Notes from PDF

- **Method:** Separates subspace selection from outlier scoring (analogous to HiCS decomposition). Proposes Maximum-Relevance-to-Density (MRD) and minimum-Redundancy-Maximum-Relevance-to-Density (mRMRD) using unsupervised mutual information against a density-based target variable.
- **Scorer:** LOF applied only in selected m-dimensional projection; parameters m and MinPts tuned per dataset (Table 4).
- **vs HiCS:** Incremental search without independence assumption among subspace dimensions; avoids combining incomparable LOF scores across subspaces of different sizes.
- **Trade-off:** mRMRD can underperform MRD when redundant features carry unique outlier information (Ionosphere, Breast Diagnostic, Pendigits).
- **Thesis gap:** Tabular feature subspaces, not time-series hierarchy search; LOF scorer, not Matrix Profile; no telecom operational data.

## Cross-references

- Concepts: [[subspace-anomaly-detection]], [[combinatorial-optimisation]]
- Related sources: [[he-2021-mining-anomalies-subspaces]], [[li-2022-vae-ga-outlier-detection]]
