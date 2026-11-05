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
  data: "Vodafone/Mobai switch · ~4.2M hourly records (Jul–Oct 2022)",
  metrics: "#Events · Event Duration",
  dims:
    "Call Type · Event Type · Subscriber Type · Traffic Type · Service Type",
  search: "PonyGE2 + mobai_nop.pybnf → partial hierarchical filters",
  score: "Matrix Profile discord (STUMPY, m=168)",
  fitness: "hierarchy_auc — weighted mean ROC-AUC on injected anomalies",
  gap: "No reviewed work jointly searches aggregation structure, scores with MP, and optimises AUC on grouped telecom traffic",
};

const PAPERS = [
  {
    id: 1,
    year: 2024,
    authors: "González et al.",
    title: "One Model to Find Them All",
    data: "ISP KPI counters (12 fixed series)",
    method: "DC-VAE multivariate deep learning",
    headline: "Mean F1 52% · median 59%",
    detail: "732k samples · 1.2% NOC labels · 5-min · TELCO dataset public",
    relevance: "Core" as const,
    thesisComponent: "Telecom opener · sparse labels · fixed KPI view",
    thesisRole:
      "Establishes real mobile ISP detection is hard with expert labels at 1.2% — modest F1 on a pre-chosen 12-series view.",
    thesisContrast:
      "Optimises how to score 12 fixed KPIs. Thesis searches which Vodafone categorical aggregations to construct.",
    thesisTake: "Labels are scarce; fixed views underperform even with deep learning.",
    thesisAdd: "GE + MP + hierarchy_auc over six Mobai dimensions with synthetic injection.",
    citeAs: "Core §3.1 opener · merge #6 for S-VAE only · no range-F1 vs AUC",
    doi: "https://doi.org/10.1109/TNSM.2023.3340146",
    pdf: "Gonzalez_2024_One_Model_to_Find_Them_All.pdf",
    tone: "info" as const,
  },
  {
    id: 2,
    year: 2018,
    authors: "Sultan et al.",
    title: "CDR-Driven Anomaly Detection",
    data: "Call detail records (CRAWDAD, Nodobo, Telecom Italia)",
    method: "CDR anomaly removal + traffic prediction",
    headline: "No detection metrics reported",
    detail: "13k voice + 83k message records (Nodobo); closest data type to thesis CDR",
    relevance: "Supporting" as const,
    thesisComponent: "Data-type anchor · CDR / mobile activity",
    thesisRole:
      "Closest literature data type to Vodafone switch records — mobile activity as unit of analysis.",
    thesisContrast:
      "CDR streams for traffic prediction and QoS. Thesis uses hourly #Events with grammar-evolved groupings.",
    thesisTake: "Telecom anomaly work often starts from activity records, not engineered KPI vectors alone.",
    thesisAdd: "Partial hierarchy search + label-free MP scoring where Sultan reports no detection metrics.",
    citeAs: "One short paragraph · state metrics not reported · not hierarchy search",
    doi: "https://doi.org/10.1109/ACCESS.2018.2859756",
    pdf: "Sultan_2018_CDR_Anomaly_Detection.pdf",
    tone: "neutral" as const,
  },
  {
    id: 3,
    year: 2020,
    authors: "Burgueño et al.",
    title: "Online Anomaly Detection System",
    data: "LTE-A cell KPIs (240 hourly variables)",
    method: "Online threshold monitoring + tracking",
    headline: "~80% network anomalies captured",
    detail: "24,725 cells · 15 labelled KPIs of 240 · 3.8% anomalous samples",
    relevance: "Core" as const,
    thesisComponent: "Operational scale · KPI-selection bottleneck",
    thesisRole:
      "Proves manual KPI coverage is impractical at LTE scale — only 15 of 240 hourly KPIs labelled.",
    thesisContrast:
      "Operators pick which KPIs to monitor. Thesis automates which aggregation paths to score via GE.",
    thesisTake: "Scale + label sparsity (3.8%) make exhaustive manual view selection infeasible.",
    thesisAdd: "Evolved partial hierarchies over Mobai dims scored by MP discord, ranked by hierarchy_auc.",
    citeAs: "Core §3.1 benchmark · motivate automated view selection · not method comparator",
    doi: "https://doi.org/10.3390/s20247232",
    pdf: "Burgueno_2020_Online_Anomaly_Detection_Mobile_Networks.pdf",
    tone: "success" as const,
  },
  {
    id: 4,
    year: 2024,
    authors: "Lemaire et al.",
    title: "Early Detection of Critical Urban Events",
    data: "Network signalling (NSD) · 1-min cell counts",
    method: "Forecast deviation · multivariate per-antenna",
    headline: "Best precision 28.63%",
    detail: "Paris Orange · 27M subs · 86 ground-truth events · Notre-Dame +5 min",
    relevance: "Supporting" as const,
    thesisComponent: "Aggregation visibility · bridge to §02",
    thesisRole:
      "Abnormal real-world events appear only after the right spatio-temporal aggregation — even then precision stays low.",
    thesisContrast:
      "Fixed 1-min × per-cell NSD counts. Thesis searches which grouped Vodafone series expose injected anomalies.",
    thesisTake: "Aggregation choice matters as much as detector sophistication.",
    thesisAdd: "Grammar-valid partial hierarchies + MP + AUC — not urban-event forecasting.",
    citeAs: "Aggregation visibility only · not fault-detection benchmark · bridge to grouped TS",
    doi: "https://doi.org/10.1371/journal.pone.0309093",
    pdf: "Lemaire_2024_Early_Detection_Critical_Urban_Events.pdf",
    tone: "warning" as const,
  },
];

function PaperCard({ paper }: { paper: (typeof PAPERS)[number] }) {
  const theme = useHostTheme();
  const relevanceTone =
    paper.relevance === "Core" ? "success" : ("info" as const);
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        border: `1px solid ${paper.relevance === "Core" ? theme.accent.primary : theme.stroke.secondary}`,
        background: theme.fill.tertiary,
        height: "100%",
      }}
    >
      <Row gap={8} wrap style={{ marginBottom: 8 }}>
        <Pill tone={paper.tone}>Article {paper.id}</Pill>
        <Pill tone={relevanceTone}>{paper.relevance} to thesis</Pill>
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

function ThesisPipeline() {
  const theme = useHostTheme();
  const steps = [
    { label: "Mobai CDR data", sub: THESIS.data },
    { label: "GE search", sub: THESIS.search },
    { label: "Matrix Profile", sub: THESIS.score },
    { label: "hierarchy_auc", sub: THESIS.fitness },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        padding: "14px 8px",
        borderRadius: 8,
        border: `2px solid ${theme.accent.primary}`,
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

export default function TelecomAnomalyDetectionSection() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>§01 Telecom Anomaly Detection — Thesis Relevance</H1>
        <Text color="secondary">
          How Articles 1–4 establish the telecom problem — sparse labels, fixed
          views, aggregation visibility — and why the thesis searches partial
          Mobai hierarchies with GE + Matrix Profile + hierarchy_auc
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Articles 1–4 / 28</Pill>
          <Pill tone="success">2 core · 2 supporting</Pill>
          <Pill tone="neutral">{THESIS.dims}</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="2" label="Core thesis papers" tone="success" />
        <Stat value="3" label="With detection metrics" tone="warning" />
        <Stat value="0" label="Search aggregation / view" tone="danger" />
        <Stat value="6" label="Thesis categorical dims" tone="info" />
      </Grid>

      <Callout tone="info" title="Thesis framework (what §01 papers lack)">
        {THESIS.gap}. These four papers fix the representation before scoring.
        González and Burgueño show modest detection on pre-chosen KPI views;
        Sultan anchors CDR-like data; Lemaire shows aggregation visibility at
        cell level. None evolve partial hierarchies over {THESIS.dims}, score
        with {THESIS.score}, or optimise {THESIS.fitness}.
      </Callout>

      <Stack gap={10}>
        <H2>Your thesis pipeline (missing from all four papers)</H2>
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
          <TimelineNode year={2018} label="Sultan · CDR" />
          <TimelineNode year={2020} label="Burgueño · LTE KPIs" active />
          <TimelineNode year={2024} label="González · DC-VAE" active />
          <TimelineNode year={2024} label="Lemaire · Urban NSD" active />
        </div>
      </Stack>

      <Grid columns={2} gap={14}>
        {PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </Grid>

      <Card>
        <CardHeader title="Reported detection performance (where published)" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Metrics are not directly comparable across papers (different data,
              labels, and score definitions). Use for scale of difficulty, not
              head-to-head ranking.
            </Text>
            <BarChart
              categories={[
                "González F1 (mean)",
                "González F1 (median)",
                "Lemaire precision",
                "Burgueño coverage",
              ]}
              series={[
                {
                  name: "Reported %",
                  data: [52, 59, 28.63, 80],
                  tone: "info",
                },
              ]}
              height={220}
              horizontal
            />
            <Text size="sm" color="tertiary">
              Source: section PDFs · González range-F1r · Lemaire best precision
              · Burgueño ~80% of network anomalies captured · Sultan: no metrics
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Data representation spectrum" />
        <CardBody>
          <Table
            headers={["Paper", "Granularity", "Volume", "Labels", "View fixed?"]}
            rows={[
              [
                "González (2024)",
                "5-min · 12 ISP KPIs",
                "~732k samples",
                "1.2% NOC",
                "Yes — 12 series",
              ],
              [
                "Sultan (2018)",
                "CDR records",
                "13k voice + 83k SMS",
                "Not reported",
                "Yes — CDR streams",
              ],
              [
                "Burgueño (2020)",
                "15-min · cell KPIs",
                "24,725 cells",
                "15 / 240 KPIs",
                "Yes — manual KPI pick",
              ],
              [
                "Lemaire (2024)",
                "1-min · per cell",
                "~12 TB/day",
                "86 events",
                "Yes — cell antenna",
              ],
            ]}
            striped
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Local PDF files</H2>
          <Table
            headers={["#", "Filename"]}
            rows={PAPERS.map((p) => [String(p.id), p.pdf])}
          />
          <Text size="sm" color="tertiary">
            Folder: Literature Review PDFs/01_Telecom_Anomaly_Detection/
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Literature review roles</H2>
          <Table
            headers={["Paper", "Relevance", "Use in thesis §3.1"]}
            rows={PAPERS.map((p) => [
              p.authors.split(" ")[0],
              p.relevance,
              p.citeAs,
            ])}
            striped
          />
        </Stack>
      </Grid>

      <Card>
        <CardHeader title="Thesis component coverage by paper" />
        <CardBody>
          <Table
            headers={[
              "Paper",
              "Telecom data",
              "Fixed view",
              "Search view",
              "MP scorer",
              "GE",
              "AUC fitness",
            ]}
            rows={[
              ["González (1)", "Yes", "12 KPIs", "No", "No", "No", "No"],
              ["Sultan (2)", "CDR", "Yes", "No", "No", "No", "No"],
              ["Burgueño (3)", "Yes", "15/240 KPIs", "No", "No", "No", "No"],
              ["Lemaire (4)", "NSD", "Cell-level", "No", "No", "No", "No"],
              ["This thesis", "Mobai", "No", "Yes", "Yes", "Yes", "Yes"],
            ]}
            striped
          />
        </CardBody>
      </Card>

      <Divider />

      <Callout tone="warning" title="§3.1 writing note">
        Do not compare González range-F1r to synthetic AUC experiments. Merge
        Article 1 with grouped-time-series S-VAE discussion only where needed.
        Lemaire supports aggregation choice, not fault-detection benchmarking.
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
          Section: Anomaly Detection in Telecommunications Networks · Articles
          1–4 · PDF layout: scripts/literature_pdf_layout.py
        </Text>
      </div>
    </Stack>
  );
}
