"""Extract full text from Literature Review PDFs into wiki essay/raw/."""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ingest_literature_to_wiki import SLUGS
from literature_pdf_layout import PDF_ROOT_NAME, pdf_abspath, pdf_relpath

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(BASE, PDF_ROOT_NAME)
RAW_DIR = os.path.join(BASE, "wiki essay", "raw")
MANIFEST = os.path.join(PDF_DIR, "download_manifest.json")
TODAY = date.today().isoformat()


def normalize_text(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_pdf_text(path: str) -> str:
    from pypdf import PdfReader

    reader = PdfReader(path)
    parts: list[str] = []
    for i, page in enumerate(reader.pages, start=1):
        page_text = page.extract_text() or ""
        if page_text.strip():
            parts.append(f"--- Page {i} ---\n{page_text.strip()}")
    return normalize_text("\n\n".join(parts))


def manifest_status(num: int) -> str | None:
    if not os.path.exists(MANIFEST):
        return None
    entry = json.load(open(MANIFEST, encoding="utf-8")).get(f"{num:02d}", {})
    return entry.get("status")


def build_raw_page(num: int, slug: str, text: str | None, status: str) -> str:
    rel = pdf_relpath(num)
    pdf_name = os.path.basename(rel) if rel else "—"
    lines = [
        "---",
        f"article_number: {num}",
        f"slug: {slug}",
        f"pdf: {pdf_name}",
        f"extraction_status: {status}",
        f"last_updated: {TODAY}",
        "---",
        "",
        f"# Raw PDF text — Article {num} ({slug})",
        "",
        f"- **Source PDF:** `Literature Review PDFs/{rel}`" if rel else "- **Source PDF:** —",
        f"- **Wiki source page:** [[../sources/{slug}|{slug}]]",
        "",
    ]
    if text:
        lines.extend(["## Extracted text", "", text, ""])
    else:
        lines.extend(["## Extracted text", "", f"*No text available — status: {status}*", ""])
    return "\n".join(lines)


def main() -> None:
    os.makedirs(RAW_DIR, exist_ok=True)
    extracted = 0
    skipped = 0
    index_lines = [
        "---",
        f"last_updated: {TODAY}",
        "---",
        "",
        "# Raw PDF text index",
        "",
        "Full-text extractions from `Literature Review PDFs/`. Read-only reference for wiki ingest.",
        "",
        "| # | Slug | Status | Chars |",
        "|---|------|--------|-------|",
    ]

    for num in range(1, 29):
        slug = SLUGS[num]
        pdf_path = pdf_abspath(PDF_DIR, num)
        status = "missing"
        text: str | None = None

        if pdf_path and os.path.exists(pdf_path):
            try:
                text = extract_pdf_text(pdf_path)
                status = "ok" if text else "empty"
                if text:
                    extracted += 1
                else:
                    skipped += 1
            except Exception as exc:
                status = f"error: {exc}"
                skipped += 1
        else:
            mstatus = manifest_status(num)
            if mstatus in ("unavailable", "failed"):
                status = mstatus
            skipped += 1

        out_path = os.path.join(RAW_DIR, f"{slug}.md")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(build_raw_page(num, slug, text, status))

        chars = len(text) if text else 0
        index_lines.append(f"| {num} | [[{slug}]] | {status} | {chars:,} | ")
        print(f"  {num:2d} {slug}: {status} ({chars:,} chars)")

    index_path = os.path.join(RAW_DIR, "index.md")
    index_lines.extend(["", f"**Extracted:** {extracted} / 28 PDFs on disk.", ""])
    with open(index_path, "w", encoding="utf-8") as f:
        f.write("\n".join(index_lines))

    print(f"\nWrote {extracted} extractions to wiki essay/raw/ ({skipped} skipped or empty).")


if __name__ == "__main__":
    main()
