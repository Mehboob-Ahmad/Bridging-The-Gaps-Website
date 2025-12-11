<?php
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');
$
// ensure admin by role
if (empty($_SESSION['user']) || ($_SESSION['user']['role'] ?? '') !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'forbidden']);
    exit;
}
$action = $_REQUEST['action'] ?? '';
try {
    if ($action === 'list_users') {
        $stmt = $pdo->query('SELECT id, name, email, avatar, created_at FROM users ORDER BY created_at DESC');
        $rows = $stmt->fetchAll();
        echo json_encode(['users' => $rows]);
        exit;
    }

    if ($action === 'delete_user') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'method not allowed']); exit; }
        $csrf = $_POST['csrf'] ?? $_REQUEST['csrf'] ?? '';
        if (!validate_csrf($csrf)) { http_response_code(403); echo json_encode(['error'=>'invalid_csrf']); exit; }
        $id = $_POST['id'] ?? '';
        if (!$id) { http_response_code(400); echo json_encode(['error'=>'id required']); exit; }
        // delete user (this will not cascade delete uploads)
        $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['ok'=>true]); exit;
    }

    if ($action === 'list_donations') {
        $stmt = $pdo->query('SELECT d.id, d.user_id, d.amount, d.slip_path, d.created_at, u.email as user_email FROM donations d LEFT JOIN users u ON d.user_id = u.id ORDER BY d.created_at DESC');
        $rows = $stmt->fetchAll();
        echo json_encode(['donations' => $rows]); exit;
    }

    if ($action === 'delete_donation') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'method not allowed']); exit; }
        $csrf = $_POST['csrf'] ?? $_REQUEST['csrf'] ?? '';
        if (!validate_csrf($csrf)) { http_response_code(403); echo json_encode(['error'=>'invalid_csrf']); exit; }
        $id = $_POST['id'] ?? '';
        if (!$id) { http_response_code(400); echo json_encode(['error'=>'id required']); exit; }
        // Optionally unlink slip file
        $stmt = $pdo->prepare('SELECT slip_path FROM donations WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row && $row['slip_path']) {
            $fp = __DIR__ . '/../' . ltrim($row['slip_path'], '/');
            if (file_exists($fp)) @unlink($fp);
        }
        $stmt = $pdo->prepare('DELETE FROM donations WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['ok'=>true]); exit;
    }

    if ($action === 'list_uploads') {
        // Scan uploads dir
        $dir = __DIR__ . '/../uploads';
        $files = [];
        if (is_dir($dir)) {
            $dh = opendir($dir);
            while (($f = readdir($dh)) !== false) {
                if ($f === '.' || $f === '..') continue;
                $path = '/uploads/' . $f;
                $files[] = ['name'=>$f,'path'=>$path,'url'=>$path];
            }
            closedir($dh);
        }
        echo json_encode(['uploads'=>$files]); exit;
    }

    http_response_code(400);
    echo json_encode(['error'=>'unknown action']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error'=>$e->getMessage()]);
}
?>