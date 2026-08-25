-- Run this once against your MySQL database if you'd rather set the table
-- up yourself (e.g. via phpMyAdmin) than let db.php create it automatically
-- on first request. Either way works — this file is just for reference.

CREATE TABLE IF NOT EXISTS support_requests (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
