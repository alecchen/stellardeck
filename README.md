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

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-f8fafc-0a0a0a?style=flat-square) | `#0a0a0a` | `#f8fafc` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-111111-ffffff?style=flat-square) | `#ffffff` | `#111111` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-e2e8f0-1e293b?style=flat-square) | `#1e293b` | `#e2e8f0` |

**Letters from Brazil** — `theme: letters-from-brazil` (7 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-2C3850-47B386?style=flat-square) | `#47B386` | `#2C3850` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-FB6863-E8D6D2?style=flat-square) | `#E8D6D2` | `#FB6863` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-EDEAE3-22A6E3?style=flat-square) | `#22A6E3` | `#EDEAE3` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-FEE04A-122232?style=flat-square) | `#122232` | `#FEE04A` |
| 5 | ![Aa](https://img.shields.io/badge/Aa-FDCA42-085293?style=flat-square) | `#085293` | `#FDCA42` |
| 6 | ![Aa](https://img.shields.io/badge/Aa-000000-FFFFFF?style=flat-square) | `#FFFFFF` | `#000000` |
| 7 | ![Aa](https://img.shields.io/badge/Aa-FFFFFF-000000?style=flat-square) | `#000000` | `#FFFFFF` |

**Serif** — `theme: serif` (4 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-1a1a1a-f5f0eb?style=flat-square) | `#f5f0eb` | `#1a1a1a` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-e0d5c1-1a1a2e?style=flat-square) | `#1a1a2e` | `#e0d5c1` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-2c3e50-fefefe?style=flat-square) | `#fefefe` | `#2c3e50` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-f0e6d3-0d1117?style=flat-square) | `#0d1117` | `#f0e6d3` |

**Minimal** — `theme: minimal` (4 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-111111-ffffff?style=flat-square) | `#ffffff` | `#111111` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-f1f5f9-0f172a?style=flat-square) | `#0f172a` | `#f1f5f9` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-1c1917-fafaf9?style=flat-square) | `#fafaf9` | `#1c1917` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-fafafa-18181b?style=flat-square) | `#18181b` | `#fafafa` |

**Hacker** — `theme: hacker` (4 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-58a6ff-0d1117?style=flat-square) | `#0d1117` | `#58a6ff` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-bd93f9-282a36?style=flat-square) | `#282a36` | `#bd93f9` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-b58900-002b36?style=flat-square) | `#002b36` | `#b58900` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-7aa2f7-1a1b26?style=flat-square) | `#1a1b26` | `#7aa2f7` |

**Poster** — `theme: poster` (4 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-ffffff-000000?style=flat-square) | `#000000` | `#ffffff` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-f0e68c-1a0a2e?style=flat-square) | `#1a0a2e` | `#f0e68c` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-000000-ffffff?style=flat-square) | `#ffffff` | `#000000` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-64ffda-0a192f?style=flat-square) | `#0a192f` | `#64ffda` |

**Borneli** — `theme: borneli` (5 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-1a1050-ece7e2?style=flat-square) | `#ece7e2` | `#1a1050` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-ece7e2-1a1050?style=flat-square) | `#1a1050` | `#ece7e2` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-1a1050-ffffff?style=flat-square) | `#ffffff` | `#1a1050` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-ffffff-8a2080?style=flat-square) | `#8a2080` | `#ffffff` |
| 5 | ![Aa](https://img.shields.io/badge/Aa-1a1050-f5f0eb?style=flat-square) | `#f5f0eb` | `#1a1050` |

**Alun** — `theme: alun` (5 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-FF9414-0d0c0c?style=flat-square) | `#0d0c0c` | `#FF9414` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-ED1460-0d0c0c?style=flat-square) | `#0d0c0c` | `#ED1460` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-0d0c0c-f3f2f2?style=flat-square) | `#f3f2f2` | `#0d0c0c` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-0d0c0c-FF9414?style=flat-square) | `#FF9414` | `#0d0c0c` |
| 5 | ![Aa](https://img.shields.io/badge/Aa-ffffff-ED1460?style=flat-square) | `#ED1460` | `#ffffff` |

**Nordic** — `theme: nordic` (5 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-e2e8f0-0a1628?style=flat-square) | `#0a1628` | `#e2e8f0` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-1c1917-fafaf9?style=flat-square) | `#fafaf9` | `#1c1917` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-f1f5f9-1e293b?style=flat-square) | `#1e293b` | `#f1f5f9` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-fbbf24-0f172a?style=flat-square) | `#0f172a` | `#fbbf24` |
| 5 | ![Aa](https://img.shields.io/badge/Aa-0f172a-ffffff?style=flat-square) | `#ffffff` | `#0f172a` |

**Keynote** — `theme: keynote` (5 schemes)

| # | Preview | Background | Text |
|---|---------|-----------|------|
| 1 | ![Aa](https://img.shields.io/badge/Aa-ffffff-000000?style=flat-square) | `#000000` | `#ffffff` |
| 2 | ![Aa](https://img.shields.io/badge/Aa-f9fafb-111827?style=flat-square) | `#111827` | `#f9fafb` |
| 3 | ![Aa](https://img.shields.io/badge/Aa-111827-ffffff?style=flat-square) | `#ffffff` | `#111827` |
| 4 | ![Aa](https://img.shields.io/badge/Aa-e0e7ff-0c0a20?style=flat-square) | `#0c0a20` | `#e0e7ff` |
| 5 | ![Aa](https://img.shields.io/badge/Aa-fef3c7-1c1917?style=flat-square) | `#1c1917` | `#fef3c7` |

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
