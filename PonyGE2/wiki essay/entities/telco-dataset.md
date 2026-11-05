---
tags: [dataset, telecom]
source_count: 2
last_updated: 2026-06-26
---

# TELCO Dataset

## What it is

Public mobile ISP anomaly-detection benchmark from González et al.: **732,607** samples over 7 months (Jan–Jul 2021), **5-min** granularity, **12 fixed KPI time series**, NOC expert labels (**9,137** anomalies, **1.2%**). Released with DC-VAE code.

## Splits (from workshop paper / raw PDF)

| Split | Samples | Duration | Anomalies |
|-------|---------|----------|-----------|
| Training | 310,974 | 3 months | 5,672 (1.8%) |
| Validation | 103,680 | 1 month | 385 (0.4%) |
| Testing | 317,953 | 3 months | 3,080 (1.0%) |

Full operator collection spans ~2 years; only 7 months have expert labels. DC-VAE window **T = 512** (~2 days).

## Used in

- [[gonzalez-2024-one-model]] — DC-VAE primary evaluation; ENS-15, S-EXPS, ARIMA benchmarks
- [[garcia-gonzalez-2022-milets-dc-vae]] — workshop paper; S-VAE comparator on same data

## Thesis relevance

Illustrates sparse labels and modest F1_r (~52% mean, 59% median) on a **fixed 12-series view**. Thesis uses different data ([[mobai-dataset]]) but same gap: which aggregation to monitor is not searched.

## Links

- Code/dataset: [https://github.com/GastonGarciaGonzalez/DC-VAE](https://github.com/GastonGarciaGonzalez/DC-VAE)
- Raw PDF text: [[../raw/gonzalez-2024-one-model|gonzalez-2024-one-model]], [[../raw/garcia-gonzalez-2022-milets-dc-vae|garcia-gonzalez-2022-milets-dc-vae]]
