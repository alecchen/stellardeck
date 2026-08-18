/**
 * export-html.js — StellarDeck self-contained HTML export.
 *
 * Unlike PDF/PNG/grid (which screenshot each slide), the HTML export captures
 * the LIVE rendered deck DOM from the headless browser, inlines the engine
 * CSS/JS, and rewrites local images to data: URIs. The result is a single
 * .html file that renders standalone via file:// with no server, matching the
 * roadmap item "`--html` self-contained export".
 *
 * Design decisions (see findings.md):
 *  - DOM-capture from the real renderer (render parity by construction).
 *  - hljs is vendored and inlined, so syntax highlighting works offline.
 *    KaTeX / Mermaid / QR are NOT vendored (multi-MB) — the boot re-renders
 *    any unrendered placeholders from the esm.sh CDN only when present.
 *  - Images referenced by the deck are inlined as data: URIs. External URLs
 *    keep working as-is.
 *
 * Used by scripts/export.js via `--html`.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..');

// Engine files inlined verbatim into the exported page. The app chrome
// (css/chrome.css, js/main.js, the parser bundle) is deliberately excluded —
// the deck DOM is already parsed and rendered, so only the engine runtime +
// the vendored highlighter are needed for a standalone presentation.
const CSS_FILES = [
  'slides2.css',
  'css/themes.css',
  'css/layout.css',
  'vendor/highlight/monokai.css',
];
const JS_FILES = [
  'slides2.js',
  'vendor/highlight/highlight.min.js',
];

/**
 * Self-contained function serialized into the headless browser via
 * page.evaluate. No closures — everything it needs arrives via `arg`.
 *
 * Runs against the same rendered page the screenshot exporters use, so the
 * captured DOM reflects autoflow, fitText, and any CDN-rendered extras
 * (highlighted code, KaTeX, Mermaid SVGs, QR codes) exactly as the app
 * rendered them. Local images are fetched via the dev server and inlined as
 * data: URIs here, in the page, so no URL rewriting is needed in Node.
 *
 * arg.indices — 1-based slide numbers to keep (null keeps all).
 *
 * @returns {Promise<{revealHTML: string, rootStyle: string, title: string,
 *                    sectionCount: number, warnings: object[]}>}
 */
async function captureHTML(arg) {
  const keep = arg && arg.indices ? new Set(arg.indices) : null;
  const warnings = [];

  const reveal = document.querySelector('.reveal');
  const slidesEl = reveal.querySelector('.slides');

  // Apply the slide filter first (mutates the live sections; the screenshot
  // path is skipped for html so this is safe).
  if (keep) {
    Array.from(slidesEl.querySelectorAll(':scope > section')).forEach((sec, i) => {
      if (!keep.has(i + 1)) sec.remove();
    });
  }

  // Clone so runtime-only artifacts can be stripped without touching the page.
  const clone = reveal.cloneNode(true);
  // The engine rebuilds these on initialize(); carrying app-old copies would
  // duplicate them after boot.
  Array.from(clone.querySelectorAll('.sd-backgrounds, .sd-slide-number, .sd-progress')).forEach(n => n.remove());
  // Normalize navigation classes — the engine re-applies them at boot.
  Array.from(clone.querySelectorAll('.slides > section')).forEach(sec => {
    sec.classList.remove('present', 'past', 'future');
  });

  // Inline local images as data URIs. External URLs, already-inline data URIs,
  // and app/internal schemes pass through untouched. Operates on the clone so
  // the fetch/FileReader round-trip never disturbs the live document.
  const jobs = Array.from(clone.querySelectorAll('img[src], section[data-background-image]'))
    .map(el => {
      const attr = el.tagName === 'IMG' ? 'src' : 'data-background-image';
      const src = el.getAttribute(attr);
      if (!src || /^(data:|blob:|localfile:|deck:|https?:)/i.test(src)) return null;
      return fetch(src)
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
        .then(blob => new Promise((res, rej) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result);
          fr.onerror = () => rej(fr.error || new Error('FileReader error'));
          fr.readAsDataURL(blob);
        }))
        .then(dataUrl => { el.setAttribute(attr, dataUrl); })
        .catch(() => {
          warnings.push({
            type: 'missing-image', severity: 'warn', slide: null,
            message: 'image could not be inlined for HTML export: ' + src,
          });
        });
    })
    .filter(Boolean);

  await Promise.all(jobs);

  return {
    revealHTML: clone.outerHTML,
    rootStyle: document.documentElement.getAttribute('style') || '',
    title: document.title,
    sectionCount: clone.querySelectorAll('.slides > section').length,
    warnings,
  };
}

function readFileInline(relPath) {
  return fs.readFileSync(path.join(PROJECT_DIR, relPath), 'utf8');
}

function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// Neutralize closing tags that would prematurely end the inlining <style> /
// <script> element. CSS and JS vendored from trusted sources, but this is
// cheap insurance against one day inlining a file that contains them.
function safeClose(s) {
  return String(s).replace(/<\/script/gi, '<\\/script').replace(/<\/style/gi, '<\\/style');
}

const SHELL_CSS = `
/* --- StellarDeck standalone shell --- */
html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }
body { background: var(--r-background-color, #0a0a0a); }
.reveal {
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  box-shadow: none !important;
  background-color: var(--r-background-color, #0a0a0a) !important;
}
.reveal .sd-backgrounds { background-color: var(--r-background-color, #0a0a0a); }
@media print { .reveal { width: 100% !important; height: 100% !important; } }
`;

// Boot script: re-initialize the engine on the captured DOM, wire the same
// keyboard bindings the app uses (js/keyboard.js), and lazily re-render any
// enhancement placeholders (KaTeX/Mermaid/QR) that were NOT baked at capture
// time — those load from the esm.sh CDN only when such elements are present.
const BOOT_SCRIPT = `
(function () {
  function maybeRenderExtras() {
    // Code highlighting — hljs is inlined, so this is fully offline for any
    // block that was left unrendered at capture time.
    var codes = document.querySelectorAll('pre code:not(.hljs)');
    if (codes.length && window.hljs) {
      Array.prototype.forEach.call(codes, function (b) {
        try { window.hljs.highlightElement(b); } catch (e) {}
      });
    }
    // KaTeX — lazy-load from CDN only if math placeholders remain.
    var math = document.querySelectorAll('.deckset-math, .deckset-math-inline');
    if (math.length) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://esm.sh/katex@0.16.22/dist/katex.min.css';
      document.head.appendChild(link);
      import('https://esm.sh/katex@0.16.22').then(function (m) {
        var katex = m.default || m;
        Array.prototype.forEach.call(document.querySelectorAll('.deckset-math, .deckset-math-inline'), function (el) {
          if (el.dataset.mathRendered || !el.dataset.mathSrc) return;
          try {
            katex.render(el.dataset.mathSrc, el, {
              displayMode: el.classList.contains('deckset-math'),
              throwOnError: false,
            });
            el.dataset.mathRendered = 'true';
          } catch (e) {}
        });
      }).catch(function () {});
    }
    // QR codes — lazy-load from CDN only if placeholders remain.
    var qrs = document.querySelectorAll('.deckset-qr');
    if (qrs.length) {
      import('https://esm.sh/qrcode-generator@1.4.4').then(function (m) {
        var qrLib = m.default;
        Array.prototype.forEach.call(qrs, function (el) {
          var url = el.dataset.qrUrl;
          if (!url || el.dataset.qrRendered) return;
          try {
            var qr = qrLib(0, 'M');
            qr.addData(url);
            qr.make();
            var s = qr.getModuleCount();
            var out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + ' ' + s + '" style="width:100%;height:100%;max-width:256px;max-height:256px" shape-rendering="crispEdges"><rect width="' + s + '" height="' + s + '" fill="white"/>';
            for (var r = 0; r < s; r++) {
              for (var c = 0; c < s; c++) {
                if (qr.isDark(r, c)) out += '<rect x="' + c + '" y="' + r + '" width="1" height="1" fill="#1a1a2e"/>';
              }
            }
            out += '</svg>';
            el.innerHTML = out;
            el.dataset.qrRendered = 'true';
          } catch (e) {}
        });
      }).catch(function () {});
    }
    // Mermaid — lazy-load from CDN only if placeholder diagrams remain.
    var mermaids = document.querySelectorAll('.deckset-diagram .mermaid');
    if (mermaids.length) {
      import('https://esm.sh/mermaid@11/dist/mermaid.esm.min.mjs').then(function (m) {
        var mermaid = m.default;
        mermaid.initialize({ startOnLoad: false, theme: 'dark', look: 'handDrawn', fontFamily: 'var(--r-main-font)' });
        return Promise.all(Array.prototype.map.call(mermaids, function (el) {
          if (el.dataset.diagramRendered) return null;
          var id = 'diagram-' + Math.random().toString(36).slice(2);
          return mermaid.render(id, el.textContent)
            .then(function (o) { el.innerHTML = o.svg; el.dataset.diagramRendered = 'true'; })
            .catch(function () {});
        }));
      }).catch(function () {});
    }
  }

  // Keyboard navigation — the engine does not bind keys; the app does this in
  // js/keyboard.js. Mirror the core bindings for a standalone presentation.
  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
        e.preventDefault(); Reveal.next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); Reveal.prev(); break;
      case 'Home': e.preventDefault(); Reveal.slide(0); break;
      case 'End': e.preventDefault(); Reveal.slide(Reveal.getTotalSlides() - 1); break;
      case 'f': case 'F':
        e.preventDefault();
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
      case 'Escape':
        if (document.fullscreenElement) document.exitFullscreen();
        break;
    }
  }, true);

  Reveal.initialize({
    hash: false,
    width: 1280,
    height: 720,
    margin: 0.06,
    transition: 'none',
    backgroundTransition: 'none',
    slideNumber: 'c/t',
    progress: true,
    overview: false,
    touch: true,
    keyboard: true,
    controls: false,
    help: false,
    center: true,
    preloadIframes: true
  });

  Reveal.on('ready', function () {
    // Paint the scheme background behind slides (mirrors the app's
    // applySchemeColors, which sets it on .reveal and .sd-backgrounds).
    var bg = getComputedStyle(document.querySelector('.reveal')).getPropertyValue('--r-background-color').trim() || '#0a0a0a';
    var sb = document.querySelector('.sd-backgrounds');
    if (sb) sb.style.backgroundColor = bg;
    maybeRenderExtras();
  });
})();
`;

/**
 * Build the standalone HTML document for a captured deck.
 * Pure function (no IO) so it is directly testable.
 *
 * @param {{revealHTML: string, rootStyle: string, title: string}} capture
 * @param {{title?: string}} opts
 * @returns {string} the full HTML document
 */
function buildShell(capture, opts = {}) {
  const css = CSS_FILES.map(f => safeClose(readFileInline(f))).join('\n');
  const js = JS_FILES.map(f => safeClose(readFileInline(f))).join('\n');
  const rootStyleAttr = capture.rootStyle ? ` style="${escAttr(capture.rootStyle)}"` : '';
  const title = opts.title || capture.title || 'StellarDeck deck';

  return '<!doctype html>\n'
    + '<html lang="en"' + rootStyleAttr + '>\n'
    + '<head>\n'
    + '  <meta charset="utf-8">\n'
    + '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    + '  <title>' + escAttr(title) + '</title>\n'
    + '  <style>\n' + css + '\n' + SHELL_CSS + '\n  </style>\n'
    + '</head>\n'
    + '<body>\n'
    + capture.revealHTML + '\n'
    + '<script>\n' + js + '\n</script>\n'
    + '<script>\n' + safeClose(BOOT_SCRIPT) + '\n</script>\n'
    + '</body>\n'
    + '</html>\n';
}

/**
 * Write a captured deck to a self-contained HTML file.
 *
 * @param {object} capture — result from captureHTML (the single element of
 *   the `slides` array returned by captureInSession for `--html`)
 * @param {string} outputPath
 * @param {object} [opts]
 * @returns {{path: string, bytes: number, slides: number, format: string}}
 */
function exportHTML(capture, outputPath, opts = {}) {
  const html = buildShell(capture, { title: opts.title });
  fs.writeFileSync(outputPath, html, 'utf8');
  return {
    path: path.resolve(outputPath),
    bytes: Buffer.byteLength(html, 'utf8'),
    slides: capture.sectionCount,
    format: 'html',
  };
}

module.exports = {
  captureHTML,
  buildShell,
  exportHTML,
  CSS_FILES,
  JS_FILES,
  PROJECT_DIR,
};