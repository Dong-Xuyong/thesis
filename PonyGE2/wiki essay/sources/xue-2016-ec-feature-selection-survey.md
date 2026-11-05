---
tags: [combinatorial, feature-selection, evolutionary]
article_number: 17
section: Combinatorial Optimisation for Selecting Time Series
include: yes
authors: Xue et al.
year: 2016
last_updated: 2026-06-26
---

# Xue et al. (2016) — *Survey on EC for Feature Selection*

## Metadata

- **Raw note:** [Literature Review Articles/17.md](../../Literature%20Review%20Articles/17.md)
- **Raw extraction:** [[../raw/xue-2016-ec-feature-selection-survey|PDF text extraction]]
- **PDF:** [Xue_2016_EC_Feature_Selection_Survey.pdf](../../Literature%20Review%20PDFs/05_Combinatorial_Optimisation_Time_Series/Xue_2016_EC_Feature_Selection_Survey.pdf)
- **DOI / link:** [https://doi.org/10.1109/TEVC.2015.2504420](https://doi.org/10.1109/TEVC.2015.2504420)
- **Include in Ch. 3?** Yes

## APA citation

Xue, B., Zhang, M., Browne, W. N., & Yao, X. (2016). A survey on evolutionary computation approaches to feature selection. *IEEE Transactions on Evolutionary Computation, 20*(4), 606-626. [https://doi.org/10.1109/TEVC.2015.2504420](https://doi.org/10.1109/TEVC.2015.2504420)

## Application

Comprehensive survey of evolutionary computation (EC) for feature selection in classification/data mining. Covers GA, GP, PSO, ACO, DE, and hybrid methods; filter, wrapper, and embedded evaluation criteria; single- and multi-objective formulations. Focus on classification (most literature); notes applications also in clustering, regression, and time series prediction.

## Reported results

Survey source — no single practical application or headline quantified result. Key structural claims:
- Search space size **2^n** for n features; exhaustive search impractical for most datasets.
- **500+ papers** on EC feature selection in five years to 2015; GA and PSO publication counts rose sharply after 2007.
- Traditional methods (greedy, heuristic, random) suffer **stagnation in local optima** and/or high computational cost; EC valued for global search.

## Key results to cite

Survey — no single headline result. Combinatorial search space 2^n; EC as global search for subset selection.

## Thesis relevance

Justifies feature/subset selection as a combinatorial optimisation problem.
One paragraph: subset selection is a mature combinatorial optimisation problem. No quantified results to report.

## Notes from PDF

- **Filter vs wrapper:** Filters evaluate feature subsets independently of classifier (cheaper, more general); wrappers use classifier as black-box fitness (better performance for target algorithm). Embedded methods grouped with wrappers.
- **EC paradigms reviewed:** GA (building-block combination via crossover/mutation — suited to interacting feature groups); PSO (structured neighbourhood, fast convergence); GP (flexible feature construction); ACO (graph-based subset search); DE and hybrids.
- **Evaluation measures:** Classification accuracy/error, sensitivity/specificity, AUC, mutual information, consistency measures — wrapper fitness can mirror thesis AUC-based evaluation pattern.
- **Challenges identified:** Large-scale problems (thousands–tens of thousands of features); feature interaction; representation scaling; parameter control; multi-objective trade-offs (accuracy vs subset size).
- **Thesis analogy:** GE over grammar-defined hierarchies is combinatorial structure search analogous to EC feature subset search — but thesis selects aggregation tree branches, not raw KPI columns; Matrix Profile discord score replaces classifier wrapper fitness.

## Cross-references

- Concepts: [[combinatorial-optimisation]], [[feature-selection]]
- Related sources: [[linares-barrera-2024-evolutionary-fs-forecasting]], [[contreras-2024-ga-financial-feature-selection]]
