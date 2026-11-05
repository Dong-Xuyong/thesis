#!/usr/bin/env python3
"""Build wiki-mind-maps-data.json from concept markdown pages."""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

WIKILINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]")
HEADING_RE = re.compile(r"^#\s+(.+)$", re.MULTILINE)
RELATED_SECTION_RE = re.compile(
    r"^##\s+Related\s+concepts\s*$", re.IGNORECASE | re.MULTILINE
)
DEFINITION_SECTION_RE = re.compile(
    r"^##\s+Definition\s*$", re.IGNORECASE | re.MULTILINE
)

STOP_WORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "to",
    "using",
    "via",
    "with",
}

SECTION_DEFS = [
    {
        "id": "telecom",
        "title": "Telecom anomaly detection",
        "copy": "KPI/CDR anomaly detection with sparse labels and fixed views",
        "color": "#5b8def",
        "slugs": {"telecom-anomaly-detection"},
        "subsections": [
            {
                "id": "operational-networks",
                "title": "Operational network monitoring",
                "slugs": {"telecom-anomaly-detection"},
            }
        ],
    },
    {
        "id": "grouped-ts",
        "title": "Grouped time series",
        "copy": "Representation and grouping dominate detector choice",
        "color": "#3ecf8e",
        "slugs": {"grouped-time-series"},
        "subsections": [
            {
                "id": "aggregation-representation",
                "title": "Aggregation & representation",
                "slugs": {"grouped-time-series"},
            }
        ],
    },
    {
        "id": "hierarchical-ts",
        "title": "Hierarchical time series",
        "copy": "Multi-level structure for localisation and search",
        "color": "#f5a623",
        "slugs": {"hierarchical-time-series"},
        "subsections": [
            {
                "id": "hierarchy-search",
                "title": "Hierarchy & composite search",
                "slugs": {"hierarchical-time-series"},
            }
        ],
    },
    {
        "id": "matrix-profile",
        "title": "Matrix Profile & discord",
        "copy": "Label-free subsequence similarity and discord scoring",
        "color": "#9a8cff",
        "slugs": {"matrix-profile", "time-series-discord"},
        "subsections": [
            {
                "id": "mp-methods",
                "title": "Matrix Profile methods",
                "slugs": {"matrix-profile"},
            },
            {
                "id": "discord-detection",
                "title": "Discord detection",
                "slugs": {"time-series-discord"},
            },
        ],
    },
    {
        "id": "combinatorial-ts",
        "title": "Combinatorial optimisation (time series)",
        "copy": "EC search over subsets with fast scorer and AUC fitness",
        "color": "#ff6b9d",
        "slugs": {"combinatorial-optimisation", "feature-selection", "auc-fitness"},
        "subsections": [
            {
                "id": "structure-search",
                "title": "Structure & subset search",
                "slugs": {"combinatorial-optimisation", "feature-selection"},
            },
            {
                "id": "auc-evaluation",
                "title": "AUC-based evaluation",
                "slugs": {"auc-fitness"},
            },
        ],
    },
    {
        "id": "combinatorial-ad",
        "title": "Combinatorial optimisation (anomaly detection)",
        "copy": "Anomalies visible in selected subspaces; search + scorer combined",
        "color": "#ff7f50",
        "slugs": {"subspace-anomaly-detection"},
        "subsections": [
            {
                "id": "subspace-search",
                "title": "Subspace search",
                "slugs": {"subspace-anomaly-detection"},
            }
        ],
    },
    {
        "id": "ge-gp",
        "title": "Genetic programming & grammatical evolution",
        "copy": "Grammar-generated valid hierarchies; PonyGE2 implements",
        "color": "#4ecdc4",
        "slugs": {"grammatical-evolution", "genetic-programming"},
        "subsections": [
            {
                "id": "evolutionary-structure",
                "title": "Evolutionary structure generation",
                "slugs": {"grammatical-evolution"},
            },
            {
                "id": "gp-foundation",
                "title": "GP foundation",
                "slugs": {"genetic-programming"},
            },
        ],
    },
]

FALLBACK_SECTION = {
    "id": "uncategorized",
    "title": "Uncategorized",
    "copy": "Concepts not yet mapped to a literature section",
    "color": "#888888",
    "subsections": [{"id": "misc", "title": "Miscellaneous", "slugs": set()}],
}


def parse_frontmatter(text: str) -> tuple[dict[str, str | list[str]], str]:
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    raw_fm = text[3:end].strip()
    body = text[end + 4 :].lstrip("\n")
    meta: dict[str, str | list[str]] = {}
    current_key: str | None = None
    for line in raw_fm.splitlines():
        if not line.strip():
            continue
        if line.startswith("  - "):
            if current_key is None:
                continue
            value = line[4:].strip()
            existing = meta.get(current_key)
            if isinstance(existing, list):
                existing.append(value)
            elif existing is None:
                meta[current_key] = [value]
            else:
                meta[current_key] = [str(existing), value]
            continue
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            current_key = key
            if value.startswith("[") and value.endswith("]"):
                inner = value[1:-1].strip()
                meta[key] = (
                    [item.strip().strip("'\"") for item in inner.split(",") if item.strip()]
                    if inner
                    else []
                )
            else:
                meta[key] = value
    return meta, body


def slugify_link(target: str) -> str:
    return target.strip().lower().replace(" ", "-")


def extract_title(body: str, meta: dict[str, str | list[str]], slug: str) -> str:
    match = HEADING_RE.search(body)
    if match:
        return match.group(1).strip()
    for key in ("title", "name"):
        if key in meta and isinstance(meta[key], str):
            return meta[key]
    return slug.replace("-", " ").title()


def extract_definition_excerpt(body: str, max_len: int = 220) -> str:
    match = DEFINITION_SECTION_RE.search(body)
    if not match:
        return ""
    start = match.end()
    rest = body[start:]
    next_heading = re.search(r"^##\s+", rest, re.MULTILINE)
    section_text = rest[: next_heading.start()] if next_heading else rest
    paragraph = ""
    for line in section_text.splitlines():
        stripped = line.strip()
        if not stripped:
            if paragraph:
                break
            continue
        if stripped.startswith("-") or stripped.startswith("*"):
            continue
        paragraph += (" " if paragraph else "") + stripped
    paragraph = re.sub(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]", r"\1", paragraph)
    paragraph = re.sub(r"\s+", " ", paragraph).strip()
    if len(paragraph) <= max_len:
        return paragraph
    cut = paragraph[: max_len - 1].rsplit(" ", 1)[0]
    return cut + "…"


def extract_related_concepts(body: str) -> list[str]:
    match = RELATED_SECTION_RE.search(body)
    if not match:
        return []
    start = match.end()
    rest = body[start:]
    next_heading = re.search(r"^##\s+", rest, re.MULTILINE)
    section_text = rest[: next_heading.start()] if next_heading else rest
    links = [slugify_link(m.group(1)) for m in WIKILINK_RE.finditer(section_text)]
    seen: set[str] = set()
    ordered: list[str] = []
    for link in links:
        if link not in seen:
            seen.add(link)
            ordered.append(link)
    return ordered


def build_keywords(title: str, tags: list[str], definition: str) -> list[str]:
    keys: list[str] = []
    seen: set[str] = set()

    def add(word: str) -> None:
        w = word.lower().strip("-")
        if len(w) < 3 or w in STOP_WORDS or w in seen:
            return
        seen.add(w)
        keys.append(w)

    for tag in tags:
        for part in re.split(r"[-_/]+", tag):
            add(part)
    for part in re.split(r"[^a-zA-Z0-9]+", title):
        add(part)
    if definition:
        first_sentence = re.split(r"[.!?]", definition, maxsplit=1)[0]
        for part in re.split(r"[^a-zA-Z0-9]+", first_sentence):
            add(part)
        if len(keys) < 6:
            for part in re.split(r"[^a-zA-Z0-9]+", definition):
                add(part)
                if len(keys) >= 8:
                    break
    return keys[:12]


def classify_concept(slug: str) -> tuple[str, str]:
    for section in SECTION_DEFS:
        for subsection in section["subsections"]:
            if slug in subsection["slugs"]:
                return section["id"], subsection["id"]
        if slug in section["slugs"]:
            first_sub = section["subsections"][0]["id"]
            return section["id"], first_sub
    return FALLBACK_SECTION["id"], FALLBACK_SECTION["subsections"][0]["id"]


def count_edges_for_slugs(slugs: set[str], edges: list[dict[str, str]]) -> int:
    return sum(1 for edge in edges if edge["a"] in slugs and edge["b"] in slugs)


def load_concepts(concepts_dir: Path) -> dict[str, dict]:
    concepts: dict[str, dict] = {}
    for path in sorted(concepts_dir.glob("*.md")):
        slug = path.stem
        text = path.read_text(encoding="utf-8")
        meta, body = parse_frontmatter(text)
        tags_raw = meta.get("tags", [])
        tags = tags_raw if isinstance(tags_raw, list) else [str(tags_raw)]
        title = extract_title(body, meta, slug)
        definition = extract_definition_excerpt(body)
        related = extract_related_concepts(body)
        section_id, subsection_id = classify_concept(slug)
        concepts[slug] = {
            "slug": slug,
            "title": title,
            "section": section_id,
            "subsection": subsection_id,
            "tags": tags,
            "keys": build_keywords(title, tags, definition),
            "desc": definition,
            "related": related,
            "path": str(path.as_posix()),
        }
    return concepts


def build_edges(concepts: dict[str, dict]) -> list[dict[str, str]]:
    edge_set: set[tuple[str, str]] = set()
    for slug, concept in concepts.items():
        for target in concept["related"]:
            if target not in concepts or target == slug:
                continue
            pair = tuple(sorted((slug, target)))
            edge_set.add(pair)
    return [{"a": a, "b": b} for a, b in sorted(edge_set)]


def build_sections(concepts: dict[str, dict], edges: list[dict[str, str]]) -> list[dict]:
    slug_to_section: dict[str, dict] = {}
    slug_to_subsection: dict[str, dict] = {}
    for section in SECTION_DEFS:
        for subsection in section["subsections"]:
            for slug in subsection["slugs"]:
                slug_to_section[slug] = section
                slug_to_subsection[slug] = subsection

    sections_out: list[dict] = []
    for section in SECTION_DEFS:
        section_slugs = {slug for slug, concept in concepts.items() if concept["section"] == section["id"]}
        subsections_out = []
        for subsection in section["subsections"]:
            sub_slugs = {
                slug for slug in section_slugs if concepts[slug]["subsection"] == subsection["id"]
            }
            if not sub_slugs and not subsection["slugs"]:
                continue
            subsections_out.append(
                {
                    "id": subsection["id"],
                    "title": subsection["title"],
                    "concepts": sorted(sub_slugs),
                    "edgeCount": count_edges_for_slugs(sub_slugs, edges),
                }
            )
        sections_out.append(
            {
                "id": section["id"],
                "title": section["title"],
                "copy": section["copy"],
                "color": section["color"],
                "concepts": sorted(section_slugs),
                "edgeCount": count_edges_for_slugs(section_slugs, edges),
                "subsections": subsections_out,
            }
        )

    uncategorized = {
        slug for slug, concept in concepts.items() if concept["section"] == FALLBACK_SECTION["id"]
    }
    if uncategorized:
        sections_out.append(
            {
                "id": FALLBACK_SECTION["id"],
                "title": FALLBACK_SECTION["title"],
                "copy": FALLBACK_SECTION["copy"],
                "color": FALLBACK_SECTION["color"],
                "concepts": sorted(uncategorized),
                "edgeCount": count_edges_for_slugs(uncategorized, edges),
                "subsections": [
                    {
                        "id": "misc",
                        "title": "Miscellaneous",
                        "concepts": sorted(uncategorized),
                        "edgeCount": count_edges_for_slugs(uncategorized, edges),
                    }
                ],
            }
        )
    return sections_out


def build_payload(concepts_dir: Path) -> dict:
    concepts = load_concepts(concepts_dir)
    edges = build_edges(concepts)

    for slug, concept in concepts.items():
        concept["related"] = [r for r in concept["related"] if r in concepts and r != slug]

    return {
        "generatedFrom": concepts_dir.as_posix(),
        "conceptCount": len(concepts),
        "edgeCount": len(edges),
        "sections": build_sections(concepts, edges),
        "concepts": concepts,
        "edges": edges,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--concepts-dir",
        type=Path,
        default=Path("wiki essay/concepts"),
        help="Directory containing concept markdown files",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("wiki-mind-maps-data.json"),
        help="Output JSON path",
    )
    args = parser.parse_args()
    concepts_dir = args.concepts_dir.resolve()
    if not concepts_dir.is_dir():
        print(f"Concepts directory not found: {concepts_dir}", file=sys.stderr)
        return 1

    payload = build_payload(concepts_dir)
    args.output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(
        f"Wrote {args.output} — {payload['conceptCount']} concepts, {payload['edgeCount']} edges"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
