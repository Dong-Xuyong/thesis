---
tags: [matrix-profile, discord, method]
article_number: 15
section: Matrix Profile and Time-Series Discord Detection
include: yes
authors: Keogh et al.
year: 2005
last_updated: 2026-06-26
---

# Keogh et al. (2005) — *HOT SAX*

## Metadata

- **Raw note:** [Literature Review Articles/15.md](../../Literature%20Review%20Articles/15.md)
- **Raw extraction:** [[../raw/keogh-2005-hot-sax|PDF text extraction]]
- **PDF:** [Keogh_2005_HOT_SAX.pdf](../../Literature%20Review%20PDFs/04_Matrix_Profile_Discord_Detection/Keogh_2005_HOT_SAX.pdf)
- **DOI / link:** [https://doi.org/10.1109/ICDM.2005.79](https://doi.org/10.1109/ICDM.2005.79)
- **Include in Ch. 3?** Yes

## APA citation

Keogh, E., Lin, J., & Fu, A. (2005). HOT SAX: Efficiently finding the most unusual time series subsequence. In *Fifth IEEE International Conference on Data Mining (ICDM'05)* (pp. 226-233). IEEE. [https://doi.org/10.1109/ICDM.2005.79](https://doi.org/10.1109/ICDM.2005.79)

## Application

Introduces time series **discords** — subsequences maximally distant from their nearest non-self match. Evaluated as anomaly detectors on Space Shuttle telemetry, medicine (ECG premature ventricular contraction), surveillance, and industry. HOT SAX uses symbolic SAX representation to reorder search and enable admissible pruning.

## Reported results

- HOT SAX achieves **3–4 orders of magnitude** speedup over brute-force O(m²) all-to-all comparison with **identical exact results**.
- Evaluated in **>1,000,000 experiments** across **82 datasets** from diverse domains.
- Requires **one intuitive parameter** (subsequence length n) vs 3–7 parameters for typical anomaly detectors.

## Key results to cite

3–4 orders of magnitude faster than brute force; >1M experiments on 82 datasets. Discord = subsequence with largest nearest non-self-match distance.

## Thesis relevance

Provides the classic unusual-subsequence/discord foundation behind Matrix Profile anomaly scoring.
Brief conceptual foundation: discord = subsequence most distant from nearest neighbour. Cross-ref Ch. 2 if defined there.

## Notes from PDF

- **Formal definition (Def. 6):** Discord D at position l has max min(Dist(D, M_D)) over all non-self matches M_D; non-self match requires |p − q| ≥ n (excludes trivial sliding-window neighbours).
- **Why non-self matches matter:** Without exclusion, pathological solutions dominate (e.g. "bac" beats "XXX" under Hamming distance with window 3).
- **HOT SAX algorithm:** Heuristic discord discovery framework — outer loop orders candidates via symbolic SAX representation; inner loop uses early-abandon pruning when any neighbour is closer than best-so-far discord distance.
- **Brute force flaw:** O(m²) time complexity untenable for real datasets; pruning + reordering reduce effective search without sacrificing exactness.
- **Matrix Profile link:** Later MP work (Yeh 2017) computes discord as max of self-join profile — HOT SAX provides the conceptual and definitional foundation.
- **Thesis use:** Discord score semantics inherited; thesis uses MP max value rather than HOT SAX directly, but definition and single-parameter appeal carry through.

## Cross-references

- Concepts: [[matrix-profile]], [[time-series-discord]]
- Related sources: [[yeh-2017-matrix-profile-unifying-view]], [[law-2019-stumpy]]
