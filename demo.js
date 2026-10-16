/**
 * Fake fixtures for demo mode. Nothing here is saved, and every title starts
 * with EXAMPLE. The re-entry reference is a placeholder, not a real value.
 */
import { lisbonToday } from "./core.js";

function addDays(iso, days) {
  const next = Date.parse(iso + "T00:00:00Z") + days * 86400000;
  return new Date(next).toISOString().slice(0, 10);
}

export function demoDoc(now) {
  const today = lisbonToday(now == null ? new Date() : now);
  const stamp = "2026-01-15T09:00:00.000Z";
  return {
    app: "thesis",
    schemaVersion: 1,
    owner: "ace",
    updatedAt: stamp,
    settings: {
      title: "EXAMPLE Thesis on calm interfaces",
      programme: "EXAMPLE Programme",
      supervisor: "EXAMPLE Supervisor",
      targetSubmission: addDays(today, 120),
      updatedAt: stamp,
    },
    reentry: {
      reference: "EXAMPLE-0000",
      status: "pending",
      deadline: addDays(today, 30),
      link: "https://example.com/reentry",
      notes: "EXAMPLE Waiting on the office",
      updatedAt: stamp,
    },
    chapters: [
      {
        id: "ch_exaa01",
        order: 1,
        title: "EXAMPLE Opening",
        status: "drafting",
        progress: 50,
        words: 900,
        targetWords: 2000,
        due: addDays(today, 14),
        notes: "EXAMPLE Opening argument",
        notion: {
          priority: "High",
          due: addDays(today, 14),
          estimateHours: 8,
          satisfaction: 50,
          reviewed: false,
          improvements: "EXAMPLE Tighten the opening claim",
          comments: "EXAMPLE Waiting on a sample figure",
          url: "https://example.com/notion/opening",
          status: "In progress",
          completionRate: 0.5,
          sections: [
            {
              name: "EXAMPLE Claim",
              status: "In progress",
              estimatedEffort: 2,
              text: "EXAMPLE State the claim in one paragraph",
              reviewedByEmanuel: true,
              reviewedByCortez: false,
            },
            {
              name: "EXAMPLE Scope",
              status: "Not started",
              estimatedEffort: 1,
              text: "",
              reviewedByEmanuel: false,
              reviewedByCortez: false,
            },
          ],
        },
        updatedAt: stamp,
      },
      {
        id: "ch_exaa02",
        order: 2,
        title: "EXAMPLE Literature",
        status: "outlining",
        progress: 40,
        words: 600,
        targetWords: 3000,
        due: addDays(today, 28),
        notes: "",
        notion: {
          priority: "Low",
          comments: "EXAMPLE Sources still to file",
        },
        updatedAt: stamp,
      },
      {
        id: "ch_exaa03",
        order: 3,
        title: "EXAMPLE Method",
        status: "not_started",
        progress: 10,
        words: 0,
        targetWords: 3000,
        due: null,
        notes: "",
        updatedAt: stamp,
      },
      {
        id: "ch_exaa04",
        order: 4,
        title: "EXAMPLE Findings",
        status: "not_started",
        progress: 0,
        words: null,
        targetWords: 2000,
        due: null,
        notes: "",
        notion: {
          priority: "Medium",
          estimateHours: 12,
          satisfaction: 20,
          reviewed: true,
          improvements: "",
          comments: "EXAMPLE Outline only",
          url: "https://example.com/notion/findings",
          status: "Not started",
          completionRate: 0,
          sections: [
            {
              name: "EXAMPLE Result",
              status: "Not started",
              estimatedEffort: 6,
              text: "EXAMPLE Add the first result",
              reviewedByEmanuel: false,
              reviewedByCortez: true,
            },
          ],
        },
        updatedAt: stamp,
      },
    ],
    meetings: [
      {
        id: "mt_exaa01",
        date: addDays(today, -7),
        planned: false,
        summary: "EXAMPLE Reviewed the opening chapter",
        chapterIds: ["ch_exaa01"],
        actions: [
          { id: "ac_exaa01", text: "EXAMPLE Send the outline", done: false, due: addDays(today, 2) },
          { id: "ac_exaa02", text: "EXAMPLE File the notes", done: true, due: null },
        ],
        updatedAt: stamp,
      },
      {
        id: "mt_exaa02",
        date: addDays(today, 5),
        planned: true,
        summary: "EXAMPLE Plan the next draft",
        chapterIds: ["ch_exaa02"],
        actions: [
          { id: "ac_exaa03", text: "EXAMPLE Bring the draft", done: false, due: addDays(today, 5) },
        ],
        updatedAt: stamp,
      },
    ],
    deadlines: [
      {
        id: "dl_exaa01",
        title: "EXAMPLE Chapter draft",
        due: addDays(today, 3),
        kind: "supervisor",
        done: false,
        notes: "",
        updatedAt: stamp,
      },
      {
        id: "dl_exaa02",
        title: "EXAMPLE Supervisor pack",
        due: addDays(today, 21),
        kind: "university",
        done: false,
        notes: "",
        updatedAt: stamp,
      },
      {
        id: "dl_exaa03",
        title: "EXAMPLE Archive notes",
        due: addDays(today, -10),
        kind: "personal",
        done: true,
        notes: "EXAMPLE Filed",
        updatedAt: stamp,
      },
    ],
    attachments: [
      {
        name: "EXAMPLE Abstract",
        status: "Done",
        estimatedEffort: 1,
        text: "EXAMPLE Placeholder abstract",
        reviewedByEmanuel: true,
        reviewedByCortez: false,
      },
      {
        name: "EXAMPLE Summary",
        status: "Not started",
        estimatedEffort: 2,
        text: "",
        reviewedByEmanuel: false,
        reviewedByCortez: true,
      },
    ],
  };
}
