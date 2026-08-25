<?php
/**
 * Only used for local testing with PHP's built-in server:
 *   php -S localhost:8788 router.php
 *
 * On real Apache hosting, .htaccess handles this instead — you don't need
 * this file there at all.
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve real files (css/js/images if you ever add any) as-is.
if ($uri !== '/' && file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri)) {
    return false;
}

if (preg_match('#^/api/support-requests/([^/]+)$#', $uri, $m)) {
    $_GET['id'] = $m[1];
    require __DIR__ . '/api/support-requests.php';
    return true;
}

if ($uri === '/api/support-requests') {
    require __DIR__ . '/api/support-requests.php';
    return true;
}

if ($uri === '/api/auth/login' || $uri === '/api/auth/logout') {
    $_GET['action'] = $uri === '/api/auth/login' ? 'login' : 'logout';
    require __DIR__ . '/api/auth.php';
    return true;
}

if ($uri === '/health') {
    require __DIR__ . '/health.php';
    return true;
}

if ($uri === '/admin' || $uri === '/admin/') {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/admin/index.html');
    return true;
}

http_response_code(404);
echo json_encode(['error' => 'Not found.']);
return true;
