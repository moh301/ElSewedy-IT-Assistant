<?php
/**
 * Returns a single shared PDO connection, creating the SQLite file/table
 * automatically the first time (MySQL: run schema.mysql.sql once, or let
 * this create the table for you too — it uses "IF NOT EXISTS" either way).
 */

require_once __DIR__ . '/config.php';

function get_db_connection(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    if (DB_DRIVER === 'mysql') {
        // Connect without naming a database first, so the database itself
        // can be created automatically if it doesn't exist yet — no manual
        // phpMyAdmin step required, same "just works" experience as SQLite.
        $rootPdo = new PDO('mysql:host=' . DB_HOST . ';charset=utf8mb4', DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
        $rootPdo->exec(
            'CREATE DATABASE IF NOT EXISTS `' . DB_NAME . '` ' .
            'CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
        );

        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        $pdo->exec("CREATE TABLE IF NOT EXISTS support_requests (
            id VARCHAR(36) PRIMARY KEY,
            name VARCHAR(190) NOT NULL,
            email VARCHAR(190) NOT NULL,
            details TEXT NOT NULL,
            category VARCHAR(50) NOT NULL,
            source VARCHAR(50) NOT NULL,
            language VARCHAR(10) NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'new',
            submitted_at VARCHAR(40) NOT NULL,
            received_at VARCHAR(40) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    } else {
        $dataDir = __DIR__ . '/data';
        if (!is_dir($dataDir)) mkdir($dataDir, 0775, true);
        $dbFile = $dataDir . '/requests.sqlite';

        $pdo = new PDO('sqlite:' . $dbFile, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        $pdo->exec('PRAGMA journal_mode = WAL');
        $pdo->exec("CREATE TABLE IF NOT EXISTS support_requests (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            details TEXT NOT NULL,
            category TEXT NOT NULL,
            source TEXT NOT NULL,
            language TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'new',
            submitted_at TEXT NOT NULL,
            received_at TEXT NOT NULL
        )");
    }

    return $pdo;
}

function generate_uuid(): string {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
