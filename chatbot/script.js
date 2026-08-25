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
   WELCOME MESSAGE (used to reset chat-box)
========================================================= */

const WELCOME_HTML = `
    <div class="message bot-message">

        <div class="bot-heading">
            Welcome to SWE IT Assist
        </div>

        Hello! How can I help you today?

    </div>
`;


/* =========================================================
   CHAT HISTORY STATE (localStorage)
========================================================= */

const STORAGE_KEY = "swe_it_assist_sessions";

/*
   In-memory cache of all sessions.
   Each session:
   {
       id: string,
       title: string,
       timestamp: number,
       messages: [ { role, text, timestamp } ]
   }
*/

let sessions = [];


/*
   ID of the session currently being viewed.
   null = a fresh / unsaved "New Chat".
*/

let currentSessionId = null;


function loadSessionsFromStorage() {

    try {

        const raw =
            localStorage.getItem(STORAGE_KEY);

        const parsed =
            raw ? JSON.parse(raw) : [];

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


function getSessionById(id) {

    return sessions.find(
        session => session.id === id
    );
}


function generateSessionId() {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
    ) {

        return window.crypto.randomUUID();

    }

    return (
        "session-" +
        Date.now() +
        "-" +
        Math.random().toString(16).slice(2)
    );
}


function generateTitle(text) {

    const clean =
        text.trim().replace(/\s+/g, " ");

    const MAX_LEN = 34;

    if (clean.length <= MAX_LEN) {

        return clean;

    }

    return (
        clean.slice(0, MAX_LEN).trim() + "…"
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


    /*
       Escape HTML first
       to prevent Gemini text
       from injecting HTML.
    */

    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");


    /*
       Bold
       **text**
    */

    html = html.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    /*
       Headings
       ### Heading
    */

    html = html.replace(
        /^###\s*(.+)$/gm,
        '<div class="bot-heading">$1</div>'
    );


    html = html.replace(
        /^##\s*(.+)$/gm,
        '<div class="bot-heading bot-heading-large">$1</div>'
    );


    /*
       Numbered list
       1. Something
    */

    html = html.replace(
        /^\s*(\d+)\.\s+(.+)$/gm,
        '<div class="bot-list-item">' +
        '<span class="list-number">$1.</span>' +
        '<span>$2</span>' +
        '</div>'
    );


    /*
       Bullet list
       - Something
       * Something
    */

    html = html.replace(
        /^\s*[-*]\s+(.+)$/gm,
        '<div class="bot-list-item">' +
        '<span class="list-bullet">•</span>' +
        '<span>$1</span>' +
        '</div>'
    );


    /*
       New lines
    */

    html =
        html.replace(
            /\n/g,
            "<br>"
        );


    return html;
}


/* =========================================================
   ADD MESSAGE (renders to DOM only)
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


    if (sender === "user") {

        messageDiv.classList.add(
            "user-message"
        );


        /*
           User message
           stays plain text
        */

        messageDiv.textContent =
            message;

    } else {

        messageDiv.classList.add(
            "bot-message"
        );


        /*
           Gemini response
           gets formatted
        */

        messageDiv.innerHTML =
            formatBotMessage(message);

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


    thinkingDiv.innerHTML = `

        <span>
            Thinking
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
   RENDER RECENT SIDEBAR LIST
========================================================= */

function renderRecentList() {

    /*
       Clear existing items.
    */

    recentHistoryList.innerHTML = "";


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

        emptyItem.textContent =
            "No recent chats yet";

        recentHistoryList.appendChild(
            emptyItem
        );

        return;

    }


    /*
       Newest first — sessions array
       is always kept newest-first
       via prepend on creation.
    */

    sessions.forEach(session => {

        const item =
            document.createElement("li");

        item.className =
            "history-item";

        item.dataset.sessionId =
            session.id;

        if (
            session.id === currentSessionId
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
                ${escapeHtml(session.title)}
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

    });

}


function escapeHtml(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


/* =========================================================
   SWITCH TO AN EXISTING SESSION
========================================================= */

function switchToSession(sessionId) {

    const session =
        getSessionById(sessionId);


    if (!session) {

        return;

    }


    currentSessionId =
        session.id;


    /*
       Clear current view.
    */

    chatBox.innerHTML = "";


    /*
       Render all stored messages
       for this session.
    */

    session.messages.forEach(msg => {

        addMessage(
            msg.text,
            msg.role
        );

    });


    /*
       Update active states
       across both pinned + recent
       (pinned items represent
       template shortcuts, not
       sessions, so just clear them).
    */

    document
        .querySelectorAll(
            ".pinned-chat"
        )
        .forEach(i => {

            i.classList.remove(
                "is-active"
            );

        });


    renderRecentList();

}


/* =========================================================
   START A NEW SESSION (persist first message)
========================================================= */

function createNewSession(
    firstMessageText
) {

    const newSession = {

        id: generateSessionId(),

        title: generateTitle(
            firstMessageText
        ),

        timestamp: Date.now(),

        messages: []

    };


    /*
       Prepend to top
       of RECENT list —
       array stays newest-first.
    */

    sessions = [
        newSession,
        ...sessions
    ];

    currentSessionId =
        newSession.id;


    saveSessionsToStorage();


    /*
       Immediately reflect
       in the sidebar —
       this is what removes
       "No recent chats yet"
       and shows the new item
       right away.
    */

    renderRecentList();


    return newSession;

}


function ensureActiveSession(
    firstMessageText
) {

    if (currentSessionId) {

        const existing =
            getSessionById(
                currentSessionId
            );

        if (existing) {

            return existing;

        }

        /*
           currentSessionId pointed
           at a session that no
           longer exists in storage —
           fall through and create
           a fresh one instead.
        */

        currentSessionId = null;

    }


    return createNewSession(
        firstMessageText
    );

}


function persistMessage(
    role,
    text
) {

    try {

        const session =
            ensureActiveSession(text);

        if (!session) {

            return;

        }

        session.messages.push({

            role,
            text,
            timestamp: Date.now()

        });

        saveSessionsToStorage();

        /*
           Keep the sidebar's title/
           active highlighting in sync
           on every message, not just
           the first one.
        */

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


    /*
       If customMessage exists,
       use it.

       Otherwise use input.
    */

    const message =
        customMessage !== null
            ? customMessage
            : input.value.trim();


    /*
       Don't send empty message.
    */

    if (!message) {

        return;

    }


    /*
       Add user message.
    */

    addMessage(
        message,
        "user"
    );


    /*
       Persist user message
       (creates a new session
       + prepends to RECENT
       if this is the first
       message of a new chat).
    */

    persistMessage(
        "user",
        message
    );


    /*
       Clear input.
    */

    input.value = "";


    /*
       Show thinking.
    */

    showThinking();


    /*
       Disable send button.
    */

    sendButton.disabled = true;


    try {


        /* =================================================
           FASTAPI
        ================================================= */

        const response =
            await fetch(
                "http://127.0.0.1:8000/chat",
                {

                    method: "POST",

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


        /*
           Check HTTP status.
        */

        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        /*
           Convert to JSON.
        */

        const data =
            await response.json();


        /*
           Remove thinking.
        */

        removeThinking();


        /*
           Gemini response.
        */

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

            const fallback =
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


        /*
           Remove thinking.
        */

        removeThinking();


        /*
           Friendly error.
        */

        const errorMessage =
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


        /*
           Enable button.
        */

        sendButton.disabled =
            false;


        /*
           Focus input.
        */

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


        /*
           Reset active session context.
        */

        currentSessionId = null;


        /*
           Clear chat.
        */

        chatBox.innerHTML =
            WELCOME_HTML;


        /*
           Remove active states
           from pinned shortcuts.
        */

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


        /*
           Remove active states
           from recent sessions.
        */

        renderRecentList();


        /*
           Focus input.
        */

        input.focus();

    }
);


/* =========================================================
   PINNED ISSUES (static shortcuts — always start
   a fresh session context, never persisted as
   editable pinned entries themselves)
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


                    /*
                       Get predefined message.
                    */

                    const message =
                        this.getAttribute(
                            "data-message"
                        );


                    /*
                       Remove active
                       from other pinned items.
                    */

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


                    /*
                       Activate selected item.
                    */

                    this.classList.add(
                        "is-active"
                    );


                    /*
                       A pinned shortcut always
                       starts a brand-new session
                       context so it doesn't
                       append onto whatever
                       chat was open before.
                    */

                    currentSessionId = null;

                    chatBox.innerHTML =
                        WELCOME_HTML;


                    /*
                       Send message.
                    */

                    sendMessage(
                        message
                    );

                }
            );

        }
    );


/* =========================================================
   INIT — load persisted sessions
   and populate RECENT sidebar
========================================================= */

loadSessionsFromStorage();

renderRecentList();


/* =========================================================
   INITIAL FOCUS
========================================================= */

input.focus();
