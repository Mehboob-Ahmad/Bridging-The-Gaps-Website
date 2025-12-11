<?php
// php/config.php
// Edit these values or set environment variables
$DB_HOST = getenv('MYSQL_HOST') ?: '127.0.0.1';
$DB_PORT = getenv('MYSQL_PORT') ?: '3306';
$DB_NAME = getenv('MYSQL_DB') ?: 'bridging_the_gaps';
$DB_USER = getenv('MYSQL_USER') ?: 'root';
$DB_PASS = getenv('MYSQL_PASS') ?: '';
$ADMIN_EMAIL = getenv('ADMIN_EMAIL') ?: 'unsdg10@gmail.com';

$UPLOAD_DIR = __DIR__ . '/../uploads';
if (!file_exists($UPLOAD_DIR)) mkdir($UPLOAD_DIR, 0755, true);

// PDO connection
$dsn = "mysql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};charset=utf8mb4";
try {
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed: ' . $e->getMessage()]);
    exit;
}

// Start session and CSRF helpers
if (session_status() === PHP_SESSION_NONE) session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(24));
}
function csrf_token() { return $_SESSION['csrf_token'] ?? ''; }
function validate_csrf($token) { return hash_equals($_SESSION['csrf_token'] ?? '', $token ?? ''); }

?>