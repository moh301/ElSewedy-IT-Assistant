/* =========================================================================
   SWE IT Assist — Login page logic
   ========================================================================= */

(function () {
    var LOGIN_ENDPOINT = new URL("backend-php/api/auth/login", window.location.href).href;
    var AUTH_STORAGE_KEY = window.SWE_AUTH_STORAGE_KEY || "swe_it_auth";

    // Only accept a same-site relative redirect target — never send the
    // user off to an arbitrary external URL from a query string.
    function safeRedirectTarget() {
        var raw = new URLSearchParams(window.location.search).get("redirect");
        if (!raw) return "index.html";
        if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) return "index.html";
        return raw;
    }

    // Already signed in? Skip straight past the login form.
    (function redirectIfAlreadySignedIn() {
        try {
            var raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
            if (raw && JSON.parse(raw).employeeId) {
                window.location.replace(safeRedirectTarget());
            }
        } catch (e) { /* ignore, just show the form */ }
    })();

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("loginForm");
        if (!form) return;

        var idInput = document.getElementById("employeeId");
        var emailInput = document.getElementById("workEmail");
        var errorEl = document.getElementById("loginError");
        var submitBtn = document.getElementById("loginSubmit");
        var submitLabel = document.getElementById("loginSubmitLabel");

        function currentAuthCopy() {
            var code = (typeof detectInitialLang === "function") ? detectInitialLang() : "en";
            return (typeof I18N !== "undefined" && I18N[code] && I18N[code].auth) || {
                errorEmpty: "Enter your Employee ID and work email.",
                errorFormat: "Use your work email, e.g. name@elsewedy.com.",
                errorInvalid: "We couldn’t match that Employee ID with that email address.",
                errorGeneric: "Something went wrong while signing in. Please try again.",
                signIn: "Sign in",
                signingIn: "Signing in…"
            };
        }

        function showError(message) {
            if (!errorEl) return;
            errorEl.innerHTML = (typeof icon === "function" ? icon("warn") + " " : "") + (typeof escapeHTML === "function" ? escapeHTML(message) : message);
            errorEl.classList.add("show");
        }

        function clearError() {
            if (!errorEl) return;
            errorEl.classList.remove("show");
            errorEl.textContent = "";
        }

        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            clearError();

            var auth = currentAuthCopy();
            var employeeId = (idInput.value || "").trim();
            var email = (emailInput.value || "").trim();

            if (!employeeId || !email) {
                showError(auth.errorEmpty);
                return;
            }
            if (!/^[^\s@]+@elsewedy\.com$/i.test(email)) {
                showError(auth.errorFormat);
                return;
            }

            submitBtn.disabled = true;
            var originalLabel = submitLabel ? submitLabel.textContent : "";
            if (submitLabel) submitLabel.textContent = auth.signingIn;

            try {
                var res = await fetch(LOGIN_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ employeeId: employeeId, email: email })
                });
                var data = await res.json().catch(function () { return {}; });

                if (!res.ok || !data.ok) {
                    showError(res.status === 401 ? auth.errorInvalid : (data.error || auth.errorGeneric));
                    return;
                }

                sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
                window.location.href = safeRedirectTarget();
            } catch (err) {
                console.error("Login failed:", err);
                showError(auth.errorGeneric);
            } finally {
                submitBtn.disabled = false;
                if (submitLabel) submitLabel.textContent = originalLabel;
            }
        });
    });
})();
