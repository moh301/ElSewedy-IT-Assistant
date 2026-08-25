# SWE IT Assist — Backend (PHP)

The same backend as `../backend` (the Node.js version), rebuilt in PHP with
a real database instead of a JSON file — for when plain PHP + MySQL hosting
(the kind most shared/cPanel hosting gives you for free) is the easier fit.
It exposes the exact same API, so the website doesn't care which one is
running behind it.

## Run it locally (zero setup — uses SQLite)

For a quick test with no database server at all, set `DB_DRIVER` to
`'sqlite'` in `config.php` (it defaults to `'mysql'`, which is the better
fit once you're running under XAMPP/Apache — see below). You need PHP with
the `pdo_sqlite` extension, which almost every PHP install has built in by
default.

```bash
cd backend-php
php -S localhost:8788 router.php
```

That's it — no `composer install`, no database server to start. It creates
`data/requests.sqlite` automatically on the first request.

Then point the website at it: open `../js/main.js` and set

```js
const SUPPORT_API_ENDPOINT = "http://localhost:8788/api/support-requests";
```

Open the admin dashboard at **http://localhost:8788/admin** and log in with
the API key printed nowhere on purpose — it's whatever `ADMIN_API_KEY` is
set to (`swe-it-admin-dev-key` by default, see Configuration below).

## Running it with XAMPP

1. Copy the **whole `swe-it-assist` project folder** (not just
   `backend-php`) into XAMPP's `htdocs`:
   - Windows: `C:\xampp\htdocs\swe-it-assist`
   - macOS: `/Applications/XAMPP/xamppfiles/htdocs/swe-it-assist`
   - Linux: `/opt/lampp/htdocs/swe-it-assist`
2. Open the XAMPP Control Panel and start **both Apache and MySQL** —
   `DB_DRIVER` now defaults to `'mysql'`, so a real MySQL database is used
   out of the box (matches XAMPP's default `root` user with no password).
   The database itself (`swe_it_assist`) and its table are created
   automatically on the first request — no phpMyAdmin step needed. If you'd
   rather not run MySQL at all, set `DB_DRIVER` back to `'sqlite'` in
   `backend-php/config.php`.
3. `SUPPORT_API_ENDPOINT` in `js/main.js` is computed automatically from
   the page's own URL, so it works no matter what you name the project
   folder — no edit needed.
4. Open the site at **http://localhost/swe-it-assist/index.html** (not by
   double-clicking the file — go through Apache so the routing works).
5. Try the "Other" form, then check
   **http://localhost/swe-it-assist/backend-php/admin/** with the API key
   (`swe-it-admin-dev-key` by default) to see it land. You can also browse
   the raw data any time in phpMyAdmin at **http://localhost/phpmyadmin**
   → the `swe_it_assist` database → `support_requests` table.

**If a request fails with "Access denied for user 'root'@'localhost'":**
your XAMPP's MySQL root user has a password set (not the default). Set
`DB_PASS` in `backend-php/config.php` to match it.

**If a request fails with "unable to open database file":** this only
applies when `DB_DRIVER` is `'sqlite'` — the `backend-php/data` folder
needs to be writable by whichever user Apache runs as. This is rarely an
issue on XAMPP (Windows/macOS XAMPP normally has no restriction here), but
if you hit it, giving that folder full read/write permissions fixes it.

## Deploying on real (shared/cPanel) hosting with MySQL

1. Upload the whole `backend-php/` folder to your hosting (e.g. into
   `public_html/it-assist-api/`).
2. In your host's control panel, create a MySQL database + user, and note
   the host/name/user/password (usually `localhost` and a name like
   `cpaneluser_swe_it_assist`).
3. Set these as environment variables if your host supports it, **or**
   just edit the defaults directly in `config.php`:
   - `DB_DRIVER=mysql`
   - `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`
   - `ADMIN_API_KEY` — change this to something private before going live
   - `ALLOWED_ORIGIN` — set to your real website's domain once it's live
4. The table is created automatically on first request (same
   `CREATE TABLE IF NOT EXISTS` as SQLite) — or run `schema.mysql.sql`
   yourself via phpMyAdmin if you'd rather see it first.
5. Update `SUPPORT_API_ENDPOINT` in `../js/main.js` to your live URL, e.g.
   `https://elsewedyelectric.com/it-assist-api/api/support-requests`.
6. On Apache hosting, the included `.htaccess` handles routing
   automatically (make sure `mod_rewrite` is enabled — it is on almost all
   shared hosting). `router.php` is only needed for local testing with
   `php -S` and can be left in place; it's simply never used on Apache.

## API (identical to the Node backend)

- `POST /api/support-requests` — create a request. Body:
  ```json
  {
    "name": "Ahmed Hassan",
    "email": "ahmed.hassan@elsewedyelectric.com",
    "details": "My laptop screen flickers when connected to the docking station.",
    "category": "software",
    "source": "website",
    "language": "en",
    "submittedAt": "2026-08-24T10:15:00.000Z"
  }
  ```
  Returns `201 { "ok": true, "id": "..." }`, or `400` with a list of
  validation errors.

- `GET /api/support-requests` — list every request, newest first.
  Requires header `x-api-key: <ADMIN_API_KEY>`.

- `PATCH /api/support-requests/{id}` with `{ "status": "in-progress" }` —
  update a request's status (`new` / `in-progress` / `resolved`). Requires
  the same `x-api-key` header. The admin dashboard's status dropdown uses
  this.

Because the AI chatbot your colleagues are building can call this exact
same endpoint with `"source": "chatbot"`, every support request — from the
website or the chat — lands in the same database.

## Employee login (mock, for demo purposes)

The whole site now sits behind `login.html` — visiting `index.html`,
`category.html`, or the chatbot without being signed in redirects there
automatically (see `js/auth.js`). Signing in checks the Employee ID + work
email against a real `employees` table, seeded automatically the first
time `db.php` runs (same auto-create pattern as `support_requests`) with
five demo accounts:

| Employee ID | Work email                        | Name             |
|-------------|-------------------------------------|------------------|
| `10234`     | `ahmed.hassan@elsewedy.com`         | Ahmed Hassan     |
| `10547`     | `mohamed.hazam@elsewedy.com`        | Mohamed Hazam    |
| `10892`     | `sara.ibrahim@elsewedy.com`         | Sara Ibrahim     |
| `11023`     | `youssif.zaghloul@elsewedy.com`     | Youssif Zaghloul |
| `11150`     | `mona.tarek@elsewedy.com`           | Mona Tarek       |

To add/remove employees for a real deployment, edit the `$demoEmployees`
array in `db.php` (only runs while the table is empty) or insert directly
into the `employees` table — see `schema.mysql.sql`.

This is intentionally lightweight: there's no real session or password —
just an Employee ID + a `@elsewedy.com` email that has to match a row in
the table. A successful login is remembered in the browser's
`sessionStorage` (cleared when the tab closes), not a server-side session.
That's enough to gate a static-HTML site like this one; it is **not**
meant to be real access control for sensitive data.

- `POST /api/auth/login` — body `{ "employeeId": "10234", "email":
  "ahmed.hassan@elsewedy.com" }`. Returns `200 { "ok": true, "user": {...}
  }` on a match, or `401` with an error message otherwise.
- `POST /api/auth/logout` — no body needed. Nothing to actually tear down
  server-side; it exists so the frontend's logout button has somewhere
  real to call.

## Configuration

All of these can be set as real environment variables (check your host's
"Environment Variables" or "PHP Settings" panel) or edited directly at the
top of `config.php`:

| Variable         | Default                | What it does                                                    |
|-------------------|-------------------------|--------------------------------------------------------------------|
| `DB_DRIVER`       | `mysql`                 | `mysql` (real database, needs a MySQL server running) or `sqlite` (zero setup, one file) |
| `DB_HOST`         | `localhost`              | MySQL host (ignored for SQLite)                                    |
| `DB_NAME`         | `swe_it_assist`          | MySQL database name (ignored for SQLite)                           |
| `DB_USER`         | `root`                   | MySQL user (ignored for SQLite)                                    |
| `DB_PASS`         | *(empty)*                | MySQL password (ignored for SQLite)                                |
| `ADMIN_API_KEY`   | `swe-it-admin-dev-key`   | Required in `x-api-key` to list/update requests — **change this**  |
| `ALLOWED_ORIGIN`  | `*`                      | Which origin(s) may call the API — lock to your real domain        |

## Switching to Power Automate later

Same story as the Node backend: if/when a shared Power Automate flow is
ready (see `../backend/README.md` for the full walkthrough), change one
line in `../js/main.js` to that flow's URL and nothing else needs to
change — this PHP backend, the Node one, and a Power Automate HTTP trigger
all just need to receive the same JSON shape.
