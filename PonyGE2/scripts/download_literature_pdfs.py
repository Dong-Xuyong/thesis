"""Download PDFs for literature review articles into Literature Review PDFs/."""

from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from literature_pdf_layout import PDF_ROOT_NAME, SECTIONS, pdf_relpath

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE, PDF_ROOT_NAME)
MANIFEST_PATH = os.path.join(OUT_DIR, "download_manifest.json")
UNPAYWALL_EMAIL = "literature-review@example.com"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

# id -> (filename, doi or None, direct pdf url candidates)
ARTICLES = {
    "01": (
        "Gonzalez_2024_One_Model_to_Find_Them_All.pdf",
        "10.1109/TNSM.2023.3340146",
        [],
    ),
    "02": (
        "Sultan_2018_CDR_Anomaly_Detection.pdf",
        "10.1109/ACCESS.2018.2859756",
        [
            "https://arxiv.org/pdf/1807.11545",
            "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8392555",
        ],
    ),
    "03": (
        "Burgueno_2020_Online_Anomaly_Detection_Mobile_Networks.pdf",
        "10.3390/s20247232",
        [
            "https://europepmc.org/articles/PMC7766368?pdf=render",
            "https://www.mdpi.com/1424-8220/20/24/7232/pdf?version=1608196404",
        ],
    ),
    "04": (
        "Lemaire_2024_Early_Detection_Critical_Urban_Events.pdf",
        "10.1371/journal.pone.0309093",
        [
            "https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0309093&type=printable",
        ],
    ),
    "05": (
        "Mefleh_2025_Beyond_the_Norm_Mahalanobis.pdf",
        "10.3390/computers14120561",
        [
            "https://www.mdpi.com/2073-431X/14/12/561/pdf",
            "https://www.mdpi.com/2073-431X/14/12/561/pdf?version=1733827200",
        ],
    ),
    "06": (
        "Garcia_Gonzalez_2022_MILETS_DC-VAE.pdf",
        None,
        ["https://kdd-milets.github.io/milets2022/papers/MILETS_2022_paper_3436.pdf"],
    ),
    "07": (
        "Hua_2022_GenAD.pdf",
        "10.1049/ell2.12683",
        [
            "https://arxiv.org/pdf/2202.04250",
            "https://ietresearch.onlinelibrary.wiley.com/doi/pdfdirect/10.1049/ell2.12683",
        ],
    ),
    "08": (
        "Oguz_2022_Multi_Tiered_Cellular_Networks.pdf",
        "10.1186/s13638-022-02183-7",
        [
            "https://link.springer.com/content/pdf/10.1186/s13638-022-02183-7.pdf",
        ],
    ),
    "09": (
        "Hong_2012_Tiresias.pdf",
        "10.1109/ICDCS.2012.30",
        ["https://arxiv.org/pdf/1203.2163"],
    ),
    "10": (
        "Huang_2026_HYDRA.pdf",
        "10.1145/3802074",
        ["https://arxiv.org/pdf/2406.06373"],
    ),
    "11": (
        "Wolff_2022_Composite_Anomaly_Hierarchical_Search.pdf",
        "10.1109/ISIT50566.2022.9834631",
        ["https://arxiv.org/pdf/2202.10418"],
    ),
    "12": (
        "Pang_2022_Hierarchical_Forecasting_Root_Cause.pdf",
        "10.5220/0010900500003122",
        ["https://www.scitepress.org/Papers/2022/109005/109005.pdf"],
    ),
    "13": (
        "Yeh_2017_Matrix_Profile_Unifying_View.pdf",
        "10.1007/s10618-017-0519-9",
        [
            "https://www.cs.ucr.edu/~eamonn/MP_journal.pdf",
            "https://mcyeh.github.io/paper/2018_dmkd_time_series_joins.pdf",
        ],
    ),
    "14": (
        "Zhu_2016_Matrix_Profile_II.pdf",
        "10.1109/ICDM.2016.0085",
        [
            "https://escholarship.org/content/qt7b4425nr/qt7b4425nr.pdf?t=p1xjma",
        ],
    ),
    "15": (
        "Keogh_2005_HOT_SAX.pdf",
        "10.1109/ICDM.2005.79",
        ["http://www.cs.cuhk.edu.hk/~adafu/Pub/icdm05time.pdf"],
    ),
    "16": (
        "Law_2019_STUMPY.pdf",
        "10.21105/joss.01504",
        ["https://joss.theoj.org/papers/10.21105/joss.01504.pdf"],
    ),
    "17": (
        "Xue_2016_EC_Feature_Selection_Survey.pdf",
        "10.1109/TEVC.2015.2504420",
        [
            "https://homepages.ecs.vuw.ac.nz/~xuebing/Papers/BingsurveyPaper.pdf",
        ],
    ),
    "18": (
        "Linares_Barrera_2024_Evolutionary_FS_Forecasting.pdf",
        "10.1145/3605098.3636191",
        [
            "https://idus.us.es/bitstreams/60759c57-a293-4f1e-82b8-fbe97b5fd2ca/download",
        ],
    ),
    "19": (
        "Yeh_2016_Matrix_Profile_I.pdf",
        "10.1109/ICDM.2016.0179",
        [
            "https://www.cs.ucr.edu/~eamonn/PID4481997_extend_Matrix%20Profile_I.pdf",
            "https://pdfs.semanticscholar.org/a682/71101067d91412bec50d71e1191c9be679fb.pdf",
        ],
    ),
    "20": (
        "Contreras_2024_GA_Financial_Feature_Selection.pdf",
        "10.3390/e26030177",
        [
            "https://europepmc.org/articles/PMC10969137?pdf=render",
            "https://www.mdpi.com/1099-4300/26/3/177/pdf?version=1708423574",
        ],
    ),
    "21": (
        "He_2021_Mining_Anomalies_Subspaces.pdf",
        "10.1007/978-3-030-86514-6_2",
        ["https://jhe16.github.io/files/sub_520.pdf"],
    ),
    "22": (
        "Zhang_2020_Many_Objective_EC_AD_Feature_Selection.pdf",
        "10.1002/cpe.5861",
        [],
    ),
    "23": (
        "Riahi_Madvar_2021_MI_Subspace_Outlier_Detection.pdf",
        "10.1016/j.knosys.2020.106733",
        [],
    ),
    "24": (
        "Li_2022_VAE_GA_Outlier_Detection.pdf",
        "10.3390/a15110429",
        [
            "https://pdfs.semanticscholar.org/ba0d/9725e6357ae666e8acb6061acfceb535652d.pdf",
            "https://www.mdpi.com/1999-4893/15/11/429/pdf",
        ],
    ),
    "25": (
        "Koza_1992_Genetic_Programming_Book.pdf",
        None,
        [],
    ),
    "26": (
        "ONeill_2001_Grammatical_Evolution.pdf",
        "10.1109/4235.942529",
        [
            "https://www.brinckerhoff.org/tmp/grammatica_evolution_ieee_tec_2001.pdf",
        ],
    ),
    "27": (
        "ONeill_2003_Grammatical_Evolution_Book.pdf",
        "10.1007/978-1-4615-0447-4",
        [],
    ),
    "28": (
        "Fenton_2017_PonyGE2.pdf",
        "10.1145/3067695.3082469",
        [
            "https://arxiv.org/pdf/1703.08535",
            "https://raw.githubusercontent.com/PonyGE/PonyGE2/master/doc/PonyGE2.pdf",
        ],
    ),
}


def http_get(url: str, accept: str = "*/*", referer: str | None = None) -> tuple[bytes | None, str, int]:
    headers = {"User-Agent": USER_AGENT, "Accept": accept}
    if referer:
        headers["Referer"] = referer
    req = urllib.request.Request(url, headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = resp.read()
            ctype = resp.headers.get("Content-Type", "")
            return data, ctype, resp.status
    except urllib.error.HTTPError as exc:
        return None, str(exc), exc.code
    except Exception as exc:  # noqa: BLE001
        return None, str(exc), 0


def is_pdf(data: bytes, ctype: str) -> bool:
    if not data or len(data) < 1000:
        return False
    if data[:4] == b"%PDF":
        return True
    return "pdf" in ctype.lower()


def unpaywall_pdf(doi: str) -> str | None:
    url = f"https://api.unpaywall.org/v2/{doi}?email={UNPAYWALL_EMAIL}"
    data, _, status = http_get(url, accept="application/json")
    if status != 200 or not data:
        return None
    try:
        payload = json.loads(data.decode("utf-8"))
    except json.JSONDecodeError:
        return None
    best = payload.get("best_oa_location") or {}
    return best.get("url_for_pdf") or best.get("url")


def semantic_scholar_pdf(doi: str) -> str | None:
    url = (
        "https://api.semanticscholar.org/graph/v1/paper/"
        f"DOI:{urllib.parse.quote(doi)}?fields=openAccessPdf"
    )
    data, _, status = http_get(url, accept="application/json")
    if status != 200 or not data:
        return None
    try:
        payload = json.loads(data.decode("utf-8"))
    except json.JSONDecodeError:
        return None
    oa = payload.get("openAccessPdf") or {}
    return oa.get("url")


def openalex_pdf(doi: str) -> str | None:
    url = f"https://api.openalex.org/works/https://doi.org/{doi}"
    data, _, status = http_get(url, accept="application/json")
    if status != 200 or not data:
        return None
    try:
        payload = json.loads(data.decode("utf-8"))
    except json.JSONDecodeError:
        return None
    best = payload.get("best_oa_location") or {}
    return best.get("pdf_url") or best.get("landing_page_url")


def qut_eprint_pdf(doi: str) -> str | None:
    if doi != "10.1109/TEVC.2015.2504420":
        return None
    page, _, status = http_get("https://eprints.qut.edu.au/210714/", accept="text/html")
    if status != 200 or not page:
        return None
    html = page.decode("utf-8", errors="ignore")
    match = re.search(r'href="([^"]+\.pdf[^"]*)"', html, re.I)
    if match:
        href = match.group(1)
        if href.startswith("/"):
            return "https://eprints.qut.edu.au" + href
        return href
    return None


def discover_urls(doi: str | None, candidates: list[str]) -> list[str]:
    urls = list(candidates)
    if doi:
        for fn in (semantic_scholar_pdf, unpaywall_pdf, openalex_pdf, qut_eprint_pdf):
            found = fn(doi)
            if found and found not in urls:
                urls.append(found)
            time.sleep(0.25)
    return urls


def try_download(url: str) -> bytes | None:
    referer = None
    if "mdpi.com" in url:
        referer = url.replace("/pdf", "")
    data, ctype, status = http_get(url, accept="application/pdf", referer=referer)
    if status == 200 and data and is_pdf(data, ctype):
        return data
    return None


def main() -> None:
    for folder, _title, _nums in SECTIONS:
        os.makedirs(os.path.join(OUT_DIR, folder), exist_ok=True)
    manifest: dict[str, dict] = {}

    for art_id, (basename, doi, candidates) in ARTICLES.items():
        num = int(art_id)
        rel = pdf_relpath(num)
        if not rel:
            rel = basename
        dest = os.path.join(OUT_DIR, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        flat_legacy = os.path.join(OUT_DIR, basename)
        entry = {
            "filename": rel,
            "doi": doi,
            "status": "pending",
            "source_url": None,
            "error": None,
        }

        existing = dest if os.path.exists(dest) else flat_legacy
        if os.path.exists(existing) and os.path.getsize(existing) > 10000:
            with open(existing, "rb") as f:
                if f.read(4) == b"%PDF":
                    if existing != dest:
                        os.makedirs(os.path.dirname(dest), exist_ok=True)
                        os.replace(existing, dest)
                    entry["status"] = "skipped_existing"
                    manifest[art_id] = entry
                    print(f"[{art_id}] skip existing {rel}")
                    continue

        urls = discover_urls(doi, candidates)
        downloaded = False
        for url in urls:
            print(f"[{art_id}] trying {url}")
            data = try_download(url)
            if data:
                with open(dest, "wb") as f:
                    f.write(data)
                entry["status"] = "downloaded"
                entry["source_url"] = url
                print(f"[{art_id}] OK -> {rel} ({len(data)} bytes)")
                downloaded = True
                break
            time.sleep(0.4)

        if not downloaded:
            if art_id in {"25", "27"}:
                entry["status"] = "unavailable"
                entry["error"] = "Book; no legal open PDF found automatically"
            else:
                entry["status"] = "failed"
                entry["error"] = "No open PDF found via direct URLs, Semantic Scholar, Unpaywall, or OpenAlex"
            print(f"[{art_id}] {entry['status'].upper()} {rel}")

        manifest[art_id] = entry
        time.sleep(0.3)

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    ok = sum(
        1
        for v in manifest.values()
        if v["status"] in {"downloaded", "skipped_existing"}
    )
    unavailable = sum(1 for v in manifest.values() if v["status"] == "unavailable")
    fail = sum(1 for v in manifest.values() if v["status"] == "failed")
    print(f"\nDone: {ok} available, {unavailable} books unavailable, {fail} failed.")
    print(f"Manifest: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
