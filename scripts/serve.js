#!/usr/bin/env node
/**
 * serve.js — static file server used by the CLI (scripts/export.js).
 *
 * Node twin of scripts/dev-server.py so `npm i -g stellardeck` works
 * without a python3 on the user's machine. Same contract:
 *   - serves the package root with no-cache headers
 *   - /@fs/<abs-path> maps to absolute filesystem paths (Vite convention)
 *     so decks outside the package can be previewed/exported
 *   - binds 127.0.0.1 only — local trust model, no allowlist
 *
 * Usage: node scripts/serve.js [port]   (default 3031)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = parseInt(process.argv[2], 10) || 3031;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const filePath = urlPath.startsWith('/@fs/')
    ? urlPath.slice('/@fs'.length)              // '/@fs/Users/x/deck.md' → '/Users/x/deck.md'
    : path.join(ROOT, path.normalize(urlPath)); // normalize strips ../ escapes

  fs.stat(filePath, (err, stat) => {
    const resolved = (!err && stat.isDirectory()) ? path.join(filePath, 'index.html') : filePath;
    fs.readFile(resolved, (err2, data) => {
      if (err2) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(resolved).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      });
      res.end(data);
    });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server on http://127.0.0.1:${PORT} (no-cache)`);
});
