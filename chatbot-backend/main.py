import os
import uuid

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
from google.genai.errors import APIError

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# The Gemini model to use. If chat requests ever fail with a "model not
# found" / "no longer available" style error again in the future, open
# https://ai.google.dev/gemini-api/docs/models to see the current list of
# valid model names and swap it in here (or set GEMINI_MODEL in .env).
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")

# Matches the site's LANGS in ../js/i18n.js. Used to tell Gemini which
# language to reply in — the site's language switcher was changing the
# UI text but not the chatbot's actual replies.
LANGUAGE_NAMES = {
    "en": "English",
    "ar": "Arabic (use Modern Standard or Egyptian colloquial Arabic, matching how the user writes)",
    "es": "Spanish",
    "zh": "Simplified Chinese",
}


class ChatRequest(BaseModel):
    message: str
    # Sent by the frontend so each browser tab gets its own conversation.
    # Optional so older/other callers still work — a fresh id is generated
    # server-side if one isn't provided.
    session_id: str | None = None
    # The site's current UI language (e.g. "ar"), so replies match it
    # instead of always coming back in English. Defaults to English if
    # not sent or unrecognized.
    language: str | None = None


# Per-session conversation history. Keyed by session_id so concurrent users
# don't share (or corrupt) each other's chat context — a single shared
# global history would mix every visitor's messages into one conversation.
conversations: dict[str, list] = {}


@app.get("/")
def home():
    return {"message": "Chatbot Backend is working!"}


@app.post("/chat")
def chat(request: ChatRequest):
    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="message must not be empty.")

    session_id = request.session_id or str(uuid.uuid4())
    conversation = conversations.setdefault(session_id, [])

    conversation.append({
        "role": "user",
        "parts": [
            {"text": message}
        ]
    })

    language_name = LANGUAGE_NAMES.get(request.language, LANGUAGE_NAMES["en"])

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=conversation,
            config=types.GenerateContentConfig(
                system_instruction=(
                    "You are SWE IT Assist, an internal IT helpdesk assistant for "
                    "ELSEWEDY ELECTRIC employees. Help with practical IT troubleshooting "
                    f"(network, accounts, email, printing, software). Always reply in "
                    f"{language_name}, regardless of what language earlier messages in "
                    "this conversation were in."
                )
            )
        )
    except APIError as e:
        # Don't leave the failed user turn in history — otherwise every
        # retry resends a conversation that's already known to fail.
        conversation.pop()
        raise HTTPException(
            status_code=502,
            detail=f"Gemini API error: {getattr(e, 'message', str(e))}"
        )
    except Exception as e:
        conversation.pop()
        raise HTTPException(status_code=502, detail=f"Unexpected error calling Gemini: {e}")

    conversation.append({
        "role": "model",
        "parts": [
            {"text": response.text}
        ]
    })

    return {
        "response": response.text,
        "session_id": session_id
    }
