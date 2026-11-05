# Thesis Status Checklist

Living progress tracker for the dissertation in [Latex Document/](Latex%20Document/). Compiled via [main.tex](Latex%20Document/main.tex). Supporting docs: [src/thesis mindmap.md](src/thesis%20mindmap.md) · [Literature Review - Dellmified Draft.md](Literature%20Review%20-%20Dellmified%20Draft.md) · [wiki essay/sources/](wiki%20essay/sources/).

**Last audited:** 2026-06-15 · **Overall:** ~~17 / 52 items complete (~~33%)

> **How to check items:** In Cursor/VS Code, click the box at the start of each line **in the editor** (not Markdown preview). Use `Ctrl+Enter` / `Cmd+Enter` with the cursor on a task line to toggle it.

---

## Status legend


| Symbol            | Meaning                               |
| ----------------- | ------------------------------------- |
| `[x]`             | Written and usable draft              |
| `[ ]` **partial** | Started but incomplete                |
| `[ ]` **outline** | Section header or commented plan only |
| `[ ]` **blocked** | Depends on another item               |


---

## Progress summary


| Chapter                         | File                                                                        | Status  | Done    |
| ------------------------------- | --------------------------------------------------------------------------- | ------- | ------- |
| Front matter                    | [0-atachements.tex](Latex%20Document/0-atachements.tex)                     | partial | 2 / 5   |
| Ch. 1 Introduction              | [1-Introduction.tex](Latex%20Document/1-Introduction.tex)                   | partial | 1 / 4   |
| Ch. 2 Theory and Background     | [2-theory-background.tex](Latex%20Document/2-theory-background.tex)         | partial | 11 / 17 |
| Ch. 3 Literature Review         | [3-literature-review.tex](Latex%20Document/3-literature-review.tex)         | partial | 0 / 9   |
| Ch. 4 Materials and Methodology | [4-materials-methodology.tex](Latex%20Document/4-materials-methodology.tex) | partial | 3 / 9   |
| Ch. 5 Results and Discussion    | [5-results-discussion.tex](Latex%20Document/5-results-discussion.tex)       | outline | 0 / 3   |
| Ch. 6 Conclusions               | [6-conclusions.tex](Latex%20Document/6-conclusions.tex)                     | outline | 0 / 2   |
| Cross-cutting                   | —                                                                           | pending | 0 / 6   |


### Blocking dependencies

- **Ch. 6** is blocked on **Ch. 5** numeric results (AUC, PR/F1 placeholders `[{}]` in commented outlines).
- **Ch. 3 rewrite** is blocked on porting [Literature Review - Dellmified Draft.md](Literature%20Review%20-%20Dellmified%20Draft.md) and syncing ~25 bibliography entries into `references.bib` from [wiki essay/sources/](wiki%20essay/sources/) and [Literature Review Articles/](Literature%20Review%20Articles/).
- **Ch. 5** is blocked on experiment outputs: `src/mobai.txt`, `results_*.csv`, `check_results.ipynb`.

---

## Front matter

Source: [0-atachements.tex](Latex%20Document/0-atachements.tex) · Mindmap: [[001 Acknowledgements]], [[002 Summary]], [[003 Abstract]]

- **Acknowledgements** — outline: body entirely commented out (Portuguese draft + bullet outline for supervisors, DTx/Vodafone, colleagues, funding)
- **Summary** — written (2 paragraphs; minor copy-edit needed)
- **Abstract** — partial: 3 paragraphs present; needs consistency ("master's proposal" vs thesis, author voice, abrupt security-threat ending)
- **Table of contents / list of figures / list of tables** — auto-generated from document
- **List of abbreviations** — partial: only ROC defined; missing GE, GP, MP, AUC, HTS, KPI, CDR, BNF, etc.

---

## Chapter 1 — Introduction

Source: [1-Introduction.tex](Latex%20Document/1-Introduction.tex) · Mindmap: [[005 Introduction]], [[004 Search method]]

- **§1.1 Motivation** — partial: core narrative present; incomplete sentence ("On the other hand, through a totally separate."); commented bullet outline remains
- **§1.2 Objectives and Expected Results** — partial: framework described; commented itemize placeholders remain
- **§1.3 Document Organization** — written (chapter roadmap complete)
- **§1.4 Methodological Approach → Search Method** — outline: subsection heading only; full search protocol in comments (Consensus, databases, PRISMA, inclusion criteria)

---

## Chapter 2 — Theory and Background

Source: [2-theory-background.tex](Latex%20Document/2-theory-background.tex) · Mindmap: [[010 Time Series]], [[040 Anomaly Generation]], [[061 Genetic Programming]], [[050 Metrics]]

- **§2.1 Time Series (intro)** — partial: prose present; stray `@` typo at line 10; duplicate opening with HTS subsection noted in comments
- **§2.1.1 Hierarchical Time Series** — written (definitions, figure, bottom-up/top-down/middle-out)
- **§2.1.2 Grouped Time Series** — written (figure, crossed/nested example; duplicate paragraph at lines 70–71 vs 112–113)
- **§2.2 Anomaly Detection** — partial: ~6 lines stub; truncated sentence; no Matrix Profile subsection; no univariate/multivariate/discord theory
- **§2.3 Anomaly Generation** — partial: intro written; links to Ch. 4 injection
- **§2.3.1 Rule-Based Approaches** — partial: one paragraph; aligned with thesis μ±3σ injection
- **§2.3.2 Validation of Synthetic Anomalies** — partial: expert validation + ROC-AUC mentioned
- **§2.4.1 Combinatorial Optimization** — written (long history; comment says shorten)
- **§2.4.2 Genetic Programming** — written (generational loop figure; duplicate GP intro paragraphs)
- **§2.4.3 Backus-Naur Form** — written (BNF walkthrough; duplicate itemize blocks at lines 202–214)
- **§2.4.4 Initialization Phase** — written (PI_grow)
- **§2.4.5 Selection Mechanism** — written (tournament + elitism)
- **§2.4.6 Variation Operators** — written (crossover + mutation)
- **§2.4.7 Replacement Strategy** — written (generational + elitism)
- **§2.5.1 Precision and Recall** — written
- **§2.5.2 Trade-off and F1 Score** — partial: F1 equation present; sentence truncated ("imbalanced c prove more appropriate")
- **§2.5.3 Area Under the ROC Curve (AUC)** — written (interpretation, Wilcoxon-Mann-Whitney, limitations)

---

## Chapter 3 — Literature Review

Source: [3-literature-review.tex](Latex%20Document/3-literature-review.tex) · Draft: [Literature Review - Dellmified Draft.md](Literature%20Review%20-%20Dellmified%20Draft.md) · Articles: [Literature Review Articles/](Literature%20Review%20Articles/) · Mindmap: [[020 Anomaly Detection]], [[030 TS AD in Telecommunication]], [[062 Related Works]]

All eight section titles match the MD draft structure. LaTeX currently holds a **conceptual survey**; the MD draft is an **applied, results-focused rewrite** not yet ported.

- **§3.1 Anomaly Detection in Telecommunications Networks** — partial: generic methods only; missing García González 2024, Sultan 2018, Burgueño 2020, Lemaire 2024 with quantified results ([LR Draft §1](Literature%20Review%20-%20Dellmified%20Draft.md#1-anomaly-detection-in-telecommunications-networks))
- **§3.2 Anomaly Detection in Grouped Time Series** — partial: forecasting-vs-detection argument only; missing Mefleh 2025, García González 2022, Hua 2022, Oğuz 2022 ([LR Draft §2](Literature%20Review%20-%20Dellmified%20Draft.md#2-anomaly-detection-in-grouped-time-series))
- **§3.3 Anomaly Detection in Hierarchical Time Series** — partial: generic HTS framing; missing Tiresias, HYDRA, Wolff 2022, Pang 2022 ([LR Draft §3](Literature%20Review%20-%20Dellmified%20Draft.md#3-anomaly-detection-in-hierarchical-time-series))
- **§3.4 Matrix Profile and Time-Series Discord Detection** — partial: one paragraph + STUMPY; missing Yeh 2017, Zhu 2016, Keogh 2005 HOT SAX benchmarks, Law 2019 ([LR Draft §4](Literature%20Review%20-%20Dellmified%20Draft.md#4-matrix-profile-and-time-series-discord-detection))
- **§3.5 Combinatorial Optimisation for Selecting Time Series** — partial: generic framing; missing Xue, Linares-Barrera, Contreras with numbers ([LR Draft §5](Literature%20Review%20-%20Dellmified%20Draft.md#5-combinatorial-optimization-for-selecting-time-series))
- **§3.6 Combinatorial Optimisation in Anomaly Detection** — partial: subspace argument only; missing He et al. 2021, Li VAEGA, Zhang & Xie, Riahi-Madvar ([LR Draft §6](Literature%20Review%20-%20Dellmified%20Draft.md#6-combinatorial-optimization-in-anomaly-detection))
- **§3.7 Genetic Programming and Grammatical Evolution** — partial: one paragraph; needs expanded Koza/O'Neill/Fenton argument + interpretability ([LR Draft §7](Literature%20Review%20-%20Dellmified%20Draft.md#7-genetic-programming-and-grammatical-evolution))
- **§3.8 Research Gap** — partial: conceptually aligned; needs integration narrative tying all empirical gaps together (draft section TBD in [Dellmified Draft](Literature%20Review%20-%20Dellmified%20Draft.md))
- **Bibliography sync** — blocked: ~25 applied-paper entries from [Literature Review Articles/](Literature%20Review%20Articles/) / [wiki essay/sources/](wiki%20essay/sources/) not yet in `references.bib`

---

## Chapter 4 — Materials and Methodology

Source: [4-materials-methodology.tex](Latex%20Document/4-materials-methodology.tex) · Mindmap: [[100 Problem Formulation]], [[120 Anomaly Injection Framework]], [[130 Hierarchical Data Structuring]], [[140 Model Development and Evaluation]], [[150 Genetic Programming Implementation]]

- **§4.1 Problem Formulation** — written (dataset, figures, cardinality table, entropy analysis)
- **§4.1.1 Key Observations** — written (skewed/balanced/high-cardinality patterns)
- **§4.1.2 Analytical Implications** — written (entropy table; Partner Description 7.6 bits → grammar exclusion rationale)
- **§4.2 Adopted Methodology** — partial: workflow figure + stages; typos (`witch`, `availables`); inline `sera isto?`; says "Random feature combinations" vs grammar-evolved hierarchies; 4.2M vs ~1M record inconsistency
- **§4.3 Model Development and Evaluation** — partial: PonyGE2 control-flow figure only; fitness function `hierarchy_auc` in comments only
- **§4.3.1 Genome Structure** — partial: starts but incomplete ("Define max genome lenght…"); `MAX_TREE_DEPTH` table says 10 vs `mobai.txt` uses 20
- **§4.4 Anomaly Injection** — partial: 168h window, μ±3σ, figure; `Align_Timestamps` procedure in comments; typos (`evaluateing`, `anomalie`, `cicle`)
- **§4.5 Hierarchical Data Structures** — partial: ~4 lines stub; aggregation/filter prose incomplete; commented `pheno_to_dict` flow
- **§4.6 Genetic Programming Implementation** — partial: parameter table only; grammar BNF rules, fitness pseudocode, phenotype examples in comments; Partner Description removed in `mobai_nop.pybnf`

---

## Chapter 5 — Results and Discussion

Source: [5-results-discussion.tex](Latex%20Document/5-results-discussion.tex) · Mindmap: Discussion and Results · **blocked** on `mobai.txt`, `results_*.csv`, `check_results.ipynb`

- **§5.1 Performance Analysis** — outline: commented plan for AUC tables, PR/F1, baselines (`phono_agg`, full disaggregation), hyperparameter sweep (pop × gen, 30 seeds), Wilcoxon tests
- **§5.2 Time Series Visualization** — outline: commented plan for anomaly example plots (GP vs aggregate vs baseline), TP/FP/FN bands, 168h injection windows
- **§5.3 Genetic Programming Analysis** — outline: commented plan for best phenotype tree, fitness curves, diversity at gens 1/20/50/100, per-leaf AUC table

---

## Chapter 6 — Conclusions and Future Works

Source: [6-conclusions.tex](Latex%20Document/6-conclusions.tex) · Mindmap: Conclusions and Future Works · **blocked** on Ch. 5

- **§6.1 Conclusions** — outline: commented bullets for thesis aim, pipeline recap, contributions, numeric outcomes (`phono_agg [{}]` placeholders)
- **§6.2 Future Work** — outline: commented bullets for real labels, Partner bucketing, PR-AUC fitness, multi-objective, streaming, reproducibility README

---

## Cross-cutting tasks

- **Port LR MD draft → LaTeX Ch. 3** — rewrite all 8 sections from [Literature Review - Dellmified Draft.md](Literature%20Review%20-%20Dellmified%20Draft.md); convert APA blocks to `\parencite` + `references.bib`
- **Copy-edit pass** — Ch. 1 incomplete sentences; Ch. 4 typos; Abstract voice/consistency; Ch. 2 dedupe (grouped-TS paragraph, BNF itemize, GP intro)
- **Fix `main.tex` input casing** — `\input{1-introduction}` vs file `1-Introduction.tex` (Linux compatibility)
- **Expand abbreviation list** — GE, GP, MP, AUC, HTS, KPI, CDR, BNF, GE, NOC, etc. in [0-atachements.tex](Latex%20Document/0-atachements.tex)
- **Reconcile data inconsistencies** — 4.2M records (opening) vs ~1M after filtering; `MAX_TREE_DEPTH` 10 (table) vs 20 (`mobai.txt`); workflow "random combinations" vs grammar search
- **Ch. 2 Anomaly Detection + Matrix Profile theory** — expand stub; add `\label{sec:matrix-profile}` or forward-ref from Ch. 3/4

---

## Suggested priority order

1. Port [literature review MD draft](Literature%20Review%20-%20Dellmified%20Draft.md) → [3-literature-review.tex](Latex%20Document/3-literature-review.tex) + extend `references.bib` from [wiki essay/sources/](wiki%20essay/sources/)
2. Write [5-results-discussion.tex](Latex%20Document/5-results-discussion.tex) from experiment outputs (`mobai.txt`, CSVs, notebook)
3. Complete Ch. 4 prose: fitness function `hierarchy_auc`, grammar rules, genome structure, timestamp alignment
4. Write [6-conclusions.tex](Latex%20Document/6-conclusions.tex) once Ch. 5 numbers exist
5. Finish front matter (acknowledgements, abbreviations) + Ch. 1 Search Method
6. Polish Ch. 2 stubs, dedupe, and copy-edit pass

---

## Quick reference: MD draft ↔ LaTeX section map


| LaTeX section         | LR Draft section                                     | Article notes |
| --------------------- | ---------------------------------------------------- | ---------------- |
| §3.1 Telecom AD       | Anomaly Detection in Telecommunications Networks     | rows 8–11        |
| §3.2 Grouped TS       | Anomaly Detection in Grouped Time Series             | rows 12–15       |
| §3.3 Hierarchical TS  | Anomaly Detection in Hierarchical Time Series        | rows 16–19       |
| §3.4 Matrix Profile   | Matrix Profile and Time-Series Discord Detection     | rows 20–23       |
| §3.5 Combinatorial TS | Combinatorial Optimisation for Selecting Time Series | rows 24–27       |
| §3.6 Combinatorial AD | Combinatorial Optimisation in Anomaly Detection      | rows 28–31       |
| §3.7 GP / GE          | Genetic Programming and Grammatical Evolution        | rows 32–35       |
| §3.8 Research Gap     | Research Gap                                         | —                |
