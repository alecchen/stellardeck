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

**Default** — `theme: default` (3 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0a0a0a;color:#f8fafc;font-weight:600">Aa</span> `#0a0a0a` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0a0a0a;color:#f8fafc;font-weight:600">Aa</span> `#f8fafc` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#111111;font-weight:600">Aa</span> `#ffffff` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#111111;font-weight:600">Aa</span> `#111111` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1e293b;color:#e2e8f0;font-weight:600">Aa</span> `#1e293b` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1e293b;color:#e2e8f0;font-weight:600">Aa</span> `#e2e8f0` |

**Letters from Brazil** — `theme: letters-from-brazil` (7 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#47B386;color:#2C3850;font-weight:600">Aa</span> `#47B386` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#47B386;color:#2C3850;font-weight:600">Aa</span> `#2C3850` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#E8D6D2;color:#FB6863;font-weight:600">Aa</span> `#E8D6D2` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#E8D6D2;color:#FB6863;font-weight:600">Aa</span> `#FB6863` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#22A6E3;color:#EDEAE3;font-weight:600">Aa</span> `#22A6E3` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#22A6E3;color:#EDEAE3;font-weight:600">Aa</span> `#EDEAE3` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#122232;color:#FEE04A;font-weight:600">Aa</span> `#122232` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#122232;color:#FEE04A;font-weight:600">Aa</span> `#FEE04A` |
| 5 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#085293;color:#FDCA42;font-weight:600">Aa</span> `#085293` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#085293;color:#FDCA42;font-weight:600">Aa</span> `#FDCA42` |
| 6 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#FFFFFF;color:#000000;font-weight:600">Aa</span> `#FFFFFF` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#FFFFFF;color:#000000;font-weight:600">Aa</span> `#000000` |
| 7 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#000000;color:#FFFFFF;font-weight:600">Aa</span> `#000000` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#000000;color:#FFFFFF;font-weight:600">Aa</span> `#FFFFFF` |

**Serif** — `theme: serif` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#f5f0eb;color:#1a1a1a;font-weight:600">Aa</span> `#f5f0eb` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#f5f0eb;color:#1a1a1a;font-weight:600">Aa</span> `#1a1a1a` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a1a2e;color:#e0d5c1;font-weight:600">Aa</span> `#1a1a2e` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a1a2e;color:#e0d5c1;font-weight:600">Aa</span> `#e0d5c1` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#fefefe;color:#2c3e50;font-weight:600">Aa</span> `#fefefe` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#fefefe;color:#2c3e50;font-weight:600">Aa</span> `#2c3e50` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d1117;color:#f0e6d3;font-weight:600">Aa</span> `#0d1117` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d1117;color:#f0e6d3;font-weight:600">Aa</span> `#f0e6d3` |

**Minimal** — `theme: minimal` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#111111;font-weight:600">Aa</span> `#ffffff` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#111111;font-weight:600">Aa</span> `#111111` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0f172a;color:#f1f5f9;font-weight:600">Aa</span> `#0f172a` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0f172a;color:#f1f5f9;font-weight:600">Aa</span> `#f1f5f9` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#fafaf9;color:#1c1917;font-weight:600">Aa</span> `#fafaf9` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#fafaf9;color:#1c1917;font-weight:600">Aa</span> `#1c1917` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#18181b;color:#fafafa;font-weight:600">Aa</span> `#18181b` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#18181b;color:#fafafa;font-weight:600">Aa</span> `#fafafa` |

**Hacker** — `theme: hacker` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d1117;color:#58a6ff;font-weight:600">Aa</span> `#0d1117` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d1117;color:#58a6ff;font-weight:600">Aa</span> `#58a6ff` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#282a36;color:#bd93f9;font-weight:600">Aa</span> `#282a36` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#282a36;color:#bd93f9;font-weight:600">Aa</span> `#bd93f9` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#002b36;color:#b58900;font-weight:600">Aa</span> `#002b36` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#002b36;color:#b58900;font-weight:600">Aa</span> `#b58900` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a1b26;color:#7aa2f7;font-weight:600">Aa</span> `#1a1b26` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a1b26;color:#7aa2f7;font-weight:600">Aa</span> `#7aa2f7` |

**Poster** — `theme: poster` (4 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#000000;color:#ffffff;font-weight:600">Aa</span> `#000000` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#000000;color:#ffffff;font-weight:600">Aa</span> `#ffffff` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a0a2e;color:#f0e68c;font-weight:600">Aa</span> `#1a0a2e` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a0a2e;color:#f0e68c;font-weight:600">Aa</span> `#f0e68c` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#000000;font-weight:600">Aa</span> `#ffffff` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#000000;font-weight:600">Aa</span> `#000000` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0a192f;color:#64ffda;font-weight:600">Aa</span> `#0a192f` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0a192f;color:#64ffda;font-weight:600">Aa</span> `#64ffda` |

**Borneli** — `theme: borneli` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ece7e2;color:#1a1050;font-weight:600">Aa</span> `#ece7e2` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ece7e2;color:#1a1050;font-weight:600">Aa</span> `#1a1050` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a1050;color:#ece7e2;font-weight:600">Aa</span> `#1a1050` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1a1050;color:#ece7e2;font-weight:600">Aa</span> `#ece7e2` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#1a1050;font-weight:600">Aa</span> `#ffffff` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#1a1050;font-weight:600">Aa</span> `#1a1050` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#8a2080;color:#ffffff;font-weight:600">Aa</span> `#8a2080` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#8a2080;color:#ffffff;font-weight:600">Aa</span> `#ffffff` |
| 5 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#f5f0eb;color:#1a1050;font-weight:600">Aa</span> `#f5f0eb` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#f5f0eb;color:#1a1050;font-weight:600">Aa</span> `#1a1050` |

**Alun** — `theme: alun` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d0c0c;color:#FF9414;font-weight:600">Aa</span> `#0d0c0c` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d0c0c;color:#FF9414;font-weight:600">Aa</span> `#FF9414` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d0c0c;color:#ED1460;font-weight:600">Aa</span> `#0d0c0c` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0d0c0c;color:#ED1460;font-weight:600">Aa</span> `#ED1460` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#f3f2f2;color:#0d0c0c;font-weight:600">Aa</span> `#f3f2f2` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#f3f2f2;color:#0d0c0c;font-weight:600">Aa</span> `#0d0c0c` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#FF9414;color:#0d0c0c;font-weight:600">Aa</span> `#FF9414` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#FF9414;color:#0d0c0c;font-weight:600">Aa</span> `#0d0c0c` |
| 5 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ED1460;color:#ffffff;font-weight:600">Aa</span> `#ED1460` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ED1460;color:#ffffff;font-weight:600">Aa</span> `#ffffff` |

**Nordic** — `theme: nordic` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0a1628;color:#e2e8f0;font-weight:600">Aa</span> `#0a1628` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0a1628;color:#e2e8f0;font-weight:600">Aa</span> `#e2e8f0` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#fafaf9;color:#1c1917;font-weight:600">Aa</span> `#fafaf9` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#fafaf9;color:#1c1917;font-weight:600">Aa</span> `#1c1917` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1e293b;color:#f1f5f9;font-weight:600">Aa</span> `#1e293b` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1e293b;color:#f1f5f9;font-weight:600">Aa</span> `#f1f5f9` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0f172a;color:#fbbf24;font-weight:600">Aa</span> `#0f172a` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0f172a;color:#fbbf24;font-weight:600">Aa</span> `#fbbf24` |
| 5 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#0f172a;font-weight:600">Aa</span> `#ffffff` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#0f172a;font-weight:600">Aa</span> `#0f172a` |

**Keynote** — `theme: keynote` (5 schemes)

| # | Background | Text |
|---|-----------|------|
| 1 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#000000;color:#ffffff;font-weight:600">Aa</span> `#000000` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#000000;color:#ffffff;font-weight:600">Aa</span> `#ffffff` |
| 2 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#111827;color:#f9fafb;font-weight:600">Aa</span> `#111827` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#111827;color:#f9fafb;font-weight:600">Aa</span> `#f9fafb` |
| 3 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#111827;font-weight:600">Aa</span> `#ffffff` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#ffffff;color:#111827;font-weight:600">Aa</span> `#111827` |
| 4 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0c0a20;color:#e0e7ff;font-weight:600">Aa</span> `#0c0a20` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#0c0a20;color:#e0e7ff;font-weight:600">Aa</span> `#e0e7ff` |
| 5 | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1c1917;color:#fef3c7;font-weight:600">Aa</span> `#1c1917` | <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#1c1917;color:#fef3c7;font-weight:600">Aa</span> `#fef3c7` |

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
