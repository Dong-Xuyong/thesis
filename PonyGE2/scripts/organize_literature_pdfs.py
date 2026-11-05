"""Move Literature Review PDFs into section subfolders."""

from __future__ import annotations

import json
import os
import shutil

from literature_pdf_layout import PDF_FILENAMES, PDF_ROOT_NAME, SECTIONS, pdf_relpath

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(BASE, PDF_ROOT_NAME)
MANIFEST_PATH = os.path.join(PDF_DIR, "download_manifest.json")


def main() -> None:
    for folder, _title, _nums in SECTIONS:
        os.makedirs(os.path.join(PDF_DIR, folder), exist_ok=True)

    moved = 0
    for num, filename in PDF_FILENAMES.items():
        target_rel = pdf_relpath(num)
        if not target_rel:
            continue
        target = os.path.join(PDF_DIR, target_rel)
        if os.path.exists(target):
            continue

        flat = os.path.join(PDF_DIR, filename)
        if os.path.exists(flat):
            shutil.move(flat, target)
            moved += 1
            print(f"moved #{num}: {filename} -> {target_rel}")

    if os.path.exists(MANIFEST_PATH):
        manifest = json.load(open(MANIFEST_PATH, encoding="utf-8"))
        for key, entry in manifest.items():
            num = int(key)
            rel = pdf_relpath(num)
            if rel:
                entry["filename"] = rel
        json.dump(manifest, open(MANIFEST_PATH, "w", encoding="utf-8"), indent=2)

    print(f"Done. Moved {moved} file(s).")


if __name__ == "__main__":
    main()
