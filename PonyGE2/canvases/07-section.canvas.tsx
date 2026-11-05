import {
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

type ThesisTier = "core" | "background";

const PAPERS = [
  {
    id: 25,
    year: 1992,
    authors: "Koza",
    title: "Genetic Programming (book)",
    thesisTier: "background" as ThesisTier,
    thesisChapter: "Ch. 2 §2.4.2 only",
    headline: "Foundational GP paradigm",
    detail: "Evolve programs/trees with variable structure — not fixed parameter vectors",
    thesisMapping:
      "Licence for structure search: a candidate is a hierarchical aggregation rule, not a weight vector. Generational loop in Ch. 2 figure mirrors PonyGE2 pipeline.",
    citeFor: "Why vector optimisers (§3.5–3.6) are the wrong tool for evolving hierarchies",
    doNot: "Do not duplicate book summary in Ch. 3 — one bridge sentence max",
    doi: "https://mitpress.mit.edu/9780262527910/genetic-programming/",
    pdf: "Koza_1992_Genetic_Programming_Book.pdf",
    pdfStatus: "missing" as const,
    tone: "neutral" as const,
  },
  {
    id: 26,
    year: 2001,
    authors: "O'Neill & Ryan",
    title: "Grammatical Evolution (paper)",
    thesisTier: "core" as ThesisTier,
    thesisChapter: "Ch. 3 §3.7 + Ch. 4",
    headline: "Genotype → grammar → valid phenotype",
    detail: "GE overtook GP from ~gen 10 on symbolic integration; 89 food / 32×32 Santa Fe ant",
    thesisMapping:
      "Linear genome (CODON_SIZE 100 000 in mobai.txt) maps through mobai_nop.pybnf to a readable aggregation phenotype via PonyGE2 mapper. Every individual is syntactically valid — no wasted evaluations on malformed hierarchies.",
    citeFor:
      "Core GE method: BNF grammar + genotype-to-phenotype mapping guarantees well-formed partial hierarchies over telecom categories",
    doNot:
      "Santa Fe / integration benchmarks are not comparable to thesis ROC-AUC on Mobai hierarchies",
    doi: "https://doi.org/10.1109/4235.942529",
    pdf: "ONeill_2001_Grammatical_Evolution.pdf",
    pdfStatus: "on-disk" as const,
    tone: "info" as const,
  },
  {
    id: 27,
    year: 2003,
    authors: "O'Neill & Ryan",
    title: "Grammatical Evolution (book)",
    thesisTier: "core" as ThesisTier,
    thesisChapter: "Ch. 3 §3.7 + Ch. 4",
    headline: "Grammar decoupled from fitness",
    detail: "Representation (what hierarchies exist) independent of evaluation (how good they detect)",
    thesisMapping:
      "Grammar (mobai_nop.pybnf) encodes dimensions A–E and branch shapes; fitness (hierarchy_auc.py) scores via STUMPY Matrix Profile + weighted leaf AUC. Partner Description (F) excluded — 7.6 bits entropy, Ch. 4 §4.1.2.",
    citeFor:
      "Modularity argument: grammar answers which hierarchies are possible; MP/AUC answers which detect anomalies well — swappable without redesign",
    doNot: "Book has no headline metric — cite design principle, not benchmark numbers",
    doi: "https://doi.org/10.1007/978-1-4615-0447-4",
    pdf: "ONeill_2003_Grammatical_Evolution_Book.pdf",
    pdfStatus: "missing" as const,
    tone: "info" as const,
  },
  {
    id: 28,
    year: 2017,
    authors: "Fenton et al.",
    title: "PonyGE2",
    thesisTier: "core" as ThesisTier,
    thesisChapter: "Ch. 4 §4.3 + §4.6",
    headline: "Thesis GE engine (this repo)",
    detail: "Pop 50 · 100 gen · tournament · PI_grow · int_flip_per_codon · generational replacement",
    thesisMapping:
      "parameters/mobai.txt drives search; grammars/mobai_nop.pybnf; fitness hierarchy_auc; Ch. 4 control-flow figure (fenton2017). Saved seeds/params for reproducibility across thousands of MP evaluations per run.",
    citeFor:
      "Implementation reference — evolutionary operators, mapping, run bookkeeping; cross-ref methodology, not performance claims",
    doNot: "Tooling paper — cite reproducibility features, not PonyGE2 benchmark scores",
    doi: "https://doi.org/10.1145/3067695.3082469",
    pdf: "Fenton_2017_PonyGE2.pdf",
    pdfStatus: "on-disk" as const,
    tone: "success" as const,
  },
];

const GRAMMAR_DIMS = [
  ["A", "Call Type", "In grammar"],
  ["B", "Event Type", "In grammar"],
  ["C", "Subscriber Type", "In grammar"],
  ["D", "Traffic Type", "In grammar"],
  ["E", "Service Type", "In grammar"],
  ["F", "Partner Description", "Excluded (7.6 bits)"],
];

function PaperCard({ paper }: { paper: (typeof PAPERS)[number] }) {
  const theme = useHostTheme();
  const isCore = paper.thesisTier === "core";
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        border: `1px solid ${isCore ? theme.accent.primary : theme.stroke.secondary}`,
        background: isCore ? theme.fill.secondary : theme.fill.tertiary,
        height: "100%",
      }}
    >
      <Row gap={8} wrap style={{ marginBottom: 8 }}>
        <Pill tone={paper.tone}>Article {paper.id}</Pill>
        <Pill tone="neutral">{paper.year}</Pill>
        <Pill tone={isCore ? "success" : "neutral"}>
          {isCore ? "Thesis-critical" : "Ch. 2 background"}
        </Pill>
        <Pill tone={paper.pdfStatus === "on-disk" ? "success" : "warning"}>
          {paper.pdfStatus === "on-disk" ? "PDF on disk" : "Book — no PDF"}
        </Pill>
      </Row>
      <H3 style={{ margin: "0 0 4px" }}>{paper.authors}</H3>
      <Text size="sm" color="secondary" style={{ marginBottom: 8 }}>
        {paper.title}
      </Text>
      <Text size="sm" weight="semibold" style={{ marginBottom: 6 }}>
        {paper.thesisChapter}
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
            Thesis mapping:{" "}
          </Text>
          {paper.thesisMapping}
        </Text>
        <Text size="sm">
          <Text weight="semibold" as="span">
            Cite for:{" "}
          </Text>
          {paper.citeFor}
        </Text>
        <Text size="sm" color="tertiary">
          Do not: {paper.doNot}
        </Text>
        <Link href={paper.doi}>DOI / link</Link>
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
        minWidth: 90,
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

function FlowArrow() {
  return (
    <Text color="tertiary" style={{ padding: "0 4px" }}>
      →
    </Text>
  );
}

export default function GeneticProgrammingGESection() {
  const theme = useHostTheme();
  const corePapers = PAPERS.filter((p) => p.thesisTier === "core");

  return (
    <Stack gap={20} style={{ padding: 4, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>Genetic Programming and Grammatical Evolution</H1>
        <Text color="secondary">
          Literature Review §07 — mapped to the thesis pipeline: PonyGE2 evolves
          partial hierarchies over Mobai telecom categories, scored by Matrix
          Profile + weighted leaf AUC
        </Text>
        <Row gap={12} wrap>
          <Pill tone="info">Articles 25–28 / 28</Pill>
          <Pill tone="success">3 thesis-critical · 1 Ch. 2 background</Pill>
          <Pill tone="warning">2 / 4 PDFs on disk</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="3" label="Thesis-critical sources" tone="success" />
        <Stat value="5" label="Grammar dimensions (A–E)" tone="info" />
        <Stat value="50×100" label="Pop × generations" />
        <Stat value="168h" label="MP window (m)" tone="info" />
      </Grid>

      <Callout tone="info" title="Thesis integration (Articles 26–28)">
        §3.5–3.6 show combinatorial search over fixed feature sets. This thesis
        instead generates novel interpretable hierarchies: O'Neill (2001) supplies
        valid-by-construction mapping; O'Neill (2003) separates grammar from
        MP/AUC fitness; PonyGE2 (2017) is the engine running parameters/mobai.txt
        with hierarchy_auc and mobai_nop.pybnf. Koza (1992) is Ch. 2 background only.
      </Callout>

      <Stack gap={10}>
        <H2>Live thesis pipeline</H2>
        <Row gap={6} wrap align="center" justify="center">
          <FlowBox label="Genome" sublabel="mobai.txt" />
          <FlowArrow />
          <FlowBox label="BNF grammar" sublabel="mobai_nop.pybnf" accent />
          <FlowArrow />
          <FlowBox label="Phenotype" sublabel="pheno_to_dict" accent />
          <FlowArrow />
          <FlowBox label="Aggregate" sublabel="Mobai CSV leaves" />
          <FlowArrow />
          <FlowBox label="Matrix Profile" sublabel="stumpy m=168" />
          <FlowArrow />
          <FlowBox label="Fitness" sublabel="weighted leaf AUC" />
        </Row>
        <Text size="sm" color="tertiary">
          Synthetic anomalies (μ±3σ, 168 h windows) label leaves for AUC; PonyGE2
          operators from Article 28 drive the search loop.
        </Text>
      </Stack>

      <Grid columns={2} gap={14}>
        {PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </Grid>

      <Card>
        <CardHeader title="Article → thesis component map" />
        <CardBody>
          <Table
            headers={["Article", "Thesis role", "Code / config", "Chapter"]}
            rows={[
              [
                "Koza (1992)",
                "GP paradigm — evolve structure not parameters",
                "Ch. 2 generational loop figure",
                "Ch. 2 only",
              ],
              [
                "O'Neill (2001)",
                "GE mapping — valid phenotypes by construction",
                "mapper.py · CODON_SIZE · mobai_nop.pybnf",
                "Ch. 3 + Ch. 4",
              ],
              [
                "O'Neill (2003)",
                "Grammar ↔ fitness decoupling",
                "Grammar dims A–E vs hierarchy_auc.py",
                "Ch. 3 + Ch. 4",
              ],
              [
                "Fenton (2017)",
                "PonyGE2 engine + reproducibility",
                "parameters/mobai.txt · src/ponyge.py",
                "Ch. 4 §4.3, §4.6",
              ],
            ]}
            striped
          />
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader title="Grammar dimensions (Article 27 → mobai_nop.pybnf)" />
          <CardBody>
            <Table
              headers={["Code", "Mobai dimension", "Status"]}
              rows={GRAMMAR_DIMS}
              striped
            />
            <Text size="sm" color="tertiary" style={{ marginTop: 10 }}>
              Phenotype is a readable rule e.g. Traffic Type=INT → Service
              Type=ROAMING — directly explains which segment triggered an alert.
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="PonyGE2 run config (Article 28 → mobai.txt)" />
          <CardBody>
            <Table
              headers={["Parameter", "Value"]}
              rows={[
                ["POPULATION_SIZE", "50"],
                ["GENERATIONS", "100"],
                ["SELECTION", "tournament (size 2)"],
                ["INITIALISATION", "PI_grow"],
                ["MUTATION", "int_flip_per_codon"],
                ["CROSSOVER", "variable_onepoint (0.75)"],
                ["REPLACEMENT", "generational"],
                ["MAX_TREE_DEPTH", "20"],
                ["FITNESS_FUNCTION", "hierarchy_auc"],
                ["GRAMMAR_FILE", "mobai_nop.pybnf"],
              ]}
              striped
            />
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader title="How each thesis-critical article closes the research gap" />
        <CardBody>
          <Table
            headers={["Gap from §01–06", "Article", "Thesis answer"]}
            rows={[
              [
                "Fixed aggregation before detection",
                "O'Neill (2001/2003)",
                "GE evolves partial hierarchies over Call/Event/Subscriber/Traffic/Service",
              ],
              [
                "GA selects fixed feature subsets",
                "Koza (1992) + O'Neill (2003)",
                "Variable-size interpretable rules, not bit-vector selection",
              ],
              [
                "Invalid candidates waste MP evaluations",
                "O'Neill (2001)",
                "BNF guarantees every phenotype maps to a valid aggregation tree",
              ],
              [
                "Scorer entangled in representation",
                "O'Neill (2003)",
                "hierarchy_auc + stumpy MP swappable independently of grammar",
              ],
              [
                "No reproducible GE engine for telecom AD",
                "Fenton (2017)",
                "PonyGE2: seeds, params, 50×100 runs, multithreaded MP fitness",
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
            headers={["#", "Filename", "Thesis use"]}
            rows={PAPERS.map((p) => [
              String(p.id),
              p.pdf,
              p.thesisTier === "core" ? "Ch. 3 + Ch. 4" : "Ch. 2 background",
            ])}
          />
          <Text size="sm" color="tertiary">
            Folder: Literature Review PDFs/07_Genetic_Programming_Grammatical_Evolution/
          </Text>
        </Stack>

        <Stack gap={10}>
          <H2>Interpretability link (Ch. 3 prose)</H2>
          <Text size="sm">
            A telecom operator needs to know which traffic segment is responsible.
            GE phenotypes are named categorical rules — the detector is the
            explanation. This is why GE is a substantive contribution, not just a
            convenient optimiser (Articles 26–27).
          </Text>
          <Text size="sm" color="tertiary">
            Baselines in Ch. 5: phono_agg (fixed aggregation) vs evolved partial
            hierarchies vs full disaggregation.
          </Text>
        </Stack>
      </Grid>

      <Divider />

      <Callout tone="warning" title="Writing notes for Ch. 3 port">
        Lead with Articles 26–28 — they directly justify the thesis method.
        Koza: one bridge sentence in §3.7. Do not compare O'Neill Santa Fe metrics
        to Mobai AUC. PonyGE2: tooling + reproducibility only. Cross-ref Ch. 4 for
        all implementation detail; LR Draft §GE is the source prose.
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
          Section 07 · Thesis-critical: Articles {corePapers.map((p) => p.id).join(", ")} ·
          Background: Article 25 · Dataset: Mobai train_set.csv · Fitness:
          src/fitness/hierarchy_auc.py
        </Text>
      </div>
    </Stack>
  );
}
