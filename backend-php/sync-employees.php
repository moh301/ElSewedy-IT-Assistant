<?php
/**
 * Utility endpoint: makes the LOCAL employees table match the list in
 * demo_employees() (see db.php) exactly — wipes it and reinserts that
 * list. Never touches support_requests.
 *
 * WHY THIS EXISTS
 * seed_employees() in db.php only auto-seeds employees into a brand-new,
 * EMPTY database. And data/requests.sqlite is git-ignored on purpose
 * (see backend-php/.gitignore) — a database file isn't something git can
 * usefully merge between teammates, so everyone on the team runs this
 * project against their own separate local database.
 *
 * That means when the demo employee list in db.php changes and you push
 * that to GitHub, a teammate who `git pull`s the change gets the new
 * CODE, but their own local database already has rows in its employees
 * table from the first time they ever ran the project — so
 * seed_employees() skips it, and their login still checks against the
 * OLD list. Symptom: an account that existed in both the old and new
 * list (unchanged) still works, but anything added/changed/removed
 * fails to log in for them, even though the code on their machine is
 * up to date.
 *
 * FIX: after pulling a change to demo_employees(), open this URL once
 * (locally, on your own XAMPP):
 *
 *   http://localhost/ElSewedy-IT-Assistant/backend-php/sync-employees.php?key=YOUR_ADMIN_API_KEY
 *
 * (the key is ADMIN_API_KEY from config.php — an x-api-key header works
 * too, same as the admin dashboard). That's it — your local employees
 * table now matches the code, and your submitted tickets are untouched.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

$headers = function_exists('getallheaders') ? getallheaders() : [];
$key = $headers['x-api-key']
    ?? $headers['X-Api-Key']
    ?? ($_SERVER['HTTP_X_API_KEY'] ?? null)
    ?? ($_GET['key'] ?? null);

if ($key === null || !hash_equals(ADMIN_API_KEY, (string)$key)) {
    http_response_code(401);
    echo json_encode([
        'error' => 'Missing or invalid key. Pass ?key=YOUR_ADMIN_API_KEY in the URL, or an x-api-key header — the key is ADMIN_API_KEY in config.php.',
    ]);
    exit;
}

$pdo = get_db_connection();
$pdo->exec('DELETE FROM employees');

$stmt = $pdo->prepare('INSERT INTO employees (employee_id, email, name) VALUES (?, ?, ?)');
foreach (demo_employees() as $row) {
    $stmt->execute($row);
}

$current = $pdo->query('SELECT employee_id, email, name FROM employees')->fetchAll();

echo json_encode([
    'ok' => true,
    'message' => 'Local employees table now matches demo_employees() in db.php.',
    'employees' => $current,
], JSON_PRETTY_PRINT);
