<?php
/**
 * Already ran once — the employees table now has the intended demo
 * accounts. Disabled so this endpoint can't reset the table again by
 * accident (or by anyone who happens to hit the URL). Safe to delete
 * this file entirely.
 */
http_response_code(410);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => false, 'error' => 'This one-time script already ran and is now disabled.']);
