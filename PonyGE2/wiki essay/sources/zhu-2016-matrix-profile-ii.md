---
tags: [matrix-profile, discord, method]
article_number: 14
section: Matrix Profile and Time-Series Discord Detection
include: yes
authors: Zhu et al.
year: 2016
last_updated: 2026-06-26
---

# Zhu et al. (2016) — *Matrix Profile II*

## Metadata

- **Raw note:** [Literature Review Articles/14.md](../../Literature%20Review%20Articles/14.md)
- **Raw extraction:** [[../raw/zhu-2016-matrix-profile-ii|PDF text extraction]]
- **PDF:** [Zhu_2016_Matrix_Profile_II.pdf](../../Literature%20Review%20PDFs/04_Matrix_Profile_Discord_Detection/Zhu_2016_Matrix_Profile_II.pdf)
- **DOI / link:** [https://doi.org/10.1109/ICDM.2016.0085](https://doi.org/10.1109/ICDM.2016.0085)
- **Include in Ch. 3?** Yes

## APA citation

Zhu, Y., Zimmerman, Z., Senobari, N. S., Yeh, C.-C. M., Funning, G., Mueen, A., Brisk, P., & Keogh, E. (2016). Matrix profile II: Exploiting a novel algorithm and GPUs to break the one hundred million barrier for time series motifs and joins. In *2016 IEEE 16th International Conference on Data Mining (ICDM)* (pp. 739-748). IEEE. [https://doi.org/10.1109/ICDM.2016.0085](https://doi.org/10.1109/ICDM.2016.0085)

## Application

Large-scale exact motif/join discovery via STOMP and GPU-STOMP. Primary demonstration: seismology — repeating earthquake sequences from 58 days of continuous 20 Hz recording. Motif = full exact 1NN join converted to motif definition with trivial extra effort.

## Reported results

- **100,000,000 subsequences**; **499,999,999,500,000,000** pairwise distances computed or pruned.
- Brute force at 0.0000001 s/distance: **~1,585 years**; **GPU-STOMP: 12 days** (faster than real-time vs 58 days of recording).
- STOMP: O(n²) vs brute force O(n²m); achieves O(log n) speedup over STAMP; ~5–6 hours for n = 1M on CPU.
- STOMP speedup independent of data intrinsic dimensionality and subsequence length m (unlike indexing/lower-bound methods that fail on high-dimensional seismograph data).

## Key results to cite

100M subsequences; brute force ~1,585 years vs GPU-STOMP 12 days. STOMP O(n²) with m reduced to O(1).

## Thesis relevance

Shows Matrix Profile methods can scale when many candidate time series need scoring.
One sentence on extreme-scale headroom — scoring won't bottleneck many candidates. Ignore seismology application detail.

## Notes from PDF

- **STOMP vs STAMP:** Forgoing STAMP's anytime property enables ordered search and GPU porting — at least one order of magnitude faster than STAMP; GPU-STOMP pushes further.
- **Key insight:** Exact 1NN time series join solves motif discovery for any motif definition with trivial extra effort.
- **GPU architecture:** CUDA SIMD; O(n) space; inner-loop entries independent — embarrassingly parallel. Copying 100M-length series to GPU < 1 s.
- **Seismology motivation:** False negatives unacceptable (public policy, insurance, safety); hashing/discretization methods dismissed. TLB analysis shows lower-bound pruning ineffective on seismograph vs ECG/activity data.
- **Thesis relevance:** Headroom argument only — thesis candidates are far smaller than 100M points; per-candidate MP scoring is not the bottleneck.

## Cross-references

- Concepts: [[matrix-profile]], [[time-series-discord]]
- Related sources: [[yeh-2017-matrix-profile-unifying-view]], [[yeh-2016-matrix-profile-i]]
- Entities: [[stumpy]]
