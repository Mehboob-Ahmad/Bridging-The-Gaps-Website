<?php
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$email = isset($_POST['email']) ? strtolower(trim($_POST['email'])) : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password required']);
    exit;
}

// check existing
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['error' => 'User exists']);
    exit;
}

$avatarPath = null;
if (!empty($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
    $tmp = $_FILES['avatar']['tmp_name'];
    $orig = basename($_FILES['avatar']['name']);
    $ext = pathinfo($orig, PATHINFO_EXTENSION);
    $filename = time() . '-' . bin2hex(random_bytes(6)) . ($ext ? '.' . $ext : '');
    $dest = $UPLOAD_DIR . '/' . $filename;
    if (move_uploaded_file($tmp, $dest)) {
        $avatarPath = '/uploads/' . $filename;
    }
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$id = bin2hex(random_bytes(16));
$created_at = date('Y-m-d H:i:s');

// role defaults to 'user'
$ins = $pdo->prepare('INSERT INTO users (id, name, email, role, password_hash, avatar, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
try {
    $ins->execute([$id, $name, $email, 'user', $hash, $avatarPath, $created_at]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Insert failed: ' . $e->getMessage()]);
    exit;
}

// attempt to mail user and admin (mail() depends on server config)
$subject = "BRIDGING THE GAPS — account created";
$body = "Hello " . ($name ?: $email) . "\n\nYour account has been created.\nIf you didn't create it, contact admin at {$ADMIN_EMAIL}.\n\nRegards,\nBRIDGING THE GAPS";
@mail($email . ',' . $ADMIN_EMAIL, $subject, $body);

// start session
// session already started in config.php; set user including role and csrf
$_SESSION['user'] = ['id' => $id, 'name' => $name, 'email' => $email, 'avatar' => $avatarPath, 'role' => 'user'];
$_SESSION['csrf_token'] = $_SESSION['csrf_token'] ?? bin2hex(random_bytes(24));

echo json_encode(['ok' => true, 'user' => $_SESSION['user']]);
?>