---
tags: [combinatorial, feature-selection]
source_count: 4
last_updated: 2026-06-26
---

# Evolutionary Feature Selection

## Definition

Using evolutionary algorithms to search subsets of input features or time series, optimising a downstream task metric (forecast error, AUC, detection rate). Search space **2^n** for n features (Xue et al. 2016). **Filter** methods evaluate subsets independently of the target algorithm; **wrapper** methods use the classifier/learner as a black-box fitness function (typically better performance for that algorithm).

EC paradigms: GA (crossover/mutation on bit-string subsets), PSO (velocity-guided search), GP (feature construction), ACO (graph traversal), DE and hybrids.

## Papers that use it

- [[xue-2016-ec-feature-selection-survey]] — comprehensive survey; 500+ papers 2010–2015; no single headline result
- [[linares-barrera-2024-evolutionary-fs-forecasting]] — electricity MAE 207→194; features halved
- [[contreras-2024-ga-financial-feature-selection]] — GA + AUROC on financial series (optional)
- [[zhang-2020-many-objective-ec-ad]] — many-objective FS for intrusion detection

## Thesis application

Analogous to pruning uninformative aggregation paths — GE selects which branches of the hierarchy to include, not which raw KPI columns. Wrapper-style fitness (AUC on injected anomalies) evaluates each structure candidate, paralleling EC wrapper feature selection (Xue et al. 2016).

## Open questions / gaps

Feature selection literature selects columns; thesis selects **aggregation tree structures** over CDR dimensions.

## Related concepts

- [[combinatorial-optimisation]]
- [[auc-fitness]]
