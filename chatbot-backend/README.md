# SWE IT Assist — Chatbot Backend (Python / FastAPI + Gemini)

This is a **separate service** from `../backend-php` (the one that stores
"Other / Custom Issue" support requests in MySQL/SQLite). This one powers
the AI chat at `../chatbot/index.html` — it talks to Google's Gemini API
and does **not** write anything into the support-requests database. They're
independent on purpose: the chat is a live AI conversation, the support
requests are tickets for the IT team to follow up on.

## ⚠️ About the API key

The `.env` file in this folder contains a real `GEMINI_API_KEY`. Treat it
like a password:

- Don't commit it to a public GitHub repo.
- Don't share this folder outside the team.
- If this key has already been shared anywhere it shouldn't have been,
  regenerate it at https://aistudio.google.com/apikey and update `.env`
  with the new one.

## Run it locally

You need Python 3.10+ installed.

```bash
cd chatbot-backend
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Leave that terminal window open — the chatbot only works while this is
running. Then open `../chatbot/index.html` through a local server (same
rule as the rest of the site: via `http://localhost/...`, not by
double-clicking the file) and start chatting.

You should see `Chatbot Backend is working!` at
**http://127.0.0.1:8000** once it's running.

## If chat messages fail with a Gemini/model error

`main.py` uses the model name in the `GEMINI_MODEL` environment variable,
defaulting to `gemini-3.6-flash` (this is correct — an earlier draft of
this file changed it to `gemini-2.5-flash`, but testing showed Google has
since retired that model, and its own error message points back to
`gemini-3.6-flash`). If you ever get a "model not found" / "no longer
available" style error again, check the current valid model names at
https://ai.google.dev/gemini-api/docs/models and either set `GEMINI_MODEL`
in `.env` or edit the default directly in `main.py`.

## What was fixed here vs. the original file

- **Per-user conversations.** The original kept ONE shared conversation
  history for every visitor (a single global list) — with more than one
  person chatting at the same time, their messages would mix into each
  other's context. Now each browser tab gets its own `session_id`
  (generated in `chatbot/script.js`, stored in `sessionStorage`), and the
  backend keeps a separate conversation per session.
- **Errors are handled.** A failed Gemini call (bad model name, quota,
  network) now returns a proper error response instead of crashing with a
  raw 500, and the frontend shows a clear message instead of "undefined".
- **"New Chat" actually starts fresh.** Before, clicking it only cleared
  what was on screen — the backend still remembered the old conversation
  and kept including it. Now it also starts a new session.

## Running both backends together

For the full site to work end-to-end you'll have **two servers** running
at the same time locally:

1. **Apache (via XAMPP)** — serves the website and the PHP support-requests
   API, as covered in `../backend-php/README.md`.
2. **This FastAPI server** (`uvicorn main:app --port 8000`) — powers the
   chatbot only.

They're independent; either one can be down without breaking the other
(the chatbot just won't respond if this one isn't running, and the "Other"
form's old submit flow isn't reachable from the UI anymore anyway since
clicking "Other" now opens the chatbot).
