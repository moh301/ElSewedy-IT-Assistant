# SWE IT Assist — Backend

A small, working backend for the SWE IT Assist portal's "Other / Custom
Issue" form. It receives every submission at one shared endpoint, stores
it, and gives the IT team a simple dashboard to see and update requests.
It's built so the same endpoint can later be called from the AI chatbot
your colleagues are building too — one place all support requests land,
regardless of whether they came from the website or the chat.

## Run it locally

```bash
cd backend
npm install
npm start
```

The server starts on **http://localhost:8787** by default (matches the
`SUPPORT_API_ENDPOINT` constant already set in `../js/main.js`, so the
website works against it with zero configuration).

Open the admin dashboard at **http://localhost:8787/admin** and log in
with the API key printed in the terminal on startup (`swe-it-admin-dev-key`
by default — change it, see below).

## How the website talks to it

Every time someone submits the "Other" form on the website, the frontend
sends this JSON to `POST /api/support-requests`:

```json
{
  "name": "Ahmed Hassan",
  "email": "ahmed.hassan@elsewedyelectric.com",
  "details": "My laptop screen flickers when connected to the docking station.",
  "category": "software",
  "source": "website",
  "language": "en",
  "submittedAt": "2026-08-24T10:15:00.000Z"
}
```

The server validates it, stores it in `data/requests.json`, and returns
`201 { "ok": true, "id": "..." }`. Nothing needs to change on the frontend
for the AI chatbot to use the same system — its backend just needs to POST
the same shape to the same URL, with `"source": "chatbot"` instead.

Other endpoints (all under `/api/support-requests`, all requiring the
`x-api-key` header for the two below):

- `GET /api/support-requests` — list every request (newest first).
- `PATCH /api/support-requests/:id` with `{ "status": "in-progress" }` —
  update a request's status (`new` / `in-progress` / `resolved`). The
  admin dashboard uses this when someone changes the status dropdown.

## Configuration

Copy `.env.example` to `.env` and adjust, or set these as real environment
variables on whatever host you deploy to:

| Variable         | Default                  | What it does                                                        |
|-------------------|--------------------------|----------------------------------------------------------------------|
| `PORT`            | `8787`                   | Port the server listens on                                          |
| `ADMIN_API_KEY`   | `swe-it-admin-dev-key`   | Required in the `x-api-key` header to list/update requests           |
| `ALLOWED_ORIGIN`  | `*`                      | Which origin(s) may call the API (lock this to your real domain)     |

**Change `ADMIN_API_KEY` before this ever goes anywhere real** — anyone
with the default key could read every submitted request.

## Deploying it for real

This is a plain Node/Express app with no native dependencies, so it runs
on pretty much any Node host. The easiest options:

- **Render** or **Railway** — connect the `backend/` folder as a repo (or
  a subfolder), set the environment variables above in their dashboard,
  and it's live with a public HTTPS URL in a couple of minutes. Free tiers
  exist on both.
- **Azure App Service** (fits naturally if the company is already on
  Microsoft 365) — `az webapp up` from inside `backend/`, or deploy via
  GitHub Actions.

Once deployed, update `SUPPORT_API_ENDPOINT` in `../js/main.js` to the
live URL (e.g. `https://swe-it-backend.onrender.com/api/support-requests`)
and re-publish the website.

One thing to know about the JSON-file storage: it works well for an
internal tool at moderate volume, but if request volume grows a lot,
swap `readRequests`/`writeRequests` in `server.js` for a real database
(Postgres, MongoDB, Azure Table Storage, etc.) — the rest of the API
doesn't need to change.

## Switching to Power Automate later

Since ELSEWEDY ELECTRIC is a Microsoft 365 shop, the longer-term "official"
home for this might be a Power Automate flow (HTTP trigger → SharePoint
List → Teams/email notification) that both this website and the chatbot
call — no server to maintain at all. If/when that flow exists:

1. Build the flow with a **"When an HTTP request is received"** trigger,
   using this JSON schema (Power Automate can auto-generate it — paste one
   of the example payloads above into "Use sample payload to generate
   schema").
2. Have the flow create a new item in a SharePoint list with columns
   matching the fields above, then email/Teams-notify the IT team.
3. Copy the flow's HTTP POST URL, and change **one line** in
   `../js/main.js`:

   ```js
   const SUPPORT_API_ENDPOINT = "https://prod-00.westeurope.logic.azure.com/workflows/.../triggers/manual/paths/invoke?...";
   ```

That's it — no other frontend code needs to change, since this backend and
a Power Automate HTTP trigger both just receive the same JSON shape. You
can run this Node backend and the Power Automate flow side by side too
(e.g. keep this one as a fallback) if that's useful.
