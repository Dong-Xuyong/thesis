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
  PieChart,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

const CITATION =
  "Burgueño, J., de-la-Bandera, I., Mendoza, J., Palacios, D., Morillas, C., & Barco, R. (2020). Online anomaly detection system for mobile networks. Sensors, 20(24), Article 7232.";

const DOI = "https://doi.org/10.3390/s20247232";

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
        minWidth: 0,
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

export default function Burgueno2020Infographic() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 920 }}>
      <Stack gap={6}>
        <H1>Online Anomaly Detection for Mobile Networks</H1>
        <Text color="secondary">
          Burgueño et al. (2020) — real-time LTE/5G KPI monitoring at
          operational scale
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Article 3 / 28</Pill>
          <Pill tone="success">Core to thesis</Pill>
          <Pill tone="neutral">Telecom anomaly detection</Pill>
          <Link href={DOI}>doi.org/10.3390/s20247232</Link>
        </Row>
      </Stack>

      <Callout tone="info" title="Thesis integration">
        Core §3.1 evidence for the KPI-selection bottleneck: only 15 of 240 hourly
        KPIs were labelled across 24,725 LTE-A cells. Your thesis replaces manual
        view choice with PonyGE2 search over Mobai categorical dimensions, Matrix
        Profile discord scoring (STUMPY, m=168), and hierarchy_auc fitness on
        synthetic μ±3σ injection. Use Burgueño for operational scale and label
        sparsity — not as a method comparator.
      </Callout>

      <Grid columns={3} gap={12}>
        <Stat value="24,725" label="LTE-A cells monitored" tone="info" />
        <Stat value="45 days" label="Evaluation window" />
        <Stat value="650" label="Measurements per cell (15-min)" />
        <Stat value="240" label="Hourly KPI variables" tone="warning" />
        <Stat value="15" label="KPIs actually labelled" tone="danger" />
        <Stat value="3.8%" label="Mean anomalous sample rate" tone="warning" />
      </Grid>

      <Card>
        <CardHeader title="Scale vs label coverage" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              The system operates over a vast KPI space, but ground truth exists
              for only a small fraction of variables — a central constraint for
              telecom anomaly detection.
            </Text>
            <BarChart
              categories={["KPI variables", "Labelled cells", "Labelled KPIs"]}
              series={[
                {
                  name: "Available / total scope",
                  data: [240, 24725, 240],
                  tone: "neutral",
                },
                {
                  name: "With labels / monitored subset",
                  data: [15, 380, 15],
                  tone: "success",
                },
              ]}
              height={220}
              horizontal
            />
            <Text size="sm" color="tertiary">
              Source: Burgueño et al. (2020) · 380 labelled cells · 15 of 240
              KPIs with labels
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Reported detection outcomes</H2>
          <Grid columns={2} gap={12}>
            <Stat
              value="~+25%"
              label="More total anomalies vs baselines"
              tone="success"
            />
            <Stat
              value="~80%"
              label="Of all network anomalies captured"
              tone="success"
            />
          </Grid>
          <Callout tone="info" title="Method in brief">
            Online anomaly detection and tracking over LTE/5G network KPIs using
            threshold-oriented monitoring — not hierarchy search or evolutionary
            aggregation selection.
          </Callout>
        </Stack>

        <Stack gap={10}>
          <H2>KPI monitoring gap</H2>
          <PieChart
            donut
            size={200}
            data={[
              { label: "Labelled KPIs", value: 15, tone: "success" },
              { label: "Unlabelled KPIs", value: 225, tone: "danger" },
            ]}
          />
          <Text size="sm" color="tertiary" style={{ textAlign: "center" }}>
            Only 6.25% of hourly KPIs (15 / 240) had labels
          </Text>
        </Stack>
      </Grid>

      <Stack gap={10}>
        <H2>System pipeline (simplified)</H2>
        <Row gap={10} wrap align="stretch">
          <FlowStep
            step="01"
            title="Collect KPIs"
            detail="24,725 cells · 15-min sampling · 240 hourly KPIs"
          />
          <FlowStep
            step="02"
            title="Online scoring"
            detail="Real-time anomaly detection and tracking on LTE/5G counters"
          />
          <FlowStep
            step="03"
            title="Operator alerts"
            detail="~25% more anomalies found · ~80% network-wide coverage"
          />
        </Row>
      </Stack>

      <Divider />

      <Stack gap={10}>
        <H2>Relevance to this thesis</H2>
        <Table
          headers={["Aspect", "Burgueño et al. (2020)", "Your thesis"]}
          rows={[
            [
              "Data domain",
              "Mobile network KPIs (LTE-A cells)",
              "Grouped mobile telecom time series / CDR-style activity",
            ],
            [
              "Representation",
              "Fixed KPI set (15 labelled of 240)",
              "Search over hierarchy / aggregation structures",
            ],
            [
              "Scorer",
              "Threshold-based online detector",
              "Matrix Profile discord scoring",
            ],
            [
              "Structure search",
              "Manual KPI selection bottleneck",
              "Grammatical Evolution (PonyGE2) over valid groupings",
            ],
            [
              "Key lesson",
              "Scale + sparse labels make full manual coverage impractical",
              "Motivates automated selection of which series to score",
            ],
          ]}
          striped
        />
        <Callout tone="warning" title="Literature review role">
          Include as a core telecom benchmark: emphasise operational scale,
          label sparsity (3.8% anomalous samples), and the KPI-selection
          bottleneck. Do not treat it as a direct method comparator — use it to
          motivate why aggregation / series selection matters.
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
          {CITATION}
        </Text>
      </div>
    </Stack>
  );
}
