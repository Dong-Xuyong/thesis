---
tags: [matrix-profile, stumpy, method]
article_number: 16
section: Matrix Profile and Time-Series Discord Detection
include: yes
authors: Law
year: 2019
last_updated: 2026-06-26
---

# Law (2019) — *STUMPY*

## Metadata

- **Raw note:** [Literature Review Articles/16.md](../../Literature%20Review%20Articles/16.md)
- **Raw extraction:** [[../raw/law-2019-stumpy|PDF text extraction]]
- **PDF:** [Law_2019_STUMPY.pdf](../../Literature%20Review%20PDFs/04_Matrix_Profile_Discord_Detection/Law_2019_STUMPY.pdf)
- **DOI / link:** [https://doi.org/10.21105/joss.01504](https://doi.org/10.21105/joss.01504)
- **Include in Ch. 3?** Yes

## APA citation

Law, S. (2019). STUMPY: A powerful and scalable Python library for time series data mining. *Journal of Open Source Software, 4*(39), Article 1504. [https://doi.org/10.21105/joss.01504](https://doi.org/10.21105/joss.01504)

## Application

Open-source Python library implementing exact Matrix Profile computation (STOMP-based). Supports motif discovery, discord/anomaly discovery, shapelets, semantic segmentation, density estimation, time series chains, and multidimensional workflows. Built on Yeh et al. (2016) Matrix Profile I and Zhu et al. (2016) Matrix Profile II algorithms.

## Reported results

No single headline benchmark metric in the JOSS paper. Complexity reference: brute-force self-similarity join O(n²m); at 0.0000001 s/distance, n = 100M would take ~1,585 years — exact methods (STOMP/STUMPY) make large-scale exact computation feasible.

## Key results to cite

Implementation reference only — no headline benchmark in accessible metadata. Cite as reproducible Python MP pipeline, not empirical comparator.

## Thesis relevance

Useful as a reproducible implementation reference for Matrix Profile workflows.
Tool reference for reproducible Python MP pipeline used in thesis. Cite as implementation, not empirical comparator.

## Notes from PDF

- **Core API:** Computes matrix profile vector (distances to nearest neighbours for all subsequences) efficiently; enables downstream motif, discord, shapelet, segmentation, chain, and density tasks.
- **Features:** Parallel and distributed computation; multi-dimensional motif discovery (Yeh, Kavantzas & Keogh 2017); time series chains (Zhu et al. 2017).
- **Design goal:** "Get to your time series insights faster" — wraps exact STOMP-family algorithms for practical use.
- **vs approximate methods:** Paper emphasises approximate joins are often inexact, produce false positives/dismissals, and do not generalise; exact MP avoids compromise.
- **Thesis use:** `stumpy.stump()` / discord discovery in GE fitness loop — label-free scorer for each grammar-generated aggregated series. Cite Law (2019) for implementation reproducibility, Yeh (2017) for method.

## Cross-references

- Concepts: [[matrix-profile]], [[time-series-discord]]
- Related sources: [[yeh-2017-matrix-profile-unifying-view]], [[zhu-2016-matrix-profile-ii]], [[van-onsem-2023-variable-length-motif]]
- Entities: [[stumpy]]
