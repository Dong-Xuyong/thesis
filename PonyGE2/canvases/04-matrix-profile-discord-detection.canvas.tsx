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
    id: 13,
    year: 2017,
    authors: "Yeh et al.",
    title: "Matrix Profile unifying view",
    data: "Motifs · discords · shapelets · joins · segmentation",
    method: "Exact STAMP / STOMP / GPU matrix profile",
    headline: "Join 153.8 days → 1.2 hours",
    detail: "STOMP 4.7× (~2M pts) · cloud 4.2 days → 14.1 h · GPU-STAMP 30×",
    thesisLayer: "Core scorer rationale",
    thesisComponent: "Fitness primitive inside PonyGE2 search loop",
    thesisUse:
      "Justifies recomputing discord scores for every GE candidate — label-free, fast enough for thousands of evaluations per run.",
    thesisLimit:
      "Scores a given series only; does not choose which Mobai aggregation or hierarchy leaf to monitor.",
    chRef: "§3.4 lead · speedup evidence",
    doi: "https://doi.org/10.1007/s10618-017-0519-9",
    pdf: "Yeh_2017_Matrix_Profile_Unifying_View.pdf",
    tone: "success" as const,
  },
  {
    id: 14,
    year: 2016,
    authors: "Zhu et al.",
    title: "Matrix Profile II",
    data: "Seismology-scale exact motif/join discovery",
    method: "GPU-STOMP · 100M+ subsequences",
    headline: "100M subsequences · ~1,585 years → 12 days",
    detail: "499T pairwise distances · brute-force estimate vs GPU-STOMP runtime",
    thesisLayer: "Scale proof",
    thesisComponent: "Headroom argument for repeated MP calls",
    thesisUse:
      "One-sentence reassurance that MP scoring will not bottleneck GE when many hierarchy candidates are generated.",
    thesisLimit:
      "Seismology application irrelevant — cite scale only, not domain transfer.",
    chRef: "§3.4 one sentence",
    doi: "https://doi.org/10.1109/ICDM.2016.0085",
    pdf: "Zhu_2016_Matrix_Profile_II.pdf",
    tone: "info" as const,
  },
  {
    id: 15,
    year: 2005,
    authors: "Keogh et al.",
    title: "HOT SAX",
    data: "Telemetry · medicine · surveillance · industry",
    method: "Discord = subsequence farthest from nearest neighbour",
    headline: "3–4 orders of magnitude faster than brute force",
    detail: ">1M experiments · 82 datasets · identical to exhaustive discord search",
    thesisLayer: "Conceptual foundation",
    thesisComponent: "Why local NN distance signals abnormality",
    thesisUse:
      "Defines the discord idea that MP generalises — supports using profile distance (and its diff) as an anomaly score in Ch. 2 / §3.4.",
    thesisLimit:
      "Not the implementation used; thesis runs STUMPY, not HOT SAX.",
    chRef: "Ch. 2 discord theory · §3.4 one sentence",
    doi: "https://doi.org/10.1109/ICDM.2005.79",
    pdf: "Keogh_2005_HOT_SAX.pdf",
    tone: "neutral" as const,
  },
  {
    id: 16,
    year: 2019,
    authors: "Law",
    title: "STUMPY",
    data: "Python MP library · discords · motifs · MD profiles",
    method: "stumpy.stump / stumpy.mstump workflows",
    headline: "Thesis implementation reference",
    detail: "mobai_utils.py: stumpy.stump(ts, m=168, ignore_trivial=True) → diff → AUC",
    thesisLayer: "Implementation",
    thesisComponent: "hierarchy_auc fitness scorer (Ch. 4)",
    thesisUse:
      "Direct code dependency — every GE individual is evaluated through STUMPY matrix profile on aggregated #Events series.",
    thesisLimit:
      "Tooling paper, not an empirical benchmark; do not compare STUMPY numbers to thesis AUC results.",
    chRef: "§3.4 · §4.4 · mobai_utils.py",
    doi: "https://doi.org/10.21105/joss.01504",
    pdf: "Law_2019_STUMPY.pdf",
    tone: "info" as const,
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
        <Pill tone="warning">{paper.thesisLayer}</Pill>
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
        <Text size="sm">
          <Text weight="semibold" as="span">
            Use in review:{" "}
          </Text>
          {paper.thesisUse}
        </Text>
        <Text size="sm" color="tertiary">
          Does not do: {paper.thesisLimit}
        </Text>
        <Text size="sm" color="tertiary">
          Where to cite: {paper.chRef}
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

function ThesisPipelineFlow() {
  const theme = useHostTheme();
  const steps = [
    { label: "Mobai CDR records", sub: "Call · event · subscriber · traffic · service dims" },
    { label: "GE phenotype", sub: "PonyGE2 grammar → partial hierarchy" },
    { label: "Aggregate #Events", sub: "create_final_hierarchy per leaf" },
    { label: "STUMPY MP (m=168)", sub: "stump → diff → min-max normalize" },
    { label: "hierarchy_auc", sub: "Weighted ROC-AUC vs injected anomalies" },
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
        background: theme.fill.tertiary,
      }}
    >
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
          <Stack
            gap={4}
            align="center"
            style={{
              flex: 1,
              padding: "8px 6px",
              textAlign: "center",
            }}
          >
            <Text weight="semibold">{step.label}</Text>
            <Text size="sm" color="secondary">
              {step.sub}
            </Text>
          </Stack>
          {i < steps.length - 1 && (
            <Text color="tertiary" style={{ alignSelf: "center", padding: "0 2px" }}>
              →
            </Text>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MatrixProfileDiscordDetectionSection() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>Matrix Profile and Time-Series Discord Detection</H1>
        <Text color="secondary">
          Literature Review §04 — how discord scoring supports the thesis
          framework: GE searches hierarchies, STUMPY scores them, AUC selects
          the best
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Articles 13–16 / 28</Pill>
          <Pill tone="neutral">Ch. 3 §3.4 · Ch. 4 hierarchy_auc</Pill>
          <Pill tone="success">4 / 4 PDFs on disk</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="1" label="Core scorer (Yeh + STUMPY)" tone="success" />
        <Stat value="1" label="Scale proof (Zhu)" tone="info" />
        <Stat value="1" label="Discord foundation (Keogh)" />
        <Stat value="0" label="Pick aggregation / view" tone="danger" />
      </Grid>

      <Callout tone="info" title="Thesis role of this section">
        Sections 01–03 show that representation and hierarchy matter but fix
        them before detection. This section supplies the scoring primitive the
        thesis reuses: a label-free discord signal fast enough to call inside
        every PonyGE2 fitness evaluation. The contribution is not MP itself —
        it is coupling MP to grammar-evolved Mobai hierarchies evaluated by
        hierarchy_auc.
      </Callout>

      <Stack gap={10}>
        <H2>Where these papers sit in the thesis pipeline</H2>
        <ThesisPipelineFlow />
        <Text size="sm" color="tertiary">
          Articles 13–16 justify steps 4–5. PonyGE2 + grammar (§07) justify
          steps 2–3. Keogh (15) explains why step 4 measures abnormality at
          all.
        </Text>
      </Stack>

      <Card>
        <CardHeader title="Per-article thesis map" />
        <CardBody>
          <Table
            headers={[
              "Article",
              "Thesis layer",
              "Supplies",
              "Thesis still must provide",
            ]}
            rows={PAPERS.map((p) => [
              `${p.authors.split(" ")[0]} (${p.year})`,
              p.thesisLayer,
              p.thesisComponent,
              p.thesisLimit.split(";")[0],
            ])}
            striped
          />
        </CardBody>
      </Card>

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
          <TimelineNode year={2005} label="Keogh · discord def" />
          <TimelineNode year={2016} label="Zhu · GPU scale" />
          <TimelineNode year={2017} label="Yeh · deployable MP" active />
          <TimelineNode year={2019} label="Law · STUMPY code" active />
        </div>
      </Stack>

      <Grid columns={2} gap={14}>
        {PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </Grid>

      <Card>
        <CardHeader title="Yeh (2017): speedups that justify per-candidate scoring" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Each GE individual triggers MP on every valid hierarchy leaf.
              Yeh&apos;s efficiency claims support treating discord scoring as
              a cheap inner loop, not a one-off analysis step.
            </Text>
            <BarChart
              categories={[
                "STOMP vs STAMP (~2M pts)",
                "GPU-STAMP vs STAMP",
                "Join wall-clock reduction",
              ]}
              series={[
                {
                  name: "Speedup factor (×)",
                  data: [4.7, 30, 3076],
                  tone: "success",
                },
              ]}
              height={220}
            />
            <Text size="sm" color="tertiary">
              Source: Yeh et al. (2017) · Join 153.8 days → 1.2 hours · thesis
              uses STUMPY (Law 2019), which implements the same MP family
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="STUMPY in thesis code (Law 2019 → mobai_utils.py)" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              Concrete implementation path from literature to fitness function.
              Window m=168 matches the one-week anomaly injection window in Ch.
              4.
            </Text>
            <Table
              headers={["Step", "Thesis implementation", "MP paper role"]}
              rows={[
                [
                  "1. Aggregate series",
                  "create_final_hierarchy(df, phenotype)",
                  "— (GE / Ch. 4)",
                ],
                [
                  "2. Compute profile",
                  "stumpy.stump(#Events, m=168, ignore_trivial=True)",
                  "Law 2019 · Yeh 2017 algorithm family",
                ],
                [
                  "3. Anomaly signal",
                  "np.diff(mp[:, 0]) → min-max normalize",
                  "Keogh 2005 discord intuition",
                ],
                [
                  "4. Fitness",
                  "roc_auc_score vs Anomaly flag · leaf-weighted mean",
                  "Contreras-style AUC objective (§05)",
                ],
              ]}
              striped
            />
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={14}>
        <Card>
          <CardHeader title="Zhu (2016): scale headroom" />
          <CardBody>
            <Stack gap={12}>
              <Text color="secondary">
                Relevant only as a feasibility argument — MP will not be the
                bottleneck when GE explores many candidates.
              </Text>
              <BarChart
                categories={["Brute force (est.)", "GPU-STOMP"]}
                series={[
                  {
                    name: "Runtime (days, log proxy)",
                    data: [578475, 12],
                    tone: "info",
                  },
                ]}
                height={180}
                horizontal
              />
              <Text size="sm" color="tertiary">
                Source: Zhu et al. (2016) · 100M subsequences · ignore
                seismology domain detail
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Keogh (2005): discord foundation" />
          <CardBody>
            <Stack gap={12}>
              <Text color="secondary">
                Explains why distance-to-nearest-neighbour is a valid anomaly
                primitive for shape-based telecom event spikes — not just
                point outliers.
              </Text>
              <BarChart
                categories={["Brute force (relative)", "HOT SAX (low)", "HOT SAX (high)"]}
                series={[
                  {
                    name: "Relative cost (log proxy)",
                    data: [10000, 10, 1],
                    tone: "neutral",
                  },
                ]}
                height={180}
              />
              <Text size="sm" color="tertiary">
                Source: Keogh et al. (2005) · Ch. 2 should define discord; §3.4
                cites as historical foundation only
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader title="What MP discords capture vs what the thesis adds" />
        <CardBody>
          <Table
            headers={["Capability", "MP papers (13–16)", "Thesis framework"]}
            rows={[
              [
                "Label-free subsequence anomaly score",
                "Yes — core MP/discord output",
                "Yes — used in hierarchy_auc",
              ],
              [
                "Choose which Mobai aggregation to monitor",
                "No — analyst picks the series",
                "Yes — GE grammar search",
              ],
              [
                "Interpretable hierarchy structure",
                "No",
                "Yes — readable BNF phenotype",
              ],
              [
                "Telecom CDR / grouped mobile traffic",
                "Generic time series",
                "Yes — Mobai dataset (Ch. 4)",
              ],
              [
                "Evaluation against injected anomalies",
                "Unsupervised demos",
                "Yes — μ±3σ injection + ROC-AUC",
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
            Folder: Literature Review PDFs/04_Matrix_Profile_Discord_Detection/
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Ch. 3 §3.4 writing priority</H2>
          <Table
            headers={["Priority", "Paper", "Sentences to write"]}
            rows={[
              ["1 — lead", "Yeh (13)", "Deployable discord scorer + speedups for search loop"],
              ["2 — code", "Law (16)", "STUMPY as reproducible implementation in experiments"],
              ["3 — scale", "Zhu (14)", "One sentence: scoring won't bottleneck many candidates"],
              ["4 — concept", "Keogh (15)", "Discord definition; cross-ref Ch. 2 if defined there"],
            ]}
            striped
          />
        </Stack>
      </Grid>

      <Divider />

      <Callout tone="warning" title="Thesis writing guardrails">
        Do not present MP as the thesis contribution — it is the fitness
        primitive inside GE-driven hierarchy search. Do not compare Yeh/Zhu
        benchmark domains to Mobai AUC. Expand Ch. 2 §2.2 with discord/MP
        theory before porting this section from the LR draft. Law (16) is
        implementation citation only.
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
          Section: Matrix Profile and Time-Series Discord Detection · Articles
          13–16 · Code: src/fitness/hierarchy_auc.py · src/fitness/mobai_utils.py
        </Text>
      </div>
    </Stack>
  );
}
