const input =
    document.getElementById("message-input");

const sendButton =
    document.getElementById("send-button");

const chatBox =
    document.getElementById("chat-box");

const sidebar =
    document.getElementById("sidebar");

const sidebarToggle =
    document.getElementById("sidebar-toggle");

const backButton =
    document.getElementById("back-button");

const newChatButton =
    document.getElementById("new-chat-btn");

const recentHistoryList =
    document.getElementById("recent-history");


/* =========================================================
   WELCOME MESSAGE
========================================================= */

function getWelcomeHTML() {

    const lang =
        window.SWE_CHAT_LANG || "en";

    const t =
        (
            window.CHAT_I18N &&
            window.CHAT_I18N[lang]
        ) || {};

    return `
        <div class="message bot-message">

            <div class="bot-heading">

                ${escapeHtml(
                    t.welcomeHeading ||
                    "Welcome to SWE IT Assist"
                )}

            </div>

            ${escapeHtml(
                t.welcomeBody ||
                "Hello! How can I help you today?"
            )}

        </div>
    `;
}


const WELCOME_HTML =
    getWelcomeHTML();


/* =========================================================
   CHAT HISTORY STATE
========================================================= */

const STORAGE_KEY =
    "swe_it_assist_sessions";


let sessions = [];

let currentSessionId = null;


/* =========================================================
   LOAD SESSIONS
========================================================= */

function loadSessionsFromStorage() {

    try {

        const raw =
            localStorage.getItem(
                STORAGE_KEY
            );

        const parsed =
            raw
                ? JSON.parse(raw)
                : [];

        sessions =
            Array.isArray(parsed)
                ? parsed
                : [];

    } catch (error) {

        console.error(
            "Failed to load chat history:",
            error
        );

        sessions = [];

    }
}


/* =========================================================
   SAVE SESSIONS
========================================================= */

function saveSessionsToStorage() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(sessions)
        );

    } catch (error) {

        console.error(
            "Failed to save chat history:",
            error
        );

    }
}


/* =========================================================
   GET SESSION
========================================================= */

function getSessionById(id) {

    return sessions.find(
        session =>
            session.id === id
    );

}


/* =========================================================
   GENERATE SESSION ID
========================================================= */

function generateSessionId() {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID ===
            "function"
    ) {

        return window.crypto.randomUUID();

    }


    return (
        "session-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(16)
            .slice(2)
    );

}


/* =========================================================
   GENERATE TITLE
========================================================= */

function generateTitle(text) {

    const clean =
        text
            .trim()
            .replace(/\s+/g, " ");

    const MAX_LEN = 34;


    if (
        clean.length <= MAX_LEN
    ) {

        return clean;

    }


    return (
        clean
            .slice(0, MAX_LEN)
            .trim() +
        "…"
    );

}


/* =========================================================
   SCROLL
========================================================= */

function scrollToBottom() {

    chatBox.scrollTop =
        chatBox.scrollHeight;

}


/* =========================================================
   FORMAT GEMINI RESPONSE
========================================================= */

function formatBotMessage(text) {

    if (!text) {

        return "";

    }


    let html =
        text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");


    /* Bold */

    html =
        html.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    /* Headings */

    html =
        html.replace(
            /^###\s*(.+)$/gm,
            '<div class="bot-heading">$1</div>'
        );


    html =
        html.replace(
            /^##\s*(.+)$/gm,
            '<div class="bot-heading bot-heading-large">$1</div>'
        );


    /* Numbered list */

    html =
        html.replace(
            /^\s*(\d+)\.\s+(.+)$/gm,
            '<div class="bot-list-item">' +
            '<span class="list-number">$1.</span>' +
            '<span>$2</span>' +
            '</div>'
        );


    /* Bullet list */

    html =
        html.replace(
            /^\s*[-*]\s+(.+)$/gm,
            '<div class="bot-list-item">' +
            '<span class="list-bullet">•</span>' +
            '<span>$1</span>' +
            '</div>'
        );


    /* New lines */

    html =
        html.replace(
            /\n/g,
            "<br>"
        );


    return html;

}


/* =========================================================
   ADD MESSAGE
========================================================= */

function addMessage(
    message,
    sender
) {

    const messageDiv =
        document.createElement("div");


    messageDiv.classList.add(
        "message"
    );


    if (
        sender === "user"
    ) {

        messageDiv.classList.add(
            "user-message"
        );


        messageDiv.textContent =
            message;

    } else {

        messageDiv.classList.add(
            "bot-message"
        );


        messageDiv.innerHTML =
            formatBotMessage(
                message
            );

    }


    chatBox.appendChild(
        messageDiv
    );


    scrollToBottom();

}


/* =========================================================
   THINKING
========================================================= */

function showThinking() {

    removeThinking();


    const thinkingDiv =
        document.createElement("div");


    thinkingDiv.id =
        "thinking-message";


    thinkingDiv.classList.add(
        "message",
        "bot-message",
        "thinking-message"
    );


    const lang =
        window.SWE_CHAT_LANG || "en";


    const t =
        (
            window.CHAT_I18N &&
            window.CHAT_I18N[lang]
        ) || {};


    thinkingDiv.innerHTML = `

        <span>

            ${escapeHtml(
                t.thinking ||
                "Thinking"
            )}

        </span>

        <div class="thinking-dots">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;


    chatBox.appendChild(
        thinkingDiv
    );


    scrollToBottom();

}


/* =========================================================
   REMOVE THINKING
========================================================= */

function removeThinking() {

    const thinking =
        document.getElementById(
            "thinking-message"
        );


    if (thinking) {

        thinking.remove();

    }

}


/* =========================================================
   RENDER RECENT SIDEBAR
========================================================= */

function renderRecentList() {

    recentHistoryList.innerHTML =
        "";


    if (
        !sessions ||
        sessions.length === 0
    ) {

        const emptyItem =
            document.createElement("li");


        emptyItem.className =
            "history-empty";


        emptyItem.id =
            "recent-empty";


        const lang =
            window.SWE_CHAT_LANG ||
            "en";


        const t =
            (
                window.CHAT_I18N &&
                window.CHAT_I18N[lang]
            ) || {};


        emptyItem.textContent =
            t.recentEmpty ||
            "No recent chats yet";


        recentHistoryList.appendChild(
            emptyItem
        );


        return;

    }


    sessions.forEach(
        session => {

            const item =
                document.createElement("li");


            item.className =
                "history-item";


            item.dataset.sessionId =
                session.id;


            if (
                session.id ===
                currentSessionId
            ) {

                item.classList.add(
                    "is-active"
                );

            }


            item.innerHTML = `

                <svg
                    class="history-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >

                    <path
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    ></path>

                </svg>


                <span class="history-title">

                    ${escapeHtml(
                        session.title
                    )}

                </span>

            `;


            item.addEventListener(
                "click",
                function () {

                    switchToSession(
                        session.id
                    );

                }
            );


            recentHistoryList.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


/* =========================================================
   SWITCH SESSION
========================================================= */

function switchToSession(
    sessionId
) {

    const session =
        getSessionById(
            sessionId
        );


    if (!session) {

        return;

    }


    currentSessionId =
        session.id;


    chatBox.innerHTML =
        "";


    session.messages.forEach(
        msg => {

            addMessage(
                msg.text,
                msg.role
            );

        }
    );


    document
        .querySelectorAll(
            ".pinned-chat"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "is-active"
                );

            }
        );


    renderRecentList();

}


/* =========================================================
   CREATE NEW SESSION
========================================================= */

function createNewSession(
    firstMessageText
) {

    const newSession = {

        id:
            generateSessionId(),

        title:
            generateTitle(
                firstMessageText
            ),

        timestamp:
            Date.now(),

        messages: []

    };


    sessions = [
        newSession,
        ...sessions
    ];


    currentSessionId =
        newSession.id;


    saveSessionsToStorage();


    renderRecentList();


    return newSession;

}


/* =========================================================
   ENSURE ACTIVE SESSION
========================================================= */

function ensureActiveSession(
    firstMessageText
) {

    if (
        currentSessionId
    ) {

        const existing =
            getSessionById(
                currentSessionId
            );


        if (existing) {

            return existing;

        }


        currentSessionId =
            null;

    }


    return createNewSession(
        firstMessageText
    );

}


/* =========================================================
   PERSIST MESSAGE
========================================================= */

function persistMessage(
    role,
    text
) {

    try {

        const session =
            ensureActiveSession(
                text
            );


        if (!session) {

            return;

        }


        session.messages.push({

            role,
            text,
            timestamp:
                Date.now()

        });


        saveSessionsToStorage();


        renderRecentList();

    } catch (error) {

        console.error(
            "Failed to persist chat message:",
            error
        );

    }

}


/* =========================================================
   SEND MESSAGE
========================================================= */

async function sendMessage(
    customMessage = null
) {

    const message =
        customMessage !== null
            ? customMessage
            : input.value.trim();


    if (!message) {

        return;

    }


    addMessage(
        message,
        "user"
    );


    persistMessage(
        "user",
        message
    );


    input.value = "";


    showThinking();


    sendButton.disabled =
        true;


    try {

        const response =
            await fetch(
                "https://chatbot-backend-us17.onrender.com/chat",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            message:
                                message

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        const data =
            await response.json();


        removeThinking();


        if (
            data &&
            data.response
        ) {

            addMessage(
                data.response,
                "bot"
            );


            persistMessage(
                "bot",
                data.response
            );

        } else {

            const lang =
                window.SWE_CHAT_LANG ||
                "en";


            const t =
                (
                    window.CHAT_I18N &&
                    window.CHAT_I18N[lang]
                ) || {};


            const fallback =
                t.errorNoAI ||
                "I couldn't get a response from the AI. Please try again.";


            addMessage(
                fallback,
                "bot"
            );


            persistMessage(
                "bot",
                fallback
            );

        }


    } catch (error) {

        console.error(
            "Chat error:",
            error
        );


        removeThinking();


        const lang =
            window.SWE_CHAT_LANG ||
            "en";


        const t =
            (
                window.CHAT_I18N &&
                window.CHAT_I18N[lang]
            ) || {};


        const errorMessage =
            t.errorConn ||
            "I couldn't connect to the AI right now. Please check that the IT Assist server is running and try again.";


        addMessage(
            errorMessage,
            "bot"
        );


        persistMessage(
            "bot",
            errorMessage
        );


    } finally {

        sendButton.disabled =
            false;


        input.focus();

    }

}


/* =========================================================
   SEND BUTTON
========================================================= */

sendButton.addEventListener(
    "click",
    function () {

        sendMessage();

    }
);


/* =========================================================
   ENTER KEY
========================================================= */

input.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   SIDEBAR TOGGLE
========================================================= */

sidebarToggle.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle(
            "is-collapsed"
        );

    }
);


/* =========================================================
   BACK BUTTON
========================================================= */

backButton.addEventListener(
    "click",
    function () {

        window.history.back();

    }
);


/* =========================================================
   NEW CHAT
========================================================= */

newChatButton.addEventListener(
    "click",
    function () {

        currentSessionId =
            null;


        chatBox.innerHTML =
            getWelcomeHTML();


        document
            .querySelectorAll(
                ".pinned-chat"
            )
            .forEach(
                item => {

                    item.classList.remove(
                        "is-active"
                    );

                }
            );


        renderRecentList();


        input.focus();

    }
);


/* =========================================================
   PINNED ISSUES
========================================================= */

document
    .querySelectorAll(
        ".pinned-chat"
    )
    .forEach(
        item => {

            item.addEventListener(
                "click",
                function () {

                    const message =
                        this.getAttribute(
                            "data-message"
                        );


                    document
                        .querySelectorAll(
                            ".pinned-chat"
                        )
                        .forEach(
                            i => {

                                i.classList.remove(
                                    "is-active"
                                );

                            }
                        );


                    this.classList.add(
                        "is-active"
                    );


                    currentSessionId =
                        null;


                    chatBox.innerHTML =
                        getWelcomeHTML();


                    sendMessage(
                        message
                    );

                }
            );

        }
    );


/* =========================================================
   LANGUAGE CHANGE EVENT
========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderRecentList();

    }
);


/* =========================================================
   INIT
========================================================= */

loadSessionsFromStorage();

renderRecentList();

input.focus();
