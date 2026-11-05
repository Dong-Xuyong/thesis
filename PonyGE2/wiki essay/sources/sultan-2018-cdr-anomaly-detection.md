---
tags: [telecom, cdr, anomaly-detection]
article_number: 2
section: Anomaly Detection in Telecommunications Networks
include: yes
authors: Sultan et al.
year: 2018
last_updated: 2026-06-26
---

# Sultan et al. (2018) — *CDR-Driven Anomaly Detection and Traffic Prediction*

## Metadata

- **Raw note:** [Literature Review Articles/2.md](../../Literature%20Review%20Articles/2.md)
- **Raw PDF text:** [[../raw/sultan-2018-cdr-anomaly-detection|sultan-2018-cdr-anomaly-detection]]
- **PDF:** [Sultan_2018_CDR_Anomaly_Detection.pdf](../../Literature%20Review%20PDFs/01_Telecom_Anomaly_Detection/Sultan_2018_CDR_Anomaly_Detection.pdf)
- **DOI / link:** https://doi.org/10.1109/ACCESS.2018.2859756
- **Include in Ch. 3?** Yes

## APA citation

Sultan, K., Ali, H., & Zhang, Z. (2018). Call detail records driven anomaly detection and traffic prediction in mobile cellular networks. *IEEE Access, 6*, 41728-41737. [https://doi.org/10.1109/ACCESS.2018.2859756](https://doi.org/10.1109/ACCESS.2018.2859756)

## Application

CDR-driven workflow for mobile cellular networks: (1) **k-means clustering** to detect anomalous activity patterns, verified against visual ground-truth inspection; (2) **anomaly removal** to produce clean training data; (3) **neural network** and **ARIMA** models for traffic prediction and mean-square-error comparison on anomalous vs anomaly-free data. Goal is resource allocation, QoS/QoE, and proactive 5G network planning — not hierarchical structure search.

Three public CDR datasets: CRAWDAD (142 days, Sep 2010–Feb 2011), Nodobo (6 months, 27 high-school students), and Telecom Italia Milano grid data (2 months, Nov 2013–Jan 2014).

## Reported results

**Datasets (quantified):**
- CRAWDAD: 142 days of mobile phone records (voice/SMS, date/time/direction/duration fields).
- Nodobo: **13,035 voice-call** and **83,542 message** records over 6 months.
- Telecom Italia Milano: 2 months (1 Nov 2013 – 1 Jan 2014); grid-level SMS and call activity per timestamp.

**Detection metrics:** No precision, recall, F1, or AUC reported for anomaly detection. Qualitative verification only: k-means cluster 3 (high-activity users) matches visually identified anomalies in ground-truth plots across all three datasets.

**Downstream (MSE, not detection):** Neural network trained on anomalous data yields higher train/test/validation MSE than on anomaly-free (cleaned) data; anomaly-free data generalises better for prediction.

## Key results to cite

CRAWDAD, Nodobo, Telecom Italia. Nodobo: 13,035 voice-call and 83,542 message records; Telecom Italia: 2 months. No detection metrics in accessible text.

## Thesis relevance

Closest literature data type to thesis Vodafone switch/CDR records ([[mobai-dataset]]). One short Ch. 3 paragraph: CDR/mobile activity as unit of analysis; detection metrics not reported; link to traffic prediction and QoS, not hierarchy search or Matrix Profile scoring.

## Notes from PDF

- **Detection method:** k-means partitions user activity; smallest/high-activity cluster treated as anomalous (e.g., activity level >400 vs normal 1–150).
- **Ground truth:** Manual visual inspection of weekly activity plots; example anomaly timestamps on CRAWDAD include Sep 17, 19, 22, 24 2010; zero-activity periods flagged as possible network failures.
- **Anomaly cleaning:** Anomalous records replaced by average user activity before NN/ARIMA training.
- **Use cases cited:** ROI identification (malls, stadiums), event detection (disasters, accidents), natural-disaster CDR pattern shifts.
- **No combinatorial view search:** Single activity-level aggregation per dataset; no KPI hierarchy or aggregation-structure optimisation.

## Cross-references

- Concepts: [[telecom-anomaly-detection]]
- Related sources: [[gonzalez-2024-one-model]]
- Entities: [[mobai-dataset]]
