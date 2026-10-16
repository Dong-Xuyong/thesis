/**
 * Parsing tests for chapters[].notion. Fixtures are fake. No GitHub calls.
 * Run: node tests/notion.test.mjs
 */
import assert from "node:assert/strict";
import { merge, normalize } from "../core.js";
import { demoDoc } from "../demo.js";
import {
  attachmentItems,
  boolOrNull,
  completionPercent,
  parseChapterNotion,
  parseSection,
  plainText,
  thesisTableRows,
} from "../notion.js";

const full = parseChapterNotion({
  id: "ch_exaa01",
  title: "EXAMPLE Opening",
  due: "2026-04-02",
  notion: {
    priority: "High",
    estimateHours: 8,
    satisfaction: 50,
    reviewed: false,
    improvements: "EXAMPLE Tighten the claim",
    comments: "EXAMPLE Line one<br>Line two",
    url: "https://example.com/notion/opening",
    status: "In progress",
    completionRate: 0.5,
    sections: [
      {
        name: "EXAMPLE Claim",
        status: "In progress",
        estimatedEffort: 2,
        text: "EXAMPLE State the claim",
        reviewedByEmanuel: true,
        reviewedByCortez: false,
      },
    ],
  },
});

assert.equal(full.priority, "High");
assert.equal(full.due, "2026-04-02");
assert.equal(full.estimateHours, 8);
assert.equal(full.completion, 50);
assert.equal(full.satisfaction, 50);
assert.equal(full.reviewed, false);
assert.equal(full.improvements, "EXAMPLE Tighten the claim");
assert.equal(full.comments, "EXAMPLE Line one\nLine two");
assert.equal(full.url, "https://example.com/notion/opening");
assert.equal(full.status, "In progress");
assert.equal(full.sections.length, 1);
assert.equal(full.sections[0].emanuel, true);
assert.equal(full.sections[0].cortez, false);
assert.equal(full.sections[0].estimatedEffort, 2);

assert.equal(parseChapterNotion({ title: "EXAMPLE" }), null);
assert.equal(parseChapterNotion(null), null);
assert.equal(parseChapterNotion({ notion: "nope" }), null);

const sparse = parseChapterNotion({
  notion: { priority: "Low" },
  due: "2026-05-01",
});
assert.equal(sparse.priority, "Low");
assert.equal(sparse.due, "2026-05-01");
assert.equal(sparse.estimateHours, null);
assert.equal(sparse.completion, null);
assert.equal(sparse.satisfaction, null);
assert.equal(sparse.reviewed, null);
assert.equal(sparse.improvements, null);
assert.equal(sparse.comments, null);
assert.equal(sparse.url, null);
assert.equal(sparse.sections.length, 0);

const aliased = parseChapterNotion({
  notion: {
    Priority: "Medium",
    "Due date": "2026-12-01",
    "Estimate time": "3",
    "Completion rate": 75,
    Satifaction: 40,
    Reviewed: "__YES__",
    Improvements: "EXAMPLE <b>Keep</b>",
    Comments: "",
    url: "javascript:alert(1)",
    sections: [
      {
        Name: "EXAMPLE Method note",
        Status: "Done",
        "Estimate Effort": 4,
        Text: "EXAMPLE Note",
        "Review by Emanuel": "__NO__",
        "Reviewed by Cortez": "__YES__",
      },
    ],
  },
});
assert.equal(aliased.priority, "Medium");
assert.equal(aliased.due, "2026-12-01");
assert.equal(aliased.estimateHours, 3);
assert.equal(aliased.completion, 75);
assert.equal(aliased.satisfaction, 40);
assert.equal(aliased.reviewed, true);
assert.equal(aliased.improvements, "EXAMPLE Keep");
assert.equal(aliased.comments, null);
assert.equal(aliased.url, null);
assert.equal(aliased.sections[0].name, "EXAMPLE Method note");
assert.equal(aliased.sections[0].status, "Done");
assert.equal(aliased.sections[0].estimatedEffort, 4);
assert.equal(aliased.sections[0].emanuel, false);
assert.equal(aliased.sections[0].cortez, true);

assert.equal(completionPercent(0), 0);
assert.equal(completionPercent(1), 100);
assert.equal(completionPercent(0.25), 25);
assert.equal(completionPercent(150), 100);
assert.equal(completionPercent("nope"), null);
assert.equal(boolOrNull("__YES__"), true);
assert.equal(boolOrNull("__NO__"), false);
assert.equal(boolOrNull(undefined), null);
assert.equal(plainText("A<br/>B"), "A\nB");
assert.equal(parseSection(null), null);
assert.equal(parseSection({}).name, "Untitled section");

const explicitTable = thesisTableRows({
  thesisDb: [
    {
      Chapter: "EXAMPLE Intro",
      Priority: "High",
      "Completion rate": 0.25,
      Satifaction: 40,
      Reviewed: "__YES__",
      "Due date": "2026-12-01",
      "Estimate time": 3,
    },
  ],
  chapters: [
    { id: "ch_skip01", title: "EXAMPLE Ignored", notion: { priority: "Low" } },
  ],
});
assert.equal(explicitTable.length, 1);
assert.equal(explicitTable[0].title, "EXAMPLE Intro");
assert.equal(explicitTable[0].completion, 25);
assert.equal(explicitTable[0].reviewed, true);
assert.equal(explicitTable[0].due, "2026-12-01");

const fromChapters = thesisTableRows({
  chapters: [
    { id: "ch_exaa01", title: "EXAMPLE Opening", deleted: true, notion: { priority: "High" } },
    { id: "ch_exaa02", title: "EXAMPLE Literature", notion: { priority: "Medium", completionRate: 0.2 } },
  ],
});
assert.equal(fromChapters.length, 1);
assert.equal(fromChapters[0].title, "EXAMPLE Literature");
assert.equal(fromChapters[0].href, "#/chapters/ch_exaa02");
assert.equal(fromChapters[0].completion, 20);
assert.equal(thesisTableRows({ chapters: [] }), null);
assert.equal(thesisTableRows(null), null);

const attached = attachmentItems({
  attachments: [
    { name: "EXAMPLE Abstract", status: "Done", text: "EXAMPLE Placeholder", reviewedByEmanuel: true },
  ],
  chapters: [
    { title: "Attachments", notion: { sections: [{ name: "EXAMPLE Other" }] } },
  ],
});
assert.equal(attached.length, 1);
assert.equal(attached[0].name, "EXAMPLE Abstract");
assert.equal(attached[0].emanuel, true);

const fromChapter = attachmentItems({
  chapters: [
    {
      title: "Attachments",
      notion: { sections: [{ Name: "EXAMPLE Figure", "Reviewed by Emanuel": true, "Reviewed by Cortez": false }] },
    },
  ],
});
assert.equal(fromChapter[0].name, "EXAMPLE Figure");
assert.equal(fromChapter[0].emanuel, true);
assert.equal(fromChapter[0].cortez, false);
assert.equal(attachmentItems({ chapters: [{ title: "EXAMPLE Opening" }] }), null);
assert.equal(attachmentItems({ attachments: [] }).length, 0);

const nested = attachmentItems({
  notion: { attachments: [{ name: "EXAMPLE Pack" }] },
});
assert.equal(nested[0].name, "EXAMPLE Pack");

const kept = normalize({
  chapters: [{
    id: "ch_exaa01",
    title: "EXAMPLE Opening",
    notion: { priority: "High", comments: "EXAMPLE Keep", sections: [] },
    updatedAt: "2026-01-01T00:00:00.000Z",
  }],
});
assert.equal(kept.chapters[0].notion.priority, "High");
assert.equal(parseChapterNotion(kept.chapters[0]).comments, "EXAMPLE Keep");

const merged = merge(
  {
    updatedAt: "2026-01-01T00:00:00.000Z",
    chapters: [{
      id: "ch_exaa01",
      title: "EXAMPLE Local",
      notion: { priority: "High", comments: "EXAMPLE From Notion" },
      updatedAt: "2026-01-01T00:00:00.000Z",
    }],
  },
  {
    updatedAt: "2026-02-01T00:00:00.000Z",
    chapters: [{
      id: "ch_exaa01",
      title: "EXAMPLE Remote title",
      updatedAt: "2026-02-01T00:00:00.000Z",
    }],
  },
);
assert.equal(merged.chapters[0].title, "EXAMPLE Remote title");
assert.equal(merged.chapters[0].notion.comments, "EXAMPLE From Notion");

const demo = demoDoc(new Date("2026-10-16T12:00:00.000Z"));
const opening = parseChapterNotion(demo.chapters[0]);
assert.equal(opening.priority, "High");
assert.ok(opening.sections.length >= 1);
assert.equal(opening.sections[0].name.startsWith("EXAMPLE"), true);
assert.equal(demo.chapters[2].notion, undefined);
assert.ok(attachmentItems(demo).length >= 1);
assert.equal(attachmentItems(demo)[0].name.startsWith("EXAMPLE"), true);
assert.equal(JSON.stringify(demo).toLowerCase().includes("umin" + "ho"), false);

console.log("notion tests ok");
