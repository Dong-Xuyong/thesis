/**
 * Read-only Notion panel for thesis.json.
 *
 * GhSync already loads the private file and core.normalize keeps unknown keys,
 * including chapters[].notion. This module only parses and paints that object.
 * It never writes the document.
 *
 * Ace stores, per chapter:
 *   priority, estimateHours, satisfaction, reviewed, improvements, comments,
 *   sections[] (name, status, estimatedEffort, text,
 *   reviewedByEmanuel, reviewedByCortez), url, status, completionRate.
 * Due date is read from notion.due when present, otherwise the chapter due.
 * Notion property names (including the "Satifaction" typo) are accepted too.
 * completionRate is a fraction when it is between 0 and 1, otherwise a percent.
 *
 * Optional document keys, shown only when present:
 *   thesisDb | notionDb | notion.database | notion.thesis | databases.thesis
 *   attachments | notion.attachments
 *   or a chapter titled Attachments, via its sections.
 */
import { safeHttpUrl } from "./core.js";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DATE_KEY = /^(\d{4})-(\d{2})-(\d{2})/;

function isObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function pick(source, keys) {
  if (!isObject(source)) return undefined;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] != null && source[key] !== "") {
      return source[key];
    }
  }
  return undefined;
}

export function plainText(value) {
  return String(value == null ? "" : value)
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]*>/g, "");
}

function textOrNull(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value !== "string") return null;
  const plain = plainText(value).trim();
  return plain === "" ? null : plain;
}

function numberOrNull(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = parseFloat(value.trim());
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function boolOrNull(value) {
  if (value === true || value === "__YES__") return true;
  if (value === false || value === "__NO__") return false;
  if (typeof value === "string") {
    const flag = value.trim().toLowerCase();
    if (flag === "true" || flag === "yes") return true;
    if (flag === "false" || flag === "no") return false;
  }
  return null;
}

function validDate(iso) {
  const match = DATE_KEY.exec(iso || "");
  if (!match) return null;
  const value = match[0];
  const parts = value.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (utc.getUTCFullYear() !== year || utc.getUTCMonth() !== month - 1 || utc.getUTCDate() !== day) return null;
  return value;
}

function dateOrNull(value) {
  if (isObject(value)) return dateOrNull(value.start || value.date || null);
  if (typeof value !== "string") return null;
  return validDate(value.trim());
}

export function completionPercent(value) {
  const parsed = numberOrNull(value);
  if (parsed == null) return null;
  const percent = parsed >= 0 && parsed <= 1 ? parsed * 100 : parsed;
  if (percent < 0) return 0;
  if (percent > 100) return 100;
  return Math.round(percent * 10) / 10;
}

export function parseSection(raw) {
  if (!isObject(raw)) return null;
  const effort = pick(raw, ["estimatedEffort", "Estimated Effort", "Estimate Effort", "estimate", "estimateHours"]);
  const effortNumber = numberOrNull(effort);
  return {
    name: textOrNull(pick(raw, ["name", "Name", "title", "Chapter"])) || "Untitled section",
    status: textOrNull(pick(raw, ["status", "Status"])),
    estimatedEffort: effortNumber != null ? effortNumber : textOrNull(effort),
    text: textOrNull(pick(raw, ["text", "Text", "description", "Description"])),
    emanuel: boolOrNull(pick(raw, ["reviewedByEmanuel", "emanuel", "Reviewed by Emanuel", "Review by Emanuel"])),
    cortez: boolOrNull(pick(raw, ["reviewedByCortez", "cortez", "Reviewed by Cortez", "Review by Cortez"])),
    url: safeHttpUrl(textOrNull(pick(raw, ["url", "link"])) || ""),
  };
}

function parseSections(value) {
  if (!Array.isArray(value)) return [];
  return value.map(parseSection).filter(Boolean);
}

export function parseChapterNotion(input) {
  // A chapter always has status. Only an explicit notion object counts,
  // otherwise every chapter would render an empty card.
  if (!isObject(input) || !isObject(input.notion)) return null;
  const source = input.notion;
  const completion = completionPercent(pick(source, ["completionRate", "completion", "Completion rate"]));
  const estimate = numberOrNull(pick(source, ["estimateHours", "estimate", "Estimate time", "estimateTime"]));
  const satisfaction = numberOrNull(pick(source, ["satisfaction", "satifaction", "Satifaction", "Satisfaction"]));
  const due = dateOrNull(pick(source, ["due", "dueDate", "Due date"]))
    || dateOrNull(input.due);
  return {
    priority: textOrNull(pick(source, ["priority", "Priority"])),
    due: due,
    estimateHours: estimate,
    completion: completion,
    satisfaction: satisfaction,
    reviewed: boolOrNull(pick(source, ["reviewed", "Reviewed"])),
    improvements: textOrNull(pick(source, ["improvements", "Improvements"])),
    comments: textOrNull(pick(source, ["comments", "Comments"])),
    status: textOrNull(pick(source, ["status", "Status"])),
    url: safeHttpUrl(textOrNull(pick(source, ["url", "notionUrl", "link"])) || ""),
    sections: parseSections(pick(source, ["sections", "checklist", "items"]) || source.sections),
  };
}

function childAt(root, path) {
  let current = root;
  for (let i = 0; i < path.length; i += 1) {
    if (!isObject(current) || !Object.prototype.hasOwnProperty.call(current, path[i])) return undefined;
    current = current[path[i]];
  }
  return current;
}

function firstArray(root, paths) {
  for (let i = 0; i < paths.length; i += 1) {
    const value = childAt(root, paths[i]);
    if (Array.isArray(value)) return value;
  }
  return null;
}

function liveChapters(doc) {
  const list = doc && Array.isArray(doc.chapters) ? doc.chapters : [];
  return list.filter(function (chapter) {
    return isObject(chapter) && chapter.deleted !== true;
  });
}

function rowTitle(raw, parsed) {
  const title = textOrNull(pick(raw, ["Chapter", "title", "name", "Name"]));
  if (title) return title;
  if (parsed && parsed.name) return parsed.name;
  return "Untitled chapter";
}

function parseTableRow(raw) {
  if (!isObject(raw)) return null;
  const notion = parseChapterNotion(isObject(raw.notion) ? raw : { notion: raw });
  if (!notion) return null;
  const id = raw.id == null ? "" : String(raw.id);
  return Object.assign({
    title: rowTitle(raw, null),
    href: id ? "#/chapters/" + id : "",
  }, notion);
}

export function thesisTableRows(doc) {
  if (!isObject(doc)) return null;
  const explicit = firstArray(doc, [
    ["thesisDb"],
    ["notionDb"],
    ["notion", "database"],
    ["notion", "thesis"],
    ["databases", "thesis"],
  ]);
  if (explicit) return explicit.map(parseTableRow).filter(Boolean);
  const rows = [];
  liveChapters(doc).forEach(function (chapter) {
    if (!isObject(chapter.notion)) return;
    const notion = parseChapterNotion(chapter);
    if (!notion) return;
    rows.push(Object.assign({
      title: textOrNull(chapter.title) || "Untitled chapter",
      href: chapter.id ? "#/chapters/" + chapter.id : "",
    }, notion));
  });
  return rows.length ? rows : null;
}

function isAttachmentsChapter(chapter) {
  return /^\s*attachments?\s*$/i.test(String(chapter && chapter.title || ""));
}

export function attachmentItems(doc) {
  if (!isObject(doc)) return null;
  const explicit = firstArray(doc, [
    ["attachments"],
    ["notion", "attachments"],
    ["attachmentList"],
  ]);
  if (explicit) return explicit.map(parseSection).filter(Boolean);
  const chapter = liveChapters(doc).find(isAttachmentsChapter);
  if (!chapter || !isObject(chapter.notion)) return null;
  return parseSections(chapter.notion.sections || chapter.notion.checklist || chapter.notion.items);
}

export function formatDate(iso) {
  const value = dateOrNull(iso);
  if (!value) return "";
  const parts = value.split("-");
  return Number(parts[2]) + " " + MONTHS[Number(parts[1]) - 1] + " " + parts[0];
}

export function formatHours(value) {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  const rounded = Math.round(value * 10) / 10;
  return String(rounded) + " h";
}

function readRoute() {
  const parts = String(location.hash || "").replace(/^#/, "").split("/").filter(Boolean);
  const name = parts[0] || "overview";
  const known = name === "chapters" || name === "meetings" || name === "deadlines" || name === "settings";
  return { name: known ? name : "overview", id: parts[1] || "" };
}

function findChapter(doc, id) {
  return liveChapters(doc).find(function (chapter) { return String(chapter.id) === String(id); }) || null;
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  const props = attrs || {};
  Object.keys(props).forEach(function (key) {
    const val = props[key];
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

function dash(value) {
  return value == null || value === "" ? "—" : String(value);
}

function yesNo(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "—";
}

function priorityClass(priority) {
  const name = String(priority || "").trim().toLowerCase();
  if (name === "high" || name === "medium" || name === "low") return " notion-pri-" + name;
  return "";
}

function chip(text, extra) {
  return el("span", { class: "notion-chip" + (extra || ""), text: text });
}

function field(label, content, wide) {
  const row = el("div", { class: wide ? "notion-field notion-field-wide" : "notion-field" });
  row.appendChild(el("dt", { text: label }));
  const dd = el("dd");
  if (typeof content === "string") dd.textContent = content;
  else dd.appendChild(content);
  row.appendChild(dd);
  return row;
}

function prose(text) {
  const node = el("p", { class: "notion-prose", text: dash(text) });
  return node;
}

function completionBar(percent) {
  if (percent == null) return document.createTextNode("—");
  const shown = String(percent) + "%";
  const row = el("div", { class: "notion-bar-row" });
  const wrap = el("div", { class: "notion-bar", role: "progressbar" });
  wrap.setAttribute("aria-valuemin", "0");
  wrap.setAttribute("aria-valuemax", "100");
  wrap.setAttribute("aria-valuenow", String(Math.round(percent)));
  wrap.setAttribute("aria-label", "Completion " + shown);
  const fill = el("span", { class: "notion-bar-fill" });
  fill.style.width = percent + "%";
  wrap.appendChild(fill);
  row.appendChild(wrap);
  row.appendChild(el("span", { class: "notion-bar-label", text: shown }));
  return row;
}

function tick(label, value) {
  const on = value === true;
  const node = el("span", {
    class: on ? "notion-tick is-on" : "notion-tick",
    text: (on ? "✓ " : "○ ") + label,
  });
  node.setAttribute("role", "img");
  node.setAttribute("aria-label", label + (on ? " reviewed" : " not reviewed"));
  return node;
}

function sectionItem(section) {
  const li = el("li", { class: "notion-section" });
  const head = el("div", { class: "notion-section-head" });
  head.appendChild(el("span", { class: "notion-section-name", text: section.name }));
  if (section.status) head.appendChild(chip(section.status, ""));
  li.appendChild(head);
  const effort = formatHours(section.estimatedEffort);
  if (effort) li.appendChild(el("p", { class: "notion-section-effort", text: "Estimate " + effort }));
  if (section.text) li.appendChild(el("p", { class: "notion-prose", text: section.text }));
  const ticks = el("div", { class: "notion-ticks" });
  ticks.appendChild(tick("Emanuel", section.emanuel));
  ticks.appendChild(tick("Cortez", section.cortez));
  li.appendChild(ticks);
  return li;
}

export function renderChapterCard(chapter, open) {
  const notion = parseChapterNotion(chapter);
  if (!notion || typeof document === "undefined") return null;
  const details = el("details", { class: "notion-card", "data-notion": "chapter" });
  if (open) details.open = true;
  const summary = el("summary", { class: "notion-summary" });
  summary.appendChild(el("span", { class: "notion-summary-title", text: "Notion" }));
  if (notion.priority) summary.appendChild(chip(notion.priority, priorityClass(notion.priority)));
  if (notion.completion != null) summary.appendChild(el("span", { class: "notion-summary-pct", text: notion.completion + "%" }));
  if (notion.reviewed === true) summary.appendChild(chip("Reviewed", " notion-pri-low"));
  details.appendChild(summary);

  const fields = el("dl", { class: "notion-fields" });
  fields.appendChild(field("Priority", notion.priority ? chip(notion.priority, priorityClass(notion.priority)) : "—"));
  fields.appendChild(field("Due date", dash(formatDate(notion.due))));
  fields.appendChild(field("Estimate", dash(formatHours(notion.estimateHours))));
  fields.appendChild(field("Completion", completionBar(notion.completion), true));
  fields.appendChild(field("Satisfaction", notion.satisfaction == null ? "—" : String(notion.satisfaction)));
  fields.appendChild(field("Reviewed", yesNo(notion.reviewed)));
  if (notion.status) fields.appendChild(field("Status", notion.status));
  fields.appendChild(field("Improvements", prose(notion.improvements), true));
  fields.appendChild(field("Comments", prose(notion.comments), true));
  details.appendChild(fields);

  details.appendChild(el("h3", { class: "notion-subhead", text: "Sections" }));
  if (!notion.sections.length) {
    details.appendChild(el("p", { class: "notion-empty", text: "No sections." }));
  } else {
    const list = el("ul", { class: "notion-sections" });
    notion.sections.forEach(function (section) { list.appendChild(sectionItem(section)); });
    details.appendChild(list);
  }
  if (notion.url) {
    details.appendChild(el("a", {
      class: "notion-link",
      href: notion.url,
      target: "_blank",
      rel: "noopener noreferrer",
      text: "Open in Notion",
    }));
  }
  return details;
}

function tableHeader(label) {
  return el("th", { scope: "col", text: label });
}

function renderTable(rows) {
  const wrap = el("section", { class: "notion-card notion-panel", "data-notion": "table" });
  wrap.appendChild(el("h2", { class: "notion-panel-title", text: "Thesis DB" }));
  if (!rows.length) {
    wrap.appendChild(el("p", { class: "notion-empty", text: "No chapters in the Thesis DB." }));
    return wrap;
  }
  const scroller = el("div", { class: "notion-table-wrap" });
  const table = el("table", { class: "notion-table" });
  const head = el("thead");
  const headRow = el("tr");
  ["Chapter", "Priority", "Due", "Estimate", "Completion", "Satisfaction", "Reviewed"].forEach(function (label) {
    headRow.appendChild(tableHeader(label));
  });
  head.appendChild(headRow);
  table.appendChild(head);
  const body = el("tbody");
  rows.forEach(function (row) {
    const tr = el("tr");
    const name = el("td");
    if (row.href) name.appendChild(el("a", { class: "notion-link", href: row.href, text: row.title }));
    else name.textContent = row.title;
    tr.appendChild(name);
    const pri = el("td");
    pri.appendChild(row.priority ? chip(row.priority, priorityClass(row.priority)) : document.createTextNode("—"));
    tr.appendChild(pri);
    tr.appendChild(el("td", { text: dash(formatDate(row.due)) }));
    tr.appendChild(el("td", { text: dash(formatHours(row.estimateHours)) }));
    const completion = el("td");
    completion.appendChild(completionBar(row.completion));
    tr.appendChild(completion);
    tr.appendChild(el("td", { text: row.satisfaction == null ? "—" : String(row.satisfaction) }));
    tr.appendChild(el("td", { text: yesNo(row.reviewed) }));
    body.appendChild(tr);
  });
  table.appendChild(body);
  scroller.appendChild(table);
  wrap.appendChild(scroller);
  return wrap;
}

function renderAttachments(items) {
  const wrap = el("section", { class: "notion-card notion-panel", "data-notion": "attachments" });
  wrap.appendChild(el("h2", { class: "notion-panel-title", text: "Attachments" }));
  if (!items.length) {
    wrap.appendChild(el("p", { class: "notion-empty", text: "No attachments." }));
    return wrap;
  }
  const list = el("ul", { class: "notion-sections" });
  items.forEach(function (item) { list.appendChild(sectionItem(item)); });
  wrap.appendChild(list);
  return wrap;
}

function paintUnsafe(root, doc) {
  root.querySelectorAll("[data-notion]").forEach(function (node) { node.remove(); });
  const route = readRoute();
  if (route.name === "chapters" && route.id) {
    const card = renderChapterCard(findChapter(doc, route.id), true);
    if (card) {
      const back = root.querySelector("a.back, a[href='#/chapters']");
      if (back && back.parentNode === root) root.insertBefore(card, back.nextSibling);
      else root.insertBefore(card, root.firstChild);
    }
  }
  if (route.name === "chapters" && !route.id) {
    root.querySelectorAll("a[href^='#/chapters/']").forEach(function (link) {
      if (link.closest("[data-notion]")) return;
      const href = link.getAttribute("href") || "";
      const id = href.split("/")[2] || "";
      const card = renderChapterCard(findChapter(doc, id), false);
      if (!card) return;
      const item = link.closest("li");
      if (item) {
        item.appendChild(card);
        return;
      }
      const block = link.closest("article") || link;
      if (block.parentNode) block.parentNode.insertBefore(card, block.nextSibling);
    });
  }
  if (route.name === "overview" || (route.name === "chapters" && !route.id)) {
    const rows = thesisTableRows(doc);
    const attachments = attachmentItems(doc);
    if (rows || attachments) {
      const block = el("div", { "data-notion": "extras" });
      if (rows) block.appendChild(renderTable(rows));
      if (attachments) block.appendChild(renderAttachments(attachments));
      if (route.name === "overview") root.appendChild(block);
      else root.insertBefore(block, root.firstChild);
    }
  }
}

export function paint(root, doc) {
  if (!root || !doc || typeof document === "undefined") return;
  try {
    paintUnsafe(root, doc);
  } catch (err) {
    if (typeof console !== "undefined" && console.error) console.error(err);
  }
}

if (typeof window !== "undefined") {
  window.ThesisNotion = {
    paint: paint,
    parseChapterNotion: parseChapterNotion,
    parseSection: parseSection,
    thesisTableRows: thesisTableRows,
    attachmentItems: attachmentItems,
  };
}
