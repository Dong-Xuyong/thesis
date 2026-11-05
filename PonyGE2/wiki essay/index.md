# Wiki Index

Content catalog for the thesis research knowledge base. **28 / 28** core literature sources ingested, plus **article 29** (Van Onsem 2023) for the §3.4 telecom Matrix Profile example.

**Navigation:** [[overview]] · [[research-gap]] · [[log]]

---

## Overview

| Page | Summary |
|------|---------|
| [[overview]] | Thesis topic, research gap, literature sections, current status |
| [[research-gap]] | Integrated gap synthesis across 28 core sources plus Van Onsem 2023 |

---

## Sources

### Anomaly Detection in Telecommunications Networks (1–4)

| Page | Summary | Include |
|------|---------|---------|
| [[gonzalez-2024-one-model]] | DC-VAE on 12 fixed ISP KPIs; TELCO ~732k samples; range-F1 ~52% | Yes |
| [[sultan-2018-cdr-anomaly-detection]] | CDR anomaly detection; Nodobo/Telecom Italia; no detection metrics | Yes |
| [[burgueno-2020-online-anomaly-detection]] | 24k LTE cells; 15/240 KPIs monitored; ~80% network anomalies captured | Yes |
| [[lemaire-2024-urban-events]] | Paris Orange data; urban events; best precision 28.63% | Yes |

### Anomaly Detection in Grouped Time Series (5–8)

| Page | Summary | Include |
|------|---------|---------|
| [[mefleh-2025-mahalanobis]] | Mahalanobis telecom AD; AUC 0.77→0.99 with aggregation | Yes |
| [[garcia-gonzalez-2022-milets-dc-vae]] | MILETS DC-VAE; merge with #1 for S-VAE comparator | Yes |
| [[hua-2022-genad]] | GenAD cross-entity; China Mobile WBS F1 up to 0.953 | Yes |
| [[oguz-2022-multi-tier]] | Multi-tier LSTM/1D CNN; tier context affects detection | Yes |

### Anomaly Detection in Hierarchical Time Series (9–12)

| Page | Summary | Include |
|------|---------|---------|
| [[hong-2012-tiresias]] | Tiresias; >94% anomaly localisation; fixed ISP hierarchy | Yes |
| [[huang-2026-hydra]] | HYDRA; ranked 1st on 40 TSB-AD datasets | Yes |
| [[wolff-2022-hierarchical-search]] | Composite anomaly via hierarchical dynamic search | Yes |
| [[pang-2022-hierarchical-forecasting]] | Hierarchical forecasting/root cause; not detection | Yes |

### Matrix Profile and Discord Detection (13–16, 29)

| Page | Summary | Include |
|------|---------|---------|
| [[yeh-2017-matrix-profile-unifying-view]] | Matrix Profile unifying view; 153.8 d → 1.2 h; STOMP 4.7×; GPU-STAMP 30× | Yes |
| [[zhu-2016-matrix-profile-ii]] | GPU-STOMP; 100M subsequences; ~1,585 yr → 12 days | Yes |
| [[keogh-2005-hot-sax]] | HOT SAX discord foundation; 3–4× orders faster; 82 datasets | Yes |
| [[law-2019-stumpy]] | STUMPY Python MP library; thesis implementation | Yes |
| [[van-onsem-2023-variable-length-motif]] | MP motifs on Skyline telecom KPIs; 3–8× vs VALMOD; not discord/AUC | Yes |

### Combinatorial Optimisation — Time Series (17–20)

| Page | Summary | Include |
|------|---------|---------|
| [[xue-2016-ec-feature-selection-survey]] | EC feature selection survey; 2^n search space | Yes |
| [[linares-barrera-2024-evolutionary-fs-forecasting]] | SEISEN GA+CODEC; electricity features 7704→3813, MAE↓ | Yes |
| [[yeh-2016-matrix-profile-i]] | STAMP; refinery join 153.8 days→6.3 h; MP scorer for candidates | Yes |
| [[contreras-2024-ga-financial-feature-selection]] | GA wrapper AUROC fitness; Bitcoin/Ibovespa ~0.61–0.62 | Optional |
| [[pietron-2025-ad-nev]] | AD-NEv: GA evolves TS subspaces + AE models for AD; mean point-wise F1 0.70 vs 0.54 | Yes |

### Combinatorial Optimisation — Anomaly Detection (21–24)

| Page | Summary | Include |
|------|---------|---------|
| [[he-2021-mining-anomalies-subspaces]] | Subspace+DTW discord; greedy MAP 0.86 vs evo 0.72; 600M txns | Yes |
| [[zhang-2020-many-objective-ec-ad]] | IN-MaOEA 5-objective FS; NSL-KDD; no PDF/numerics | Yes |
| [[riahi-madvar-2021-mi-subspace-outliers]] | MI mRMRD subspace → LOF; avg AUC 80.14% (PDF deep) | Optional |
| [[li-2022-vae-ga-outlier-detection]] | VAEGA VAE + GA subspaces; AUC 0.966–0.970 (PDF deep) | Yes |

### Genetic Programming and Grammatical Evolution (25–28)

| Page | Summary | Include |
|------|---------|---------|
| [[koza-1992-genetic-programming]] | GP foundational book | Ch. 2 mainly |
| [[oneill-2001-grammatical-evolution]] | Core GE; BNF mapping, wrapping; beats GP 2/3 (PDF deep) | Yes |
| [[oneill-2003-grammatical-evolution-book]] | GE book; grammar decoupled from fitness (notes only) | Yes |
| [[fenton-2017-ponyge2]] | PonyGE2 modular Python GE; reproducible runs (PDF deep) | Yes |

---

## Concepts

| Page | Summary | Sources |
|------|---------|---------|
| [[telecom-anomaly-detection]] | Telecom KPI/CDR anomaly detection with sparse labels | 4 |
| [[grouped-time-series]] | Grouping/aggregation dominates detector choice | 4 |
| [[hierarchical-time-series]] | Hierarchy for localisation and search | 4 |
| [[matrix-profile]] | Label-free subsequence similarity structure | 6 |
| [[time-series-discord]] | Anomaly = most distant subsequence | 4 |
| [[combinatorial-optimisation]] | EC/search over subsets with fast scorer | 8 |
| [[feature-selection]] | Evolutionary feature/subset selection | 4 |
| [[subspace-anomaly-detection]] | Anomalies visible in selected subspaces | 3 |
| [[grammatical-evolution]] | BNF grammar + genotype-to-phenotype mapping | 4 |
| [[genetic-programming]] | GP foundation (Ch. 2) | 1 |
| [[auc-fitness]] | ROC-AUC as evolutionary fitness | 3 |

---

## Entities

| Page | Summary |
|------|---------|
| [[telco-dataset]] | González et al. public ISP benchmark (~732k samples) |
| [[mobai-dataset]] | Thesis Vodafone-style CDR/switch data |
| [[ponyge2]] | Python GE engine; modular architecture from Fenton 2017 |
| [[stumpy]] | Matrix Profile Python library |
| [[mobai-grammar]] | BNF grammar for valid aggregation trees (GE #26–28) |

---

## Synthesis

| Page | Summary |
|------|---------|
| [[research-gap]] | No work integrates structure search + MP + telecom + AUC |
| [[chapter-4-thesis-support]] | Ch. 4 vs PonyGE code: §4.1 strong, §4.5 weakest; fitness/MP undocumented in prose |

---

## Raw PDF text

| Page | Summary |
|------|---------|
| [[raw/index\|raw index]] | Full-text extractions from 25 local PDFs (25/28 on disk) |
| `wiki essay/raw/*.md` | One page per article slug — read-only extracted PDF text |

---

## Meta

| Page | Summary |
|------|---------|
| [[log]] | Append-only timeline of wiki activity |
