<?php
/* Caseback self-updater. Replaces the cPanel cron jobs.
   Pulls the latest index.html from GitHub and refreshes fx.json (HKD/AUD) hourly.
   Called on page load (at most once every 4 minutes) and by Claude after each push (?force=1). */
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store');
$dir = __DIR__;
function cb_get($url) {
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => 1, CURLOPT_FOLLOWLOCATION => 1, CURLOPT_TIMEOUT => 60, CURLOPT_USERAGENT => 'caseback-updater']);
    $b = curl_exec($ch); $c = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    return $c == 200 ? $b : false;
  }
  return @file_get_contents($url);
}
$lock = $dir . '/.update.lock';
if (!isset($_GET['force']) && file_exists($lock) && time() - filemtime($lock) < 240) { echo "ok recent\n"; exit; }
@touch($lock);
$b = cb_get('https://raw.githubusercontent.com/peteratef-afk/sevendials-site/main/index.html?t=' . time());
if ($b && strlen($b) > 1000000 && strpos($b, '</html>') !== false) {
  $cur = $dir . '/index.html';
  if (!file_exists($cur) || md5_file($cur) !== md5($b)) {
    file_put_contents($dir . '/index.html.new', $b);
    rename($dir . '/index.html.new', $cur);
    echo "site updated " . strlen($b) . "\n";
  } else { echo "site unchanged\n"; }
} else {
  file_put_contents($dir . '/pull.txt', date('c') . " site fetch failed\n", FILE_APPEND);
  echo "site fetch failed\n";
}
$fx = $dir . '/fx.json';
if (!file_exists($fx) || time() - filemtime($fx) > 3600 || isset($_GET['force'])) {
  $f = cb_get('https://api.frankfurter.dev/v1/latest?base=HKD&symbols=AUD');
  if ($f && strpos($f, '"AUD"') !== false) { file_put_contents($fx, $f); echo "fx updated\n"; }
}
