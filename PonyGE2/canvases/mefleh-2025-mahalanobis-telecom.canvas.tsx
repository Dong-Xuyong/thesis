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
  "Mefleh, A., Debicki, M. P., Mubarak, A., Saade, M., & Weill, N. (2025). Beyond the norm: Unsupervised anomaly detection in telecommunications with Mahalanobis distance. Computers, 14(12), Article 561.";

const DOI = "https://doi.org/10.3390/computers14120561";

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

export default function Mefleh2025Infographic() {
  const theme = useHostTheme();

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 920 }}>
      <Stack gap={6}>
        <H1>Beyond the Norm: Mahalanobis Distance in Telecom AD</H1>
        <Text color="secondary">
          Mefleh et al. (2025) — unsupervised KPI anomaly detection with
          hierarchical aggregation and interpretable SHAP contributors
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Article 5 / 28</Pill>
          <Pill tone="success">Core to thesis</Pill>
          <Pill tone="neutral">Grouped time series · §3.2 lead</Pill>
          <Link href={DOI}>doi.org/10.3390/computers14120561</Link>
        </Row>
      </Stack>

      <Callout tone="info" title="Thesis integration">
        Lead §3.2: AUC 0.77→0.99 by changing KPI representation — not the Mahalanobis
        scorer alone. They hand-design cell→site aggregation and SME-guided KPI
        adjustment; your thesis searches partial Mobai hierarchies with PonyGE2
        (mobai_nop.pybnf), scores with Matrix Profile discord, and optimises
        hierarchy_auc. Do not compare MD AUC directly to synthetic injection AUC.
      </Callout>

      <Grid columns={3} gap={12}>
        <Stat value="15 min" label="KPI sampling interval" tone="info" />
        <Stat value="165" label="Element IDs (benchmark runs)" />
        <Stat value="44" label="Original KPI features" />
        <Stat value="~3,000" label="Element IDs (Exp. 1)" tone="info" />
        <Stat value="Cell → Site" label="Aggregation hierarchy" tone="info" />
        <Stat value="Unsupervised" label="No labels required at runtime" />
      </Grid>

      <Callout tone="success" title="Central finding">
        The same Mahalanobis scorer can move from AUC 0.77 to 0.99 depending on
        how KPIs are represented — representation dominates detector choice more
        than switching between unsupervised algorithms.
      </Callout>

      <Card>
        <CardHeader title="AUC progression — representation experiments" />
        <CardBody>
          <Stack gap={14}>
            <Text color="secondary">
              Experiment 1 (raw KPIs, ~3,000 elements, 3-day SME-labelled
              sample): AUC 0.77. Each preprocessing step below builds on raw KPI
              values (Method 1), which outperformed t−24 features (0.62) and
              seasonal residuals (0.73).
            </Text>
            <LineChart
              categories={[
                "Raw KPI",
                "+ Denom",
                "+ Adjust",
                "Learned num",
              ]}
              series={[
                {
                  name: "AUC",
                  data: [0.77, 0.86, 0.93, 0.99],
                  tone: "success",
                },
              ]}
              height={220}
            />
            <Text size="sm" color="tertiary">
              Source: Mefleh et al. (2025) §4.2 · Exp 1 → Exp 2 (+denominators)
              → Exp 3 (fixed constant adjust) → Exp 4 (learned numerator adjust,
              best: (n−c)/d)
            </Text>
            <Grid columns={4} gap={10}>
              <Stat value="0.77" label="Raw KPI (Exp 1)" />
              <Stat value="0.86" label="+ denominators (Exp 2)" tone="info" />
              <Stat value="0.93" label="+ ratio adjust (Exp 3)" tone="info" />
              <Stat
                value="0.99"
                label="Learned numerator adjust (Exp 4)"
                tone="success"
              />
            </Grid>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Method: Mahalanobis Distance</H2>
          <Text color="secondary">
            Unsupervised multivariate scorer using covariance structure of normal
            KPI data. Score: D_M(x) = √((x−μ)ᵀ Σ⁻¹ (x−μ)). High distance =
            joint deviation across correlated KPIs.
          </Text>
          <Table
            headers={["Phase", "Steps"]}
            rows={[
              [
                "Training",
                "Load history · preprocess KPIs · noise-reduction feature selection · save μ, Σ, MD distribution",
              ],
              [
                "Prediction",
                "Preprocess · compute MD per element · classify low/medium/high risk · SHAP on flagged anomalies",
              ],
            ]}
            striped
          />
          <Callout tone="info" title="KPI preprocessing (rule of succession)">
            Success/drop rates adjusted for sample size: add learned constant to
            denominator, subtract learned constant from numerator. Distinguishes
            e.g. 20% drop rate on 5 calls vs 50 calls.
          </Callout>
        </Stack>

        <Stack gap={10}>
          <H2>Hierarchical aggregation</H2>
          <Text color="secondary">
            MD scores computed per cell × datetime across KPIs. Scores averaged
            up the network: Cell → Site → Time. SHAP identifies top-contributing
            KPI when an anomaly fires.
          </Text>
          <Row gap={10} wrap align="stretch">
            <FlowStep
              step="Level 1"
              title="Cell"
              detail="MD per element ID · 15-min bucket · multivariate KPI vector"
            />
            <FlowStep
              step="Level 2"
              title="Site"
              detail="Average MD across cells within site"
            />
            <FlowStep
              step="Level 3"
              title="Time"
              detail="Compare anomaly levels across sites at a given timestamp"
            />
          </Row>
          <Text size="sm" color="tertiary">
            Aggregation is fixed (cells → sectors/sites), not searched. Contrast
            with thesis: you evolve which groupings to score.
          </Text>
        </Stack>
      </Grid>

      <Card>
        <CardHeader title="Benchmark vs baselines (large dataset, 44 features)" />
        <CardBody>
          <Stack gap={14}>
            <Text color="secondary">
              Large training set: 2 months · 165 element IDs. MD wins on both AUC
              and prediction time. One-Class SVM took over 4.5 hours; MD took
              1.87 seconds.
            </Text>
            <Grid columns={2} gap={16}>
              <Stack gap={8}>
                <Text weight="semibold">AUC (large dataset)</Text>
                <BarChart
                  categories={["MD", "IF", "LOF", "OCSVM"]}
                  series={[
                    {
                      name: "AUC",
                      data: [0.86, 0.72, 0.56, 0.63],
                      tone: "success",
                    },
                  ]}
                  height={200}
                />
              </Stack>
              <Stack gap={8}>
                <Text weight="semibold">Prediction time (large dataset)</Text>
                <BarChart
                  categories={["MD", "IF", "LOF", "OCSVM"]}
                  series={[
                    {
                      name: "Seconds (log scale note)",
                      data: [1.87, 58.5, 589, 16455],
                      tone: "info",
                    },
                  ]}
                  height={200}
                />
              </Stack>
            </Grid>
            <Table
              headers={[
                "Training size",
                "MD time",
                "MD AUC",
                "IF time",
                "LOF time",
                "OCSVM time",
              ]}
              rows={[
                ["Small (15 d)", "1.12 s", "0.90", "14.2 s", "39 s", "18 min 2 s"],
                ["Medium (1 mo)", "1.45 s", "0.86", "30.7 s", "2 min 42 s", "1 h 19 min"],
                ["Large (2 mo)", "1.87 s", "0.86", "58.5 s", "9 min 49 s", "4 h 34 min 15 s"],
              ]}
              striped
            />
            <Text size="sm" color="tertiary">
              Source: Mefleh et al. (2025) Tables 5–6 · IF = Isolation Forest ·
              LOF = Local Outlier Factor · OCSVM = One-Class SVM
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <H2>Feature selection trade-off</H2>
          <Text color="secondary">
            Iterative SME-labelled noise reduction: remove features that hurt AUC.
            Large dataset: 30 → 13 features, AUC 0.89 → 0.98, time 1.18 s → 0.45 s.
          </Text>
          <BarChart
            categories={["30 feat", "16 feat", "13 feat"]}
            series={[
              { name: "AUC (large)", data: [0.89, 0.97, 0.98], tone: "success" },
              {
                name: "Time (s, large)",
                data: [1.18, 0.54, 0.45],
                tone: "info",
              },
            ]}
            height={200}
          />
          <Callout tone="warning" title="Caveat">
            Feature removal is supervised (past anomalies) and may miss anomalies
            in dropped KPIs. Method does not model temporal/contextual anomalies
            (e.g. normal at night, abnormal at peak).
          </Callout>
        </Stack>

        <Stack gap={10}>
          <H2>Use case: RACH success rate (29 Jun 2024)</H2>
          <Text color="secondary">
            Drill-down workflow: highest site-level MD window (21:00–24:00) →
            Site_1 → Cell_8 → SHAP pins RACH success rate degradation.
          </Text>
          <Row gap={10} wrap align="stretch">
            <FlowStep
              step="01"
              title="Site aggregation"
              detail="21:00–24:00 most anomalous 3-h bucket of the day"
            />
            <FlowStep
              step="02"
              title="Cell drill-down"
              detail="Cell_8 highest MD within Site_1"
            />
            <FlowStep
              step="03"
              title="SHAP root cause"
              detail="RACH success rate failures drive the anomaly"
            />
          </Row>
          <Text size="sm" color="tertiary">
            Cross-season validation: summer AUC 0.89, winter AUC 0.91 on spring
            test — covariance structure stable across seasons
          </Text>
        </Stack>
      </Grid>

      <Stack gap={10}>
        <H2>Full pipeline (simplified)</H2>
        <Row gap={10} wrap align="stretch">
          <FlowStep
            step="01"
            title="Load KPIs"
            detail="15-min intervals · element IDs · success/drop/throughput KPIs"
          />
          <FlowStep
            step="02"
            title="Preprocess"
            detail="Rule-of-succession ratio adjust · denominators · feature selection"
          />
          <FlowStep
            step="03"
            title="Score (MD)"
            detail="Covariance-aware multivariate distance · risk levels"
          />
          <FlowStep
            step="04"
            title="Aggregate + explain"
            detail="Cell → site → time · SHAP contributor on high-risk flags"
          />
        </Row>
      </Stack>

      <Divider />

      <Stack gap={10}>
        <H2>Relevance to this thesis</H2>
        <Table
          headers={["Aspect", "Mefleh et al. (2025)", "Your thesis (PonyGE2-dong)"]}
          rows={[
            [
              "Data domain",
              "Telecom KPIs (cells, sectors, sites) · 15-min · SME labels",
              "Vodafone switch CDR · hourly #Events + Event Duration · Jul–Oct 2022",
            ],
            [
              "Core lesson",
              "Representation (KPI adjust + denominators) moves AUC 0.77 → 0.99",
              "Which aggregation path to score is as important as which scorer",
            ],
            [
              "Aggregation",
              "Fixed: average MD cell → site → time",
              "GE grammar (mobai_nop.pybnf) · Call/Event/Subscriber/Traffic/Service dims",
            ],
            [
              "Scorer",
              "Mahalanobis Distance (multivariate point anomalies)",
              "Matrix Profile discord via STUMPY (label-free per candidate series)",
            ],
            [
              "Evaluation",
              "SME-labelled KPI anomalies · iterative feature removal",
              "hierarchy_auc · synthetic μ±3σ injection · ROC-AUC fitness",
            ],
            [
              "Baselines",
              "IF · LOF · OCSVM on same KPI representation",
              "phono_agg · full disaggregation · best evolved hierarchy (Ch. 5)",
            ],
            [
              "Interpretability",
              "SHAP on flagged MD anomalies (e.g. RACH KPI)",
              "Grammar-valid partial hierarchy tree · readable aggregation path",
            ],
            [
              "Gap for your work",
              "Hand-designed preprocessing and fixed aggregation levels",
              "Search which grouped series to monitor — automate the step they fix",
            ],
          ]}
          striped
        />
        <Callout tone="warning" title="§3.2 literature review role">
          Lead grouped time series (Article 5). Cite AUC ladder 0.77 → 0.99, MD
          1.87 s vs OCSVM 4 h 34 m, and cell→site SHAP drill-down. Close the
          paragraph: they hand-design aggregation and KPI ratios; you evolve
          partial hierarchies with PonyGE2 and score with Matrix Profile. Do not
          equate their SME-labelled MD AUC with hierarchy_auc on Vodafone
          injection without stating different data and label regimes.
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
