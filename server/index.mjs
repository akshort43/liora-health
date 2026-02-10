import cors from "cors";
import Database from "better-sqlite3";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../data");
const DB_PATH = path.join(DATA_DIR, "liora-submissions.sqlite");
const PORT = Number(process.env.LIORA_API_PORT ?? 8787);

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS support_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submitted_at TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    conditions_json TEXT NOT NULL,
    symptoms_json TEXT NOT NULL,
    support_types_json TEXT NOT NULL,
    raw_payload TEXT NOT NULL,
    human_summary TEXT NOT NULL,
    ai_summary TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_support_submissions_submitted_at
  ON support_submissions(submitted_at DESC);

  CREATE VIEW IF NOT EXISTS support_submission_overview AS
  SELECT
    id,
    submitted_at,
    first_name || ' ' || last_name AS full_name,
    email,
    human_summary
  FROM support_submissions;
`);

const insertSubmission = db.prepare(`
  INSERT INTO support_submissions (
    submitted_at,
    first_name,
    last_name,
    email,
    phone,
    message,
    conditions_json,
    symptoms_json,
    support_types_json,
    raw_payload,
    human_summary,
    ai_summary
  ) VALUES (
    @submittedAt,
    @firstName,
    @lastName,
    @email,
    @phone,
    @message,
    @conditionsJson,
    @symptomsJson,
    @supportTypesJson,
    @rawPayload,
    @humanSummary,
    @aiSummary
  )
`);

const listSubmissions = db.prepare(`
  SELECT
    id,
    submitted_at,
    first_name,
    last_name,
    email,
    phone,
    message,
    conditions_json,
    symptoms_json,
    support_types_json,
    human_summary,
    ai_summary
  FROM support_submissions
  ORDER BY id DESC
  LIMIT @limit
`);

const submissionSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().default(""),
  message: z.string().trim().max(1000).optional().default(""),
  selectedCategories: z.array(z.string().trim().min(1).max(120)).default([]),
  subconditionSelections: z.record(z.string(), z.string()).default({}),
  subconditionOtherText: z.record(z.string(), z.string()).default({}),
  otherCondition: z.string().trim().max(200).optional().default(""),
  dontKnow: z.boolean().default(false),
  selectedSymptoms: z.array(z.string().trim().min(1).max(120)).default([]),
  selectedSupportTypes: z.array(z.string().trim().min(1).max(120)).default([]),
});

const normalizeList = (values) => [...new Set(values.map((value) => value.trim()).filter(Boolean))];

const buildConditionDetails = (payload) => {
  const details = [];

  for (const category of payload.selectedCategories) {
    if (category === "Other") {
      if (payload.otherCondition) {
        details.push(`Other: ${payload.otherCondition}`);
      } else {
        details.push("Other");
      }
      continue;
    }

    const selected = payload.subconditionSelections[category];
    if (!selected) {
      details.push(category);
      continue;
    }

    if (selected === "__other__") {
      const customValue = payload.subconditionOtherText[category]?.trim();
      details.push(customValue ? `${category}: ${customValue}` : `${category}: Other`);
      continue;
    }

    details.push(`${category}: ${selected}`);
  }

  return details;
};

const buildHumanSummary = ({ submittedAt, payload, conditionDetails }) => {
  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const message = payload.message || "No additional message provided.";
  const categories = payload.selectedCategories.length > 0 ? payload.selectedCategories.join(", ") : "None";
  const conditions = conditionDetails.length > 0 ? conditionDetails.join("; ") : "None";
  const symptoms = payload.selectedSymptoms.length > 0 ? payload.selectedSymptoms.join(", ") : "None";
  const supportTypes = payload.selectedSupportTypes.length > 0 ? payload.selectedSupportTypes.join(", ") : "None";

  return [
    `Submission Timestamp: ${submittedAt}`,
    `Name: ${fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Categories: ${categories}`,
    `Condition Details: ${conditions}`,
    `Unsure About Diagnosis: ${payload.dontKnow ? "Yes" : "No"}`,
    `Symptoms: ${symptoms}`,
    `Support Requested: ${supportTypes}`,
    `Message: ${message}`,
  ].join("\n");
};

const buildAiSummary = ({ submittedAt, payload, conditionDetails }) => ({
  record_type: "support_intake_submission",
  submitted_at: submittedAt,
  person: {
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone: payload.phone || null,
  },
  intake: {
    selected_categories: payload.selectedCategories,
    selected_conditions: conditionDetails,
    unsure_about_diagnosis: payload.dontKnow,
    symptoms: payload.selectedSymptoms,
    support_requested: payload.selectedSupportTypes,
    message: payload.message || null,
  },
});

const toMarkdownReport = (rows) => {
  const lines = [
    "# LIORA Support Submissions",
    "",
    `Total records: ${rows.length}`,
    "",
  ];

  for (const row of rows) {
    lines.push(`## Submission ${row.id}`);
    lines.push(`- Submitted: ${row.submitted_at}`);
    lines.push(`- Name: ${row.first_name} ${row.last_name}`);
    lines.push(`- Email: ${row.email}`);
    lines.push(`- Phone: ${row.phone || "Not provided"}`);
    lines.push("");
    lines.push("```text");
    lines.push(row.human_summary);
    lines.push("```");
    lines.push("");
  }

  return lines.join("\n");
};

const app = express();
app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    methods: ["GET", "POST"],
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, database: DB_PATH });
});

app.post("/api/support-submissions", (req, res) => {
  const parsed = submissionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid submission payload",
      issues: parsed.error.flatten(),
    });
  }

  const payload = {
    ...parsed.data,
    selectedCategories: normalizeList(parsed.data.selectedCategories),
    selectedSymptoms: normalizeList(parsed.data.selectedSymptoms),
    selectedSupportTypes: normalizeList(parsed.data.selectedSupportTypes),
  };

  const submittedAt = new Date().toISOString();
  const conditionDetails = buildConditionDetails(payload);
  const humanSummary = buildHumanSummary({ submittedAt, payload, conditionDetails });
  const aiSummaryObject = buildAiSummary({ submittedAt, payload, conditionDetails });

  const record = {
    submittedAt,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone || null,
    message: payload.message || null,
    conditionsJson: JSON.stringify(conditionDetails),
    symptomsJson: JSON.stringify(payload.selectedSymptoms),
    supportTypesJson: JSON.stringify(payload.selectedSupportTypes),
    rawPayload: JSON.stringify(payload),
    humanSummary,
    aiSummary: JSON.stringify(aiSummaryObject),
  };

  const result = insertSubmission.run(record);

  return res.status(201).json({
    id: result.lastInsertRowid,
    submittedAt,
    humanSummary,
    aiSummary: aiSummaryObject,
  });
});

app.get("/api/support-submissions", (req, res) => {
  const requestedLimit = Number(req.query.limit ?? 50);
  const limit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(500, requestedLimit)) : 50;
  const rows = listSubmissions.all({ limit });

  return res.json({
    count: rows.length,
    submissions: rows.map((row) => ({
      id: row.id,
      submittedAt: row.submitted_at,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      conditions: JSON.parse(row.conditions_json),
      symptoms: JSON.parse(row.symptoms_json),
      supportTypes: JSON.parse(row.support_types_json),
      humanSummary: row.human_summary,
      aiSummary: JSON.parse(row.ai_summary),
    })),
  });
});

app.get("/api/support-submissions/export/human", (_req, res) => {
  const rows = listSubmissions.all({ limit: 500 });
  res.type("text/markdown").send(toMarkdownReport(rows));
});

app.get("/api/support-submissions/export/ai", (_req, res) => {
  const rows = listSubmissions.all({ limit: 500 });
  const ndjson = rows
    .map((row) =>
      JSON.stringify({
        id: row.id,
        submitted_at: row.submitted_at,
        payload: JSON.parse(row.ai_summary),
      }),
    )
    .join("\n");

  res.type("application/x-ndjson").send(ndjson);
});

app.listen(PORT, () => {
  console.log(`[liora-api] listening on http://localhost:${PORT}`);
  console.log(`[liora-api] using database ${DB_PATH}`);
});
