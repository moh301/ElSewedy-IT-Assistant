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
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
    logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
    headset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 18 0"/><rect x="3" y="12" width="4.5" height="7.5" rx="1.6"/><rect x="16.5" y="12" width="4.5" height="7.5" rx="1.6"/><path d="M19.5 19.5v.5a3 3 0 0 1-3 3h-2.5"/></svg>`,
    appsGear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M8 20.5h8"/><path d="M12 16.5v4"/><circle cx="12" cy="10.25" r="2.6"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/><rect x="7" y="13" width="4" height="4" rx="0.8" fill="currentColor" stroke="none"/></svg>`,
    database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.14 8.5 4.5 4.5 0 0 0 7 18Z"/></svg>`,
    /* Real brand marks (used on the Application Support cards) */
    oracleLogo: `<svg viewBox="0 0 210 48" xmlns="http://www.w3.org/2000/svg" direction="ltr"><text x="0" y="36" direction="ltr" unicode-bidi="bidi-override" text-anchor="start" font-family="Arial, 'Helvetica Neue', Helvetica, sans-serif" font-weight="800" font-size="38" letter-spacing="0.5" fill="#C74634">ORACLE</text></svg>`,
    salesforceLogo: `<svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path fill="#00A1E0" d="M248.89 245.64h-26.35c.69-5.16 3.32-14.12 13.64-14.12 6.75 0 11.97 3.82 12.71 14.12zm136.66-13.88c-.47 0-14.11-1.77-14.11 20s13.63 20 14.11 20c13 0 14.11-13.54 14.11-20 0-21.76-13.66-20-14.11-20zm-243.22 23.76a8.63 8.63 0 0 0-3.29 7.29c0 4.78 2.08 6.05 3.29 7.05 4.7 3.7 15.07 2.12 20.93.95v-16.94c-5.32-1.07-16.73-1.96-20.93 1.65zM640 232c0 87.58-80 154.39-165.36 136.43-18.37 33-70.73 70.75-132.2 41.63-41.16 96.05-177.89 92.18-213.81-5.17C8.91 428.78-50.19 266.52 53.36 205.61 18.61 126.18 76 32 167.67 32a124.24 124.24 0 0 1 98.56 48.7c20.7-21.4 49.4-34.81 81.15-34.81 42.34 0 79 23.52 98.8 58.57C539 63.78 640 132.69 640 232zm-519.55 31.8c0-11.76-11.69-15.17-17.87-17.17-5.27-2.11-13.41-3.51-13.41-8.94 0-9.46 17-6.66 25.17-2.12 0 0 1.17.71 1.64-.47.24-.7 2.36-6.58 2.59-7.29a1.13 1.13 0 0 0-.7-1.41c-12.33-7.63-40.7-8.51-40.7 12.7 0 12.46 11.49 15.44 17.88 17.17 4.72 1.58 13.17 3 13.17 8.7 0 4-3.53 7.06-9.17 7.06a31.76 31.76 0 0 1-19-6.35c-.47-.23-1.42-.71-1.65.71l-2.4 7.47c-.47.94.23 1.18.23 1.41 1.75 1.4 10.3 6.59 22.82 6.59 13.17 0 21.4-7.06 21.4-18.11zm32-42.58c-10.13 0-18.66 3.17-21.4 5.18a1 1 0 0 0-.24 1.41l2.59 7.06a1 1 0 0 0 1.18.7c.65 0 6.8-4 16.93-4 4 0 7.06.71 9.18 2.36 3.6 2.8 3.06 8.29 3.06 10.58-4.79-.3-19.11-3.44-29.41 3.76a16.92 16.92 0 0 0-7.34 14.54c0 5.9 1.51 10.4 6.59 14.35 12.24 8.16 36.28 2 38.1 1.41 1.58-.32 3.53-.66 3.53-1.88v-33.88c.04-4.61.32-21.64-22.78-21.64zM199 200.24a1.11 1.11 0 0 0-1.18-1.18H188a1.11 1.11 0 0 0-1.17 1.18v79a1.11 1.11 0 0 0 1.17 1.18h9.88a1.11 1.11 0 0 0 1.18-1.18zm55.75 28.93c-2.1-2.31-6.79-7.53-17.65-7.53-3.51 0-14.16.23-20.7 8.94-6.35 7.63-6.58 18.11-6.58 21.41 0 3.12.15 14.26 7.06 21.17 2.64 2.91 9.06 8.23 22.81 8.23 10.82 0 16.47-2.35 18.58-3.76.47-.24.71-.71.24-1.88l-2.35-6.83a1.26 1.26 0 0 0-1.41-.7c-2.59.94-6.35 2.82-15.29 2.82-17.42 0-16.85-14.74-16.94-16.7h37.17a1.23 1.23 0 0 0 1.17-.94c-.29 0 2.07-14.7-6.09-24.23zm36.69 52.69c13.17 0 21.41-7.06 21.41-18.11 0-11.76-11.7-15.17-17.88-17.17-4.14-1.66-13.41-3.38-13.41-8.94 0-3.76 3.29-6.35 8.47-6.35a38.11 38.11 0 0 1 16.7 4.23s1.18.71 1.65-.47c.23-.7 2.35-6.58 2.58-7.29a1.13 1.13 0 0 0-.7-1.41c-7.91-4.9-16.74-4.94-20.23-4.94-12 0-20.46 7.29-20.46 17.64 0 12.46 11.48 15.44 17.87 17.17 6.11 2 13.17 3.26 13.17 8.7 0 4-3.52 7.06-9.17 7.06a31.8 31.8 0 0 1-19-6.35 1 1 0 0 0-1.65.71l-2.35 7.52c-.47.94.23 1.18.23 1.41 1.72 1.4 10.33 6.59 22.79 6.59zM357.09 224c0-.71-.24-1.18-1.18-1.18h-11.76c0-.14.94-8.94 4.47-12.47 4.16-4.15 11.76-1.64 12-1.64 1.17.47 1.41 0 1.64-.47l2.83-7.77c.7-.94 0-1.17-.24-1.41-5.09-2-17.35-2.87-24.46 4.24-5.48 5.48-7 13.92-8 19.52h-8.47a1.28 1.28 0 0 0-1.17 1.18l-1.42 7.76c0 .7.24 1.17 1.18 1.17h8.23c-8.51 47.9-8.75 50.21-10.35 55.52-1.08 3.62-3.29 6.9-5.88 7.76-.09 0-3.88 1.68-9.64-.24 0 0-.94-.47-1.41.71-.24.71-2.59 6.82-2.83 7.53s0 1.41.47 1.41c5.11 2 13 1.77 17.88 0 6.28-2.28 9.72-7.89 11.53-12.94 2.75-7.71 2.81-9.79 11.76-59.74h12.23a1.29 1.29 0 0 0 1.18-1.18zm53.39 16c-.56-1.68-5.1-18.11-25.17-18.11-15.25 0-23 10-25.16 18.11-1 3-3.18 14 0 23.52.09.3 4.41 18.12 25.16 18.12 14.95 0 22.9-9.61 25.17-18.12 3.21-9.61 1.01-20.52 0-23.52zm45.4-16.7c-5-1.65-16.62-1.9-22.11 5.41v-4.47a1.11 1.11 0 0 0-1.18-1.17h-9.4a1.11 1.11 0 0 0-1.18 1.17v55.28a1.12 1.12 0 0 0 1.18 1.18h9.64a1.12 1.12 0 0 0 1.18-1.18v-27.77c0-2.91.05-11.37 4.46-15.05 4.9-4.9 12-3.36 13.41-3.06a1.57 1.57 0 0 0 1.41-.94 74 74 0 0 0 3.06-8 1.16 1.16 0 0 0-.47-1.41zm46.81 54.1l-2.12-7.29c-.47-1.18-1.41-.71-1.41-.71-4.23 1.82-10.15 1.89-11.29 1.89-4.64 0-17.17-1.13-17.17-19.76 0-6.23 1.85-19.76 16.47-19.76a34.85 34.85 0 0 1 11.52 1.65s.94.47 1.18-.71c.94-2.59 1.64-4.47 2.59-7.53.23-.94-.47-1.17-.71-1.17-11.59-3.87-22.34-2.53-27.76 0-1.59.74-16.23 6.49-16.23 27.52 0 2.9-.58 30.11 28.94 30.11a44.45 44.45 0 0 0 15.52-2.83 1.3 1.3 0 0 0 .47-1.42zm53.87-39.52c-.8-3-5.37-16.23-22.35-16.23-16 0-23.52 10.11-25.64 18.59a38.58 38.58 0 0 0-1.65 11.76c0 25.87 18.84 29.4 29.88 29.4 10.82 0 16.46-2.35 18.58-3.76.47-.24.71-.71.24-1.88l-2.36-6.83a1.26 1.26 0 0 0-1.41-.7c-2.59.94-6.35 2.82-15.29 2.82-17.42 0-16.85-14.74-16.93-16.7h37.16a1.25 1.25 0 0 0 1.18-.94c-.24-.01.94-7.07-1.41-15.54zm-23.29-6.35c-10.33 0-13 9-13.64 14.12H546c-.88-11.92-7.62-14.13-12.73-14.13z"/></svg>`
};

/* ---------- Two-tone tile icons for the homepage category grid ---------- */
const TILE_ICONS = {
    network: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 20C15 13 33 13 40 20" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M14 26C19 21 29 21 34 26" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M20 32C22.5 29.5 25.5 29.5 28 32" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="37" r="2.6" fill="#a9002c"/></svg>`,
    accounts: `<svg viewBox="0 0 48 48" fill="none"><circle cx="17" cy="17" r="8" stroke="#17324d" stroke-width="2.4"/><circle cx="17" cy="17" r="2.6" fill="#a9002c"/><path d="M22.5 22.5 38 38" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M30 30 33 27" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M34 34 37 31" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    email: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="12" width="30" height="22" rx="3" stroke="#17324d" stroke-width="2.4"/><path d="M7 14 21 25 35 14" stroke="#17324d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="38" cy="12" r="5" fill="#a9002c"/></svg>`,
    printing: `<svg viewBox="0 0 48 48" fill="none"><path d="M12 18V8H32V18" stroke="#17324d" stroke-width="2.4" stroke-linejoin="round"/><rect x="8" y="18" width="28" height="14" rx="2.5" stroke="#17324d" stroke-width="2.4"/><rect x="14" y="26" width="16" height="12" rx="1" fill="#a9002c"/></svg>`,
    software: `<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="9" width="30" height="24" rx="3" stroke="#17324d" stroke-width="2.4"/><path d="M7 16H37" stroke="#17324d" stroke-width="2.4"/><circle cx="12" cy="12.5" r="1.3" fill="#17324d"/><circle cx="16.5" cy="12.5" r="1.3" fill="#17324d"/><rect x="14" y="21" width="16" height="8" rx="1.5" fill="#a9002c"/></svg>`,
    other: `<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="7" width="15" height="15" rx="3" stroke="#17324d" stroke-width="2.4"/><rect x="26" y="7" width="15" height="15" rx="3" stroke="#17324d" stroke-width="2.4"/><rect x="7" y="26" width="15" height="15" rx="3" stroke="#17324d" stroke-width="2.4"/><rect x="26" y="26" width="15" height="15" rx="3" fill="#a9002c"/></svg>`,
    hub: `<svg viewBox="0 0 48 48" fill="none"><path d="M10 24v-2a14 14 0 0 1 28 0v2" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><rect x="6" y="22" width="8" height="14" rx="3" stroke="#17324d" stroke-width="2.4"/><rect x="34" y="22" width="8" height="14" rx="3" fill="#a9002c"/><path d="M38 36v2a4 4 0 0 1-4 4h-6" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    appsSupport: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="24" rx="3" stroke="#17324d" stroke-width="2.4"/><path d="M17 40h14" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M24 32v8" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><path d="M24 14.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" stroke="#17324d" stroke-width="2.2"/><circle cx="24" cy="20" r="2" fill="#a9002c"/></svg>`,
    booking: `<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="10" width="34" height="30" rx="3" stroke="#17324d" stroke-width="2.4"/><path d="M7 18h34" stroke="#17324d" stroke-width="2.4"/><path d="M15 6v8M33 6v8" stroke="#17324d" stroke-width="2.4" stroke-linecap="round"/><rect x="15" y="24" width="8" height="8" rx="1.5" fill="#a9002c"/><rect x="27" y="24" width="6" height="6" rx="1.5" stroke="#17324d" stroke-width="2"/></svg>`
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
// The homepage no longer lists all six issue categories directly — it
// shows a small set of launcher tiles (same look as a category card):
// "IT Support" leads to the dedicated support.html hub (where the six-tile
// grid now lives — see renderSupportPage below), plus "Apps Support" and
// "Booking", which are their own simple placeholder pages for now.
const HOME_LAUNCHERS = [
    { iconKey: "headset", titleKey: "itSupportTitle", descKey: "itSupportDesc", href: "support.html" },
    { iconKey: "appsGear", titleKey: "appsSupportTitle", descKey: "appsSupportDesc", href: "apps-support.html" },
    { iconKey: "calendar", titleKey: "bookingTitle", descKey: "bookingDesc", href: "booking.html" }
];

// Time-of-day greeting on the homepage hero, using the signed-in
// employee's first name (from js/auth.js's getAuthUser()). Hidden if
// nobody's signed in yet (shouldn't normally happen — index.html
// requires auth — but keeps this safe either way).
function renderHeroGreeting(ui) {
    const el = document.getElementById("heroGreeting");
    if (!el) return;

    const user = typeof getAuthUser === "function" ? getAuthUser() : null;
    if (!user || !user.name) {
        el.hidden = true;
        return;
    }

    const firstName = user.name.trim().split(/\s+/)[0];
    const hour = new Date().getHours();
    const greet = hour < 12 ? ui.greetingMorning
        : hour < 18 ? ui.greetingAfternoon
        : ui.greetingEvening;

    el.textContent = greet(firstName);
    el.hidden = false;
}

function renderIndexPage(code) {
    const ui = I18N[code].ui;

    document.title = `SWE IT Assist`;

    setText("productTag", ui.productTag);
    setText("heroEyebrow", ui.heroEyebrow);
    renderHeroGreeting(ui);
    setHTML("heroTitle", ui.heroTitleHtml);
    setText("heroSubtitle", ui.heroSubtitle);
    setText("footerNote", ui.footerNote);

    const grid = document.getElementById("categoryGrid");
    if (grid) {
        grid.innerHTML = "";
        HOME_LAUNCHERS.forEach((item, i) => {
            const card = document.createElement("div");
            card.className = "launcher-card fade-up";
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.style.animationDelay = `${Math.min(i * 0.06, 0.3)}s`;

            card.innerHTML = `
                <div class="launcher-icon-badge">${icon(item.iconKey)}</div>
                <div class="launcher-title">${escapeHTML(ui[item.titleKey])}</div>
                <p class="launcher-desc">${escapeHTML(ui[item.descKey])}</p>
                <span class="launcher-arrow"><span>${escapeHTML(ui.getStarted)}</span>${icon("arrowRight")}</span>
            `;

            const go = () => { window.location.href = item.href; };
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
    wireAuthChrome(ui);
}

/* ---------- APPLICATION SUPPORT PAGE ---------- */
// One app tile per supported business application (currently just
// Oracle) — same launcher-card treatment as the homepage tiles, since
// each one is a distinct destination rather than an accordion of common
// issues. Add more apps by adding entries here plus a title/desc pair
// in i18n.js.
const APPS_SUPPORT_APPS = [
    { iconKey: "oracleLogo", badgeClass: "launcher-icon-badge--oracle", titleKey: "oracleErpTitle", descKey: "oracleErpDesc", href: "https://www.oracle.com/cloud/sign-in.html", external: true },
    { iconKey: "salesforceLogo", badgeClass: "launcher-icon-badge--salesforce", titleKey: "salesforceCrmTitle", descKey: "salesforceCrmDesc", href: "https://login.salesforce.com/", external: true }
];

function renderAppsSupportPage(code) {
    const ui = I18N[code].ui;

    document.title = `${ui.appsSupportTitle}${ui.titleSuffix}`;

    setText("productTag", ui.productTag);
    setText("backLabel", ui.breadcrumbHome);
    setText("crumbHome", ui.breadcrumbHome);
    setText("crumbCurrent", ui.appsSupportTitle);
    setText("pageTitle", ui.appsSupportTitle);
    setText("pageSubtitle", ui.appsSupportDesc);

    const grid = document.getElementById("categoryGrid");
    if (grid) {
        grid.innerHTML = "";
        APPS_SUPPORT_APPS.forEach((item, i) => {
            const card = document.createElement("div");
            card.className = "launcher-card fade-up";
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.style.animationDelay = `${Math.min(i * 0.06, 0.3)}s`;
            card.innerHTML = `
                <div class="launcher-icon-badge launcher-icon-badge--logo ${item.badgeClass || ""}">${icon(item.iconKey)}</div>
                <div class="launcher-title">${escapeHTML(ui[item.titleKey])}</div>
                <p class="launcher-desc">${escapeHTML(ui[item.descKey])}</p>
                <span class="launcher-arrow"><span>${escapeHTML(ui.openApp)}</span>${icon("arrowRight")}</span>
            `;
            const go = () => {
                if (item.external) {
                    window.open(item.href, "_blank", "noopener");
                } else {
                    window.location.href = item.href;
                }
            };
            card.addEventListener("click", go);
            card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
            grid.appendChild(card);
        });
    }

    paintStaticIcons();
    renderLanguageSwitcher(code);
    initHeaderSearch(code);
    wireAuthChrome(ui);
}

/* ---------- PLACEHOLDER PAGES (Booking, and anything else future) ---------- */
// Simple "coming soon" pages sharing the same header/breadcrumb/hero
// pattern as support.html — just a dashed placeholder card instead of
// real content, until each of these gets built out.
function renderPlaceholderPage(code, titleKey, descKey) {
    const ui = I18N[code].ui;

    document.title = `${ui[titleKey]}${ui.titleSuffix}`;

    setText("productTag", ui.productTag);
    setText("backLabel", ui.breadcrumbHome);
    setText("crumbHome", ui.breadcrumbHome);
    setText("crumbCurrent", ui[titleKey]);
    setText("pageTitle", ui[titleKey]);
    setText("pageSubtitle", ui[descKey]);
    setText("comingSoonTitle", ui.comingSoonTitle);
    setText("comingSoonDesc", ui.comingSoonDesc);

    paintStaticIcons();
    renderLanguageSwitcher(code);
    initHeaderSearch(code);
    wireAuthChrome(ui);
}

/* ---------- IT SUPPORT HUB PAGE (the six category tiles) ---------- */
function renderSupportPage(code) {
    const ui = I18N[code].ui;
    const categories = I18N[code].categories;

    document.title = `${ui.itSupportTitle}${ui.titleSuffix}`;

    setText("productTag", ui.productTag);
    setText("backLabel", ui.breadcrumbHome);
    setText("crumbHome", ui.breadcrumbHome);
    setText("crumbCurrent", ui.itSupportTitle);
    setText("pageTitle", ui.itSupportTitle);
    setText("pageSubtitle", ui.supportPageSubtitle);

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
    wireAuthChrome(ui);
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
    wireAuthChrome(ui);
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

// Translates the logout button's accessible label/tooltip. The button's
// icon is static markup in the HTML (see js/auth.js for the actual
// name-display + click-to-logout wiring, which is shared across every
// page that requires sign-in).
function wireAuthChrome(ui) {
    document.querySelectorAll("[data-auth-logout]").forEach((btn) => {
        btn.setAttribute("aria-label", ui.logout);
        btn.title = ui.logout;
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

        if (page === "index" || page === "support" || page === "apps-support") {
            // Matches both tile styles: .category-card (support.html's six
            // issue categories) and .launcher-card (index.html's home tiles,
            // apps-support.html's app tiles).
            const cards = document.querySelectorAll("#categoryGrid .category-card, #categoryGrid .launcher-card");
            let anyVisible = false;
            cards.forEach((card) => {
                const title = normalizeSearch(card.querySelector(".tile-title, .launcher-title")?.textContent || "");
                const desc = normalizeSearch(card.querySelector(".tile-desc, .launcher-desc")?.textContent || "");
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
// The announcement marquee is shared chrome that sits above the header on
// every page that uses it — rendered here once instead of duplicating the
// same two lines inside every page-specific render function.
function renderMarquee(code) {
    const ui = I18N[code].ui;
    document.querySelectorAll(".marquee-text").forEach((el) => {
        el.textContent = ui.announcementBar;
    });
}

function renderCurrentPage(code) {
    const page = document.body.getAttribute("data-page");
    renderMarquee(code);
    if (page === "index") renderIndexPage(code);
    if (page === "category") renderCategoryPage(code);
    if (page === "support") renderSupportPage(code);
    if (page === "apps-support") renderAppsSupportPage(code);
    if (page === "booking") renderPlaceholderPage(code, "bookingTitle", "bookingDesc");
}

document.addEventListener("DOMContentLoaded", () => {
    const code = detectInitialLang();
    applyDocumentDirection(code);
    renderCurrentPage(code);
});
