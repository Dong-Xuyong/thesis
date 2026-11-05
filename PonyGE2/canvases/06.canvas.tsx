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

const THESIS_PIPELINE = [
  { label: "Search", sub: "GE · greedy · GA · MOEA", thesis: "PonyGE2 + BNF grammar" },
  { label: "Structure", sub: "Subspace · features · aggregation", thesis: "Partial hierarchy rule" },
  { label: "Score", sub: "MAP · LOF · VAE · MP discord", thesis: "Matrix Profile (STUMPY)" },
  { label: "Fitness", sub: "MAP · AUC · DR / FAR / precision", thesis: "hierarchy_auc (injected anomalies)" },
];

const PAPERS = [
  {
    id: 21,
    year: 2021,
    authors: "He et al.",
    title: "Mining Anomalies in Subspaces (Financial)",
    data: "70 GB · 600M+ transactions · 415 MCCs",
    method: "Greedy & evolutionary subspace search + MAP anomaly retrieval",
    headline: "Greedy MAP 0.86 · evolutionary MAP 0.72",
    detail:
      "1345.50s greedy vs 87.62s evolutionary · production 22 min vs 1.5 min / month",
    include: "Yes",
    pdfStatus: "on-disk" as const,
    tone: "success" as const,
    thesisSearch: "Greedy / evolutionary subspace enumeration",
    thesisScorer: "MAP-based anomaly retrieval",
    thesisFitness: "MAP score (accuracy vs runtime trade-off)",
    thesisRole: "Lead §3.6 — anomalies visible only in selected subspaces",
    thesisWrite:
      "Strongest applied analogy to aggregation search; cite 15× speedup at production scale",
    thesisParallel: "415 MCC subspaces ≈ vast telecom aggregation space",
    doi: "https://doi.org/10.1007/978-3-030-86514-6_2",
    pdf: "He_2021_Mining_Anomalies_Subspaces.pdf",
  },
  {
    id: 22,
    year: 2020,
    authors: "Zhang & Xie",
    title: "Many-Objective EC for AD Feature Selection",
    data: "NSL-KDD network intrusion detection",
    method: "Many-objective evolutionary feature selection",
    headline: "Optimises features · FAR · DR · precision · accuracy",
    detail: "Exact numeric values not in accessible abstract · PDF not on disk",
    include: "Yes",
    pdfStatus: "missing" as const,
    tone: "info" as const,
    thesisSearch: "MOEA over feature subsets",
    thesisScorer: "Intrusion detector on selected features",
    thesisFitness: "Detection objectives, not forecast error",
    thesisRole: "Fitness = detection quality — same move as hierarchy_auc",
    thesisWrite:
      "Short paragraph on EC with AD objectives; state metrics not found in abstract",
    thesisParallel: "Multi-objective selection mirrors optimising AUC under search",
    doi: "https://doi.org/10.1002/cpe.5861",
    pdf: "Zhang_2020_Many_Objective_EC_AD_Feature_Selection.pdf",
  },
  {
    id: 23,
    year: 2021,
    authors: "Riahi-Madvar et al.",
    title: "MI Subspace Selection for Outliers",
    data: "High-dimensional tabular benchmarks",
    method: "Mutual-information subspace selection → LOF scoring",
    headline: "Better accuracy · lower complexity · faster",
    detail: "Exact numbers not in accessible abstract",
    include: "Optional",
    pdfStatus: "on-disk" as const,
    tone: "neutral" as const,
    thesisSearch: "MI ranks informative subspaces",
    thesisScorer: "LOF on selected view",
    thesisFitness: "Outlier detection accuracy (not reported numerically)",
    thesisRole: "Two-stage mirror: grammar selects view → MP scores it",
    thesisWrite: "2–3 sentences only; trim if redundant with He (#21)",
    thesisParallel: "Select-then-score pattern, not aggregation grammar",
    doi: "https://doi.org/10.1016/j.knosys.2020.106733",
    pdf: "Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf",
  },
  {
    id: 24,
    year: 2022,
    authors: "Li et al.",
    title: "VAE + GA for High-Dimensional Outliers",
    data: "Cardio · Credit Card · Satellite · MUSK · Arrhythmia",
    method: "VAE reconstruction + GA over interpretable subspaces",
    headline: "VAEGA AUC 0.863–0.970 · ~3% over VAE",
    detail: "Satellite 0.970 · Cardio & Credit Card 0.966 · MUSK 0.957",
    include: "Yes",
    pdfStatus: "on-disk" as const,
    tone: "success" as const,
    thesisSearch: "GA over interpretable subspace masks",
    thesisScorer: "VAE reconstruction error",
    thesisFitness: "AUC on benchmark outliers",
    thesisRole: "Strongest structural template: scorer + EC over structures",
    thesisWrite: "Pair with He — architecture identical; swap VAE→MP, GA→GE, tabular→telecom TS",
    thesisParallel: "VAEGA = anomaly scorer wrapped in evolutionary structure search",
    doi: "https://doi.org/10.3390/a15110429",
    pdf: "Li_2022_VAE_GA_Outlier_Detection.pdf",
  },
];

const CORE_PAPERS = PAPERS.filter((p) => p.include === "Yes");
const OPTIONAL_PAPERS = PAPERS.filter((p) => p.include === "Optional");

function PaperCard({ paper }: { paper: (typeof PAPERS)[number] }) {
  const theme = useHostTheme();
  const optional = paper.include === "Optional";
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        border: `1px solid ${optional ? theme.stroke.tertiary : theme.stroke.secondary}`,
        background: optional ? theme.bg.elevated : theme.fill.tertiary,
        height: "100%",
        opacity: optional ? 0.9 : 1,
      }}
    >
      <Row gap={8} wrap style={{ marginBottom: 8 }}>
        <Pill tone={paper.tone}>Article {paper.id}</Pill>
        <Pill tone="neutral">{paper.year}</Pill>
        <Pill tone={paper.include === "Yes" ? "success" : "warning"}>
          {paper.include}
        </Pill>
        <Pill tone={paper.pdfStatus === "on-disk" ? "neutral" : "warning"}>
          {paper.pdfStatus === "on-disk" ? "PDF on disk" : "PDF missing"}
        </Pill>
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
        <Text size="sm">
          <Text weight="semibold" as="span">
            Thesis search:{" "}
          </Text>
          {paper.thesisSearch}
        </Text>
        <Text size="sm">
          <Text weight="semibold" as="span">
            Thesis scorer:{" "}
          </Text>
          {paper.thesisScorer}
        </Text>
        <Text size="sm" color="tertiary">
          Thesis role: {paper.thesisRole}
        </Text>
        <Text size="sm" color="tertiary">
          Parallel: {paper.thesisParallel}
        </Text>
        <Link href={paper.doi}>DOI link</Link>
      </Stack>
    </div>
  );
}

function FlowBox({
  label,
  sublabel,
  accent,
}: {
  label: string;
  sublabel?: string;
  accent?: boolean;
}) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: 8,
        border: `1px solid ${accent ? theme.accent.primary : theme.stroke.secondary}`,
        background: accent ? theme.fill.secondary : theme.fill.tertiary,
        textAlign: "center",
        flex: 1,
        minWidth: 100,
      }}
    >
      <Text weight="semibold">{label}</Text>
      {sublabel ? (
        <Text size="sm" color="secondary">
          {sublabel}
        </Text>
      ) : null}
    </div>
  );
}

function TimelineNode({
  year,
  label,
  active,
  muted,
}: {
  year: number;
  label: string;
  active?: boolean;
  muted?: boolean;
}) {
  const theme = useHostTheme();
  return (
    <Stack gap={4} align="center" style={{ flex: 1, minWidth: 72 }}>
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: muted
            ? theme.fill.quaternary
            : active
              ? theme.accent.primary
              : theme.fill.secondary,
          border: `2px solid ${muted ? theme.stroke.tertiary : active ? theme.accent.primary : theme.stroke.secondary}`,
        }}
      />
      <Text weight="semibold" color={muted ? "tertiary" : undefined}>
        {year}
      </Text>
      <Text size="sm" color="secondary" style={{ textAlign: "center" }}>
        {label}
      </Text>
    </Stack>
  );
}

export default function CombinatorialOptimisationAnomalyDetectionSection() {
  const theme = useHostTheme();
  const onDisk = PAPERS.filter((p) => p.pdfStatus === "on-disk");

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>Combinatorial Optimisation in Anomaly Detection</H1>
        <Text color="secondary">
          Literature Review §06 — three core papers (+ one optional) on subspace
          search, detection-oriented EC fitness, and scorer + search pipelines
          mapped to this thesis (GE + Matrix Profile + AUC on Vodafone CDR)
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Articles 21–24 / 28</Pill>
          <Pill tone="success">3 include · Yes</Pill>
          <Pill tone="warning">1 optional · 3 / 4 PDFs</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="3" label="Core for thesis (Yes)" tone="success" />
        <Stat value="1" label="Optional (#23)" tone="warning" />
        <Stat value="0" label="Telecom + MP + GE + AUC" tone="danger" />
        <Stat value="2020–2022" label="Publication span" />
      </Grid>

      <Callout tone="info" title="Section thread → thesis">
        Anomalies in high-dimensional data often appear only in selected
        subspaces — the same argument as §02 grouped TS and §05 combinatorial
        selection, but with detection as the fitness target. He (2021) shows
        the speed–accuracy trade-off when search spaces are vast. Zhang (2020)
        optimises feature subsets against detection objectives, not prediction
        error — the conceptual move behind hierarchy_auc. Li (2022) is the
        closest architectural analogue: evolutionary search over interpretable
        structures wrapped around an anomaly scorer. None apply this to grouped
        telecom time series with grammar-valid hierarchies and Matrix Profile
        discord scoring.
      </Callout>

      <Stack gap={10}>
        <H2>Thesis pipeline — where each paper maps</H2>
        <Row gap={8} wrap align="stretch" justify="center">
          {THESIS_PIPELINE.map((step, i) => (
            <div
              key={step.label}
              style={{ display: "flex", flex: 1, alignItems: "stretch", minWidth: 120 }}
            >
              <FlowBox
                label={step.label}
                sublabel={step.thesis}
                accent={i === 0 || i === 2}
              />
              {i < THESIS_PIPELINE.length - 1 && (
                <Text color="tertiary" style={{ alignSelf: "center", padding: "0 4px" }}>
                  →
                </Text>
              )}
            </div>
          ))}
        </Row>
        <Text size="sm" color="tertiary">
          Section papers occupy stages 1–4 with different search/scorer pairs;
          thesis unifies GE search + MP score + injected-anomaly AUC fitness on
          Vodafone switch CDR hierarchies.
        </Text>
      </Stack>

      <Card>
        <CardHeader title="Per-article thesis mapping (include = Yes)" />
        <CardBody>
          <Table
            headers={[
              "Paper",
              "Search (thesis stage 1–2)",
              "Scorer (stage 3)",
              "Fitness (stage 4)",
              "Write in Ch. 3",
            ]}
            rows={CORE_PAPERS.map((p) => [
              `#${p.id} ${p.authors.split(" ")[0]}`,
              p.thesisSearch,
              p.thesisScorer,
              p.thesisFitness,
              p.thesisWrite,
            ])}
            striped
          />
        </CardBody>
      </Card>

      <Stack gap={10}>
        <H2>Core papers for thesis (Articles 21, 22, 24)</H2>
        <Grid columns={2} gap={14}>
          {CORE_PAPERS.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </Grid>
      </Stack>

      {OPTIONAL_PAPERS.length > 0 && (
        <Stack gap={10}>
          <H2>Optional — include only if space allows</H2>
          <Grid columns={1} gap={14}>
            {OPTIONAL_PAPERS.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </Grid>
        </Stack>
      )}

      <Stack gap={10}>
        <H2>Publication timeline (thesis-relevant)</H2>
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
              left: "8%",
              right: "8%",
              height: 2,
              background: theme.stroke.secondary,
            }}
          />
          <TimelineNode year={2020} label="Zhang · MOEA + AD fitness" active />
          <TimelineNode year={2021} label="He · subspace search" active />
          <TimelineNode year={2021} label="Riahi · MI (optional)" muted />
          <TimelineNode year={2022} label="Li · VAE+GA template" active />
        </div>
      </Stack>

      <Card>
        <CardHeader title="He (#21): MAP vs runtime — speed–accuracy trade-off for thesis search" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              When aggregation/subspace search is vast, evolutionary methods
              trade a little detection quality for large runtime savings — the
              same constraint facing GE over many hierarchy candidates.
            </Text>
            <BarChart
              categories={["Greedy", "Evolutionary"]}
              series={[
                { name: "MAP score", data: [0.86, 0.72], tone: "success" },
                {
                  name: "Runtime (s ÷100)",
                  data: [13.45, 0.88],
                  tone: "info",
                },
              ]}
              height={220}
            />
            <Text size="sm" color="tertiary">
              Source: He et al. (2021) · 415 MCCs · 16 trials · production:
              22 min vs 1.5 min / month · do not compare MAP to thesis AUC
              without qualification
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Li (#24): VAEGA AUC — scorer + EC structural parallel" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              VAEGA couples an anomaly scorer with evolutionary search over
              interpretable subspaces — structurally identical to MP + GE in
              this thesis; domain and representation differ.
            </Text>
            <BarChart
              categories={[
                "Satellite",
                "Cardio",
                "Credit Card",
                "MUSK",
                "Arrhythmia",
              ]}
              series={[
                {
                  name: "VAEGA AUC",
                  data: [0.97, 0.966, 0.966, 0.957, 0.863],
                  tone: "success",
                },
              ]}
              height={220}
            />
            <Text size="sm" color="tertiary">
              Source: Li et al. (2022) · ~3% average gain over VAE · benchmark
              tabular data, not injected telecom anomalies
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Zhang (#22): detection-oriented fitness (no accessible metrics)" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Include for the design point: evolutionary search optimises
              features against false alarm rate, detection rate, precision, and
              accuracy simultaneously — not downstream forecast MAE. Exact
              figures were not found in accessible abstract text; PDF not on
              disk.
            </Text>
            <Table
              headers={["Objective", "Thesis parallel"]}
              rows={[
                ["Feature subset size", "Compact hierarchy / fewer leaf series"],
                ["Detection rate", "Recall on injected anomaly windows"],
                ["False alarm rate", "FP rate under sparse normal data"],
                ["Precision / accuracy", "Cross-ref §2.5 metrics · AUC primary"],
              ]}
              striped
            />
            <Text size="sm" color="tertiary">
              Source: Zhang & Xie (2020) · NSL-KDD · cite objectives only; do
              not invent numeric results
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Local PDF files</H2>
          <Table
            headers={["#", "Filename", "Include?", "Status"]}
            rows={PAPERS.map((p) => [
              String(p.id),
              p.pdf,
              p.include,
              p.pdfStatus === "on-disk" ? "On disk" : "Missing",
            ])}
          />
          <Text size="sm" color="tertiary">
            Folder: Literature Review
            PDFs/06_Combinatorial_Optimisation_Anomaly_Detection/
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>What none of these papers do (research gap)</H2>
          <Table
            headers={["Capability", "He", "Zhang", "Li", "This thesis"]}
            rows={[
              ["Grouped telecom CDR", "—", "—", "—", "Yes"],
              ["Grammar-valid hierarchies", "—", "—", "—", "GE + BNF"],
              ["Matrix Profile discord score", "—", "—", "—", "STUMPY"],
              ["Subspace / structure search", "Yes", "Yes", "Yes", "GE"],
              ["Detection fitness", "MAP", "MOEA", "AUC", "hierarchy_auc"],
            ]}
            striped
          />
        </Stack>
      </Grid>

      <Divider />

      <Callout tone="warning" title="Writing notes">
        Lead on He (#21): anomalies in selected subspaces; cite greedy vs
        evolutionary MAP/runtime explicitly. Pair Li (#24) as structural
        template (scorer + EC). Zhang (#22): short paragraph on
        detection-oriented MOEA; PDF missing — objectives only, no invented
        metrics. Riahi-Madvar (#23): optional 2–3 sentences on
        select-then-score; trim if redundant. Do not compare thesis synthetic
        AUC to VAEGA/MAP without qualification. Close §3.6 → §3.7 GE as the
        search representation that completes the pipeline.
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
          Section: Combinatorial Optimisation in Anomaly Detection · Articles
          21–24 · {onDisk.length} PDFs on disk · 3 core + 1 optional · mapped to
          GE + MP + hierarchy_auc thesis pipeline
        </Text>
      </div>
    </Stack>
  );
}
