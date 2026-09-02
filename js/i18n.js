/* =========================================================================
   SWE IT Assist — Internationalization (EN / AR / ES / ZH)
   Source content: ELSEWEDY ELECTRIC IT Self-Service Troubleshooting Guides
   ========================================================================= */

const LANGS = [
    { code: "en", native: "English",  dir: "ltr" },
    { code: "ar", native: "العربية",  dir: "rtl" },
    { code: "es", native: "Español",  dir: "ltr" },
    { code: "zh", native: "中文",      dir: "ltr" }
];

const DEFAULT_LANG = "en";

const I18N = {

/* ================================================================= EN */
en: {
    ui: {
        statusActive: "24/7 AI System Active",
        productTag: "IT Self-Service Portal",
        heroEyebrow: "IT Self-Service",
        greetingMorning: (name) => `Good morning, ${name}`,
        greetingAfternoon: (name) => `Good afternoon, ${name}`,
        greetingEvening: (name) => `Good evening, ${name}`,
        heroTitleHtml: 'How can we help <span class="accent">you</span> today?',
        heroSubtitle: "Select the category that best describes your technical issue. Our assistant returns verified, step-by-step resolutions in seconds.",
        footerNote: "Need urgent help? Contact the IT Service Desk directly on extension 2000.",
        breadcrumbHome: "Home",
        backToCategories: "All categories",
        issuesCount: (n) => n === 1 ? "1 common issue" : `${n} common issues`,
        customRequest: "Custom request",
        tapToView: "Tap to view the resolution steps",
        causeLabel: "Cause:",
        didThisSolve: "Did this solve your issue?",
        yes: "Yes",
        no: "No",
        pressHere: "Press here",
        pressHereHint: "Still stuck? Describe your issue directly.",
        stillStuckPressHere: "Still stuck? Press here",
        otherWithIssuesTitle: 'Still need help? <span class="optional">Try “Other”</span>',
        otherWithIssuesDesc: "Didn’t find a matching issue above? Tell us what’s happening in your own words and our IT team will follow up with you directly.",
        otherWithIssuesLabel: "Other — describe your issue",
        otherEmptyTitle: "Tell us what’s going on",
        otherEmptyDesc: "Describe your issue in as much detail as you can — screen, app, error message, when it started — and our IT team will follow up with you directly.",
        otherEmptyLabel: "Describe your issue",
        placeholder: "Example: My laptop screen flickers randomly when connected to the docking station monitor…",
        errorEmpty: "Please describe your issue so our team can help.",
        errorShort: (min) => `Please add a bit more detail (at least ${min} characters).`,
        nameLabel: "Full name",
        namePlaceholder: "e.g. Ahmed Hassan",
        nameError: "Please enter your full name.",
        emailLabel: "Work email",
        emailPlaceholder: "e.g. ahmed.hassan@elsewedyelectric.com",
        emailError: "Please enter a valid email address.",
        submitError: "Something went wrong while sending your request. Please try again.",
        submit: "Submit request",
        submitting: "Submitting…",
        successTitle: "Request submitted",
        successDesc: "Thanks — a member of the IT team will reach out to you shortly.",
        titleSuffix: " — SWE IT Assist",
        langLabel: "Language",
        getStarted: "Get started",
        openApp: "Open app",
        searchPlaceholder: "Search for help…",
        searchNoResults: "No results match your search.",
        logout: "Log out",
        itSupportTitle: "IT Support",
        itSupportDesc: "Browse all categories — network, accounts, email, printing, software and more.",
        supportPageSubtitle: "Select the category that best describes your technical issue.",
        announcementBar: "SWE IT Assist — your 24/7 self-service portal for network, accounts, email, printing and software support at Elsewedy Electric.",
        appsSupportTitle: "Application Support",
        appsSupportDesc: "Get help with business applications — access requests, installation and troubleshooting.",
        oracleErpTitle: "Oracle ERP",
        oracleErpDesc: "Access requests, login issues, and troubleshooting for Oracle ERP.",
        salesforceCrmTitle: "Salesforce — CRM",
        salesforceCrmDesc: "Access requests, login issues, and troubleshooting for Salesforce CRM.",
        businessCardTitle: "Business Card",
        businessCardDesc: "Sign in to generate and manage your employee business card.",
        travelPortalTitle: "Travel Portal",
        travelPortalDesc: "Book flights, hotels and other business travel arrangements.",
        bookingTitle: "Booking",
        bookingDesc: "Reserve meeting rooms, equipment and IT resources.",
        comingSoonTitle: "Coming soon",
        comingSoonDesc: "We're setting this section up — check back soon, or contact the IT Service Desk on extension 2000 if you need help right now."
    },
    chat: {
        product: "IT Assist",
        newChat: "New Chat",
        pinnedLabel: "Pinned",
        recentLabel: "Recent",
        historyItems: ["VPN setup on laptop", "Outlook not syncing", "Wi-Fi keeps dropping", "Reset domain password", "Printer offline on 3rd floor"],
        systemActive: "24/7 AI System Active",
        onlineNow: "Online now",
        active: "Active",
        greeting: "Hello! How can I help you?",
        placeholder: "Message SWE IT Assist...",
        hint: "SWE IT Assist can make mistakes. Verify critical steps with the IT helpdesk.",
        backAria: "Back to IT Self-Service Portal",
        errorFallback: "Sorry, something went wrong. Make sure the chatbot backend is running, then try again."
    },
    auth: {
        eyebrow: "Employee Sign In",
        title: "Welcome back",
        subtitle: "Sign in with your Employee ID and work email to continue.",
        employeeIdLabel: "Employee ID",
        employeeIdPlaceholder: "e.g. 10234",
        emailLabel: "Work email",
        emailPlaceholder: "e.g. name@elsewedy.com",
        signIn: "Sign in",
        signingIn: "Signing in…",
        errorEmpty: "Enter your Employee ID and work email.",
        errorFormat: "Use your work email, e.g. name@elsewedy.com.",
        errorInvalid: "We couldn’t match that Employee ID with that email address.",
        errorGeneric: "Something went wrong while signing in. Please try again.",
        footerNote: "Having trouble signing in? Contact the IT Service Desk on extension 2000."
    },
    categories: {
        network: {
            title: "Network / Wi-Fi",
            description: "Cannot connect, weak signal, no internet access, etc.",
            issues: [
                { title: "Cannot Connect to Wi-Fi / SSID Not Showing", cause: "Airplane mode is active, the physical Wi-Fi switch is off, or the Wi-Fi adapter experienced a temporary glitch or entered power-saving mode.", steps: ["Click the network icon in the taskbar and ensure Airplane Mode is toggled off.", "Check the laptop keyboard for a physical Wi-Fi or airplane button (usually F12, F2, or a switch on the side of the laptop). Press it to re-enable the network adapter.", "Open Device Manager → Network Adapters → right-click the Wi-Fi adapter, select Disable device, wait a few seconds, then select Enable device."] },
                { title: "Connected to Wi-Fi, No Internet", cause: "The laptop is connected to the Wi-Fi network, but there is a yellow exclamation mark, and no websites will load.", steps: ["Right-click on the network name and select Forget.", "Reconnect to the network and enter the password again (this forces the device to pull a fresh IP address).", "If working remotely, perform a quick restart of your home router."] },
                { title: "Specific Site Is Not Working", cause: "The internet is working fine, but a specific internal company portal looks glitchy, refuses to accept your login, or is stuck loading.", steps: ["Open the website in an Incognito / Private window (press Ctrl + Shift + N).", "If the site works perfectly in Incognito mode, the issue is saved browser data. Open your browser settings and select Clear Cache and Cookies."] },
                { title: "Cannot Sign Up to Company Network", cause: "You connect to a public Wi-Fi network, but the login page to accept the terms did not open.", steps: ["Open a web browser and type a non-secure (HTTP) URL, such as “http://neverssl.com” or “http://1.1.1.1”.", "This forces the browser to bypass security blocks and immediately triggers the network’s login page to appear."] },
                { title: "Network Conflict with Docking Station", cause: "Ethernet connected via dock but no internet — a network conflict between the active Wi-Fi adapter and the Ethernet adapter in the Docking Station.", steps: ["Press Win + R, type “ncpa.cpl”, and press Enter.", "Right-click the Wi-Fi adapter and select Disable.", "Right-click the Ethernet adapter, select Disable, wait 3 seconds, then select Enable."] },
                { title: "Frequent Wi-Fi Disconnections", cause: "Windows power management is automatically turning off the Wi-Fi adapter to save battery.", steps: ["Go to Device Manager → Network Adapters → right-click the Wi-Fi adapter → Properties.", "Open the Power Management tab.", "Uncheck “Allow the computer to turn off this device to save power”."] },
                { title: "APIPA IP Address (169.254.x.x / No Internet)", cause: "The DHCP server failed to assign a valid IP address to the device.", steps: ["Open CMD as Administrator.", "Type “ipconfig /release” and press Enter.", "Type “ipconfig /renew” and press Enter to force IP renewal."] },
                { title: "Unidentified Network Issues", cause: "The connection keeps dropping, the PC says “Unidentified Network”, or the exact cause of the internet drop is unclear.", steps: ["Right-click the Wi-Fi or Network icon in the taskbar and select Troubleshoot problems.", "Follow the on-screen prompts — Windows will automatically reset the network adapter, flush the DNS, and fix basic configuration errors on its own."] }
            ]
        },
        accounts: {
            title: "Accounts and Passwords",
            description: "Locked account, expired or forgotten password, etc.",
            issues: [
                { title: "Forgotten Password & Account Lockout", cause: "The user is locked out of their Windows profile, email, or company portal after multiple incorrect attempts, or simply forgot their password.", steps: ["Wait 15 to 30 minutes. Many systems have a “soft lockout” policy that automatically unlocks the account after a short period.", "Look for a “Forgot Password” or “Reset Password” link on the login screen to use the company’s Self-Service Password Reset (SSPR) tool via an alternate email or SMS."] },
                { title: "Forgotten Email Address (Username)", cause: "The user cannot remember the exact format of their company email address (e.g., firstname.lastname@elsewedy.com vs. f.lastname@elsewedy.com), or is a new employee who hasn’t memorized it yet.", steps: ["Ask a colleague or your manager to search for your name in the Outlook Directory (Global Address List) or Microsoft Teams to confirm the exact spelling.", "Check your mobile phone to see if your work email is already signed into an app like Outlook or Apple Mail.", "Look at your physical onboarding documents or the initial welcome email sent to your personal email address during hiring."] },
                { title: "Persistent Login Prompts (Cached Old Credentials)", cause: "The user recently updated their password, but Windows or a specific app is still trying to log in using the old, saved password, causing background lockouts.", steps: ["Click the Start menu and search for Credential Manager.", "Go to Windows Credentials.", "Find any entries related to Office, Teams, or the failing portal. Click the drop-down arrow and select Remove.", "Restart the PC and log in with the new password."] },
                { title: "Incorrect Password Error (Keyboard Settings)", cause: "The password is correct, but it’s being typed incorrectly due to Caps Lock being on, or the keyboard language being switched.", steps: ["Click the “Eye” icon next to the password field (if available) to see exactly what is being typed.", "Check the keyboard for a glowing Caps Lock indicator light.", "Look at the bottom-right corner of the taskbar to ensure the language is set to ENG (English). Try pressing Alt + Shift or Win + Space to switch back and forth."] },
                { title: "Domain Mismatch at Login", cause: "The login attempt fails because the user enters their username without the required domain prefix or enters an incomplete email format.", steps: ["Ensure you are typing your full corporate email address (e.g., user@elsewedy.com) instead of just your first name or short username.", "If the system requires a domain format, type your credentials using Domain\\Username (e.g., ELSEWEDY\\username).", "Check for any typos or unwanted spaces at the beginning or end of your username."] },
                { title: "Account Locked Out (Repeated Password Failures)", cause: "The system has temporarily disabled access to the account after detecting multiple consecutive incorrect password entries for security reasons.", steps: ["Wait 15 minutes for the automatic system lockout policy to reset and automatically release the lock.", "Visit the self-service portal at passwordreset.microsoftonline.com from a browser or mobile device to manually unlock your account or update your credentials."] }
            ]
        },
        email: {
            title: "Mails & Outlook",
            description: "Mailbox, size limit, auto-reply, etc.",
            issues: [
                { title: "Mailbox Full & Quota Exceeded", cause: "You stop receiving emails and get a “Mailbox Full” warning.", steps: ["Right-click and empty both your Deleted Items and Junk Email folders.", "Open your Sent Items folder, sort the emails by Size (using the top filter), and delete old messages with massive attachments."] },
                { title: "Outlook Search Not Working", cause: "Searching for a specific email returns “No results found.”", steps: ["Restart your PC to force the Windows search index to refresh.", "For an instant workaround, log in to Outlook on the Web via your browser — its cloud search works immediately even if the desktop app is frozen."] },
                { title: "Accidentally Sent Emails", cause: "You sent an email by mistake, and the standard “Recall” button rarely works.", steps: ["Go to File → Manage Rules & Alerts → New Rule.", "Select “Apply rule on messages I send”, click Next twice, then Yes.", "Check the box for “defer delivery by a number of minutes”, click the underlined text to set it to 1, and click Finish. This sets a permanent 1-minute safety delay."] },
                { title: "Unable to Send Email Due to Attachment Size Limit", cause: "The email fails to send because the attached files exceed the company’s maximum allowed size limit (usually 25 MB).", steps: ["Remove the heavy attachments from your email draft.", "Upload the large files to your corporate OneDrive or SharePoint storage space instead.", "Copy the OneDrive share link into the email body and send it again."] },
                { title: "Auto-Reply / Out of Office Message Not Working", cause: "The user configured an Out of Office auto-reply, but senders are not receiving the automated response.", steps: ["Open the Auto-Reply settings and ensure “Send auto-replies” is toggled ON with the correct start and end dates.", "Ensure “Send replies outside my organization” is checked if external clients should receive the auto-reply too.", "Test it by sending an email to your work address from a personal account or asking a colleague to email you."] },
                { title: "Accidentally Deleted Email Recovery", cause: "The user accidentally deleted an important email and needs to restore it before it is permanently removed.", steps: ["Open the Deleted Items folder from the left sidebar.", "If the email is there, right-click it and select Move → Inbox.", "If it is not listed, click “Recover items deleted from this folder” at the top of the folder list, select the required email, and click Restore."] }
            ]
        },
        printing: {
            title: "Printing Issues",
            description: "Print queue, printer not found, etc.",
            issues: [
                { title: "Printer Not Found / Driver Missing", cause: "The user wants to print, but the assigned floor or department printer does not appear in their list of available printers.", steps: ["Open Settings → Devices → Printers & scanners.", "Click “Add a printer or scanner” and wait a few seconds for the automatic search.", "If it does not appear, click “The printer that I want isn’t listed” and select the option to search by the printer’s IP address or network name."] },
                { title: "Printing Slow / High-Resolution Graphics", cause: "The print job takes an extremely long time to process because the file size is very large (e.g., an image-heavy PDF) or the print settings are set to maximum quality.", steps: ["Open Printer Properties before sending the print command.", "Change the print quality setting from High Quality to Standard or Draft.", "Select Grayscale / Black & White printing to speed up page processing."] },
                { title: "Double-Sided Printing Not Working", cause: "The printer outputs each page on a separate sheet even though the user intended to print on both sides, usually because the duplex feature is disabled.", steps: ["Press Ctrl + P and open Printer Properties.", "Go to the Device Settings or Layout tab.", "Ensure the Duplex Unit module is enabled and set the printing mode to “Print on Both Sides”."] },
                { title: "Documents Stuck in Print Queue", cause: "You send a document to print, but nothing happens, and new print jobs just pile up without printing.", steps: ["Search for “Printers & scanners” in the Windows Start menu.", "Click on your printer and select “Open queue”.", "Click the Printer tab at the top (or the three dots) and select “Cancel All Documents”.", "Restart the printer physically from the power button, wait a minute, and try printing again."] },
                { title: "Printing to PDF Instead of Paper", cause: "You click print, but instead of the printer making a sound, a “Save As” window pops up asking you to save a file — the wrong output device is selected.", steps: ["On the print screen (after pressing Ctrl + P), look at the Printer drop-down menu at the top.", "Change it from “Microsoft Print to PDF” to the actual name of your office physical printer (e.g., HP, Canon, Xerox).", "Click print."] }
            ]
        },
        software: {
            title: "Software & Applications",
            description: "App is not responding, freezing or slow, change default app, etc.",
            issues: [
                { title: "Application Not Responding", cause: "A program like Excel or Word completely freezes, grays out, and displays a “Not Responding” error message at the top.", steps: ["Press Ctrl + Shift + Esc to open the Task Manager.", "Find the frozen application in the list, right-click it, and select “End task” to force it to close.", "When you reopen Microsoft Office apps, they will usually recover your unsaved work automatically."] },
                { title: "Wrong Default Application", cause: "Double-clicking a file opens it in the wrong program, such as the web browser instead of Adobe Acrobat.", steps: ["Right-click the file and select Properties.", "Look for the “Opens with:” section and click the Change button.", "Select your preferred application from the list (e.g., Adobe Acrobat), click OK, then click Apply."] },
                { title: "Browser Running Extremely Slow", cause: "Your web browser takes forever to load pages, and clicking between tabs lags heavily.", steps: ["Close unnecessary open tabs (each tab consumes RAM).", "If still lagging, press Ctrl + Shift + Delete to clear the cache.", "Check the “Cached images and files” box and click “Clear data”.", "Restart the browser."] },
                { title: "Microsoft Teams Freezing or Audio/Video Glitches", cause: "Teams becomes unresponsive or experiences audio and video failures during meetings due to accumulated cache or restricted privacy permissions.", steps: ["Close Microsoft Teams completely by right-clicking the Teams icon in the system tray and selecting Quit.", "Press Win + R, type %appdata%\\Microsoft\\Teams, and delete the temporary files inside to clear the cache.", "Go to Windows Settings → Privacy and ensure access to both the Microphone and Camera is toggled ON for Microsoft Teams."] },
                { title: "Microsoft 365 “Unlicensed Product” Error", cause: "A banner appears at the top of Office apps stating “Unlicensed Product”, restricting document editing due to an expired session or activation sync failure.", steps: ["Open any Office application (e.g., Word or Excel) and navigate to File → Account.", "Click “Sign Out” to completely log out of your current session.", "Click “Sign In” and re-enter your full corporate email address and password to refresh the license activation."] }
            ]
        },
        other: {
            title: "Other / Custom Issue",
            description: "Describe your problem in your own words.",
            issues: []
        }
    }
},

/* ================================================================= AR */
ar: {
    ui: {
        statusActive: "نظام ذكاء اصطناعي يعمل على مدار الساعة",
        productTag: "بوابة الدعم الفني الذاتي",
        heroEyebrow: "الدعم الفني الذاتي",
        greetingMorning: (name) => `صباح الخير يا ${name}`,
        greetingAfternoon: (name) => `نهارك سعيد يا ${name}`,
        greetingEvening: (name) => `مساء الخير يا ${name}`,
        heroTitleHtml: 'كيف يمكننا <span class="accent">مساعدتك</span> اليوم؟',
        heroSubtitle: "اختر الفئة الأقرب لوصف مشكلتك التقنية، وسيعرض المساعد الذكي خطوات حل موثوقة خلال ثوانٍ.",
        footerNote: "هل تحتاج مساعدة عاجلة؟ تواصل مباشرة مع مكتب خدمة تقنية المعلومات على الرقم الداخلي 2000.",
        breadcrumbHome: "الرئيسية",
        backToCategories: "كل الفئات",
        issuesCount: (n) => n === 1 ? "مشكلة شائعة واحدة" : n === 2 ? "مشكلتان شائعتان" : `${n} مشاكل شائعة`,
        customRequest: "طلب مخصص",
        tapToView: "اضغط لعرض خطوات الحل",
        causeLabel: "السبب:",
        didThisSolve: "هل حل هذا مشكلتك؟",
        yes: "نعم",
        no: "لا",
        pressHere: "اضغط هنا",
        pressHereHint: "لسه محتاج مساعدة؟ اوصف مشكلتك بنفسك.",
        stillStuckPressHere: "لسه محتاج مساعدة؟ اضغط هنا",
        otherWithIssuesTitle: 'ما زلت بحاجة إلى مساعدة؟ <span class="optional">جرّب "أخرى"</span>',
        otherWithIssuesDesc: "لم تجد المشكلة المطابقة أعلاه؟ اكتب لنا ما يحدث بكلماتك الخاصة، وسيتواصل معك فريق تقنية المعلومات مباشرة.",
        otherWithIssuesLabel: "أخرى — صف مشكلتك",
        otherEmptyTitle: "أخبرنا بما يحدث",
        otherEmptyDesc: "صف مشكلتك بأكبر قدر ممكن من التفاصيل — الشاشة، البرنامج، رسالة الخطأ، ومتى بدأت — وسيتواصل معك فريق تقنية المعلومات مباشرة.",
        otherEmptyLabel: "صف مشكلتك",
        placeholder: "مثال: شاشة الجهاز تومض بشكل عشوائي عند التوصيل بشاشة محطة الإرساء (Docking Station)…",
        errorEmpty: "من فضلك صف مشكلتك حتى يتمكن فريقنا من المساعدة.",
        errorShort: (min) => `من فضلك أضف مزيدًا من التفاصيل (${min} حرفًا على الأقل).`,
        nameLabel: "الاسم بالكامل",
        namePlaceholder: "مثال: أحمد حسن",
        nameError: "من فضلك أدخل اسمك بالكامل.",
        emailLabel: "البريد الإلكتروني للعمل",
        emailPlaceholder: "مثال: ahmed.hassan@elsewedyelectric.com",
        emailError: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.",
        submitError: "حدث خطأ أثناء إرسال طلبك. من فضلك حاول مرة أخرى.",
        submit: "إرسال الطلب",
        submitting: "جارٍ الإرسال…",
        successTitle: "تم إرسال الطلب",
        successDesc: "شكرًا لك — سيتواصل معك أحد أعضاء فريق تقنية المعلومات قريبًا.",
        titleSuffix: " — مساعد تقنية المعلومات SWE",
        langLabel: "اللغة",
        getStarted: "ابدأ الآن",
        openApp: "فتح التطبيق",
        itSupportTitle: "الدعم الفني",
        itSupportDesc: "تصفح كل الفئات — الشبكة، الحسابات، البريد الإلكتروني، الطباعة، البرامج والمزيد.",
        supportPageSubtitle: "اختر الفئة التي تصف مشكلتك التقنية بأفضل شكل.",
        announcementBar: "SWE IT Assist — بوابتك للدعم الفني الذاتي على مدار الساعة لحل مشاكل الشبكة والحسابات والبريد والطباعة والبرامج في السويدي إليكتريك.",
        appsSupportTitle: "دعم التطبيقات",
        appsSupportDesc: "احصل على مساعدة في تطبيقات العمل — طلبات الوصول، التثبيت، وحل المشاكل.",
        oracleErpTitle: "Oracle ERP",
        oracleErpDesc: "طلبات الوصول، مشاكل تسجيل الدخول، وحل المشاكل الخاصة بـ Oracle ERP.",
        salesforceCrmTitle: "Salesforce — CRM",
        salesforceCrmDesc: "طلبات الوصول، مشاكل تسجيل الدخول، وحل المشاكل الخاصة بـ Salesforce CRM.",
        businessCardTitle: "بطاقة العمل",
        businessCardDesc: "سجّل الدخول لإنشاء وإدارة بطاقة العمل الخاصة بك.",
        travelPortalTitle: "بوابة السفر",
        travelPortalDesc: "احجز تذاكر الطيران والفنادق وترتيبات سفر العمل الأخرى.",
        bookingTitle: "الحجوزات",
        bookingDesc: "احجز قاعات الاجتماعات والمعدات وموارد تكنولوجيا المعلومات.",
        comingSoonTitle: "قريبًا",
        comingSoonDesc: "إحنا لسه بنجهّز القسم ده — تابعنا قريبًا، أو تواصل مع مكتب خدمة تكنولوجيا المعلومات على الرقم الداخلي 2000 لو محتاج مساعدة دلوقتي.",
        searchPlaceholder: "ابحث عن مساعدة…",
        searchNoResults: "لا توجد نتائج مطابقة لبحثك.",
        logout: "تسجيل الخروج"
    },
    chat: {
        product: "مساعد تقني",
        newChat: "محادثة جديدة",
        pinnedLabel: "مثبّت",
        recentLabel: "الأخيرة",
        historyItems: ["إعداد VPN على اللابتوب", "أوت لوك مش بيتزامن", "الواي فاي بيقطع باستمرار", "إعادة تعيين كلمة مرور الدومين", "الطابعة أوفلاين في الدور التالت"],
        systemActive: "نظام ذكاء اصطناعي شغّال 24/7",
        onlineNow: "متصل الآن",
        active: "نشط",
        greeting: "أهلاً! ازاي أقدر أساعدك؟",
        placeholder: "اكتب رسالتك لـ SWE IT Assist...",
        hint: "SWE IT Assist ممكن يخطئ أحيانًا. تأكد من الخطوات المهمة مع فريق الدعم الفني.",
        backAria: "الرجوع إلى بوابة الخدمة الذاتية",
        errorFallback: "حصلت مشكلة أثناء إرسال الرسالة. تأكد إن سيرفر الشات بوت شغال وجرب تاني."
    },
    auth: {
        eyebrow: "تسجيل دخول الموظفين",
        title: "أهلاً بيك تاني",
        subtitle: "سجّل الدخول برقم الموظف وبريد العمل عشان تكمل.",
        employeeIdLabel: "رقم الموظف",
        employeeIdPlaceholder: "مثال: 10234",
        emailLabel: "بريد العمل",
        emailPlaceholder: "مثال: name@elsewedy.com",
        signIn: "تسجيل الدخول",
        signingIn: "جارٍ تسجيل الدخول…",
        errorEmpty: "من فضلك أدخل رقم الموظف وبريد العمل.",
        errorFormat: "استخدم بريد العمل الخاص بك، مثال: name@elsewedy.com.",
        errorInvalid: "رقم الموظف ده مش متطابق مع البريد الإلكتروني ده.",
        errorGeneric: "حدث خطأ أثناء تسجيل الدخول. من فضلك حاول مرة أخرى.",
        footerNote: "بتواجه مشكلة في تسجيل الدخول؟ تواصل مع مكتب خدمة تقنية المعلومات على الرقم الداخلي 2000."
    },
    categories: {
        network: {
            title: "الشبكة / Wi-Fi",
            description: "تعذر الاتصال، إشارة ضعيفة، عدم توفر إنترنت، وغيرها.",
            issues: [
                { title: "تعذر الاتصال بالـ Wi-Fi / اسم الشبكة (SSID) لا يظهر", cause: "وضع الطيران مفعّل، أو مفتاح الـ Wi-Fi الفعلي مغلق، أو حدث خلل مؤقت في محول الشبكة أو دخل في وضع توفير الطاقة.", steps: ["اضغط على أيقونة الشبكة في شريط المهام وتأكد أن وضع الطيران مغلق.", "تحقق من وجود زر Wi-Fi أو طيران فعلي على لوحة المفاتيح (غالبًا F12 أو F2 أو مفتاح جانبي في الجهاز)، واضغط عليه لإعادة تفعيل محول الشبكة.", "افتح Device Manager ← Network Adapters ← اضغط بزر الفأرة الأيمن على محول Wi-Fi، اختر Disable device، انتظر ثوانٍ، ثم اختر Enable device."] },
                { title: "متصل بالـ Wi-Fi لكن بدون إنترنت", cause: "الجهاز متصل بشبكة الـ Wi-Fi، لكن تظهر علامة تعجب صفراء ولا تفتح أي مواقع.", steps: ["اضغط بزر الفأرة الأيمن على اسم الشبكة واختر Forget (نسيان).", "أعد الاتصال بالشبكة وأدخل كلمة المرور مرة أخرى (هذا يجبر الجهاز على الحصول على عنوان IP جديد).", "إذا كنت تعمل عن بُعد، أعد تشغيل الراوتر المنزلي بسرعة."] },
                { title: "موقع معين لا يعمل", cause: "الإنترنت يعمل بشكل طبيعي، لكن بوابة داخلية معينة للشركة تظهر بشكل غير سليم، أو ترفض تسجيل الدخول، أو تظل عالقة أثناء التحميل.", steps: ["افتح الموقع في نافذة تصفح خاص (اضغط Ctrl + Shift + N).", "إذا عمل الموقع بشكل سليم في وضع التصفح الخاص، فالمشكلة في بيانات المتصفح المحفوظة. افتح إعدادات المتصفح واختر مسح ذاكرة التخزين المؤقت وملفات تعريف الارتباط."] },
                { title: "تعذر تسجيل الدخول إلى شبكة الشركة", cause: "تتصل بشبكة Wi-Fi عامة، لكن صفحة تسجيل الدخول لقبول الشروط لا تفتح.", steps: ["افتح متصفحًا واكتب رابطًا غير آمن (HTTP) مثل «http://neverssl.com» أو «http://1.1.1.1».", "هذا يجبر المتصفح على تجاوز الحواجز الأمنية ويؤدي فورًا لظهور صفحة تسجيل الدخول الخاصة بالشبكة."] },
                { title: "تعارض في الشبكة مع محطة الإرساء (Docking Station)", cause: "الإيثرنت متصل عبر محطة الإرساء لكن بدون إنترنت — تعارض بين محول الـ Wi-Fi النشط ومحول الإيثرنت في محطة الإرساء.", steps: ["اضغط Win + R، اكتب «ncpa.cpl»، ثم اضغط Enter.", "اضغط بزر الفأرة الأيمن على محول Wi-Fi واختر Disable.", "اضغط بزر الفأرة الأيمن على محول Ethernet، اختر Disable، انتظر 3 ثوانٍ، ثم اختر Enable."] },
                { title: "انقطاع متكرر للـ Wi-Fi", cause: "نظام إدارة الطاقة في Windows يقوم تلقائيًا بإيقاف تشغيل محول الـ Wi-Fi لتوفير طاقة البطارية.", steps: ["اذهب إلى Device Manager ← Network Adapters ← اضغط بزر الفأرة الأيمن على محول Wi-Fi ← Properties.", "افتح تبويب Power Management.", "ألغِ تحديد «Allow the computer to turn off this device to save power»."] },
                { title: "عنوان IP من نوع APIPA (169.254.x.x / بدون إنترنت)", cause: "فشل خادم DHCP في تخصيص عنوان IP صالح للجهاز.", steps: ["افتح موجه الأوامر CMD كمسؤول (Administrator).", "اكتب «ipconfig /release» واضغط Enter.", "اكتب «ipconfig /renew» واضغط Enter لإجبار الجهاز على تجديد عنوان الـ IP."] },
                { title: "مشاكل شبكة غير محددة", cause: "الاتصال ينقطع باستمرار، أو يظهر على الجهاز «Unidentified Network»، أو السبب الدقيق لانقطاع الإنترنت غير واضح.", steps: ["اضغط بزر الفأرة الأيمن على أيقونة Wi-Fi أو الشبكة في شريط المهام واختر Troubleshoot problems.", "اتبع التعليمات التي تظهر على الشاشة — سيقوم Windows تلقائيًا بإعادة ضبط محول الشبكة، وتفريغ DNS، وإصلاح أخطاء الإعدادات الأساسية بنفسه."] }
            ]
        },
        accounts: {
            title: "الحسابات وكلمات المرور",
            description: "حساب مقفل، كلمة مرور منتهية أو منسية، وغيرها.",
            issues: [
                { title: "نسيان كلمة المرور وإغلاق الحساب", cause: "يتم إغلاق حساب المستخدم في Windows أو البريد الإلكتروني أو بوابة الشركة بعد عدة محاولات خاطئة، أو ببساطة نسي المستخدم كلمة المرور.", steps: ["انتظر من 15 إلى 30 دقيقة. تحتوي العديد من الأنظمة على سياسة «إغلاق مؤقت» تقوم بفتح الحساب تلقائيًا بعد فترة قصيرة.", "ابحث عن رابط «Forgot Password» أو «Reset Password» في شاشة تسجيل الدخول لاستخدام أداة إعادة تعيين كلمة المرور الذاتية (SSPR) الخاصة بالشركة عبر بريد بديل أو رسالة نصية."] },
                { title: "نسيان عنوان البريد الإلكتروني (اسم المستخدم)", cause: "لا يتذكر المستخدم الصيغة الدقيقة لبريده الإلكتروني الخاص بالشركة (مثل firstname.lastname@elsewedy.com مقابل f.lastname@elsewedy.com)، أو أنه موظف جديد لم يحفظه بعد.", steps: ["اطلب من زميل أو مديرك البحث عن اسمك في دليل Outlook (Global Address List) أو Microsoft Teams للتأكد من الصيغة الصحيحة.", "تحقق من هاتفك المحمول لمعرفة ما إذا كان بريدك الوظيفي مسجّلاً بالفعل في تطبيق مثل Outlook أو Apple Mail.", "راجع مستندات التعيين الخاصة بك أو رسالة الترحيب الأولى التي أُرسلت إلى بريدك الشخصي عند التوظيف."] },
                { title: "ظهور مستمر لطلب تسجيل الدخول (بيانات اعتماد قديمة محفوظة)", cause: "قام المستخدم مؤخرًا بتحديث كلمة المرور، لكن Windows أو أحد التطبيقات ما زال يحاول تسجيل الدخول باستخدام كلمة المرور القديمة المحفوظة، مما يسبب إغلاقات في الخلفية.", steps: ["اضغط على قائمة Start وابحث عن Credential Manager.", "اذهب إلى Windows Credentials.", "ابحث عن أي إدخالات متعلقة بـ Office أو Teams أو البوابة التي تفشل. اضغط على السهم المنسدل واختر Remove.", "أعد تشغيل الجهاز وسجّل الدخول بكلمة المرور الجديدة."] },
                { title: "خطأ كلمة مرور غير صحيحة (إعدادات لوحة المفاتيح)", cause: "كلمة المرور صحيحة، لكن يتم كتابتها بشكل خاطئ بسبب تفعيل Caps Lock أو تغيير لغة لوحة المفاتيح.", steps: ["اضغط على أيقونة «العين» بجانب حقل كلمة المرور (إن وجدت) لرؤية ما يتم كتابته بالضبط.", "تحقق من لوحة المفاتيح لمعرفة ما إذا كان مؤشر Caps Lock مضاءً.", "تحقق من الزاوية اليمنى السفلية لشريط المهام للتأكد من أن اللغة مضبوطة على ENG (الإنجليزية). جرّب الضغط على Alt + Shift أو Win + Space للتبديل بينهما."] },
                { title: "عدم تطابق النطاق (Domain) عند تسجيل الدخول", cause: "تفشل محاولة تسجيل الدخول لأن المستخدم يُدخل اسم المستخدم بدون بادئة النطاق (Domain) المطلوبة، أو يُدخل صيغة بريد إلكتروني غير كاملة.", steps: ["تأكد من كتابة بريدك الإلكتروني الكامل الخاص بالشركة (مثل user@elsewedy.com) بدلًا من الاسم الأول فقط أو اسم مستخدم مختصر.", "إذا كان النظام يتطلب صيغة النطاق، اكتب بياناتك بصيغة Domain\\Username (مثل ELSEWEDY\\username).", "تحقق من عدم وجود أخطاء إملائية أو مسافات غير مرغوبة في بداية أو نهاية اسم المستخدم."] },
                { title: "إغلاق الحساب (محاولات متكررة خاطئة لكلمة المرور)", cause: "قام النظام مؤقتًا بتعطيل الوصول إلى الحساب بعد رصد عدة محاولات خاطئة متتالية لكلمة المرور، وذلك لأسباب أمنية.", steps: ["انتظر 15 دقيقة حتى تعيد سياسة الإغلاق التلقائي للنظام ضبط نفسها وتُفرج عن الحساب تلقائيًا.", "قم بزيارة بوابة الخدمة الذاتية على passwordreset.microsoftonline.com من متصفح أو جهاز محمول لفتح حسابك يدويًا أو تحديث بياناتك."] }
            ]
        },
        email: {
            title: "البريد الإلكتروني وOutlook",
            description: "امتلاء البريد، حد الحجم، الرد التلقائي، وغيرها.",
            issues: [
                { title: "امتلاء صندوق البريد وتجاوز الحصة المخصصة", cause: "تتوقف عن استقبال رسائل البريد الإلكتروني وتظهر لك رسالة تحذير «Mailbox Full».", steps: ["اضغط بزر الفأرة الأيمن وأفرغ مجلدي Deleted Items وJunk Email.", "افتح مجلد Sent Items، ورتّب الرسائل حسب الحجم (باستخدام الفلتر العلوي)، واحذف الرسائل القديمة ذات المرفقات الكبيرة."] },
                { title: "بحث Outlook لا يعمل", cause: "عند البحث عن رسالة معينة تظهر النتيجة «No results found» (لا توجد نتائج).", steps: ["أعد تشغيل جهازك لإجبار فهرس بحث Windows على التحديث.", "كحل سريع فوري، سجّل الدخول إلى Outlook على الويب عبر المتصفح — بحثه السحابي يعمل فورًا حتى لو كان تطبيق سطح المكتب متجمدًا."] },
                { title: "إرسال رسائل بريد إلكتروني عن طريق الخطأ", cause: "أرسلت رسالة بريد إلكتروني بالخطأ، وزر «Recall» (سحب الرسالة) القياسي نادرًا ما يعمل.", steps: ["اذهب إلى File ← Manage Rules & Alerts ← New Rule.", "اختر «Apply rule on messages I send»، اضغط Next مرتين، ثم Yes.", "حدد خانة «defer delivery by a number of minutes»، اضغط على النص المسطر لضبطه على 1، ثم اضغط Finish. هذا يضبط تأخيرًا دائمًا للأمان لمدة دقيقة واحدة."] },
                { title: "تعذر إرسال البريد الإلكتروني بسبب حد حجم المرفقات", cause: "يفشل إرسال البريد الإلكتروني لأن الملفات المرفقة تتجاوز الحد الأقصى المسموح به من الشركة (عادةً 25 ميجابايت).", steps: ["احذف المرفقات الكبيرة من مسودة البريد الإلكتروني.", "ارفع الملفات الكبيرة إلى مساحة تخزين OneDrive أو SharePoint الخاصة بالشركة بدلًا من ذلك.", "انسخ رابط مشاركة OneDrive إلى نص الرسالة وأرسلها مرة أخرى."] },
                { title: "الرد التلقائي / رسالة خارج المكتب لا تعمل", cause: "قام المستخدم بإعداد رد تلقائي لرسالة «خارج المكتب»، لكن المرسلين لا يستلمون الرد التلقائي.", steps: ["افتح إعدادات الرد التلقائي وتأكد أن «Send auto-replies» مفعّلة بتواريخ البداية والنهاية الصحيحة.", "تأكد من تحديد «Send replies outside my organization» إذا كان يجب أن يستلم العملاء الخارجيون الرد التلقائي أيضًا.", "اختبر ذلك بإرسال رسالة إلى بريدك الوظيفي من حساب شخصي أو اطلب من زميل إرسال رسالة لك."] },
                { title: "استرجاع بريد إلكتروني محذوف بالخطأ", cause: "حذف المستخدم رسالة مهمة بالخطأ ويحتاج إلى استعادتها قبل حذفها نهائيًا.", steps: ["افتح مجلد Deleted Items من الشريط الجانبي الأيسر.", "إذا كانت الرسالة موجودة هناك، اضغط بزر الفأرة الأيمن عليها واختر Move ← Inbox.", "إذا لم تكن مدرجة، اضغط على «Recover items deleted from this folder» أعلى قائمة المجلدات، حدد الرسالة المطلوبة، ثم اضغط Restore."] }
            ]
        },
        printing: {
            title: "مشاكل الطباعة",
            description: "قائمة انتظار الطباعة، الطابعة غير موجودة، وغيرها.",
            issues: [
                { title: "الطابعة غير موجودة / برنامج التشغيل مفقود", cause: "يريد المستخدم الطباعة، لكن طابعة الطابق أو القسم المخصصة لا تظهر في قائمة الطابعات المتاحة.", steps: ["افتح Settings ← Devices ← Printers & scanners.", "اضغط على «Add a printer or scanner» وانتظر ثوانٍ للبحث التلقائي.", "إذا لم تظهر، اضغط على «The printer that I want isn't listed» واختر البحث عن طريق عنوان IP الخاص بالطابعة أو اسم الشبكة."] },
                { title: "الطباعة بطيئة / رسومات عالية الدقة", cause: "تستغرق مهمة الطباعة وقتًا طويلًا جدًا للمعالجة لأن حجم الملف كبير جدًا (مثل ملف PDF يحتوي على صور كثيرة) أو لأن إعدادات الطباعة مضبوطة على أعلى جودة.", steps: ["افتح خصائص الطابعة (Printer Properties) قبل إرسال أمر الطباعة.", "غيّر إعداد جودة الطباعة من High Quality إلى Standard أو Draft.", "اختر الطباعة بالتدرج الرمادي / الأبيض والأسود (Grayscale) لتسريع معالجة الصفحات."] },
                { title: "الطباعة على الوجهين لا تعمل", cause: "تطبع الطابعة كل صفحة على ورقة منفصلة رغم أن المستخدم أراد الطباعة على الوجهين، وغالبًا يكون السبب أن خاصية الطباعة المزدوجة (Duplex) معطّلة.", steps: ["اضغط Ctrl + P وافتح Printer Properties.", "اذهب إلى تبويب Device Settings أو Layout.", "تأكد من تفعيل وحدة Duplex Unit واضبط وضع الطباعة على «Print on Both Sides»."] },
                { title: "مستندات عالقة في قائمة انتظار الطباعة", cause: "ترسل مستندًا للطباعة، لكن لا يحدث شيء، وتتراكم مهام الطباعة الجديدة دون أن تُطبع.", steps: ["ابحث عن «Printers & scanners» في قائمة Start الخاصة بـ Windows.", "اضغط على طابعتك واختر «Open queue».", "اضغط على تبويب Printer في الأعلى (أو النقاط الثلاث) واختر «Cancel All Documents».", "أعد تشغيل الطابعة فعليًا من زر الطاقة، انتظر دقيقة، وحاول الطباعة مرة أخرى."] },
                { title: "الطباعة إلى PDF بدلًا من الورق", cause: "تضغط طباعة، لكن بدلًا من أن تصدر الطابعة صوتًا، تظهر نافذة «Save As» تطلب منك حفظ ملف — جهاز الإخراج المحدد غير صحيح.", steps: ["في شاشة الطباعة (بعد الضغط على Ctrl + P)، انظر إلى القائمة المنسدلة للطابعة في الأعلى.", "غيّرها من «Microsoft Print to PDF» إلى الاسم الفعلي لطابعة مكتبك (مثل HP أو Canon أو Xerox).", "اضغط طباعة."] }
            ]
        },
        software: {
            title: "البرامج والتطبيقات",
            description: "البرنامج لا يستجيب، يتجمد أو بطيء، تغيير البرنامج الافتراضي، وغيرها.",
            issues: [
                { title: "التطبيق لا يستجيب", cause: "يتجمد برنامج مثل Excel أو Word تمامًا، ويتحول إلى اللون الرمادي، وتظهر رسالة خطأ «Not Responding» في الأعلى.", steps: ["اضغط Ctrl + Shift + Esc لفتح Task Manager.", "ابحث عن التطبيق المتجمد في القائمة، اضغط عليه بزر الفأرة الأيمن، واختر «End task» لإغلاقه إجباريًا.", "عند إعادة فتح تطبيقات Microsoft Office، عادةً ما تستعيد عملك غير المحفوظ تلقائيًا."] },
                { title: "برنامج افتراضي خاطئ", cause: "النقر المزدوج على ملف يفتحه ببرنامج خاطئ، مثل متصفح الويب بدلًا من Adobe Acrobat.", steps: ["اضغط بزر الفأرة الأيمن على الملف واختر Properties.", "ابحث عن قسم «Opens with:» واضغط على زر Change.", "اختر التطبيق المفضل لديك من القائمة (مثل Adobe Acrobat)، اضغط OK، ثم اضغط Apply."] },
                { title: "المتصفح بطيء للغاية", cause: "يستغرق متصفح الويب وقتًا طويلًا جدًا لتحميل الصفحات، والتنقل بين علامات التبويب بطيء جدًا.", steps: ["أغلق علامات التبويب غير الضرورية (كل علامة تبويب تستهلك ذاكرة RAM).", "إذا استمر البطء، اضغط Ctrl + Shift + Delete لمسح ذاكرة التخزين المؤقت.", "حدد خانة «Cached images and files» واضغط «Clear data».", "أعد تشغيل المتصفح."] },
                { title: "تجمد Microsoft Teams أو مشاكل في الصوت والصورة", cause: "يصبح Teams غير مستجيب أو يواجه أعطالًا في الصوت والصورة أثناء الاجتماعات بسبب تراكم ذاكرة التخزين المؤقت أو أذونات الخصوصية المقيدة.", steps: ["أغلق Microsoft Teams تمامًا بالضغط بزر الفأرة الأيمن على أيقونة Teams في شريط النظام واختيار Quit.", "اضغط Win + R، اكتب %appdata%\\Microsoft\\Teams، واحذف الملفات المؤقتة بداخله لمسح ذاكرة التخزين المؤقت.", "اذهب إلى Windows Settings ← Privacy وتأكد من تفعيل إذن الوصول للميكروفون والكاميرا لتطبيق Microsoft Teams."] },
                { title: "خطأ «Unlicensed Product» في Microsoft 365", cause: "يظهر شريط في أعلى تطبيقات Office يفيد بـ «Unlicensed Product»، مما يقيّد تحرير المستندات بسبب انتهاء الجلسة أو فشل مزامنة التفعيل.", steps: ["افتح أي تطبيق من تطبيقات Office (مثل Word أو Excel) واذهب إلى File ← Account.", "اضغط «Sign Out» لتسجيل الخروج الكامل من جلستك الحالية.", "اضغط «Sign In» وأعد إدخال بريدك الإلكتروني الكامل الخاص بالشركة وكلمة المرور لتحديث تفعيل الترخيص."] }
            ]
        },
        other: {
            title: "أخرى / مشكلة مخصصة",
            description: "صف مشكلتك بكلماتك الخاصة.",
            issues: []
        }
    }
},

/* ================================================================= ES */
es: {
    ui: {
        statusActive: "Sistema de IA activo las 24 horas",
        productTag: "Portal de autoservicio de TI",
        heroEyebrow: "Autoservicio de TI",
        greetingMorning: (name) => `Buenos días, ${name}`,
        greetingAfternoon: (name) => `Buenas tardes, ${name}`,
        greetingEvening: (name) => `Buenas noches, ${name}`,
        heroTitleHtml: '¿Cómo podemos <span class="accent">ayudarte</span> hoy?',
        heroSubtitle: "Selecciona la categoría que mejor describa tu problema técnico. Nuestro asistente ofrece soluciones verificadas paso a paso en segundos.",
        footerNote: "¿Necesitas ayuda urgente? Contacta directamente con la Mesa de Ayuda de TI en la extensión 2000.",
        breadcrumbHome: "Inicio",
        backToCategories: "Todas las categorías",
        issuesCount: (n) => n === 1 ? "1 problema común" : `${n} problemas comunes`,
        customRequest: "Solicitud personalizada",
        tapToView: "Toca para ver los pasos de solución",
        causeLabel: "Causa:",
        didThisSolve: "¿Esto resolvió tu problema?",
        yes: "Sí",
        no: "No",
        pressHere: "Pulsa aquí",
        pressHereHint: "¿Aún atascado? Describe tu problema directamente.",
        stillStuckPressHere: "¿Aún atascado? Pulsa aquí",
        otherWithIssuesTitle: '¿Aún necesitas ayuda? <span class="optional">Prueba “Otro”</span>',
        otherWithIssuesDesc: "¿No encontraste un problema similar arriba? Cuéntanos qué está pasando con tus propias palabras y nuestro equipo de TI se pondrá en contacto contigo.",
        otherWithIssuesLabel: "Otro — describe tu problema",
        otherEmptyTitle: "Cuéntanos qué está pasando",
        otherEmptyDesc: "Describe tu problema con el mayor detalle posible: pantalla, aplicación, mensaje de error, cuándo comenzó — y nuestro equipo de TI se pondrá en contacto contigo directamente.",
        otherEmptyLabel: "Describe tu problema",
        placeholder: "Ejemplo: la pantalla de mi portátil parpadea de forma aleatoria al conectarla al monitor de la estación de acoplamiento…",
        errorEmpty: "Describe tu problema para que nuestro equipo pueda ayudarte.",
        errorShort: (min) => `Añade un poco más de detalle (al menos ${min} caracteres).`,
        nameLabel: "Nombre completo",
        namePlaceholder: "p. ej. Ahmed Hassan",
        nameError: "Por favor, introduce tu nombre completo.",
        emailLabel: "Correo del trabajo",
        emailPlaceholder: "p. ej. ahmed.hassan@elsewedyelectric.com",
        emailError: "Por favor, introduce un correo electrónico válido.",
        submitError: "Algo salió mal al enviar tu solicitud. Inténtalo de nuevo.",
        submit: "Enviar solicitud",
        submitting: "Enviando…",
        successTitle: "Solicitud enviada",
        successDesc: "Gracias — un miembro del equipo de TI se pondrá en contacto contigo en breve.",
        titleSuffix: " — SWE IT Assist",
        langLabel: "Idioma",
        getStarted: "Comenzar",
        openApp: "Abrir aplicación",
        itSupportTitle: "Soporte de TI",
        itSupportDesc: "Explora todas las categorías: red, cuentas, correo, impresión, software y más.",
        supportPageSubtitle: "Selecciona la categoría que mejor describa tu problema técnico.",
        announcementBar: "SWE IT Assist — tu portal de autoservicio de TI 24/7 para soporte de red, cuentas, correo, impresión y software en Elsewedy Electric.",
        appsSupportTitle: "Soporte de aplicaciones",
        appsSupportDesc: "Obtén ayuda con las aplicaciones empresariales: solicitudes de acceso, instalación y resolución de problemas.",
        oracleErpTitle: "Oracle ERP",
        oracleErpDesc: "Solicitudes de acceso, problemas de inicio de sesión y resolución de problemas de Oracle ERP.",
        salesforceCrmTitle: "Salesforce — CRM",
        salesforceCrmDesc: "Solicitudes de acceso, problemas de inicio de sesión y resolución de problemas de Salesforce CRM.",
        businessCardTitle: "Tarjeta de Presentación",
        businessCardDesc: "Inicia sesión para generar y gestionar tu tarjeta de presentación.",
        travelPortalTitle: "Portal de Viajes",
        travelPortalDesc: "Reserva vuelos, hoteles y otros arreglos de viajes de negocio.",
        bookingTitle: "Reservas",
        bookingDesc: "Reserva salas de reuniones, equipos y recursos de TI.",
        comingSoonTitle: "Próximamente",
        comingSoonDesc: "Estamos preparando esta sección — vuelve pronto, o contacta con la mesa de servicio de TI en la extensión 2000 si necesitas ayuda ahora mismo.",
        searchPlaceholder: "Buscar ayuda…",
        searchNoResults: "No hay resultados que coincidan con tu búsqueda.",
        logout: "Cerrar sesión"
    },
    chat: {
        product: "Asistente TI",
        newChat: "Nuevo chat",
        pinnedLabel: "Fijados",
        recentLabel: "Recientes",
        historyItems: ["Configuración de VPN en portátil", "Outlook no sincroniza", "El Wi-Fi se desconecta", "Restablecer contraseña de dominio", "Impresora sin conexión (3.er piso)"],
        systemActive: "Sistema de IA activo 24/7",
        onlineNow: "En línea",
        active: "Activo",
        greeting: "¡Hola! ¿En qué puedo ayudarte?",
        placeholder: "Escribe un mensaje a SWE IT Assist...",
        hint: "SWE IT Assist puede cometer errores. Verifica los pasos críticos con la mesa de ayuda de TI.",
        backAria: "Volver al portal de autoservicio",
        errorFallback: "Algo salió mal. Asegúrate de que el backend del chatbot esté en ejecución e inténtalo de nuevo."
    },
    auth: {
        eyebrow: "Acceso de empleados",
        title: "Bienvenido de nuevo",
        subtitle: "Inicia sesión con tu ID de empleado y tu correo del trabajo para continuar.",
        employeeIdLabel: "ID de empleado",
        employeeIdPlaceholder: "p. ej. 10234",
        emailLabel: "Correo del trabajo",
        emailPlaceholder: "p. ej. name@elsewedy.com",
        signIn: "Iniciar sesión",
        signingIn: "Iniciando sesión…",
        errorEmpty: "Introduce tu ID de empleado y tu correo del trabajo.",
        errorFormat: "Usa tu correo del trabajo, p. ej. name@elsewedy.com.",
        errorInvalid: "No pudimos hacer coincidir ese ID de empleado con ese correo electrónico.",
        errorGeneric: "Algo salió mal al iniciar sesión. Inténtalo de nuevo.",
        footerNote: "¿Problemas para iniciar sesión? Contacta con la Mesa de Ayuda de TI en la extensión 2000."
    },
    categories: {
        network: {
            title: "Red / Wi-Fi",
            description: "No se puede conectar, señal débil, sin acceso a internet, etc.",
            issues: [
                { title: "No se puede conectar al Wi-Fi / El SSID no aparece", cause: "El modo avión está activado, el interruptor físico de Wi-Fi está apagado, o el adaptador de Wi-Fi tuvo un fallo temporal o entró en modo de ahorro de energía.", steps: ["Haz clic en el icono de red en la barra de tareas y asegúrate de que el modo avión esté desactivado.", "Revisa si el teclado tiene un botón físico de Wi-Fi o modo avión (normalmente F12, F2, o un interruptor lateral). Púlsalo para reactivar el adaptador de red.", "Abre el Administrador de dispositivos → Adaptadores de red → clic derecho en el adaptador Wi-Fi, selecciona Deshabilitar dispositivo, espera unos segundos y luego selecciona Habilitar dispositivo."] },
                { title: "Conectado al Wi-Fi, pero sin internet", cause: "El portátil está conectado a la red Wi-Fi, pero aparece un signo de exclamación amarillo y ninguna página web carga.", steps: ["Haz clic derecho en el nombre de la red y selecciona Olvidar.", "Vuelve a conectarte a la red e introduce la contraseña de nuevo (esto obliga al dispositivo a obtener una nueva IP).", "Si trabajas de forma remota, reinicia rápidamente tu router doméstico."] },
                { title: "Un sitio específico no funciona", cause: "Internet funciona bien, pero un portal interno específico de la empresa se ve con fallos, rechaza el inicio de sesión o se queda cargando.", steps: ["Abre el sitio en una ventana de incógnito / privada (pulsa Ctrl + Shift + N).", "Si el sitio funciona perfectamente en modo incógnito, el problema son los datos guardados del navegador. Ve a la configuración del navegador y selecciona Borrar caché y cookies."] },
                { title: "No se puede acceder a la red de la empresa", cause: "Te conectas a una red Wi-Fi pública, pero la página de inicio de sesión para aceptar los términos no se abre.", steps: ["Abre un navegador y escribe una URL no segura (HTTP), como «http://neverssl.com» o «http://1.1.1.1».", "Esto obliga al navegador a saltarse los bloqueos de seguridad y hace que aparezca de inmediato la página de inicio de sesión de la red."] },
                { title: "Conflicto de red con la estación de acoplamiento", cause: "Ethernet conectado a través del dock pero sin internet: un conflicto de red entre el adaptador Wi-Fi activo y el adaptador Ethernet de la estación de acoplamiento.", steps: ["Pulsa Win + R, escribe «ncpa.cpl» y presiona Enter.", "Haz clic derecho en el adaptador Wi-Fi y selecciona Deshabilitar.", "Haz clic derecho en el adaptador Ethernet, selecciona Deshabilitar, espera 3 segundos y luego selecciona Habilitar."] },
                { title: "Desconexiones frecuentes de Wi-Fi", cause: "La gestión de energía de Windows apaga automáticamente el adaptador Wi-Fi para ahorrar batería.", steps: ["Ve a Administrador de dispositivos → Adaptadores de red → clic derecho en el adaptador Wi-Fi → Propiedades.", "Abre la pestaña Administración de energía.", "Desmarca «Permitir que el equipo apague este dispositivo para ahorrar energía»."] },
                { title: "Dirección IP APIPA (169.254.x.x / sin internet)", cause: "El servidor DHCP no logró asignar una dirección IP válida al dispositivo.", steps: ["Abre CMD como Administrador.", "Escribe «ipconfig /release» y pulsa Enter.", "Escribe «ipconfig /renew» y pulsa Enter para forzar la renovación de la IP."] },
                { title: "Problemas de red no identificados", cause: "La conexión se cae constantemente, la PC muestra «Red no identificada», o no está clara la causa exacta de la caída de internet.", steps: ["Haz clic derecho en el icono de Wi-Fi o red en la barra de tareas y selecciona Solucionar problemas.", "Sigue las instrucciones en pantalla: Windows restablecerá automáticamente el adaptador de red, vaciará la DNS y corregirá errores básicos de configuración por sí mismo."] }
            ]
        },
        accounts: {
            title: "Cuentas y contraseñas",
            description: "Cuenta bloqueada, contraseña vencida u olvidada, etc.",
            issues: [
                { title: "Contraseña olvidada y bloqueo de cuenta", cause: "El usuario queda bloqueado de su perfil de Windows, correo o portal de la empresa tras varios intentos incorrectos, o simplemente olvidó su contraseña.", steps: ["Espera de 15 a 30 minutos. Muchos sistemas tienen una política de «bloqueo temporal» que desbloquea la cuenta automáticamente tras un corto periodo.", "Busca un enlace «Olvidé mi contraseña» o «Restablecer contraseña» en la pantalla de inicio de sesión para usar la herramienta de restablecimiento de contraseña autoservicio (SSPR) de la empresa mediante un correo alternativo o SMS."] },
                { title: "Dirección de correo olvidada (nombre de usuario)", cause: "El usuario no recuerda el formato exacto de su correo corporativo (por ejemplo, firstname.lastname@elsewedy.com frente a f.lastname@elsewedy.com), o es un nuevo empleado que aún no lo ha memorizado.", steps: ["Pide a un compañero o a tu gerente que busque tu nombre en el Directorio de Outlook (Lista Global de Direcciones) o en Microsoft Teams para confirmar la ortografía exacta.", "Revisa tu teléfono móvil para ver si tu correo de trabajo ya está iniciado en una app como Outlook o Apple Mail.", "Consulta tus documentos físicos de incorporación o el correo de bienvenida inicial enviado a tu correo personal durante la contratación."] },
                { title: "Solicitudes de inicio de sesión persistentes (credenciales antiguas en caché)", cause: "El usuario actualizó recientemente su contraseña, pero Windows o una app específica sigue intentando iniciar sesión con la contraseña antigua guardada, causando bloqueos en segundo plano.", steps: ["Haz clic en el menú Inicio y busca Administrador de credenciales.", "Ve a Credenciales de Windows.", "Busca entradas relacionadas con Office, Teams o el portal que falla. Haz clic en la flecha desplegable y selecciona Quitar.", "Reinicia el equipo e inicia sesión con la nueva contraseña."] },
                { title: "Error de contraseña incorrecta (configuración de teclado)", cause: "La contraseña es correcta, pero se está escribiendo mal debido a que Bloq Mayús está activado o el idioma del teclado ha cambiado.", steps: ["Haz clic en el icono de «ojo» junto al campo de contraseña (si está disponible) para ver exactamente lo que se está escribiendo.", "Revisa el teclado para ver si el indicador de Bloq Mayús está encendido.", "Mira la esquina inferior derecha de la barra de tareas para asegurarte de que el idioma esté configurado en ENG (inglés). Prueba a pulsar Alt + Shift o Win + Espacio para alternar."] },
                { title: "Discrepancia de dominio al iniciar sesión", cause: "El intento de inicio de sesión falla porque el usuario ingresa su nombre de usuario sin el prefijo de dominio requerido, o usa un formato de correo incompleto.", steps: ["Asegúrate de escribir tu dirección de correo corporativa completa (por ejemplo, user@elsewedy.com) en lugar de solo tu nombre o un usuario corto.", "Si el sistema requiere formato de dominio, escribe tus credenciales como Dominio\\Usuario (por ejemplo, ELSEWEDY\\usuario).", "Revisa que no haya errores de escritura ni espacios no deseados al principio o al final de tu nombre de usuario."] },
                { title: "Cuenta bloqueada (fallos repetidos de contraseña)", cause: "El sistema ha deshabilitado temporalmente el acceso a la cuenta tras detectar varios intentos consecutivos de contraseña incorrecta, por razones de seguridad.", steps: ["Espera 15 minutos para que la política automática de bloqueo del sistema se restablezca y libere el bloqueo.", "Visita el portal de autoservicio en passwordreset.microsoftonline.com desde un navegador o dispositivo móvil para desbloquear tu cuenta manualmente o actualizar tus credenciales."] }
            ]
        },
        email: {
            title: "Correo y Outlook",
            description: "Buzón lleno, límite de tamaño, respuesta automática, etc.",
            issues: [
                { title: "Buzón lleno y cuota superada", cause: "Dejas de recibir correos y aparece una advertencia de «Buzón lleno».", steps: ["Haz clic derecho y vacía tanto la carpeta de Elementos eliminados como la de Correo no deseado.", "Abre tu carpeta de Elementos enviados, ordena los correos por Tamaño (usando el filtro superior) y elimina mensajes antiguos con archivos adjuntos grandes."] },
                { title: "La búsqueda de Outlook no funciona", cause: "Al buscar un correo específico aparece «No se encontraron resultados».", steps: ["Reinicia tu PC para forzar la actualización del índice de búsqueda de Windows.", "Como solución inmediata, inicia sesión en Outlook en la Web desde tu navegador: su búsqueda en la nube funciona de inmediato incluso si la app de escritorio está congelada."] },
                { title: "Correos enviados por accidente", cause: "Enviaste un correo por error, y el botón estándar de «Recuperar» rara vez funciona.", steps: ["Ve a Archivo → Administrar reglas y alertas → Nueva regla.", "Selecciona «Aplicar regla a los mensajes que envío», haz clic en Siguiente dos veces, luego en Sí.", "Marca la casilla «aplazar la entrega por un número de minutos», haz clic en el texto subrayado para configurarlo en 1, y haz clic en Finalizar. Esto establece un retraso de seguridad permanente de 1 minuto."] },
                { title: "No se puede enviar el correo por el límite de tamaño de adjuntos", cause: "El correo no se envía porque los archivos adjuntos superan el tamaño máximo permitido por la empresa (normalmente 25 MB).", steps: ["Elimina los archivos adjuntos pesados del borrador del correo.", "Sube los archivos grandes a tu espacio de almacenamiento corporativo de OneDrive o SharePoint.", "Copia el enlace para compartir de OneDrive en el cuerpo del correo y envíalo de nuevo."] },
                { title: "La respuesta automática / mensaje de ausencia no funciona", cause: "El usuario configuró una respuesta automática de ausencia, pero los remitentes no están recibiendo la respuesta automatizada.", steps: ["Abre la configuración de Respuesta automática y asegúrate de que «Enviar respuestas automáticas» esté activado con las fechas de inicio y fin correctas.", "Asegúrate de marcar «Enviar respuestas fuera de mi organización» si los clientes externos también deben recibir la respuesta automática.", "Pruébalo enviando un correo a tu dirección de trabajo desde una cuenta personal o pidiendo a un compañero que te escriba."] },
                { title: "Recuperación de correo eliminado accidentalmente", cause: "El usuario eliminó accidentalmente un correo importante y necesita restaurarlo antes de que se elimine permanentemente.", steps: ["Abre la carpeta Elementos eliminados desde la barra lateral izquierda.", "Si el correo está ahí, haz clic derecho y selecciona Mover → Bandeja de entrada.", "Si no aparece, haz clic en «Recuperar elementos eliminados de esta carpeta» en la parte superior de la lista de carpetas, selecciona el correo requerido y haz clic en Restaurar."] }
            ]
        },
        printing: {
            title: "Problemas de impresión",
            description: "Cola de impresión, impresora no encontrada, etc.",
            issues: [
                { title: "Impresora no encontrada / falta el controlador", cause: "El usuario quiere imprimir, pero la impresora asignada al piso o departamento no aparece en su lista de impresoras disponibles.", steps: ["Abre Configuración → Dispositivos → Impresoras y escáneres.", "Haz clic en «Agregar una impresora o escáner» y espera unos segundos para la búsqueda automática.", "Si no aparece, haz clic en «La impresora que quiero no está en la lista» y elige buscar por la dirección IP o el nombre de red de la impresora."] },
                { title: "Impresión lenta / gráficos de alta resolución", cause: "El trabajo de impresión tarda muchísimo en procesarse porque el archivo es muy grande (por ejemplo, un PDF con muchas imágenes) o la configuración de impresión está en calidad máxima.", steps: ["Abre Propiedades de la impresora antes de enviar la orden de impresión.", "Cambia la configuración de calidad de impresión de Alta calidad a Estándar o Borrador.", "Selecciona impresión en Escala de grises / Blanco y negro para acelerar el procesamiento de páginas."] },
                { title: "La impresión a doble cara no funciona", cause: "La impresora saca cada página en una hoja separada aunque el usuario quería imprimir por ambas caras, generalmente porque la función dúplex está desactivada.", steps: ["Pulsa Ctrl + P y abre Propiedades de la impresora.", "Ve a la pestaña Configuración del dispositivo o Diseño.", "Asegúrate de que el módulo de Unidad Dúplex esté habilitado y configura el modo de impresión en «Imprimir en ambas caras»."] },
                { title: "Documentos atascados en la cola de impresión", cause: "Envías un documento a imprimir, pero no pasa nada, y los nuevos trabajos de impresión simplemente se acumulan sin imprimirse.", steps: ["Busca «Impresoras y escáneres» en el menú Inicio de Windows.", "Haz clic en tu impresora y selecciona «Abrir cola».", "Haz clic en la pestaña Impresora en la parte superior (o en los tres puntos) y selecciona «Cancelar todos los documentos».", "Reinicia físicamente la impresora desde el botón de encendido, espera un minuto e intenta imprimir de nuevo."] },
                { title: "Se imprime en PDF en lugar de en papel", cause: "Haces clic en imprimir, pero en lugar de que la impresora emita un sonido, aparece una ventana de «Guardar como» pidiéndote guardar un archivo: se ha seleccionado el dispositivo de salida incorrecto.", steps: ["En la pantalla de impresión (tras pulsar Ctrl + P), mira el menú desplegable de Impresora en la parte superior.", "Cámbialo de «Microsoft Print to PDF» al nombre real de la impresora física de tu oficina (por ejemplo, HP, Canon, Xerox).", "Haz clic en imprimir."] }
            ]
        },
        software: {
            title: "Software y aplicaciones",
            description: "La app no responde, se congela o va lenta, cambiar app predeterminada, etc.",
            issues: [
                { title: "La aplicación no responde", cause: "Un programa como Excel o Word se congela por completo, se pone en gris y muestra un mensaje de error «No responde» en la parte superior.", steps: ["Pulsa Ctrl + Shift + Esc para abrir el Administrador de tareas.", "Busca la aplicación congelada en la lista, haz clic derecho y selecciona «Finalizar tarea» para forzar su cierre.", "Al volver a abrir las apps de Microsoft Office, normalmente recuperarán tu trabajo no guardado automáticamente."] },
                { title: "Aplicación predeterminada incorrecta", cause: "Al hacer doble clic en un archivo, se abre con el programa equivocado, como el navegador web en lugar de Adobe Acrobat.", steps: ["Haz clic derecho en el archivo y selecciona Propiedades.", "Busca la sección «Abrir con:» y haz clic en el botón Cambiar.", "Selecciona tu aplicación preferida de la lista (por ejemplo, Adobe Acrobat), haz clic en Aceptar y luego en Aplicar."] },
                { title: "El navegador va extremadamente lento", cause: "Tu navegador web tarda una eternidad en cargar páginas, y cambiar entre pestañas se retrasa mucho.", steps: ["Cierra las pestañas abiertas innecesarias (cada pestaña consume RAM).", "Si sigue lento, pulsa Ctrl + Shift + Supr para borrar la caché.", "Marca la casilla «Imágenes y archivos almacenados en caché» y haz clic en «Borrar datos».", "Reinicia el navegador."] },
                { title: "Microsoft Teams se congela o falla el audio/video", cause: "Teams deja de responder o presenta fallos de audio y video durante las reuniones debido a caché acumulada o permisos de privacidad restringidos.", steps: ["Cierra Microsoft Teams por completo haciendo clic derecho en el icono de Teams en la bandeja del sistema y seleccionando Salir.", "Pulsa Win + R, escribe %appdata%\\Microsoft\\Teams, y elimina los archivos temporales dentro para borrar la caché.", "Ve a Configuración de Windows → Privacidad y asegúrate de que el acceso al Micrófono y la Cámara esté ACTIVADO para Microsoft Teams."] },
                { title: "Error «Producto sin licencia» en Microsoft 365", cause: "Aparece un aviso en la parte superior de las apps de Office que indica «Producto sin licencia», lo que restringe la edición de documentos debido a una sesión caducada o un fallo de sincronización de activación.", steps: ["Abre cualquier aplicación de Office (por ejemplo, Word o Excel) y ve a Archivo → Cuenta.", "Haz clic en «Cerrar sesión» para salir por completo de tu sesión actual.", "Haz clic en «Iniciar sesión» y vuelve a introducir tu dirección de correo corporativa completa y tu contraseña para actualizar la activación de la licencia."] }
            ]
        },
        other: {
            title: "Otro / Problema personalizado",
            description: "Describe tu problema con tus propias palabras.",
            issues: []
        }
    }
},

/* ================================================================= ZH */
zh: {
    ui: {
        statusActive: "24/7 AI 系统在线",
        productTag: "IT 自助服务门户",
        heroEyebrow: "IT 自助服务",
        greetingMorning: (name) => `早上好，${name}`,
        greetingAfternoon: (name) => `下午好，${name}`,
        greetingEvening: (name) => `晚上好，${name}`,
        heroTitleHtml: '今天我们能为您<span class="accent">做些什么</span>？',
        heroSubtitle: "请选择最符合您技术问题的类别，我们的智能助手将在几秒钟内提供经过验证的分步解决方案。",
        footerNote: "需要紧急帮助？请直接拨打 IT 服务台分机 2000。",
        breadcrumbHome: "首页",
        backToCategories: "所有类别",
        issuesCount: (n) => `${n} 个常见问题`,
        customRequest: "自定义请求",
        tapToView: "点击查看解决步骤",
        causeLabel: "原因：",
        didThisSolve: "这解决了您的问题吗？",
        yes: "是",
        no: "否",
        pressHere: "点击这里",
        pressHereHint: "仍未解决？直接描述您的问题。",
        stillStuckPressHere: "仍未解决？点击这里",
        otherWithIssuesTitle: '仍需要帮助？<span class="optional">试试"其他"</span>',
        otherWithIssuesDesc: "上面没有找到匹配的问题？请用您自己的话告诉我们发生了什么，我们的 IT 团队会直接与您联系。",
        otherWithIssuesLabel: "其他 — 描述您的问题",
        otherEmptyTitle: "告诉我们发生了什么",
        otherEmptyDesc: "请尽可能详细地描述您的问题——屏幕、应用程序、错误信息、开始时间——我们的 IT 团队会直接与您联系。",
        otherEmptyLabel: "描述您的问题",
        placeholder: "示例：笔记本电脑连接到扩展坞显示器时，屏幕会随机闪烁……",
        errorEmpty: "请描述您的问题，以便我们的团队提供帮助。",
        errorShort: (min) => `请添加更多详细信息（至少 ${min} 个字符）。`,
        nameLabel: "全名",
        namePlaceholder: "例如：Ahmed Hassan",
        nameError: "请输入您的全名。",
        emailLabel: "工作邮箱",
        emailPlaceholder: "例如：ahmed.hassan@elsewedyelectric.com",
        emailError: "请输入有效的电子邮箱地址。",
        submitError: "发送请求时出现问题，请重试。",
        submit: "提交请求",
        submitting: "提交中…",
        successTitle: "请求已提交",
        successDesc: "感谢您 — IT 团队成员将很快与您联系。",
        titleSuffix: " — SWE IT Assist",
        langLabel: "语言",
        getStarted: "开始",
        openApp: "打开应用",
        itSupportTitle: "IT 支持",
        itSupportDesc: "浏览所有类别——网络、账户、邮件、打印、软件等。",
        supportPageSubtitle: "选择最能描述你技术问题的类别。",
        announcementBar: "SWE IT Assist — Elsewedy Electric 全天候自助 IT 门户，覆盖网络、账户、邮件、打印与软件支持。",
        appsSupportTitle: "应用支持",
        appsSupportDesc: "获取业务应用相关帮助——访问申请、安装与故障排除。",
        oracleErpTitle: "Oracle ERP",
        oracleErpDesc: "Oracle ERP 的访问申请、登录问题与故障排除。",
        salesforceCrmTitle: "Salesforce — CRM",
        salesforceCrmDesc: "Salesforce CRM 的访问申请、登录问题与故障排除。",
        businessCardTitle: "名片",
        businessCardDesc: "登录以生成和管理您的员工名片。",
        travelPortalTitle: "差旅门户",
        travelPortalDesc: "预订机票、酒店及其他商务差旅安排。",
        bookingTitle: "预订",
        bookingDesc: "预订会议室、设备与 IT 资源。",
        comingSoonTitle: "即将上线",
        comingSoonDesc: "我们正在筹备这个板块——请稍后再来看看，如果现在需要帮助，请拨打 IT 服务台分机 2000。",
        searchPlaceholder: "搜索帮助…",
        searchNoResults: "没有符合您搜索条件的结果。",
        logout: "退出登录"
    },
    chat: {
        product: "IT 助手",
        newChat: "新建对话",
        pinnedLabel: "已固定",
        recentLabel: "最近",
        historyItems: ["笔记本电脑 VPN 设置", "Outlook 无法同步", "Wi-Fi 一直掉线", "重置域账户密码", "3楼打印机离线"],
        systemActive: "24/7 AI 系统在线",
        onlineNow: "在线",
        active: "活跃",
        greeting: "你好！有什么可以帮您？",
        placeholder: "给 SWE IT Assist 发消息...",
        hint: "SWE IT Assist 可能会出错。重要步骤请与 IT 服务台核实。",
        backAria: "返回自助服务门户",
        errorFallback: "出了点问题。请确认聊天机器人后端正在运行，然后重试。"
    },
    auth: {
        eyebrow: "员工登录",
        title: "欢迎回来",
        subtitle: "请输入您的员工编号和工作邮箱以继续。",
        employeeIdLabel: "员工编号",
        employeeIdPlaceholder: "例如：10234",
        emailLabel: "工作邮箱",
        emailPlaceholder: "例如：name@elsewedy.com",
        signIn: "登录",
        signingIn: "登录中…",
        errorEmpty: "请输入您的员工编号和工作邮箱。",
        errorFormat: "请使用您的工作邮箱，例如：name@elsewedy.com。",
        errorInvalid: "该员工编号与该邮箱地址不匹配。",
        errorGeneric: "登录时出现问题，请重试。",
        footerNote: "登录遇到问题？请拨打 IT 服务台分机 2000。"
    },
    categories: {
        network: {
            title: "网络 / Wi-Fi",
            description: "无法连接、信号弱、无法上网等。",
            issues: [
                { title: "无法连接 Wi-Fi / 找不到 SSID", cause: "飞行模式已开启、物理 Wi-Fi 开关已关闭，或 Wi-Fi 适配器出现临时故障或进入省电模式。", steps: ["点击任务栏中的网络图标，确认飞行模式已关闭。", "检查笔记本电脑键盘上是否有物理 Wi-Fi 或飞行模式按键（通常是 F12、F2 或机身侧面的开关），按下以重新启用网络适配器。", "打开设备管理器 → 网络适配器 → 右键点击 Wi-Fi 适配器，选择“禁用设备”，等待几秒后再选择“启用设备”。"] },
                { title: "已连接 Wi-Fi 但无法上网", cause: "笔记本电脑已连接到 Wi-Fi 网络，但出现黄色感叹号，任何网站都无法加载。", steps: ["右键点击网络名称，选择“忘记”。", "重新连接网络并重新输入密码（这会强制设备获取新的 IP 地址）。", "如果是远程办公，请快速重启您的家庭路由器。"] },
                { title: "特定网站无法访问", cause: "互联网连接正常，但某个公司内部门户网站显示异常、拒绝登录或一直卡在加载中。", steps: ["在无痕/隐私浏览窗口中打开该网站（按 Ctrl + Shift + N）。", "如果该网站在无痕模式下运行正常，说明问题出在浏览器保存的数据上。打开浏览器设置并选择清除缓存和 Cookie。"] },
                { title: "无法登录公司网络", cause: "您连接到公共 Wi-Fi 网络，但用于接受条款的登录页面没有打开。", steps: ["打开浏览器并输入一个非安全（HTTP）网址，例如 “http://neverssl.com” 或 “http://1.1.1.1”。", "这会强制浏览器绕过安全拦截，并立即触发网络登录页面的出现。"] },
                { title: "与扩展坞的网络冲突", cause: "通过扩展坞连接了以太网但无法上网——活动的 Wi-Fi 适配器与扩展坞中的以太网适配器之间发生了网络冲突。", steps: ["按 Win + R，输入 “ncpa.cpl”，然后按 Enter。", "右键点击 Wi-Fi 适配器并选择“禁用”。", "右键点击以太网适配器，选择“禁用”，等待 3 秒后再选择“启用”。"] },
                { title: "Wi-Fi 频繁断开连接", cause: "Windows 电源管理会自动关闭 Wi-Fi 适配器以节省电量。", steps: ["进入设备管理器 → 网络适配器 → 右键点击 Wi-Fi 适配器 → 属性。", "打开“电源管理”选项卡。", "取消勾选“允许计算机关闭此设备以节约电源”。"] },
                { title: "APIPA IP 地址（169.254.x.x / 无法上网）", cause: "DHCP 服务器未能为设备分配有效的 IP 地址。", steps: ["以管理员身份打开 CMD。", "输入 “ipconfig /release” 并按 Enter。", "输入 “ipconfig /renew” 并按 Enter 以强制更新 IP 地址。"] },
                { title: "无法识别的网络问题", cause: "连接持续断开、电脑显示“未识别的网络”，或网络中断的确切原因不明。", steps: ["右键点击任务栏中的 Wi-Fi 或网络图标，选择“疑难解答”。", "按照屏幕提示操作——Windows 会自动重置网络适配器、清除 DNS 并自行修复基本配置错误。"] }
            ]
        },
        accounts: {
            title: "账户与密码",
            description: "账户被锁定、密码过期或遗忘等。",
            issues: [
                { title: "忘记密码与账户锁定", cause: "用户因多次输错密码而被锁定在 Windows 账户、邮箱或公司门户之外，或只是单纯忘记了密码。", steps: ["等待 15 至 30 分钟。许多系统设有“软锁定”策略，会在短时间后自动解锁账户。", "在登录页面查找“忘记密码”或“重置密码”链接，通过备用邮箱或短信使用公司的自助密码重置（SSPR）工具。"] },
                { title: "忘记邮箱地址（用户名）", cause: "用户不记得公司邮箱地址的确切格式（例如 firstname.lastname@elsewedy.com 还是 f.lastname@elsewedy.com），或是尚未记住邮箱地址的新员工。", steps: ["请同事或主管在 Outlook 通讯录（全局地址列表）或 Microsoft Teams 中搜索您的姓名，以确认准确拼写。", "查看您的手机，确认工作邮箱是否已登录在 Outlook 或 Apple Mail 等应用中。", "查看您的入职文件，或入职时发送到个人邮箱的欢迎邮件。"] },
                { title: "持续弹出登录提示（缓存的旧凭据）", cause: "用户最近更新了密码，但 Windows 或某个应用仍在尝试使用保存的旧密码登录，导致后台不断锁定。", steps: ["点击“开始”菜单并搜索“凭据管理器”（Credential Manager）。", "进入“Windows 凭据”。", "查找与 Office、Teams 或出问题的门户相关的条目，点击下拉箭头并选择“删除”。", "重启电脑并使用新密码登录。"] },
                { title: "密码错误提示（键盘设置问题）", cause: "密码本身是正确的，但由于大写锁定（Caps Lock）开启或键盘语言被切换，导致输入错误。", steps: ["点击密码框旁边的“眼睛”图标（如果有）查看实际输入的内容。", "检查键盘上的大写锁定指示灯是否亮起。", "查看任务栏右下角，确认语言已设置为 ENG（英语）。可尝试按 Alt + Shift 或 Win + Space 来回切换。"] },
                { title: "登录时域名不匹配", cause: "登录失败是因为用户输入用户名时未加所需的域前缀，或邮箱格式不完整。", steps: ["确保输入的是完整的公司邮箱地址（例如 user@elsewedy.com），而不仅仅是名字或简短用户名。", "如果系统要求域名格式，请使用“域\\用户名”的格式输入（例如 ELSEWEDY\\username）。", "检查用户名开头或结尾是否有拼写错误或多余的空格。"] },
                { title: "账户被锁定（连续密码错误）", cause: "出于安全原因，系统在检测到连续多次密码输入错误后暂时禁用了该账户的访问权限。", steps: ["等待 15 分钟，让系统的自动锁定策略重置并自动解锁。", "通过浏览器或移动设备访问自助服务门户 passwordreset.microsoftonline.com，手动解锁您的账户或更新凭据。"] }
            ]
        },
        email: {
            title: "邮件与 Outlook",
            description: "邮箱已满、容量限制、自动回复等。",
            issues: [
                { title: "邮箱已满，超出配额", cause: "您停止接收邮件，并收到“邮箱已满”的警告提示。", steps: ["右键点击并清空“已删除邮件”和“垃圾邮件”文件夹。", "打开“已发送邮件”文件夹，按大小排序邮件（使用顶部筛选器），删除带有大附件的旧邮件。"] },
                { title: "Outlook 搜索无法使用", cause: "搜索特定邮件时显示“未找到结果”。", steps: ["重启电脑以强制刷新 Windows 搜索索引。", "作为快速解决办法，通过浏览器登录网页版 Outlook——即使桌面应用卡死，其云端搜索也能立即使用。"] },
                { title: "误发邮件", cause: "您不小心发送了一封邮件，而标准的“撤回”按钮很少能生效。", steps: ["进入“文件” → “管理规则和通知” → “新建规则”。", "选择“对我发送的邮件应用规则”，点击两次“下一步”，然后点击“是”。", "勾选“将传递延迟若干分钟”，点击带下划线的文字将其设置为 1，然后点击“完成”。这样就设置了永久的 1 分钟安全延迟。"] },
                { title: "因附件大小超限无法发送邮件", cause: "由于附件文件超过公司允许的最大限制（通常为 25 MB），邮件发送失败。", steps: ["从邮件草稿中移除较大的附件。", "将大文件上传到公司的 OneDrive 或 SharePoint 存储空间。", "将 OneDrive 共享链接复制到邮件正文中，然后重新发送。"] },
                { title: "自动回复 / 外出信息不生效", cause: "用户已设置外出自动回复，但发件人未收到自动回复。", steps: ["打开自动回复设置，确认“发送自动回复”已开启，并且开始和结束日期正确。", "如果外部客户也应收到自动回复，请确认已勾选“向组织外部发送回复”。", "可通过从个人账户向您的工作邮箱发送邮件，或请同事给您发邮件来测试。"] },
                { title: "恢复误删除的邮件", cause: "用户不小心删除了一封重要邮件，需要在其被永久删除之前恢复。", steps: ["从左侧边栏打开“已删除邮件”文件夹。", "如果邮件在其中，右键点击并选择“移动” → “收件箱”。", "如果没有找到，点击文件夹列表顶部的“恢复此文件夹中已删除的项目”，选择所需邮件，然后点击“恢复”。"] }
            ]
        },
        printing: {
            title: "打印问题",
            description: "打印队列问题、找不到打印机等。",
            issues: [
                { title: "找不到打印机 / 驱动程序缺失", cause: "用户想要打印，但所在楼层或部门指定的打印机没有出现在可用打印机列表中。", steps: ["打开“设置” → “设备” → “打印机和扫描仪”。", "点击“添加打印机或扫描仪”，等待几秒钟进行自动搜索。", "如果没有出现，点击“我需要的打印机不在列表中”，选择通过打印机的 IP 地址或网络名称进行搜索。"] },
                { title: "打印速度慢 / 高分辨率图形", cause: "由于文件体积过大（例如包含大量图片的 PDF）或打印设置为最高质量，打印任务处理时间极长。", steps: ["在发送打印命令前打开“打印机属性”。", "将打印质量设置从“高质量”改为“标准”或“草稿”。", "选择灰度 / 黑白打印以加快页面处理速度。"] },
                { title: "双面打印无法使用", cause: "尽管用户想要双面打印，但打印机每页都单独输出，通常是因为双面打印功能被禁用。", steps: ["按 Ctrl + P 并打开“打印机属性”。", "进入“设备设置”或“布局”选项卡。", "确保双面打印模块已启用，并将打印模式设置为“双面打印”。"] },
                { title: "文档卡在打印队列中", cause: "您发送了打印任务，但没有任何反应，新的打印任务不断堆积却无法打印。", steps: ["在 Windows 开始菜单中搜索“打印机和扫描仪”。", "点击您的打印机并选择“打开队列”。", "点击顶部的“打印机”选项卡（或三个点），选择“取消所有文档”。", "通过电源按钮实际重启打印机，等待一分钟后重试打印。"] },
                { title: "打印成了 PDF 而不是纸质文件", cause: "您点击了打印，但打印机并未发出声音，而是弹出一个“另存为”窗口要求保存文件——选择了错误的输出设备。", steps: ["在打印界面（按下 Ctrl + P 后），查看顶部的打印机下拉菜单。", "将其从“Microsoft Print to PDF”更改为您办公室实际打印机的名称（例如 HP、Canon、Xerox）。", "点击打印。"] }
            ]
        },
        software: {
            title: "软件与应用程序",
            description: "应用无响应、卡顿或运行缓慢、更改默认应用等。",
            issues: [
                { title: "应用程序无响应", cause: "像 Excel 或 Word 这样的程序完全卡死、变灰，并在顶部显示“未响应”错误信息。", steps: ["按 Ctrl + Shift + Esc 打开任务管理器。", "在列表中找到卡死的应用程序，右键点击并选择“结束任务”以强制关闭。", "重新打开 Microsoft Office 应用程序时，通常会自动恢复您未保存的工作。"] },
                { title: "默认应用程序设置错误", cause: "双击文件时使用了错误的程序打开，例如用网页浏览器而不是 Adobe Acrobat 打开。", steps: ["右键点击文件并选择“属性”。", "找到“打开方式：”部分，点击“更改”按钮。", "从列表中选择您偏好的应用程序（例如 Adobe Acrobat），点击“确定”，然后点击“应用”。"] },
                { title: "浏览器运行极其缓慢", cause: "您的网页浏览器加载页面耗时很长，在标签页之间切换也明显卡顿。", steps: ["关闭不必要的标签页（每个标签页都会占用内存）。", "如果仍然卡顿，按 Ctrl + Shift + Delete 清除缓存。", "勾选“缓存的图片和文件”复选框，然后点击“清除数据”。", "重启浏览器。"] },
                { title: "Microsoft Teams 卡死或音视频故障", cause: "由于缓存累积或隐私权限受限，Teams 在会议期间变得无响应或出现音视频故障。", steps: ["右键点击系统托盘中的 Teams 图标并选择“退出”，彻底关闭 Microsoft Teams。", "按 Win + R，输入 %appdata%\\Microsoft\\Teams，删除其中的临时文件以清除缓存。", "进入 Windows 设置 → 隐私，确保 Microsoft Teams 的麦克风和摄像头访问权限均已开启。"] },
                { title: "Microsoft 365 出现“未授权产品”错误", cause: "Office 应用顶部出现“未授权产品”提示条，由于会话过期或激活同步失败，导致文档编辑受限。", steps: ["打开任意 Office 应用程序（如 Word 或 Excel），进入“文件” → “账户”。", "点击“注销”以完全退出当前会话。", "点击“登录”，重新输入您完整的公司邮箱地址和密码，以刷新许可证激活状态。"] }
            ]
        },
        other: {
            title: "其他 / 自定义问题",
            description: "请用您自己的话描述您的问题。",
            issues: []
        }
    }
}

};
