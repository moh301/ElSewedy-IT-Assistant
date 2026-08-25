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

-- Mock "HR directory" the login page checks Employee ID + work email
-- against (see backend-php/api/auth.php). db.php seeds these same 5 rows
-- automatically the first time it runs, so this file is just for
-- reference / manual setup.
CREATE TABLE IF NOT EXISTS employees (
    employee_id VARCHAR(20) PRIMARY KEY,
    email VARCHAR(190) NOT NULL,
    name VARCHAR(190) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO employees (employee_id, email, name) VALUES
    ('10234', 'ahmed.hassan@elsewedy.com', 'Ahmed Hassan'),
    ('10547', 'mohamed.hazam@elsewedy.com', 'Mohamed Hazam'),
    ('10892', 'sara.ibrahim@elsewedy.com', 'Sara Ibrahim'),
    ('11023', 'youssif.zaghloul@elsewedy.com', 'Youssif Zaghloul'),
    ('11150', 'mona.tarek@elsewedy.com', 'Mona Tarek');
