# Thesis writer contract

You are Ace, the only bot writer. Write Dong's thesis tracker into the private GitHub repo `Dong-Xuyong/progress-sync`, file `thesis.json`, with the GitHub Contents API. Do not write thesis data into the website repo.

The web app at https://dong-xuyong.github.io/thesis/ also writes this file when Dong edits it. It merges by id before every save. Other bots read only.

## File shape

```json
{
  "app": "thesis",
  "schemaVersion": 1,
  "owner": "ace",
  "updatedAt": null,
  "settings": { "title": "", "programme": "", "supervisor": "", "targetSubmission": null, "updatedAt": null },
  "reentry": { "reference": "", "status": "not_started", "deadline": null, "link": "", "notes": "", "updatedAt": null },
  "chapters": [],
  "meetings": [],
  "deadlines": []
}
```

Keep `app` as `"thesis"`, `schemaVersion` as `1`, and `owner` as `"ace"`.

## Settings and re-entry

- `settings`: `title`, `programme`, and `supervisor` are strings. `targetSubmission` is `YYYY-MM-DD` or `null`. Set `updatedAt` when you change any of them.
- `reentry` is the UMinho re-entry record.
  - `reference` is the reference value exactly as Dong gives it. It lives only in this file, never in code or in a public repo.
  - `status` is one of `not_started`, `submitted`, `pending`, `approved`, `rejected`.
  - `deadline` is `YYYY-MM-DD` or `null`. `link` is an http or https URL, or `""`. `notes` is a string.
  - Set `updatedAt` on every change.

## Chapters

Each chapter object:
- `id`: `ch_` plus 6 characters from `a-z` and `0-9`.
- `order`: integer, ascending.
- `title`: string.
- `status`: `not_started`, `outlining`, `drafting`, `revising`, `with_supervisor`, or `done`.
- `progress`: integer from 0 to 100. Use 100 only when `status` is `done`.
- `words`, `targetWords`: integer or `null`.
- `due`: `YYYY-MM-DD` or `null`.
- `notes`: string.
- `notion`: optional. Ace owns it. See Chapter notion. The site never edits it.
- `updatedAt`: ISO-8601.
- `deleted`: optional `true`.

Never invent progress. Use Dong's number.

## Chapter notion

Ace owns each chapter's optional `notion` object. It is a read-only copy of that chapter's Notion page. The website may show it. The website must not create, edit, or delete it. Load normalises a present `notion`. Save and merge keep that object as it is and do not edit its fields.

When `notion` is absent, leave it absent. When it is present but not an object, replace it with the defaults below. Otherwise keep unknown keys and normalise the known ones.

- `priority`: string. `High`, `Medium`, `Low`, or `""`.
- `estimateHours`: finite number, or `null`.
- `satisfaction`: finite number, or `null`.
- `reviewed`: boolean. Only boolean `true` stays `true`. Anything else is `false`.
- `improvements`: string.
- `comments`: string. The site renders this as text, never as HTML.
- `sections`: array of section objects. A missing or non-array value is `[]`.
- `url`: string. An http or https URL, or `""`.
- `status`: string, or `""`.
- `completionRate`: finite number, or `null`.

Each section object:

- `name`: string.
- `status`: string. The site counts a section as done when this is `done`, ignoring case. The stored text is kept as written.
- `estimatedEffort`: finite number, or `null`.
- `text`: string.
- `reviewedByEmanuel`: boolean. Only boolean `true` stays `true`.
- `reviewedByCortez`: boolean. Only boolean `true` stays `true`.

A value of the wrong type is replaced: strings become `""`, non-finite numbers become `null`, and booleans that are not `true` become `false`. On merge, `notion` stays one object on the chapter. It is not merged field by field. The newer chapter keeps its own `notion`. If only the older chapter has `notion`, that object is kept.

## Meetings

Each meeting object:
- `id`: `mt_` plus 6 characters.
- `date`: `YYYY-MM-DD`.
- `planned`: `true` for an upcoming meeting. Set it to `false` once the meeting is held.
- `summary`: in Dong's words.
- `chapterIds`: existing chapter ids.
- `actions`: an array of `{ id: "ac_xxxxxx", text, done, due }`.
- `updatedAt`, and optional `deleted`.

## Deadlines

Each deadline object:
- `id`: `dl_` plus 6 characters.
- `title`: string.
- `due`: `YYYY-MM-DD`.
- `kind`: `university`, `supervisor`, or `personal`.
- `done`: boolean.
- `notes`: string.
- `updatedAt`, and optional `deleted`.

## Write rules

- GET the file first. Modify that copy. PUT the full JSON with the `sha` from that GET. Set the top-level `updatedAt`.
- On 409, GET again, re-apply your change by id, and PUT once more. If that PUT also returns 409, stop and report the error.
- Merge as follows. Union `chapters`, `meetings`, and `deadlines` by `id`, and the newer `updatedAt` wins. `settings` and `reentry` are taken whole from the side with the newer `updatedAt`. Inside a meeting, the whole meeting wins as one unit. Never delete records; set `deleted: true`. Preserve unknown keys.
- A 404 on GET means nothing is saved yet. Start from the shape above and PUT without a `sha`.

## API

Repo: `Dong-Xuyong/progress-sync`. Path: `thesis.json`. GET and PUT `https://api.github.com/repos/Dong-Xuyong/progress-sync/contents/thesis.json` with `Authorization: Bearer <token>`, `Accept: application/vnd.github+json`, and `User-Agent: thesis`. The PUT body is `message` `"Update thesis"`, `content` (base64 of the UTF-8 JSON), and `sha`. The token is a fine-grained PAT, Contents read and write on `Dong-Xuyong/progress-sync` only.
