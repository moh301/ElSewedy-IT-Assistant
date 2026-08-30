/* =========================================================================
   SWE IT Assist — Chatbot page translations (self-contained switcher)
   ========================================================================= */

(function () {

    var CHAT_I18N = {
        en: {
            dir: "ltr",
            newChat: "New Chat",
            pinnedLabel: "Pinned",
            recentLabel: "Recent",
            recentEmpty: "No recent chats yet",
            pinNetwork: "Network / Wi-Fi Issues",
            pinAccounts: "Accounts / Passwords Issues",
            pinMail: "Mails / Outlook Issues",
            pinPrinting: "Printing Issues",
            pinSoftware: "Software / Applications Issues",
            recentOutlook: "Outlook not syncing",
            recentWifi: "Wi-Fi keeps dropping",
            recentPassword: "Reset domain password",
            recentPrinter: "Printer offline on 3rd floor",
            headerOnline: "Online now",
            headerActive: "Active",
            welcomeHeading: "Welcome to SWE IT Assist",
            welcomeBody: "Hello! How can I help you today?",
            composerPlaceholder: "Message SWE IT Assist...",
            composerHint: "SWE IT Assist can make mistakes. Verify critical steps with the IT helpdesk.",
            thinking: "Thinking",
            goBack: "Go Back",
            toggleSidebar: "Toggle Sidebar",
            sendMessage: "Send message",
            pinChat: "Pin chat",
            errorNoAI: "I couldn't get a response from the AI. Please try again.",
            errorConn: "I couldn't connect to the AI right now. Please check that the IT Assist server is running and try again."
        },
        ar: {
            dir: "rtl",
            newChat: "محادثة جديدة",
            pinnedLabel: "مثبت",
            recentLabel: "الأخيرة",
            recentEmpty: "لا توجد محادثات حديثة بعد",
            pinNetwork: "مشاكل الشبكة / واي فاي",
            pinAccounts: "مشاكل الحسابات / كلمات المرور",
            pinMail: "مشاكل البريد / أوتلوك",
            pinPrinting: "مشاكل الطباعة",
            pinSoftware: "مشاكل البرامج / التطبيقات",
            recentOutlook: "أوتلوك لا يتزامن",
            recentWifi: "الواي فاي يفصل باستمرار",
            recentPassword: "إعادة تعيين كلمة مرور الدومين",
            recentPrinter: "الطابعة غير متصلة في الدور الثالث",
            headerOnline: "متصل الآن",
            headerActive: "نشط",
            welcomeHeading: "أهلاً بك في SWE IT Assist",
            welcomeBody: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
            composerPlaceholder: "اكتب رسالة إلى SWE IT Assist...",
            composerHint: "قد يخطئ SWE IT Assist. تحقق من الخطوات المهمة مع مكتب مساعدة تكنولوجيا المعلومات.",
            thinking: "جاري التفكير",
            goBack: "رجوع",
            toggleSidebar: "إظهار/إخفاء الشريط الجانبي",
            sendMessage: "إرسال الرسالة",
            pinChat: "تثبيت المحادثة",
            errorNoAI: "تعذر الحصول على رد من الذكاء الاصطناعي. حاول مرة أخرى.",
            errorConn: "تعذر الاتصال بالذكاء الاصطناعي الآن. تأكد من تشغيل خادم IT Assist وحاول مرة أخرى."
        },
        es: {
            dir: "ltr",
            newChat: "Nuevo chat",
            pinnedLabel: "Fijado",
            recentLabel: "Recientes",
            recentEmpty: "Aún no hay chats recientes",
            pinNetwork: "Problemas de red / Wi-Fi",
            pinAccounts: "Problemas de cuentas / contraseñas",
            pinMail: "Problemas de correo / Outlook",
            pinPrinting: "Problemas de impresión",
            pinSoftware: "Problemas de software / aplicaciones",
            recentOutlook: "Outlook no sincroniza",
            recentWifi: "El Wi-Fi se desconecta",
            recentPassword: "Restablecer contraseña de dominio",
            recentPrinter: "Impresora fuera de línea en el 3er piso",
            headerOnline: "En línea ahora",
            headerActive: "Activo",
            welcomeHeading: "Bienvenido a SWE IT Assist",
            welcomeBody: "¡Hola! ¿Cómo puedo ayudarte hoy?",
            composerPlaceholder: "Mensaje a SWE IT Assist...",
            composerHint: "SWE IT Assist puede cometer errores. Verifica los pasos importantes con la mesa de ayuda de TI.",
            thinking: "Pensando",
            goBack: "Volver",
            toggleSidebar: "Alternar barra lateral",
            sendMessage: "Enviar mensaje",
            pinChat: "Fijar chat",
            errorNoAI: "No se pudo obtener respuesta de la IA. Inténtalo de nuevo.",
            errorConn: "No se pudo conectar con la IA en este momento. Verifica que el servidor de IT Assist esté en ejecución e inténtalo de nuevo."
        },
        zh: {
            dir: "ltr",
            newChat: "新建对话",
            pinnedLabel: "已固定",
            recentLabel: "最近",
            recentEmpty: "暂无最近对话",
            pinNetwork: "网络/Wi-Fi 问题",
            pinAccounts: "账户/密码问题",
            pinMail: "邮件/Outlook 问题",
            pinPrinting: "打印问题",
            pinSoftware: "软件/应用程序问题",
            recentOutlook: "Outlook 未同步",
            recentWifi: "Wi-Fi 频繁掉线",
            recentPassword: "重置域密码",
            recentPrinter: "三楼打印机离线",
            headerOnline: "当前在线",
            headerActive: "活跃",
            welcomeHeading: "欢迎使用 SWE IT Assist",
            welcomeBody: "你好！我今天能帮你什么？",
            composerPlaceholder: "给 SWE IT Assist 发消息…",
            composerHint: "SWE IT Assist 可能会出错。重要步骤请与 IT 服务台核实。",
            thinking: "思考中",
            goBack: "返回",
            toggleSidebar: "切换侧边栏",
            sendMessage: "发送消息",
            pinChat: "固定对话",
            errorNoAI: "无法从 AI 获取回复，请重试。",
            errorConn: "目前无法连接到 AI，请确认 IT Assist 服务器正在运行后重试。"
        }
    };

    window.CHAT_I18N = CHAT_I18N;

    // Shared with the main site (js/main.js) and support.html — this is the
    // single source of truth for language across every page, so switching
    // language anywhere carries over everywhere else.
    var STORAGE_KEY = "swe_it_lang";

    function getSavedLang() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved && CHAT_I18N[saved]) return saved;
        } catch (e) {}
        return "en";
    }

    function applyLanguage(code) {
        if (!CHAT_I18N[code]) code = "en";
        var t = CHAT_I18N[code];

        document.documentElement.lang = code;
        document.documentElement.dir = t.dir;

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (t[key] !== undefined) el.textContent = t[key];
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            if (t[key] !== undefined) el.placeholder = t[key];
        });

        document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-title");
            if (t[key] !== undefined) {
                el.title = t[key];
                el.setAttribute("aria-label", t[key]);
            }
        });

        var currentLabel = document.getElementById("lang-current");
        if (currentLabel) currentLabel.textContent = code.toUpperCase();

        document.querySelectorAll(".lang-option").forEach(function (btn) {
            btn.classList.toggle("is-active", btn.getAttribute("data-lang") === code);
        });

        window.SWE_CHAT_LANG = code;

        try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}

        // Let script.js know the language is ready/changed, so anything it
        // renders dynamically (like the "no recent chats" placeholder,
        // built after this file's own applyLanguage() call resolves) picks
        // up the right text instead of staying stuck on its English
        // fallback. script.js already listens for this — see its
        // "LANGUAGE CHANGE EVENT" section — it just was never dispatched.
        window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: code } }));
    }

    window.applyChatLanguage = applyLanguage;

    function wireSwitcher() {
        var trigger = document.getElementById("lang-trigger");
        var menu = document.getElementById("lang-menu");
        if (!trigger || !menu) return;

        trigger.addEventListener("click", function (event) {
            event.stopPropagation();
            menu.classList.toggle("is-open");
        });

        document.addEventListener("click", function () {
            menu.classList.remove("is-open");
        });

        document.querySelectorAll(".lang-option").forEach(function (btn) {
            btn.addEventListener("click", function () {
                applyLanguage(this.getAttribute("data-lang"));
                menu.classList.remove("is-open");
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        wireSwitcher();
        applyLanguage(getSavedLang());
    });

})();
