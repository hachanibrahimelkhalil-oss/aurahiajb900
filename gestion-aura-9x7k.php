<?php
session_start();
$cfgFile = __DIR__ . '/admin-config.php';

function redirect($url){ header('Location: '.$url); exit; }
function isConfigured(){ return file_exists(__DIR__.'/.admin-configured'); }
function requireCsrf(){ if (!isset($_POST['csrf']) || !hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'])) { http_response_code(403); exit('Requête invalide.'); } }

if (!isConfigured()) redirect('setup-admin.php');
if (isset($_GET['logout'])) { session_unset(); session_destroy(); redirect('gestion-aura-9x7k.php'); }

if (empty($_SESSION['admin_ok'])) {
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    requireCsrf();
    require $cfgFile;
    $email = strtolower(trim($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? '';
    if (hash_equals(strtolower(ADMIN_EMAIL), $email) && password_verify($password, ADMIN_PASSWORD_HASH)) {
      session_regenerate_id(true); $_SESSION['admin_ok'] = true; redirect('gestion-aura-9x7k.php');
    }
    $error = 'Adresse e-mail ou mot de passe incorrect.';
  }
  $_SESSION['csrf'] = bin2hex(random_bytes(32));
  ?><!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Connexion Admin — AURA-HIJAB</title><style>body{font-family:Arial,sans-serif;background:#f7f3ef;display:grid;place-items:center;min-height:100vh;margin:0}.card{width:min(420px,90%);background:#fff;padding:34px;border-radius:18px;box-shadow:0 12px 40px #0001}h1{margin-top:0}label{display:block;margin:16px 0 7px}input{box-sizing:border-box;width:100%;padding:13px;border:1px solid #ddd;border-radius:10px}button{width:100%;margin-top:20px;padding:14px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700;cursor:pointer}.err{background:#fee2e2;color:#991b1b;padding:10px;border-radius:8px}.muted{color:#666;font-size:13px}</style></head><body><main class="card"><h1>AURA-HIJAB</h1><p>Connexion à l’espace administrateur</p><?php if(!empty($error)): ?><p class="err"><?=htmlspecialchars($error)?></p><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?=htmlspecialchars($_SESSION['csrf'])?>"><label>Adresse e-mail</label><input type="email" name="email" autocomplete="username" required><label>Mot de passe</label><input type="password" name="password" autocomplete="current-password" required><button type="submit">Se connecter</button></form><p class="muted">Accès réservé à l’administrateur.</p></main></body></html><?php exit;
}
require __DIR__ . '/admin-dashboard.html';
