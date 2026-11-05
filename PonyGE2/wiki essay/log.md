# Wiki Log

Append-only record of wiki activity. Entries use the format `## [YYYY-MM-DD] operation | title`.

---

## [2026-06-26] setup | LLM Wiki bootstrap

Created wiki scaffold: `index.md`, `log.md`, `overview.md`. Schema defined in root `CLAUDE.md`. Raw sources: 28 articles in `Literature Review Articles/` ready for ingest. No source/concept/entity pages yet.

## [2026-06-26] ingest | Batch literature ingest (28 articles)

Converted all 28 Literature Review Articles (and 25 local PDFs) into wiki:

- Created `wiki essay/sources/` — 28 source pages via `scripts/ingest_literature_to_wiki.py`
- Created 11 concept pages, 5 entity pages, 1 synthesis page (`research-gap`)
- Updated `wiki essay/index.md` and `wiki essay/overview.md`
- PDFs missing on disk: article 22 (Zhang 2020), 25 (Koza book), 27 (O'Neill book) — ingested from article notes

## [2026-06-26] setup | Rename wiki → wiki essay

Renamed directory `wiki/` to `wiki essay/`. Updated paths in `CLAUDE.md`, `scripts/ingest_literature_to_wiki.py`, and internal references.

## [2026-06-26] setup | PDF text extraction to wiki essay/raw/

Ran `scripts/extract_pdf_text_to_wiki.py` — 25/28 PDFs extracted to `wiki essay/raw/{slug}.md`. Missing: article 22 (Zhang 2020, paywalled), 25 (Koza book), 27 (O'Neill book). Created `wiki essay/raw/index.md`.

## [2026-06-26] ingest | PDF deep-ingest articles 13–17 (agent 3/5)

Deep-enriched from `wiki essay/raw/` PDF extractions:

- **Sources:** yeh-2017-matrix-profile-unifying-view, zhu-2016-matrix-profile-ii, keogh-2005-hot-sax, law-2019-stumpy, xue-2016-ec-feature-selection-survey — added Raw extraction links, Notes from PDF, enriched Application/Reported results; fixed frontmatter on articles 15–16.
- **Concepts:** matrix-profile (MP definition, algorithms), time-series-discord (non-self match, MP link), combinatorial-optimisation (2^n search space), feature-selection (filter/wrapper, EC paradigms).
- **Entities:** stumpy (capabilities, API, thesis citation split Law/Yeh).

## [2026-06-26] ingest | PDF deep-ingest articles 23–28 (agent 5/5)

Deep-enriched source pages from PDF extractions (23, 24, 26, 28) and article notes (25, 27): added `Notes from PDF`, raw extraction links, quantified results (Riahi mRMRD avg AUC 80.14%; Li VAEGA Table 3; O'Neill GE vs GP; PonyGE2 architecture). Updated concepts: subspace-anomaly-detection, combinatorial-optimisation, auc-fitness, grammatical-evolution, genetic-programming. Updated entities: ponyge2, mobai-grammar (articles 26–28). Updated index summaries.

## [2026-06-26] ingest | PDF deep-ingest articles 18–22 (agent 4/5)

Deep-enriched 5 source pages from raw PDF extractions (18–21) and article note (22, no PDF): `linares-barrera-2024-evolutionary-fs-forecasting`, `yeh-2016-matrix-profile-i`, `contreras-2024-ga-financial-feature-selection`, `he-2021-mining-anomalies-subspaces`, `zhang-2020-many-objective-ec-ad`. Added raw extraction links, expanded Application/Reported results, Notes from PDF sections. Updated concepts: combinatorial-optimisation, feature-selection, matrix-profile, auc-fitness, subspace-anomaly-detection.

## [2026-06-26] ingest | PDF deep-ingest articles 1–6 (agent 1/5)

Deep-enriched from `wiki essay/raw/` PDF text: sources 1–6 (gonzalez-2024, sultan-2018, burgueno-2020, lemaire-2024, mefleh-2025, garcia-gonzalez-2022). Fixed YAML frontmatter on articles 1, 3, 5, 6; added Raw PDF text links and expanded Notes from PDF sections. Updated concepts: telecom-anomaly-detection, grouped-time-series, auc-fitness. Updated entities: telco-dataset (train/val/test splits), mobai-dataset.

## [2026-06-26] ingest | PDF deep-ingest articles 7–12 (agent 2/5)

Deep-enriched source pages from `wiki essay/raw/`: hua-2022-genad (Table 1 F1 breakdown, pre-training ablation), oguz-2022-multi-tier (ROI/shadowing/aggregation), hong-2012-tiresias (ADA metrics, Table VI reference comparison), wolff-2022-hierarchical-search (HDS theory + DARPA), pang-2022-hierarchical-forecasting (MAPE tables, root-cause). huang-2026-hydra: raw extraction wrong PDF — ranking only, flagged for re-extract. Updated concepts: grouped-time-series, hierarchical-time-series, telecom-anomaly-detection. Fixed YAML on articles 7, 9.

## [2026-06-26] ingest | PDF deep-ingest complete (5 agents, 28 articles)

Parallel deep-ingest via 5 Composer agents: all 28 source pages enriched; 25 raw PDF extractions linked; concept/entity pages updated across all Ch. 3 sections. Known gaps: article 10 HYDRA PDF mislabeled on disk; articles 22/25/27 no PDF.

## [2026-06-26] query | PDF-backed literature review writing map

Created Cursor canvas `literature-review-writing-map.canvas.tsx` from `wiki essay` source pages. Grouped 25 local-PDF-backed articles by Chapter 3 section and translated each into application/results-focused writing prompts, excluding theory exposition. Omitted articles 22, 25, and 27 because no local PDF exists.

## [2026-06-26] synthesis | Core-focused literature review draft

Wrote `Literature Review - Core-Focused Draft.md` from the writing-map canvas. Full application/results prose for Core (and the GE method) articles; single-sentence references for Supporting/Optional/Implementation articles per section; each section ends on the map's closing argument. APA references aligned with existing draft.

## [2026-06-29] query | Telecom anomaly detection outline

Answered whether AI can be used for outline brainstorming while the student writes the draft. Synthesised section 1 from `wiki essay` and `Literature Review - Dellmified Draft.md`, focusing on sparse labels, fixed monitored views, CDR relevance, operational scale, aggregation visibility, and the bridge to grouped time series.

## [2026-06-29] query | Telecom anomaly detection angles

Generated five defensible angles for the Chapter 3 section on anomaly detection in telecommunications networks, each with one counterargument, without drafting essay prose.

## [2026-06-29] query | Literature search method defensibility

Assessed whether the canvas literature-search workflow (Google Scholar discovery, Boolean database search, citation snowballing, AI-assisted tools) can be used in the dissertation search-method section. Recommended presenting it as the literature identification protocol, not as evidence from the anomaly-detection papers themselves.

## [2026-06-29] query | Grouped time-series section angles

Generated five defensible angles for Chapter 3 section 2, "Anomaly Detection in Grouped Time Series," each with one counterargument, grounded in Mefleh 2025, García González 2022, Hua 2022, Oğuz 2022, and the current dellmified draft.

## [2026-06-29] query | Hierarchical time-series section angles

Generated an outline and five defensible angles for Chapter 3 section 3, "Anomaly Detection in Hierarchical Time Series," each with one counterargument, grounded in Tiresias, HYDRA, Wolff et al., Pang et al., and the current dellmified draft.

## [2026-06-29] query | Matrix Profile section angles

Generated an outline and five defensible angles for Chapter 3 section 4, "Matrix Profile and Time-Series Discord Detection," each with one counterargument, grounded in Keogh et al. 2005, Yeh et al. 2017, Zhu et al. 2016, Law 2019, and the current dellmified draft.

## [2026-06-29] query | Combinatorial time-series selection angles

Generated an outline and five defensible angles for Chapter 3 section 5, "Combinatorial Optimization for Selecting Time Series," each with one counterargument, grounded in Xue et al. 2016, Linares-Barrera et al. 2024, Yeh et al. 2016, Contreras et al. 2024, and the current dellmified draft.

## [2026-06-29] query | Combinatorial anomaly-detection angles

Generated an outline and five defensible angles for Chapter 3 section 6, "Combinatorial Optimization in Anomaly Detection," each with one counterargument, grounded in He et al. 2021, Zhang and Xie 2020, Riahi-Madvar et al. 2021, Li et al. 2022, and the current dellmified draft.

## [2026-06-29] query | GP and GE section angles

Generated an outline and five defensible angles for Chapter 3 section 7, "Genetic Programming and Grammatical Evolution," each with one counterargument, grounded in Koza 1992, O'Neill and Ryan 2001/2003, Fenton et al. 2017, the GE/PonyGE2 wiki pages, and the current dellmified draft.

## [2026-06-29] setup | Consolidate LR drafts to Dellmified only

Removed `Literature Review Draft - Application and Results.md`, `Literature Review - Core-Focused Draft.md`, and `lr.md`. Updated references in CLAUDE.md, Thesis Status Checklist.md, wiki essay/overview.md, and literature-review-writing-guide canvas to point to `Literature Review - Dellmified Draft.md`.

## [2026-06-29] setup | Remove LR Check and Article Map

Removed `Literature Review Check.md` and `Literature Review Article Map.md`. Updated CLAUDE.md, Thesis Status Checklist.md, wiki essay/overview.md, Literature Review Articles/README.md, canvases, and `scripts/generate_literature_articles.py` (early exit if source files missing).

## [2026-07-14] query | Review of user's grouped-TS section draft

Reviewed the user's own outline for Ch. 3 section 2 against wiki sources. Corrections: Mefleh (not Murphy); Hua F1 0.953 (not 0.915); point-adjust belongs to Hua, not García González; Oğuz 1D CNN 80.1% accuracy. Missing: García González 2022 DC-VAE vs S-VAE paragraph and per-paper gap sentences. Weakest: Hua/comparability paragraph. Flagged "outperform previous studies" closing claim as inconsistent with the comparability caveat.

## [2026-07-14] query | Review of user's hierarchical-TS section draft

Reviewed the user's dictated outline for Ch. 3 section 3 against wiki sources. All present sections support the thesis; missing: Pang et al. 2022 (forecasting ≠ detection evidence), closing gap sentence, in-text citations. Weakest: HYDRA (single uncited sentence). Flagged dictation errors changing meaning: "orange tree"→known tree, "Holt's winter"→Holt-Winters, "GA"→GE, "customer surveys"→call logs, ">94%" precision, "non-spike discourse"→discords.

## [2026-07-16] query | Iterative review of grouped-TS section draft

Reviewed user's Section 2 draft paragraph by paragraph. Opening, Mefleh, Hua, and Oğuz reached defendable form. Closing improved (grammar-defined space; hierarchical aggregations; no outperform claim); remaining polish: subject-verb agreement, "Grammar" spelling, missing verb in "explore how GE... search... rather than".

## [2026-07-15] query | Missing wiki concept

Identified synthetic anomaly injection as the missing first-class concept: it underpins the μ±3σ, 168-hour ground-truth construction used by `hierarchy_auc`, but is currently only mentioned within AUC-fitness and related pages.
## [2026-07-17] query | Draft citation/value audit

Audited Literature Review - Draft.md sections 1-5 against wiki essay/sources. Core numeric claims mostly match; flagged rounding, Hong 94%/99.7% conflation risk, Burgue�o misuse in MP section, missing years, and Ch.1 vs Ch.3 placement.

## [2026-07-17] synthesis | Port draft secs 1-5 to LaTeX

Ported Literature Review - Draft.md sections 1-5 into Latex Document/3-literature-review.tex with biblatex cite keys; kept existing secs 6-7 and Research Gap.

## [2026-07-24] query | Review of Introduction Motivation outline

Reviewed user's three-paragraph Motivation outline against thesis pipeline (GE structure search + MP + telecom + AUC). Paragraphs 1-2 support; paragraph 3 weakest (broken sentence + Hamming/topology drift). Missing: label scarcity, Matrix Profile/discord scorer, GE/grammar, synthetic AUC fitness, and a closing thesis-gap sentence.


## [2026-07-30] query | Chapter 4 vs implementation thesis support

Audited Latex Document/4-materials-methodology.tex against hierarchy_auc / mobai_utils / mobai_nop.pybnf. Strongest: �4.1. Weakest: �4.5 (stub). Filed wiki essay/synthesis/chapter-4-thesis-support.md; canvas chapter-4-thesis-support.canvas.tsx.

## [2026-08-21] query | GE codon mapping walkthrough (y + x)

Explained the Ch. 2 genotype-to-phenotype example C = [4, 15, 75, 8, 41, 12] as a leftmost BNF derivation under selected_option = gene_value mod r.

## [2026-09-07] query | Supervisor comments from Ch. 3.1

Started applying Emanuel comments on `main_comments_20260804.pdf` from §3.1. First note: expand and define CDR on first use, not only in the acronyms list.

## [2026-09-07] query | Emanuel on Sultan 2018 placement

Comment "então não precisa estar aqui" on the old claim that Sultan focused on traffic prediction rather than anomaly detection. Kept Sultan in §3.1 as CDR detection (closest data type); rewrote so k-means AD is the reason for inclusion and prediction is only the downstream use. Updated `Latex Document/3-literature-review.tex`, `Literature Review - Draft.md`, and the Obsidian GSI copy.

## [2026-09-07] query | Matrix Profile applied to telecommunications

None of the 28 ingested sources apply Matrix Profile to telecom operational data. Closest external paper: Van Onsem et al. (2023), IEEE Access, MP-based *motif* discovery on telecom-provider KPIs (Skyline), not discord/anomaly detection and not hierarchy search. Nearby but not mobile-telecom: BGP MP (Computer Networks 2024); DDoS MP (FedCSIS 2021); online MP on IT KPIs (arXiv:2108.12093).

## [2026-09-07] ingest | Van Onsem 2023 — Variable Length Motif Discovery

Downloaded IEEE Access PDF to Literature Review PDFs/04_Matrix_Profile_Discord_Detection/; created wiki essay/sources/van-onsem-2023-variable-length-motif.md, raw extraction, Literature Review Articles/29.md; updated matrix-profile, telecom-anomaly-detection, time-series-discord, research-gap, overview, index; added Ch. 3.4 cite. Motifs on Skyline telecom KPIs, not discord/AUC/structure search.

## [2026-10-01] ingest | Pietroń 2025 — AD-NEv

Downloaded arXiv 2305.16497 PDF to Literature Review PDFs/05_Combinatorial_Optimisation_Time_Series/ (article 30); extracted raw text; created wiki essay/sources/pietron-2025-ad-nev.md and Literature Review Articles/30.md; updated combinatorial-optimisation, subspace-anomaly-detection, index, raw index, READMEs, manifest, layout/slug scripts. Added for Emanuel's §3.5 comment (one more work, name the optimiser): GA over TS subspaces + AE architectures + weights; mean point-wise F1 0.70 vs 0.54; flat subsets, loss fitness, not AUC.
