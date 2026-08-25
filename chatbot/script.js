const input = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");

// The Python backend (chatbot-backend/main.py) must be running for this to
// work — it's a separate local server from the PHP one, listening on
// port 8000 by default. See chatbot-backend/README.md.
const CHAT_ENDPOINT = "http://127.0.0.1:8000/chat";

const SESSION_STORAGE_KEY = "swe_it_chat_session";

// A per-tab session id so the backend keeps each visitor's conversation
// separate instead of mixing every user's chat into one shared history.
// Persisted in sessionStorage so a page reload keeps the same
// conversation; a new tab (or "New Chat") gets a fresh one.
let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
}

// Exposed so the "New Chat" button (wired up in index.html) can start a
// fresh conversation on the backend instead of continuing the old one.
window.resetChatSession = function resetChatSession() {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
};


function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }

    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


async function sendMessage() {

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Add user's message
    addMessage(message, "user");

    // Clear input
    input.value = "";
    sendButton.disabled = true;

    try {

        const response = await fetch(CHAT_ENDPOINT, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
                session_id: sessionId,
                // Set by ../js/main.js (applyDocumentDirection) whenever the
                // language switcher is used — tells the backend which
                // language to have Gemini reply in.
                language: document.documentElement.getAttribute("lang") || "en"
            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || `Request failed with status ${response.status}`);
        }

        // Stay in sync with whatever session id the backend is using
        // (covers the first-ever request, before one was assigned).
        if (data.session_id) {
            sessionId = data.session_id;
            sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
        }

        // Add Gemini response
        addMessage(data.response, "bot");

    } catch (error) {

        console.error(error);

        const code = document.documentElement.getAttribute("lang") || "en";
        // I18N is declared with `const` in ../js/i18n.js, which does NOT
        // attach it to `window` — reference it directly, guarded with
        // typeof so this still works if that script somehow didn't load.
        const fallback = (typeof I18N !== "undefined" && I18N[code] && I18N[code].chat.errorFallback) ||
            "Sorry, something went wrong. Make sure the chatbot backend is running, then try again.";
        addMessage(fallback, "bot");

    } finally {
        sendButton.disabled = false;
    }
}


sendButton.addEventListener("click", sendMessage);


input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
