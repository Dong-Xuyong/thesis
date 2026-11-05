import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  computeDAGLayout,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  PieChart,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  TextArea,
  TextInput,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

const RESEARCH_META = {
  version: "last30days v3.8.2",
  synced: "2026-06-29",
  range: "2026-05-30 to 2026-06-29",
  slug: "students-ai-essay-writing-support-tool-workflow",
};

const SOURCE_STATS = [
  { label: "Reddit threads", value: "16", detail: "12,375 upvotes · 2,294 comments" },
  { label: "X posts", value: "15", detail: "510 likes · 130 reposts" },
  { label: "HN stories", value: "30", detail: "2,300 points · 2,101 comments" },
  { label: "YouTube", value: "1", detail: "41 views · 1 transcript" },
];

const EVIDENCE_BY_SOURCE = {
  categories: ["Reddit", "X", "HN", "YouTube", "GitHub"],
  series: [
    { name: "Items collected", data: [16, 15, 30, 1, 8], tone: "info" as const },
  ],
};

const COMMUNITY_VOICES = [
  {
    quote: "AI bypasses the development process we call learning. It is destroying the capacity for thought.",
    author: "u/Time_Award3158",
    votes: "181 upvotes",
    context: "r/education · Is AI helping students learn?",
  },
  {
    quote: "Cognitive Surrender is the term you're looking for - and you should also suspect it with your own AI usage as well",
    author: "u/greenysmac",
    votes: "49 upvotes",
    context: "Same thread · educator-side warning label",
  },
  {
    quote: "All day, I grade AI papers. Some AI is good, some AI is bad.",
    author: "r/Professors",
    votes: "168 upvotes · 73 comments",
    context: "Professor perspective · June 2026",
  },
];

const STAGE_IDS = [
  "policy",
  "brainstorm",
  "research",
  "outline",
  "draft",
  "revise",
  "document",
] as const;

type StageId = (typeof STAGE_IDS)[number];

const STAGES: Array<{
  id: StageId;
  stage: string;
  shortLabel: string;
  youDo: string;
  aiDoes: string;
  tool: string;
  prompt: string;
  youPct: number;
  aiPct: number;
}> = [
  {
    id: "policy",
    stage: "1. Check policy",
    shortLabel: "Policy",
    youDo: "Read the syllabus; email the professor if the rule is vague.",
    aiDoes: "Nothing until you know what's allowed.",
    tool: "Syllabus + LMS message",
    prompt: "Is it okay if I use AI to brainstorm an outline and write the draft myself?",
    youPct: 95,
    aiPct: 5,
  },
  {
    id: "brainstorm",
    stage: "2. Brainstorm angles",
    shortLabel: "Brainstorm",
    youDo: "Pick the thesis you actually believe; reject generic AI angles.",
    aiDoes: "Generate 3-5 distinct angles, counterarguments, and narrower research questions.",
    tool: "ChatGPT",
    prompt:
      "Give me 5 different angles on [topic]. For each: one counterargument. Do not write the essay. I will pick the angle I can defend.",
    youPct: 45,
    aiPct: 55,
  },
  {
    id: "research",
    stage: "3. Research sources",
    shortLabel: "Research",
    youDo: "Verify every citation manually; never trust AI-generated references.",
    aiDoes: "Surface search terms, recent studies, and reading directions.",
    tool: "Perplexity, Semantic Scholar, Elicit",
    prompt:
      "What are peer-reviewed search angles on [topic]? Suggest Google Scholar terms only. Do not invent paper titles.",
    youPct: 60,
    aiPct: 40,
  },
  {
    id: "outline",
    stage: "4. Outline & stress-test",
    shortLabel: "Outline",
    youDo: "Merge and reorder until the logic is yours.",
    aiDoes: "Check flow, flag gaps, propose alternative structures.",
    tool: "Claude",
    prompt:
      "Here is my outline: [paste]. Does each section support the thesis? What is missing? Which section is weakest?",
    youPct: 55,
    aiPct: 45,
  },
  {
    id: "draft",
    stage: "5. Draft yourself",
    shortLabel: "Draft",
    youDo: "Write every sentence. This is where your voice and ownership live.",
    aiDoes: "Nothing at this stage.",
    tool: "You alone",
    prompt: "—",
    youPct: 100,
    aiPct: 0,
  },
  {
    id: "revise",
    stage: "6. Revise in passes",
    shortLabel: "Revise",
    youDo: "Fix one layer at a time: argument, then clarity, then grammar.",
    aiDoes: "Critique specific paragraphs; do not paste AI rewrites into the submission.",
    tool: "Claude, Grammarly",
    prompt:
      "Read paragraph [N] only. Flag: (1) weakest claim, (2) logical gap, (3) unclear sentence. Do not rewrite.",
    youPct: 70,
    aiPct: 30,
  },
  {
    id: "document",
    stage: "7. Document & submit",
    shortLabel: "Document",
    youDo: "Save chat logs, version history, and an AI disclosure if required.",
    aiDoes: "Optional detector check on your own prose before submit.",
    tool: "Google Docs history, disclosure statement",
    prompt:
      "I used [tool] to brainstorm an outline and get feedback on my draft. All submitted sentences are my own.",
    youPct: 85,
    aiPct: 15,
  },
];

const EVIDENCE_PIE = [
  { label: "HN", value: 30, tone: "info" as const },
  { label: "Reddit", value: 16, tone: "success" as const },
  { label: "X", value: 15, tone: "warning" as const },
  { label: "GitHub", value: 8, tone: "neutral" as const },
  { label: "YouTube", value: 1, tone: "danger" as const },
];

const INVOLVEMENT_BY_STAGE = {
  categories: STAGES.map((s) => s.shortLabel),
  series: [
    { name: "You (%)", data: STAGES.map((s) => s.youPct), tone: "success" as const },
    { name: "AI (%)", data: STAGES.map((s) => s.aiPct), tone: "info" as const },
  ],
};

function WorkflowDiagram({
  activeStage,
  onSelect,
}: {
  activeStage: StageId;
  onSelect: (id: StageId) => void;
}) {
  const theme = useHostTheme();
  const layout = computeDAGLayout({
    nodes: STAGE_IDS.map((id) => ({ id })),
    edges: [
      { from: "policy", to: "brainstorm" },
      { from: "brainstorm", to: "research" },
      { from: "research", to: "outline" },
      { from: "outline", to: "draft" },
      { from: "draft", to: "revise" },
      { from: "revise", to: "document" },
      { from: "revise", to: "draft" },
    ],
    direction: "vertical",
    nodeWidth: 148,
    nodeHeight: 44,
    rankGap: 36,
    nodeGap: 24,
    padding: 20,
  });

  const labels = Object.fromEntries(STAGES.map((s) => [s.id, s.shortLabel]));

  return (
    <svg
      width={layout.width}
      height={layout.height}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label="Seven-stage essay workflow pipeline"
      style={{ display: "block", maxWidth: "100%" }}
    >
      {layout.ranks.map((rank) => (
        <rect
          key={`rank-${rank.rank}`}
          x={rank.x - 8}
          y={rank.y - 6}
          width={rank.width + 16}
          height={rank.height + 12}
          rx={6}
          fill={rank.rank === 4 ? theme.fill.tertiary : theme.fill.quaternary}
          stroke={theme.stroke.tertiary}
          strokeWidth={1}
        />
      ))}
      {layout.edges.map((edge) => (
        <line
          key={`${edge.from}-${edge.to}`}
          x1={edge.sourceX}
          y1={edge.sourceY}
          x2={edge.targetX}
          y2={edge.targetY}
          stroke={edge.isBackEdge ? theme.stroke.secondary : theme.stroke.primary}
          strokeWidth={edge.isBackEdge ? 1 : 1.5}
          strokeDasharray={edge.isBackEdge ? "5 4" : undefined}
        />
      ))}
      {layout.nodes.map((node) => {
        const isDraft = node.id === "draft";
        const isActive = node.id === activeStage;
        const stageNum = STAGE_IDS.indexOf(node.id as StageId) + 1;
        return (
          <g
            key={node.id}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(node.id as StageId)}
          >
            <rect
              x={node.x}
              y={node.y}
              width={148}
              height={44}
              rx={4}
              fill={isDraft ? theme.fill.secondary : theme.bg.elevated}
              stroke={isActive ? theme.accent.primary : isDraft ? theme.accent.control : theme.stroke.primary}
              strokeWidth={isActive ? 2 : 1}
            />
            <text
              x={node.x + 14}
              y={node.y + 18}
              fill={theme.text.tertiary}
              fontSize={10}
              fontFamily="system-ui, sans-serif"
            >
              {stageNum}
            </text>
            <text
              x={node.x + 74}
              y={node.y + 27}
              textAnchor="middle"
              fill={theme.text.primary}
              fontSize={12}
              fontWeight={isDraft ? 600 : 400}
              fontFamily="system-ui, sans-serif"
            >
              {labels[node.id]}
            </text>
            {isDraft && (
              <text
                x={node.x + 74}
                y={node.y + 40}
                textAnchor="middle"
                fill={theme.text.secondary}
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                you only
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const TOOL_BY_STAGE = {
  categories: ["Policy", "Brainstorm", "Research", "Outline", "Draft", "Revise", "Document"],
  series: [
    { name: "ChatGPT fit (0-10)", data: [2, 9, 4, 6, 0, 4, 2], tone: "info" as const },
    { name: "Claude fit (0-10)", data: [3, 7, 3, 9, 0, 9, 4], tone: "success" as const },
    { name: "Perplexity fit (0-10)", data: [1, 2, 10, 2, 0, 1, 3], tone: "warning" as const },
  ],
};

const RED_LINES = [
  { action: "Paste AI-generated paragraphs into submission", verdict: "Academic misconduct", ok: false },
  { action: "Buy undetectable / humanizer tools", verdict: "Forums call these scams; still flagged", ok: false },
  { action: "Let AI invent citations", verdict: "Professors catch this fast", ok: false },
  { action: "Brainstorm thesis angles only", verdict: "Like talking to a tutor", ok: true },
  { action: "Stress-test your outline before drafting", verdict: "Widest community acceptance", ok: true },
  { action: "Revise your own draft with AI feedback + disclosure", verdict: "Safe when policy allows", ok: true },
];

const KEY_PATTERNS = [
  "Brainstorm, outline, self-draft, targeted revision - not one-shot generation.",
  "ChatGPT early for angles; Claude late for coherence and argument feedback.",
  "Cognitive Surrender = using AI to skip thinking, not just typing.",
  "Syllabus language and written disclosure beat model choice.",
  "Bypass tools are mocked as expensive, low-quality, and riskier than editing yourself.",
  "Institutional tools (NotebookLM, Gemini study notebooks, Copilot Study and Learn) push AI-as-coach.",
];

const PROMPT_TEMPLATES = [
  {
    label: "Thesis angles",
    text: "Generate 5 thesis statements for [topic], each from a different angle. For each: 2 supporting points and 1 counterargument. I will pick one.",
  },
  {
    label: "Outline audit",
    text: "Does this outline have logical gaps? [paste outline]. Which section is weakest and why?",
  },
  {
    label: "Paragraph critique",
    text: "Critique this paragraph for argument strength only - do not rewrite: [paste paragraph]",
  },
  {
    label: "Policy email",
    text: "Is it okay if I use AI to brainstorm an outline and write the draft myself? I will disclose any AI use as required.",
  },
  {
    label: "Disclosure",
    text: "I used [tool] to brainstorm search terms and test my outline. I wrote all submitted sentences myself.",
  },
];

export default function AiEssayWritingWorkflow() {
  const theme = useHostTheme();
  const [thesis, setThesis] = useCanvasState("thesis", "");
  const [outline, setOutline] = useCanvasState("outline", "");
  const [stageChecks, setStageChecks] = useCanvasState<Record<string, boolean>>("stageChecks", {});
  const [selectedPrompt, setSelectedPrompt] = useCanvasState("selectedPrompt", 0);
  const [policyChecked, setPolicyChecked] = useCanvasState<Record<string, boolean>>("policyChecked", {});
  const [activeStage, setActiveStage] = useCanvasState<StageId>("activeStage", "policy");

  const stagesDone = STAGES.filter((s) => stageChecks[s.stage]).length;
  const redLineOk = RED_LINES.filter((r) => r.ok).length;
  const policyDone = Object.values(policyChecked).filter(Boolean).length;
  const activeStageData = STAGES.find((s) => s.id === activeStage) ?? STAGES[0];

  function toggleStage(stage: string) {
    setStageChecks((prev) => ({ ...prev, [stage]: !prev[stage] }));
  }

  function togglePolicy(key: string) {
    setPolicyChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 980 }}>
      <Stack gap={8}>
        <Row gap={8} wrap>
          <Pill tone="info">{RESEARCH_META.version}</Pill>
          <Pill tone="neutral">Synced {RESEARCH_META.synced}</Pill>
        </Row>
        <H1>Students Using AI as an Essay Support Tool</H1>
        <Text variant="secondary">
          What people actually said across Reddit, X, Hacker News, and YouTube in the last 30 days.
          The community splits on whether AI is a thinking partner or a shortcut around learning - but
          when students use it as support, the winning pattern is stage-based, not paste-and-submit.
        </Text>
        <Text variant="secondary" size="sm">
          Date range: {RESEARCH_META.range} · Raw file: {RESEARCH_META.slug}-raw-v3.md
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        {SOURCE_STATS.map((s) => (
          <Stat key={s.label} label={s.label} value={s.value} tone="info" />
        ))}
      </Grid>

      <Callout tone="warning">
        <Text weight="semibold">The debate: support tool vs Cognitive Surrender</Text>
        <Text variant="secondary" size="sm">
          r/education thread (82 upvotes, 121 comments): educators warn that AI can skip the
          development process called learning. Students treating AI as support still face the same
          question - are you using it to think better, or to avoid thinking?
        </Text>
      </Callout>

      <Grid columns={2} gap={20}>
        <Stack gap={10}>
          <H2>Workflow pipeline</H2>
          <Text variant="secondary" size="sm">
            Seven linear stages with one revision loop. Click a stage to inspect it. Stage 5 (Draft)
            is the ownership boundary most forums agree on.
          </Text>
          <WorkflowDiagram activeStage={activeStage} onSelect={setActiveStage} />
          <Text variant="secondary" size="sm">
            Dashed arrow: revise may send you back to draft · Solid arrows: forward progression
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Selected stage</H2>
          <Card variant={activeStage === "draft" ? "elevated" : "default"}>
            <CardHeader
              title={activeStageData.stage}
              trailing={
                <Pill size="sm" tone={activeStageData.aiPct === 0 ? "success" : "info"}>
                  You {activeStageData.youPct}% · AI {activeStageData.aiPct}%
                </Pill>
              }
            />
            <CardBody>
              <Grid columns={2} gap={12}>
                <Stack gap={4}>
                  <Text weight="semibold" size="sm">
                    You do
                  </Text>
                  <Text variant="secondary" size="sm">
                    {activeStageData.youDo}
                  </Text>
                </Stack>
                <Stack gap={4}>
                  <Text weight="semibold" size="sm">
                    AI does
                  </Text>
                  <Text variant="secondary" size="sm">
                    {activeStageData.aiDoes}
                  </Text>
                </Stack>
              </Grid>
              <Row gap={8} style={{ marginTop: 10 }}>
                <Pill size="sm" tone="info">
                  {activeStageData.tool}
                </Pill>
              </Row>
              {activeStageData.prompt !== "—" && (
                <Text
                  size="sm"
                  style={{
                    marginTop: 10,
                    padding: 10,
                    background: theme.fill.tertiary,
                    borderRadius: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {activeStageData.prompt}
                </Text>
              )}
            </CardBody>
          </Card>

          <Stack gap={8}>
            <H3>Human vs AI involvement by stage</H3>
            <Text variant="secondary" size="sm">
              Relative effort share (%) · Source: community workflow patterns · June 2026
            </Text>
            <BarChart
              categories={INVOLVEMENT_BY_STAGE.categories}
              series={INVOLVEMENT_BY_STAGE.series}
              stacked
              normalized
              horizontal
              height={260}
              valueSuffix="%"
            />
            <Text variant="secondary" size="sm">
              Y-axis: workflow stage · X-axis: share of effort (normalized to 100%)
            </Text>
          </Stack>
        </Stack>
      </Grid>

      <Grid columns={2} gap={20}>
        <Stack gap={10}>
          <H2>Evidence by source</H2>
          <Text variant="secondary" size="sm">
            Items collected across platforms · Source: last30days engine · {RESEARCH_META.range}
          </Text>
          <Row gap={20} align="start">
            <BarChart
              categories={EVIDENCE_BY_SOURCE.categories}
              series={EVIDENCE_BY_SOURCE.series}
              height={220}
            />
            <Stack gap={6}>
              <H3>Share of items</H3>
              <PieChart data={EVIDENCE_PIE} size={180} donut />
              <Text variant="secondary" size="sm">
                HN dominated volume; Reddit carried the sharpest educator-student debate
              </Text>
            </Stack>
          </Row>
          <Text variant="secondary" size="sm">
            Left: item count by platform · Right: proportional share · YouTube was thin this window
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Top community voices</H2>
          <Stack gap={10}>
            {COMMUNITY_VOICES.map((v) => (
              <Card key={v.author} variant="default">
                <CardBody>
                  <Text size="sm" style={{ fontStyle: "italic" }}>
                    "{v.quote}"
                  </Text>
                  <Row gap={8} style={{ marginTop: 8 }} wrap>
                    <Pill size="sm" tone="neutral">
                      {v.author}
                    </Pill>
                    <Pill size="sm" tone="info">
                      {v.votes}
                    </Pill>
                  </Row>
                  <Text variant="secondary" size="sm" style={{ marginTop: 6 }}>
                    {v.context}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Grid>

      <Divider />

      <Grid columns={3} gap={12}>
        <Stat label="Workflow stages" value="7" tone="info" />
        <Stat
          label="Your progress"
          value={`${stagesDone}/7`}
          tone={stagesDone >= 5 ? "success" : "neutral"}
        />
        <Stat label="Ethical uses" value={`${redLineOk}/6`} tone="success" />
      </Grid>

      <Stack gap={12}>
        <H2>The 7-stage workflow students actually describe</H2>
        <Text variant="secondary" size="sm">
          Check off stages as you go. Stage 5 (Draft) is always you alone - that is the line most
          forums and guides agree on.
        </Text>
        <Stack gap={10}>
          {STAGES.map((item) => (
            <Card
              key={item.stage}
              variant={item.stage.includes("Draft") ? "elevated" : "default"}
              style={activeStage === item.id ? { outline: `2px solid ${theme.accent.primary}` } : undefined}
            >
              <CardHeader
                title={item.stage}
                trailing={
                  <Checkbox
                    checked={!!stageChecks[item.stage]}
                    onChange={() => toggleStage(item.stage)}
                    label="Done"
                  />
                }
              />
              <CardBody>
                <Grid columns={2} gap={12}>
                  <Stack gap={4}>
                    <Text weight="semibold" size="sm">
                      You do
                    </Text>
                    <Text variant="secondary" size="sm">
                      {item.youDo}
                    </Text>
                  </Stack>
                  <Stack gap={4}>
                    <Text weight="semibold" size="sm">
                      AI does
                    </Text>
                    <Text variant="secondary" size="sm">
                      {item.aiDoes}
                    </Text>
                  </Stack>
                </Grid>
                <Row gap={8} style={{ marginTop: 10 }}>
                  <Pill size="sm" tone="info">
                    {item.tool}
                  </Pill>
                </Row>
                {item.prompt !== "—" && (
                  <Text
                    size="sm"
                    style={{
                      marginTop: 10,
                      padding: 10,
                      background: theme.fill.tertiary,
                      borderRadius: 4,
                      fontFamily: "monospace",
                    }}
                  >
                    {item.prompt}
                  </Text>
                )}
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Stack>

      <Divider />

      <Grid columns={2} gap={20}>
        <Stack gap={10}>
          <H2>Tool fit by stage</H2>
          <Text variant="secondary" size="sm">
            ChatGPT early, Claude late, Perplexity for research - the combo students and guides
            repeat most often this month.
          </Text>
          <BarChart categories={TOOL_BY_STAGE.categories} series={TOOL_BY_STAGE.series} height={240} />
          <Text variant="secondary" size="sm">
            Y-axis: relative fit (0-10) · Based on Reddit, student forums, and workflow guides · June
            2026
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Green line vs red line</H2>
          <Table
            columns={[
              { key: "action", header: "Action", width: "55%" },
              { key: "verdict", header: "Verdict", width: "45%" },
            ]}
            rows={RED_LINES.map((r) => ({
              action: r.action,
              verdict: r.verdict,
              tone: r.ok ? ("success" as const) : ("danger" as const),
            }))}
          />
        </Stack>
      </Grid>

      <Divider />

      <Stack gap={10}>
        <H2>KEY PATTERNS from the research</H2>
        <Stack gap={6}>
          {KEY_PATTERNS.map((pattern, i) => (
            <Row key={pattern} gap={10}>
              <Text weight="semibold" size="sm" style={{ minWidth: 20 }}>
                {i + 1}.
              </Text>
              <Text variant="secondary" size="sm">
                {pattern}
              </Text>
            </Row>
          ))}
        </Stack>
      </Stack>

      <Card variant="default">
        <CardHeader title="Policy checklist before you start" />
        <CardBody>
          <Stack gap={8}>
            {[
              { key: "syllabus", label: "Read syllabus AI policy for this course" },
              { key: "email", label: "Email professor if policy is vague" },
              { key: "disclosure", label: "Know whether disclosure / chat logs are required" },
              { key: "history", label: "Use a tool with version history (Docs, Notion)" },
              { key: "citations", label: "Plan to verify every citation manually" },
            ].map((item) => (
              <Checkbox
                key={item.key}
                checked={!!policyChecked[item.key]}
                onChange={() => togglePolicy(item.key)}
                label={item.label}
              />
            ))}
          </Stack>
          <Text variant="secondary" size="sm" style={{ marginTop: 10 }}>
            {policyDone}/5 checked · Policy beats technique in every thread this month
          </Text>
        </CardBody>
      </Card>

      <Divider />

      <Grid columns={2} gap={20}>
        <Stack gap={10}>
          <H2>Copy-paste prompts</H2>
          <Row gap={8} wrap>
            {PROMPT_TEMPLATES.map((p, i) => (
              <Pill
                key={p.label}
                tone={selectedPrompt === i ? "info" : "neutral"}
                onClick={() => setSelectedPrompt(i)}
              >
                {p.label}
              </Pill>
            ))}
          </Row>
          <TextArea
            value={PROMPT_TEMPLATES[selectedPrompt]?.text ?? ""}
            readOnly
            rows={4}
            label="Selected prompt - copy and customize"
          />
        </Stack>

        <Stack gap={10}>
          <H2>Your working notes</H2>
          <TextInput
            value={thesis}
            onChange={setThesis}
            label="Working thesis"
            placeholder="The claim you will defend..."
          />
          <TextArea
            value={outline}
            onChange={setOutline}
            label="Outline draft"
            placeholder="Introduction, body sections, conclusion..."
            rows={6}
          />
        </Stack>
      </Grid>

      <Callout tone="info">
        <Text weight="semibold">What shifted in June 2026</Text>
        <Text variant="secondary" size="sm">
          Google (Gemini study notebooks) and Microsoft (Copilot Study and Learn Agent) both shipped
          student tools framed as interactive coaches - scaffolded questions, not finished answers.
          HN also surfaced Brown University mass AI exam fraud as the cautionary counterweight. The
          classroom reality per r/Professors: some AI-assisted papers are fine, lazy ones are obvious.
        </Text>
      </Callout>
    </Stack>
  );
}
