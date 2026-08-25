<?php
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => true, 'service' => 'swe-it-assist-backend-php', 'time' => gmdate('c')]);
