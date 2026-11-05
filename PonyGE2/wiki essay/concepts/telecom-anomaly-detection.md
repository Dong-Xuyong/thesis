---
tags: [telecom, anomaly-detection]
source_count: 7
last_updated: 2026-09-07
---

# Telecom Anomaly Detection

## Definition

Unsupervised or weakly supervised detection of abnormal behaviour in mobile network operational data — KPIs, CDRs, cell-level signalling — where expert labels are scarce and the choice of monitored view matters.

## Papers that use it

- [[gonzalez-2024-one-model]] — DC-VAE on 12 fixed ISP KPIs; TELCO dataset; range-F1 ~52% mean
- [[sultan-2018-cdr-anomaly-detection]] — CDR-driven detection; closest data type to thesis switch records
- [[burgueno-2020-online-anomaly-detection]] — 24k LTE cells; only 15 of 240 KPIs monitored
- [[lemaire-2024-urban-events]] — urban event detection via cell aggregation; precision 28.63%
- [[hua-2022-genad]] — China Mobile WBS; 18 KPIs × millions of stations; F1 0.953 with point-adjust labels
- [[oguz-2022-multi-tier]] — simulated femtocell outages; tier/ROI context drives accuracy
- [[van-onsem-2023-variable-length-motif]] — MP motifs on Skyline telecom KPIs; not discord/AUC

## Thesis application

Thesis uses Vodafone-style Mobai switch/CDR data. Literature shows telecom AD is hard with sparse labels and fixed views underperform — motivating **search over aggregation structures** rather than fixing the view upfront. GenAD's high F1 uses a different label/evaluation regime (segment point-adjust) than sparse NOC range-F1 papers.

## Open questions / gaps

No reviewed telecom paper searches which hierarchy/aggregation to score; all assume a pre-selected KPI set, cell grouping, or simulated tier layout. Van Onsem et al. apply Matrix Profile to already-chosen telecom KPI series for motifs, not for searching aggregations.

## Related concepts

- [[grouped-time-series]]
- [[hierarchical-time-series]]
