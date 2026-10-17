/**
 * Thesis document logic. No DOM. The app and the tests share this file.
 * Arrays merge by id, newer updatedAt wins, and deletes stay as tombstones.
 */
export const APP_ID = "thesis";
export const SCHEMA_VERSION = 1;
export const OWNER = "ace";
export const NOT_SAVED = "⚠️ Not saved, reload";

export const CHAPTER_STATUSES = [
  "not_started",
  "outlining",
  "drafting",
  "revising",
  "with_supervisor",
  "done",
];
export const REENTRY_STATUSES = [
  "not_started",
  "submitted",
  "pending",
  "approved",
  "rejected",
];
export const DEADLINE_KINDS = ["university", "supervisor", "personal"];

const RECORD_KEYS = new Set(["chapters", "meetings", "deadlines"]);
const SINGLETON_KEYS = new Set(["settings", "reentry"]);
const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

export function emptyDoc() {
  return {
    app: APP_ID,
    schemaVersion: SCHEMA_VERSION,
    owner: OWNER,
    updatedAt: null,
    settings: {
      title: "",
      programme: "",
      supervisor: "",
      targetSubmission: null,
      updatedAt: null,
    },
    reentry: {
      reference: "",
      status: "not_started",
      deadline: null,
      link: "",
      notes: "",
      updatedAt: null,
    },
    chapters: [],
    meetings: [],
    deadlines: [],
  };
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function clone(value) {
  if (value == null) return value;
  return JSON.parse(JSON.stringify(value));
}

function instant(value) {
  if (value == null || value === "") return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function stringOr(value, fallback) {
  return typeof value === "string" ? value : fallback;
}

function integerOr(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.trunc(parsed);
  }
  return fallback;
}

function nonNegIntOrNull(value) {
  if (value == null || value === "") return null;
  const parsed = integerOr(value, null);
  if (parsed == null || parsed < 0) return null;
  return parsed;
}

function dateOrNull(value) {
  if (typeof value !== "string" || !DATE_KEY.test(value)) return null;
  const parts = value.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (utc.getUTCFullYear() !== year || utc.getUTCMonth() !== month - 1 || utc.getUTCDate() !== day) return null;
  return value;
}

function clampProgress(value) {
  const parsed = integerOr(value, 0);
  if (parsed < 0) return 0;
  if (parsed > 100) return 100;
  return parsed;
}

function finiteNumberOrNull(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function normalizeNotionSection(raw) {
  const source = isPlainObject(raw) ? raw : {};
  const out = Object.assign({}, clone(source));
  out.name = stringOr(source.name, "");
  out.status = stringOr(source.status, "");
  out.estimatedEffort = finiteNumberOrNull(source.estimatedEffort);
  out.text = stringOr(source.text, "");
  out.reviewedByEmanuel = source.reviewedByEmanuel === true;
  out.reviewedByCortez = source.reviewedByCortez === true;
  return out;
}

function normalizeNotion(raw) {
  const source = isPlainObject(raw) ? raw : {};
  const out = Object.assign({}, clone(source));
  out.priority = stringOr(source.priority, "");
  out.estimateHours = finiteNumberOrNull(source.estimateHours);
  out.satisfaction = finiteNumberOrNull(source.satisfaction);
  out.reviewed = source.reviewed === true;
  out.improvements = stringOr(source.improvements, "");
  out.comments = stringOr(source.comments, "");
  out.sections = Array.isArray(source.sections)
    ? source.sections.filter(isPlainObject).map(normalizeNotionSection)
    : [];
  out.url = stringOr(source.url, "");
  out.status = stringOr(source.status, "");
  out.completionRate = finiteNumberOrNull(source.completionRate);
  return out;
}

function pickNewer(local, remote) {
  const localAt = instant(local && local.updatedAt);
  const remoteAt = instant(remote && remote.updatedAt);
  if (remoteAt == null) return { winner: local, loser: remote };
  if (localAt == null || remoteAt > localAt) return { winner: remote, loser: local };
  return { winner: local, loser: remote };
}

function remoteIsNewer(local, remote) {
  const localAt = instant(local && local.updatedAt);
  const remoteAt = instant(remote && remote.updatedAt);
  if (remoteAt == null) return false;
  if (localAt == null) return true;
  return remoteAt > localAt;
}

function takeWhole(local, remote) {
  const remoteWins = remoteIsNewer(local, remote);
  const winner = remoteWins ? remote : local;
  const loser = remoteWins ? local : remote;
  if (!isPlainObject(winner) && !isPlainObject(loser)) {
    return clone(winner == null ? loser : winner);
  }
  return {
    ...(isPlainObject(loser) ? clone(loser) : {}),
    ...(isPlainObject(winner) ? clone(winner) : {}),
  };
}

function mergeRecords(localArr, remoteArr) {
  const local = Array.isArray(localArr) ? localArr : [];
  const remote = Array.isArray(remoteArr) ? remoteArr : [];
  const merged = new Map();
  function put(rec) {
    if (!isPlainObject(rec) || rec.id == null || rec.id === "") return;
    const id = String(rec.id);
    if (!merged.has(id)) merged.set(id, clone(rec));
    else merged.set(id, takeWhole(merged.get(id), rec));
  }
  local.forEach(put);
  remote.forEach(put);
  const seen = new Set();
  const out = [];
  function pushFrom(list) {
    list.forEach(function (rec) {
      if (!isPlainObject(rec) || rec.id == null || rec.id === "") return;
      const id = String(rec.id);
      if (seen.has(id)) return;
      seen.add(id);
      out.push(merged.get(id));
    });
  }
  pushFrom(local);
  pushFrom(remote);
  return out;
}

function isDateMap(value) {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every(function (key) { return DATE_KEY.test(key); });
}

function mergeDateMap(localMap, remoteMap) {
  const local = isPlainObject(localMap) ? localMap : {};
  const remote = isPlainObject(remoteMap) ? remoteMap : {};
  const out = {};
  const keys = new Set([].concat(Object.keys(local), Object.keys(remote)));
  keys.forEach(function (key) {
    const hasLocal = Object.prototype.hasOwnProperty.call(local, key);
    const hasRemote = Object.prototype.hasOwnProperty.call(remote, key);
    if (hasLocal && !hasRemote) out[key] = clone(local[key]);
    else if (hasRemote && !hasLocal) out[key] = clone(remote[key]);
    else if (isPlainObject(local[key]) && isPlainObject(remote[key])) out[key] = takeWhole(local[key], remote[key]);
    else {
      const remoteAt = instant(remote[key] && remote[key].updatedAt);
      const localAt = instant(local[key] && local[key].updatedAt);
      out[key] = remoteAt != null && (localAt == null || remoteAt > localAt)
        ? clone(remote[key])
        : clone(local[key]);
    }
  });
  return out;
}

function isRecordArray(value) {
  return Array.isArray(value) && value.some(function (item) {
    return isPlainObject(item) && item.id != null && "updatedAt" in item;
  });
}

function hasUpdatedAt(value) {
  return isPlainObject(value) && "updatedAt" in value;
}

function mergeUnknown(local, remote, localTop, remoteTop) {
  if (local === undefined) return clone(remote);
  if (remote === undefined) return clone(local);
  const remoteNewer = (instant(remoteTop) || 0) > (instant(localTop) || 0) && instant(remoteTop) != null;
  if (isPlainObject(local) && isPlainObject(remote)) {
    const primary = remoteNewer ? remote : local;
    const secondary = remoteNewer ? local : remote;
    return Object.assign(clone(secondary), clone(primary));
  }
  return clone(remoteNewer ? remote : local);
}

export function merge(local, remote) {
  const left = isPlainObject(local) ? local : {};
  const right = isPlainObject(remote) ? remote : {};
  const out = {};
  const keys = new Set([].concat(Object.keys(left), Object.keys(right)));
  keys.forEach(function (key) {
    if (key === "updatedAt" || key === "schemaVersion") return;
    const a = left[key];
    const b = right[key];
    if (RECORD_KEYS.has(key) || isRecordArray(a) || isRecordArray(b)) {
      out[key] = mergeRecords(a, b);
      return;
    }
    if (SINGLETON_KEYS.has(key) || hasUpdatedAt(a) || hasUpdatedAt(b)) {
      out[key] = takeWhole(a, b);
      return;
    }
    if (isDateMap(a) || isDateMap(b)) {
      out[key] = mergeDateMap(a, b);
      return;
    }
    out[key] = mergeUnknown(a, b, left.updatedAt, right.updatedAt);
  });
  const leftVersion = Number.isFinite(Number(left.schemaVersion)) ? Math.trunc(Number(left.schemaVersion)) : SCHEMA_VERSION;
  const rightVersion = Number.isFinite(Number(right.schemaVersion)) ? Math.trunc(Number(right.schemaVersion)) : SCHEMA_VERSION;
  out.schemaVersion = Math.max(leftVersion, rightVersion);
  const top = pickNewer({ updatedAt: left.updatedAt }, { updatedAt: right.updatedAt });
  out.updatedAt = top.winner ? top.winner.updatedAt : null;
  out.app = APP_ID;
  out.owner = OWNER;
  return out;
}

function normalizeSettings(raw) {
  const source = isPlainObject(raw) ? raw : {};
  const out = Object.assign({}, clone(source));
  out.title = stringOr(source.title, "");
  out.programme = stringOr(source.programme, "");
  out.supervisor = stringOr(source.supervisor, "");
  out.targetSubmission = dateOrNull(source.targetSubmission);
  out.updatedAt = source.updatedAt == null || source.updatedAt === "" ? null : String(source.updatedAt);
  return out;
}

function normalizeReentry(raw) {
  const source = isPlainObject(raw) ? raw : {};
  const out = Object.assign({}, clone(source));
  out.reference = stringOr(source.reference, "");
  out.status = REENTRY_STATUSES.indexOf(source.status) >= 0 ? source.status : "not_started";
  out.deadline = dateOrNull(source.deadline);
  out.link = stringOr(source.link, "");
  out.notes = stringOr(source.notes, "");
  out.updatedAt = source.updatedAt == null || source.updatedAt === "" ? null : String(source.updatedAt);
  return out;
}

function normalizeChapter(raw) {
  const out = Object.assign({}, clone(raw));
  out.id = raw.id == null ? "" : String(raw.id);
  out.order = integerOr(raw.order, 0);
  out.title = stringOr(raw.title, "");
  out.status = CHAPTER_STATUSES.indexOf(raw.status) >= 0 ? raw.status : "not_started";
  out.progress = clampProgress(raw.progress);
  if ("words" in raw) out.words = nonNegIntOrNull(raw.words);
  if ("targetWords" in raw) out.targetWords = nonNegIntOrNull(raw.targetWords);
  if ("due" in raw) out.due = dateOrNull(raw.due);
  if ("notes" in raw) out.notes = stringOr(raw.notes, "");
  out.updatedAt = stringOr(raw.updatedAt, "");
  if ("notion" in raw) out.notion = normalizeNotion(raw.notion);
  if (raw.deleted === true) out.deleted = true;
  else if ("deleted" in raw) delete out.deleted;
  return out;
}

function normalizeAction(raw) {
  const out = Object.assign({}, clone(raw));
  out.id = raw.id == null ? "" : String(raw.id);
  out.text = stringOr(raw.text, "");
  out.done = !!raw.done;
  if ("due" in raw) out.due = dateOrNull(raw.due);
  return out;
}

function normalizeMeeting(raw) {
  const out = Object.assign({}, clone(raw));
  out.id = raw.id == null ? "" : String(raw.id);
  out.date = dateOrNull(raw.date) || "";
  out.planned = !!raw.planned;
  out.summary = stringOr(raw.summary, "");
  out.chapterIds = Array.isArray(raw.chapterIds) ? raw.chapterIds.map(function (id) { return String(id); }) : [];
  out.actions = Array.isArray(raw.actions) ? raw.actions.filter(isPlainObject).map(normalizeAction) : [];
  out.updatedAt = stringOr(raw.updatedAt, "");
  if (raw.deleted === true) out.deleted = true;
  else if ("deleted" in raw) delete out.deleted;
  return out;
}

function normalizeDeadline(raw) {
  const out = Object.assign({}, clone(raw));
  out.id = raw.id == null ? "" : String(raw.id);
  out.title = stringOr(raw.title, "");
  out.due = dateOrNull(raw.due) || "";
  out.kind = DEADLINE_KINDS.indexOf(raw.kind) >= 0 ? raw.kind : "personal";
  out.done = !!raw.done;
  if ("notes" in raw) out.notes = stringOr(raw.notes, "");
  out.updatedAt = stringOr(raw.updatedAt, "");
  if (raw.deleted === true) out.deleted = true;
  else if ("deleted" in raw) delete out.deleted;
  return out;
}

export function normalize(data) {
  const source = isPlainObject(data) ? data : {};
  const version = Number(source.schemaVersion);
  const out = Object.assign({}, clone(source));
  out.app = APP_ID;
  out.schemaVersion = Number.isFinite(version) ? Math.max(0, Math.trunc(version)) : SCHEMA_VERSION;
  out.owner = OWNER;
  out.updatedAt = source.updatedAt == null || source.updatedAt === "" ? null : String(source.updatedAt);
  out.settings = normalizeSettings(source.settings);
  out.reentry = normalizeReentry(source.reentry);
  out.chapters = Array.isArray(source.chapters) ? source.chapters.filter(isPlainObject).map(normalizeChapter) : [];
  out.meetings = Array.isArray(source.meetings) ? source.meetings.filter(isPlainObject).map(normalizeMeeting) : [];
  out.deadlines = Array.isArray(source.deadlines) ? source.deadlines.filter(isPlainObject).map(normalizeDeadline) : [];
  return out;
}

export function live(list) {
  return (Array.isArray(list) ? list : []).filter(function (item) {
    return isPlainObject(item) && item.deleted !== true;
  });
}

export function overallProgress(doc) {
  const chapters = live(doc && doc.chapters);
  if (!chapters.length) return null;
  const weighted = chapters.every(function (chapter) { return Number(chapter.targetWords) > 0; });
  if (weighted) {
    let words = 0;
    let acc = 0;
    chapters.forEach(function (chapter) {
      const weight = Number(chapter.targetWords);
      words += weight;
      acc += clampProgress(chapter.progress) * weight;
    });
    return words ? acc / words : null;
  }
  let sum = 0;
  chapters.forEach(function (chapter) { sum += clampProgress(chapter.progress); });
  return sum / chapters.length;
}

export function progressIsWeighted(doc) {
  const chapters = live(doc && doc.chapters);
  return chapters.length > 0 && chapters.every(function (chapter) {
    return Number(chapter.targetWords) > 0;
  });
}

export function lisbonToday(now) {
  const date = now instanceof Date ? now : new Date(now == null ? Date.now() : now);
  if (Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  function pick(type) {
    const part = parts.find(function (item) { return item.type === type; });
    return part ? part.value : "";
  }
  const year = pick("year");
  const month = pick("month");
  const day = pick("day");
  if (!year || !month || !day) return null;
  return year + "-" + month + "-" + day;
}

export function daysLeft(due, now) {
  if (typeof due !== "string" || !DATE_KEY.test(due)) return null;
  const today = lisbonToday(now == null ? new Date() : now);
  if (!today) return null;
  const start = Date.parse(today + "T00:00:00Z");
  const end = Date.parse(due + "T00:00:00Z");
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  return Math.round((end - start) / 86400000);
}

export function deadlineBadge(due, now) {
  const days = daysLeft(due, now);
  if (days == null) return { days: null, text: "", soon: false };
  let text = days + "d";
  if (days === 0) text = "Today";
  else if (days < 0) text = Math.abs(days) + "d over";
  return { days: days, text: text, soon: days <= 7 };
}

export function countdownLabel(due, now) {
  const days = daysLeft(due, now);
  if (days == null) return "No submission date";
  if (days === 0) return "Submission day";
  if (days === 1) return "1 day left";
  if (days > 1) return days + " days left";
  if (days === -1) return "1 day overdue";
  return Math.abs(days) + " days overdue";
}

export function nextMeeting(doc, now) {
  const today = lisbonToday(now == null ? new Date() : now);
  if (!today) return null;
  const planned = live(doc && doc.meetings).filter(function (meeting) {
    return meeting.planned && typeof meeting.date === "string" && DATE_KEY.test(meeting.date) && meeting.date >= today;
  });
  planned.sort(function (a, b) {
    return String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id));
  });
  return planned[0] || null;
}

export function openActions(doc) {
  let count = 0;
  live(doc && doc.meetings).forEach(function (meeting) {
    (Array.isArray(meeting.actions) ? meeting.actions : []).forEach(function (action) {
      if (action && !action.done) count += 1;
    });
  });
  return count;
}

export function newId(prefix, existing) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const used = existing instanceof Set
    ? existing
    : new Set(Array.isArray(existing) ? existing : []);
  let id = "";
  do {
    let body = "";
    for (let i = 0; i < 6; i += 1) body += alphabet[Math.floor(Math.random() * alphabet.length)];
    id = String(prefix) + "_" + body;
  } while (used.has(id));
  return id;
}

export function collectIds(doc) {
  const ids = [];
  if (!isPlainObject(doc)) return ids;
  ["chapters", "meetings", "deadlines"].forEach(function (key) {
    (doc[key] || []).forEach(function (rec) {
      if (rec && rec.id) ids.push(String(rec.id));
      ((rec && rec.actions) || []).forEach(function (action) {
        if (action && action.id) ids.push(String(action.id));
      });
    });
  });
  return ids;
}

export function applyChapterPatch(chapter, patch) {
  if (!isPlainObject(chapter) || !isPlainObject(patch)) return chapter;
  const statusChanged = Object.prototype.hasOwnProperty.call(patch, "status");
  const progressChanged = Object.prototype.hasOwnProperty.call(patch, "progress");
  if (statusChanged && CHAPTER_STATUSES.indexOf(patch.status) >= 0) chapter.status = patch.status;
  if (progressChanged) chapter.progress = clampProgress(patch.progress);
  if (progressChanged && chapter.progress === 100) chapter.status = "done";
  if (statusChanged && !progressChanged && chapter.status !== "done" && chapter.progress === 100) {
    chapter.progress = 99;
  }
  return chapter;
}

export function toggleAction(doc, meetingId, actionId, done, nowIso) {
  if (!isPlainObject(doc)) return false;
  const meeting = (doc.meetings || []).find(function (item) {
    return item && item.id === meetingId && item.deleted !== true;
  });
  if (!meeting || !Array.isArray(meeting.actions)) return false;
  const action = meeting.actions.find(function (item) { return item && item.id === actionId; });
  if (!action) return false;
  const next = !!done;
  if (!!action.done === next) return false;
  action.done = next;
  const stamp = typeof nowIso === "string" && nowIso ? nowIso : new Date().toISOString();
  meeting.updatedAt = stamp;
  doc.updatedAt = stamp;
  return true;
}

export function safeHttpUrl(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^https?:\/\//i.test(trimmed)) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.href;
  } catch (err) {
    return null;
  }
}

export async function saveWithRetry(attempt) {
  // One retry path: gh-sync.js re-fetches, merges and retries a 409 once itself.
  try {
    return await attempt();
  } catch (err) {
    if (!(err && (err.status === 409 || /another device/.test(String(err.message))))) throw err;
    const wrapped = new Error(NOT_SAVED);
    wrapped.cause = err;
    throw wrapped;
  }
}
