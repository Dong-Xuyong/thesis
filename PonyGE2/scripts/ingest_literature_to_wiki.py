"""Batch-ingest Literature Review Articles into wiki essay/sources/."""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from literature_pdf_layout import PDF_ROOT_NAME, pdf_relpath

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_DIR = os.path.join(BASE, "Literature Review Articles")
PDF_DIR = os.path.join(BASE, PDF_ROOT_NAME)
WIKI_ROOT = os.path.join(BASE, "wiki essay")
WIKI_SOURCES = os.path.join(WIKI_ROOT, "sources")
TODAY = date.today().isoformat()

SLUGS: dict[int, str] = {
    1: "gonzalez-2024-one-model",
    2: "sultan-2018-cdr-anomaly-detection",
    3: "burgueno-2020-online-anomaly-detection",
    4: "lemaire-2024-urban-events",
    5: "mefleh-2025-mahalanobis",
    6: "garcia-gonzalez-2022-milets-dc-vae",
    7: "hua-2022-genad",
    8: "oguz-2022-multi-tier",
    9: "hong-2012-tiresias",
    10: "huang-2026-hydra",
    11: "wolff-2022-hierarchical-search",
    12: "pang-2022-hierarchical-forecasting",
    13: "yeh-2017-matrix-profile-unifying-view",
    14: "zhu-2016-matrix-profile-ii",
    15: "keogh-2005-hot-sax",
    16: "law-2019-stumpy",
    17: "xue-2016-ec-feature-selection-survey",
    18: "linares-barrera-2024-evolutionary-fs-forecasting",
    19: "yeh-2016-matrix-profile-i",
    20: "contreras-2024-ga-financial-feature-selection",
    21: "he-2021-mining-anomalies-subspaces",
    22: "zhang-2020-many-objective-ec-ad",
    23: "riahi-madvar-2021-mi-subspace-outliers",
    24: "li-2022-vae-ga-outlier-detection",
    25: "koza-1992-genetic-programming",
    26: "oneill-2001-grammatical-evolution",
    27: "oneill-2003-grammatical-evolution-book",
    28: "fenton-2017-ponyge2",
    29: "van-onsem-2023-variable-length-motif",
    30: "pietron-2025-ad-nev",
}

TAGS: dict[int, list[str]] = {
    1: ["telecom", "deep-learning", "anomaly-detection"],
    2: ["telecom", "cdr", "anomaly-detection"],
    3: ["telecom", "kpi", "anomaly-detection"],
    4: ["telecom", "urban-events", "anomaly-detection"],
    5: ["telecom", "grouped-ts", "mahalanobis"],
    6: ["telecom", "deep-learning", "grouped-ts"],
    7: ["telecom", "grouped-ts", "deep-learning"],
    8: ["telecom", "grouped-ts", "deep-learning"],
    9: ["hierarchical-ts", "telecom", "anomaly-detection"],
    10: ["hierarchical-ts", "anomaly-detection"],
    11: ["hierarchical-ts", "combinatorial", "anomaly-detection"],
    12: ["hierarchical-ts", "forecasting"],
    13: ["matrix-profile", "discord", "method"],
    14: ["matrix-profile", "discord", "method"],
    15: ["matrix-profile", "discord", "method"],
    16: ["matrix-profile", "stumpy", "method"],
    17: ["combinatorial", "feature-selection", "evolutionary"],
    18: ["combinatorial", "feature-selection", "evolutionary"],
    19: ["matrix-profile", "combinatorial", "method"],
    20: ["combinatorial", "ga", "auc"],
    21: ["combinatorial", "subspace", "anomaly-detection"],
    22: ["combinatorial", "feature-selection", "evolutionary"],
    23: ["combinatorial", "subspace", "anomaly-detection"],
    24: ["combinatorial", "vae", "ga", "anomaly-detection"],
    25: ["genetic-programming", "foundational"],
    26: ["grammatical-evolution", "foundational"],
    27: ["grammatical-evolution", "foundational"],
    28: ["grammatical-evolution", "ponyge2", "tooling"],
}

CROSS_REFS: dict[int, dict[str, list[str]]] = {
    1: {
        "concepts": ["telecom-anomaly-detection", "grouped-time-series"],
        "related": ["garcia-gonzalez-2022-milets-dc-vae", "mefleh-2025-mahalanobis"],
        "entities": ["telco-dataset"],
    },
    2: {
        "concepts": ["telecom-anomaly-detection"],
        "related": ["gonzalez-2024-one-model"],
        "entities": ["mobai-dataset"],
    },
    3: {
        "concepts": ["telecom-anomaly-detection"],
        "related": ["gonzalez-2024-one-model", "burgueno-2020-online-anomaly-detection"],
        "entities": [],
    },
    4: {
        "concepts": ["telecom-anomaly-detection", "grouped-time-series"],
        "related": ["mefleh-2025-mahalanobis"],
        "entities": [],
    },
    5: {
        "concepts": ["grouped-time-series", "telecom-anomaly-detection", "auc-fitness"],
        "related": ["gonzalez-2024-one-model", "garcia-gonzalez-2022-milets-dc-vae"],
        "entities": [],
    },
    6: {
        "concepts": ["grouped-time-series", "telecom-anomaly-detection"],
        "related": ["gonzalez-2024-one-model"],
        "entities": ["telco-dataset"],
    },
    7: {
        "concepts": ["grouped-time-series", "telecom-anomaly-detection"],
        "related": ["gonzalez-2024-one-model"],
        "entities": [],
    },
    8: {
        "concepts": ["grouped-time-series"],
        "related": ["mefleh-2025-mahalanobis"],
        "entities": [],
    },
    9: {
        "concepts": ["hierarchical-time-series", "telecom-anomaly-detection"],
        "related": ["wolff-2022-hierarchical-search"],
        "entities": [],
    },
    10: {
        "concepts": ["hierarchical-time-series", "anomaly-detection"],
        "related": ["hong-2012-tiresias"],
        "entities": [],
    },
    11: {
        "concepts": ["hierarchical-time-series", "combinatorial-optimisation"],
        "related": ["hong-2012-tiresias", "he-2021-mining-anomalies-subspaces"],
        "entities": [],
    },
    12: {
        "concepts": ["hierarchical-time-series"],
        "related": ["hong-2012-tiresias"],
        "entities": [],
    },
    13: {
        "concepts": ["matrix-profile", "time-series-discord"],
        "related": ["yeh-2016-matrix-profile-i", "zhu-2016-matrix-profile-ii", "keogh-2005-hot-sax"],
        "entities": [],
    },
    14: {
        "concepts": ["matrix-profile", "time-series-discord"],
        "related": ["yeh-2017-matrix-profile-unifying-view"],
        "entities": [],
    },
    15: {
        "concepts": ["matrix-profile", "time-series-discord"],
        "related": ["yeh-2017-matrix-profile-unifying-view", "keogh-2005-hot-sax"],
        "entities": [],
    },
    16: {
        "concepts": ["matrix-profile", "time-series-discord"],
        "related": ["yeh-2017-matrix-profile-unifying-view"],
        "entities": ["stumpy"],
    },
    17: {
        "concepts": ["combinatorial-optimisation", "feature-selection"],
        "related": ["linares-barrera-2024-evolutionary-fs-forecasting"],
        "entities": [],
    },
    18: {
        "concepts": ["combinatorial-optimisation", "feature-selection"],
        "related": ["xue-2016-ec-feature-selection-survey"],
        "entities": [],
    },
    19: {
        "concepts": ["matrix-profile", "combinatorial-optimisation"],
        "related": ["yeh-2017-matrix-profile-unifying-view"],
        "entities": [],
    },
    20: {
        "concepts": ["combinatorial-optimisation", "auc-fitness"],
        "related": ["li-2022-vae-ga-outlier-detection"],
        "entities": [],
    },
    21: {
        "concepts": ["subspace-anomaly-detection", "combinatorial-optimisation"],
        "related": ["li-2022-vae-ga-outlier-detection", "riahi-madvar-2021-mi-subspace-outliers"],
        "entities": [],
    },
    22: {
        "concepts": ["combinatorial-optimisation", "feature-selection"],
        "related": ["xue-2016-ec-feature-selection-survey"],
        "entities": [],
    },
    23: {
        "concepts": ["subspace-anomaly-detection", "combinatorial-optimisation"],
        "related": ["he-2021-mining-anomalies-subspaces"],
        "entities": [],
    },
    24: {
        "concepts": ["subspace-anomaly-detection", "combinatorial-optimisation", "auc-fitness"],
        "related": ["he-2021-mining-anomalies-subspaces"],
        "entities": [],
    },
    25: {
        "concepts": ["genetic-programming"],
        "related": ["oneill-2001-grammatical-evolution"],
        "entities": [],
    },
    26: {
        "concepts": ["grammatical-evolution", "genetic-programming"],
        "related": ["oneill-2003-grammatical-evolution-book", "fenton-2017-ponyge2"],
        "entities": [],
    },
    27: {
        "concepts": ["grammatical-evolution"],
        "related": ["oneill-2001-grammatical-evolution", "fenton-2017-ponyge2"],
        "entities": [],
    },
    28: {
        "concepts": ["grammatical-evolution"],
        "related": ["oneill-2001-grammatical-evolution"],
        "entities": ["ponyge2", "mobai-grammar"],
    },
}


def extract_field(text: str, label: str) -> str | None:
    # With colon: **Section:** value
    m = re.search(rf"\*\*{re.escape(label)}:\*\*\s*(.+)", text)
    if m:
        return m.group(1).strip()
    # Without colon: **Include?** value
    m = re.search(rf"\*\*{re.escape(label)}\*\*\s*(.+)", text)
    return m.group(1).strip() if m else None


def extract_section(text: str, heading: str) -> str | None:
    pattern = rf"## {re.escape(heading)}\n\n(.*?)(?=\n## |\Z)"
    m = re.search(pattern, text, re.DOTALL)
    return m.group(1).strip() if m else None


def parse_authors_year(article_line: str) -> tuple[str, str | None]:
    m = re.match(r"^(.+?)\s*\((\d{4})\)\s*—", article_line)
    if m:
        return m.group(1).strip(), m.group(2)
    return article_line.split("—")[0].strip(), None


def normalize_include(raw: str | None) -> str:
    if not raw:
        return "yes"
    lower = raw.lower()
    if "optional" in lower:
        return "optional"
    if "ch. 2" in lower or "ch2" in lower:
        return "ch2-mainly"
    return "yes"


def pdf_link(num: int) -> str:
    rel = pdf_relpath(num)
    if rel and os.path.exists(os.path.join(PDF_DIR, rel)):
        encoded = rel.replace(" ", "%20")
        basename = os.path.basename(rel)
        return f"[{basename}](../../Literature%20Review%20PDFs/{encoded})"
    manifest_path = os.path.join(PDF_DIR, "download_manifest.json")
    if os.path.exists(manifest_path):
        entry = json.load(open(manifest_path, encoding="utf-8")).get(f"{num:02d}", {})
        status = entry.get("status")
        if status == "unavailable":
            return "Not available (book; library access required)"
        if status == "failed":
            return "Not downloaded (paywalled or no open-access copy)"
        if rel:
            return f"Expected at `{rel}` (not on disk)"
    return "—"


def build_wiki_page(num: int, text: str) -> str:
    slug = SLUGS[num]
    article_line = extract_field(text, "Article") or f"Article {num}"
    section = extract_field(text, "Section") or ""
    include_raw = extract_field(text, "Include?")
    include = normalize_include(include_raw)
    link = extract_field(text, "Link") or ""
    authors, year = parse_authors_year(article_line)
    title = article_line.split("—", 1)[-1].strip().strip("*")

    apa = extract_section(text, "APA citation") or ""
    application = extract_section(text, "Application in the paper") or ""
    results = extract_section(text, "Reported quantified results") or ""
    why = extract_section(text, "Why useful for this literature review") or ""
    key_results = extract_section(text, "Key results to cite") or ""
    what_to_put = extract_section(text, "What to put in your literature review") or ""
    pdf_notes = extract_section(text, "Notes from local PDF") or ""

    tags = TAGS.get(num, ["literature"])
    tags_yaml = ", ".join(tags)
    refs = CROSS_REFS.get(num, {"concepts": [], "related": [], "entities": []})

    lines = [
        "---",
        f"tags: [{tags_yaml}]",
        f"article_number: {num}",
        f"section: {section}",
        f"include: {include}",
        f"authors: {authors}",
    ]
    if year:
        lines.append(f"year: {year}")
    lines.extend([f"last_updated: {TODAY}", "---", ""])
    lines.append(f"# {article_line}")
    lines.append("")
    lines.append("## Metadata")
    lines.append(f"- **Raw note:** [Literature Review Articles/{num}.md](../../Literature%20Review%20Articles/{num}.md)")
    lines.append(f"- **PDF:** {pdf_link(num)}")
    if link:
        lines.append(f"- **DOI / link:** {link}")
    lines.append(f"- **Include in Ch. 3?** {include_raw or include}")
    if apa:
        lines.extend(["", "## APA citation", "", apa])
    if application:
        lines.extend(["", "## Application", "", application])
    if results:
        lines.extend(["", "## Reported results", "", results])
    if key_results:
        lines.extend(["", "## Key results to cite", "", key_results])
    thesis_parts = []
    if why:
        thesis_parts.append(why)
    if what_to_put:
        thesis_parts.append(what_to_put)
    if thesis_parts:
        lines.extend(["", "## Thesis relevance", ""])
        lines.extend(thesis_parts)
    if pdf_notes:
        lines.extend(["", "## Notes from PDF", "", pdf_notes])
    lines.extend(["", "## Cross-references"])
    if refs.get("concepts"):
        lines.append("- Concepts: " + ", ".join(f"[[{c}]]" for c in refs["concepts"]))
    if refs.get("related"):
        lines.append("- Related sources: " + ", ".join(f"[[{r}]]" for r in refs["related"]))
    if refs.get("entities"):
        lines.append("- Entities: " + ", ".join(f"[[{e}]]" for e in refs["entities"]))
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    os.makedirs(WIKI_SOURCES, exist_ok=True)
    created = []
    for num in range(1, 29):
        path = os.path.join(ARTICLES_DIR, f"{num}.md")
        if not os.path.exists(path):
            print(f"Skip missing {path}")
            continue
        text = open(path, encoding="utf-8").read()
        out_path = os.path.join(WIKI_SOURCES, f"{SLUGS[num]}.md")
        content = build_wiki_page(num, text)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(content)
        created.append((num, SLUGS[num]))
        print(f"  {num:2d} -> wiki essay/sources/{SLUGS[num]}.md")
    print(f"\nCreated {len(created)} wiki source pages.")


if __name__ == "__main__":
    main()
