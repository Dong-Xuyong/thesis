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
  title: "Grouped telecom anomaly detection via GE + Matrix Profile",
  data: "Vodafone mobile network · ~1M hourly records · 6 categorical dims",
  dims:
    "Call Type · Event Type · Subscriber Type · Traffic Type · Service Type · Partner Description",
  searchSpace: "~94,080 non-empty combinations · 1,555 active after filtering",
  search: "PonyGE2 + mobai_nop.pybnf grammar (GE)",
  scorer: "Matrix Profile discord (label-free)",
  fitness: "hierarchy_auc — maximise AUC on injected anomalies",
  injection: "5% timestamps · μ±3σ synthetic anomalies",
  gap: "No reviewed work jointly searches aggregation structure, scores with MP, and optimises AUC",
};

const PAPERS = [
  {
    id: 17,
    year: 2016,
    authors: "Xue et al.",
    title: "Survey on EC for Feature Selection",
    data: "ML / data-mining feature sets (survey)",
    method: "Evolutionary computation for subset selection",
    headline: "Foundational survey — no headline metric",
    detail:
      "Wraps, filters, hybrids · single- & multi-objective · wrapper vs filter",
    thesisRelevance: "Core" as const,
    thesisComponent: "Problem framing (§3.5 opener)",
    thesisLink:
      "Subset selection from a combinatorial space is mature and well-studied — the thesis applies the same framing but selects aggregation structures (monitoring views) that change the signal, not fixed ML feature vectors.",
    thesisUse:
      "One paragraph in §3.5: justify CO search before introducing applied TS evidence.",
    doi: "https://doi.org/10.1109/TEVC.2015.2504420",
    pdf: "Xue_2016_EC_Feature_Selection_Survey.pdf",
    tone: "neutral" as const,
    focus: "Survey / framing",
  },
  {
    id: 18,
    year: 2024,
    authors: "Linares-Barrera et al.",
    title: "Evolutionary FS for Forecasting",
    data: "Electricity load · traffic multivariate TS",
    method: "GA / SEISEN wrapper feature selection",
    headline: "~50% fewer features · equal or better MAE",
    detail:
      "Electricity 7704→3813 · MAE 207.19→194.40 · Traffic 20688→10316 · MAE 0.008→0.007",
    thesisRelevance: "Core" as const,
    thesisComponent: "Search efficiency evidence",
    thesisLink:
      "Evolutionary search can halve candidate inputs without losing signal — direct analogy to pruning uninformative aggregation paths among 94k+ Vodafone combinations instead of monitoring every leaf.",
    thesisUse:
      "Lead applied paragraph in §3.5; contrast forecast MAE fitness with thesis hierarchy_auc.",
    doi: "https://doi.org/10.1145/3605098.3636191",
    pdf: "Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf",
    tone: "success" as const,
    focus: "Time-series FS",
  },
  {
    id: 19,
    year: 2016,
    authors: "Yeh et al.",
    title: "Matrix Profile I",
    data: "Refinery sensors · shapelet benchmarks",
    method: "All-pairs similarity join (STAMP family)",
    headline: "153.8 days → 6.3 hours (refinery self-join)",
    detail: "Shapelet: 4.2 min brute force → 1.0 + 2.7 s (68× speedup)",
    thesisRelevance: "Core" as const,
    thesisComponent: "Candidate evaluation primitive",
    thesisLink:
      "Fast MP scoring lets the GE loop judge every evolved hierarchy in hierarchy_auc — search and scorer run at compatible speed across thousands of generations.",
    thesisUse:
      "One paragraph linking selection to MP evidence; defer full MP theory to §3.4 (Articles 13–16).",
    doi: "https://doi.org/10.1109/ICDM.2016.0179",
    pdf: "Yeh_2016_Matrix_Profile_I.pdf",
    tone: "info" as const,
    focus: "Candidate scoring",
  },
  {
    id: 20,
    year: 2024,
    authors: "Contreras et al.",
    title: "GA for Financial TS Monotonicity",
    data: "Bitcoin · Ibovespa · Vale daily series",
    method: "GA wrapper + direction prediction",
    headline: "Best AUROC 0.58–0.62 across assets",
    detail: "Example: 0.62 AUROC / 59.86% acc · 0.61 AUROC / 61.44% acc",
    thesisRelevance: "Supporting" as const,
    thesisComponent: "AUC-driven fitness design",
    thesisLink:
      "GA optimised against AUROC mirrors hierarchy_auc — evolutionary search steered by the same detection metric the thesis ultimately reports, even though the domain (financial direction) differs from grouped telecom AD.",
    thesisUse:
      "Closing §3.5 paragraph on AUC fitness; trim first if word count is tight.",
    doi: "https://doi.org/10.3390/e26030177",
    pdf: "Contreras_2024_GA_Financial_Feature_Selection.pdf",
    tone: "neutral" as const,
    focus: "Financial GA",
  },
];

function PaperCard({ paper }: { paper: (typeof PAPERS)[number] }) {
  const theme = useHostTheme();
  const relevanceTone =
    paper.thesisRelevance === "Core" ? "success" : ("info" as const);
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        border: `1px solid ${paper.thesisRelevance === "Core" ? theme.accent.primary : theme.stroke.secondary}`,
        background: theme.fill.tertiary,
        height: "100%",
      }}
    >
      <Row gap={8} wrap style={{ marginBottom: 8 }}>
        <Pill tone={paper.tone}>Article {paper.id}</Pill>
        <Pill tone={relevanceTone}>{paper.thesisRelevance} to thesis</Pill>
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
        <Text size="sm" color="secondary">
          {paper.thesisLink}
        </Text>
        <Text size="sm" color="tertiary">
          §3.5 use: {paper.thesisUse}
        </Text>
        <Link href={paper.doi}>DOI / PDF link</Link>
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

function ThesisPipeline() {
  const theme = useHostTheme();
  const steps = [
    {
      label: "Vodafone CDR data",
      sub: "6 dims · #Events hourly",
      paper: null,
    },
    {
      label: "GE search",
      sub: "PonyGE2 · mobai_nop grammar",
      paper: "Xue · Linares-Barrera",
    },
    {
      label: "Partial hierarchy",
      sub: "pheno_to_dict → aggregate",
      paper: "Linares-Barrera analogy",
    },
    {
      label: "MP discord score",
      sub: "Label-free per candidate",
      paper: "Yeh",
    },
    {
      label: "hierarchy_auc",
      sub: "Maximise AUC fitness",
      paper: "Contreras parallel",
    },
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
            style={{ flex: 1, padding: "8px 6px", textAlign: "center" }}
          >
            <Text weight="semibold">{step.label}</Text>
            <Text size="sm" color="secondary">
              {step.sub}
            </Text>
            {step.paper && (
              <Text size="sm" color="tertiary">
                Lit: {step.paper}
              </Text>
            )}
          </Stack>
          {i < steps.length - 1 && (
            <Text
              color="tertiary"
              style={{ alignSelf: "center", padding: "0 2px" }}
            >
              →
            </Text>
          )}
        </div>
      ))}
    </div>
  );
}

function ThesisSearchSpace() {
  const theme = useHostTheme();
  const dims = [
    { name: "Call Type", entropy: "1.0 bits", note: "Balanced VOICE/SMS" },
    { name: "Event Type", entropy: "1.0 bits", note: "Balanced ORIG/other" },
    { name: "Subscriber Type", entropy: "0.29 bits", note: "95.6% Roamer In" },
    { name: "Traffic Type", entropy: "0.29 bits", note: "95.6% INT" },
    { name: "Service Type", entropy: "0.05 bits", note: "Near-zero · low value" },
    {
      name: "Partner Description",
      entropy: "7.6 bits",
      note: "Excluded in mobai_nop grammar",
    },
  ];
  return (
    <Stack gap={10}>
      <div
        style={{
          padding: "14px 16px",
          borderRadius: 8,
          border: `1px solid ${theme.stroke.secondary}`,
          background: theme.bg.elevated,
          textAlign: "center",
        }}
      >
        <Text weight="semibold">Thesis search space</Text>
        <Text size="sm" color="secondary">
          {THESIS.searchSpace}
        </Text>
        <Text size="sm" color="tertiary" style={{ marginTop: 6 }}>
          Exhaustive enumeration is infeasible — evolutionary search required
        </Text>
      </div>
      <Grid columns={3} gap={8}>
        {dims.map((d) => (
          <div
            key={d.name}
            style={{
              padding: "10px 12px",
              borderRadius: 6,
              border: `1px solid ${theme.stroke.tertiary}`,
              background: theme.fill.tertiary,
            }}
          >
            <Text weight="semibold" size="sm">
              {d.name}
            </Text>
            <Text size="sm" color="secondary">
              {d.entropy}
            </Text>
            <Text size="sm" color="tertiary">
              {d.note}
            </Text>
          </div>
        ))}
      </Grid>
      <Text color="tertiary" style={{ textAlign: "center" }}>
        ↓ GE evolves which dims to aggregate and how ↓
      </Text>
      <div
        style={{
          width: "55%",
          margin: "0 auto",
          padding: "12px 14px",
          borderRadius: 8,
          border: `2px solid ${theme.accent.primary}`,
          background: theme.fill.tertiary,
          textAlign: "center",
        }}
      >
        <Text weight="semibold">Evolved partial hierarchy</Text>
        <Text size="sm" color="secondary">
          Interpretable aggregation rule · scored by MP · ranked by AUC
        </Text>
      </div>
    </Stack>
  );
}

export default function CombinatorialOptimisationTimeSeriesSection() {
  const theme = useHostTheme();
  const coreCount = PAPERS.filter((p) => p.thesisRelevance === "Core").length;

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>§05 Combinatorial Optimisation — Thesis Relevance</H1>
        <Text color="secondary">
          How Articles 17–20 support the thesis pipeline: GE search over partial
          hierarchies, Matrix Profile scoring, and AUC fitness on grouped
          Vodafone telecom data
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Articles 17–20 / 28</Pill>
          <Pill tone="success">{coreCount} core · 1 supporting</Pill>
          <Pill tone="neutral">Ch. 3 §3.5</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="3" label="Core thesis papers" tone="success" />
        <Stat value="1" label="Supporting (AUC fitness)" tone="info" />
        <Stat value="~50%" label="Input pruning (Linares)" tone="success" />
        <Stat value="68×" label="MP speedup (Yeh)" tone="info" />
      </Grid>

      <Callout tone="info" title="Thesis integration (Research Gap)">
        {THESIS.gap}. These four papers supply three of the four ingredients:
        combinatorial search framing (Xue), proof that evolutionary pruning
        works on time series (Linares-Barrera), and a fast label-free scorer
        for each candidate (Yeh). Contreras confirms AUC can drive the search
        loop. What none of them do — and what this thesis adds — is evolve
        interpretable aggregation hierarchies over grouped telecom dimensions
        with PonyGE2, score them with Matrix Profile, and optimise hierarchy_auc.
      </Callout>

      <Card>
        <CardHeader title="Your thesis pipeline (Ch. 4)" />
        <CardBody>
          <Stack gap={12}>
            <ThesisPipeline />
            <Table
              headers={["Stage", "Implementation", "Lit. support"]}
              rows={[
                ["Data", THESIS.data, "Sultan · Burgueño · Mefleh (§01–02)"],
                ["Dimensions", THESIS.dims, "Ch. 4 cardinality table"],
                ["Search", THESIS.search, "Xue · Linares-Barrera · §07 GE"],
                ["Scorer", THESIS.scorer, "Yeh · §04 MP papers"],
                ["Fitness", THESIS.fitness, "Contreras · Ch. 2 §2.5.3 AUC"],
                ["Labels", THESIS.injection, "Ch. 4 §4.4 anomaly injection"],
              ]}
              striped
            />
          </Stack>
        </CardBody>
      </Card>

      <Stack gap={10}>
        <H2>Thesis search space (Vodafone grouped series)</H2>
        <ThesisSearchSpace />
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
          <TimelineNode year={2016} label="Xue · CO framing" active />
          <TimelineNode year={2016} label="Yeh · MP scorer" active />
          <TimelineNode year={2024} label="Linares · TS prune" active />
          <TimelineNode year={2024} label="Contreras · AUC GA" active />
        </div>
      </Stack>

      <Stack gap={10}>
        <H2>Per-article thesis relevance</H2>
        <Grid columns={2} gap={14}>
          {PAPERS.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </Grid>
      </Stack>

      <Card>
        <CardHeader title="Thesis component map" />
        <CardBody>
          <Table
            headers={[
              "Paper",
              "Relevance",
              "Thesis component",
              "What thesis takes",
              "What thesis adds",
            ]}
            rows={PAPERS.map((p) => [
              `${p.authors.split(" ")[0]} (${p.year})`,
              p.thesisRelevance,
              p.thesisComponent,
              p.id === 17
                ? "CO framing for subset search"
                : p.id === 18
                  ? "EC can halve inputs · keep signal"
                  : p.id === 19
                    ? "Fast MP per-candidate scoring"
                    : "AUC drives evolutionary loop",
              p.id === 17
                ? "Aggregation structure, not feature vector"
                : p.id === 18
                  ? "hierarchy_auc not forecast MAE · telecom AD"
                  : p.id === 19
                    ? "Inside GE loop · grouped hierarchies"
                    : "Grouped telecom · grammar-valid structures",
            ])}
            striped
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Linares-Barrera (2024): thesis analogy — halving inputs" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Closest applied precedent for evolutionary pruning on time series.
              Thesis maps feature count → aggregation-path count: most of the
              94k+ combinations are uninformative, and search should find the
              partial hierarchy where anomalies are visible.
            </Text>
            <BarChart
              categories={["Electricity features", "Traffic features"]}
              series={[
                {
                  name: "Without selection",
                  data: [7704, 20688],
                  tone: "neutral",
                },
                {
                  name: "With SEISEN",
                  data: [3813, 10316],
                  tone: "success",
                },
              ]}
              height={220}
            />
            <Text size="sm" color="tertiary">
              Source: Linares-Barrera et al. (2024) · thesis analogy: prune
              aggregation paths, not forecast features
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={14}>
        <Card>
          <CardHeader title="Yeh (2016): why MP fits inside the GE loop" />
          <CardBody>
            <Stack gap={12}>
              <Text color="secondary">
                hierarchy_auc calls MP for every evolved phenotype across
                generations — Yeh establishes that this inner loop is
                computationally feasible at scale.
              </Text>
              <BarChart
                categories={["Refinery join (hours)", "Shapelet (seconds)"]}
                series={[
                  {
                    name: "Before",
                    data: [153.8 * 24, 252],
                    tone: "neutral",
                  },
                  {
                    name: "After (MP)",
                    data: [6.3, 3.7],
                    tone: "success",
                  },
                ]}
                height={200}
              />
              <Text size="sm" color="tertiary">
                Source: Yeh et al. (2016) · cross-ref §3.4 for discord theory
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Contreras (2024): AUC fitness design parallel" />
          <CardBody>
            <Stack gap={12}>
              <Text color="secondary">
                Supporting evidence that evolutionary search can be steered by
                AUC — same objective as hierarchy_auc, different domain and
                representation (fixed features vs grammar-evolved hierarchies).
              </Text>
              <BarChart
                categories={["Bitcoin", "Ibovespa", "Vale"]}
                series={[
                  {
                    name: "Best AUROC",
                    data: [0.61, 0.62, 0.58],
                    tone: "info",
                  },
                ]}
                height={200}
              />
              <Text size="sm" color="tertiary">
                Source: Contreras et al. (2024) · trim if word count tight
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Local PDF files</H2>
          <Table
            headers={["#", "Filename", "Thesis role"]}
            rows={PAPERS.map((p) => [
              String(p.id),
              p.pdf,
              p.thesisComponent,
            ])}
          />
          <Text size="sm" color="tertiary">
            Folder: Literature Review
            PDFs/05_Combinatorial_Optimisation_Time_Series/
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>§3.5 writing order (LR draft)</H2>
          <Table
            headers={["Order", "Paper", "Paragraph focus"]}
            rows={[
              ["1", "Xue", "CO framing · object = aggregation view"],
              ["2", "Linares-Barrera", "Applied TS evidence · halving inputs"],
              ["3", "Yeh", "MP as fast candidate judge · link §3.4"],
              ["4", "Contreras", "AUC fitness parallel · bridge to §3.6"],
            ]}
            striped
          />
        </Stack>
      </Grid>

      <Divider />

      <Callout tone="warning" title="§3.5 writing notes for your thesis">
        Open with Xue: the binding problem is combinatorial, but the thesis
        selects monitoring views that change the signal. Lead with
        Linares-Barrera numbers — halving inputs is the same efficiency argument
        for pruning aggregation paths. Yeh: one paragraph only; MP method detail
        lives in §3.4. Contreras: cite for AUC-driven search design, not
        financial results. Close by stating the gap: none of these jointly evolve
        grouped telecom hierarchies with GE, score with MP, and optimise
        hierarchy_auc. Do not invent survey metrics from Xue.
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
          Thesis: PonyGE2-dong · fitness: hierarchy_auc · grammar: mobai_nop.pybnf
          · Section: Combinatorial Optimisation for Selecting Time Series ·
          Articles 17–20
        </Text>
      </div>
    </Stack>
  );
}
