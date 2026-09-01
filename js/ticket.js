/* =========================================================
   TICKET.JS — EmailJS integration for IT Support Ticket form
   ========================================================= */

(function () {

    /* ---- EmailJS credentials ---- */

    const EMAILJS_SERVICE_ID = "service_112233";
    const EMAILJS_PUBLIC_KEY = "qeyyMhRDuUgIng67H";
    const EMAILJS_TEMPLATE_ID = "template_se5q8fs";
    const SUPPORT_EMAIL = "swe.it.support@gmail.com";

    /* Note on attachments: submission now uses emailjs.send() with a plain
       JSON params object (see the "submit" handler below), not
       emailjs.sendForm(). send() can't carry a real File/Blob, so the
       file-drop UI's selected file is never sent as a raw binary
       attachment — the ImgBB-hosted {{file_url}} link is the actual
       delivery mechanism for any image the user attaches. The file-drop
       UI in ticket.html still allows up to 20MB per file
       (MAX_ATTACHMENT_SIZE_MB there) purely as a client-side sanity limit
       before handing the file to ImgBB. */

    /* Initialize the EmailJS SDK once it's loaded on the page (v3 SDK) */
    if (window.emailjs && typeof window.emailjs.init === "function") {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("SWE Ticket: EmailJS SDK not found on page load. Check that the SDK <script> tag is included in ticket.html before js/ticket.js.");
    }

    /* =========================================================
       IMGBB IMAGE UPLOAD (attachment-link workaround)
       ---------------------------------------------------------
       The EmailJS free plan doesn't reliably deliver binary file
       attachments, so any *image* the user attaches is uploaded to ImgBB
       and its public viewable URL is sent along in the EmailJS payload as
       {{file_url}}. The support agent reading the email can then just
       click the link instead of depending on an attachment coming through.

       Get a free key at https://api.imgbb.com/ and paste it below. Until
       you do, the upload step is skipped (silently, so ticket submission
       still works — files are just not turned into a link). ---- */

    const IMGBB_API_KEY = "1efb8c582a74cfa170947b1366d7cf3a";

    // Maps a given File object -> its uploaded ImgBB URL, so the same file
    // is never uploaded twice (e.g. re-rendering the file list) and so a
    // removed file's URL is dropped along with it.
    const uploadedUrlByFile = new Map();

    // The most recent chain of in-flight ImgBB upload(s). The submit
    // handler awaits this before sending, so a ticket is never emailed
    // out mid-upload with a blank {{file_url}}.
    let pendingUploadChain = Promise.resolve();

    function isImageFile(file) {
        return !!(file && typeof file.type === "string" && file.type.indexOf("image/") === 0);
    }

    // Uploads a single image File to ImgBB and resolves with its public
    // "display url" (a normal https link, viewable in any browser/email
    // client — this is what gets dropped into {{file_url}}).
    function uploadFileToImgBB(file) {

        return new Promise(function (resolve, reject) {

            if (!IMGBB_API_KEY || IMGBB_API_KEY === "YOUR_IMGBB_API_KEY_HERE") {
                reject(new Error("ImgBB API key is not configured (IMGBB_API_KEY in js/ticket.js)."));
                return;
            }

            const reader = new FileReader();

            reader.onerror = function () {
                reject(new Error("Could not read \"" + file.name + "\" for upload."));
            };

            reader.onload = function () {

                // ImgBB's REST API accepts a raw Base64 string (no
                // "data:image/...;base64," prefix) in the "image" field.
                const base64Data = String(reader.result || "").split(",")[1] || "";

                const formData = new FormData();
                formData.append("image", base64Data);
                formData.append("name", file.name);

                fetch("https://api.imgbb.com/1/upload?key=" + IMGBB_API_KEY, {
                    method: "POST",
                    body: formData
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data && data.success && data.data && data.data.url) {
                            resolve(data.data.url);
                        } else {
                            reject(new Error((data && data.error && data.error.message) || "ImgBB upload failed."));
                        }
                    })
                    .catch(reject);
            };

            reader.readAsDataURL(file);

        });

    }

    /* Called from ticket.html every time the attached-file list changes
       (a file is added via the picker/drag-drop, or removed via the "✕"
       chip button). It:
         1. Drops cached URLs for files that are no longer attached.
         2. Uploads any newly-added image file(s) that haven't been
            uploaded yet.
         3. Shows/hides the "Uploading file..." status text in the UI
            while that's happening.
       Non-image files (logs, docs, etc.) are left alone — ImgBB only
       accepts images. Since submission now uses emailjs.send() (JSON
       params only, no Blob support), non-image files aren't emailed as a
       raw attachment either way; only {{file_url}} reaches the inbox. */
    window.SWE_processTicketAttachments = function (fileArray) {

        const files = Array.from(fileArray || []);

        const statusWrap = document.getElementById("fileUploadStatus");
        const statusText = document.getElementById("fileUploadStatusText");

        const language = window.SWE_TICKET_LANG || "en";
        const t = (window.TICKET_I18N && window.TICKET_I18N[language]) || {};
        const uploadingLabel = t.uploadingFile || "Uploading file...";

        // Forget URLs for files no longer in the attachment list.
        const stillAttached = new Set(files);
        uploadedUrlByFile.forEach(function (_url, cachedFile) {
            if (!stillAttached.has(cachedFile)) {
                uploadedUrlByFile.delete(cachedFile);
            }
        });

        const imagesToUpload = files.filter(function (file) {
            return isImageFile(file) && !uploadedUrlByFile.has(file);
        });

        if (imagesToUpload.length === 0) {
            if (statusWrap) statusWrap.classList.remove("show");
            if (statusText) statusText.textContent = "";
            pendingUploadChain = Promise.resolve();
            return pendingUploadChain;
        }

        if (statusWrap) statusWrap.classList.add("show");
        if (statusText) statusText.textContent = uploadingLabel;

        pendingUploadChain = Promise
            .all(
                imagesToUpload.map(function (file) {
                    return uploadFileToImgBB(file)
                        .then(function (url) {
                            uploadedUrlByFile.set(file, url);
                        })
                        .catch(function (err) {
                            // Upload failures shouldn't block ticket
                            // submission — just log it and move on
                            // without a link for that particular file.
                            console.warn("SWE Ticket: ImgBB upload failed for \"" + file.name + "\"", err);
                        });
                })
            )
            .then(function () {
                if (statusWrap) statusWrap.classList.remove("show");
                if (statusText) statusText.textContent = "";
            });

        return pendingUploadChain;

    };

    // Returns the (possibly still-uploading) promise for the most recent
    // batch of ImgBB uploads, so the submit handler can wait for it.
    window.SWE_waitForPendingTicketUploads = function () {
        return pendingUploadChain || Promise.resolve();
    };

    // Returns the viewable ImgBB URL(s) for whichever of the given files
    // have finished uploading, in attachment order.
    window.SWE_getTicketAttachmentUrls = function (fileArray) {
        return Array
            .from(fileArray || [])
            .map(function (file) {
                return uploadedUrlByFile.get(file);
            })
            .filter(Boolean);
    };

    /* ---- Helper: get logged-in user's details ----
       Primary source: localStorage.getItem('currentUser') (as requested).
       Fallback: the app's real session-auth record (sessionStorage, key
       window.SWE_AUTH_STORAGE_KEY / "swe_it_auth", set by js/login.js),
       via window.getAuthUser() exposed by js/auth.js. This fallback is
       what actually holds the signed-in employee's name/email in this
       codebase, so it's what makes the "name"/"email" fields dynamic
       instead of falling back to the template's placeholder sample data. */

    function getCurrentUser() {

        try {
            const raw = localStorage.getItem("currentUser");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && (parsed.name || parsed.fullName || parsed.email)) {
                    return parsed;
                }
            }
        } catch (err) {
            console.warn("SWE Ticket: could not parse currentUser from localStorage", err);
        }

        try {
            if (typeof window.getAuthUser === "function") {
                const authUser = window.getAuthUser();
                if (authUser) return authUser;
            } else {
                const authKey = window.SWE_AUTH_STORAGE_KEY || "swe_it_auth";
                const raw = localStorage.getItem(authKey);
                if (raw) return JSON.parse(raw);
            }
        } catch (err) {
            console.warn("SWE Ticket: could not read session auth user", err);
        }

        return null;
    }

    document.addEventListener("DOMContentLoaded", function () {

        const ticketForm = document.getElementById("ticketForm");
        const submitBtn = document.getElementById("submitBtn");
        const successPanel = document.getElementById("successPanel");
        const ticketRef = document.getElementById("ticketRef");
        const attachmentInput = document.getElementById("ticket-attachment");

        // Hidden fields inside #ticketForm (see ticket.html) — kept in
        // sync for consistency/backward-compat, though the actual send
        // below (emailjs.send()) is given its own explicit params object
        // rather than reading these off the <form>.
        const hiddenSenderName = document.getElementById("hiddenSenderName");
        const hiddenSenderEmail = document.getElementById("hiddenSenderEmail");
        const hiddenReplyTo = document.getElementById("hiddenReplyTo");
        const hiddenTitle = document.getElementById("hiddenTitle");
        const hiddenMessage = document.getElementById("hiddenMessage");
        const hiddenToEmail = document.getElementById("hiddenToEmail");
        const hiddenTicketRef = document.getElementById("hiddenTicketRef");
        const hiddenFileUrl = document.getElementById("hiddenFileUrl");

        if (!ticketForm) return;

        ticketForm.addEventListener("submit", async function (event) {

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

            try {

                // Wait for any in-flight ImgBB upload(s) to finish FIRST —
                // this is the whole guarantee that {{file_url}} is never
                // sent blank when there's actually an image attached.
                if (typeof window.SWE_waitForPendingTicketUploads === "function") {
                    await window.SWE_waitForPendingTicketUploads();
                }

                const currentUser = getCurrentUser();

                const fullNameField = document.getElementById("fullName");
                const emailIdField = document.getElementById("emailId");
                const categoryField = document.getElementById("category");
                const priorityField = document.getElementById("priority");
                const subjectField = document.getElementById("subject");
                const descriptionField = document.getElementById("description");

                const refNumber = "TCK-" + Math.floor(100000 + Math.random() * 900000);

                // Dynamic sender name/email: logged-in user first, then
                // whatever the person actually typed into the form.
                const senderName =
                    (currentUser && (currentUser.name || currentUser.fullName)) ||
                    fullNameField.value;

                const senderEmail =
                    (currentUser && (currentUser.email || currentUser.emailId)) ||
                    emailIdField.value;

                console.log("SWE Ticket: resolved sender", { currentUser: currentUser, senderName: senderName, senderEmail: senderEmail });

                const attachedCount = attachmentInput && attachmentInput.files ? attachmentInput.files.length : 0;
                console.log("SWE Ticket: files on #ticket-attachment at submit time", attachedCount);

                // Any image(s) among the current attachments that finished
                // uploading to ImgBB (guaranteed done by now thanks to the
                // "await" above) — joined into one multi-line value so the
                // EmailJS template's {{file_url}} shows one link per line
                // when there's more than one.
                const attachmentUrls = (typeof window.SWE_getTicketAttachmentUrls === "function")
                    ? window.SWE_getTicketAttachmentUrls(attachmentInput ? attachmentInput.files : [])
                    : [];

                const fileUrl = attachmentUrls.join("\n");

                // Guard: if an image was attached but, for whatever reason
                // (bad key, network failure, ImgBB down), it never resolved
                // to a URL, don't silently email out a blank {{file_url}}.
                // Stop and tell the user instead of pretending the ticket
                // includes a link when it doesn't.
                const hasImageAttachment = attachedCount > 0 && Array.from(attachmentInput.files).some(function (file) {
                    return file && typeof file.type === "string" && file.type.indexOf("image/") === 0;
                });

                if (hasImageAttachment && !fileUrl) {
                    throw new Error("The attached image could not be uploaded to ImgBB, so no link is available yet. Please remove and re-attach the file, then try again.");
                }

                // Keep the hidden form fields in sync too (harmless, and
                // useful if anything else in the page still reads them),
                // even though emailjs.send() below is given its own
                // explicit params object rather than reading the <form>.
                if (hiddenSenderName) hiddenSenderName.value = senderName;
                if (hiddenSenderEmail) hiddenSenderEmail.value = senderEmail;
                if (hiddenReplyTo) hiddenReplyTo.value = senderEmail;
                if (hiddenTitle) hiddenTitle.value = subjectField.value;
                if (hiddenMessage) hiddenMessage.value = descriptionField.value;
                if (hiddenToEmail) hiddenToEmail.value = SUPPORT_EMAIL;
                if (hiddenTicketRef) hiddenTicketRef.value = refNumber;
                if (hiddenFileUrl) hiddenFileUrl.value = fileUrl;

                /* emailjs.send() takes a plain JSON object of template
                   variables — it can't carry a File/Blob the way
                   sendForm() could, which is fine here since the ImgBB
                   link (file_url) is the actual delivery mechanism for
                   attachments now. Make sure the EmailJS template
                   (template_se5q8fs) uses these exact variable names:
                   {{full_name}}, {{email_id}}, {{title}}, {{category}},
                   {{priority}}, {{message}}, {{ticket_ref}}, {{file_url}}. */
                const templateParams = {
                    full_name: senderName,
                    email_id: senderEmail,
                    title: subjectField.value,
                    category: categoryField ? categoryField.value : "",
                    priority: priorityField ? priorityField.value : "",
                    message: descriptionField.value,
                    ticket_ref: refNumber,
                    file_url: fileUrl,
                    // Kept alongside the new names so a template written
                    // against the previous {{reply_to}}/{{to_email}}
                    // variables (for Reply-To / recipient routing) still
                    // works without edits.
                    reply_to: senderEmail,
                    to_email: SUPPORT_EMAIL
                };

                const response = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

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

            } catch (error) {

                /* Log full detail to console for debugging, and surface
                   the actual EmailJS error text/status (or the file-upload
                   guard message above) in the alert so failures are easy
                   to diagnose instead of silent. */
                console.error("SWE Ticket: ticket submission failed", error);

                const errorDetail = (error && (error.text || error.message)) ||
                    (typeof error === "string" ? error : JSON.stringify(error));

                alert(
                    "Your ticket could not be sent.\n\n" +
                    "Error: " + errorDetail + "\n\n" +
                    "Please check your connection and try again, or contact IT support directly if the problem persists."
                );

            } finally {

                submitBtn.disabled = false;

                if (submitBtnLabel && originalLabel) {
                    submitBtnLabel.textContent = originalLabel;
                }

            }

        });

    });

})();
