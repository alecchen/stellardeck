#!/usr/bin/env python3
"""Dev server with no-cache headers for Tauri development.

WKWebView aggressively caches files from devUrl.
This server sends Cache-Control: no-store to prevent stale HTML/JS.

Also serves absolute filesystem paths under /@fs/ (Vite convention), so
decks living outside this repo can be previewed/exported: the viewer
receives file=/@fs/<abs-path> and relative asset refs (../assets/x.png)
resolve to sibling /@fs/ URLs. Binds 127.0.0.1 only — same local trust
model as the Electron deck:// protocol (no allowlist).

Usage: python3 scripts/dev-server.py [port]
"""
import sys
from urllib.parse import unquote, urlsplit
from http.server import HTTPServer, SimpleHTTPRequestHandler

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def translate_path(self, path):
        clean = unquote(urlsplit(path).path)
        if clean.startswith('/@fs/'):
            return clean[len('/@fs'):]  # '/@fs/Users/x/deck.md' → '/Users/x/deck.md'
        return super().translate_path(path)

port = int(sys.argv[1]) if len(sys.argv) > 1 else 3031
print(f"Dev server on http://127.0.0.1:{port} (no-cache)")
HTTPServer(('127.0.0.1', port), NoCacheHandler).serve_forever()
