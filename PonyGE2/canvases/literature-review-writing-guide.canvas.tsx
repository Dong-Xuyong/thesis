import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Tier = "Core" | "Supporting" | "Optional";

type Article = {
  id: number;
  authors: string;
  title: string;
  year: number;
  tier: Tier;
  pdf: string;
  doi: string;
  keyResults: string;
  whatToWrite: string;
  citeAs: string;
  doNot: string;
};

type Section = {
  slug: string;
  number: string;
  title: string;
  articles: string;
  argument: string;
  gapBridge: string;
  pdfFolder: string;
  items: Article[];
};

const SECTIONS: Section[] = [
  {
    slug: "telecom",
    number: "§3.1",
    title: "Anomaly Detection in Telecommunications Networks",
    articles: "1–4",
    argument: "Labels are scarce; fixed views underperform; aggregation matters.",
    gapBridge: "Bridge to §3.2 grouped time series — visibility depends on how traffic is aggregated.",
    pdfFolder: "01_Telecom_Anomaly_Detection",
    items: [
      {
        id: 1,
        authors: "González et al.",
        title: "One Model to Find Them All",
        year: 2024,
        tier: "Core",
        pdf: "Gonzalez_2024_One_Model_to_Find_Them_All.pdf",
        doi: "https://doi.org/10.1109/TNSM.2023.3340146",
        keyResults:
          "TELCO: ~732k samples, 1.2% NOC labels, Jan–Jul 2021, 12 fixed ISP KPIs at 5-min. Range-F1r: R 67%, P 47%, mean F1 52%, median F1 59%.",
        whatToWrite:
          "Open the telecom section. State the label-scarcity reality (1.2%) and modest detection on a pre-chosen 12-KPI view. Position the gap: literature optimises how to score fixed KPIs, not which aggregation to construct. Merge Article 6 only for S-VAE comparator (median F1 31% vs DC-VAE 59%).",
        citeAs: "Core §3.1 opener · primary 2024 journal citation",
        doNot:
          "Do not compare range-F1r to your synthetic AUC. Do not repeat identical DC-VAE numbers when citing #6.",
      },
      {
        id: 2,
        authors: "Sultan et al.",
        title: "CDR-Driven Anomaly Detection and Traffic Prediction",
        year: 2018,
        tier: "Supporting",
        pdf: "Sultan_2018_CDR_Anomaly_Detection.pdf",
        doi: "https://doi.org/10.1109/ACCESS.2018.2859756",
        keyResults:
          "CRAWDAD, Nodobo, Telecom Italia. Nodobo: 13,035 voice + 83,542 message records; Telecom Italia: 2 months. No detection metrics in accessible text.",
        whatToWrite:
          "One short paragraph anchoring CDR/mobile activity as the unit of analysis — closest data type to Vodafone switch records. Link to traffic prediction and QoS motivation. Explicitly state detection metrics were not reported.",
        citeAs: "Data-type anchor · one paragraph",
        doNot:
          "Do not claim detection performance. Do not frame as hierarchy-search precedent.",
      },
      {
        id: 3,
        authors: "Burgueño et al.",
        title: "Online Anomaly Detection System for Mobile Networks",
        year: 2020,
        tier: "Core",
        pdf: "Burgueno_2020_Online_Anomaly_Detection_Mobile_Networks.pdf",
        doi: "https://doi.org/10.3390/s20247232",
        keyResults:
          "24,725 LTE-A cells, 45 days, 650 measurements/cell, 15-min intervals, 240 hourly KPIs. 380 labelled cells, 15 KPIs of 240, 3.8% anomalous samples. ~25% more anomalies detected; ~80% of network anomalies captured.",
        whatToWrite:
          "Emphasise operational scale and label sparsity. KPI-selection bottleneck: only 15 of 240 KPIs monitored — manual coverage is impractical. Use to motivate automated view/series selection, not as a method comparator.",
        citeAs: "Core §3.1 · operational-scale evidence",
        doNot:
          "Do not treat threshold monitoring as competing with GE+MP. Focus on the coverage gap, not algorithm details.",
      },
      {
        id: 4,
        authors: "Lemaire et al.",
        title: "Early Detection of Critical Urban Events",
        year: 2024,
        tier: "Supporting",
        pdf: "Lemaire_2024_Early_Detection_Critical_Urban_Events.pdf",
        doi: "https://doi.org/10.1371/journal.pone.0309093",
        keyResults:
          "Paris/Orange: ~27M daily subscribers, ~12 TB/day, 3 months, 1-min cell aggregation, 86 ground-truth events. Best precision 28.63%. Notre-Dame fire alarm within 5 minutes of visible smoke.",
        whatToWrite:
          "Use for aggregation visibility, not fault-detection benchmarking. Abnormal real-world events appear only after the right spatio-temporal aggregation; even then precision stays low. Bridge sentence into grouped time-series section.",
        citeAs: "Aggregation visibility · bridge to §3.2",
        doNot:
          "Do not benchmark against your AUC experiments. Do not overclaim urban-event detection as telecom fault detection.",
      },
    ],
  },
  {
    slug: "grouped",
    number: "§3.2",
    title: "Anomaly Detection in Grouped Time Series",
    articles: "5–8",
    argument: "Representation/grouping dominates detector choice.",
    gapBridge: "Bridge to §3.3 — once groups exist, hierarchy enables localisation and search.",
    pdfFolder: "02_Grouped_Time_Series",
    items: [
      {
        id: 5,
        authors: "Mefleh et al.",
        title: "Beyond the Norm (Mahalanobis)",
        year: 2025,
        tier: "Core",
        pdf: "Mefleh_2025_Beyond_the_Norm_Mahalanobis.pdf",
        doi: "https://doi.org/10.3390/computers14120561",
        keyResults:
          "AUC: 0.77 (raw KPI) → 0.86 (denominators) → 0.93 (adjusted + denominator) → 0.99 (learned adjustment). MD AUC 0.86 in 1.87s vs One-Class SVM 4h34m15s.",
        whatToWrite:
          "Lead the grouped section. Same telecom KPIs, re-expressed, move detection from mediocre to near-perfect. Frame: representation dominates scorer choice. Close with gap: they hand-design aggregation; thesis searches it via GE.",
        citeAs: "Core §3.2 opener · strongest telecom aggregation evidence",
        doNot:
          "Do not argue Mahalanobis is the right scorer for your thesis. Do not compare their expert-label AUC setup directly to synthetic injection without qualification.",
      },
      {
        id: 6,
        authors: "García González et al.",
        title: "MILETS DC-VAE",
        year: 2022,
        tier: "Supporting",
        pdf: "Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf",
        doi: "https://kdd-milets.github.io/milets2022/papers/MILETS_2022_paper_3436.pdf",
        keyResults:
          "Same TELCO DC-VAE results as #1. S-VAE: recall 38%, precision 48%, F1 33%; median F1 31% vs DC-VAE 59%.",
        whatToWrite:
          "Merge with Article 1 — cite 2024 journal as primary. Use this workshop paper only for S-VAE comparator numbers. One sentence on architecture helping but ceiling staying low due to scarcity.",
        citeAs: "S-VAE comparator only · merged with #1",
        doNot: "Do not repeat identical DC-VAE numbers already cited from #1.",
      },
      {
        id: 7,
        authors: "Hua et al.",
        title: "GenAD",
        year: 2022,
        tier: "Supporting",
        pdf: "Hua_2022_GenAD.pdf",
        doi: "https://doi.org/10.1049/ell2.12683",
        keyResults:
          "China Mobile WBS: precision 0.910, recall 1.000, F1 0.953; area F1 0.962, 0.965, 0.931; total F1 up to +9%.",
        whatToWrite:
          "Cross-entity generalisation across many base stations — detection must hold across related entities, not independent series. Note different label/regime from sparse-label telecom papers so high F1 does not contradict the scarcity narrative.",
        citeAs: "Grouped-population evidence · different label regime",
        doNot:
          "Do not present 95%+ F1 as typical telecom reality. Qualify label availability vs Burgueño/González.",
      },
      {
        id: 8,
        authors: "Oğuz & Kalaycıoğlu",
        title: "Multi-Tiered Cellular Networks (LSTM/1D CNN)",
        year: 2022,
        tier: "Supporting",
        pdf: "Oguz_2022_Multi_Tiered_Cellular_Networks.pdf",
        doi: "https://doi.org/10.1186/s13638-022-02183-7",
        keyResults:
          "2 dB shadowing, 30 m ROI: 1D CNN 80.1%, LSTM 79.08%. Best case TPR >95%, accuracy >80% for four FAP states.",
        whatToWrite:
          "Brief point: tier/group context affects detection quality. Detection degrades predictably with operating conditions. Not a direct thesis comparator — trim first if word count is tight.",
        citeAs: "Optional depth · tier context",
        doNot:
          "Do not spend paragraphs on LSTM/CNN architecture. Trim or cut if space tight.",
      },
    ],
  },
  {
    slug: "hierarchical",
    number: "§3.3",
    title: "Anomaly Detection in Hierarchical Time Series",
    articles: "9–12",
    argument: "Hierarchy enables localisation and search; forecasting ≠ detection.",
    gapBridge: "Bridge to §3.4 — hierarchy decides where to look; Matrix Profile supplies a label-free scorer.",
    pdfFolder: "03_Hierarchical_Time_Series",
    items: [
      {
        id: 9,
        authors: "Hong et al.",
        title: "Tiresias",
        year: 2012,
        tier: "Core",
        pdf: "Hong_2012_Tiresias.pdf",
        doi: "https://doi.org/10.1109/ICDCS.2012.30",
        keyResults:
          ">94% accuracy locating anomalies; >94% of ISP reference anomalies found. ADA: 14.2× lower runtime, 2× lower memory, <1% TS error, 99.7% identification accuracy.",
        whatToWrite:
          "Anchor the hierarchy section. Closest precedent for hierarchical operational network localisation (Tier-1 ISP, customer-care logs, set-top-box crashes). Contrast: fixed hierarchy + ISP logs vs your searched partial aggregations with MP + GE.",
        citeAs: "Core §3.3 anchor · localisation precedent",
        doNot:
          "Do not treat Tiresias forecasting/localisation as your GE search. Focus on what hierarchy enabled operationally.",
      },
      {
        id: 10,
        authors: "Huang et al.",
        title: "HYDRA",
        year: 2026,
        tier: "Supporting",
        pdf: "Huang_2026_HYDRA.pdf",
        doi: "https://doi.org/10.1145/3802074",
        keyResults:
          "Ranked first among 40 algorithms on 40 TSB-AD datasets. No accessible F1/AUC values.",
        whatToWrite:
          "Multi-level beats single-level views. State ranking only — do not invent metrics. Note general benchmark, not telecom operational data.",
        citeAs: "Multi-resolution evidence · ranking only",
        doNot:
          "Do not invent F1/AUC numbers. Do not claim telecom validation.",
      },
      {
        id: 11,
        authors: "Wolff et al.",
        title: "Composite Anomaly Detection via Hierarchical Dynamic Search",
        year: 2022,
        tier: "Core",
        pdf: "Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf",
        doi: "https://doi.org/10.1109/ISIT50566.2022.9834631",
        keyResults:
          "Detection error O(c); order-optimal sample complexity in M. Outperforms CBRW and DS; no exact empirical scores in accessible abstract.",
        whatToWrite:
          "Adaptive tree search over subsets — same computational stance as partial-hierarchy search. Bridge to GE-generated candidates. State missing empirical scores explicitly.",
        citeAs: "Search-over-hierarchy bridge to thesis GE loop",
        doNot:
          "Do not overclaim empirical superiority without accessible scores.",
      },
      {
        id: 12,
        authors: "Pang et al.",
        title: "Hierarchical Forecasting and Root Cause",
        year: 2022,
        tier: "Supporting",
        pdf: "Pang_2022_Hierarchical_Forecasting_Root_Cause.pdf",
        doi: "https://doi.org/10.5220/0010900500003122",
        keyResults:
          "Hierarchy: 1 top, 2 middle, 74 bottom series. LightGBM MAPE: count 3.51%, amount 4.95% (beats Lasso and XGBoost).",
        whatToWrite:
          "Forecast/root-cause drill-down only — not a detection benchmark. Shows hierarchy literature focuses on forecasting and reconciliation. Use to argue structure-for-detection remains comparatively unaddressed. Trim first if space tight.",
        citeAs: "Forecasting ≠ detection distinction",
        doNot:
          "Do not cite MAPE as anomaly detection performance. Do not confuse root-cause drill-down with discord scoring.",
      },
    ],
  },
  {
    slug: "matrix-profile",
    number: "§3.4",
    title: "Matrix Profile and Time-Series Discord Detection",
    articles: "13–16",
    argument: "Label-free, scalable scorer for many candidates.",
    gapBridge: "Bridge to §3.5 — once scoring is cheap, which series to score becomes a combinatorial search.",
    pdfFolder: "04_Matrix_Profile_Discord_Detection",
    items: [
      {
        id: 13,
        authors: "Yeh et al.",
        title: "Matrix Profile unifying view (DMKD)",
        year: 2017,
        tier: "Core",
        pdf: "Yeh_2017_Matrix_Profile_Unifying_View.pdf",
        doi: "https://doi.org/10.1007/s10618-017-0519-9",
        keyResults:
          "Join: 153.8 days → 1.2 hours. STOMP 4.7× speedup (~2M length). Cloud: 4.2 days → 14.1 hours. GPU-STAMP 30× over STAMP.",
        whatToWrite:
          "Primary Matrix Profile reference for the thesis scorer. Label-free discord score cheap enough to recompute per candidate in a GE search loop. Cite runtime evidence that per-candidate scoring is feasible at scale.",
        citeAs: "Core §3.4 · primary MP method reference",
        doNot:
          "Do not reproduce full MP algorithm exposition — cross-ref Ch. 2 if needed. Focus on deployability in a search loop.",
      },
      {
        id: 14,
        authors: "Zhu et al.",
        title: "Matrix Profile II",
        year: 2016,
        tier: "Supporting",
        pdf: "Zhu_2016_Matrix_Profile_II.pdf",
        doi: "https://doi.org/10.1109/ICDM.2016.0085",
        keyResults:
          "100M subsequences; brute force ~1,585 years vs GPU-STOMP 12 days.",
        whatToWrite:
          "One sentence on extreme-scale headroom — scoring will not bottleneck when many candidate hierarchies are evaluated. Ignore seismology application detail.",
        citeAs: "Scale headroom · one sentence",
        doNot:
          "Do not discuss seismology domain. Do not duplicate #13 method detail.",
      },
      {
        id: 15,
        authors: "Keogh et al.",
        title: "HOT SAX",
        year: 2005,
        tier: "Supporting",
        pdf: "Keogh_2005_HOT_SAX.pdf",
        doi: "https://doi.org/10.1109/ICDM.2005.79",
        keyResults:
          "3–4 orders of magnitude faster than brute force; >1M experiments on 82 datasets.",
        whatToWrite:
          "Brief applied foundation: discord = subsequence most distant from nearest neighbour, validated at scale across 82 datasets. Include only to justify why distance-based discord scoring is meaningful for anomalies — cross-ref Ch. 2 if discord is defined there.",
        citeAs: "Conceptual anchor · one short paragraph max",
        doNot:
          "Do not reproduce SAX/PAA algorithm steps. Keep to application validation (82 datasets, 1M experiments).",
      },
      {
        id: 16,
        authors: "Law",
        title: "STUMPY",
        year: 2019,
        tier: "Core",
        pdf: "Law_2019_STUMPY.pdf",
        doi: "https://doi.org/10.21105/joss.01504",
        keyResults: "No headline benchmark in accessible metadata.",
        whatToWrite:
          "Cite as the reproducible Python MP implementation used in the thesis (m=168 discord scoring). Tool reference for methodology chapter cross-ref, not an empirical comparator.",
        citeAs: "Implementation reference · Ch. 3 + methodology cross-ref",
        doNot:
          "Do not invent benchmark numbers. Do not treat as competing anomaly detector.",
      },
    ],
  },
  {
    slug: "co-ts",
    number: "§3.5",
    title: "Combinatorial Optimisation for Selecting Time Series",
    articles: "17–20",
    argument: "Selection is combinatorial; EC + fast scorer + AUC fitness.",
    gapBridge: "Bridge to §3.6 — same search+scorer pattern applied when anomalies live in selected subspaces.",
    pdfFolder: "05_Combinatorial_Optimisation_Time_Series",
    items: [
      {
        id: 17,
        authors: "Xue et al.",
        title: "Survey on EC for Feature Selection",
        year: 2016,
        tier: "Core",
        pdf: "Xue_2016_EC_Feature_Selection_Survey.pdf",
        doi: "https://doi.org/10.1109/TEVC.2015.2504420",
        keyResults: "Survey — no single headline result.",
        whatToWrite:
          "One paragraph framing: subset selection from a combinatorial space is a mature optimisation problem. Departure for thesis: object selected is an aggregation structure / monitoring view that changes the signal, not a fixed ML feature vector.",
        citeAs: "§3.5 opener · problem framing",
        doNot:
          "Do not summarise survey taxonomy at length. No quantified results to report — say so.",
      },
      {
        id: 18,
        authors: "Linares-Barrera et al.",
        title: "Evolutionary FS for Forecasting",
        year: 2024,
        tier: "Core",
        pdf: "Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf",
        doi: "https://doi.org/10.1145/3605098.3636191",
        keyResults:
          "Electricity MAE/features: 207.193/7704 → 194.400/3813. Traffic: 0.008/20688 → 0.007/10316.",
        whatToWrite:
          "Lead applied paragraph: EC can halve inputs while preserving or improving performance. Analogy to pruning uninformative aggregation paths among ~94k Vodafone combinations. Contrast forecast MAE fitness with thesis hierarchy_auc.",
        citeAs: "Core §3.5 · search efficiency evidence",
        doNot:
          "Do not claim MAE results transfer to anomaly AUC. Keep analogy explicit.",
      },
      {
        id: 19,
        authors: "Yeh et al.",
        title: "Matrix Profile I",
        year: 2016,
        tier: "Supporting",
        pdf: "Yeh_2016_Matrix_Profile_I.pdf",
        doi: "https://doi.org/10.1109/ICDM.2016.0179",
        keyResults:
          "Refinery self-join: 153.8 days → 6.3 hours. Shapelet: 4.2 min → 1.0 + 2.7 s (68×).",
        whatToWrite:
          "Brief link: selected candidates can be judged via MP evidence at search-compatible speed. Prefer #13 for method detail — avoid duplicating full MP exposition.",
        citeAs: "Search–scorer coupling bridge · one paragraph",
        doNot:
          "Do not repeat §3.4 MP content. Do not discuss refinery domain in detail.",
      },
      {
        id: 20,
        authors: "Contreras et al.",
        title: "GA for Financial Time-Series Monotonicity",
        year: 2024,
        tier: "Optional",
        pdf: "Contreras_2024_GA_Financial_Feature_Selection.pdf",
        doi: "https://doi.org/10.3390/e26030177",
        keyResults:
          "Best AUROC: Bitcoin 0.61, Ibovespa 0.62, Vale 0.58.",
        whatToWrite:
          "Optional: GA + AUROC evaluation design parallel to thesis hierarchy_auc. Modest absolute scores — cite the design pattern (evolutionary search optimised against AUC), not the financial domain results.",
        citeAs: "Include only if space allows · AUC fitness parallel",
        doNot:
          "Do not overclaim financial AUROC as anomaly detection evidence. Cut if word count tight.",
      },
    ],
  },
  {
    slug: "co-ad",
    number: "§3.6",
    title: "Combinatorial Optimisation in Anomaly Detection",
    articles: "21, 23–24",
    argument: "Anomalies live in selected subspaces; scorer + search combined.",
    gapBridge: "Bridge to §3.7 — GE generates valid interpretable hierarchy candidates for that search.",
    pdfFolder: "06_Combinatorial_Optimisation_Anomaly_Detection",
    items: [
      {
        id: 21,
        authors: "He et al.",
        title: "Mining Anomalies in Subspaces (Financial)",
        year: 2021,
        tier: "Core",
        pdf: "He_2021_Mining_Anomalies_Subspaces.pdf",
        doi: "https://doi.org/10.1007/978-3-030-86514-6_2",
        keyResults:
          "70 GB, 600M+ transactions, 415 MCCs. Greedy MAP 0.86 in 1345.50s vs evolutionary 0.72 in 87.62s. Production: 22 min vs 1.5 min.",
        whatToWrite:
          "Lead combinatorial-AD subsection. Strongest analogy: anomalies visible only in selected subspaces. Report speed vs accuracy trade-off in vast search spaces. Pair with #24 as structural precedent for scorer + evolutionary search.",
        citeAs: "Core §3.6 opener · subspace search analogy",
        doNot:
          "Do not treat financial MCC subspaces as telecom hierarchies without stating the analogy.",
      },
      {
        id: 23,
        authors: "Riahi-Madvar et al.",
        title: "MI Subspace Selection for Outliers",
        year: 2021,
        tier: "Optional",
        pdf: "Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf",
        doi: "https://doi.org/10.1016/j.knosys.2020.106733",
        keyResults:
          "Better accuracy, lower complexity, faster than baselines — no exact numbers in accessible abstract.",
        whatToWrite:
          "2–3 sentences: select view first, then score — mirrors grammar → MP two-stage design. Trim if redundant with #21.",
        citeAs: "Optional · two-stage view-then-score mirror",
        doNot:
          "Do not invent accuracy numbers. Cut if #21 already covers the argument.",
      },
      {
        id: 24,
        authors: "Li et al.",
        title: "VAE + GA for High-Dimensional Outliers",
        year: 2022,
        tier: "Core",
        pdf: "Li_2022_VAE_GA_Outlier_Detection.pdf",
        doi: "https://doi.org/10.3390/a15110429",
        keyResults:
          "VAEGA AUC: Cardio 0.966, Credit Card 0.966, Satellite 0.970, MUSK 0.957, Arrhythmia 0.863; ~3% over VAE.",
        whatToWrite:
          "Strongest structural analogy: anomaly scorer (VAE) + evolutionary search over interpretable structures. Pair with #21. Note AUC-based evaluation on tabular benchmarks — parallel to thesis AUC fitness, different data domain.",
        citeAs: "Core §3.6 · scorer + EA structure analogy",
        doNot:
          "Do not compare tabular benchmark AUC directly to telecom hierarchy_auc without qualification.",
      },
    ],
  },
  {
    slug: "gp-ge",
    number: "§3.7",
    title: "Genetic Programming and Grammatical Evolution",
    articles: "26, 28",
    argument: "Grammar generates valid interpretable hierarchies; PonyGE2 implements.",
    gapBridge: "Close with research gap — no reviewed work integrates structure search + MP + telecom + AUC.",
    pdfFolder: "07_Genetic_Programming_Grammatical_Evolution",
    items: [
      {
        id: 26,
        authors: "O'Neill & Ryan",
        title: "Grammatical Evolution (paper)",
        year: 2001,
        tier: "Core",
        pdf: "ONeill_2001_Grammatical_Evolution.pdf",
        doi: "https://doi.org/10.1109/4235.942529",
        keyResults:
          "Santa Fe ant: 89 food pieces, 32×32 grid; 20 fitness cases for symbolic tasks. GE outperformed GP from ~generation 10 on symbolic integration.",
        whatToWrite:
          "Core GE citation for thesis method: BNF grammar + genotype-to-phenotype mapping guarantees every candidate is syntactically valid. Map to mobai_nop.pybnf → readable aggregation phenotype via PonyGE2. Santa Fe/integration benchmarks are not comparable to thesis ROC-AUC — cite mechanism, not those scores.",
        citeAs: "Core §3.7 · GE method reference + Ch. 4 cross-ref",
        doNot:
          "Do not reproduce GE algorithm steps (Ch. 2 covers theory). Do not compare Santa Fe food count to hierarchy_auc.",
      },
      {
        id: 28,
        authors: "Fenton et al.",
        title: "PonyGE2",
        year: 2017,
        tier: "Core",
        pdf: "Fenton_2017_PonyGE2.pdf",
        doi: "https://doi.org/10.1145/3067695.3082469",
        keyResults: "Tooling paper — reproducible runs, saved seeds/parameters, benchmark grammars.",
        whatToWrite:
          "Implementation reference for thesis GE engine. Cross-ref methodology chapter (parameters, seeds, mobai.txt). No performance claims — cite reproducibility and grammar-driven search infrastructure.",
        citeAs: "Implementation reference · methodology Ch. 4–5",
        doNot:
          "Do not claim PonyGE2 benchmark results apply to telecom anomaly detection.",
      },
    ],
  },
];

const NO_PDF = [
  { id: 22, authors: "Zhang & Xie", title: "Many-Objective EC for AD Feature Selection", note: "No local PDF — optional 2–3 sentences if cited from DOI" },
  { id: 25, authors: "Koza", title: "Genetic Programming (book)", note: "Ch. 2 mainly — no local PDF" },
  { id: 27, authors: "O'Neill & Ryan", title: "Grammatical Evolution (book)", note: "Grammar decoupled from fitness — no local PDF; cite design principle only" },
];

function ArticleCard({ article }: { article: Article }) {
  const theme = useHostTheme();
  const tierTone =
    article.tier === "Core"
      ? "success"
      : article.tier === "Optional"
        ? "neutral"
        : "info";

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        border: `1px solid ${article.tier === "Core" ? theme.accent.primary : theme.stroke.secondary}`,
        background: theme.fill.tertiary,
      }}
    >
      <Row gap={8} wrap style={{ marginBottom: 8 }}>
        <Pill tone="info">#{article.id}</Pill>
        <Pill tone={tierTone}>{article.tier}</Pill>
        <Pill tone="neutral">{article.year}</Pill>
      </Row>
      <H3 style={{ margin: "0 0 2px" }}>{article.authors}</H3>
      <Text size="sm" color="secondary" style={{ marginBottom: 10 }}>
        {article.title}
      </Text>

      <Stack gap={8}>
        <div>
          <Text weight="semibold" size="sm">
            Key results to cite
          </Text>
          <Text size="sm" color="secondary">
            {article.keyResults}
          </Text>
        </div>
        <div>
          <Text weight="semibold" size="sm">
            What to write (application only)
          </Text>
          <Text size="sm">{article.whatToWrite}</Text>
        </div>
        <div>
          <Text weight="semibold" size="sm">
            Cite as
          </Text>
          <Text size="sm" color="secondary">
            {article.citeAs}
          </Text>
        </div>
        <div>
          <Text weight="semibold" size="sm">
            Do not
          </Text>
          <Text size="sm" color="tertiary">
            {article.doNot}
          </Text>
        </div>
        <Row gap={12}>
          <Link href={article.doi}>DOI</Link>
          <Text size="sm" color="tertiary">
            {article.pdf}
          </Text>
        </Row>
      </Stack>
    </div>
  );
}

function SectionPanel({ section }: { section: Section }) {
  const coreCount = section.items.filter((a) => a.tier === "Core").length;

  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <Row gap={8} wrap>
          <Pill tone="info">{section.number}</Pill>
          <Pill tone="success">
            {section.items.length} PDFs · {coreCount} core
          </Pill>
        </Row>
        <H2 style={{ margin: 0 }}>{section.title}</H2>
        <Text color="secondary">Articles {section.articles}</Text>
      </Stack>

      <Callout tone="info" title="Section argument to close">
        {section.argument} {section.gapBridge}
      </Callout>

      <Grid columns={section.items.length > 2 ? 2 : 1} gap={14}>
        {section.items.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </Grid>

      <Text size="sm" color="tertiary">
        PDF folder: Literature Review PDFs/{section.pdfFolder}/
      </Text>
    </Stack>
  );
}

export default function LiteratureReviewWritingGuide() {
  const theme = useHostTheme();
  const [activeSlug, setActiveSlug] = useCanvasState("section", SECTIONS[0].slug);
  const active = SECTIONS.find((s) => s.slug === activeSlug) ?? SECTIONS[0];
  const totalPdfs = SECTIONS.reduce((n, s) => n + s.items.length, 0);
  const totalCore = SECTIONS.reduce(
    (n, s) => n + s.items.filter((a) => a.tier === "Core").length,
    0,
  );

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 980 }}>
      <Stack gap={6}>
        <H1>Literature Review — What to Write (Application Only)</H1>
        <Text color="secondary">
          Per-article writing guidance for all 25 PDF-backed sources. Focus on
          datasets, reported results, operational settings, and thesis gaps —
          not method theory (defer theory to Ch. 2).
        </Text>
        <Row gap={8} wrap>
          <Pill tone="info">{totalPdfs} articles with PDFs</Pill>
          <Pill tone="success">{totalCore} core citations</Pill>
          <Pill tone="neutral">3 articles without PDF (22, 25, 27)</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="7" label="Literature sections" tone="info" />
        <Stat value="25" label="PDF-backed articles" tone="success" />
        <Stat value="12" label="Core inclusions" tone="info" />
        <Stat value="0" label="Theory paragraphs needed" tone="neutral" />
      </Grid>

      <Callout tone="warning" title="Writing rules (all sections)">
        Prioritise application and reported results. If no accessible numeric
        result exists, say so explicitly. Do not compare synthetic-injection AUC
        to expert-label range-F1 without qualification. Close each section with
        a gap sentence pointing to the next section or your integrated framework.
      </Callout>

      <Stack gap={8}>
        <Text weight="semibold">Jump to section</Text>
        <Row gap={6} wrap>
          {SECTIONS.map((s) => (
            <Button
              key={s.slug}
              variant={activeSlug === s.slug ? "primary" : "secondary"}
              size="sm"
              onClick={() => setActiveSlug(s.slug)}
            >
              {s.number} ({s.items.length})
            </Button>
          ))}
        </Row>
      </Stack>

      <Divider />

      <SectionPanel section={active} />

      <Divider />

      <Card>
        <CardHeader title="Articles without local PDF" />
        <CardBody>
          <Stack gap={10}>
            {NO_PDF.map((a) => (
              <Row key={a.id} gap={8} wrap>
                <Pill tone="neutral">#{a.id}</Pill>
                <Text size="sm">
                  <Text weight="semibold" as="span">
                    {a.authors} —{" "}
                  </Text>
                  {a.title}. {a.note}
                </Text>
              </Row>
            ))}
          </Stack>
        </CardBody>
      </Card>

      <div
        style={{
          padding: "12px 14px",
          borderRadius: 8,
          border: `1px solid ${theme.stroke.tertiary}`,
          background: theme.bg.elevated,
        }}
      >
        <Text size="sm" color="tertiary">
          Source: Literature Review - Dellmified Draft.md · wiki
          essay/sources/ · 25 PDFs in Literature Review PDFs/
        </Text>
      </div>
    </Stack>
  );
}
