/* =========================================================
   TICKET.JS — EmailJS integration for IT Support Ticket form
   ========================================================= */

(function () {

    /* ---- EmailJS credentials ---- */

    const EMAILJS_SERVICE_ID = "service_112233";
    const EMAILJS_PUBLIC_KEY = "qeyyMhRDuUgIng67H";
    const EMAILJS_TEMPLATE_ID = "template_se5q8fs";
    const SUPPORT_EMAIL = "swe.it.support@gmail.com";

    /* Initialize the EmailJS SDK once it's loaded on the page (v3 SDK) */
    if (window.emailjs && typeof window.emailjs.init === "function") {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("SWE Ticket: EmailJS SDK not found on page load. Check that the SDK <script> tag is included in ticket.html before js/ticket.js.");
    }

    /* ---- Helper: get logged-in user's details from localStorage ---- */

    function getCurrentUser() {
        try {
            const raw = localStorage.getItem("currentUser");
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (err) {
            console.warn("SWE Ticket: could not parse currentUser from localStorage", err);
            return null;
        }
    }

    document.addEventListener("DOMContentLoaded", function () {

        const ticketForm = document.getElementById("ticketForm");
        const submitBtn = document.getElementById("submitBtn");
        const successPanel = document.getElementById("successPanel");
        const ticketRef = document.getElementById("ticketRef");

        if (!ticketForm) return;

        ticketForm.addEventListener("submit", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (!ticketForm.checkValidity()) {
                ticketForm.reportValidity();
                return;
            }

            if (!window.emailjs || typeof window.emailjs.send !== "function") {
                console.error("SWE Ticket: EmailJS SDK is not loaded or emailjs.send is unavailable.");
                alert("Unable to submit the ticket: the email service failed to load. Please refresh the page and try again.");
                return;
            }

            const language = window.SWE_TICKET_LANG || "en";
            const t = (window.TICKET_I18N && window.TICKET_I18N[language]) || {};

            submitBtn.disabled = true;

            const submitBtnLabel = submitBtn.querySelector("span");
            const originalLabel = submitBtnLabel ? submitBtnLabel.textContent : null;

            if (submitBtnLabel && t.submitting) {
                submitBtnLabel.textContent = t.submitting;
            }

            const currentUser = getCurrentUser();

            const fullNameField = document.getElementById("fullName");
            const emailIdField = document.getElementById("emailId");
            const categoryField = document.getElementById("category");
            const priorityField = document.getElementById("priority");
            const subjectField = document.getElementById("subject");
            const descriptionField = document.getElementById("description");

            const refNumber = "TCK-" + Math.floor(100000 + Math.random() * 900000);

            const senderName = (currentUser && (currentUser.name || currentUser.fullName)) || fullNameField.value;
            const senderEmail = (currentUser && (currentUser.email || currentUser.emailId)) || emailIdField.value;

            /* Template params: include EmailJS's conventional short names
               (name, email, title, message) alongside descriptive aliases,
               so this works regardless of which variable names the
               template_se5q8fs template was authored with. */
            const templateParams = {
                // Conventional / commonly-used EmailJS template variables
                name: senderName,
                email: senderEmail,
                title: subjectField.value,
                message: descriptionField.value,

                // Recipient
                to_email: SUPPORT_EMAIL,
                to_name: "IT Support",

                // Descriptive aliases (in case the template uses these instead)
                from_name: senderName,
                from_email: senderEmail,
                reply_to: senderEmail,
                full_name: fullNameField.value,
                email_id: emailIdField.value,
                subject: subjectField.value,
                description: descriptionField.value,
                category: categoryField.value,
                priority: priorityField.value,
                ticket_ref: refNumber
            };

            console.log("SWE Ticket: sending EmailJS request", {
                serviceId: EMAILJS_SERVICE_ID,
                templateId: EMAILJS_TEMPLATE_ID,
                templateParams: templateParams
            });

            window.emailjs
                .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function (response) {

                    console.log("SWE Ticket: EmailJS send succeeded", response);

                    if (ticketRef) {
                        ticketRef.textContent = refNumber;
                    }

                    ticketForm.classList.add("hide");

                    if (successPanel) {
                        successPanel.classList.add("show");
                    }

                    ticketForm.reset();

                    if (typeof window.SWE_resetTicketFileList === "function") {
                        window.SWE_resetTicketFileList();
                    }

                    alert(t.confirmationMessage || ("Your ticket (" + refNumber + ") has been submitted successfully. Our IT team will follow up with you shortly."));

                })
                .catch(function (error) {

                    /* Log full detail to console for debugging, and surface
                       the actual EmailJS error text/status in the alert so
                       failures are easy to diagnose instead of silent. */
                    console.error("SWE Ticket: EmailJS send failed", error);

                    const errorDetail = (error && (error.text || error.message)) ||
                        (typeof error === "string" ? error : JSON.stringify(error));

                    alert(
                        "Your ticket could not be sent.\n\n" +
                        "Error: " + errorDetail + "\n\n" +
                        "Please check your connection and try again, or contact IT support directly if the problem persists."
                    );

                })
                .finally(function () {

                    submitBtn.disabled = false;

                    if (submitBtnLabel && originalLabel) {
                        submitBtnLabel.textContent = originalLabel;
                    }

                });

        });

    });

})();
