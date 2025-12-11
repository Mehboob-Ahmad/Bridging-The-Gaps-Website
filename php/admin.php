<?php
require_once __DIR__ . '/config.php';
// session is started in config.php
// Only allow admin by role
if (empty($_SESSION['user']) || ($_SESSION['user']['role'] ?? '') !== 'admin') {
    header('Location: /login.html');
    exit;
}
$user = $_SESSION['user'];
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Panel — BRIDGING THE GAPS</title>
<meta name="csrf-token" content="<?php echo htmlspecialchars(csrf_token()); ?>">
<link rel="stylesheet" href="admin.css">
</head>
<body>
<header class="admin-header">
  <h1>Admin Panel</h1>
  <div class="admin-meta">Signed in as <strong><?php echo htmlspecialchars($user['email']); ?></strong> — <a href="/php/logout.php">Sign out</a></div>
</header>
<main class="container">
  <section>
    <h2>Users</h2>
    <div id="usersArea">Loading users…</div>
  </section>

  <section>
    <h2>Donations</h2>
    <div id="donationsArea">Loading donations…</div>
  </section>

  <section>
    <h2>Uploads (Slips)</h2>
    <div id="uploadsArea">Loading uploads…</div>
  </section>
</main>
<script src="admin.js"></script>
</body>
</html>