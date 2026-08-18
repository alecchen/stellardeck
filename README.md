# StellarDeck

Convention-first, agent-first markdown presentations.

Write content, get layouts. StellarDeck infers slide structure from what you write — no directives needed. The same `.md` file renders in a desktop app, a browser, an embeddable viewer, or the CLI. When you need more control, Deckset-compatible markdown and custom directives are there.

If you're coming from [Deckset](https://www.deckset.com), [Marp](https://marp.app), or [Reveal.js](https://revealjs.com), see the [comparison](docs/comparison.md) for when to use what.

Four ideas shape the project:

**Storytelling.** A deck is a sequence of moments. Markdown's constraints (one file, short slides, linear order) keep focus on what you're saying. Reading through the deck feels like reading a script.

**Autoflow.** Reads each slide's content and picks a layout — [9 rules](docs/autoflow-rules.md), zero configuration. A slide with four short lines gets a Z-pattern. An image next to text becomes a filtered background with auto-sized headings. Consecutive slides don't repeat the same treatment (anti-monotony). Explicit directives always win.

**Agent-native.** Markdown is what LLMs produce. The [CLI](docs/comparison.md) takes stdin, exports PDF/PNG/grid, previews in the browser, validates diagnostics, and emits structured JSON. The [stellardeck skill](docs/skill-stellardeck-spec.md) converts source text (blog posts, transcripts, meeting notes) into scored slide decks.

**Simple.** `npm run serve` and open the deck in your browser. No build step, no bundler. The `.md` file is the artifact, PDFs are regenerable.

9 themes, up to 7 color schemes each, dark and light. Set via frontmatter or CLI:

```markdown
---
theme: nordic, 2
---
```

```bash
stellardeck --html --theme hacker --scheme 1 deck.md
```

### Themes & Schemes

Set via frontmatter `theme: <name>, <scheme>` or CLI `--theme <name> --scheme <n>`.

**Default (Inter)** — `theme: default` (3 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#0a0a0a](https://img.shields.io/badge/%230a0a0a-0a0a0a?style=flat-square) | ![#f8fafc](https://img.shields.io/badge/%23f8fafc-f8fafc?style=flat-square) |
| 2 | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) | ![#111111](https://img.shields.io/badge/%23111111-111111?style=flat-square) |
| 3 | ![#1e293b](https://img.shields.io/badge/%231e293b-1e293b?style=flat-square) | ![#e2e8f0](https://img.shields.io/badge/%23e2e8f0-e2e8f0?style=flat-square) |

**Letters from Brazil** — `theme: letters-from-brazil` (7 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#47B386](https://img.shields.io/badge/%2347B386-47B386?style=flat-square) | ![#2C3850](https://img.shields.io/badge/%232C3850-2C3850?style=flat-square) |
| 2 | ![#E8D6D2](https://img.shields.io/badge/%23E8D6D2-E8D6D2?style=flat-square) | ![#FB6863](https://img.shields.io/badge/%23FB6863-FB6863?style=flat-square) |
| 3 | ![#22A6E3](https://img.shields.io/badge/%2322A6E3-22A6E3?style=flat-square) | ![#EDEAE3](https://img.shields.io/badge/%23EDEAE3-EDEAE3?style=flat-square) |
| 4 | ![#122232](https://img.shields.io/badge/%23122232-122232?style=flat-square) | ![#FEE04A](https://img.shields.io/badge/%23FEE04A-FEE04A?style=flat-square) |
| 5 | ![#085293](https://img.shields.io/badge/%23085293-085293?style=flat-square) | ![#FDCA42](https://img.shields.io/badge/%23FDCA42-FDCA42?style=flat-square) |
| 6 | ![#FFFFFF](https://img.shields.io/badge/%23FFFFFF-FFFFFF?style=flat-square) | ![#000000](https://img.shields.io/badge/%23000000-000000?style=flat-square) |
| 7 | ![#000000](https://img.shields.io/badge/%23000000-000000?style=flat-square) | ![#FFFFFF](https://img.shields.io/badge/%23FFFFFF-FFFFFF?style=flat-square) |

**Serif** — `theme: serif` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#f5f0eb](https://img.shields.io/badge/%23f5f0eb-f5f0eb?style=flat-square) | ![#1a1a1a](https://img.shields.io/badge/%231a1a1a-1a1a1a?style=flat-square) |
| 2 | ![#1a1a2e](https://img.shields.io/badge/%231a1a2e-1a1a2e?style=flat-square) | ![#e0d5c1](https://img.shields.io/badge/%23e0d5c1-e0d5c1?style=flat-square) |
| 3 | ![#fefefe](https://img.shields.io/badge/%23fefefe-fefefe?style=flat-square) | ![#2c3e50](https://img.shields.io/badge/%232c3e50-2c3e50?style=flat-square) |
| 4 | ![#0d1117](https://img.shields.io/badge/%230d1117-0d1117?style=flat-square) | ![#f0e6d3](https://img.shields.io/badge/%23f0e6d3-f0e6d3?style=flat-square) |

**Minimal** — `theme: minimal` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) | ![#111111](https://img.shields.io/badge/%23111111-111111?style=flat-square) |
| 2 | ![#0f172a](https://img.shields.io/badge/%230f172a-0f172a?style=flat-square) | ![#f1f5f9](https://img.shields.io/badge/%23f1f5f9-f1f5f9?style=flat-square) |
| 3 | ![#fafaf9](https://img.shields.io/badge/%23fafaf9-fafaf9?style=flat-square) | ![#1c1917](https://img.shields.io/badge/%231c1917-1c1917?style=flat-square) |
| 4 | ![#18181b](https://img.shields.io/badge/%2318181b-18181b?style=flat-square) | ![#fafafa](https://img.shields.io/badge/%23fafafa-fafafa?style=flat-square) |

**Hacker** — `theme: hacker` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#0d1117](https://img.shields.io/badge/%230d1117-0d1117?style=flat-square) | ![#58a6ff](https://img.shields.io/badge/%2358a6ff-58a6ff?style=flat-square) |
| 2 | ![#282a36](https://img.shields.io/badge/%23282a36-282a36?style=flat-square) | ![#bd93f9](https://img.shields.io/badge/%23bd93f9-bd93f9?style=flat-square) |
| 3 | ![#002b36](https://img.shields.io/badge/%23002b36-002b36?style=flat-square) | ![#b58900](https://img.shields.io/badge/%23b58900-b58900?style=flat-square) |
| 4 | ![#1a1b26](https://img.shields.io/badge/%231a1b26-1a1b26?style=flat-square) | ![#7aa2f7](https://img.shields.io/badge/%237aa2f7-7aa2f7?style=flat-square) |

**Poster** — `theme: poster` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#000000](https://img.shields.io/badge/%23000000-000000?style=flat-square) | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) |
| 2 | ![#1a0a2e](https://img.shields.io/badge/%231a0a2e-1a0a2e?style=flat-square) | ![#f0e68c](https://img.shields.io/badge/%23f0e68c-f0e68c?style=flat-square) |
| 3 | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) | ![#000000](https://img.shields.io/badge/%23000000-000000?style=flat-square) |
| 4 | ![#0a192f](https://img.shields.io/badge/%230a192f-0a192f?style=flat-square) | ![#64ffda](https://img.shields.io/badge/%2364ffda-64ffda?style=flat-square) |

**Borneli** — `theme: borneli` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#ece7e2](https://img.shields.io/badge/%23ece7e2-ece7e2?style=flat-square) | ![#1a1050](https://img.shields.io/badge/%231a1050-1a1050?style=flat-square) |
| 2 | ![#1a1050](https://img.shields.io/badge/%231a1050-1a1050?style=flat-square) | ![#ece7e2](https://img.shields.io/badge/%23ece7e2-ece7e2?style=flat-square) |
| 3 | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) | ![#1a1050](https://img.shields.io/badge/%231a1050-1a1050?style=flat-square) |
| 4 | ![#8a2080](https://img.shields.io/badge/%238a2080-8a2080?style=flat-square) | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) |
| 5 | ![#f5f0eb](https://img.shields.io/badge/%23f5f0eb-f5f0eb?style=flat-square) | ![#1a1050](https://img.shields.io/badge/%231a1050-1a1050?style=flat-square) |

**Alun** — `theme: alun` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#0d0c0c](https://img.shields.io/badge/%230d0c0c-0d0c0c?style=flat-square) | ![#FF9414](https://img.shields.io/badge/%23FF9414-FF9414?style=flat-square) |
| 2 | ![#0d0c0c](https://img.shields.io/badge/%230d0c0c-0d0c0c?style=flat-square) | ![#ED1460](https://img.shields.io/badge/%23ED1460-ED1460?style=flat-square) |
| 3 | ![#f3f2f2](https://img.shields.io/badge/%23f3f2f2-f3f2f2?style=flat-square) | ![#0d0c0c](https://img.shields.io/badge/%230d0c0c-0d0c0c?style=flat-square) |
| 4 | ![#FF9414](https://img.shields.io/badge/%23FF9414-FF9414?style=flat-square) | ![#0d0c0c](https://img.shields.io/badge/%230d0c0c-0d0c0c?style=flat-square) |
| 5 | ![#ED1460](https://img.shields.io/badge/%23ED1460-ED1460?style=flat-square) | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) |

**Nordic** — `theme: nordic` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#0a1628](https://img.shields.io/badge/%230a1628-0a1628?style=flat-square) | ![#e2e8f0](https://img.shields.io/badge/%23e2e8f0-e2e8f0?style=flat-square) |
| 2 | ![#fafaf9](https://img.shields.io/badge/%23fafaf9-fafaf9?style=flat-square) | ![#1c1917](https://img.shields.io/badge/%231c1917-1c1917?style=flat-square) |
| 3 | ![#1e293b](https://img.shields.io/badge/%231e293b-1e293b?style=flat-square) | ![#f1f5f9](https://img.shields.io/badge/%23f1f5f9-f1f5f9?style=flat-square) |
| 4 | ![#0f172a](https://img.shields.io/badge/%230f172a-0f172a?style=flat-square) | ![#fbbf24](https://img.shields.io/badge/%23fbbf24-fbbf24?style=flat-square) |
| 5 | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) | ![#0f172a](https://img.shields.io/badge/%230f172a-0f172a?style=flat-square) |

**Keynote** — `theme: keynote` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | ![#000000](https://img.shields.io/badge/%23000000-000000?style=flat-square) | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) |
| 2 | ![#111827](https://img.shields.io/badge/%23111827-111827?style=flat-square) | ![#f9fafb](https://img.shields.io/badge/%23f9fafb-f9fafb?style=flat-square) |
| 3 | ![#ffffff](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) | ![#111827](https://img.shields.io/badge/%23111827-111827?style=flat-square) |
| 4 | ![#0c0a20](https://img.shields.io/badge/%230c0a20-0c0a20?style=flat-square) | ![#e0e7ff](https://img.shields.io/badge/%23e0e7ff-e0e7ff?style=flat-square) |
| 5 | ![#1c1917](https://img.shields.io/badge/%231c1917-1c1917?style=flat-square) | ![#fef3c7](https://img.shields.io/badge/%23fef3c7-fef3c7?style=flat-square) |

## Try it

Six example decks you can navigate and edit live — right in your browser:

**Learn the features:**
- [Getting Started](https://stellardeck.dev/examples/getting-started/) — headings, images, splits, code blocks
- [Kitchen Sink](https://stellardeck.dev/examples/kitchen-sink/) — every supported feature in one deck
- [Autoflow](https://stellardeck.dev/examples/autoflow/) — zero-config layout inference in action

**See it in action (real talks):**
- [Bean to Bar Chocolate](https://stellardeck.dev/examples/bean-to-bar/) — diagrams, columns, custom backgrounds
- [Hand Balancing](https://stellardeck.dev/examples/hand-balancing/) — split layouts with portraits
- [Vibe Coding](https://stellardeck.dev/examples/vibe-coding/) — a keynote about AI and coding

## Quick start

**Desktop app (macOS, Apple Silicon):** download the `.dmg` from the [latest release](https://github.com/peas/stellardeck/releases/latest), drag to Applications, drop a `.md` into the window. First launch: right-click → Open (not code-signed yet).

**CLI:**

```bash
npm install -g stellardeck           # coming soon — npm publish on roadmap
npx playwright install chromium      # one-time: the headless renderer
stellardeck deck.md                  # → deck.pdf
stellardeck --preview deck.md        # live preview in the browser
```

> **Not on npm yet?** Use the local alternatives below until `npm i -g stellardeck` lands.

**Option 1 — Run from the cloned repo:**

```bash
git clone https://github.com/alecchen/stellardeck.git
cd stellardeck
npm install
node scripts/export.js --html deck.md

# or add an alias:
alias stellardeck='node ~/git/stellardeck/scripts/export.js'
stellardeck --html deck.md
```

**Option 2 — Build a packaged Electron app (.app on macOS):**

```bash
npm run package   # builds StellarDeck.app (menu bar says "StellarDeck")
npm run make      # produces .dmg + .zip for distribution
```

Sample decks (images included): [`stellardeck-demo-decks.zip`](https://github.com/peas/stellardeck/releases/latest/download/stellardeck-demo-decks.zip)

## Desktop app (Electron)

```bash
npm install
npm run electron -- demo/getting-started.md
```

For a packaged build (correct app name in the macOS menu bar, distributable via `.dmg`):

```bash
npm run app -- demo/getting-started.md   # packages on first run, caches after
npm run make                              # produces out/make/*.dmg + .zip
```

Built with [Electron](https://www.electronjs.org/) + [electron-forge](https://www.electronforge.io/). No Rust toolchain required.

## CLI

```bash
# Live
npm run serve                                     # dev server at http://127.0.0.1:3031
# then open http://127.0.0.1:3031/deck.md in your browser

# Export
npm run export -- deck.md                            # → deck.pdf
npm run export -- --png deck.md                      # → deck-slides/001.png, 002.png...
npm run export -- --grid deck.md                     # → deck-grid.png
npm run export -- --html deck.md                      # → deck.html (self-contained)
npm run export -- --input-dir decks --output dist    # batch

# Inspect
npm run export -- --validate deck.md                 # diagnostics without export
npm run export -- --list-themes                      # available themes (JSON)
npm run export -- --list-schemes alun                # color schemes for a theme

# Agent
npm run export -- --json --pdf deck.md               # machine-readable output
cat deck.md | npm run export -- --pdf - out.pdf      # stdin
npm run export -- --help                             # full reference
```

## Format

StellarDeck uses Deckset-compatible markdown. See [format-spec.yaml](docs/format-spec.yaml) for the full 66-feature spec.

GitHub-style emoji shortcodes are supported: `:pencil:` → ✏️, `:rocket:` → 🚀, `:trophy:` → 🏆. Over 180 shortcodes mapped to native Unicode emoji. Unknown shortcodes pass through untouched.

```markdown
footer: My Talk
slidenumbers: true

#[fit] Hello, World

---

![right](photo.jpg)

# Split Layout

Text on the left, image on the right.

---

[.background-color: #1e3a5f]

#[fit] Custom Colors
```

## Testing

```bash
npm test              # 318 unit tests (~3s)
npm run test:e2e      # 70 E2E tests (Chromium)
npm run test:layout   # 32 layout + consistency tests
npm run test:export   # 40 CLI integration tests
npm run test:visual   # 18 visual regression tests
npm run test:all      # all of the above
```

## What's Changed

### `--html` — self-contained HTML export
```bash
stellardeck --html deck.md            # → deck.html (open via file://, no server)
stellardeck --html --theme hacker --scheme 1 deck.md
stellardeck --html --slides 1-5 deck.md
```
Single file, works offline. Engine CSS/JS + syntax highlighting (vendored hljs) inlined. Deck images embedded as `data:` URIs. KaTeX / Mermaid / QR loaded from CDN only when placeholders are present (lazy).

### Emoji shortcodes
GitHub-style `:name:` shortcodes now render as native Unicode emoji throughout your slides:
```markdown
# [fit] programmer's :pencil:        → ✏️
# [fit] :trophy: TOP 10 :trophy:     → 🏆
# [fit] vim :heart_eyes:             → 😍
```
180+ shortcodes supported, including all standard GitHub emoji. Unknown names pass through unchanged.

### Bug fixes
- HTML export body was empty (`undefined`) due to `exportByFormat` passing the wrapper object instead of the capture result
- CLI export message was blank for `--html` format (missing case in result formatter)
- `--slides` filter count was wrong for HTML exports (showed 1 instead of actual slide count)

## License

MIT — see [LICENSE](LICENSE).

Built by [Paulo Silveira](https://paulo.com.br).
