/* =========================================================
   SWE IT ASSIST
   LANGUAGE SYSTEM
========================================================= */

const CHAT_I18N = {

    en: {

        newChat: "New Chat",

        pinnedLabel: "Pinned",

        recentLabel: "Recent",

        recentEmpty: "No recent chats yet",

        pinNetwork: "Network / Wi-Fi Issues",

        pinAccounts: "Accounts / Passwords Issues",

        pinMail: "Mails / Outlook Issues",

        pinPrinting: "Printing Issues",

        pinSoftware: "Software / Applications Issues",

        headerOnline: "Online now",

        sendTicket: "Send a Ticket",

        openTickets: "Open Tickets",

        welcomeHeading: "Welcome to SWE IT Assist",

        welcomeBody:
            "Hello! How can I help you today?",

        composerPlaceholder:
            "Message SWE IT Assist...",

        composerHint:
            "SWE IT Assist can make mistakes. Verify critical steps with the IT helpdesk.",

        thinking: "Thinking",

        errorNoAI:
            "I couldn't get a response from the AI. Please try again.",

        errorConn:
            "I couldn't connect to the AI right now. Please check that the IT Assist server is running and try again.",

        goBack: "Go Back",

        toggleSidebar: "Toggle Sidebar",

        sendMessage: "Send message",

        changeLanguage: "Change language"

    },


    ar: {

        newChat: "محادثة جديدة",

        pinnedLabel: "المثبتة",

        recentLabel: "الأخيرة",

        recentEmpty:
            "لا توجد محادثات حديثة حتى الآن",

        pinNetwork:
            "مشاكل الشبكة / Wi-Fi",

        pinAccounts:
            "مشاكل الحسابات / كلمات المرور",

        pinMail:
            "مشاكل البريد / Outlook",

        pinPrinting:
            "مشاكل الطباعة",

        pinSoftware:
            "مشاكل البرامج / التطبيقات",

        headerOnline:
            "متصل الآن",

        sendTicket:
            "إرسال تذكرة",

        openTickets:
            "فتح التذاكر",

        welcomeHeading:
            "مرحبًا بك في SWE IT Assist",

        welcomeBody:
            "مرحبًا! كيف يمكنني مساعدتك اليوم؟",

        composerPlaceholder:
            "اكتب رسالتك إلى SWE IT Assist...",

        composerHint:
            "قد يخطئ SWE IT Assist. يُرجى التحقق من الخطوات المهمة مع قسم دعم تكنولوجيا المعلومات.",

        thinking:
            "جاري التفكير",

        errorNoAI:
            "لم أتمكن من الحصول على رد من الذكاء الاصطناعي. يُرجى المحاولة مرة أخرى.",

        errorConn:
            "تعذر الاتصال بالذكاء الاصطناعي حاليًا. يُرجى التأكد من تشغيل خادم IT Assist ثم المحاولة مرة أخرى.",

        goBack:
            "رجوع",

        toggleSidebar:
            "إظهار / إخفاء القائمة الجانبية",

        sendMessage:
            "إرسال الرسالة",

        changeLanguage:
            "تغيير اللغة"

    },


    es: {

        newChat:
            "Nuevo chat",

        pinnedLabel:
            "Fijados",

        recentLabel:
            "Recientes",

        recentEmpty:
            "No hay chats recientes",

        pinNetwork:
            "Problemas de red / Wi-Fi",

        pinAccounts:
            "Problemas de cuentas / contraseñas",

        pinMail:
            "Problemas de correo / Outlook",

        pinPrinting:
            "Problemas de impresión",

        pinSoftware:
            "Problemas de software / aplicaciones",

        headerOnline:
            "En línea ahora",

        sendTicket:
            "Enviar un ticket",

        openTickets:
            "Abrir tickets",

        welcomeHeading:
            "Bienvenido a SWE IT Assist",

        welcomeBody:
            "¡Hola! ¿Cómo puedo ayudarte hoy?",

        composerPlaceholder:
            "Escribe un mensaje a SWE IT Assist...",

        composerHint:
            "SWE IT Assist puede cometer errores. Verifica los pasos importantes con el equipo de soporte de TI.",

        thinking:
            "Pensando",

        errorNoAI:
            "No pude obtener una respuesta de la IA. Inténtalo de nuevo.",

        errorConn:
            "No pude conectarme a la IA en este momento. Comprueba que el servidor de IT Assist esté funcionando e inténtalo de nuevo.",

        goBack:
            "Volver",

        toggleSidebar:
            "Mostrar / ocultar barra lateral",

        sendMessage:
            "Enviar mensaje",

        changeLanguage:
            "Cambiar idioma"

    },


    zh: {

        newChat:
            "新聊天",

        pinnedLabel:
            "已固定",

        recentLabel:
            "最近聊天",

        recentEmpty:
            "暂无最近聊天",

        pinNetwork:
            "网络 / Wi-Fi 问题",

        pinAccounts:
            "账户 / 密码问题",

        pinMail:
            "邮件 / Outlook 问题",

        pinPrinting:
            "打印问题",

        pinSoftware:
            "软件 / 应用程序问题",

        headerOnline:
            "当前在线",

        sendTicket:
            "提交工单",

        openTickets:
            "打开工单",

        welcomeHeading:
            "欢迎使用 SWE IT Assist",

        welcomeBody:
            "您好！今天我可以为您提供什么帮助？",

        composerPlaceholder:
            "向 SWE IT Assist 发送消息...",

        composerHint:
            "SWE IT Assist 可能会出错。重要步骤请与 IT 服务台确认。",

        thinking:
            "正在思考",

        errorNoAI:
            "无法获取 AI 的回复，请重试。",

        errorConn:
            "目前无法连接到 AI。请确认 IT Assist 服务器正在运行，然后重试。",

        goBack:
            "返回",

        toggleSidebar:
            "切换侧边栏",

        sendMessage:
            "发送消息",

        changeLanguage:
            "更改语言"

    }

};


/* =========================================================
   CURRENT LANGUAGE
========================================================= */

const SAVED_LANG =
    localStorage.getItem("swe_it_assist_language");


let SWE_CHAT_LANG =
    SAVED_LANG && CHAT_I18N[SAVED_LANG]
        ? SAVED_LANG
        : "en";


window.CHAT_I18N = CHAT_I18N;

window.SWE_CHAT_LANG = SWE_CHAT_LANG;


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyChatLanguage(lang) {

    if (!CHAT_I18N[lang]) {

        lang = "en";

    }


    SWE_CHAT_LANG = lang;

    window.SWE_CHAT_LANG = lang;


    localStorage.setItem(
        "swe_it_assist_language",
        lang
    );


    const isArabic =
        lang === "ar";


    document.documentElement.lang =
        lang;

    document.documentElement.dir =
        isArabic ? "rtl" : "ltr";


    const translations =
        CHAT_I18N[lang];


    /* -----------------------------------------------------
       Normal text
    ----------------------------------------------------- */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );


            if (
                Object.prototype.hasOwnProperty.call(
                    translations,
                    key
                )
            ) {

                element.textContent =
                    translations[key];

            }

        });


    /* -----------------------------------------------------
       Placeholder
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );


            if (
                Object.prototype.hasOwnProperty.call(
                    translations,
                    key
                )
            ) {

                element.placeholder =
                    translations[key];

            }

        });


    /* -----------------------------------------------------
       Titles
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            "[data-i18n-title]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-title"
                );


            if (
                Object.prototype.hasOwnProperty.call(
                    translations,
                    key
                )
            ) {

                element.title =
                    translations[key];

            }

        });


    /* -----------------------------------------------------
       Current language indicator
    ----------------------------------------------------- */

    const langCurrent =
        document.getElementById(
            "lang-current"
        );


    if (langCurrent) {

        langCurrent.textContent =
            lang.toUpperCase();

    }


    /* -----------------------------------------------------
       Active language option
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            ".lang-option"
        )
        .forEach(option => {

            option.classList.toggle(
                "is-active",
                option.dataset.lang === lang
            );

        });


    /* -----------------------------------------------------
       Accessibility
    ----------------------------------------------------- */

    const langTrigger =
        document.getElementById(
            "lang-trigger"
        );


    if (langTrigger) {

        langTrigger.setAttribute(
            "aria-label",
            translations.changeLanguage
        );

        langTrigger.setAttribute(
            "title",
            translations.changeLanguage
        );

    }


    /*
       Update welcome message if it
       currently exists.
    */

    const welcomeHeading =
        document.querySelector(
            ".chat-box .bot-heading[data-i18n='welcomeHeading']"
        );


    const welcomeBody =
        document.querySelector(
            ".chat-box [data-i18n='welcomeBody']"
        );


    if (welcomeHeading) {

        welcomeHeading.textContent =
            translations.welcomeHeading;

    }


    if (welcomeBody) {

        welcomeBody.textContent =
            translations.welcomeBody;

    }

}


/* =========================================================
   LANGUAGE MENU
========================================================= */

function setupLanguageSwitcher() {

    const langSwitch =
        document.getElementById(
            "lang-switch"
        );

    const langTrigger =
        document.getElementById(
            "lang-trigger"
        );

    const langMenu =
        document.getElementById(
            "lang-menu"
        );


    if (
        !langSwitch ||
        !langTrigger ||
        !langMenu
    ) {

        return;

    }


    langTrigger.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            langMenu.classList.toggle(
                "is-open"
            );

        }
    );


    document
        .querySelectorAll(
            ".lang-option"
        )
        .forEach(option => {

            option.addEventListener(
                "click",
                function () {

                    const selectedLang =
                        this.dataset.lang;


                    applyChatLanguage(
                        selectedLang
                    );


                    langMenu.classList.remove(
                        "is-open"
                    );

                }
            );

        });


    document.addEventListener(
        "click",
        function (event) {

            if (
                !langSwitch.contains(event.target)
            ) {

                langMenu.classList.remove(
                    "is-open"
                );

            }

        }
    );

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        applyChatLanguage(
            SWE_CHAT_LANG
        );

        setupLanguageSwitcher();

    }
);