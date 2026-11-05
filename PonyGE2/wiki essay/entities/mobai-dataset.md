---
tags: [dataset, telecom, thesis]
source_count: 1
last_updated: 2026-06-26
---

# Mobai Dataset

## What it is

Vodafone-style telecom switch/CDR time series used in the thesis. Located in `datasets/Mobai/` with category combinations in `available_categories.json` and `not_empty_combinations.csv`.

## Used in

- [[sultan-2018-cdr-anomaly-detection]] — CDR as closest literature data type (different sources: CRAWDAD 142-day records, Nodobo 13k voice + 83k SMS, Telecom Italia Milano 2-month grid CDRs); k-means detection without reported metrics
- Thesis Ch. 4–5 — primary experimental data

## Thesis relevance

Operational CDR/switch records are the target domain. GE searches aggregation structures over these dimensions via [[mobai-grammar]]; Matrix Profile ([[stumpy]]) scores resulting series; synthetic anomalies injected for [[auc-fitness]]. Literature closest in data type is Sultan et al., but they neither report detection metrics nor search aggregation hierarchies.

## Related

- [[mobai-grammar]] — BNF grammar defining valid aggregations
- [[ponyge2]] — evolution engine
- [[telecom-anomaly-detection]] — literature context
- [[telco-dataset]] — contrasting fixed-KPI ISP benchmark (not CDR)
