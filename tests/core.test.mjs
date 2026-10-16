/**
 * Thesis core tests. Never calls the real GitHub API.
 * Run: node tests/core.test.mjs
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import {
  APP_ID,
  NOT_SAVED,
  SCHEMA_VERSION,
  applyChapterPatch,
  countdownLabel,
  daysLeft,
  deadlineBadge,
  emptyDoc,
  merge,
  newId,
  nextMeeting,
  normalize,
  openActions,
  overallProgress,
  progressIsWeighted,
  safeHttpUrl,
  saveWithRetry,
  toggleAction,
} from "../core.js";
import { demoDoc } from "../demo.js";

const seed = JSON.parse(fs.readFileSync(new URL("../thesis.seed.json", import.meta.url), "utf8"));

function chapter(id, updatedAt, extra) {
  return Object.assign({
    id: id,
    order: 1,
    title: "EXAMPLE Chapter",
    status: "drafting",
    progress: 10,
    updatedAt: updatedAt,
  }, extra || {});
}

assert.deepEqual(emptyDoc(), seed);
assert.deepEqual(normalize(seed), seed);
assert.equal(normalize(null).app, "thesis");
assert.equal(normalize(null).owner, "ace");
assert.equal(normalize(null).schemaVersion, 1);
assert.deepEqual(normalize({ notebook: "keep" }).notebook, "keep");

const messy = normalize({
  schemaVersion: 2,
  chapters: [{
    id: "ch_abc123",
    order: "2",
    title: "Kept",
    status: "nope",
    progress: 140,
    words: "12",
    targetWords: -4,
    due: "2026-13-01",
    source: "bot",
    updatedAt: "2026-01-01T00:00:00.000Z",
    deleted: true,
  }],
});
assert.equal(messy.schemaVersion, 2);
assert.equal(messy.chapters[0].status, "not_started");
assert.equal(messy.chapters[0].progress, 100);
assert.equal(messy.chapters[0].order, 2);
assert.equal(messy.chapters[0].words, 12);
assert.equal(messy.chapters[0].targetWords, null);
assert.equal(messy.chapters[0].due, null);
assert.equal(messy.chapters[0].source, "bot");
assert.equal(messy.chapters[0].deleted, true);
assert.equal(normalize({ owner: "other" }).owner, "ace");

function notionSample(extra) {
  return Object.assign({
    priority: "High",
    estimateHours: 8,
    satisfaction: 40,
    reviewed: true,
    improvements: "EXAMPLE Tighten the opening",
    comments: "EXAMPLE Line one\nEXAMPLE Line two",
    sections: [
      {
        name: "EXAMPLE Claim",
        status: "Done",
        estimatedEffort: 2,
        text: "EXAMPLE Drafted",
        reviewedByEmanuel: true,
        reviewedByCortez: false,
      },
    ],
    url: "https://example.com/notion/opening",
    status: "In progress",
    completionRate: 0.5,
  }, extra || {});
}

const rawNotion = notionSample();
const rawDoc = { chapters: [{ id: "ch_raw001", notion: rawNotion }] };
const loadedNotion = normalize(rawDoc);
assert.deepEqual(loadedNotion.chapters[0].notion, rawNotion);
assert.deepEqual(normalize(loadedNotion).chapters[0].notion, rawNotion);
loadedNotion.chapters[0].notion.priority = "Low";
loadedNotion.chapters[0].notion.sections[0].name = "changed";
assert.equal(rawNotion.priority, "High");
assert.equal(rawNotion.sections[0].name, "EXAMPLE Claim");
assert.equal(JSON.parse(JSON.stringify(normalize(rawDoc))).chapters[0].notion.comments, "EXAMPLE Line one\nEXAMPLE Line two");

const notionMessy = normalize({
  chapters: [{
    id: "ch_notion",
    notion: {
      priority: 4,
      estimateHours: "8",
      satisfaction: Number.NaN,
      reviewed: "yes",
      improvements: null,
      comments: 12,
      sections: [
        null,
        "nope",
        {
          name: 1,
          status: false,
          estimatedEffort: "3",
          text: {},
          reviewedByEmanuel: 1,
          reviewedByCortez: "yes",
          extra: "keep-section",
        },
      ],
      url: { href: "https://example.com" },
      status: true,
      completionRate: Number.POSITIVE_INFINITY,
      shelf: "keep-notion",
    },
  }],
});
const badNotion = notionMessy.chapters[0].notion;
assert.equal(badNotion.priority, "");
assert.equal(badNotion.estimateHours, null);
assert.equal(badNotion.satisfaction, null);
assert.equal(badNotion.reviewed, false);
assert.equal(badNotion.improvements, "");
assert.equal(badNotion.comments, "");
assert.equal(badNotion.url, "");
assert.equal(badNotion.status, "");
assert.equal(badNotion.completionRate, null);
assert.equal(badNotion.shelf, "keep-notion");
assert.equal(badNotion.sections.length, 1);
assert.equal(badNotion.sections[0].name, "");
assert.equal(badNotion.sections[0].status, "");
assert.equal(badNotion.sections[0].estimatedEffort, null);
assert.equal(badNotion.sections[0].text, "");
assert.equal(badNotion.sections[0].reviewedByEmanuel, false);
assert.equal(badNotion.sections[0].reviewedByCortez, false);
assert.equal(badNotion.sections[0].extra, "keep-section");
assert.equal("notion" in normalize({ chapters: [{ id: "ch_none01" }] }).chapters[0], false);
assert.deepEqual(normalize({ chapters: [{ id: "ch_empty1", notion: null }] }).chapters[0].notion, {
  priority: "",
  estimateHours: null,
  satisfaction: null,
  reviewed: false,
  improvements: "",
  comments: "",
  sections: [],
  url: "",
  status: "",
  completionRate: null,
});

const local = {
  app: "thesis",
  schemaVersion: 1,
  owner: "ace",
  updatedAt: "2026-10-16T12:00:00.000Z",
  settings: {
    title: "EXAMPLE Local title",
    programme: "EXAMPLE Local programme",
    supervisor: "EXAMPLE Local supervisor",
    targetSubmission: null,
    updatedAt: "2026-10-16T10:00:00.000Z",
    shelf: "local-only",
  },
  reentry: {
    reference: "EXAMPLE-LOCAL",
    status: "not_started",
    deadline: null,
    link: "",
    notes: "local note",
    updatedAt: "2026-10-16T09:00:00.000Z",
  },
  chapters: [
    chapter("ch_local1", "2026-10-16T12:00:00.000Z", {
      title: "EXAMPLE Edited chapter",
      progress: 40,
      status: "drafting",
    }),
  ],
  meetings: [
    {
      id: "mt_local1",
      date: "2026-10-10",
      planned: false,
      summary: "EXAMPLE Local meeting",
      chapterIds: [],
      actions: [
        { id: "ac_local1", text: "EXAMPLE One", done: false },
        { id: "ac_local2", text: "EXAMPLE Two", done: true },
      ],
      room: "local-room",
      updatedAt: "2026-10-16T08:00:00.000Z",
    },
  ],
  deadlines: [],
  notebook: "local-note",
};
const remote = {
  app: "thesis",
  schemaVersion: 1,
  owner: "ace",
  updatedAt: "2026-10-16T11:00:00.000Z",
  settings: {
    title: "EXAMPLE Remote title",
    programme: "EXAMPLE Remote programme",
    supervisor: "EXAMPLE Remote supervisor",
    targetSubmission: "2026-12-01",
    updatedAt: "2026-10-16T08:00:00.000Z",
    drawer: "remote-only",
  },
  reentry: {
    reference: "EXAMPLE-REMOTE",
    status: "submitted",
    deadline: "2026-11-01",
    link: "https://example.com/old",
    notes: "remote note",
    updatedAt: "2026-10-16T15:00:00.000Z",
    ticket: "remote-ticket",
  },
  chapters: [
    chapter("ch_local1", "2026-10-16T08:00:00.000Z", {
      title: "EXAMPLE Old chapter",
      progress: 10,
      botNote: "keep-me",
    }),
  ],
  meetings: [
    {
      id: "mt_local1",
      date: "2026-10-11",
      planned: true,
      summary: "EXAMPLE Remote meeting",
      chapterIds: ["ch_local1"],
      actions: [{ id: "ac_remote", text: "EXAMPLE Remote action", done: false }],
      updatedAt: "2026-10-16T16:00:00.000Z",
    },
  ],
  deadlines: [
    {
      id: "dl_bot001",
      title: "EXAMPLE Bot deadline",
      due: "2026-11-02",
      kind: "university",
      done: false,
      updatedAt: "2026-10-16T11:00:00.000Z",
    },
  ],
  margin: "remote-note",
};

const localSnap = JSON.parse(JSON.stringify(local));
const remoteSnap = JSON.parse(JSON.stringify(remote));
const merged = merge(local, remote);
assert.deepEqual(local, localSnap);
assert.deepEqual(remote, remoteSnap);
assert.equal(merged.chapters.length, 1);
assert.equal(merged.chapters[0].title, "EXAMPLE Edited chapter");
assert.equal(merged.chapters[0].progress, 40);
assert.equal(merged.chapters[0].botNote, "keep-me");
assert.equal(merged.deadlines.length, 1);
assert.equal(merged.deadlines[0].id, "dl_bot001");
assert.equal(merged.settings.title, "EXAMPLE Local title");
assert.equal(merged.settings.programme, "EXAMPLE Local programme");
assert.equal(merged.settings.shelf, "local-only");
assert.equal(merged.settings.drawer, "remote-only");
assert.equal(merged.reentry.reference, "EXAMPLE-REMOTE");
assert.equal(merged.reentry.status, "submitted");
assert.equal(merged.reentry.notes, "remote note");
assert.equal(merged.reentry.ticket, "remote-ticket");
assert.equal(merged.meetings[0].summary, "EXAMPLE Remote meeting");
assert.equal(merged.meetings[0].actions.length, 1);
assert.equal(merged.meetings[0].actions[0].id, "ac_remote");
assert.equal(merged.meetings[0].room, "local-room");
assert.equal(merged.notebook, "local-note");
assert.equal(merged.margin, "remote-note");
assert.equal(merged.updatedAt, "2026-10-16T12:00:00.000Z");
assert.equal(merged.schemaVersion, 1);

const carried = merge(
  { chapters: [chapter("ch_carry1", "2026-10-16T12:00:00.000Z", { title: "EXAMPLE Edited chapter" })] },
  { chapters: [chapter("ch_carry1", "2026-10-16T08:00:00.000Z", {
    notion: { priority: "Medium", comments: "EXAMPLE Keep me", estimateHours: 3, reviewed: true },
  })] }
);
assert.equal(carried.chapters[0].title, "EXAMPLE Edited chapter");
assert.equal(carried.chapters[0].notion.priority, "Medium");
assert.equal(carried.chapters[0].notion.comments, "EXAMPLE Keep me");
assert.equal(carried.chapters[0].notion.estimateHours, 3);
assert.equal("improvements" in carried.chapters[0].notion, false);
const carriedNorm = normalize(carried);
assert.equal(carriedNorm.chapters[0].notion.priority, "Medium");
assert.equal(carriedNorm.chapters[0].notion.comments, "EXAMPLE Keep me");
assert.equal(carriedNorm.chapters[0].notion.estimateHours, 3);
assert.equal(carriedNorm.chapters[0].notion.reviewed, true);
assert.equal(carriedNorm.chapters[0].notion.improvements, "");
assert.deepEqual(carriedNorm.chapters[0].notion.sections, []);

const swapped = merge(
  { chapters: [chapter("ch_swap01", "2026-10-16T08:00:00.000Z", {
    notion: { priority: "Low", comments: "EXAMPLE Old", shelf: "local" },
  })] },
  { chapters: [chapter("ch_swap01", "2026-10-16T12:00:00.000Z", {
    notion: { priority: "High", comments: "EXAMPLE New" },
  })] }
);
assert.equal(swapped.chapters[0].notion.priority, "High");
assert.equal(swapped.chapters[0].notion.comments, "EXAMPLE New");
assert.equal("shelf" in swapped.chapters[0].notion, false);
assert.deepEqual(normalize(swapped).chapters[0].notion.priority, "High");
assert.equal(normalize(swapped).chapters[0].notion.comments, "EXAMPLE New");

const offset = merge(
  { chapters: [chapter("ch_same01", "2026-10-16T12:00:00+01:00", { title: "EXAMPLE Earlier" })] },
  { chapters: [chapter("ch_same01", "2026-10-16T11:30:00Z", { title: "EXAMPLE Later instant" })] }
);
assert.equal(offset.chapters[0].title, "EXAMPLE Later instant");

const tombstone = merge(
  { chapters: [chapter("ch_dead01", "2026-10-01T00:00:00.000Z", { title: "EXAMPLE Live" })] },
  { chapters: [chapter("ch_dead01", "2026-10-02T00:00:00.000Z", { title: "EXAMPLE Live", deleted: true })] }
);
assert.equal(tombstone.chapters[0].deleted, true);
assert.equal(tombstone.chapters.length, 1);

const bumped = merge(
  { schemaVersion: 1, updatedAt: "2026-10-16T12:00:00.000Z", log: { "2026-10-01": { updatedAt: "2026-10-02T00:00:00.000Z", n: 1 } } },
  { schemaVersion: 3, updatedAt: "2026-10-16T18:00:00.000Z", log: {
    "2026-10-01": { updatedAt: "2026-10-03T00:00:00.000Z", n: 2 },
    "2026-10-02": { updatedAt: "2026-10-02T00:00:00.000Z", n: 3 },
  } }
);
assert.equal(bumped.schemaVersion, 3);
assert.equal(bumped.updatedAt, "2026-10-16T18:00:00.000Z");
assert.equal(bumped.log["2026-10-01"].n, 2);
assert.equal(bumped.log["2026-10-02"].n, 3);

const weighted = {
  chapters: [
    { progress: 50, targetWords: 1000 },
    { progress: 100, targetWords: 3000 },
    { progress: 0, targetWords: null, deleted: true },
  ],
};
assert.equal(overallProgress(weighted), 87.5);
assert.equal(progressIsWeighted(weighted), true);
const unweighted = {
  chapters: [
    { progress: 20, targetWords: 1000 },
    { progress: 80, targetWords: null },
  ],
};
assert.equal(overallProgress(unweighted), 50);
assert.equal(progressIsWeighted(unweighted), false);
assert.equal(overallProgress({ chapters: [] }), null);
assert.equal(overallProgress({ chapters: [{ progress: 30, targetWords: 10, deleted: true }] }), null);

const now = new Date("2026-10-16T12:00:00.000Z");
assert.equal(daysLeft("2026-10-26", new Date("2026-10-24T12:00:00.000Z")), 2);
assert.equal(daysLeft("2026-10-26", new Date("2026-10-25T00:30:00.000Z")), 1);
assert.equal(daysLeft("2026-10-26", new Date("2026-10-25T01:30:00.000Z")), 1);
assert.equal(daysLeft("2026-10-25", new Date("2026-10-24T23:30:00.000Z")), 0);
assert.equal(daysLeft("2026-10-17", new Date("2026-10-16T23:30:00.000Z")), 0);
assert.equal(daysLeft("2026-10-17", new Date("2026-10-16T22:30:00.000Z")), 1);
assert.equal(daysLeft("nope", now), null);
assert.equal(countdownLabel(null, now), "No submission date");
assert.equal(countdownLabel("2026-10-16", now), "Submission day");
assert.equal(countdownLabel("2026-10-17", now), "1 day left");
assert.equal(countdownLabel("2026-10-15", now), "1 day overdue");
assert.deepEqual(deadlineBadge("2026-10-23", now), { days: 7, text: "7d", soon: true });
assert.equal(deadlineBadge("2026-10-24", now).soon, false);
assert.equal(deadlineBadge("2026-10-16", now).text, "Today");
assert.equal(deadlineBadge("2026-10-14", now).soon, true);

const meetings = {
  meetings: [
    { id: "mt_past01", date: "2026-10-01", planned: true, actions: [] },
    { id: "mt_fut002", date: "2026-10-18", planned: true, actions: [{ done: false }, { done: true }] },
    { id: "mt_fut001", date: "2026-10-20", planned: true, actions: [] },
    { id: "mt_held01", date: "2026-10-17", planned: false, actions: [{ done: false }] },
    { id: "mt_del001", date: "2026-10-16", planned: true, deleted: true, actions: [{ done: false }] },
  ],
};
assert.equal(nextMeeting(meetings, now).id, "mt_fut002");
assert.equal(openActions(meetings), 2);
assert.equal(nextMeeting({ meetings: [{ id: "mt_old001", date: "2026-10-01", planned: true }] }, now), null);

const toggled = {
  updatedAt: "2026-01-01T00:00:00.000Z",
  meetings: [{
    id: "mt_tick01",
    updatedAt: "2026-01-01T00:00:00.000Z",
    actions: [{ id: "ac_tick01", text: "EXAMPLE Send the outline", done: false }],
  }],
};
assert.equal(toggleAction(toggled, "mt_tick01", "ac_tick01", true, "2026-10-16T12:30:00.000Z"), true);
assert.equal(toggled.meetings[0].actions[0].done, true);
assert.equal(toggled.meetings[0].updatedAt, "2026-10-16T12:30:00.000Z");
assert.equal(toggled.updatedAt, "2026-10-16T12:30:00.000Z");
assert.equal(openActions(toggled), 0);
assert.equal(toggleAction(toggled, "mt_tick01", "ac_tick01", true, "2026-10-16T13:00:00.000Z"), false);

const patched = { status: "drafting", progress: 40 };
applyChapterPatch(patched, { progress: 100 });
assert.equal(patched.status, "done");
assert.equal(patched.progress, 100);
applyChapterPatch(patched, { status: "revising" });
assert.equal(patched.status, "revising");
assert.equal(patched.progress, 99);

const seen = new Set(["ch_aaaaaa"]);
const freshId = newId("ch", seen);
assert.match(freshId, /^ch_[a-z0-9]{6}$/);
assert.equal(seen.has(freshId), false);
assert.match(newId("dl", []), /^dl_[a-z0-9]{6}$/);
assert.match(newId("mt", []), /^mt_[a-z0-9]{6}$/);
assert.match(newId("ac", []), /^ac_[a-z0-9]{6}$/);

assert.equal(safeHttpUrl("https://example.com/reentry"), "https://example.com/reentry");
assert.equal(safeHttpUrl("http://example.com"), "http://example.com/");
assert.equal(safeHttpUrl("javascript:alert(1)"), null);
assert.equal(safeHttpUrl("notes"), null);
assert.equal(safeHttpUrl(""), null);

const demo = demoDoc(now);
assert.equal(demo.chapters.length, 4);
assert.equal(demo.meetings.length, 2);
assert.equal(demo.meetings.filter(function (meeting) { return meeting.planned; }).length, 1);
assert.equal(demo.deadlines.length, 3);
assert.equal(demo.reentry.reference, "EXAMPLE-0000");
assert.equal(nextMeeting(demo, now).id, "mt_exaa02");
assert.equal(openActions(demo), 2);
assert.equal(progressIsWeighted(demo), true);
assert.equal(overallProgress(demo), 25);
demo.chapters.forEach(function (item) { assert.ok(item.title.startsWith("EXAMPLE")); });
demo.chapters.forEach(function (item) {
  if (!item.notion) return;
  const once = normalize({ chapters: [item] }).chapters[0].notion;
  const twice = normalize({ chapters: [{ notion: once }] }).chapters[0].notion;
  assert.deepEqual(twice, once);
  assert.equal(once.priority, item.notion.priority);
  assert.equal(once.comments, item.notion.comments);
});
assert.equal(demo.chapters[2].notion, undefined);
demo.deadlines.forEach(function (item) { assert.ok(item.title.startsWith("EXAMPLE")); });
demo.meetings.forEach(function (item) { assert.ok(item.summary.startsWith("EXAMPLE")); });
assert.equal(JSON.stringify(demo).toLowerCase().includes("umin" + "ho"), false);
assert.equal(deadlineBadge(demo.deadlines[0].due, now).soon, true);

const memory = new Map();
const localStorage = {
  getItem(key) { return memory.has(key) ? memory.get(key) : null; },
  setItem(key, value) { memory.set(key, String(value)); },
  removeItem(key) { memory.delete(key); },
};
const calls = [];
let handler = async function () { throw new Error("fetch not stubbed"); };
const confirms = [];
const prompts = [];

function encodeContent(data) {
  return Buffer.from(unescape(encodeURIComponent(JSON.stringify(data))), "binary").toString("base64");
}
function decodeContent(b64) {
  return JSON.parse(decodeURIComponent(escape(Buffer.from(String(b64).replace(/\s/g, ""), "base64").toString("binary"))));
}
function response(status, body) {
  return {
    status: status,
    ok: status >= 200 && status < 300,
    json: async function () { return body; },
  };
}

const context = vm.createContext({
  localStorage: localStorage,
  console: console,
  JSON: JSON,
  Object: Object,
  Array: Array,
  Error: Error,
  Promise: Promise,
  Date: Date,
  String: String,
  Number: Number,
  unescape: unescape,
  escape: escape,
  encodeURIComponent: encodeURIComponent,
  decodeURIComponent: decodeURIComponent,
  btoa: function (value) { return Buffer.from(value, "binary").toString("base64"); },
  atob: function (value) { return Buffer.from(value, "base64").toString("binary"); },
  fetch: function (url, opts) {
    calls.push({ url: url, method: opts && opts.method, body: opts && opts.body, headers: opts && opts.headers });
    return handler(url, opts || {});
  },
  confirm: function (msg) { confirms.push(msg); return false; },
  prompt: function (msg) { prompts.push(msg); return null; },
});
context.window = context;
context.globalThis = context;
vm.runInContext(fs.readFileSync(new URL("../dong-ui/gh-sync.js", import.meta.url), "utf8"), context);
const GhSync = context.GhSync;
const FILE = "https://api.github.com/repos/Dong-Xuyong/progress-sync/contents/thesis.json";

function installToken() {
  memory.clear();
  calls.length = 0;
  confirms.length = 0;
  prompts.length = 0;
  localStorage.setItem("dong-gh-sync", JSON.stringify({
    token: "test-token",
    repo: "Dong-Xuyong/progress-sync",
  }));
}

installToken();
const remote1 = {
  app: "thesis",
  schemaVersion: 1,
  owner: "ace",
  updatedAt: "2026-10-16T11:00:00.000Z",
  settings: {
    title: "EXAMPLE Local title",
    programme: "",
    supervisor: "",
    targetSubmission: null,
    updatedAt: "2026-10-16T09:00:00.000Z",
  },
  reentry: emptyDoc().reentry,
  chapters: [chapter("ch_local1", "2026-10-16T08:00:00.000Z", {
    title: "EXAMPLE Old chapter",
    progress: 10,
    notion: { priority: "Low", comments: "EXAMPLE Remote only", shelf: "remote-shelf" },
  })],
  meetings: [],
  deadlines: [{
    id: "dl_bot001",
    title: "EXAMPLE Bot deadline",
    due: "2026-11-02",
    kind: "university",
    done: false,
    updatedAt: "2026-10-16T11:00:00.000Z",
  }],
};
const remote2 = JSON.parse(JSON.stringify(remote1));
remote2.updatedAt = "2026-10-16T18:00:00.000Z";
remote2.settings = {
  title: "EXAMPLE From bot",
  programme: "EXAMPLE Remote programme",
  supervisor: "",
  targetSubmission: "2027-01-15",
  updatedAt: "2026-10-16T18:00:00.000Z",
};
let saved = null;
let gets = 0;
handler = async function (url, opts) {
  assert.equal(url, FILE);
  assert.equal(opts.headers.Authorization, "Bearer test-token");
  assert.equal(opts.headers.Accept, "application/vnd.github+json");
  if (opts.method === "GET") {
    gets += 1;
    const sha = gets === 1 ? "sha-old" : "sha-new";
    const payload = gets === 1 ? remote1 : remote2;
    return response(200, { sha: sha, content: encodeContent(payload) });
  }
  const body = JSON.parse(opts.body);
  assert.equal(body.message, "Save thesis progress");
  if (gets === 1) {
    assert.equal(body.sha, "sha-old");
    const first = decodeContent(body.content);
    assert.equal(first.chapters[0].title, "EXAMPLE Edited chapter");
    assert.ok(first.deadlines.some(function (item) { return item.id === "dl_bot001"; }));
    return response(409, {});
  }
  assert.equal(body.sha, "sha-new");
  saved = decodeContent(body.content);
  return response(200, { content: { sha: "sha-done" } });
};

let doc = {
  app: "thesis",
  schemaVersion: 1,
  owner: "ace",
  updatedAt: "2026-10-16T12:00:00.000Z",
  settings: {
    title: "EXAMPLE Local title",
    programme: "EXAMPLE Local programme",
    supervisor: "",
    targetSubmission: null,
    updatedAt: "2026-10-16T10:00:00.000Z",
  },
  reentry: emptyDoc().reentry,
  chapters: [chapter("ch_local1", "2026-10-16T12:00:00.000Z", {
    title: "EXAMPLE Edited chapter",
    progress: 40,
    notion: notionSample(),
  })],
  meetings: [],
  deadlines: [],
};

const message = await saveWithRetry(function () {
  return GhSync.save(APP_ID, function () { return doc; }, function (remoteDoc) {
    doc = merge(doc, remoteDoc);
  }, { quiet: true });
});
assert.equal(message, "Saved to GitHub");
assert.equal(confirms.length, 0);
assert.equal(prompts.length, 0);
assert.deepEqual(calls.map(function (call) { return call.method; }), ["GET", "PUT", "GET", "PUT"]);
assert.equal(saved.settings.title, "EXAMPLE From bot");
assert.equal(saved.chapters[0].title, "EXAMPLE Edited chapter");
assert.equal(saved.chapters[0].progress, 40);
assert.deepEqual(saved.chapters[0].notion, notionSample());
assert.equal("shelf" in saved.chapters[0].notion, false);
assert.deepEqual(normalize({ chapters: [saved.chapters[0]] }).chapters[0].notion, notionSample());
assert.ok(saved.deadlines.some(function (item) { return item.id === "dl_bot001"; }));
assert.equal(saved.app, "thesis");
assert.equal(APP_ID, "thesis");
assert.equal(SCHEMA_VERSION, 1);

installToken();
let conflicts = 0;
handler = async function (url, opts) {
  assert.equal(url, FILE);
  if (opts.method === "GET") return response(200, { sha: "sha-" + conflicts, content: encodeContent(remote1) });
  conflicts += 1;
  return response(409, {});
};
await assert.rejects(saveWithRetry(function () {
  return GhSync.save("thesis", function () { return doc; }, function (remoteDoc) {
    doc = merge(doc, remoteDoc);
  }, { quiet: true });
}), function (err) { return err.message === NOT_SAVED; });
assert.equal(conflicts, 2);
assert.equal(calls.filter(function (call) { return call.method === "PUT"; }).length, 2);

installToken();
handler = async function (url, opts) {
  assert.equal(url, FILE);
  if (opts.method === "GET") return response(404, {});
  const body = JSON.parse(opts.body);
  assert.equal(body.sha, undefined);
  saved = decodeContent(body.content);
  return response(201, {});
};
let applied = false;
await GhSync.save("thesis", function () { return emptyDoc(); }, function () { applied = true; }, { quiet: true });
assert.equal(applied, false);
assert.equal(saved.app, "thesis");
assert.equal(saved.owner, "ace");
assert.equal(saved.schemaVersion, 1);

const appSource = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
assert.match(appSource, /GhSync\.save\(\s*APP_ID/);
assert.match(appSource, /saveWithRetry/);
assert.match(appSource, /NOT_SAVED/);
assert.match(appSource, /merge\(/);
assert.doesNotMatch(appSource, /GhSync\.save\(\s*["']/);
assert.match(appSource, /"est " \+ hoursText \+ " h · " \+ doneCount \+ "\/" \+ sections\.length \+ " sections"/);
assert.match(appSource, /From Notion/);
assert.match(appSource, /Open in Notion/);
assert.match(appSource, /noopener/);
assert.doesNotMatch(appSource, /innerHTML/);
assert.doesNotMatch(appSource, /chapter\.notion\s*=/);
assert.doesNotMatch(appSource, /\.notion\.[A-Za-z]+\s*=[^=]/);
const cssSource = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
assert.match(cssSource, /\.notion-comments\s*\{[^}]*white-space:\s*pre-wrap/);
assert.match(cssSource, /\.chip-priority-high/);
assert.match(cssSource, /\.chip-priority-medium/);
assert.match(cssSource, /\.chip-priority-low/);

console.log("core tests passed");
