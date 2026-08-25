/* =========================================================================
   SWE IT Assist — Auth guard (shared by every page that requires sign-in)

   Loaded as the very first <script> in <body>, before anything else, so a
   signed-out visitor is redirected to login.html before the page has a
   chance to flash its content. It works out its own site root from its own
   <script src="..."> path (via document.currentScript), so the exact same
   file works whether it's included as "js/auth.js" (index.html,
   category.html, login.html) or "../js/auth.js" (chatbot/index.html) —
   no per-page configuration needed.
   ========================================================================= */

(function () {
    var AUTH_STORAGE_KEY = "swe_it_auth";

    var scriptEl = document.currentScript;
    var siteRootURL = new URL("../", scriptEl.src);

    function siteURL(path) {
        return new URL(path, siteRootURL).href;
    }

    var LOGIN_PAGE_URL = siteURL("login.html");
    var LOGOUT_ENDPOINT = siteURL("backend-php/api/auth/logout");

    function getAuthUser() {
        try {
            var raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
            if (!raw) return null;
            var user = JSON.parse(raw);
            if (!user || !user.employeeId || !user.email) return null;
            return user;
        } catch (e) {
            return null;
        }
    }

    // Expose so login.html (already-signed-in redirect) and other scripts
    // can reuse the exact same storage key/shape without duplicating it.
    window.SWE_AUTH_STORAGE_KEY = AUTH_STORAGE_KEY;
    window.getAuthUser = getAuthUser;

    // This file is also loaded on login.html itself — it should never
    // guard/redirect there, only expose the helpers above.
    var isLoginPage = document.body && document.body.getAttribute("data-page") === "login";

    if (!isLoginPage) {
        var user = getAuthUser();
        if (!user) {
            var redirectTo = window.location.href;
            window.location.replace(LOGIN_PAGE_URL + "?redirect=" + encodeURIComponent(redirectTo));
        }
    }

    function logout() {
        try { sessionStorage.removeItem(AUTH_STORAGE_KEY); } catch (e) { /* ignore */ }
        // Best-effort — the site has nothing server-side to actually tear
        // down (no PHP session), this just mirrors the login call for
        // symmetry. Failing silently is fine either way.
        try {
            fetch(LOGOUT_ENDPOINT, { method: "POST" }).catch(function () {});
        } catch (e) { /* ignore */ }
        window.location.href = LOGIN_PAGE_URL;
    }

    function wireChrome() {
        var current = getAuthUser();

        document.querySelectorAll("[data-auth-name]").forEach(function (el) {
            el.textContent = current ? current.name : "";
        });

        document.querySelectorAll("[data-auth-avatar]").forEach(function (el) {
            el.textContent = current && current.name ? current.name.trim().charAt(0).toUpperCase() : "";
        });

        document.querySelectorAll("[data-auth-logout]").forEach(function (btn) {
            btn.addEventListener("click", logout);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", wireChrome);
    } else {
        wireChrome();
    }
})();
