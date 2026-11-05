#!/usr/bin/env bash
# Fresh XeLaTeX + Biber build for the dissertation.
# Deletes main.bbl first so a stale bibliography is not reused.
set -euo pipefail
cd "$(dirname "$0")"
rm -f main.bbl main.bcf main.run.xml main.blg
xelatex -interaction=nonstopmode -halt-on-error -file-line-error main.tex
biber main
xelatex -interaction=nonstopmode -halt-on-error -file-line-error main.tex
xelatex -interaction=nonstopmode -halt-on-error -file-line-error main.tex
