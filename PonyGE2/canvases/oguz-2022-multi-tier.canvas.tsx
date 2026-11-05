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

const DOI = "https://doi.org/10.1186/s13638-022-02183-7";

const FAP_STATES = [
  { state: "Healthy", note: "Normal operation" },
  { state: "Degraded", note: "Reduced capacity" },
  { state: "Crippled", note: "Severe impairment" },
  { state: "Catatonic", note: "Non-functional" },
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
        minWidth: 130,
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

export default function Oguz2022MultiTierInfographic() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 920 }}>
      <Stack gap={6}>
        <H1>Anomaly Detection in Multi-Tiered Cellular Networks</H1>
        <Text color="secondary">
          Oğuz & Kalaycıoğlu (2022) — femtocell access-point state classification
          in layered SON simulations using 1D CNN and LSTM
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Article 8 / 28</Pill>
          <Pill tone="neutral">Grouped time series · §02</Pill>
          <Pill tone="warning">Trim first if word count tight</Pill>
          <Link href={DOI}>doi.org/10.1186/s13638-022-02183-7</Link>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="80.1%" label="1D CNN accuracy (2 dB · 30 m)" tone="info" />
        <Stat value="79.08%" label="LSTM accuracy (same conditions)" />
        <Stat value=">95%" label="Best-case true positive rate" tone="success" />
        <Stat value="4" label="FAP health states classified" />
      </Grid>

      <Callout tone="info" title="Core idea">
        Detection quality in multi-tier cellular networks depends on tier and
        operating context — shadowing, region of interest, and network layer
        all shift accuracy. Grouping is structural, not optional.
      </Callout>

      <Card>
        <CardHeader title="Multi-tier context" />
        <CardBody>
          <Row gap={10} wrap align="stretch">
            <FlowStep
              step="Macro"
              title="Macrocell tier"
              detail="Primary cellular layer in heterogeneous network"
            />
            <FlowStep
              step="Femto"
              title="Femtocell tier"
              detail="FAP outage/anomaly states monitored locally"
            />
            <FlowStep
              step="SON"
              title="Self-organising network"
              detail="Automated tier coordination · simulation environment"
            />
            <FlowStep
              step="Classify"
              title="1D CNN / LSTM"
              detail="Four FAP states from time-series features"
            />
          </Row>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>FAP state taxonomy</H2>
          <Table
            headers={["State", "Meaning"]}
            rows={FAP_STATES.map((r) => [r.state, r.note])}
            striped
          />
          <Text size="sm" color="tertiary">
            Source: Oğuz & Kalaycıoğlu (2022) · EURASIP JWCN · femtocell outage
            classification in multi-tier SON
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>1D CNN vs LSTM (2 dB shadowing · 30 m ROI)</H2>
          <BarChart
            categories={["1D CNN", "LSTM"]}
            series={[
              {
                name: "Accuracy (%)",
                data: [80.1, 79.08],
                tone: "info",
              },
            ]}
            height={200}
            valueSuffix="%"
          />
          <Text size="sm" color="secondary">
            Best case: TPR &gt;95% and overall accuracy &gt;80% for four FAP
            states under favourable simulation conditions.
          </Text>
        </Stack>
      </Grid>

      <Callout tone="warning" title="Scope limits">
        Simulation-based femtocell study — not operational Vodafone CDR or ISP
        KPI data. Tier labels are fixed by network topology, not evolved. Use as
        a structural closing point for §3.2, not as a detection benchmark for
        hierarchy_auc.
      </Callout>

      <Divider />

      <Stack gap={10}>
        <H2>Relevance to this thesis</H2>
        <Table
          headers={["Aspect", "Oğuz & Kalaycıoğlu (2022)", "Your thesis (PonyGE2-dong)"]}
          rows={[
            [
              "Grouping",
              "Fixed multi-tier topology (macro + femto)",
              "Evolved partial CDR hierarchy · not radio-tier simulation",
            ],
            [
              "Data",
              "Simulated FAP time series · four health states",
              "Real Vodafone switch records · #Events + Event Duration",
            ],
            [
              "Method",
              "Supervised 1D CNN / LSTM classification",
              "Unsupervised MP discord + GE structure search",
            ],
            [
              "Thesis lesson",
              "Detection quality tracks group/tier context",
              "Motivates §3.3 — where in structure matters, not just which scorer",
            ],
            [
              "Include depth",
              "Brief paragraph · trim first if word count tight",
              "Bridge to hierarchical localisation (Tiresias, Wolff) in §3.3",
            ],
          ]}
          striped
        />
        <Callout tone="warning" title="§3.2 literature review role">
          Close §3.2 with one short paragraph: across distance methods, deep
          models, large WBS populations, and layered topologies, the recurring
          determinant is grouping context. Oğuz shows tier/regime shifts accuracy
          (80.1% vs &gt;95% TPR). Do not compare CNN accuracy to hierarchy_auc.
          Transition sentence: “how to organise those groups” → §3.3 hierarchical
          methods.
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
          Oğuz, H. T., & Kalaycıoğlu, A. (2022). Anomaly detection in
          multi-tiered cellular networks using LSTM and 1D CNN. EURASIP Journal
          on Wireless Communications and Networking, 2022(1), Article 101.
        </Text>
      </div>
    </Stack>
  );
}
