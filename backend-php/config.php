<?php
/**
 * Central configuration. Every value can be overridden with a real
 * environment variable (e.g. set in your hosting control panel), so
 * nothing sensitive has to be hard-coded when you deploy this for real.
 *
 * The env var names are prefixed with SWE_ (SWE_DB_NAME, not DB_NAME) on
 * purpose: generic names like DB_NAME/DB_HOST/DB_USER are extremely common
 * and a dev machine that already has other local projects (Laravel, Node,
 * etc.) very often has a leftover system-wide environment variable with
 * one of those exact generic names — which would silently redirect this
 * app at a completely different, already-existing database. Prefixing
 * avoids that collision entirely.
 */

// 'mysql'   — a real MySQL database (uses XAMPP's bundled MySQL/MariaDB —
//             just make sure it's started in the XAMPP Control Panel).
//             The database and table are created automatically on first
//             use, so no manual phpMyAdmin step is required.
// 'sqlite'  — zero setup, stores everything in data/requests.sqlite
//             instead. Handy for a quick local test with no MySQL at all.
define('DB_DRIVER', getenv('SWE_DB_DRIVER') ?: 'sqlite');

define('DB_HOST', getenv('SWE_DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('SWE_DB_NAME') ?: 'swe_it_assist');
define('DB_USER', getenv('SWE_DB_USER') ?: 'root');
define('DB_PASS', getenv('SWE_DB_PASS') ?: '');

// Required in the "x-api-key" header to list or update requests
// (the /admin dashboard asks for this). CHANGE THIS before deploying.
define('ADMIN_API_KEY', getenv('SWE_ADMIN_API_KEY') ?: 'swe-it-admin-dev-key');

// Which origin(s) the website (and later the chatbot) may call this API
// from. "*" is fine for local testing; lock it down once deployed.
define('ALLOWED_ORIGIN', getenv('SWE_ALLOWED_ORIGIN') ?: '*');
