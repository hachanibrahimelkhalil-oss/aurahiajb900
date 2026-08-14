<?php
session_start();
if (file_exists(__DIR__.'/.admin-configured')) { header('Location: admin.html'); exit; }
if (empty($_SESSION['setup_csrf'])) $_SESSION['setup_csrf'] = bin2hex(random_bytes(32));
$error='';
if ($_SERVER['REQUEST_METHOD']==='POST') {
  if (!hash_equals($_SESSION['setup_csrf'], $_POST['csrf'] ?? '')) { http_response_code(403); exit('Requête invalide.'); }
  $email = strtolower(trim($_POST['email'] ?? '')); $p1=$_POST['password']??''; $p2=$_POST['password2']??'';
  if (!filter_var($email,FILTER_VALIDATE_EMAIL)) $error='Adresse e-mail invalide.';
  elseif (strlen($p1)<10) $error='Le mot de passe doit contenir au moins 10 caractères.';
  elseif ($p1!==$p2) $error='Les deux mots de passe ne correspondent pas.';
  else {
    $config="<?php\ndefine('ADMIN_EMAIL', ".var_export($email,true).");\ndefine('ADMIN_PASSWORD_HASH', ".var_export(password_hash($p1,PASSWORD_DEFAULT),true).");\n";
    if (file_put_contents(__DIR__.'/admin-config.php',$config,LOCK_EX)===false) { $error='Impossible d’enregistrer la configuration.'; }
    else { file_put_contents(__DIR.'/.admin-configured','configured '.date('c'),LOCK_EX); header('Location: admin.html'); exit; }
  }
}
?><!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Configuration Admin — AURA-HIJAB</title><style>body{font-family:Arial,sans-serif;background:#f7f3ef;display:grid;place-items:center;min-height:100vh;margin:0}.card{width:min(460px,90%);background:#fff;padding:34px;border-radius:18px;box-shadow:0 12px 40px #0001}h1{margin-top:0}label{display:block;margin:16px 0 7px}input{box-sizing:border-box;width:100%;padding:13px;border:1px solid #ddd;border-radius:10px}button{width:100%;margin-top:20px;padding:14px;border:0;border-radius:10px;background:#111;color:#fff;font-weight:700}.err{background:#fee2e2;color:#991b1b;padding:10px;border-radius:8px}</style></head><body><main class="card"><h1>Créer votre accès admin</h1><p>Cette étape ne sera disponible qu’une seule fois.</p><?php if($error): ?><p class="err"><?=htmlspecialchars($error)?></p><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?=htmlspecialchars($_SESSION['setup_csrf'])?>"><label>Votre adresse e-mail</label><input type="email" name="email" required><label>Choisissez un mot de passe</label><input type="password" name="password" minlength="10" required><label>Confirmez le mot de passe</label><input type="password" name="password2" minlength="10" required><button type="submit">Créer mon accès</button></form></main></body></html>
