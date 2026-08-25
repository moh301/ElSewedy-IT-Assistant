/* =========================================================================
   SWE IT Assist — Shared App Logic (multi-language)
   ========================================================================= */

const CATEGORY_ORDER = ["network", "accounts", "email", "printing", "software", "other"];
const CATEGORY_ICONS = {
    network: "wifi",
    accounts: "key",
    email: "mail",
    printing: "printer",
    software: "shield",
    other: "grid"
};
const LANG_STORAGE_KEY = "swe_it_lang";

// The "Other / Custom Issue" flow no longer shows the plain description
// form — it opens the AI chatbot instead. Every entry point that used to
// link to category.html?cat=other (the homepage tile, the small per-issue
// "press here" tabs, and the standalone escalate tab) now points here.
const CHATBOT_URL = "chatbot/index.html";

/* ---------- Backend config ----------
   Every "Other / Custom Issue" submission is POSTed as JSON to this single
   endpoint. By default this is computed AUTOMATICALLY from wherever this
   page itself is being served from — it resolves to "backend-php/api/
   support-requests" relative to the current page URL. That means it keeps
   working no matter what you name the project folder inside XAMPP's
   htdocs, and no matter how deep it's nested — as long as you open the
   site through Apache (http://localhost/.../index.html), not by double-
   clicking the HTML file. Double-clicking loads it as a file:// URL, which
   has no server behind it and every request will fail — always browse to
   it via http://localhost/...

   If you'd rather run a different backend, replace the line below with one
   of these instead:

     /backend-php  (PHP — see backend-php/README.md)
        PHP's own built-in server (php -S localhost:8788 router.php):
           const SUPPORT_API_ENDPOINT = "http://localhost:8788/api/support-requests";
     /backend      (Node.js + Express — see backend/README.md)
        default local URL:
           const SUPPORT_API_ENDPOINT = "http://localhost:8787/api/support-requests";

   Later, once IT/Power Automate has a shared HTTP-trigger flow set up (so
   this website AND the AI chatbot both feed the same SharePoint list),
   just point this constant at that flow's URL — the JSON payload shape
   below already matches what a Power Automate "When an HTTP request is
   received" trigger expects out of the box. No other code needs to change. */
const SUPPORT_API_ENDPOINT = new URL("backend-php/api/support-requests", window.location.href).href;

/* ---------- Icon library (inline SVG, stroke-based) ---------- */
const ICONS = {
    wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M12 20h.01"/></svg>`,
    key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M10.85 12.15 19 4"/><path d="M16 7l3 3"/><path d="M13 10l3 3"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>`,
    printer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="5" y="9" width="14" height="7" rx="1.5"/><path d="M6 16h12v5H6z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/></svg>`,
    grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`,
    arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>`,
    warn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>`,
    thumbUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 22V11l5-8 1.5 1L12 9h8l-2 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z"/></svg>`,
    thumbDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2v11l-5 8-1.5-1 1.5-6H4l2-11a2 2 0 0 1 2-2h9Z"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    penModern: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`
};

/* ---------- Two-tone tile icons for the homepage category grid ---------- */
const TILE_ICONS = {
    network: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 20C15 13 33 13 40 20" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M14 26C19 21 29 21 34 26" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M20 32C22.5 29.5 25.5 29.5 28 32" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="37" r="2.6" fill="#a9002c"/></svg>`,
    accounts: `<svg viewBox="0 0 48 48" fill="none"><circle cx="17" cy="17" r="8" stroke="#17324d" stroke-width="2.4"/><circle cx="17" cy="17" r="2.6" fill="#a9002c"/><path d="M22.5 22.5 38 38" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M30 30 33 27" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M34 34 37 31" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    email: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="12" width="30" height="22" rx="3" stroke="#17324d" stroke-width="2.4"/><path d="M7 14 21 25 35 14" stroke="#17324d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="38" cy="12" r="5" fill="#a9002c"/></svg>`,
    printing: `<svg viewBox="0 0 48 48" fill="none"><path d="M12 18V8H32V18" stroke="#17324d" stroke-width="2.4" stroke-linejoin="round"/><rect x="8" y="18" width="28" height="14" rx="2.5" stroke="#17324d" stroke-width="2.4"/><rect x="14" y="26" width="16" height="12" rx="1" fill="#a9002c"/></svg>`,
    software: `<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="9" width="30" height="24" rx="3" stroke="#17324d" stroke-width="2.4"/><path d="M7 16H37" stroke="#17324d" stroke-width="2.4"/><circle cx="12" cy="12.5" r="1.3" fill="#17324d"/><circle cx="16.5" cy="12.5" r="1.3" fill="#17324d"/><rect x="14" y="21" width="16" height="8" rx="1.5" fill="#a9002c"/></svg>`,
    other: `<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="7" width="15" height="15" rx="3" stroke="#17324d" stroke-width="2.4"/><rect x="26" y="7" width="15" height="15" rx="3" stroke="#17324d" stroke-width="2.4"/><rect x="7" y="26" width="15" height="15" rx="3" stroke="#17324d" stroke-width="2.4"/><rect x="26" y="26" width="15" height="15" rx="3" fill="#a9002c"/></svg>`
};

function tileIcon(key) {
    return TILE_ICONS[key] || "";
}

function icon(name) {
    return ICONS[name] || "";
}

/* ---------- Escape helper ---------- */
function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

/* Turn plain-text key combos wrapped in curly/guillemet quotes into <code> for polish */
function linkify(text) {
    return text
        .replace(/“([^”]+)”/g, "“<code>$1</code>”")
        .replace(/«([^»]+)»/g, "«<code>$1</code>»");
}

/* ---------- Language state ---------- */
function detectInitialLang() {
    try {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        if (saved && LANGS.some((l) => l.code === saved)) return saved;
    } catch (e) { /* localStorage unavailable */ }

    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (LANGS.some((l) => l.code === nav)) return nav;
    return DEFAULT_LANG;
}

function getLangMeta(code) {
    return LANGS.find((l) => l.code === code) || LANGS[0];
}

function setLang(code) {
    try { localStorage.setItem(LANG_STORAGE_KEY, code); } catch (e) { /* ignore */ }
    applyDocumentDirection(code);
    renderCurrentPage(code);
}

function applyDocumentDirection(code) {
    const meta = getLangMeta(code);
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("dir", meta.dir);
}

/* ---------- Language switcher widget ---------- */
function renderLanguageSwitcher(code) {
    const host = document.getElementById("langSwitcher");
    if (!host) return;

    const ui = I18N[code].ui;

    host.innerHTML = `
        <button type="button" class="lang-trigger" id="langTrigger" aria-haspopup="listbox" aria-expanded="false">
            <span class="lang-trigger-icon">${icon("globe")}</span>
            <span class="lang-trigger-label">${getLangMeta(code).native}</span>
            <span class="lang-trigger-chevron">${icon("chevron")}</span>
        </button>
        <div class="lang-menu" id="langMenu" role="listbox" aria-label="${ui.langLabel}">
            ${LANGS.map((l) => `
                <button type="button" class="lang-option${l.code === code ? " active" : ""}" data-lang="${l.code}" role="option" aria-selected="${l.code === code}">
                    <span>${l.native}</span>
                    ${l.code === code ? `<span class="lang-check">${icon("check")}</span>` : ""}
                </button>
            `).join("")}
        </div>
    `;

    const trigger = host.querySelector("#langTrigger");
    const menu = host.querySelector("#langMenu");

    function closeMenu() {
        menu.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
    }
    function openMenu() {
        menu.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
    }

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.contains("open") ? closeMenu() : openMenu();
    });

    host.querySelectorAll(".lang-option").forEach((btn) => {
        btn.addEventListener("click", () => {
            closeMenu();
            const newLang = btn.getAttribute("data-lang");
            if (newLang !== code) setLang(newLang);
        });
    });

    document.addEventListener("click", (e) => {
        if (!host.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}

/* ---------- Query param helper ---------- */
function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

/* ---------- INDEX PAGE ---------- */
function renderIndexPage(code) {
    const ui = I18N[code].ui;
    const categories = I18N[code].categories;

    document.title = `SWE IT Assist`;

    setText("productTag", ui.productTag);
    setText("statusText", ui.statusActive);
    setText("heroEyebrow", ui.heroEyebrow);
    setHTML("heroTitle", ui.heroTitleHtml);
    setText("heroSubtitle", ui.heroSubtitle);
    setText("footerNote", ui.footerNote);

    const grid = document.getElementById("categoryGrid");
    if (grid) {
        grid.innerHTML = "";
        CATEGORY_ORDER.forEach((key, i) => {
            const cat = categories[key];
            const card = document.createElement("div");
            card.className = "category-card" + (key === "other" ? " custom-card" : "");
            card.setAttribute("data-category", key);
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.style.animationDelay = `${Math.min(i * 0.05, 0.35)}s`;

            card.innerHTML = `
                <div class="tile-icon">${tileIcon(key)}</div>
                <div class="tile-title">${escapeHTML(cat.title)}</div>
                <div class="tile-reveal">
                    <p class="tile-desc">${escapeHTML(cat.description)}</p>
                    <span class="tile-btn"><span>${escapeHTML(ui.getStarted)}</span>${icon("arrowRight")}</span>
                </div>
            `;

            const go = () => {
                window.location.href = key === "other"
                    ? CHATBOT_URL
                    : `category.html?cat=${encodeURIComponent(key)}`;
            };
            card.addEventListener("click", go);
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
            });

            grid.appendChild(card);
        });
    }

    paintStaticIcons();
    renderLanguageSwitcher(code);
    initHeaderSearch(code);
}

/* ---------- CATEGORY PAGE ---------- */
function renderCategoryPage(code) {
    const ui = I18N[code].ui;
    const catKey = CATEGORY_ORDER.includes(getParam("cat")) ? getParam("cat") : "other";
    const cat = I18N[code].categories[catKey];

    document.title = `${cat.title}${ui.titleSuffix}`;

    setText("productTag", ui.productTag);
    setText("backLabel", ui.backToCategories);
    setText("crumbHome", ui.breadcrumbHome);
    setText("crumbCurrent", cat.title);
    setText("pageTitle", cat.title);
    setText("pageSubtitle", cat.description);

    const badge = document.getElementById("pageIconBadge");
    if (badge) badge.innerHTML = icon(CATEGORY_ICONS[catKey]);

    const countPill = document.getElementById("issueCount");
    if (countPill) {
        countPill.textContent = cat.issues.length ? ui.issuesCount(cat.issues.length) : ui.customRequest;
    }

    const list = document.getElementById("issueList");
    if (list) {
        list.innerHTML = "";
        list.style.display = cat.issues.length ? "" : "none";
        cat.issues.forEach((issue, i) => list.appendChild(buildIssueCard(issue, i, ui)));

        // A single, visually distinct red tab at the end of the list — not
        // repeated inside every issue — linking straight to the dedicated
        // "Other" page for anyone whose issue still isn't solved.
        if (cat.issues.length) {
            list.appendChild(buildEscalateTab(ui));
        }
    }

    // The "Other" custom-issue form only lives on the dedicated "Other" page —
    // categories that already have issue cards send people there via the
    // "Press here" link on each issue instead of duplicating the form here.
    const otherSection = document.getElementById("otherSection");
    if (otherSection) {
        otherSection.style.display = cat.issues.length ? "none" : "";
    }

    if (!cat.issues.length) {
        setText("otherTitle", ui.otherEmptyTitle);
        setText("otherDesc", ui.otherEmptyDesc);
        setText("otherLabel", ui.otherEmptyLabel);

        const textarea = document.getElementById("otherDetails");
        if (textarea) textarea.setAttribute("placeholder", ui.placeholder);

        setText("submitLabel", ui.submit);
        setText("successTitle", ui.successTitle);
        setText("successDesc", ui.successDesc);

        // reset any previous submission UI state
        const form = document.getElementById("otherForm");
        const success = document.getElementById("otherSuccess");
        if (form) {
            form.reset();
            form.style.display = "";
            form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
            form.querySelectorAll(".error-msg.show").forEach((el) => el.classList.remove("show"));
        }
        if (success) success.classList.remove("show");

        initOtherForm(ui, code, catKey);
    }

    paintStaticIcons();
    renderLanguageSwitcher(code);
    initHeaderSearch(code, catKey);
}

function buildIssueCard(issue, index, ui) {
    const card = document.createElement("div");
    card.className = "issue-card fade-up";
    card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;

    const stepsHTML = issue.steps.map((s, i) => `
        <li>
            <span class="step-num">${i + 1}</span>
            <span class="step-text">${linkify(escapeHTML(s))}</span>
        </li>
    `).join("");

    const causeHTML = issue.cause
        ? `<div class="issue-cause"><strong>${escapeHTML(ui.causeLabel)}</strong>&nbsp;${escapeHTML(issue.cause)}</div>`
        : "";

    card.innerHTML = `
        <button class="issue-trigger" type="button" aria-expanded="false">
            <span class="issue-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="issue-trigger-text">
                <span class="issue-question">${escapeHTML(issue.title)}</span>
                <span class="issue-hint">${escapeHTML(ui.tapToView)}</span>
            </span>
            <span class="chevron">${icon("chevron")}</span>
        </button>
        <div class="issue-panel">
            <div class="issue-panel-inner">
                <div class="issue-body">
                    ${causeHTML}
                    <ul class="steps">${stepsHTML}</ul>
                    <div class="resolved-row">
                        <span class="resolved-text">${escapeHTML(ui.didThisSolve)}</span>
                        <span class="feedback-buttons">
                            <button type="button" class="fb-btn" data-fb="yes">${icon("thumbUp")} ${escapeHTML(ui.yes)}</button>
                            <button type="button" class="fb-btn" data-fb="no">${icon("thumbDown")} ${escapeHTML(ui.no)}</button>
                        </span>
                    </div>
                    <a href="${CHATBOT_URL}" class="issue-escalate">
                        <span class="issue-escalate-icon">${icon("penModern")}</span>
                        <span>${escapeHTML(ui.stillStuckPressHere)}</span>
                    </a>
                </div>
            </div>
        </div>
    `;

    const trigger = card.querySelector(".issue-trigger");
    trigger.addEventListener("click", () => {
        const isOpen = card.classList.contains("open");

        document.querySelectorAll(".issue-card.open").forEach((c) => {
            if (c !== card) {
                c.classList.remove("open");
                c.querySelector(".issue-trigger").setAttribute("aria-expanded", "false");
            }
        });

        card.classList.toggle("open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));

        if (!isOpen) {
            requestAnimationFrame(() => card.scrollIntoView({ behavior: "smooth", block: "nearest" }));
        }
    });

    card.querySelectorAll(".fb-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            card.querySelectorAll(".fb-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    return card;
}

function buildEscalateTab(ui) {
    const tab = document.createElement("a");
    tab.href = CHATBOT_URL;
    tab.className = "escalate-tab fade-up";

    tab.innerHTML = `
        <span class="escalate-tab-icon">${icon("penModern")}</span>
        <span class="escalate-tab-text">
            <span class="escalate-tab-title">${escapeHTML(ui.pressHere)}</span>
            <span class="escalate-tab-hint">${escapeHTML(ui.pressHereHint)}</span>
        </span>
        <span class="escalate-tab-arrow">${icon("arrowRight")}</span>
    `;

    return tab;
}

/* ---------- "Other" form validation ---------- */
function initOtherForm(ui, code, catKey) {
    const form = document.getElementById("otherForm");
    if (!form) return;

    const textarea = document.getElementById("otherDetails");
    const errorMsg = document.getElementById("otherError");
    const charCount = document.getElementById("charCount");
    const successPanel = document.getElementById("otherSuccess");
    const submitBtn = document.getElementById("otherSubmit");
    const submitError = document.getElementById("otherSubmitError");
    const MIN_LEN = 12;
    const MAX_LEN = 800;

    charCount.textContent = `0 / ${MAX_LEN}`;

    function validateDetails(showError) {
        const val = textarea.value.trim();
        const valid = val.length >= MIN_LEN && val.length <= MAX_LEN;

        if (showError) {
            textarea.classList.toggle("invalid", !valid);
            errorMsg.classList.toggle("show", !valid);
            errorMsg.innerHTML = val.length === 0
                ? `${icon("warn")} ${escapeHTML(ui.errorEmpty)}`
                : `${icon("warn")} ${escapeHTML(ui.errorShort(MIN_LEN))}`;
        } else if (valid) {
            textarea.classList.remove("invalid");
            errorMsg.classList.remove("show");
        }
        return valid;
    }

    textarea.addEventListener("input", () => {
        charCount.textContent = `${textarea.value.length} / ${MAX_LEN}`;
        validateDetails(false);
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const detailsValid = validateDetails(true);
        if (!detailsValid) { textarea.focus(); return; }

        if (submitError) submitError.classList.remove("show");
        submitBtn.disabled = true;
        const originalHTML = submitBtn.innerHTML;
        submitBtn.textContent = ui.submitting;

        const payload = {
            details: textarea.value.trim(),
            category: catKey,
            source: "website",
            language: code,
            submittedAt: new Date().toISOString()
        };

        try {
            const res = await fetch(SUPPORT_API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

            form.reset();
            charCount.textContent = `0 / ${MAX_LEN}`;
            form.style.display = "none";
            successPanel.classList.add("show");
            successPanel.focus?.();
        } catch (err) {
            console.error("Failed to submit support request:", err);
            if (submitError) {
                submitError.innerHTML = `${icon("warn")} ${escapeHTML(ui.submitError)}`;
                submitError.classList.add("show");
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
        }
    });
}

/* ---------- small render helpers ---------- */
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}
function setHTML(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
}
function paintStaticIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
        el.innerHTML = icon(el.getAttribute("data-icon"));
    });
}

/* ---------- HEADER SEARCH ---------- */
function initHeaderSearch(code) {
    const ui = I18N[code].ui;
    const input = document.getElementById("headerSearch");
    if (!input) return;

    input.setAttribute("placeholder", ui.searchPlaceholder);
    input.value = "";
    setSearchEmpty(false, ui);

    const page = document.body.getAttribute("data-page");

    input.oninput = () => {
        const q = normalizeSearch(input.value);

        if (page === "index") {
            const cards = document.querySelectorAll("#categoryGrid .category-card");
            let anyVisible = false;
            cards.forEach((card) => {
                const title = normalizeSearch(card.querySelector(".tile-title")?.textContent || "");
                const desc = normalizeSearch(card.querySelector(".tile-desc")?.textContent || "");
                const match = !q || title.includes(q) || desc.includes(q);
                card.style.display = match ? "" : "none";
                if (match) anyVisible = true;
            });
            setSearchEmpty(Boolean(q) && !anyVisible, ui);
        } else if (page === "category") {
            const cards = document.querySelectorAll("#issueList .issue-card");
            let anyVisible = false;
            cards.forEach((card) => {
                const title = normalizeSearch(card.querySelector(".issue-question")?.textContent || "");
                const match = !q || title.includes(q);
                card.style.display = match ? "" : "none";
                if (match) anyVisible = true;
            });
            setSearchEmpty(Boolean(q) && !anyVisible && cards.length > 0, ui);
        }
    };
}

// Loosely matches queries regardless of spacing/punctuation differences,
// e.g. "wifi" should still find a card titled "Wi-Fi".
function normalizeSearch(str) {
    return str.trim().toLowerCase().replace(/[\s\-_/]+/g, "");
}

function setSearchEmpty(show, ui) {
    const el = document.getElementById("searchEmpty");
    if (!el) return;
    el.textContent = ui.searchNoResults;
    el.hidden = !show;
}

/* ---------- Boot / router ---------- */
function renderCurrentPage(code) {
    const page = document.body.getAttribute("data-page");
    if (page === "index") renderIndexPage(code);
    if (page === "category") renderCategoryPage(code);
}

document.addEventListener("DOMContentLoaded", () => {
    const code = detectInitialLang();
    applyDocumentDirection(code);
    renderCurrentPage(code);
});
