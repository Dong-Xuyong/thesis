---
tags: [matrix-profile, telecom, motif, kpi]
article_number: 29
section: Matrix Profile and Time-Series Discord Detection
include: yes
authors: Van Onsem et al.
year: 2023
last_updated: 2026-09-07
---

# Van Onsem et al. (2023) — *Variable Length Motif Discovery*

## Metadata

- **Raw note:** [Literature Review Articles/29.md](../../Literature%20Review%20Articles/29.md)
- **Raw PDF text:** [[../raw/van-onsem-2023-variable-length-motif|van-onsem-2023-variable-length-motif]]
- **PDF:** [VanOnsem_2023_Variable_Length_Motif_Discovery.pdf](../../Literature%20Review%20PDFs/04_Matrix_Profile_Discord_Detection/VanOnsem_2023_Variable_Length_Motif_Discovery.pdf)
- **DOI / link:** [https://doi.org/10.1109/ACCESS.2023.3295995](https://doi.org/10.1109/ACCESS.2023.3295995)
- **Include in Ch. 3?** Yes (telecom application of Matrix Profile in §3.4)

## APA citation

Van Onsem, M., Ledoux, V., Mélange, W., Dreesen, D., & Van Hoecke, S. (2023). Variable length motif discovery in time series data. *IEEE Access, 11*, 73754–73766. [https://doi.org/10.1109/ACCESS.2023.3295995](https://doi.org/10.1109/ACCESS.2023.3295995)

## Application

Matrix Profile–based **motif** discovery (not discord scoring) for industrial network monitoring. Pairwise distance matrix plus matrix profile; scale-aware distance; one distance-matrix calculation for motifs of different lengths. Evaluated on (1) synthetic series, (2) Numenta NYC taxi passenger counts, (3) **Skyline** production KPIs: 25 series from customers of Skyline Communications, including telecom-provider metrics. Authors note that telecom production series are typically a few thousand points because data are aggregated over time.

Motifs are used as recurring operational patterns (backup cycles, daily/weekly shapes). Missing motif occurrences on Numenta coincide with labeled anomalies and with Matrix Profile discords.

## Reported results

- **Speed:** proposed method about **3–8× faster** than VALMOD (Linardi et al. 2018) on series of roughly 1{,}000–10{,}000 points; only one distance-matrix pass vs a motif-length range. Exact Table 2 cell times are figure/table values — cite the 3–8× range, not invented seconds.
- **Hyperparameters:** window size (figures use 20), match threshold 0.2, size-difference cap 4. No min/max motif length or top-*k*.
- **Synthetic:** all planted motifs of mixed size/periodicity recovered and grouped; VALMOD finds similar best pairs but does not group occurrences or separate scale.
- **Numenta taxi:** daily and weekly motifs matched except on anomalous days.
- **Skyline / telecom KPIs:** prominent motifs recovered; example with two motifs of **288 points (~1 day)** and **12 points (~1 hour)** in one series, both found in one pass. VALMOD on that case finds only the larger spike. Results verified **manually** (datasets not motif-labeled). No precision, recall, F1, or AUC for detection.

## Key results to cite

MP applied to real telecom-provider KPIs (Skyline, 25 series). Motifs, not discords. 3–8× faster than VALMOD. Dual-length example 288 vs 12 points. No detection F1/AUC.

## Thesis relevance

Answers Emanuel’s §3.4 request: a published Matrix Profile application on telecommunications operational KPIs. **Does not close the thesis gap:** task is motif discovery on pre-chosen series, not discord scoring of GE-searched aggregations, and not AUC fitness. Use in §3.4 as the telecom MP example, then state the remaining gap (structure search + discord scorer).

## Notes from PDF

- Ghent University–imec IDLab and Skyline Communications; VLAIO Baekeland grant HBC.2019.2588.
- Distance matrix + matrix profile under z-normalised Euclidean distance (Yeh/Keogh lineage).
- Code and Skyline sample data: GitHub `VOMatthias/Variable-Length-Motif-Discovery-Data-And-Code`.
- CC BY-NC-ND 4.0.

## Cross-references

- Concepts: [[matrix-profile]], [[telecom-anomaly-detection]], [[time-series-discord]]
- Related sources: [[yeh-2017-matrix-profile-unifying-view]], [[law-2019-stumpy]], [[yeh-2016-matrix-profile-i]]
