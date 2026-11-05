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

const PAPERS = [
  {
    id: 5,
    year: 2025,
    authors: "Mefleh et al.",
    title: "Beyond the Norm (Mahalanobis)",
    data: "Telecom KPIs · cells → sectors/sites",
    method: "Mahalanobis distance + SHAP contributors",
    headline: "AUC 0.77 → 0.99 via KPI representation",
    detail: "MD benchmark AUC 0.86 in 1.87s · One-Class SVM 4h34m15s",
    gap: "Hand-designed aggregation — thesis evolves it via GE grammar",
    doi: "https://doi.org/10.3390/computers14120561",
    pdf: "Mefleh_2025_Beyond_the_Norm_Mahalanobis.pdf",
    tone: "success" as const,
    role: "Lead §3.2 — representation dominates scorer",
    focus: "KPI representation",
    include: "Yes · core",
    canvas: "mefleh-2025-mahalanobis-telecom.canvas.tsx",
    thesisUse:
      "Strongest telecom proof that changing the view beats changing the scorer; frame gap before PonyGE2 + MP",
  },
  {
    id: 6,
    year: 2022,
    authors: "García González et al.",
    title: "MILETS DC-VAE",
    data: "Operational ISP multivariate KPIs (TELCO)",
    method: "DC-VAE + dilated convolutions",
    headline: "F1 52% (mean) · median 59%",
    detail: "S-VAE baseline F1 33% · merge with González 2024 journal",
    gap: "Fixed M=12 series — thesis searches which dimensions to aggregate",
    doi: "https://kdd-milets.github.io/milets2022/papers/MILETS_2022_paper_3436.pdf",
    pdf: "Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf",
    tone: "info" as const,
    role: "S-VAE comparator · cite 2024 for DC-VAE numbers",
    focus: "Deep MTS telecom",
    include: "Yes",
    canvas: "garcia-gonzalez-2022-dc-vae-milets.canvas.tsx",
    thesisUse:
      "Same sparse-label wall as §3.1; motivates effort on which series to score, not only how",
  },
  {
    id: 7,
    year: 2022,
    authors: "Hua et al.",
    title: "GenAD",
    data: "China Mobile wireless base station KPIs",
    method: "General unsupervised multivariate AD",
    headline: "F1 0.953 · recall 1.000",
    detail: "Area F1 0.962–0.965 · total F1 up to +9%",
    gap: "Dense-label WBS regime — contrast with thesis synthetic μ±3σ injection",
    doi: "https://doi.org/10.1049/ell2.12683",
    pdf: "Hua_2022_GenAD.pdf",
    tone: "info" as const,
    role: "Grouped entities share structure across stations",
    focus: "Cross-entity generalisation",
    include: "Yes",
    canvas: "hua-2022-genad.canvas.tsx",
    thesisUse:
      "Population-of-stations argument; do not let high F1 contradict sparse-label narrative from §3.1",
  },
  {
    id: 8,
    year: 2022,
    authors: "Oğuz & Kalaycıoğlu",
    title: "Multi-Tiered Cellular Networks",
    data: "Femtocell outage states · multi-tier SON",
    method: "1D CNN and LSTM classification",
    headline: "1D CNN 80.1% · LSTM 79.08%",
    detail: "Best TPR >95% · four FAP states · 2 dB / 30 m ROI",
    gap: "Tier fixed by simulation — not CDR hierarchy search",
    doi: "https://doi.org/10.1186/s13638-022-02183-7",
    pdf: "Oguz_2022_Multi_Tiered_Cellular_Networks.pdf",
    tone: "neutral" as const,
    role: "Tier/group context affects quality · trim first",
    focus: "Multi-tier cellular",
    include: "Yes · brief",
    canvas: "oguz-2022-multi-tier.canvas.tsx",
    thesisUse:
      "One paragraph: detection quality tracks tier/regime; not a direct method comparator",
  },
];

function PaperCard({ paper }: { paper: (typeof PAPERS)[number] }) {
  const theme = useHostTheme();
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
        <Pill tone="neutral">{paper.year}</Pill>
        <Pill tone="neutral">{paper.focus}</Pill>
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
            Data:{" "}
          </Text>
          {paper.data}
        </Text>
        <Text size="sm">
          <Text weight="semibold" as="span">
            Method:{" "}
          </Text>
          {paper.method}
        </Text>
        <Text size="sm" color="tertiary">
          Thesis gap: {paper.gap}
        </Text>
        <Text size="sm" color="secondary">
          {paper.thesisUse}
        </Text>
        <Link href={paper.doi}>DOI / PDF link</Link>
        <Text size="sm" color="tertiary">
          Detail canvas: {paper.canvas}
        </Text>
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

function LiteraturePipeline() {
  const theme = useHostTheme();
  const steps = [
    { label: "Raw records", sub: "Cells · KPIs · CDR · WBS" },
    { label: "Group / aggregate", sub: "Fixed in all §02 papers" },
    { label: "Score anomalies", sub: "MD · VAE · CNN · LSTM" },
    { label: "Interpret", sub: "SHAP · state labels · area F1" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        padding: "14px 8px",
        borderRadius: 8,
        border: `1px solid ${theme.stroke.tertiary}`,
        background: theme.bg.elevated,
      }}
    >
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
          <Stack gap={4} align="center" style={{ flex: 1, padding: "8px 10px", textAlign: "center" }}>
            <Text weight="semibold">{step.label}</Text>
            <Text size="sm" color="secondary">{step.sub}</Text>
          </Stack>
          {i < steps.length - 1 && (
            <Text color="tertiary" style={{ alignSelf: "center", padding: "0 4px" }}>→</Text>
          )}
        </div>
      ))}
    </div>
  );
}

function ThesisPipeline() {
  const theme = useHostTheme();
  const steps = [
    { label: "Vodafone CDR", sub: "#Events · Event Duration · 5 categorical dims" },
    { label: "GE grammar", sub: "mobai_nop.pybnf · partial hierarchy" },
    { label: "Matrix Profile", sub: "Discord score per candidate series" },
    { label: "hierarchy_auc", sub: "Synthetic μ±3σ · ROC-AUC fitness" },
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
        background: theme.fill.tertiary,
      }}
    >
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
          <Stack gap={4} align="center" style={{ flex: 1, padding: "8px 10px", textAlign: "center" }}>
            <Text weight="semibold">{step.label}</Text>
            <Text size="sm" color="secondary">{step.sub}</Text>
          </Stack>
          {i < steps.length - 1 && (
            <Text color="tertiary" style={{ alignSelf: "center", padding: "0 4px" }}>→</Text>
          )}
        </div>
      ))}
    </div>
  );
}

export default function GroupedTimeSeriesSection() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>Anomaly Detection in Grouped Time Series</H1>
        <Text color="secondary">
          Literature Review §02 · Ch. 3 §3.2 · four PDFs anchoring the thesis
          argument that grouping choice dominates detector choice
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Articles 5–8 / 28</Pill>
          <Pill tone="neutral">Thesis: GE + MP + hierarchy_auc</Pill>
          <Pill tone="success">4 / 4 PDFs on disk</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="4" label="Papers in section" tone="info" />
        <Stat value="2022–2025" label="Publication span" />
        <Stat value="1" label="Core cite (Mefleh)" tone="success" />
        <Stat value="0" label="Search aggregation via GE" tone="danger" />
      </Grid>

      <Callout tone="info" title="Section thread → thesis gap">
        If aggregation determines visibility, representation is a tunable part of
        the detector. Mefleh (2025) moves AUC 0.77 → 0.99 by re-expressing the same
        KPIs — not by switching scorers. García González, Hua, and Oğuz all fix
        their grouping before scoring. Your thesis replaces that fixed step with
        PonyGE2 search over partial hierarchies on Vodafone switch data, scored by
        Matrix Profile discord and evaluated with hierarchy_auc against synthetic
        anomalies and phono_agg baselines.
      </Callout>

      <Stack gap={10}>
        <H2>Literature pipeline (fixed grouping)</H2>
        <LiteraturePipeline />
      </Stack>

      <Stack gap={10}>
        <H2>Your thesis pipeline (searched grouping)</H2>
        <ThesisPipeline />
        <Text size="sm" color="tertiary">
          Partner Description excluded from grammar (entropy ≈7.6 bits, 1,555
          values). Baselines in Ch. 5: phono_agg and full disaggregation.
        </Text>
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
              left: "12%",
              right: "12%",
              height: 2,
              background: theme.stroke.secondary,
            }}
          />
          <TimelineNode year={2022} label="García · DC-VAE" active />
          <TimelineNode year={2022} label="Hua · GenAD" active />
          <TimelineNode year={2022} label="Oğuz · multi-tier" active />
          <TimelineNode year={2025} label="Mefleh · Mahalanobis" active />
        </div>
      </Stack>

      <Grid columns={2} gap={14}>
        {PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </Grid>

      <Card>
        <CardHeader title="Mefleh (2025): AUC vs KPI representation" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Lead §3.2 with this ladder — same data, same MD scorer, different
              representation. Thesis analogue: evolve which aggregation path to
              monitor, not only how to preprocess KPIs.
            </Text>
            <BarChart
              categories={["Raw KPI", "+ denominators", "Adjusted + denom.", "Learned + denom."]}
              series={[{ name: "AUC", data: [0.77, 0.86, 0.93, 0.99], tone: "success" }]}
              height={220}
            />
            <Text size="sm" color="tertiary">
              Source: Mefleh et al. (2025) · unsupervised telecom KPI benchmark
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Deep-learning comparators (not head-to-head with thesis AUC)" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Different data, labels, and metrics — use for grouped-entity argument
              only. Do not rank against hierarchy_auc on Vodafone injection.
            </Text>
            <BarChart
              categories={["García DC-VAE F1", "García S-VAE F1", "Hua GenAD F1", "Oğuz 1D CNN acc."]}
              series={[{ name: "Reported score", data: [52, 33, 95.3, 80.1], tone: "info" }]}
              height={220}
              horizontal
            />
            <Text size="sm" color="tertiary">
              Source: section PDFs · García mean F1_r · Hua F1 as % · Oğuz at 2 dB / 30 m ROI
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Thesis fit by paper" />
        <CardBody>
          <Table
            headers={["#", "Paper", "Include", "Literature role", "What thesis adds"]}
            rows={PAPERS.map((p) => [
              String(p.id),
              `${p.authors.split(" ")[0]} (${p.year})`,
              p.include,
              p.role,
              p.gap,
            ])}
            striped
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Literature vs thesis — grouping and scoring" />
        <CardBody>
          <Table
            headers={["Aspect", "§02 literature (typical)", "This thesis"]}
            rows={[
              ["Data", "ISP KPIs · WBS · femtocell simulation", "Vodafone switch CDR · Jul–Oct 2022 · #Events + Duration"],
              ["Grouping", "Hand-designed cell→site, fixed M=12, tier labels", "GE-evolved partial hierarchy (mobai_nop grammar)"],
              ["Scorer", "MD · DC-VAE · CNN/LSTM", "Matrix Profile discord (STUMPY)"],
              ["Labels", "SME/NOC labels or dense WBS faults", "Synthetic μ±3σ injection · hierarchy_auc fitness"],
              ["Baselines", "Algorithm comparisons within paper", "phono_agg · full disaggregation · evolved hierarchy"],
              ["Interpretability", "SHAP on KPIs · FAP state names", "Grammar-valid tree · readable aggregation path"],
            ]}
            striped
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Local PDF files</H2>
          <Table
            headers={["#", "Filename", "Canvas"]}
            rows={PAPERS.map((p) => [String(p.id), p.pdf, p.canvas.replace(".canvas.tsx", "")])}
          />
          <Text size="sm" color="tertiary">
            Folder: Literature Review PDFs/02_Grouped_Time_Series/
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>§3.2 writing order</H2>
          <Table
            headers={["Order", "Paper", "Paragraph focus"]}
            rows={[
              ["1", "Mefleh", "AUC ladder · MD 1.87s vs OCSVM 4h34m · open grouping question"],
              ["2", "García 2022 + 2024", "Architecture helps but F1 ~52% on sparse TELCO labels"],
              ["3", "Hua", "Many related entities · different label regime"],
              ["4", "Oğuz", "Tier context · trim if tight · bridge to §3.3 hierarchy"],
            ]}
            striped
          />
        </Stack>
      </Grid>

      <Divider />

      <Card>
        <CardHeader title="Thesis component coverage by paper" />
        <CardBody>
          <Table
            headers={[
              "Paper",
              "Relevance",
              "Rep. dominates",
              "Search view",
              "MP",
              "GE",
              "Mobai AUC",
            ]}
            rows={[
              ["Mefleh (5)", "Core", "Yes", "No", "No", "No", "No"],
              ["García (6)", "Supporting", "Partial", "No", "No", "No", "No"],
              ["Hua (7)", "Supporting", "Partial", "No", "No", "No", "No"],
              ["Oğuz (8)", "Supporting", "Partial", "No", "No", "No", "No"],
              ["This thesis", "—", "Yes", "Yes", "Yes", "Yes", "Yes"],
            ]}
            striped
          />
        </CardBody>
      </Card>

      <Callout tone="warning" title="§3.2 writing note">
        Open §3.2 with Mefleh — representation dominates scorer. Transition: “the
        open question is how to organise those groups”, leading to §3.3 hierarchy.
        Do not compare MD AUC or DC-VAE F1_r directly to hierarchy_auc without
        noting different data and label regimes. Merge García 2022 with González
        2024. Cite each paper’s detail canvas for drafting.
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
          Section §02 · Articles 5–8 · Thesis Ch. 3 §3.2 + Ch. 4 methodology ·
          PDF layout: scripts/literature_pdf_layout.py
        </Text>
      </div>
    </Stack>
  );
}
