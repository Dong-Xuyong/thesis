---
tags: [combinatorial, vae, ga, anomaly-detection]
article_number: 24
section: Combinatorial Optimisation in Anomaly Detection
include: yes
authors: Li et al.
year: 2022
last_updated: 2026-06-26
---

# Li et al. (2022) — *VAE + GA for High-Dimensional Outliers*

## Metadata

- **Raw note:** [Literature Review Articles/24.md](../../Literature%20Review%20Articles/24.md)
- **Raw extraction:** [[../raw/li-2022-vae-ga-outlier-detection|PDF text extraction]]
- **PDF:** [Li_2022_VAE_GA_Outlier_Detection.pdf](../../Literature%20Review%20PDFs/06_Combinatorial_Optimisation_Anomaly_Detection/Li_2022_VAE_GA_Outlier_Detection.pdf)
- **DOI / link:** [https://doi.org/10.3390/a15110429](https://doi.org/10.3390/a15110429)
- **Include in Ch. 3?** Yes

## APA citation

Li, J., Zhang, J., Bah, M. J., Wang, J., Zhu, Y., Yang, G., Li, L., & Zhang, K. (2022). An auto-encoder with genetic algorithm for high dimensional data: Towards accurate and interpretable outlier detection. *Algorithms, 15*(11), Article 429. [https://doi.org/10.3390/a15110429](https://doi.org/10.3390/a15110429)

## Application

VAEGA two-module model on five UCI-style benchmark datasets (Cardio 21-D, Credit Card 30-D, Satellite 36-D, MUSK 166-D, Arrhythmia 274-D). Module 1: VAE trained on normal data; reconstruction error + hidden-space sampling for tentative outlier detection. Module 2: GA searches abnormal subspaces of candidate outliers; fitness = degree of abnormality per subspace; top subspace gives interpretable feature context and filters false positives back to VAE.

## Reported results

- **Table 3 AUC (VAEGA vs 9 baselines):** Cardio 0.966, Credit Card 0.966, Satellite 0.970, MUSK 0.957, Arrhythmia 0.863. Best or competitive vs OC-SVM, ABOD, HBOS, LOF, IForest, MOGAAL, DSEBM, AE, VAE on each dataset.
- **vs pure VAE:** VAEGA AUC improvements on all five datasets; authors report ~3% average improvement over unimproved VAE (largest gains on low outlier-rate Credit Card).
- **Table 2 accuracy:** VAEGA 0.851–0.950 vs VAE 0.803–0.901 across datasets.
- **Interpretability:** GA-identified abnormal subspaces cluster to explain which features drive each outlier; false-positive feedback retrains VAE weights.

## Key results to cite

Strongest structural analogy in combinatorial-AD section: anomaly scorer (VAE/MP) + evolutionary search over interpretable structures (GA subspaces / GE hierarchies). VAEGA AUC up to 0.970 (Satellite). Pair with #21 (He subspace mining).

## Thesis relevance

Direct parallel to thesis pipeline: fast scorer evaluates candidates; evolutionary search explores combinatorial structure space; AUC-style ranking selects best configuration. Thesis replaces VAE with Matrix Profile discord and GA feature subsets with GE grammar-defined telecom aggregations. **Do not** equate benchmark tabular AUC with thesis synthetic-injection AUC without qualification.

## Notes from PDF

- **Two-stage design:** Explicit separation — VAE layer detects candidates; GA layer searches subspace explanations and reduces false positives.
- **GA role:** Encodes outlier subspaces as chromosomes; fitness = redeﬁned abnormality degree; selects highest-anomaly subspace per point.
- **Baselines:** 10 methods including MOGAAL (also GA-based) and pure VAE/AE; VAEGA wins AUC on 4/5 datasets outright.
- **Limitation:** Tabular benchmarks, not telecom time series; VAE reconstruction scorer, not label-free discord detection.
- **Thesis mapping:** VAE → STUMPY MP discord score; GA subspace chromosome → GE phenotype from `mobai.pybnf`; AUC fitness aligns with Table 3 evaluation philosophy.

## Cross-references

- Concepts: [[subspace-anomaly-detection]], [[combinatorial-optimisation]], [[auc-fitness]]
- Related sources: [[he-2021-mining-anomalies-subspaces]], [[riahi-madvar-2021-mi-subspace-outliers]]
