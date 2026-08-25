<?php
/**
 * The shared intake endpoint. The website's "Other" form — and, later,
 * the AI chatbot — both POST here with the exact same JSON shape, so
 * every support request ends up in one place no matter where it came from.
 *
 *   POST   /api/support-requests        create a request (public)
 *   GET    /api/support-requests        list all requests   (needs x-api-key)
 *   PATCH  /api/support-requests/{id}   update a status      (needs x-api-key)
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Headers: Content-Type, x-api-key');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

// Uses mb_strlen when the mbstring extension is available (it is on
// virtually every real host, including XAMPP), and falls back to strlen
// otherwise so this never hard-crashes on a minimal PHP install.
function str_length(string $s): int {
    return function_exists('mb_strlen') ? mb_strlen($s) : strlen($s);
}

function json_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function require_admin_key(): void {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $key = $headers['x-api-key'] ?? $headers['X-Api-Key'] ?? ($_SERVER['HTTP_X_API_KEY'] ?? null);
    if ($key === null || !hash_equals(ADMIN_API_KEY, (string)$key)) {
        http_response_code(401);
        echo json_encode(['error' => 'Missing or invalid x-api-key header.']);
        exit;
    }
}

$pdo = get_db_connection();
$validCategories = ['network', 'accounts', 'email', 'printing', 'software', 'other'];
$validStatuses = ['new', 'in-progress', 'resolved'];

/* ---------- POST: create ---------- */
if ($method === 'POST') {
    $body = json_body();

    // name/email are optional — the "Other" form on the website no longer
    // asks for them, so default to a placeholder rather than rejecting the
    // request. If a caller (e.g. a future chatbot) does send them, they're
    // still validated below.
    $name = trim((string)($body['name'] ?? '')) ?: 'Website visitor';
    $email = trim((string)($body['email'] ?? ''));
    $details = trim((string)($body['details'] ?? ''));
    $category = in_array($body['category'] ?? '', $validCategories, true) ? $body['category'] : 'other';
    $source = !empty($body['source']) ? (string)$body['source'] : 'unknown';
    $language = !empty($body['language']) ? (string)$body['language'] : 'en';
    $submittedAt = !empty($body['submittedAt']) ? (string)$body['submittedAt'] : gmdate('c');

    $errors = [];
    if (str_length($name) < 2) $errors[] = 'name must be at least 2 characters.';
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email must be a valid email address.';
    if (str_length($details) < 12) $errors[] = 'details must be at least 12 characters.';
    if (str_length($details) > 2000) $errors[] = 'details must be under 2000 characters.';

    if ($errors) {
        http_response_code(400);
        echo json_encode(['error' => 'Validation failed.', 'details' => $errors]);
        exit;
    }

    $id = generate_uuid();
    $stmt = $pdo->prepare(
        "INSERT INTO support_requests
            (id, name, email, details, category, source, language, status, submitted_at, received_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)"
    );
    $stmt->execute([$id, $name, $email, $details, $category, $source, $language, $submittedAt, gmdate('c')]);

    error_log("[support-request] $category — $name <$email> via $source");

    http_response_code(201);
    echo json_encode(['ok' => true, 'id' => $id]);
    exit;
}

/* ---------- GET: list (admin) ---------- */
if ($method === 'GET') {
    require_admin_key();

    $rows = $pdo->query('SELECT * FROM support_requests ORDER BY received_at DESC')->fetchAll();
    $out = array_map(static function ($r) {
        return [
            'id' => $r['id'],
            'name' => $r['name'],
            'email' => $r['email'],
            'details' => $r['details'],
            'category' => $r['category'],
            'source' => $r['source'],
            'language' => $r['language'],
            'status' => $r['status'],
            'submittedAt' => $r['submitted_at'],
            'receivedAt' => $r['received_at'],
        ];
    }, $rows);

    echo json_encode($out);
    exit;
}

/* ---------- PATCH: update status (admin) ---------- */
if ($method === 'PATCH') {
    require_admin_key();

    $id = $_GET['id'] ?? '';
    $body = json_body();
    $status = $body['status'] ?? '';

    if ($id === '' || !in_array($status, $validStatuses, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'status must be one of: ' . implode(', ', $validStatuses)]);
        exit;
    }

    $check = $pdo->prepare('SELECT id FROM support_requests WHERE id = ?');
    $check->execute([$id]);
    if (!$check->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Request not found.']);
        exit;
    }

    $update = $pdo->prepare('UPDATE support_requests SET status = ? WHERE id = ?');
    $update->execute([$status, $id]);

    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
