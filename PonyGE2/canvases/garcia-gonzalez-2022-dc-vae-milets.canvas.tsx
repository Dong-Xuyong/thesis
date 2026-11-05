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

const PAPER_URL =
  "https://kdd-milets.github.io/milets2022/papers/MILETS_2022_paper_3436.pdf";

const TELCO_SPLIT = [
  { split: "Training", samples: 310974, months: "Jan–Mar", anomalies: 5672, pct: 1.8 },
  { split: "Validation", samples: 103680, months: "Apr", anomalies: 385, pct: 0.4 },
  { split: "Testing", samples: 317953, months: "May–Jul", anomalies: 3080, pct: 1.0 },
];

const DC_VAE_PER_TS = [
  { ts: "TS1", r: 58, p: 71, f1: 64 },
  { ts: "TS2", r: 74, p: 20, f1: 67 },
  { ts: "TS3", r: 86, p: 47, f1: 60 },
  { ts: "TS4", r: 63, p: 21, f1: 32 },
  { ts: "TS5", r: 75, p: 50, f1: 60 },
  { ts: "TS6", r: 57, p: 83, f1: 68 },
  { ts: "TS7", r: 72, p: 90, f1: 80 },
  { ts: "TS8", r: 44, p: 80, f1: 57 },
  { ts: "TS9", r: 17, p: 11, f1: 13 },
  { ts: "TS10", r: 52, p: 59, f1: 55 },
  { ts: "TS11", r: 100, p: 25, f1: 40 },
  { ts: "TS12", r: 100, p: 11, f1: 22 },
];

const SWAT_BENCH = [
  { method: "Auto Encoder", f1: 61 },
  { method: "EGAN", f1: 51 },
  { method: "NET-GAN-G", f1: 78 },
  { method: "MAD-GAN-F1", f1: 77 },
  { method: "DC-VAE", f1: 78 },
];

function FlowStep({
  step,
  title,
  detail,
}: {
  step: string;
  title: string;
  detail: string;
}) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        flex: 1,
        minWidth: 140,
        padding: "12px 14px",
        borderRadius: 8,
        border: `1px solid ${theme.stroke.secondary}`,
        background: theme.fill.tertiary,
      }}
    >
      <Text size="sm" color="tertiary">
        {step}
      </Text>
      <H3 style={{ margin: "4px 0 6px" }}>{title}</H3>
      <Text size="sm" color="secondary">
        {detail}
      </Text>
    </div>
  );
}

export default function GarciaGonzalez2022DcVaeInfographic() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>DC-VAE for Mobile Network Anomaly Detection</H1>
        <Text color="secondary">
          García González et al. (2022) — MiLeTS workshop · Dilated convolutions +
          variational autoencoders on operational ISP data
        </Text>
        <Row gap={10} wrap>
          <Pill tone="info">Article 6 / 28</Pill>
          <Pill tone="success">Supporting to thesis</Pill>
          <Pill tone="neutral">Merge with González 2024 · S-VAE only</Pill>
          <Link href={PAPER_URL}>MILETS 2022 paper PDF</Link>
        </Row>
      </Stack>

      <Callout tone="info" title="Thesis integration">
        Supporting §3.2 — merge with Article 1 (González 2024 journal) for DC-VAE
        numbers; use this workshop paper only for the S-VAE comparator (median F1
        31% vs DC-VAE 59%). Fixed M=12 ISP view with sparse NOC labels mirrors the
        §3.1 gap: architecture helps but modest F1 on a pre-chosen view. Thesis
        searches which Mobai categorical aggregations to score via GE + MP +
        hierarchy_auc — do not repeat DC-VAE numbers twice or compare range-F1 to
        synthetic AUC.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="12" label="TELCO time series (5-min)" tone="info" />
        <Stat value="732,607" label="Total samples (7 months)" />
        <Stat value="9,137" label="Labelled anomalies (1.2%)" tone="warning" />
        <Stat value="T=512" label="Best window (~2 days past)" />
      </Grid>

      <Card>
        <CardHeader title="DC-VAE pipeline" />
        <CardBody>
          <Row gap={10} wrap align="stretch">
            <FlowStep
              step="01"
              title="Sliding window"
              detail="Input x ∈ R^(M×T): M series, T past samples (best T=512 on TELCO)"
            />
            <FlowStep
              step="02"
              title="DC encoder"
              detail="Causal dilated CNN maps x → latent μ_z, σ_z (no RNN)"
            />
            <FlowStep
              step="03"
              title="DC decoder"
              detail="Reconstructs μ_x, σ_x — per-series normal-operation region"
            />
            <FlowStep
              step="04"
              title="Anomaly rule"
              detail="|x_m(t) − μ_m(t)| > α_m × σ_m(t) — α calibrated per series"
            />
          </Row>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>TELCO dataset split</H2>
          <Table
            headers={["Split", "Samples", "Period", "Anomalies", "Rate"]}
            columnAlign={["left", "right", "left", "right", "right"]}
            rows={TELCO_SPLIT.map((r) => [
              r.split,
              r.samples.toLocaleString(),
              r.months,
              r.anomalies.toLocaleString(),
              `${r.pct}%`,
            ])}
            striped
          />
          <Text size="sm" color="tertiary">
            Source: Table 1 · Jan–Jul 2021 · mobile ISP KPIs (counts, costs,
            traffic, SMS) · expert NOC labels
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>DC-VAE vs S-VAE (TELCO test set)</H2>
          <BarChart
            categories={["Mean R_r", "Mean P_r", "Mean F1_r", "Median F1_r"]}
            series={[
              { name: "S-VAE (snapshot, T=1)", data: [38, 48, 33, 31], tone: "neutral" },
              { name: "DC-VAE (dilated, T=512)", data: [67, 47, 52, 59], tone: "success" },
            ]}
            height={220}
            valueSuffix="%"
          />
          <Text size="sm" color="tertiary">
            Range-based metrics (R_r, P_r, F1_r) per Tatbul et al. · DC-VAE
            roughly doubles mean F1_r vs snapshot VAE
          </Text>
        </Stack>
      </Grid>

      <Stack gap={10}>
        <H2>Per-series F1_r — DC-VAE on TELCO (testing)</H2>
        <BarChart
          categories={DC_VAE_PER_TS.map((r) => r.ts)}
          series={[
            {
              name: "F1_r (%)",
              data: DC_VAE_PER_TS.map((r) => r.f1),
              tone: "info",
            },
          ]}
          height={200}
          valueSuffix="%"
        />
        <Row gap={16} wrap>
          <Stat value="52%" label="Mean F1_r" tone="warning" />
          <Stat value="59%" label="Median F1_r" tone="info" />
          <Stat value="80%" label="Best series (TS7 F1_r)" tone="success" />
          <Stat value="13%" label="Weakest (TS9 F1_r)" tone="danger" />
        </Row>
        <Text size="sm" color="tertiary">
          Source: Table 2 · eight of twelve series around ~60% F1_r; real
          in-the-wild labels make scores much lower than synthetic benchmarks
        </Text>
      </Stack>

      <Card>
        <CardHeader title="SWaT benchmark (point F1)" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              On SWaT (51 series, ~5.8% anomalies), DC-VAE matches NET-GAN-G and
              MAD-GAN-F1 at F1 78% — far above TELCO, highlighting how flawed
              public benchmarks can overstate progress.
            </Text>
            <BarChart
              categories={SWAT_BENCH.map((r) => r.method)}
              series={[
                {
                  name: "F1 score (%)",
                  data: SWAT_BENCH.map((r) => r.f1),
                },
              ]}
              height={180}
              valueSuffix="%"
              horizontal
            />
            <Text size="sm" color="tertiary">
              Source: Table 3 · DC-VAE: R 67%, P 94%, F1 78%
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={8}>
          <H2>Key contributions</H2>
          <Table
            headers={["Contribution", "Detail"]}
            rows={[
              ["DC-VAE model", "VAE + dilated causal CNN encoder/decoder"],
              ["TELCO dataset released", "Real 7-month operational mobile ISP MTS"],
              ["Code released", "Reproducible DC-VAE implementation"],
              ["Range metrics", "F1_r handles anomaly intervals, not just points"],
              ["Per-series α", "Sensitivity threshold tuned per metric (grid 1–5)"],
            ]}
            striped
          />
        </Stack>

        <Stack gap={8}>
          <H2>Limitations (paper + thesis lens)</H2>
          <Table
            headers={["Gap", "Implication"]}
            rows={[
              ["Fixed 12 series", "No search over aggregations or hierarchy"],
              ["Representation fixed", "Does not ask which grouping reveals anomalies"],
              ["Modest TELCO F1", "Sparse labels + imbalance cap headline metrics"],
              ["α needs labels", "Threshold calibration uses training/validation labels"],
              ["Journal overlap", "Same TELCO results in González et al. (2024)"],
            ]}
            striped
          />
        </Stack>
      </Grid>

      <Divider />

      <Stack gap={10}>
        <H2>Relevance to this thesis</H2>
        <Table
          headers={["Aspect", "García González et al. (2022/2024)", "Your thesis (PonyGE2-dong)"]}
          rows={[
            [
              "Domain",
              "Operational mobile ISP MTS · 12 fixed KPI series · 1.2% NOC labels",
              "Vodafone switch grouped CDR · five grammar dims · synthetic anomalies",
            ],
            [
              "Representation",
              "Pre-defined M=12 aggregated KPIs — no search",
              "Evolved partial hierarchy · excludes Partner Description (7.6 bits)",
            ],
            [
              "Scorer",
              "DC-VAE reconstruction band (μ ± ασ) · α needs labels",
              "Matrix Profile discord · no per-series threshold tuning",
            ],
            [
              "Temporal model",
              "Dilated CNN window T=512 (~2 days)",
              "MP subsequence discord on aggregated hourly series",
            ],
            [
              "Headline result",
              "Mean F1_r 52% · median 59% · S-VAE median 31%",
              "hierarchy_auc vs phono_agg · Ch. 5 placeholders",
            ],
            [
              "Key lesson",
              "Architecture helps but sparse real labels cap performance",
              "Spend modelling effort on which series to score, not only scorer depth",
            ],
          ]}
          striped
        />
        <Callout tone="warning" title="§3.2 literature review role">
          Merge with González et al. (2024) — cite journal for TELCO DC-VAE
          numbers; keep this workshop paper for S-VAE comparator (median F1_r 59%
          vs 31%). One paragraph after Mefleh: better architecture does not
          escape the sparse-label ceiling. Contrast fixed 12-series view with GE
          search over Call Type · Event Type · Traffic Type · etc. Do not repeat
          identical DC-VAE metrics in §3.1 and §3.2.
        </Callout>
      </Stack>

      <div
        style={{
          padding: "12px 14px",
          borderRadius: 8,
          border: `1px solid ${theme.stroke.tertiary}`,
          background: theme.bg.elevated,
        }}
      >
        <Text size="sm" color="tertiary">
          García González, G., Martinez Tagliafico, S., Fernández, A., Gómez, G.,
          Acuña, J., Mariño, C., & Casas, P. (2022). Mining multivariate
          time-series for anomaly detection in mobile networks: On the usage of
          variational auto encoders and dilated convolutions. MiLeTS 2022, KDD
          Workshop.
        </Text>
      </div>
    </Stack>
  );
}
