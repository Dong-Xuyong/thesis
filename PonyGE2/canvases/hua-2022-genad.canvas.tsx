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

const DOI = "https://doi.org/10.1049/ell2.12683";

const AREA_F1 = [
  { area: "Area 1", f1: 96.2 },
  { area: "Area 2", f1: 96.5 },
  { area: "Area 3", f1: 93.1 },
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

export default function Hua2022GenADInfographic() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 920 }}>
      <Stack gap={6}>
        <H1>GenAD: General Unsupervised AD for Wireless Base Stations</H1>
        <Text color="secondary">
          Hua et al. (2022) — multivariate KPI monitoring across large-scale
          China Mobile base-station populations with shared structure
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Article 7 / 28</Pill>
          <Pill tone="neutral">Grouped time series · §02</Pill>
          <Pill tone="neutral">Cross-entity generalisation</Pill>
          <Link href={DOI}>doi.org/10.1049/ell2.12683</Link>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="0.953" label="Overall F1 (China Mobile WBS)" tone="success" />
        <Stat value="1.000" label="Recall" tone="success" />
        <Stat value="0.910" label="Precision" />
        <Stat value="+9%" label="Total F1 boost from shared structure" tone="info" />
      </Grid>

      <Callout tone="info" title="Core idea">
        GenAD treats many wireless base stations as a related population rather
        than independent monitors. Sharing structure across stations improves
        detection — the grouped-series argument stated in performance terms.
      </Callout>

      <Card>
        <CardHeader title="GenAD pipeline (conceptual)" />
        <CardBody>
          <Row gap={10} wrap align="stretch">
            <FlowStep
              step="01"
              title="Multivariate KPIs"
              detail="Per base-station multivariate time series from operational WBS counters"
            />
            <FlowStep
              step="02"
              title="Population model"
              detail="General unsupervised AD exploits structure shared across many stations"
            />
            <FlowStep
              step="03"
              title="Area grouping"
              detail="Evaluate at area level — stations grouped into geographic/admin areas"
            />
            <FlowStep
              step="04"
              title="Anomaly flags"
              detail="High recall on fault detection across the WBS fleet"
            />
          </Row>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Reported results (China Mobile WBS)</H2>
          <Table
            headers={["Metric", "Value"]}
            rows={[
              ["Precision", "0.910"],
              ["Recall", "1.000"],
              ["F1", "0.953"],
              ["Area F1 (three areas)", "0.962 · 0.965 · 0.931"],
              ["Total F1 improvement", "Up to +9% from shared structure"],
            ]}
            striped
          />
          <Text size="sm" color="tertiary">
            Source: Hua et al. (2022) · Electronics Letters · China Mobile
            operational WBS KPI data
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Area-level F1 scores</H2>
          <BarChart
            categories={AREA_F1.map((r) => r.area)}
            series={[
              {
                name: "F1 (%)",
                data: AREA_F1.map((r) => r.f1),
                tone: "success",
              },
            ]}
            height={200}
            valueSuffix="%"
          />
          <Callout tone="warning" title="Label regime caveat">
            High recall/F1 reflects WBS fault labels and dense operational faults —
            not the 1.2% NOC-labelled ISP regime of García González or sparse
            SME labels in Mefleh. Frame explicitly in §3.2 so scores do not
            contradict the scarcity narrative from §3.1.
          </Callout>
        </Stack>
      </Grid>

      <Divider />

      <Stack gap={10}>
        <H2>Relevance to this thesis</H2>
        <Table
          headers={["Aspect", "Hua et al. (2022)", "Your thesis (PonyGE2-dong)"]}
          rows={[
            [
              "Grouped entities",
              "Many WBS treated as related population · area-level roll-up",
              "Many CDR aggregation paths over Call/Event/Traffic/Service dims",
            ],
            [
              "Grouping choice",
              "Fixed geographic/admin areas",
              "Evolved partial hierarchy via mobai_nop.pybnf grammar",
            ],
            [
              "Scorer",
              "GenAD general unsupervised multivariate model",
              "Matrix Profile discord per candidate aggregated series",
            ],
            [
              "Evaluation",
              "Operational WBS fault labels · high recall",
              "hierarchy_auc · synthetic μ±3σ injection on Vodafone data",
            ],
            [
              "Thesis lesson",
              "Detection improves when entities are related, not independent",
              "Supports grouped monitoring — but you still must choose which groupings",
            ],
            [
              "Gap",
              "Areas fixed · no search over aggregation structures",
              "GE search replaces hand-picked area/WBS grouping",
            ],
          ]}
          striped
        />
        <Callout tone="warning" title="§3.2 literature review role">
          One paragraph after García González: many related telecom entities can
          be monitored jointly. Cite F1 0.953 and area F1 0.962–0.965, then
          immediately note the different label regime vs sparse ISP/NOC papers.
          Transition: even with shared structure, Hua fix which areas to use —
          your thesis searches partial hierarchies. Not a direct method comparator
          for PonyGE2 or Matrix Profile.
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
          Hua, X., Zhu, L., Zhang, S., Li, Z., Wang, S., Deng, C., Feng, J.,
          Zhang, Z., & Wu, W. (2022). GenAD: General unsupervised anomaly
          detection using multivariate time series for large-scale wireless base
          stations. Electronics Letters, 59(1).
        </Text>
      </div>
    </Stack>
  );
}
