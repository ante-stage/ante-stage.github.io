#!/usr/bin/env node
/**
 * エモカラ収録曲(assets/emocara-songs.json)を、Utaemoの曲カタログから再生成する。
 *   node scripts/sync-emocara.mjs [取得元URLまたはindex.htmlのパス]
 * 既定の取得元: https://utalis.github.io/
 * 変更があればファイルを書き換えて「changed」、なければ「unchanged」を表示する。
 * 取得失敗・解析失敗・曲数が極端に減った場合は、ファイルを触らずエラー終了する(壊れたデータで上書きしない)。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'assets', 'emocara-songs.json');
const SRC = process.argv[2] || 'https://utalis.github.io/';
const GENRES = ['J-POP', 'アニソン', 'ボカロ', 'アイドル曲', '洋楽', '演歌', 'その他'];
const MIN_SONGS = 1500;

function fail(msg) { console.error('エラー: ' + msg); process.exit(1); }

let html;
try {
  if (/^https?:\/\//.test(SRC)) {
    const res = await fetch(SRC, { headers: { 'cache-control': 'no-cache' } });
    if (!res.ok) fail(`取得に失敗しました (HTTP ${res.status}): ${SRC}`);
    html = await res.text();
  } else {
    html = fs.readFileSync(SRC, 'utf8');
  }
} catch (err) { fail('取得に失敗しました: ' + err.message); }

const m = html.match(/const MASTER_SONGS = (\[.*?\]);\n/s);
if (!m) fail('Utaemoの曲データ(MASTER_SONGS)が見つかりません。Utaemo側の構造が変わった可能性があります。');
let songs;
try { songs = JSON.parse(m[1]); } catch (err) { fail('曲データを読み取れません: ' + err.message); }
if (!Array.isArray(songs) || songs.length < MIN_SONGS) fail(`曲数が少なすぎます (${Array.isArray(songs) ? songs.length : '?'}曲)。上書きしません。`);

const rows = [];
for (const s of songs) {
  if (!s || typeof s.t !== 'string' || !s.t || typeof s.a !== 'string') fail('曲データの形式が想定と違います。');
  rows.push([s.t, s.a, String(s.ty || '').toLowerCase(), String(s.y || ''),
    (Array.isArray(s.genres) ? s.genres : []).filter((g) => GENRES.includes(g)).map((g) => GENRES.indexOf(g)),
    String(s.k || ''), String(s.tk || '')]);
}
const next = JSON.stringify({ schemaVersion: 1, genres: GENRES, count: rows.length, songs: rows });

let prev = '';
try { prev = fs.readFileSync(OUT, 'utf8'); } catch { /* 初回 */ }
if (prev) {
  try {
    const old = JSON.parse(prev).count;
    if (old && rows.length < old * 0.9) fail(`曲数が前回(${old}曲)から10%以上減っています(${rows.length}曲)。上書きしません。内容を確認してください。`);
  } catch { /* 前回が壊れていれば上書きしてよい */ }
}
if (prev === next) { console.log(`unchanged (${rows.length}曲)`); process.exit(0); }
fs.writeFileSync(OUT, next);
console.log(`changed (${rows.length}曲)`);
