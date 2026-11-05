import {
  BarChart,
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
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

const THESIS = {
  data: "Vodafone switch · 4.2M hourly records (Jul–Oct 2022)",
  metrics: "#Events · Event Duration",
  dims:
    "Call Type · Event Type · Subscriber Type · Traffic Type · Service Type · Partner",
  search: "GE grammar → partial hierarchical filters",
  score: "Matrix Profile discord (label-free)",
  fitness: "AUC on synthetically injected anomalies",
  explain: "GE phenotype = readable aggregation rule for operators",
};

const PAPERS = [
  {
    id: 9,
    year: 2012,
    authors: "Hong et al.",
    title: "Tiresias",
    data: "Tier-1 ISP · customer-care & STB crash logs",
    method: "Online hierarchical anomaly detection + localisation",
    headline: ">94% localisation accuracy",
    detail:
      ">94% of ISP reference anomalies found · ADA: 14.2× runtime, 2× memory, 99.7% ID accuracy",
    relevance: "Anchor" as const,
    thesisComponent: "Localisation · operational network AD",
    thesisRole:
      "Closest applied precedent — hierarchy localises faults in operational telecom logs, not just flags them.",
    thesisContrast:
      "Fixed ISP hierarchy (care logs, STB crashes). Thesis searches partial filters over six Vodafone categorical dimensions via GE.",
    thesisTake:
      "Operators need WHERE the fault is; hierarchy makes localisation tractable at scale.",
    thesisAdd:
      "GE phenotype names the affected aggregation path — structure is the explanation.",
    citeAs: "Anchor §3.3 · contrast fixed tree vs searched partial aggregations",
    doi: "https://doi.org/10.1109/ICDCS.2012.30",
    pdf: "Hong_2012_Tiresias.pdf",
    tone: "success" as const,
  },
  {
    id: 10,
    year: 2026,
    authors: "Huang et al.",
    title: "HYDRA",
    data: "40 TSB-AD benchmark datasets (general TS)",
    method: "Multi-level hierarchy-driven unsupervised AD",
    headline: "Ranked 1st among 40 algorithms",
    detail: "40 datasets · no accessible F1/AUC in abstract",
    relevance: "Supports" as const,
    thesisComponent: "Multi-level evidence · partial views",
    thesisRole:
      "Shows fully aggregated or fully disaggregated views are each insufficient — multi-level evidence wins.",
    thesisContrast:
      "Fixed multi-resolution design on general benchmarks. Thesis learns which dimension combinations to aggregate via grammar.",
    thesisTake:
      "Single monitoring level misses anomalies visible only in partial aggregations.",
    thesisAdd:
      "Combinatorial search over partial hierarchies + MP scoring + AUC fitness on injected telecom anomalies.",
    citeAs: "State ranking only — do not invent F1/AUC · not telecom data",
    doi: "https://doi.org/10.1145/3802074",
    pdf: "Huang_2026_HYDRA.pdf",
    tone: "info" as const,
  },
  {
    id: 11,
    year: 2022,
    authors: "Wolff et al.",
    title: "Hierarchical Dynamic Search",
    data: "Tree-structured composite observations",
    method: "Adaptive subset search over hierarchy",
    headline: "Detection error O(c)",
    detail: "Order-optimal sample complexity · beats CBRW & DS",
    relevance: "Bridge" as const,
    thesisComponent: "Adaptive search · combinatorial optimisation",
    thesisRole:
      "Same computational stance as thesis — query partial tree subsets instead of exhaustively checking every leaf.",
    thesisContrast:
      "Tree structure is given; search is adaptive querying. Thesis generates candidate structures with GE, scores with MP.",
    thesisTake:
      "O(c) error and order-optimal samples justify partial-hierarchy search over brute-force leaf scoring.",
    thesisAdd:
      "Grammar-constrained structure generation + label-free MP discord + AUC objective on Vodafone data.",
    citeAs: "Bridge to §3.5 · note missing empirical scores in abstract",
    doi: "https://doi.org/10.1109/ISIT50566.2022.9834631",
    pdf: "Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf",
    tone: "info" as const,
  },
  {
    id: 12,
    year: 2022,
    authors: "Pang et al.",
    title: "Hierarchical Forecasting & Root Cause",
    data: "Enterprise KPIs · 1 top / 2 mid / 74 bottom series",
    method: "LightGBM forecast + drill-down RCA",
    headline: "MAPE 3.51% count · 4.95% amount",
    detail: "Beats Lasso & XGBoost · forecast-based, not AD benchmark",
    relevance: "Context" as const,
    thesisComponent: "Interpretability · drill-down",
    thesisRole:
      "Shows hierarchy literature invests in forecasting/reconciliation — structure-for-detection remains unaddressed.",
    thesisContrast:
      "Forecast MAPE objective and fixed enterprise hierarchy. Thesis optimises AUC on injected anomalies with evolved structures.",
    thesisTake:
      "Drill-down from aggregate to leaf helps operators interpret where behaviour changed.",
    thesisAdd:
      "Detection-first framework where the evolved phenotype itself is the root-cause description.",
    citeAs: "Trim first if word count tight · forecast ≠ detection benchmark",
    doi: "https://doi.org/10.5220/0010900500003122",
    pdf: "Pang_2022_Hierarchical_Forecasting_Root_Cause.pdf",
    tone: "neutral" as const,
  },
];

function PaperCard({ paper }: { paper: (typeof PAPERS)[number] }) {
  const theme = useHostTheme();
  const relevanceTone =
    paper.relevance === "Anchor"
      ? "success"
      : paper.relevance === "Bridge"
        ? "info"
        : paper.relevance === "Supports"
          ? "info"
          : "neutral";

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        border: `1px solid ${theme.stroke.secondary}`,
        background: theme.fill.tertiary,
        height: "100%",
      }}
    >
      <Row gap={8} wrap style={{ marginBottom: 8 }}>
        <Pill tone={paper.tone}>Article {paper.id}</Pill>
        <Pill tone={relevanceTone}>{paper.relevance} for thesis</Pill>
        <Pill tone="neutral">{paper.year}</Pill>
      </Row>
      <H3 style={{ margin: "0 0 4px" }}>{paper.authors}</H3>
      <Text size="sm" color="secondary" style={{ marginBottom: 10 }}>
        {paper.title}
      </Text>
      <Text weight="semibold" style={{ marginBottom: 6 }}>
        {paper.headline}
      </Text>
      <Text size="sm" color="secondary" style={{ marginBottom: 10 }}>
        {paper.detail}
      </Text>
      <Stack gap={6}>
        <Text size="sm">
          <Text weight="semibold" as="span">
            Thesis component:{" "}
          </Text>
          {paper.thesisComponent}
        </Text>
        <Text size="sm">{paper.thesisRole}</Text>
        <Text size="sm" color="tertiary">
          Contrast: {paper.thesisContrast}
        </Text>
        <Text size="sm">
          <Text weight="semibold" as="span">
            Take:{" "}
          </Text>
          {paper.thesisTake}
        </Text>
        <Text size="sm">
          <Text weight="semibold" as="span">
            Thesis adds:{" "}
          </Text>
          {paper.thesisAdd}
        </Text>
        <Text size="sm" color="secondary">
          Cite as: {paper.citeAs}
        </Text>
        <Link href={paper.doi}>DOI</Link>
      </Stack>
    </div>
  );
}

function TimelineNode({
  year,
  label,
  active,
}: {
  year: number;
  label: string;
  active?: boolean;
}) {
  const theme = useHostTheme();
  return (
    <Stack gap={4} align="center" style={{ flex: 1, minWidth: 72 }}>
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: active ? theme.accent.primary : theme.fill.secondary,
          border: `2px solid ${active ? theme.accent.primary : theme.stroke.secondary}`,
        }}
      />
      <Text weight="semibold">{year}</Text>
      <Text size="sm" color="secondary" style={{ textAlign: "center" }}>
        {label}
      </Text>
    </Stack>
  );
}

function ThesisHierarchy() {
  const theme = useHostTheme();
  const levels = [
    {
      label: "Leaf filters",
      sub: "Partner · Traffic Type · Subscriber Type · …",
      width: "100%",
    },
    {
      label: "Partial aggregation",
      sub: "GE-selected subset of six categorical dims",
      width: "78%",
    },
    {
      label: "Scored series",
      sub: "#Events or Event Duration time series",
      width: "52%",
    },
  ];
  return (
    <Stack gap={8}>
      {levels.map((level) => (
        <div
          key={level.label}
          style={{
            width: level.width,
            margin: "0 auto",
            padding: "10px 14px",
            borderRadius: 6,
            border: `1px solid ${theme.stroke.secondary}`,
            background: theme.bg.elevated,
            textAlign: "center",
          }}
        >
          <Text weight="semibold">{level.label}</Text>
          <Text size="sm" color="secondary">
            {level.sub}
          </Text>
        </div>
      ))}
      <Text size="sm" color="tertiary" style={{ textAlign: "center" }}>
        Section papers fix or design hierarchy upfront; thesis evolves partial
        filters over {THESIS.dims}
      </Text>
    </Stack>
  );
}

function ThesisPipeline() {
  const theme = useHostTheme();
  const steps = [
    { label: "GE grammar", sub: "Generate partial hierarchy" },
    { label: "Aggregate", sub: "#Events · Duration" },
    { label: "Matrix Profile", sub: "Label-free discord score" },
    { label: "AUC fitness", sub: "Injected anomaly eval" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        padding: "14px 8px",
        borderRadius: 8,
        border: `1px solid ${theme.accent.primary}`,
        background: theme.bg.elevated,
      }}
    >
      {steps.map((step, i) => (
        <div
          key={step.label}
          style={{ display: "flex", flex: 1, alignItems: "stretch" }}
        >
          <Stack
            gap={4}
            align="center"
            style={{ flex: 1, padding: "8px 10px", textAlign: "center" }}
          >
            <Text weight="semibold">{step.label}</Text>
            <Text size="sm" color="secondary">
              {step.sub}
            </Text>
          </Stack>
          {i < steps.length - 1 && (
            <Text
              color="tertiary"
              style={{ alignSelf: "center", padding: "0 4px" }}
            >
              →
            </Text>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HierarchicalTimeSeriesSection() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>§03 Hierarchical Time Series — Thesis Relevance</H1>
        <Text color="secondary">
          How each paper in 03_Hierarchical_Time_Series maps to the thesis
          framework: GE-searched partial hierarchies, Matrix Profile scoring,
          and AUC evaluation on Vodafone grouped traffic
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Articles 9–12 / 28</Pill>
          <Pill tone="success">1 anchor · 1 bridge · 1 support · 1 context</Pill>
          <Pill tone="neutral">{THESIS.data}</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="1" label="Anchor (Tiresias)" tone="success" />
        <Stat value="1" label="Search bridge (Wolff)" tone="info" />
        <Stat value="0" label="Papers with GE + MP + AUC" tone="danger" />
        <Stat value="6" label="Thesis categorical dims" />
      </Grid>

      <Callout tone="info" title="Thesis framework (what §03 papers lack)">
        {THESIS.search} over {THESIS.dims} on {THESIS.data}. Score{" "}
        {THESIS.metrics} with {THESIS.score}; optimise {THESIS.fitness}.{" "}
        {THESIS.explain}. No reviewed paper in this section jointly learns
        structure, scores label-free, and evaluates on grouped telecom traffic.
      </Callout>

      <Stack gap={10}>
        <H2>Your hierarchy model vs literature</H2>
        <ThesisHierarchy />
      </Stack>

      <Stack gap={10}>
        <H2>Proposed thesis pipeline (missing from all four papers)</H2>
        <ThesisPipeline />
      </Stack>

      <Stack gap={10}>
        <H2>Publication timeline</H2>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            padding: "16px 12px",
            borderRadius: 8,
            border: `1px solid ${theme.stroke.tertiary}`,
            background: theme.bg.elevated,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 22,
              left: "10%",
              right: "10%",
              height: 2,
              background: theme.stroke.secondary,
            }}
          />
          <TimelineNode year={2012} label="Tiresias · anchor" active />
          <TimelineNode year={2022} label="Wolff · search" active />
          <TimelineNode year={2022} label="Pang · forecast" active />
          <TimelineNode year={2026} label="HYDRA · multi-level" active />
        </div>
      </Stack>

      <Grid columns={2} gap={14}>
        {PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </Grid>

      <Card>
        <CardHeader title="Thesis component coverage by paper" />
        <CardBody>
          <Table
            headers={[
              "Paper",
              "Relevance",
              "Localise",
              "Multi-level",
              "Search",
              "MP",
              "GE",
              "Telecom",
              "AUC fitness",
            ]}
            rows={[
              ["Tiresias (9)", "Anchor", "Yes", "Fixed", "No", "No", "No", "Yes", "No"],
              ["HYDRA (10)", "Supports", "No", "Yes", "No", "No", "No", "No", "No"],
              ["Wolff (11)", "Bridge", "Partial", "Yes", "Yes", "No", "No", "No", "No"],
              ["Pang (12)", "Context", "RCA", "Fixed", "No", "No", "No", "No", "No"],
              ["This thesis", "—", "Yes", "Learned", "Yes", "Yes", "Yes", "Yes", "Yes"],
            ]}
            striped
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Tiresias (9): localisation metrics — thesis anchor" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Use to establish that hierarchy enables WHERE-not-just-IF for
              operational network data. Contrast Tiresias&apos;s fixed ISP tree
              with GE-evolved partial filters on Vodafone categorical
              dimensions.
            </Text>
            <BarChart
              categories={[
                "Localisation accuracy (%)",
                "ISP anomalies recovered (%)",
                "ADA ID accuracy (%)",
                "Runtime reduction (×)",
              ]}
              series={[
                {
                  name: "Reported value",
                  data: [94, 94, 99.7, 14.2],
                  tone: "success",
                },
              ]}
              height={220}
              horizontal
            />
            <Text size="sm" color="tertiary">
              Source: Hong et al. (2012) · Tiresias · &gt;94% stated as lower
              bound · thesis adds readable GE phenotype for localisation
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Pang (12): forecast MAPE — context only, trim first" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Not a detection comparator. Include only to show hierarchy
              literature focuses on forecasting; thesis addresses
              structure-for-detection with explainable evolved phenotypes.
            </Text>
            <BarChart
              categories={["LightGBM", "XGBoost", "Lasso"]}
              series={[
                {
                  name: "Count MAPE (%)",
                  data: [3.51, 3.85, 4.49],
                  tone: "info",
                },
                {
                  name: "Amount MAPE (%)",
                  data: [4.95, 5.33, 6.05],
                  tone: "neutral",
                },
              ]}
              height={220}
            />
            <Text size="sm" color="tertiary">
              Source: Pang et al. (2022) · forecast objective · not comparable
              to thesis AUC on injected anomalies
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Literature review roles</H2>
          <Table
            headers={["Paper", "Use in thesis §3.3"]}
            rows={PAPERS.map((p) => [p.authors.split(" ")[0], p.citeAs])}
            striped
          />
        </Stack>

        <Stack gap={10}>
          <H2>Local PDF files</H2>
          <Table
            headers={["#", "Filename"]}
            rows={PAPERS.map((p) => [String(p.id), p.pdf])}
          />
          <Text size="sm" color="tertiary">
            Folder: Literature Review PDFs/03_Hierarchical_Time_Series/
          </Text>
        </Stack>
      </Grid>

      <Divider />

      <Callout tone="warning" title="Section close for thesis gap">
        Tiresias proves localisation; HYDRA proves multi-level beats
        single-level; Wolff proves adaptive search beats exhaustive leaf checks;
        Pang shows forecasting dominates hierarchy literature. None learns which
        partial Vodafone aggregations to monitor, scores them with Matrix
        Profile, or optimises via Grammatical Evolution against AUC — that
        integration is the thesis contribution.
      </Callout>

      <div
        style={{
          padding: "12px 14px",
          borderRadius: 8,
          border: `1px solid ${theme.stroke.tertiary}`,
          background: theme.bg.elevated,
        }}
      >
        <Text size="sm" color="tertiary">
          §03 Anomaly Detection in Hierarchical Time Series · Articles 9–12 ·
          Thesis: GE + MP + AUC on Vodafone grouped traffic
        </Text>
      </div>
    </Stack>
  );
}
