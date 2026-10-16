# Thesis

A mobile-first tracker for a thesis: chapters, supervisor meetings, deadlines, and the UMinho re-entry reference.

The live app is [https://dong-xuyong.github.io/thesis/](https://dong-xuyong.github.io/thesis/). It is a static site with no build step. This repo holds the app, not the thesis file.

## Data

The app reads and writes one file, `thesis.json`, in the private repo `Dong-Xuyong/progress-sync`. The browser reaches that file only through the vendored `GhSync` helper. The token stays in `localStorage` under `dong-gh-sync`, the same key the other apps on this site already use. Do not put the token, or a copy of `thesis.json`, in this repo.

The re-entry reference value lives only in that private file. The screen labels the field UMinho re-entry reference.

With no token, the app opens in demo mode and shows a Demo data banner. Demo edits stay in the tab and are never saved.

`thesis.seed.json` is the empty document. The first real edit creates `thesis.json` from it when the file is not there yet.

## Views

- Overview: progress, submission countdown, the next deadlines, the next planned meeting, open actions, and the re-entry card
- Chapters: ordered list, progress, and an editor
- Meetings: planned meetings first, then past meetings, with an actions checklist
- Deadlines: open items by date, done items collapsed
- Settings: title, programme, supervisor, submission date, and every re-entry field

## Checks

```sh
node tests/core.test.mjs
```

## First real save

Open the live page, connect sync, add one record, and confirm `thesis.json` appears in `Dong-Xuyong/progress-sync` with `"app": "thesis"`, `"schemaVersion": 1`, and `"owner": "ace"`.
