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
  LineChart,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

const CITATION =
  "Lemaire, P., Furno, A., Rubrichi, S., Bondu, A., Smoreda, Z., Ziemlicki, C., El Faouzi, N.-E., & Gaume, E. (2024). Early detection of critical urban events using mobile phone network data. PLOS ONE, 19(8), Article e0309093.";

const DOI = "https://doi.org/10.1371/journal.pone.0309093";

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

export default function Lemaire2024Infographic() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 920 }}>
      <Stack gap={6}>
        <H1>Early Detection of Critical Urban Events</H1>
        <Text color="secondary">
          Lemaire et al. (2024) — real-time anomaly detection from Orange France
          network signalling data (NSD) in Paris
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Article 4 / 28</Pill>
          <Pill tone="success">Supporting to thesis</Pill>
          <Pill tone="neutral">Telecom / mobile activity</Pill>
          <Pill tone="neutral">Aggregation visibility</Pill>
          <Link href={DOI}>doi.org/10.1371/journal.pone.0309093</Link>
        </Row>
      </Stack>

      <Callout tone="info" title="Thesis integration">
        Supporting §3.1 → §3.2 bridge: urban events become visible only after
        fixing a 1-min × per-cell NSD aggregation (best precision 28.63%). Your
        thesis searches which partial Mobai hierarchies expose injected anomalies
        via GE + MP + hierarchy_auc — aggregation visibility, not fault-detection
        benchmarking. Do not compare your synthetic AUC to their precision.
      </Callout>

      <Grid columns={3} gap={12}>
        <Stat value="~27M" label="Daily Orange subscribers" tone="info" />
        <Stat value="~12 TB" label="Data per day" />
        <Stat value="3 months" label="Mar 15 – Jun 15, 2019" />
        <Stat value="1 min" label="Temporal aggregation" tone="info" />
        <Stat value="Per cell" label="Spatial granularity" tone="info" />
        <Stat value="86" label="Ground-truth urban events" tone="warning" />
      </Grid>

      <Card>
        <CardHeader title="Data model: multivariate per-antenna time series" />
        <CardBody>
          <Stack gap={12}>
            <Text color="secondary">
              For each cell antenna a and minute t, NSD yields a vector of
              service counts (calls, SMS, handovers, paging, data sessions,
              etc.). Anomalies are deviations from forecasted nominal activity
              at that fixed aggregation level.
            </Text>
            <Row gap={10} wrap align="stretch">
              <FlowStep
                step="Input"
                title="NSD probes"
                detail="Signalling messages: voice, SMS, handovers, TA/LA updates, paging, data"
              />
              <FlowStep
                step="Aggregate"
                title="1-min × cell"
                detail="Anonymous counts only — no individual subscriber IDs"
              />
              <FlowStep
                step="Output"
                title="Minute-wise alerts"
                detail="Anomaly level 0–3 per antenna, per minute"
              />
            </Row>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Two detection methods compared</H2>
          <Table
            headers={["Method", "Forecast", "Anomaly score"]}
            rows={[
              [
                "Signature",
                "Median weekly pattern + Butterworth filter",
                "Gamma tail on deviation; product of service likelihoods",
              ],
              [
                "Adaptive",
                "Facebook Prophet (weekly seasonality)",
                "Adaptive Shewhart chart (h = 3, τ = 24 h half-life)",
              ],
            ]}
            striped
          />
          <Callout tone="info" title="Sensitivity levels">
            Three thresholds calibrated on training data: expected anomaly
            frequency once per 4 hours (level 1), once per day (level 2), once
            per week (level 3). Higher level = stricter = higher precision,
            lower recall.
          </Callout>
        </Stack>

        <Stack gap={10}>
          <H2>Ground-truth event database (DBUE)</H2>
          <Text color="secondary">
            86 documented Paris events (Mar 18 – Jun 15, 2019) from news and
            independent annotation. 350 events compiled; 86 used for
            quantitative matching with spatial/temporal tolerance.
          </Text>
          <BarChart
            categories={[
              "Concerts",
              "Sports",
              "Cultural",
              "Demo",
              "Fires",
            ]}
            series={[
              {
                name: "Event count",
                data: [38, 24, 20, 1, 2],
                tone: "info",
              },
            ]}
            height={200}
          />
          <Text size="sm" color="tertiary">
            Source: Lemaire et al. (2024) · Notre-Dame fire included · 2
            multi-location events (May 1 demo, Paris Marathon)
          </Text>
        </Stack>
      </Grid>

      <Card>
        <CardHeader title="Quantitative results — Signature method (4 services fused)" />
        <CardBody>
          <Stack gap={14}>
            <Text color="secondary">
              Best precision 28.63% at level 3 (strictest threshold). No-Skill
              random baseline precision: 0.23% — methods beat chance by &gt;100×
              but absolute precision stays low under extreme class imbalance.
            </Text>
            <BarChart
              categories={["Level 1", "Level 2", "Level 3"]}
              series={[
                {
                  name: "Minute precision (%)",
                  data: [2.38, 9.27, 28.63],
                  tone: "success",
                },
                {
                  name: "Event recall (%)",
                  data: [80.23, 44.19, 36.05],
                  tone: "info",
                },
              ]}
              height={240}
            />
            <Text size="sm" color="tertiary">
              Source: Lemaire et al. (2024) Table 4 · 3G/4G Calls + SMS fused ·
              Adaptive method: max precision 7.02% at level 3
            </Text>
            <Grid columns={3} gap={12}>
              <Stat
                value="28.63%"
                label="Best minute precision (Signature L3)"
                tone="success"
              />
              <Stat
                value="80.23%"
                label="Best event recall (Signature L1)"
                tone="info"
              />
              <Stat
                value="0.23%"
                label="No-Skill baseline precision"
                tone="danger"
              />
            </Grid>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Precision–recall trade-off</H2>
          <LineChart
            categories={[
              "L1 (4h)",
              "8h",
              "12h",
              "L2 (1d)",
              "2d",
              "L3 (1w)",
            ]}
            series={[
              {
                name: "Signature — minute precision (%)",
                data: [2.4, 4.5, 6.8, 9.3, 15, 28.6],
                tone: "success",
              },
              {
                name: "Signature — event recall (%)",
                data: [80, 68, 58, 44, 40, 36],
                tone: "info",
              },
            ]}
            height={220}
          />
          <Text size="sm" color="tertiary">
            Approximate PR-curve points from Fig. 3 · Stricter thresholds raise
            precision at the cost of recall
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Case studies</H2>
          <Callout tone="success" title="Notre-Dame fire (15 Apr 2019)">
            Smoke visible ~18:52. Closest antenna: persistent high-level alarm
            within 5 minutes. Anomalies spread to neighbouring cells over hours
            — fine spatial localisation.
          </Callout>
          <Callout tone="info" title="May 1 demonstration">
            Detected anomaly sequence along protest path. One northern anomaly at
            17:42 preceded media fire report at 18:21 — detection before live
            coverage.
          </Callout>
          <Text size="sm" color="secondary">
            Ablation: fusing 4 services (3G/4G calls + SMS) outperforms any
            single service. 4G SMS strongest at event granularity; calls
            stronger at minute granularity.
          </Text>
        </Stack>
      </Grid>

      <Stack gap={10}>
        <H2>Detection pipeline (simplified)</H2>
        <Row gap={10} wrap align="stretch">
          <FlowStep
            step="01"
            title="Train signatures / Prophet"
            detail="2-month train blocks · weekly patterns · deviation distributions"
          />
          <FlowStep
            step="02"
            title="Score deviations"
            detail="Per cell, per service, per minute — compound likelihood or control chart"
          />
          <FlowStep
            step="03"
            title="Match to events"
            detail="Spatial radius + temporal window (≤15 min after event start)"
          />
          <FlowStep
            step="04"
            title="Evaluate"
            detail="Minute precision · minute recall · event recall vs 86 UEs"
          />
        </Row>
      </Stack>

      <Divider />

      <Stack gap={10}>
        <H2>Relevance to this thesis</H2>
        <Table
          headers={["Aspect", "Lemaire et al. (2024)", "Your thesis"]}
          rows={[
            [
              "Data domain",
              "Orange NSD — per-minute cell-level service counts (Paris)",
              "Grouped mobile telecom time series / CDR-style switch records",
            ],
            [
              "Task",
              "Detect critical urban events (crowds, fires, demos)",
              "Detect injected / operational anomalies in aggregated activity",
            ],
            [
              "Representation",
              "Fixed 1-min × per-antenna aggregation",
              "Search over hierarchy / aggregation structures (GE grammar)",
            ],
            [
              "Scorer",
              "Signature likelihood or Prophet + Shewhart chart",
              "Matrix Profile discord scoring",
            ],
            [
              "Multivariate fusion",
              "Hand-tuned product of service likelihoods (independence assumed)",
              "Evolutionary selection of which groupings to score",
            ],
            [
              "Key lesson",
              "Abnormal real-world events become visible only after the right spatio-temporal aggregation; best precision still modest (28.63%)",
              "Motivates automated search for aggregations where anomalies surface — not only a better fixed-view detector",
            ],
          ]}
          striped
        />
        <Callout tone="warning" title="Literature review role">
          Include as core telecom evidence for aggregation visibility — not as a
          fault-detection benchmark. Cite scale (~27M subscribers, 1-min cells),
          best precision 28.63%, Notre-Dame 5-minute alarm, and 86-event
          ground truth. Bridge to the grouped time-series section: they fix the
          view; you search it. Do not compare your AUC directly to their
          precision without noting different labels and metrics.
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
