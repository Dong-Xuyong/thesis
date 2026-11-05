import json

import os

import re

import sys



sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from literature_pdf_layout import PDF_ROOT_NAME, pdf_by_article_str_keys, pdf_relpath



base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

check_path = os.path.join(base, "Literature Review Check.md")

map_path = os.path.join(base, "Literature Review Article Map.md")

if not os.path.exists(check_path) or not os.path.exists(map_path):
    sys.exit(
        "Literature Review Check.md and Literature Review Article Map.md were removed. "
        "Maintain articles in Literature Review Articles/ and wiki essay/sources/ directly."
    )

pdf_dir = os.path.join(base, PDF_ROOT_NAME)

manifest_path = os.path.join(pdf_dir, "download_manifest.json")

out_dir = os.path.join(base, "Literature Review Articles")

os.makedirs(out_dir, exist_ok=True)



PDF_BY_ARTICLE = pdf_by_article_str_keys()



manifest = {}

if os.path.exists(manifest_path):

    manifest = json.load(open(manifest_path, encoding="utf-8"))



check_text = open(check_path, encoding="utf-8").read()

map_text = open(map_path, encoding="utf-8").read()



map_list = []

for line in map_text.splitlines():

    if not line.startswith("|"):

        continue

    if line.startswith("| Literature review section"):

        continue

    if line.startswith("| ---"):

        continue

    parts = [p.strip() for p in line.strip("|").split("|")]

    if len(parts) < 7:

        continue

    section, article, link_cell, apa, application, results, why = parts[:7]

    if section == "Literature review section":

        continue

    link = re.search(r"\((https?://[^)]+)\)", link_cell)

    map_list.append(

        {

            "section": section,

            "article": article,

            "link": link.group(1) if link else link_cell,

            "apa": apa,

            "application": application,

            "results": results,

            "why": why,

        }

    )



check_rows = {}

for line in check_text.splitlines():

    m = re.match(r"^\| (\d+)\s+\| (.+)\|$", line)

    if not m:

        continue

    num = m.group(1)

    parts = [p.strip() for p in m.group(2).split("|")]

    if len(parts) < 6:

        continue

    section, article, link_cell, include, key_results, what_to_put = parts[:6]

    link = re.search(r"\((https?://[^)]+)\)", link_cell)

    check_rows[num] = {

        "section": section,

        "article": article,

        "link": link.group(1) if link else link_cell,

        "include": include,

        "key_results": key_results,

        "what_to_put": what_to_put,

    }





def pdf_line(num: str) -> list[str]:

    rel = PDF_BY_ARTICLE.get(num)

    if rel and os.path.exists(os.path.join(pdf_dir, rel)):

        link = "../Literature%20Review%20PDFs/" + rel.replace(" ", "%20").replace("\\", "/")

        basename = os.path.basename(rel)

        return [f"**Local PDF:** [{basename}]({link})", ""]

    entry = manifest.get(num.zfill(2), {})

    status = entry.get("status")

    if status == "unavailable":

        return ["**Local PDF:** Not available (book; purchase or library access required)", ""]

    if status == "failed":

        return [

            "**Local PDF:** Not downloaded (paywalled or no open-access copy found)",

            "",

            "**DOI / link:** use the article link above",

            "",

        ]

    if status == "manual_import" and rel:

        folder = os.path.dirname(rel)

        return [

            f"**Local PDF:** expected at `{rel}` (add file manually)",

            "",

        ]

    return ["**Local PDF:** —", ""]





extra_notes = {

    "1": """## Notes from local PDF



- **Method:** DC-VAE (Dilated Convolutional VAE); single multivariate model over 12 fixed ISP KPIs; causal sliding window (T=512 calibrated on TELCO).

- **TELCO dataset:** ~750k samples, 7 months, 5-min granularity, 12 time series, NOC expert labels at each series; publicly released with code (https://github.com/GastonGarciaGonzalez/DC-VAE).

- **Evaluation:** Range-based metrics R_r, P_r, F1_r (Tatbul et al.); alpha threshold tuned on training/validation to maximise F1.

- **Benchmarks:** 18 traditional detectors (+ ENS-15 ensemble), S-EXPS, ARIMA, S-VAE; also SWaT with GAN baselines.

- **Authors' finding:** Real in-the-wild telecom detection is much harder than benchmark datasets; F1_r ~60% on 8/12 series; DC-VAE similar on average to S-EXPS/ARIMA but multivariate in one model; S-VAE substantially worse.

- **Thesis gap:** Fixed 12-series view chosen before detection; does not search which aggregation/view to monitor.""",

}



for num in sorted(check_rows.keys(), key=int):

    chk = check_rows[num]

    idx = int(num) - 1

    mp = map_list[idx] if idx < len(map_list) else {}



    lines = [

        f"# Article {num}",

        "",

        f"**Section:** {chk['section']}",

        "",

        f"**Article:** {chk['article']}",

        "",

        f"**Include?** {chk['include']}",

        "",

        f"**Link:** {chk['link']}",

        "",

    ]

    lines.extend(pdf_line(num))

    if mp.get("apa"):

        lines.extend(["## APA citation", "", mp["apa"], ""])

    if mp.get("application"):

        lines.extend(["## Application in the paper", "", mp["application"], ""])

    if mp.get("results"):

        lines.extend(["## Reported quantified results", "", mp["results"], ""])

    if mp.get("why"):

        lines.extend(["## Why useful for this literature review", "", mp["why"], ""])

    lines.extend(

        [

            "## Key results to cite",

            "",

            chk["key_results"],

            "",

            "## What to put in your literature review",

            "",

            chk["what_to_put"],

            "",

        ]

    )

    if num in extra_notes:

        lines.extend([extra_notes[num], ""])



    with open(os.path.join(out_dir, f"{num}.md"), "w", encoding="utf-8") as f:

        f.write("\n".join(lines))



readme = [

    "# Literature Review Articles",

    "",

    "Per-article working notes for Chapter 3. Each file corresponds to a wiki source in "

    "[wiki essay/sources/](../wiki%20essay/sources/) and a section in "

    "[Literature Review - Dellmified Draft.md](../Literature%20Review%20-%20Dellmified%20Draft.md).",

    "",

    "| # | Article | Section | PDF |",

    "| --- | --- | --- | --- |",

]

for num in sorted(check_rows.keys(), key=int):

    chk = check_rows[num]

    title = re.sub(r"^[^—]+—\s*", "", chk["article"]).strip("* ")

    rel = PDF_BY_ARTICLE.get(num)

    has_pdf = rel and os.path.exists(os.path.join(pdf_dir, rel))

    pdf = "Yes" if has_pdf else "—"

    readme.append(f"| [{num}]({num}.md) | {title} | {chk['section']} | {pdf} |")

readme.extend(

    [

        "",

        "## PDFs",

        "",

        "Organised by section in [Literature Review PDFs/](../Literature%20Review%20PDFs/).",

        "",

    ]

)

with open(os.path.join(out_dir, "README.md"), "w", encoding="utf-8") as f:

    f.write("\n".join(readme))



print(f"Created {len(check_rows)} article files + README in {out_dir}")

