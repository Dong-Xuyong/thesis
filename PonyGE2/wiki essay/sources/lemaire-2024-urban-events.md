---
tags: [telecom, urban-events, anomaly-detection]
article_number: 4
section: Anomaly Detection in Telecommunications Networks
include: yes
authors: Lemaire et al.
year: 2024
last_updated: 2026-06-26
---

# Lemaire et al. (2024) — *Early Detection of Critical Urban Events*

## Metadata

- **Raw note:** [Literature Review Articles/4.md](../../Literature%20Review%20Articles/4.md)
- **Raw PDF text:** [[../raw/lemaire-2024-urban-events|lemaire-2024-urban-events]]
- **PDF:** [Lemaire_2024_Early_Detection_Critical_Urban_Events.pdf](../../Literature%20Review%20PDFs/01_Telecom_Anomaly_Detection/Lemaire_2024_Early_Detection_Critical_Urban_Events.pdf)
- **DOI / link:** https://doi.org/10.1371/journal.pone.0309093
- **Include in Ch. 3?** Yes

## APA citation

Lemaire, P., Furno, A., Rubrichi, S., Bondu, A., Smoreda, Z., Ziemlicki, C., El Faouzi, N.-E., & Gaume, E. (2024). Early detection of critical urban events using mobile phone network data. *PLOS ONE, 19*(8), Article e0309093. [https://doi.org/10.1371/journal.pone.0309093](https://doi.org/10.1371/journal.pone.0309093)

## Application

Early detection and localisation of critical urban events from **Network Signalling Data (NSD)** — time series of aggregated mobile network service counts (calls, SMS, handovers, attaches, data sessions, etc.) at **cell level, 1-minute resolution**. Two enhanced methods tested: **Signature** and **Adaptive** anomaly detectors, evaluated against a curated **DBUE** (Database of Uncommon Events) for Paris. Data: Orange France, ~27M daily subscribers, ~12 TB/day, 3 months (15 Mar – 15 Jun 2019).

## Reported results

**Ground truth:** DBUE covers **86 documented urban events** in Paris (Mar 18 – Jun 15 2019): 38 concerts, 24 sports events, 20 cultural events, 1 demonstration, 2 domestic fires, Notre-Dame fire; plus broader 350-event Paris catalog for methodology.

**Best precision:** **28.63%** (Signature method, detection level σ₃, 4-service fusion: 3G/4G Calls + 3G/4G SMS). No-Skill (random) minute-wise precision: **0.23%** (~100× worse). At σ₃ Signature: event recall **36.05%**, minute recall **3.20%**.

**Case study:** Notre-Dame cathedral fire — **high-level alarm within 5 minutes** of first visible smoke at nearest antenna.

Low absolute precision reflects difficulty even when signal exists; fusion of 4G SMS with 4G Calls improves event-granularity recall in dense areas.

## Key results to cite

Paris/Orange: ~27M daily subscribers, ~12 TB/day, 3 months, 1-min cell aggregation, 86 ground-truth events. Best precision 28.63%. Notre-Dame fire alarm within 5 minutes of visible smoke.

## Thesis relevance

Use for **aggregation visibility**, not fault-detection benchmarking. Abnormal real-world events appear after the right cell-level service aggregation — but aggregation scheme is hand-designed (per-service counts, fixed fusion). Low precision shows difficulty even when signal exists. Bridge to grouped time-series section ([[grouped-time-series]]); thesis gap: search aggregation structures rather than hand-fuse 4 fixed service views.

## Notes from PDF

- **Data model:** s_a(t) = (v^0_a(t), …, v^{k-1}_a(t)) — k network services counted per cell per minute; anonymity preserved (aggregate counts only).
- **Metrics:** Minute-wise precision/recall; **event-based recall** (alarm within 15 min tolerance after event start); precision-recall curves vs sensitivity σ₁–σ₃; compared to No-Skill random detector.
- **Signature vs Adaptive:** Signature more stable at high detection levels; Adaptive better minute-granularity recall at lower thresholds.
- **Service fusion:** Individual 3G services add noise; 4G SMS most informative at event granularity in 2019 Paris dataset.
- **Taxonomy:** Events classified by spatial/temporal spread (punctual vs widespread, sudden vs fuzzy onset) — Table 1.
- **Thesis gap:** Fixed service aggregation and fusion weights; no combinatorial search over valid hierarchical views.

## Cross-references

- Concepts: [[telecom-anomaly-detection]], [[grouped-time-series]]
- Related sources: [[mefleh-2025-mahalanobis]]
