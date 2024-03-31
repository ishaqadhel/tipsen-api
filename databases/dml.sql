-- positions seeder
INSERT INTO positions (name, created_at, updated_at) VALUES
    ('Chief Executive Officer', NOW(), NOW()),
    ('Chief Technology Officer', NOW(), NOW()),
    ('Chief Operation Officer', NOW(), NOW()),
    ('Chief Product Officer', NOW(), NOW()),
    ('VP of Engineering', NOW(), NOW()),
    ('Engineering Manager', NOW(), NOW()),
    ('Senior Software Engineer', NOW(), NOW()),
    ('Software Engineer', NOW(), NOW());

-- admin seeder (password)
INSERT INTO users (code, name, email, password, gender, is_admin, created_at, updated_at, position_id) VALUES
    ('EMP-1', 'admin', 'admin@example.com', '$2b$10$fp6Q4UEaiheXxIcsEDWr4OrI5U4PgBJR2B.TfUXKC9lH7FJT0tlAC', 'M', true, NOW(), NOW(), 2);