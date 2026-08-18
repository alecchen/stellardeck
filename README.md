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

| Theme | Label | Schemes |
|-------|-------|---------|
| `(default)` | Default (Inter) | 🟫 `#0a0a0a` ⬜ `#fff` 🟦 `#1e293b` |
| `letters-from-brazil` | Letters from Brazil | 🟩 `#47B386` 🩷 `#E8D6D2` 🟦 `#22A6E3` 🟫 `#122232` 🔵 `#085293` ⬜ `#fff` ⬛ `#000` |
| `serif` | Serif | 🟫 `#f5f0eb` 🟫 `#1a1a2e` ⬜ `#fefefe` 🟫 `#0d1117` |
| `minimal` | Minimal | ⬜ `#fff` 🟦 `#0f172a` ⬜ `#fafaf9` 🟫 `#18181b` |
| `hacker` | Hacker | 🟦 `#0d1117` 🟪 `#282a36` 🟦 `#002b36` 🟦 `#1a1b26` |
| `poster` | Poster | ⬛ `#000` 🟪 `#1a0a2e` ⬜ `#fff` 🟦 `#0a192f` |
| `borneli` | Borneli | 🟫 `#ece7e2` 🟪 `#1a1050` ⬜ `#fff` 🟪 `#8a2080` 🟫 `#f5f0eb` |
| `alun` | Alun | ⬛ `#0d0c0c` 🟧 `#FF9414` ⬜ `#f3f2f2` 🟧 `#FF9414` 🟥 `#ED1460` |
| `nordic` | Nordic | 🟦 `#0a1628` ⬜ `#fafaf9` 🟦 `#1e293b` 🟦 `#0f172a` ⬜ `#fff` |
| `keynote` | Keynote | ⬛ `#000` 🟫 `#111827` ⬜ `#fff` 🟪 `#0c0a20` 🟫 `#1c1917` |

Each scheme = `bg / text`. Set via frontmatter `theme: <name>, <scheme>` or CLI `--theme <name> --scheme <n>`.

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
