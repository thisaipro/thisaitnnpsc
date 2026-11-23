#!/usr/bin/env node
/* ============================================================================
   add-current-affairs.mjs — safely merge new Current Affairs entries into
   data/current-affairs.json. Used by the automated daily job so the JSON is
   never hand-edited (and so it can never be left malformed).

   Usage:
     node scripts/add-current-affairs.mjs '<json-array-of-entries>'
     echo '<json-array>' | node scripts/add-current-affairs.mjs
     node scripts/add-current-affairs.mjs path/to/new-entries.json

   Each new entry (id is assigned automatically):
     {
       "ca_date":   "2026-11-23",            // YYYY-MM-DD (defaults to today IST)
       "title_en":  "Headline in English",   // required
       "title_ta":  "தலைப்பு தமிழில்",
       "body_en":   "2–4 sentence summary. Use \n for paragraph breaks.",
       "body_ta":   "சுருக்கம் தமிழில்.",
       "category":  "National",               // National | Tamil Nadu | International | Economy | S&T | Environment | Sports | Awards | Schemes
       "source":    "PIB",                    // human-readable source name
       "source_url":"https://..."             // link to the original (optional)
     }

   Behaviour: assigns incrementing ids, skips duplicates (same ca_date +
   title_en), sorts newest-first, and keeps at most MAX_ENTRIES most-recent.
   ========================================================================== */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = resolve(__dirname, "..", "data", "current-affairs.json");
const MAX_ENTRIES = 400;

function todayIST() {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

function readInput() {
  const arg = process.argv[2];
  if (arg && existsSync(arg)) return readFileSync(arg, "utf8");
  if (arg) return arg;
  return readFileSync(0, "utf8"); // stdin
}

function load() {
  try { const a = JSON.parse(readFileSync(DATA, "utf8")); return Array.isArray(a) ? a : []; }
  catch { return []; }
}

let incoming;
try { incoming = JSON.parse(readInput()); }
catch (e) { console.error("Input is not valid JSON:", e.message); process.exit(1); }
if (!Array.isArray(incoming)) incoming = [incoming];

const existing = load();
const seen = new Set(existing.map((e) => (e.ca_date || "") + "|" + (e.title_en || "").trim().toLowerCase()));
let nextId = existing.reduce((m, e) => Math.max(m, Number(e.id) || 0), 0) + 1;

let added = 0;
for (const raw of incoming) {
  if (!raw || !raw.title_en || !String(raw.title_en).trim()) { console.warn("skip: entry missing title_en"); continue; }
  const ca_date = (raw.ca_date && /^\d{4}-\d{2}-\d{2}$/.test(raw.ca_date)) ? raw.ca_date : todayIST();
  const key = ca_date + "|" + String(raw.title_en).trim().toLowerCase();
  if (seen.has(key)) { console.warn("skip duplicate:", raw.title_en); continue; }
  seen.add(key);
  existing.push({
    id: nextId++,
    ca_date,
    title_en: String(raw.title_en).trim(),
    title_ta: raw.title_ta ? String(raw.title_ta).trim() : "",
    body_en:  raw.body_en ? String(raw.body_en).trim() : "",
    body_ta:  raw.body_ta ? String(raw.body_ta).trim() : "",
    category: raw.category ? String(raw.category).trim() : "",
    source:   raw.source ? String(raw.source).trim() : "",
    source_url: raw.source_url ? String(raw.source_url).trim() : ""
  });
  added++;
}

existing.sort((a, b) => (a.ca_date !== b.ca_date ? (a.ca_date < b.ca_date ? 1 : -1) : (Number(b.id) || 0) - (Number(a.id) || 0)));
const trimmed = existing.slice(0, MAX_ENTRIES);

if (!existsSync(dirname(DATA))) mkdirSync(dirname(DATA), { recursive: true });
writeFileSync(DATA, JSON.stringify(trimmed, null, 2) + "\n");
console.log(`Added ${added} entr${added === 1 ? "y" : "ies"}; file now holds ${trimmed.length}.`);
