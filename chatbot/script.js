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

        } else {

            addMessage(
                "I couldn't get a response from the AI. Please try again.",
                "bot"
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

        addMessage(
            "I couldn't connect to the AI right now. Please check that the IT Assist server is running and try again.",
            "bot"
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
           Clear chat.
        */

        chatBox.innerHTML = `

            <div class="message bot-message">

                <div class="bot-heading">
                    Welcome to SWE IT Assist
                </div>

                Hello! How can I help you today?

            </div>

        `;


        /*
           Remove active states.
        */

        document
            .querySelectorAll(
                ".history-item"
            )
            .forEach(
                item => {

                    item.classList.remove(
                        "is-active"
                    );

                }
            );


        /*
           Focus input.
        */

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
   RECENT CHAT ITEMS
========================================================= */

document
    .querySelectorAll(
        "#recent-history .history-item"
    )
    .forEach(
        item => {

            item.addEventListener(
                "click",
                function () {


                    /*
                       Don't activate
                       when clicking pin.
                    */

                    document
                        .querySelectorAll(
                            "#recent-history .history-item"
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

                }
            );

        }
    );


/* =========================================================
   PIN BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".pin-btn"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function (event) {


                    /*
                       Prevent history item
                       from being selected.
                    */

                    event.stopPropagation();


                    /*
                       Toggle pin.
                    */

                    this.classList.toggle(
                        "is-active"
                    );


                    /*
                       Toggle pinned state.
                    */

                    const item =
                        this.closest(
                            ".history-item"
                        );


                    if (item) {

                        item.classList.toggle(
                            "is-pinned"
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   INITIAL FOCUS
========================================================= */

input.focus();