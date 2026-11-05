---
tags: [hierarchical-ts, telecom, anomaly-detection]
article_number: 9
section: Anomaly Detection in Hierarchical Time Series
include: yes
authors: Hong et al.
year: 2012
last_updated: 2026-06-26
---

# Hong et al. (2012) — *Tiresias*

## Metadata

- **Raw note:** [Literature Review Articles/9.md](../../Literature%20Review%20Articles/9.md)
- **PDF:** [Hong_2012_Tiresias.pdf](../../Literature%20Review%20PDFs/03_Hierarchical_Time_Series/Hong_2012_Tiresias.pdf)
- **Raw PDF text:** [[../raw/hong-2012-tiresias|hong-2012-tiresias]]
- **DOI / link:** [https://doi.org/10.1109/ICDCS.2012.30](https://doi.org/10.1109/ICDCS.2012.30)
- **Include in Ch. 3?** Yes

## APA citation

Hong, C.-Y., Caesar, M., Duffield, N., & Wang, J. (2012). Tiresias: Online anomaly detection for hierarchical operational network data. In *2012 IEEE 32nd International Conference on Distributed Computing Systems* (pp. 173-182). IEEE. [https://doi.org/10.1109/ICDCS.2012.30](https://doi.org/10.1109/ICDCS.2012.30)

## Application

Online anomaly detection and localisation over hierarchical ISP operational data at a Tier-1 US broadband provider. Two case studies: **CCD** (customer care call logs — multi-level call-reason hierarchy) and **SCD** (signalling call detail records). Pipeline: (1) online succinct hierarchical heavy hitter (SHHH) detection, (2) per-node time-series construction via adaptive algorithm **ADA**, (3) Holt-Winters seasonal forecasting for spike anomalies, (4) web front-end for operator queries. Sliding window ℓ = 8,064 (12 weeks); timeunits 15 min (CCD) or 1 hour (SCD).

## Reported results

**ADA vs strawman STA (system performance):**

| Metric | ADA improvement |
|--------|-----------------|
| Running time | 14.2× lower (15-min timeunits); 5.4× (1-hour) |
| Memory | ~2× lower (~36–43% of STA) |
| Time-series error | <1% absolute error (avg 0.8% on SCD) |
| Anomaly identification | 99.7% accuracy (EWMA split heuristic) |

**vs ISP reference method (CCD, Sep 14–24 2010, Table VI):**

| Metric | Value |
|--------|-------|
| Type 1 accuracy (TP+TN)/cases | 94.1% |
| True alarms / (TP+MA) | 90.9% |
| True negatives / (TN+NA) | 94.1% |

Tiresias finds >94% of reference anomalies (VHO-level control charts) and discovers previously unknown anomalies at finer hierarchy levels. ~125 heavy hitters (busy) / ~5 (quiet) in CCD; ~500 in SCD.

## Key results to cite

>94% accuracy locating anomalies vs ISP reference; ADA: 14.2× runtime, 2× memory, <1% TS error, 99.7% identification accuracy. Closest precedent for hierarchical operational network localisation.

## Thesis relevance

Anchor the hierarchy section. Closest precedent for hierarchical operational network anomaly localisation. Contrast: Tiresias uses a **fixed additive hierarchy** + Holt-Winters forecasting on ISP call logs; thesis **searches partial aggregations** over switch/CDR data with Matrix Profile + GE + AUC fitness. Tiresias cannot detect drop anomalies (link outages) or non-customer-impacting events.

## Notes from PDF

- **Hierarchy model:** Succinct hierarchical heavy hitters (SHHH) avoid redundant parent/child anomaly reports; nodes weighted by discounted counts.
- **ADA innovation:** Maintains one tree (not ℓ trees); adapts time series from previous timeunit via split/merge — avoids traversing full history each step.
- **Limitations:** Additive hierarchy only (not DAG); spike detection only; miscategorised customer calls break localisation; requires customer-visible impact.
- **Reference comparison:** ISP ground truth only at VHO (first network level); Tiresias can localise finer (true alarm if Tiresias node is descendant of reference location).
- **Implementation:** C++ on 2.4 GHz Solaris cluster; sensitivity thresholds RT=2.8, DT=8.

## Cross-references

- Concepts: [[hierarchical-time-series]], [[telecom-anomaly-detection]]
- Related sources: [[wolff-2022-hierarchical-search]]
