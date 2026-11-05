---
tags: [synthesis, research-gap]
source_count: 29
last_updated: 2026-09-07
---

# Research Gap Synthesis

## The integrated thesis framework

| Component | Role in thesis |
|-----------|----------------|
| Grammatical Evolution (PonyGE2) | Search valid hierarchical aggregation structures |
| Matrix Profile (STUMPY) | Label-free discord scorer per candidate series |
| Telecom CDR/switch data (Mobai) | Operational domain |
| ROC-AUC fitness | Rank structures on synthetic injected anomalies |

## What the literature covers (partially)

| Component | Closest papers | What's missing |
|-----------|----------------|----------------|
| Structure search | [[wolff-2022-hierarchical-search]], [[he-2021-mining-anomalies-subspaces]], [[li-2022-vae-ga-outlier-detection]] | Not GE + grammar over telecom hierarchies |
| Matrix Profile scorer | [[yeh-2017-matrix-profile-unifying-view]], [[law-2019-stumpy]], [[van-onsem-2023-variable-length-motif]] | Van Onsem uses MP on telecom KPIs for **motifs**, not discord scoring of searched aggregations |
| Telecom operational data | [[gonzalez-2024-one-model]], [[mefleh-2025-mahalanobis]], [[burgueno-2020-online-anomaly-detection]] | Fixed views; no aggregation search |
| AUC-based evaluation | [[mefleh-2025-mahalanobis]], [[contreras-2024-ga-financial-feature-selection]], [[li-2022-vae-ga-outlier-detection]] | Not integrated with MP + telecom hierarchy search |

## Section arguments (Ch. 3 closing lines)

1. **Telecom AD (1–4):** Labels scarce; fixed views underperform → aggregation matters
2. **Grouped TS (5–8):** Representation dominates detector → need to search views
3. **Hierarchical TS (9–12):** Hierarchy enables localisation → forecasting ≠ detection
4. **Matrix Profile (13–16, 29):** Label-free scalable scorer; Van Onsem applies MP to telecom KPIs for motifs, not discords + search
5. **Combinatorial TS (17–20):** Selection is combinatorial → EC + fast scorer + AUC
6. **Combinatorial AD (21–24):** Anomalies in subspaces → scorer + search combined
7. **GP/GE (25–28):** Grammar generates valid hierarchies → PonyGE2 implements

## Conclusion

**No reviewed work integrates all four:** structure search + Matrix Profile **discord** scoring + telecom operational data + AUC-based evaluation. Van Onsem et al. (2023) pair Matrix Profile with telecom KPIs but only for motif discovery on fixed series.

## Cross-references

- [[overview]]
- All 28 source pages in `wiki essay/sources/`
