/**
 * SWE IT Assist — reference backend
 * ----------------------------------------------------------------------
 * A small, self-contained API that receives "Other / Custom Issue"
 * submissions from the website — and can just as easily receive them from
 * the AI chatbot your colleagues are building, since it's the same JSON
 * shape either way (see README.md for the exact contract). Everything is
 * stored in a local JSON file, no external database required.
 *
 * Run it:
 *   cd backend
 *   npm install
 *   npm start
 *
 * The website's js/main.js already points SUPPORT_API_ENDPOINT at
 * http://localhost:8787/api/support-requests by default.
 *
 * When your team's Power Automate "shared backend" flow is ready, you can
 * either keep running this server permanently (it's a real, working
 * backend on its own), or retire it and point SUPPORT_API_ENDPOINT at the
 * Flow's HTTP-trigger URL instead — the payload this server expects is
 * already shaped to match a Power Automate HTTP trigger's JSON schema.
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Tiny built-in .env loader (no extra dependency needed) — safe to skip if
// the file doesn't exist, since most hosting providers set env vars directly.
loadDotEnv(path.join(__dirname, ".env"));
function loadDotEnv(filePath) {
    if (!fs.existsSync(filePath)) return;
    fs.readFileSync(filePath, "utf8").split("\n").forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (!match) return;
        const key = match[1];
        let value = (match[2] || "").trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (process.env[key] === undefined) process.env[key] = value;
    });
}

const PORT = process.env.PORT || 8787;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "swe-it-admin-dev-key";
const DATA_FILE = path.join(__dirname, "data", "requests.json");
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const VALID_CATEGORIES = ["network", "accounts", "email", "printing", "software", "other"];
const VALID_STATUSES = ["new", "in-progress", "resolved"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- tiny JSON-file "database" ---------- */

function ensureDataFile() {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
}

function readRequests() {
    ensureDataFile();
    try {
        const raw = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(raw || "[]");
    } catch (err) {
        console.error("Failed to read data file, starting from an empty list:", err);
        return [];
    }
}

function writeRequests(list) {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

/* ---------- app ---------- */

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: "100kb" }));
app.use("/admin", express.static(path.join(__dirname, "public")));

function requireAdminKey(req, res, next) {
    const key = req.get("x-api-key");
    if (!key || key !== ADMIN_API_KEY) {
        return res.status(401).json({ error: "Missing or invalid x-api-key header." });
    }
    next();
}

app.get("/health", (req, res) => {
    res.json({ ok: true, service: "swe-it-assist-backend", time: new Date().toISOString() });
});

// Shared intake endpoint — the website's "Other" form and (later) the AI
// chatbot both POST here with the same JSON shape.
app.post("/api/support-requests", (req, res) => {
    const body = req.body || {};
    // name/email are optional — the "Other" form on the website no longer
    // asks for them, so default to a placeholder rather than rejecting the
    // request. If a caller (e.g. a future chatbot) does send them, they're
    // still validated below.
    const name = (typeof body.name === "string" ? body.name.trim() : "") || "Website visitor";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const details = typeof body.details === "string" ? body.details.trim() : "";
    const category = VALID_CATEGORIES.includes(body.category) ? body.category : "other";
    const source = typeof body.source === "string" && body.source ? body.source : "unknown";
    const language = typeof body.language === "string" && body.language ? body.language : "en";

    const errors = [];
    if (name.length < 2) errors.push("name must be at least 2 characters.");
    if (email && !EMAIL_RE.test(email)) errors.push("email must be a valid email address.");
    if (details.length < 12) errors.push("details must be at least 12 characters.");
    if (details.length > 2000) errors.push("details must be under 2000 characters.");

    if (errors.length) {
        return res.status(400).json({ error: "Validation failed.", details: errors });
    }

    const record = {
        id: crypto.randomUUID(),
        name,
        email,
        details,
        category,
        source,          // "website" | "chatbot" | ...
        language,         // "en" | "ar" | "es" | "zh"
        status: "new",    // "new" | "in-progress" | "resolved"
        submittedAt: typeof body.submittedAt === "string" ? body.submittedAt : new Date().toISOString(),
        receivedAt: new Date().toISOString()
    };

    const list = readRequests();
    list.unshift(record);
    writeRequests(list);

    console.log(`[support-request] ${record.category} — ${record.name} <${record.email}> via ${record.source}`);
    res.status(201).json({ ok: true, id: record.id });
});

// Admin-only: list all requests (used by the /admin dashboard).
app.get("/api/support-requests", requireAdminKey, (req, res) => {
    res.json(readRequests());
});

// Admin-only: update a request's status once IT has picked it up.
app.patch("/api/support-requests/:id", requireAdminKey, (req, res) => {
    const { status } = req.body || {};
    if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
    }

    const list = readRequests();
    const record = list.find((r) => r.id === req.params.id);
    if (!record) return res.status(404).json({ error: "Request not found." });

    record.status = status;
    writeRequests(list);
    res.json({ ok: true, request: record });
});

app.use((req, res) => {
    res.status(404).json({ error: "Not found." });
});

app.listen(PORT, () => {
    ensureDataFile();
    console.log(`SWE IT Assist backend listening on http://localhost:${PORT}`);
    console.log(`Admin dashboard:  http://localhost:${PORT}/admin`);
    console.log(`Admin API key:    ${ADMIN_API_KEY} (set ADMIN_API_KEY env var to change it)`);
});
