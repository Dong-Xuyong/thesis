---
tags: [telecom, kpi, anomaly-detection]
article_number: 3
section: Anomaly Detection in Telecommunications Networks
include: yes
authors: Burgueño et al.
year: 2020
last_updated: 2026-06-26
---

# Burgueño et al. (2020) — *Online Anomaly Detection System for Mobile Networks*

## Metadata

- **Raw note:** [Literature Review Articles/3.md](../../Literature%20Review%20Articles/3.md)
- **Raw PDF text:** [[../raw/burgueno-2020-online-anomaly-detection|burgueno-2020-online-anomaly-detection]]
- **PDF:** [Burgueno_2020_Online_Anomaly_Detection_Mobile_Networks.pdf](../../Literature%20Review%20PDFs/01_Telecom_Anomaly_Detection/Burgueno_2020_Online_Anomaly_Detection_Mobile_Networks.pdf)
- **DOI / link:** [https://doi.org/10.3390/s20247232](https://doi.org/10.3390/s20247232)
- **Include in Ch. 3?** Yes

## APA citation

Burgueño, J., de-la-Bandera, I., Mendoza, J., Palacios, D., Morillas, C., & Barco, R. (2020). Online anomaly detection system for mobile networks. *Sensors, 20*(24), Article 7232. [https://doi.org/10.3390/s20247232](https://doi.org/10.3390/s20247232)

## Application

Real-time **online** anomaly detection and tracking over LTE Advanced network KPIs. Pipeline: KPI collection → alert generation → anomaly confirmation/tracking as each new hourly sample arrives; includes adaptive **normal-data update** (`avg_buffer`) for seasonal drift. Evaluated on expert-labeled live network data (no synthetic anomalies) against open-source baselines Banpei, ADTK, and Hochenbaum (S-H-ESD).

## Reported results

**Dataset:** 24,725 LTE-A cells, metropolitan area, **45 days**; 650 performance measurements/cell at **15-min** intervals → **240 hourly KPIs**. Labeling: 380 cells × **15 business KPIs** (IDs A–O, e.g. throughput, PRB usage, VoLTE success/drop rates) with **3.8%** mean anomalous samples (real-world rate; initial 80 high-anomaly cells excluded). **No synthetic anomalies.**

**Comparative outcomes (qualitative, Figure 6):** Proposed system identifies **~25% more total anomalies** than other approaches while maintaining high precision; captures **almost 80% of all network anomalies** — highest recall among compared systems. Trade-off: higher FPR than Banpei/ADTK due to post-anomaly tracking and minor behavioral shifts; ADTK has lowest recall (many anomalies not confirmed at final stage).

Evaluation via 20-fold cross-validation on 380 labeled cells; `S = 240` samples (10 days) for normal-behavior buffer initialization.

## Key results to cite

24,725 LTE-A cells, 45 days, 650 measurements/cell, 15-min intervals, 240 hourly KPIs. 380 labelled cells, 15 KPIs, 3.8% anomalous samples. ~25% more anomalies detected; ~80% of network anomalies captured.

## Thesis relevance

Operational scale and label sparsity benchmark. **KPI-selection bottleneck:** only 15 of 240 KPIs monitored — manual expert selection impractical at scale. Supports need for automated view/series selection (thesis GE search). Does not search aggregation structures; fixed KPI subset chosen upfront.

## Notes from PDF

- **Anomaly types labeled:** outlier (1–2 h spikes/drops), level shift (sustained mean change), ramp (gradual drift), pattern change (uncorrelated new behavior). Seasonal month-to-month shifts handled by normal-data update, not flagged.
- **Online block:** state machine (normal / border / anomalous); thresholds `th_high`, `th_med`; confirmation rules use state buffer and distance metric d.
- **Compared systems:** Banpei (SST, level-shift focus), ADTK (multi-technique ensemble), Hochenbaum (S-H-ESD, poor on unbalanced data).
- **Deployment claim:** Low compute; suitable for base-station deployment; future work on cross-KPI root-cause correlation.
- **Thesis gap:** 15/240 KPI manual coverage; no search over valid aggregation hierarchies.

## Cross-references

- Concepts: [[telecom-anomaly-detection]]
- Related sources: [[gonzalez-2024-one-model]], [[burgueno-2020-online-anomaly-detection]]
