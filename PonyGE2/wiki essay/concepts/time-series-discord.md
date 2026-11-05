---
tags: [method, discord, anomaly-detection]
source_count: 4
last_updated: 2026-09-07
---

# Time Series Discord

## Definition

The subsequence in a time series with the **maximum distance to its nearest non-self match** — the most anomalous / least repeated pattern (Keogh et al. 2005, Def. 6). Non-self match requires |p − q| ≥ n (subsequence length) to exclude trivial sliding-window neighbours. Under Matrix Profile: discord location = argmax(P) on the self-join profile (Yeh et al. 2017).

Top-K discords found by iteratively masking regions around discovered discords. Requires only one intuitive parameter (subsequence length) vs 3–7 for typical anomaly detectors (Keogh 2005).

## Papers that use it

- [[keogh-2005-hot-sax]] — introduced discord discovery; HOT SAX 3–4 orders faster than brute force; >1M experiments on 82 datasets
- [[yeh-2017-matrix-profile-unifying-view]] — discord as highest point on self-join matrix profile; exact label-free discovery
- [[law-2019-stumpy]] — `stumpy.discord()` / MP max in thesis pipeline
- [[van-onsem-2023-variable-length-motif]] — missing motif occurrences on Numenta coincide with MP discords; Skyline task is motifs, not discords

## Thesis application

Discord score from Matrix Profile is the **anomaly signal** for each candidate aggregated series. Combined with synthetic injection (μ±3σ, 168h windows), discord scores feed ROC-AUC fitness.

## Open questions / gaps

Discord length and window parameters fixed in thesis; not co-evolved with aggregation structure.

## Related concepts

- [[matrix-profile]]
- [[auc-fitness]]
