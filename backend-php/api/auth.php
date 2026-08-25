<?php
/**
 * A small mock login check against the "employees" table (see db.php —
 * it's auto-seeded with a handful of demo accounts the first time this
 * runs). There's no real session/identity system behind this: a
 * successful login just returns the matched employee's public info, and
 * the frontend remembers it in sessionStorage for the rest of the visit
 * (see js/auth.js). That's intentionally lightweight — this app has no
 * server-rendered pages to protect, only static HTML + client-side JS.
 *
 *   POST /api/auth/login    { employeeId, email } -> { ok, user }
 *   POST /api/auth/logout   (no body needed)       -> { ok }
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

function json_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

$action = $_GET['action'] ?? '';

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

if ($action === 'login') {
    $body = json_body();
    $employeeId = trim((string)($body['employeeId'] ?? ''));
    $email = trim((string)($body['email'] ?? ''));

    $validFormat = $employeeId !== ''
        && $email !== ''
        && filter_var($email, FILTER_VALIDATE_EMAIL)
        && preg_match('/@elsewedy\.com$/i', $email);

    if (!$validFormat) {
        http_response_code(400);
        echo json_encode(['error' => 'Enter a valid Employee ID and a work email ending in @elsewedy.com.']);
        exit;
    }

    $pdo = get_db_connection();
    $stmt = $pdo->prepare('SELECT employee_id, email, name FROM employees WHERE employee_id = ? AND LOWER(email) = LOWER(?)');
    $stmt->execute([$employeeId, $email]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => "We couldn't match that Employee ID with that email address."]);
        exit;
    }

    echo json_encode([
        'ok' => true,
        'user' => [
            'employeeId' => $user['employee_id'],
            'email' => $user['email'],
            'name' => $user['name'],
        ],
    ]);
    exit;
}

if ($action === 'logout') {
    // Nothing server-side to tear down (no PHP session is used) — this
    // exists purely so the frontend's logout call has somewhere real to
    // POST to, matching the shape of every other endpoint in this app.
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not found.']);
