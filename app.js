/**
 * Thesis tracker UI. Reads and writes thesis.json through GhSync.
 * Demo data is in-memory only and is never saved.
 */
import {
  APP_ID,
  CHAPTER_STATUSES,
  DEADLINE_KINDS,
  NOT_SAVED,
  REENTRY_STATUSES,
  SCHEMA_VERSION,
  applyChapterPatch,
  collectIds,
  countdownLabel,
  deadlineBadge,
  emptyDoc,
  live,
  lisbonToday,
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
} from "./core.js";
import { demoDoc } from "./demo.js";
import { completionPercent } from "./notion.js";

var SAVE_DELAY = 2500;
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var STATUS_LABEL = {
  not_started: "Not started",
  outlining: "Outlining",
  drafting: "Drafting",
  revising: "Revising",
  with_supervisor: "With supervisor",
  done: "Done",
  submitted: "Submitted",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};
var KIND_LABEL = {
  university: "University",
  supervisor: "Supervisor",
  personal: "Personal",
};

var sync = document.getElementById("sync-label");
var main = document.getElementById("main");

var doc = null;
var demo = false;
var readOnly = false;
var dirty = false;
var saving = false;
var saveAgain = false;
var saveTimer = null;
var stopped = false;
var loading = false;
var lastRoute = "";

function pad2(n) {
  return (n < 10 ? "0" : "") + n;
}

function hhmm() {
  var now = new Date();
  return pad2(now.getHours()) + ":" + pad2(now.getMinutes());
}

function hasToken() {
  try {
    var cfg = JSON.parse(localStorage.getItem("dong-gh-sync") || "null");
    return !!(cfg && cfg.token);
  } catch (err) {
    return false;
  }
}

function fieldFocused() {
  var active = document.activeElement;
  if (!active || !active.tagName) return false;
  return active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT";
}

function el(tag, attrs, children) {
  var node = document.createElement(tag);
  var props = attrs || {};
  Object.keys(props).forEach(function (key) {
    var val = props[key];
    if (val == null || val === false) return;
    if (key === "class") node.className = String(val);
    else if (key === "text") node.textContent = String(val);
    else node.setAttribute(key, val === true ? "" : String(val));
  });
  (children || []).forEach(function (child) {
    if (child == null || child === false) return;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  });
  return node;
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function formatDate(iso) {
  var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!match) return "";
  return Number(match[3]) + " " + MONTHS[Number(match[2]) - 1] + " " + match[1];
}

function parseRoute() {
  var parts = (location.hash || "").replace(/^#/, "").split("/").filter(Boolean);
  var name = parts[0] || "overview";
  if (["chapters", "meetings", "deadlines", "settings"].indexOf(name) < 0) name = "overview";
  return { name: name, id: parts[1] || "", key: name + "/" + (parts[1] || "") };
}

function findLive(list, id) {
  return live(list).find(function (item) { return item.id === id; });
}

function sortedChapters() {
  return live(doc.chapters).slice().sort(function (a, b) {
    return a.order - b.order || String(a.id).localeCompare(String(b.id));
  });
}

function optionsFrom(list, labels) {
  return list.map(function (value) {
    return { value: value, label: labels[value] || value };
  });
}

function intOrNull(value) {
  if (value == null || String(value).trim() === "") return null;
  var n = Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.trunc(n);
}

function chip(text, kind) {
  return el("span", { class: "chip" + (kind ? " chip-" + kind : ""), text: text || "" });
}

function bar(percent) {
  var value = Math.max(0, Math.min(100, Number(percent) || 0));
  var wrap = el("div", { class: "bar", role: "progressbar" });
  wrap.setAttribute("aria-valuemin", "0");
  wrap.setAttribute("aria-valuemax", "100");
  wrap.setAttribute("aria-valuenow", String(Math.round(value)));
  var fill = el("span", { class: "bar-fill" });
  fill.style.width = value + "%";
  wrap.appendChild(fill);
  return wrap;
}

function emptyCard(text) {
  return el("section", { class: "card" }, [el("p", { class: "muted", text: text })]);
}

function backLink(hash, label) {
  return el("a", { class: "back", href: hash, text: label });
}

function textControl(fieldName, value, type) {
  var input = document.createElement("input");
  input.type = type || "text";
  input.value = value == null ? "" : String(value);
  input.setAttribute("data-field", fieldName);
  input.autocomplete = "off";
  if (type === "number") {
    input.inputMode = "numeric";
    input.min = "0";
    input.step = "1";
  }
  return input;
}

function areaControl(fieldName, value) {
  var input = document.createElement("textarea");
  input.value = value == null ? "" : String(value);
  input.rows = 4;
  input.setAttribute("data-field", fieldName);
  return input;
}

function selectControl(fieldName, options, value) {
  var sel = document.createElement("select");
  sel.setAttribute("data-field", fieldName);
  options.forEach(function (opt) {
    var option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    if (opt.value === value) option.selected = true;
    sel.appendChild(option);
  });
  return sel;
}

function field(label, control, hint) {
  var wrap = el("label", { class: "field" });
  wrap.appendChild(el("span", { class: "field-label", text: label }));
  wrap.appendChild(control);
  if (hint) wrap.appendChild(hint);
  return wrap;
}

function readLine(label, value) {
  var wrap = el("div", { class: "field" });
  wrap.appendChild(el("span", { class: "field-label", text: label }));
  wrap.appendChild(el("p", { class: "readonly", text: value ? String(value) : "—" }));
  return wrap;
}

function updateChrome() {
  var demoBanner = document.getElementById("demo-banner");
  var roBanner = document.getElementById("readonly-banner");
  if (demoBanner) demoBanner.hidden = !demo;
  if (roBanner) roBanner.hidden = !readOnly;
  var route = parseRoute();
  document.querySelectorAll(".tabs a").forEach(function (link) {
    var on = link.getAttribute("data-tab") === route.name;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function renderOverview() {
  var frag = document.createDocumentFragment();
  var settings = doc.settings || {};
  var hero = el("section", { class: "hero" });
  hero.setAttribute("aria-label", "Thesis");
  hero.appendChild(el("h2", { text: (settings.title || "").trim() || "Untitled thesis" }));
  var meta = [settings.programme, settings.supervisor].filter(function (part) { return part && String(part).trim(); });
  if (meta.length) hero.appendChild(el("p", { class: "muted", text: meta.join(" · ") }));
  var progress = overallProgress(doc);
  var cap = el("p", { class: "bar-cap" });
  cap.appendChild(el("span", { text: progress == null ? "Progress" : (progressIsWeighted(doc) ? "Weighted by target words" : "Average progress") }));
  cap.appendChild(el("b", { text: progress == null ? "—" : Math.round(progress) + "%" }));
  hero.appendChild(cap);
  if (progress == null) hero.appendChild(el("p", { class: "muted", text: "Add a chapter to track progress." }));
  else hero.appendChild(bar(progress));
  hero.appendChild(el("p", { class: "countdown", text: countdownLabel(settings.targetSubmission) }));
  frag.appendChild(hero);

  frag.appendChild(el("h2", { class: "section-title", text: "Deadlines" }));
  var open = live(doc.deadlines).filter(function (item) { return !item.done; });
  open.sort(function (a, b) { return String(a.due).localeCompare(String(b.due)) || String(a.id).localeCompare(String(b.id)); });
  if (!open.length) frag.appendChild(emptyCard("No open deadlines."));
  else {
    var list = el("ul", { class: "stack" });
    open.slice(0, 3).forEach(function (item) { list.appendChild(deadlineRow(item)); });
    frag.appendChild(list);
  }

  frag.appendChild(el("h2", { class: "section-title", text: "Next meeting" }));
  frag.appendChild(meetingSummary(nextMeeting(doc)));

  var actions = el("section", { class: "card stat-card" });
  actions.appendChild(el("p", { class: "stat-num", "data-count": "open-actions", text: String(openActions(doc)) }));
  actions.appendChild(el("p", { class: "stat-label", text: "Open meeting actions" }));
  frag.appendChild(actions);
  frag.appendChild(renderReentry());
  return frag;
}

function meetingSummary(meeting) {
  var card = el("section", { class: "card" });
  if (!meeting) {
    card.appendChild(el("p", { class: "muted", text: "No planned meeting." }));
    return card;
  }
  var link = el("a", { class: "block-link", href: "#/meetings/" + meeting.id });
  link.appendChild(el("p", { class: "when", text: formatDate(meeting.date) }));
  link.appendChild(el("p", { text: meeting.summary || "Untitled meeting" }));
  card.appendChild(link);
  return card;
}

function renderReentry() {
  var re = doc.reentry || {};
  var card = el("section", { class: "card" });
  card.appendChild(el("h2", { class: "card-title", text: "UMinho re-entry reference" }));
  var split = el("div", { class: "split" });
  split.appendChild(chip(STATUS_LABEL[re.status] || "Not started", re.status || "not_started"));
  split.appendChild(el("span", { class: "muted", text: re.deadline ? "Due " + formatDate(re.deadline) : "No deadline" }));
  card.appendChild(split);
  if (String(re.reference || "").trim()) {
    var line = el("div", { class: "ref-line" });
    line.appendChild(el("code", { class: "mono", text: re.reference }));
    line.appendChild(el("button", { type: "button", class: "btn btn-ghost", "data-act": "copy-reference", text: "Copy" }));
    card.appendChild(line);
  } else {
    card.appendChild(el("p", { class: "mono", text: "Not set" }));
  }
  if (re.notes) card.appendChild(el("p", { text: re.notes }));
  var href = safeHttpUrl(re.link);
  if (href) card.appendChild(el("a", { class: "text-link", href: href, target: "_blank", rel: "noopener noreferrer", text: "Open link" }));
  else if (re.link) card.appendChild(el("p", { class: "muted", text: re.link }));
  return card;
}

function deadlineRow(item) {
  var li = el("li");
  var card = el("article", { class: "card row" });
  if (!readOnly) {
    var label = el("label", { class: "check" });
    var box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!item.done;
    box.setAttribute("data-act", "tick-deadline");
    box.setAttribute("data-id", item.id);
    box.setAttribute("aria-label", item.done ? "Mark not done" : "Mark done");
    label.appendChild(box);
    card.appendChild(label);
  }
  var link = el("a", { class: "row-main", href: "#/deadlines/" + item.id });
  link.appendChild(el("h3", { text: item.title || "Untitled deadline" }));
  var meta = el("div", { class: "meta" });
  meta.appendChild(chip(KIND_LABEL[item.kind] || "Personal", item.kind));
  if (item.due) meta.appendChild(el("span", { class: "muted", text: formatDate(item.due) }));
  link.appendChild(meta);
  card.appendChild(link);
  var badge = deadlineBadge(item.due);
  if (badge.text) card.appendChild(el("span", { class: badge.soon ? "badge soon" : "badge", text: badge.text }));
  li.appendChild(card);
  return li;
}

function renderChapters() {
  var route = parseRoute();
  if (route.id) return renderChapterEditor(route.id);
  var frag = document.createDocumentFragment();
  var list = sortedChapters();
  if (!list.length) frag.appendChild(emptyCard("No chapters yet."));
  else {
    var ul = el("ul", { class: "stack" });
    list.forEach(function (chapter, index) { ul.appendChild(chapterRow(chapter, index, list.length)); });
    frag.appendChild(ul);
  }
  if (!readOnly) frag.appendChild(el("button", { type: "button", class: "btn", "data-act": "add-chapter", text: "+ Chapter" }));
  return frag;
}

function numberText(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return String(value);
}

function notionRecord(chapter) {
  var notion = chapter && chapter.notion;
  if (!notion || typeof notion !== "object" || Array.isArray(notion)) return null;
  return notion;
}

function notionSections(notion) {
  return notion && Array.isArray(notion.sections) ? notion.sections : [];
}

function sectionDone(section) {
  return String(section && section.status || "").trim().toLowerCase() === "done";
}

function priorityChip(priority) {
  var label = String(priority || "").trim();
  if (!label) return null;
  var kind = label.toLowerCase();
  if (kind === "high" || kind === "medium" || kind === "low") kind = "priority-" + kind;
  else kind = "";
  return chip(label, kind);
}

function chapterRow(chapter, index, total) {
  var li = el("li");
  var card = el("article", { class: "card row" });
  var link = el("a", { class: "row-main", href: "#/chapters/" + chapter.id });
  link.appendChild(el("h3", { text: chapter.title || "Untitled chapter" }));
  var meta = el("div", { class: "meta" });
  meta.appendChild(chip(STATUS_LABEL[chapter.status] || chapter.status, chapter.status));
  var notion = notionRecord(chapter);
  if (notion) {
    var pChip = priorityChip(notion.priority);
    if (pChip) meta.appendChild(pChip);
    if (notion.reviewed === true) meta.appendChild(el("span", { class: "badge badge-reviewed", text: "Reviewed" }));
  }
  if (chapter.due) meta.appendChild(el("span", { class: "muted", text: formatDate(chapter.due) }));
  link.appendChild(meta);
  if (notion) {
    var sections = notionSections(notion);
    var hoursText = numberText(notion.estimateHours);
    var doneCount = sections.filter(sectionDone).length;
    link.appendChild(el("p", {
      class: "muted",
      text: "est " + hoursText + " h · " + doneCount + "/" + sections.length + " sections",
    }));
  }
  var words = chapter.words == null ? "" : String(chapter.words);
  var target = chapter.targetWords == null ? "" : String(chapter.targetWords);
  var caption = words || target ? (words || "0") + (target ? " / " + target : "") + " words" : "Progress";
  var cap = el("p", { class: "bar-cap" });
  cap.appendChild(el("span", { text: caption }));
  cap.appendChild(el("b", { text: (chapter.progress || 0) + "%" }));
  link.appendChild(cap);
  link.appendChild(bar(chapter.progress));
  card.appendChild(link);
  if (!readOnly) {
    var actions = el("div", { class: "row-actions" });
    var up = el("button", { type: "button", class: "icon-btn", "data-act": "up", "data-id": chapter.id, "aria-label": "Move up", text: "↑" });
    var down = el("button", { type: "button", class: "icon-btn", "data-act": "down", "data-id": chapter.id, "aria-label": "Move down", text: "↓" });
    if (index === 0) up.disabled = true;
    if (index === total - 1) down.disabled = true;
    actions.appendChild(up);
    actions.appendChild(down);
    card.appendChild(actions);
  }
  li.appendChild(card);
  return li;
}

function renderChapterEditor(id) {
  var chapter = findLive(doc.chapters, id);
  if (!chapter) return missing("#/chapters", "That chapter is not in this file.");
  var frag = document.createDocumentFragment();
  frag.appendChild(backLink("#/chapters", "Chapters"));
  var card = el("section", { class: "card" });
  card.appendChild(el("h2", { text: chapter.title || "Untitled chapter" }));
  if (readOnly) {
    card.appendChild(readLine("Title", chapter.title));
    card.appendChild(readLine("Status", STATUS_LABEL[chapter.status] || chapter.status));
    card.appendChild(readLine("Progress", chapter.progress + "%"));
    card.appendChild(readLine("Words", chapter.words));
    card.appendChild(readLine("Target words", chapter.targetWords));
    card.appendChild(readLine("Due", formatDate(chapter.due)));
    card.appendChild(readLine("Notes", chapter.notes));
  } else {
    card.appendChild(field("Title", textControl("chapter.title", chapter.title)));
    card.appendChild(field("Status", selectControl("chapter.status", optionsFrom(CHAPTER_STATUSES, STATUS_LABEL), chapter.status)));
    var progress = textControl("chapter.progress", chapter.progress, "number");
    progress.max = "100";
    card.appendChild(field("Progress", progress));
    card.appendChild(field("Words", textControl("chapter.words", chapter.words == null ? "" : chapter.words, "number")));
    card.appendChild(field("Target words", textControl("chapter.targetWords", chapter.targetWords == null ? "" : chapter.targetWords, "number")));
    card.appendChild(field("Due", textControl("chapter.due", chapter.due || "", "date")));
    card.appendChild(field("Notes", areaControl("chapter.notes", chapter.notes || "")));
  }
  frag.appendChild(card);
  var fromNotion = renderNotionCard(chapter);
  if (fromNotion) frag.appendChild(fromNotion);
  if (!readOnly) {
    frag.appendChild(el("button", { type: "button", class: "btn btn-danger", "data-act": "delete-chapter", "data-id": chapter.id, text: "Delete chapter" }));
  }
  return frag;
}

function notionField(label, value, extraClass) {
  var wrap = el("div", { class: "field" });
  wrap.appendChild(el("span", { class: "field-label", text: label }));
  wrap.appendChild(el("p", { class: extraClass ? "readonly " + extraClass : "readonly", text: value }));
  return wrap;
}

function notionNodeField(label, node) {
  var wrap = el("div", { class: "field" });
  wrap.appendChild(el("span", { class: "field-label", text: label }));
  wrap.appendChild(node);
  return wrap;
}

function notionDueText(chapter, notion) {
  var fromNotion = formatDate(notion && notion.due);
  if (fromNotion) return fromNotion;
  var fromChapter = formatDate(chapter && chapter.due);
  return fromChapter || "—";
}

function completionMeter(percent) {
  if (percent == null) return el("p", { class: "readonly", text: "—" });
  var shown = String(percent) + "%";
  var row = el("div", { class: "notion-meter" });
  var wrap = el("div", {
    class: "bar",
    role: "progressbar",
    "aria-label": "Completion " + shown,
  });
  wrap.setAttribute("aria-valuemin", "0");
  wrap.setAttribute("aria-valuemax", "100");
  wrap.setAttribute("aria-valuenow", String(Math.round(percent)));
  var fill = el("span", { class: "bar-fill" });
  fill.style.width = percent + "%";
  wrap.appendChild(fill);
  row.appendChild(wrap);
  row.appendChild(el("span", { class: "notion-meter-label", text: shown }));
  return row;
}

function displayTick(label, on) {
  var row = el("label", { class: "check" });
  var box = document.createElement("input");
  box.type = "checkbox";
  box.checked = on === true;
  box.disabled = true;
  box.tabIndex = -1;
  box.setAttribute("aria-label", label);
  row.appendChild(box);
  row.appendChild(el("span", { text: label }));
  return row;
}

function renderNotionCard(chapter) {
  var notion = notionRecord(chapter);
  if (!notion) return null;
  var card = el("details", { class: "card notion-card" });
  card.open = true;
  var summary = el("summary", { class: "notion-summary" });
  summary.appendChild(el("span", { class: "notion-summary-title", text: "From Notion" }));
  card.appendChild(summary);
  var priorityWrap = el("div", { class: "field" });
  priorityWrap.appendChild(el("span", { class: "field-label", text: "Priority" }));
  priorityWrap.appendChild(priorityChip(notion.priority) || el("p", { class: "readonly", text: "—" }));
  card.appendChild(priorityWrap);
  card.appendChild(notionField("Due", notionDueText(chapter, notion)));
  var hours = numberText(notion.estimateHours);
  card.appendChild(notionField("Estimate", hours === "—" ? "—" : hours + " h"));
  card.appendChild(notionNodeField("Completion", completionMeter(completionPercent(notion.completionRate))));
  card.appendChild(notionField("Satisfaction", numberText(notion.satisfaction)));
  card.appendChild(notionField("Reviewed", notion.reviewed === true ? "Yes" : "No"));
  if (notion.status) card.appendChild(notionField("Status", String(notion.status)));
  card.appendChild(notionField("Improvements", notion.improvements ? notion.improvements : "—", "notion-comments"));
  card.appendChild(notionField("Comments", notion.comments ? notion.comments : "—", "notion-comments"));
  var listWrap = el("div", { class: "field" });
  listWrap.appendChild(el("span", { class: "field-label", text: "Sections" }));
  var sections = notionSections(notion);
  if (!sections.length) listWrap.appendChild(el("p", { class: "muted", text: "No sections." }));
  else {
    var ul = el("ul", { class: "stack" });
    sections.forEach(function (section) {
      var li = el("li", { class: "notion-section" });
      var head = el("div", { class: "check" });
      var done = document.createElement("input");
      done.type = "checkbox";
      done.checked = sectionDone(section);
      done.disabled = true;
      done.tabIndex = -1;
      done.setAttribute("aria-label", "Section done");
      head.appendChild(done);
      head.appendChild(el("span", { text: section.name || "Untitled section" }));
      li.appendChild(head);
      var bits = [];
      if (section.status) bits.push(String(section.status));
      if (typeof section.estimatedEffort === "number" && Number.isFinite(section.estimatedEffort)) {
        bits.push(String(section.estimatedEffort) + " h");
      }
      if (bits.length) li.appendChild(el("p", { class: "muted", text: bits.join(" · ") }));
      var ticks = el("div", { class: "notion-ticks" });
      ticks.appendChild(displayTick("Emanuel", section.reviewedByEmanuel === true));
      ticks.appendChild(displayTick("Cortez", section.reviewedByCortez === true));
      li.appendChild(ticks);
      if (section.text) li.appendChild(el("p", { class: "readonly notion-comments", text: section.text }));
      ul.appendChild(li);
    });
    listWrap.appendChild(ul);
  }
  card.appendChild(listWrap);
  var href = safeHttpUrl(notion.url);
  if (href) {
    card.appendChild(el("a", {
      class: "text-link",
      href: href,
      target: "_blank",
      rel: "noopener noreferrer",
      text: "Open in Notion",
    }));
  }
  return card;
}

function renderMeetings() {
  var route = parseRoute();
  if (route.id) return renderMeetingEditor(route.id);
  var frag = document.createDocumentFragment();
  var count = el("p", { class: "count-line" });
  count.appendChild(el("b", { "data-count": "open-actions", text: String(openActions(doc)) }));
  count.appendChild(document.createTextNode(" open meeting actions"));
  frag.appendChild(count);
  var groups = groupMeetings();
  frag.appendChild(el("h2", { class: "section-title", text: "Planned" }));
  frag.appendChild(groups.planned.length ? meetingList(groups.planned) : emptyCard("No planned meetings."));
  frag.appendChild(el("h2", { class: "section-title", text: "Past" }));
  frag.appendChild(groups.past.length ? meetingList(groups.past) : emptyCard("No past meetings."));
  if (!readOnly) frag.appendChild(el("button", { type: "button", class: "btn", "data-act": "add-meeting", text: "+ Meeting" }));
  return frag;
}

function groupMeetings() {
  var items = live(doc.meetings);
  function byDate(dir) {
    return function (a, b) {
      return dir * String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id));
    };
  }
  return {
    planned: items.filter(function (item) { return item.planned; }).sort(byDate(1)),
    past: items.filter(function (item) { return !item.planned; }).sort(byDate(-1)),
  };
}

function meetingList(items) {
  var ul = el("ul", { class: "stack" });
  items.forEach(function (meeting) { ul.appendChild(meetingRow(meeting)); });
  return ul;
}

function meetingRow(meeting) {
  var li = el("li");
  var card = el("article", { class: "card" });
  var link = el("a", { class: "block-link", href: "#/meetings/" + meeting.id });
  link.appendChild(el("p", { class: "when", text: formatDate(meeting.date) || "No date" }));
  link.appendChild(el("h3", { text: meeting.summary || "Untitled meeting" }));
  card.appendChild(link);
  card.appendChild(actionList(meeting, false));
  li.appendChild(card);
  return li;
}

function actionList(meeting, editable) {
  var wrap = el("div", { class: "actions" });
  (meeting.actions || []).forEach(function (action) {
    var row = el("div", { class: "action" });
    var label = el("label", { class: "check" });
    var box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!action.done;
    box.disabled = !!readOnly;
    box.setAttribute("data-act", "tick-action");
    box.setAttribute("data-meeting", meeting.id);
    box.setAttribute("data-id", action.id);
    box.setAttribute("aria-label", "Done");
    label.appendChild(box);
    if (!editable) label.appendChild(el("span", { text: action.text || "Untitled action" }));
    row.appendChild(label);
    if (editable && !readOnly) {
      var text = textControl("action.text", action.text || "");
      text.setAttribute("data-meeting", meeting.id);
      text.setAttribute("data-id", action.id);
      text.setAttribute("aria-label", "Action");
      var due = textControl("action.due", action.due || "", "date");
      due.setAttribute("data-meeting", meeting.id);
      due.setAttribute("data-id", action.id);
      due.setAttribute("aria-label", "Action due date");
      row.appendChild(text);
      row.appendChild(due);
      row.appendChild(el("button", {
        type: "button",
        class: "icon-btn",
        "data-act": "remove-action",
        "data-meeting": meeting.id,
        "data-id": action.id,
        "aria-label": "Remove action",
        text: "×",
      }));
    }
    wrap.appendChild(row);
  });
  return wrap;
}

function renderMeetingEditor(id) {
  var meeting = findLive(doc.meetings, id);
  if (!meeting) return missing("#/meetings", "That meeting is not in this file.");
  var frag = document.createDocumentFragment();
  frag.appendChild(backLink("#/meetings", "Meetings"));
  var card = el("section", { class: "card" });
  card.appendChild(el("h2", { text: meeting.summary || "Untitled meeting" }));
  if (readOnly) {
    card.appendChild(readLine("Date", formatDate(meeting.date)));
    card.appendChild(readLine("Planned", meeting.planned ? "Yes" : "No"));
    card.appendChild(readLine("Summary", meeting.summary));
  } else {
    card.appendChild(field("Date", textControl("meeting.date", meeting.date || "", "date")));
    var planned = document.createElement("input");
    planned.type = "checkbox";
    planned.checked = !!meeting.planned;
    planned.setAttribute("data-field", "meeting.planned");
    var plannedLabel = el("label", { class: "check" });
    plannedLabel.appendChild(planned);
    plannedLabel.appendChild(el("span", { text: "Planned" }));
    card.appendChild(plannedLabel);
    card.appendChild(field("Summary", areaControl("meeting.summary", meeting.summary || "")));
  }
  card.appendChild(chapterPicker(meeting));
  card.appendChild(el("h3", { class: "field-label", text: "Actions" }));
  card.appendChild(actionList(meeting, true));
  if (!readOnly) {
    card.appendChild(el("button", { type: "button", class: "btn btn-ghost add-inline", "data-act": "add-action", "data-id": meeting.id, text: "Add action" }));
    card.appendChild(el("button", { type: "button", class: "btn btn-danger", "data-act": "delete-meeting", "data-id": meeting.id, text: "Delete meeting" }));
  }
  frag.appendChild(card);
  return frag;
}

function chapterPicker(meeting) {
  var wrap = el("fieldset", { class: "picker" });
  wrap.appendChild(el("legend", { text: "Chapters" }));
  var chapters = sortedChapters();
  if (!chapters.length) {
    wrap.appendChild(el("p", { class: "muted", text: "No chapters yet." }));
    return wrap;
  }
  chapters.forEach(function (chapter) {
    var label = el("label", { class: "check" });
    var box = document.createElement("input");
    box.type = "checkbox";
    box.checked = (meeting.chapterIds || []).indexOf(chapter.id) >= 0;
    box.disabled = !!readOnly;
    box.setAttribute("data-act", "toggle-chapter");
    box.setAttribute("data-meeting", meeting.id);
    box.setAttribute("data-id", chapter.id);
    label.appendChild(box);
    label.appendChild(el("span", { text: chapter.title || "Untitled chapter" }));
    wrap.appendChild(label);
  });
  return wrap;
}

function renderDeadlines() {
  var route = parseRoute();
  if (route.id) return renderDeadlineEditor(route.id);
  var frag = document.createDocumentFragment();
  var items = live(doc.deadlines);
  var open = items.filter(function (item) { return !item.done; }).sort(function (a, b) {
    return String(a.due).localeCompare(String(b.due)) || String(a.id).localeCompare(String(b.id));
  });
  var done = items.filter(function (item) { return item.done; }).sort(function (a, b) {
    return String(b.due).localeCompare(String(a.due)) || String(a.id).localeCompare(String(b.id));
  });
  if (!open.length) frag.appendChild(emptyCard("No open deadlines."));
  else {
    var ul = el("ul", { class: "stack" });
    open.forEach(function (item) { ul.appendChild(deadlineRow(item)); });
    frag.appendChild(ul);
  }
  if (done.length) {
    var details = el("details", { class: "card done-box" });
    details.appendChild(el("summary", { text: "Done (" + done.length + ")" }));
    var doneList = el("ul", { class: "stack" });
    done.forEach(function (item) { doneList.appendChild(deadlineRow(item)); });
    details.appendChild(doneList);
    frag.appendChild(details);
  }
  if (!readOnly) frag.appendChild(el("button", { type: "button", class: "btn", "data-act": "add-deadline", text: "+ Deadline" }));
  return frag;
}

function renderDeadlineEditor(id) {
  var rec = findLive(doc.deadlines, id);
  if (!rec) return missing("#/deadlines", "That deadline is not in this file.");
  var frag = document.createDocumentFragment();
  frag.appendChild(backLink("#/deadlines", "Deadlines"));
  var card = el("section", { class: "card" });
  card.appendChild(el("h2", { text: rec.title || "Untitled deadline" }));
  if (readOnly) {
    card.appendChild(readLine("Title", rec.title));
    card.appendChild(readLine("Due", formatDate(rec.due)));
    card.appendChild(readLine("Kind", KIND_LABEL[rec.kind] || rec.kind));
    card.appendChild(readLine("Done", rec.done ? "Yes" : "No"));
    card.appendChild(readLine("Notes", rec.notes));
  } else {
    card.appendChild(field("Title", textControl("deadline.title", rec.title)));
    card.appendChild(field("Due", textControl("deadline.due", rec.due || "", "date")));
    card.appendChild(field("Kind", selectControl("deadline.kind", optionsFrom(DEADLINE_KINDS, KIND_LABEL), rec.kind)));
    var doneLabel = el("label", { class: "check" });
    var done = document.createElement("input");
    done.type = "checkbox";
    done.checked = !!rec.done;
    done.setAttribute("data-act", "tick-deadline");
    done.setAttribute("data-id", rec.id);
    doneLabel.appendChild(done);
    doneLabel.appendChild(el("span", { text: "Done" }));
    card.appendChild(doneLabel);
    card.appendChild(field("Notes", areaControl("deadline.notes", rec.notes || "")));
    card.appendChild(el("button", { type: "button", class: "btn btn-danger", "data-act": "delete-deadline", "data-id": rec.id, text: "Delete deadline" }));
  }
  frag.appendChild(card);
  return frag;
}

function renderSettings() {
  var settings = doc.settings || emptyDoc().settings;
  var re = doc.reentry || emptyDoc().reentry;
  var frag = document.createDocumentFragment();
  var card = el("section", { class: "card" });
  card.appendChild(el("h2", { text: "Thesis" }));
  if (readOnly) {
    card.appendChild(readLine("Title", settings.title));
    card.appendChild(readLine("Programme", settings.programme));
    card.appendChild(readLine("Supervisor", settings.supervisor));
    card.appendChild(readLine("Target submission", formatDate(settings.targetSubmission)));
  } else {
    card.appendChild(field("Title", textControl("settings.title", settings.title)));
    card.appendChild(field("Programme", textControl("settings.programme", settings.programme)));
    card.appendChild(field("Supervisor", textControl("settings.supervisor", settings.supervisor)));
    card.appendChild(field("Target submission", textControl("settings.targetSubmission", settings.targetSubmission || "", "date")));
  }
  frag.appendChild(card);

  var reCard = el("section", { class: "card" });
  reCard.appendChild(el("h2", { text: "UMinho re-entry reference" }));
  if (readOnly) {
    reCard.appendChild(readLine("Reference", re.reference || "Not set"));
    reCard.appendChild(readLine("Status", STATUS_LABEL[re.status] || re.status));
    reCard.appendChild(readLine("Deadline", formatDate(re.deadline)));
    reCard.appendChild(readLine("Link", re.link));
    reCard.appendChild(readLine("Notes", re.notes));
  } else {
    reCard.appendChild(field("Reference", textControl("reentry.reference", re.reference)));
    reCard.appendChild(field("Status", selectControl("reentry.status", optionsFrom(REENTRY_STATUSES, STATUS_LABEL), re.status)));
    reCard.appendChild(field("Deadline", textControl("reentry.deadline", re.deadline || "", "date")));
    var linkHint = el("span", { class: "hint", "data-link-hint": "1", text: "Only http and https links are opened. Anything else stays as text." });
    linkHint.hidden = !re.link || !!safeHttpUrl(re.link);
    reCard.appendChild(field("Link", textControl("reentry.link", re.link), linkHint));
    reCard.appendChild(field("Notes", areaControl("reentry.notes", re.notes || "")));
  }
  frag.appendChild(reCard);
  return frag;
}

function missing(hash, text) {
  var frag = document.createDocumentFragment();
  frag.appendChild(backLink(hash, "Back"));
  frag.appendChild(emptyCard(text));
  return frag;
}

function render() {
  if (!main) return;
  updateChrome();
  var route = parseRoute();
  var keep = route.key === lastRoute && lastRoute !== "";
  var y = keep ? window.scrollY : 0;
  lastRoute = route.key;
  clear(main);
  if (!doc) {
    main.appendChild(el("p", { class: "muted pad", text: "Loading…" }));
    return;
  }
  var view;
  if (route.name === "chapters") view = renderChapters();
  else if (route.name === "meetings") view = renderMeetings();
  else if (route.name === "deadlines") view = renderDeadlines();
  else if (route.name === "settings") view = renderSettings();
  else view = renderOverview();
  main.appendChild(view);
  if (window.ThesisNotion && typeof window.ThesisNotion.paint === "function") {
    window.ThesisNotion.paint(main, doc);
  }
  window.scrollTo(0, y);
}

function enterDemo() {
  demo = true;
  readOnly = false;
  stopped = false;
  dirty = false;
  doc = normalize(demoDoc(new Date()));
  render();
  if (sync) sync.textContent = "Demo";
}

function scheduleSave() {
  if (demo || readOnly || stopped || !doc || !hasToken()) return;
  dirty = true;
  if (saving) {
    saveAgain = true;
    return;
  }
  if (sync) sync.textContent = "✏️ Saving soon…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushNow, SAVE_DELAY);
}

function mergeRemote(remote) {
  doc = normalize(merge(doc, remote));
  readOnly = doc.schemaVersion > SCHEMA_VERSION;
}

function pushNow() {
  clearTimeout(saveTimer);
  saveTimer = null;
  if (demo || readOnly || stopped || !doc || !hasToken() || !window.GhSync) return;
  if (saving) {
    saveAgain = true;
    return;
  }
  saving = true;
  if (sync) sync.textContent = "☁️ Saving…";
  saveWithRetry(function () {
    return GhSync.save(APP_ID, function () { return doc; }, mergeRemote, { quiet: true });
  }).then(function () {
    saving = false;
    if (saveAgain || dirty) {
      saveAgain = false;
      scheduleSave();
      return;
    }
    dirty = false;
    if (sync) sync.textContent = "✅ Saved " + hhmm();
    if (!fieldFocused()) render();
  }, function (err) {
    saving = false;
    dirty = true;
    var message = err && err.message ? err.message : "Not saved";
    if (message === NOT_SAVED) {
      stopped = true;
      saveAgain = false;
      if (sync) sync.textContent = NOT_SAVED;
      return;
    }
    if (sync) sync.textContent = message.indexOf("⚠️") === 0 ? message : "⚠️ " + message;
    if (!hasToken()) enterDemo();
  });
}

function adopt(remote) {
  var next = normalize(!doc || demo ? remote : merge(doc, remote));
  var same = JSON.stringify(next) === JSON.stringify(doc);
  demo = false;
  doc = next;
  readOnly = doc.schemaVersion > SCHEMA_VERSION;
  dirty = false;
  if (!same) render();
  else updateChrome();
}

function autoLoad() {
  if (!hasToken()) {
    if (!demo) enterDemo();
    return;
  }
  if (loading || saving || saveTimer || dirty || fieldFocused()) return;
  if (!window.GhSync) return;
  loading = true;
  var got = false;
  GhSync.load(APP_ID, function (remote) {
    got = true;
    adopt(remote);
  }).then(function (msg) {
    loading = false;
    if (!got) {
      if (demo || !doc) {
        demo = false;
        readOnly = false;
        doc = emptyDoc();
        render();
      }
      if (sync) sync.textContent = msg || "Nothing saved on GitHub yet";
    } else if (sync && !dirty) {
      sync.textContent = "☁️ Synced " + hhmm();
    }
  }, function (err) {
    loading = false;
    if (!hasToken()) enterDemo();
    if (sync) sync.textContent = "⚠️ " + (err && err.message ? err.message : "Could not load");
  });
}

function connect() {
  if (!window.GhSync) return;
  var got = false;
  GhSync.load(APP_ID, function (remote) {
    got = true;
    adopt(remote);
  }).then(function (msg) {
    if (!got) {
      demo = false;
      readOnly = false;
      dirty = false;
      doc = emptyDoc();
      if (sync) sync.textContent = msg || "Nothing saved on GitHub yet";
      render();
    } else if (sync) {
      sync.textContent = "☁️ Synced " + hhmm();
    }
  }, function (err) {
    if (sync) sync.textContent = "⚠️ " + (err && err.message ? err.message : "Sync cancelled");
    if (!hasToken() && !demo) enterDemo();
  });
}

function touch(record) {
  var stamp = new Date().toISOString();
  if (record) record.updatedAt = stamp;
  doc.updatedAt = stamp;
  scheduleSave();
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function nextOrder() {
  var max = 0;
  live(doc.chapters).forEach(function (chapter) {
    if (Number(chapter.order) > max) max = Number(chapter.order);
  });
  return max + 1;
}

function addChapter() {
  var stamp = new Date().toISOString();
  var id = newId("ch", collectIds(doc));
  doc.chapters.push({
    id: id,
    order: nextOrder(),
    title: "",
    status: "not_started",
    progress: 0,
    words: null,
    targetWords: null,
    due: null,
    notes: "",
    updatedAt: stamp,
  });
  doc.updatedAt = stamp;
  scheduleSave();
  go("#/chapters/" + id);
}

function addMeeting() {
  var stamp = new Date().toISOString();
  var id = newId("mt", collectIds(doc));
  doc.meetings.push({
    id: id,
    date: lisbonToday(new Date()) || "",
    planned: true,
    summary: "",
    chapterIds: [],
    actions: [],
    updatedAt: stamp,
  });
  doc.updatedAt = stamp;
  scheduleSave();
  go("#/meetings/" + id);
}

function addDeadline() {
  var stamp = new Date().toISOString();
  var id = newId("dl", collectIds(doc));
  doc.deadlines.push({
    id: id,
    title: "",
    due: lisbonToday(new Date()) || "",
    kind: "personal",
    done: false,
    notes: "",
    updatedAt: stamp,
  });
  doc.updatedAt = stamp;
  scheduleSave();
  go("#/deadlines/" + id);
}

function moveChapter(id, dir) {
  var list = sortedChapters();
  var index = list.findIndex(function (chapter) { return chapter.id === id; });
  var next = index + (dir === "up" ? -1 : 1);
  if (index < 0 || next < 0 || next >= list.length) return;
  var a = list[index];
  var b = list[next];
  if (a.order === b.order) a.order = dir === "up" ? b.order - 1 : b.order + 1;
  else {
    var order = a.order;
    a.order = b.order;
    b.order = order;
  }
  var stamp = new Date().toISOString();
  a.updatedAt = stamp;
  b.updatedAt = stamp;
  doc.updatedAt = stamp;
  scheduleSave();
  render();
}

function removeRecord(listName, id, back) {
  var rec = findLive(doc[listName], id);
  if (!rec) return;
  var name = rec.title || rec.summary || "this item";
  if (!window.confirm("Delete " + name + "?")) return;
  rec.deleted = true;
  touch(rec);
  go(back);
}

function addAction(meetingId) {
  var meeting = findLive(doc.meetings, meetingId);
  if (!meeting) return;
  if (!Array.isArray(meeting.actions)) meeting.actions = [];
  meeting.actions.push({ id: newId("ac", collectIds(doc)), text: "", done: false, due: null });
  touch(meeting);
  render();
}

function removeAction(meetingId, actionId) {
  var meeting = findLive(doc.meetings, meetingId);
  if (!meeting) return;
  meeting.actions = (meeting.actions || []).filter(function (action) { return action.id !== actionId; });
  touch(meeting);
  render();
}

function tickDeadline(id, done) {
  var rec = findLive(doc.deadlines, id);
  if (!rec || !!rec.done === !!done) return;
  rec.done = !!done;
  touch(rec);
  render();
}

function syncChapterControls(chapter) {
  var status = document.querySelector("[data-field='chapter.status']");
  var progress = document.querySelector("[data-field='chapter.progress']");
  if (status && status.value !== chapter.status) status.value = chapter.status;
  if (progress && String(progress.value) !== String(chapter.progress)) progress.value = String(chapter.progress);
}

function updateSettings(key, value) {
  if (!doc.settings) doc.settings = emptyDoc().settings;
  var next = key === "targetSubmission" ? (value || null) : String(value);
  if (doc.settings[key] === next) return;
  doc.settings[key] = next;
  var stamp = new Date().toISOString();
  doc.settings.updatedAt = stamp;
  doc.updatedAt = stamp;
  scheduleSave();
}

function updateReentry(key, value) {
  if (!doc.reentry) doc.reentry = emptyDoc().reentry;
  var next = value;
  if (key === "deadline") next = value || null;
  else if (key === "status") {
    if (REENTRY_STATUSES.indexOf(value) < 0) return;
    next = value;
  } else next = String(value);
  if (doc.reentry[key] === next) return;
  doc.reentry[key] = next;
  var stamp = new Date().toISOString();
  doc.reentry.updatedAt = stamp;
  doc.updatedAt = stamp;
  scheduleSave();
  if (key === "link") {
    var hint = document.querySelector("[data-link-hint]");
    if (hint) hint.hidden = !next || !!safeHttpUrl(next);
  }
}

function updateChapter(key, value) {
  var chapter = findLive(doc.chapters, parseRoute().id);
  if (!chapter) return;
  if (key === "status" || key === "progress") {
    var beforeStatus = chapter.status;
    var beforeProgress = chapter.progress;
    var patch = {};
    patch[key] = value;
    applyChapterPatch(chapter, patch);
    if (chapter.status === beforeStatus && chapter.progress === beforeProgress) return;
    touch(chapter);
    syncChapterControls(chapter);
    return;
  }
  var next = value;
  if (key === "words" || key === "targetWords") next = intOrNull(value);
  else if (key === "due") next = value || null;
  else next = String(value);
  if (chapter[key] === next) return;
  chapter[key] = next;
  touch(chapter);
}

function updateMeeting(key, value) {
  var meeting = findLive(doc.meetings, parseRoute().id);
  if (!meeting) return;
  var next = key === "planned" ? !!value : (key === "date" ? (value || "") : String(value));
  if (meeting[key] === next) return;
  meeting[key] = next;
  touch(meeting);
}

function updateDeadline(key, value) {
  var rec = findLive(doc.deadlines, parseRoute().id);
  if (!rec) return;
  var next = value;
  if (key === "kind") {
    if (DEADLINE_KINDS.indexOf(value) < 0) return;
    next = value;
  } else if (key === "due") next = value || "";
  else next = String(value);
  if (rec[key] === next) return;
  rec[key] = next;
  touch(rec);
}

function updateAction(node, key, value) {
  var meeting = findLive(doc.meetings, node.getAttribute("data-meeting"));
  if (!meeting) return;
  var action = (meeting.actions || []).find(function (item) { return item && item.id === node.getAttribute("data-id"); });
  if (!action) return;
  var next = key === "due" ? (value || null) : String(value);
  if (action[key] === next) return;
  action[key] = next;
  touch(meeting);
}

function toggleChapterLink(meetingId, chapterId, checked) {
  var meeting = findLive(doc.meetings, meetingId);
  if (!meeting) return;
  var ids = Array.isArray(meeting.chapterIds) ? meeting.chapterIds.slice() : [];
  var has = ids.indexOf(chapterId) >= 0;
  if (checked && !has) ids.push(chapterId);
  if (!checked && has) ids = ids.filter(function (item) { return item !== chapterId; });
  if (has === !!checked) return;
  meeting.chapterIds = ids;
  touch(meeting);
}

function applyField(target) {
  var name = target.getAttribute("data-field");
  if (!name || !doc) return;
  var value = target.type === "checkbox" ? target.checked : target.value;
  if (name.indexOf("settings.") === 0) updateSettings(name.slice(9), value);
  else if (name.indexOf("reentry.") === 0) updateReentry(name.slice(8), value);
  else if (name.indexOf("chapter.") === 0) updateChapter(name.slice(8), value);
  else if (name.indexOf("meeting.") === 0) updateMeeting(name.slice(8), value);
  else if (name.indexOf("deadline.") === 0) updateDeadline(name.slice(9), value);
  else if (name.indexOf("action.") === 0) updateAction(target, name.slice(7), value);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  return new Promise(function (resolve, reject) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    try {
      var ok = document.execCommand("copy");
      document.body.removeChild(area);
      if (ok) resolve();
      else reject(new Error("copy failed"));
    } catch (err) {
      document.body.removeChild(area);
      reject(err);
    }
  });
}

function copyReference(btn) {
  var text = doc && doc.reentry ? doc.reentry.reference : "";
  if (!String(text || "").trim()) return;
  copyText(text).then(function () {
    btn.textContent = "Copied";
    setTimeout(function () {
      if (btn.isConnected) btn.textContent = "Copy";
    }, 1500);
  }, function () {
    if (sync) sync.textContent = "⚠️ Copy failed";
  });
}

function onMainClick(event) {
  var btn = event.target && event.target.closest ? event.target.closest("button[data-act]") : null;
  if (!btn) return;
  var act = btn.getAttribute("data-act");
  if (readOnly && act !== "copy-reference") return;
  var id = btn.getAttribute("data-id");
  if (act === "add-chapter") addChapter();
  else if (act === "add-meeting") addMeeting();
  else if (act === "add-deadline") addDeadline();
  else if (act === "up" || act === "down") moveChapter(id, act);
  else if (act === "delete-chapter") removeRecord("chapters", id, "#/chapters");
  else if (act === "delete-meeting") removeRecord("meetings", id, "#/meetings");
  else if (act === "delete-deadline") removeRecord("deadlines", id, "#/deadlines");
  else if (act === "copy-reference") copyReference(btn);
  else if (act === "add-action") addAction(id);
  else if (act === "remove-action") removeAction(btn.getAttribute("data-meeting"), id);
}

function onMainChange(event) {
  var target = event.target;
  if (!target || readOnly) return;
  var act = target.getAttribute("data-act");
  if (act === "tick-action") {
    if (toggleAction(doc, target.getAttribute("data-meeting"), target.getAttribute("data-id"), target.checked, new Date().toISOString())) {
      scheduleSave();
      render();
    }
    return;
  }
  if (act === "tick-deadline") {
    tickDeadline(target.getAttribute("data-id"), target.checked);
    return;
  }
  if (act === "toggle-chapter") {
    toggleChapterLink(target.getAttribute("data-meeting"), target.getAttribute("data-id"), target.checked);
    return;
  }
  if (target.getAttribute("data-field")) applyField(target);
}

function onMainInput(event) {
  var target = event.target;
  if (!target || readOnly || target.type === "checkbox" || target.tagName === "SELECT") return;
  if (target.getAttribute("data-field")) applyField(target);
}

if (!main || !window.GhSync || typeof GhSync.load !== "function" || typeof GhSync.save !== "function") {
  if (sync) sync.textContent = "⚠️ GitHub sync failed to load";
} else {
  main.addEventListener("click", onMainClick);
  main.addEventListener("change", onMainChange);
  main.addEventListener("input", onMainInput);
  var connectBtn = document.getElementById("btn-connect");
  if (connectBtn) connectBtn.addEventListener("click", connect);
  window.addEventListener("hashchange", render);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      if (saveTimer) pushNow();
    } else autoLoad();
  });
  window.addEventListener("pagehide", function () {
    if (saveTimer) pushNow();
  });
  setInterval(autoLoad, 60000);
  if (!hasToken()) enterDemo();
  else {
    render();
    autoLoad();
  }
}
