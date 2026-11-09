# Caseback Brand Handover for Claude Code

Nov 9, 2026 · @Joseph

## How to use this document

This is the complete brief for rebranding 7mgmt.com (currently "Seven Dials") as **Caseback**. It is written so that Claude Code can rebuild the site from it without guessing. Nothing here is optional unless marked as a decision still open.

The order to work in:

1. Save the master brief below as `CLAUDE.md` in the root of the website repo (or append it to the existing one). Claude Code reads this file every session, so the brand rules are never lost between conversations.
2. Save the token file from the Design tokens section as `src/styles/tokens.css` (or wherever global CSS lives) and import it first.
3. Save the three SVGs from the Logo system section as files under `public/brand/`.
4. Run the prompts in the Prompt sequence section one at a time, in order. Each prompt is self-contained. Do not skip ahead; each one assumes the previous is done and committed.
5. After each prompt, open the site, compare against the rule in this document, and either accept or paste the fix prompt that follows it.

The canvas with the visual references (homepage, identity board, product page, logo exploration) is the companion to this document. Where this document and the canvas disagree, this document wins, because it was written after the canvas and contains the final decisions.

### Master brief, save as CLAUDE.md

```
# Caseback, brand and build rules

You are rebuilding the luxury watch dealer site at 7mgmt.com (previously branded Seven Dials) as CASEBACK. These rules apply to every file you touch. Read them before writing any UI.

## Who we are
Caseback is an independent Melbourne dealer in new and pre-owned luxury watches (Rolex, Patek Philippe, Audemars Piguet, Richard Mille and others), roughly 5,600 pieces in stock, showroom by appointment at Level 1, 99 Queen Street, Melbourne VIC 3000. Sales happen mostly over WhatsApp (+61 499 005 000) and email (sales@ domain). Second-hand dealer licence SHD-0016602 (VIC). Prices in AUD include GST.

The name comes from the back of the watch, where the serial number, reference and service marks live. It is the part a dealer actually reads. Our promise: every watch is opened, inspected, authenticated and sealed before a customer sees it.

## Positioning in one line
A private dealer you visit by appointment: warm, discreet, expert, unhurried. Never a hype shop. Never urgency tactics.

## Tagline (fixed)
"Known before it is worn."
Secondary lines allowed in body copy and footers: "Read the caseback.", "Every reference, accounted for.", "Nothing here we have not opened."

## Voice
Short sentences. Plain words. Specific over adjectival (say "+2 s/day in six positions", not "excellent condition"). Sentence case everywhere except small spaced-caps labels. No exclamation marks. No em dashes; use commas, full stops or brackets. No "luxury", "exclusive", "premium", "elevate", "curated". Numbers use a thin space as thousands separator in display type (A$199 100) and a comma in tables and data (A$199,100). References always in monospace.

## Colour (CSS variables in tokens.css, never hard-code hex in components)
--cb-chalk   #F1EFE8   page ground
--cb-paper   #F6F4EE   raised surfaces, cards, inputs
--cb-peat    #15201C   text, rules, dark panels
--cb-bottle  #1F4A3C   accent, primary buttons, links, solid panels
--cb-bottle-deep #143127 hover on bottle
--cb-straw   #C9B98A   seal rim text, small details on green only
--cb-stone   #5C5853   secondary text
--cb-mist    #8A8479   tertiary text, mono metadata
--cb-rule    #D6D5CE   hairlines on light
--cb-rule-dark #2E5C4C hairlines on bottle
--cb-ok      #2F6B4F   success (functional only)
--cb-warn    #8A5A1E   warning (functional only)
--cb-error   #7A2E2E   error (functional only)
No pure black, no pure white except product photo backgrounds if the photo demands it, no gold on light backgrounds, no gradients, no drop shadows, no border-radius above 3px (0 by default).

## Type
Display and headings: "Cormorant Garamond", weights 300 (large headlines), 400 (section titles), 500 (wordmark, product names). Italic 300/400 for emphasis inside a headline.
Body and UI: "Inter", weights 400 and 500 only.
Data (references, serials, prices in tables, dates, counts): "JetBrains Mono" 400.
Scale: 112/96/60/44/30/24/16/13/11 px. Headlines letter-spacing -0.02em, line-height 0.9 to 1.0. Body 16px/1.65. Labels 11px, letter-spacing 0.18em to 0.22em, uppercase. No bold Inter (600+). Never uppercase a headline.

## Logo
Three assets in /public/brand: grip-mark.svg, lockup.svg, seal.svg. Header uses lockup at 40px height on desktop, 26px on mobile. Favicon uses grip-mark. Seal appears on every product tile corner (34px), on the product page caseback report, and in the authentication card PDF. Never stretch, recolour outside the palette, add effects, or place on a photo.

## Layout
Max content width 1312px (1440 with 64px side gutters). 12-column grid, 24px gutter. Section dividers are 1px --cb-peat full-width rules, not spacing alone. Cards are NOT boxes: product tiles have a 1px top rule and no border or background; the photo sits straight on chalk. The only solid-filled panels are bottle green blocks and the occasional peat panel.

## Components (see the brand doc for full specs)
Buttons: primary = peat fill, chalk text, 11px uppercase 0.2em, 18px 30px padding, square corners. Secondary = transparent, 1px peat border. Tertiary = text with 1px bottle underline, 4px offset. On green panels, primary = chalk fill with peat text.
Badges: 10px uppercase 0.16em, 7px 12px padding, 1px border, no fill. Condition badges in bottle text.
Inputs: paper fill, 1px rule border, peat on focus, 14px Inter, 14px 16px padding, square.
Tables: hairline rows, mono for refs and prices, price column right-aligned.

## Photography
Watches photographed straight-on on white or chalk, consistent scale (case fills ~60% of frame height), no drop shadows, no beige placeholder boxes. Loading state is a faint grip-mark outline on chalk, not a grey block.

## Non-negotiables
No dark mode in v1. No floating side buttons except one WhatsApp button, bottom right, bottle green. No marquee tickers. Empty search state says "All watches" with the count, never SEARCH: "". Every product title includes a distinguishing attribute (dial colour or size), never just the collection name repeated.
```

## Brand foundation

Caseback is named for the back of the watch, where the serial, reference and service marks live, and which a dealer reads before anything else. The brand idea is inspection as a promise: every watch is opened, measured and sealed before a customer sees it.

### Positioning

| Attribute | Caseback is | Caseback is not |
| --- | --- | --- |
| Posture | A private dealer you visit by appointment | A hype store with drops and countdowns |
| Tone | Warm, discreet, expert, unhurried | Loud, salesy, exclusive-for-its-own-sake |
| Proof | Inspection reports, serials (masked), timing figures, warranty dates | Adjectives and stock photos |
| Local anchor | Queen Street, Melbourne, named staff (Peter, Mina) | A faceless web store |
| Reference points | Christie's catalogue, A Collected Man, a good tailor's website | Chrono24, grey-market volume sellers |

### Tagline and secondary lines

The fixed tagline is **Known before it is worn.** It appears in the hero, the footer and the email signature, and nowhere else on the same page twice.

Secondary lines, for section headings, journal and packaging only (never two on one screen):

- Read the caseback.
- Every reference, accounted for.
- Nothing here we have not opened.
- Sealed this week. (for the new-arrivals section only)

Retired lines, do not use: "The references others are still waiting for" (hype register), "Access beyond retail" (current site), "Luxury watches Australia" (generic).

### Voice rules

1. Short sentences, plain words. Under 20 words a sentence in body copy.
2. Specific beats adjectival. Write "+2 s/day in six positions", not "keeps excellent time". Write "unpolished, original bevels", not "pristine".
3. Sentence case for all headings and buttons. Uppercase only on 10 to 11px spaced labels.
4. No exclamation marks anywhere. No emoji anywhere.
5. No em dashes. Use commas, full stops or brackets.
6. Banned words: luxury, exclusive, premium, elevate, elevated, curated, bespoke, stunning, iconic, grail, hype, unlock, journey.
7. Years and dates in product copy use the pattern "2021 · Full set" or Roman numerals on the seal ("04 · XI · 2026").
8. Prices in display type use a thin space for thousands (A$199 100); in tables and data use a comma (A$199,100). Always the A$ prefix, never "AUD".
9. Stock counts are "2 184 pieces" or "2 184" with the house name, never "in stock" repeated under every tile.
10. Staff are named. "Inspected by Peter" on a report is stronger than "Inspected by our team".

### The name

Before spending on domains or print, check: IP Australia trade mark search (class 14 watches, class 35 retail), ASIC business name register, and domain availability for caseback.com.au and caseback.au. Fallbacks if blocked: Caseback & Co, Caseback Melbourne, Casebk (not preferred).

## Colour palette

Four brand colours carry the whole site: chalk ground, peat text, bottle green accent, straw for details on green. Everything else is a neutral tint or a functional colour.

| Token | Name | Hex | Use | Never |
| --- | --- | --- | --- | --- |
| `--cb-chalk` | Chalk | #F1EFE8 | Page background, product photo ground | As text |
| `--cb-paper` | Paper | #F6F4EE | Inputs, cards that must lift, the authentication card | Large areas next to chalk (too close) |
| `--cb-peat` | Peat | #15201C | All body text, headings, 1px rules, primary buttons, dark panels | Large backgrounds on the homepage (v1 is light) |
| `--cb-bottle` | Bottle | #1F4A3C | Links, labels, primary accent, solid hero panel, WhatsApp button, seal | Body text (too dark-on-dark on peat; too low contrast at 11px on chalk unless 500 weight) |
| `--cb-bottle-deep` | Bottle deep | #143127 | Hover and active on bottle elements | Anywhere at rest |
| `--cb-straw` | Straw | #C9B98A | Seal rim text, italic city line, small details ON GREEN OR PEAT ONLY | On chalk or paper (fails contrast, reads as brass) |
| `--cb-stone` | Stone | #5C5853 | Secondary text, body copy under headlines | Headings |
| `--cb-mist` | Mist | #8A8479 | Mono metadata, tertiary labels, counts | Anything the user must read to act |
| `--cb-rule` | Rule | #D6D5CE | Hairlines inside sections, thumbnail borders | Section dividers (those are peat) |
| `--cb-rule-dark` | Rule dark | #2E5C4C | Hairlines on bottle panels | On light |
| `--cb-on-dark` | Chalk on dark | #F1EFE8 | Text on bottle or peat | — |
| `--cb-on-dark-muted` | Mist on dark | #CFE0D8 | Secondary text on bottle | On peat (use #B9B2A3) |
| `--cb-ok` | Success | #2F6B4F | Form success, "in stock" dot | Decoration |
| `--cb-warn` | Warning | #8A5A1E | Reservation expiring, low stock | Decoration |
| `--cb-error` | Error | #7A2E2E | Form errors | Decoration |

### Usage ratios

On a typical page: roughly 70% chalk, 20% peat (text and rules), 8% bottle, 2% straw. If a screen has more green than that, it is a hero or a deliberate panel, not a default.

### Contrast, checked

- Peat on chalk 14.8:1. Stone on chalk 6.1:1. Mist on chalk 3.6:1, so mist is allowed only at 11px+ for non-essential metadata and never for links or buttons.
- Chalk on bottle 8.9:1. Straw on bottle 4.6:1, passes for 13px+ only, which is why straw never goes below 13px except in the seal SVG (decorative, not read).
- Bottle on chalk 7.5:1, fine for links and labels.

### Rules

1. No pure #000000 or #FFFFFF in CSS. Product photos may be shot on white; the site chrome never is.
2. No gradients, no shadows, no glows, no glassmorphism.
3. Corner radius 0 by default. Inputs and buttons square. The only rounded things are the app icon (14px) and avatars (circle).
4. Green is an accent, not a theme. One solid green panel per screen at most.
5. Straw is for green and peat backgrounds only. If you catch yourself putting straw on chalk, you want bottle.
6. The current site's gold (#C9A24D-ish), pure black and beige placeholder tiles are all retired.

## Typography

Three families, each with one job: Cormorant Garamond for anything that should feel like a dealer speaking, Inter for anything the user operates, JetBrains Mono for anything that is a fact (reference, serial, price, date, count).

Load from Google Fonts with this exact link in the document head (or self-host the same weights):

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

### Scale

| Token | Size / line-height | Family, weight | Letter-spacing | Used for |
| --- | --- | --- | --- | --- |
| `--cb-text-hero` | 112px / 0.9 | Cormorant 300 | -0.025em | Homepage headline only. 64px on mobile. |
| `--cb-text-display` | 96px / 0.95 | Cormorant 300 | -0.02em | Page heroes (Sell, About). 56px on mobile. |
| `--cb-text-h1` | 60px / 1.0 | Cormorant 300 | -0.015em | Product name on product page. 40px mobile. |
| `--cb-text-h2` | 44px / 1.05 | Cormorant 300 | -0.01em | Section titles ("Sealed this week"). 32px mobile. |
| `--cb-text-h3` | 30px / 1.1 | Cormorant 400 | 0 | House names in ledger, card titles. |
| `--cb-text-h4` | 24px / 1.15 | Cormorant 400 | 0 | Product tile titles, report title. |
| `--cb-text-wordmark` | 40px / 0.9 | Cormorant 500 | -0.015em | The word Caseback in the header. 26px mobile. |
| `--cb-text-body` | 16px / 1.65 | Inter 400 | 0 | Paragraphs. |
| `--cb-text-body-sm` | 13px / 1.6 | Inter 400 | 0 | Table cells, report rows, captions. |
| `--cb-text-label` | 11px / 1 | Inter 400 | 0.18em to 0.22em, uppercase | Nav, buttons, section eyebrows. |
| `--cb-text-badge` | 10px / 1 | Inter 400 | 0.16em, uppercase | Condition badges. |
| `--cb-text-mono` | 13px / 1.5 | JetBrains Mono 400 | 0.02em | Prices in tables and tiles. |
| `--cb-text-mono-sm` | 11px / 1.5 | JetBrains Mono 400 | 0.08em | References, serials, counts, metadata. |
| `--cb-text-descriptor` | 12.5px / 1 | Inter 400 | 0.34em, uppercase | "Fine watches · Melbourne" under the wordmark. |

### Rules

1. Headlines are sentence case, never uppercase, never bold. Emphasis inside a headline is italic 300, usually on the last two or three words ("Known before *it is worn.*").
2. Inter weight 500 is the maximum. No 600, 700, 800 anywhere. If something needs to stand out, use size, colour or space, not weight.
3. Every reference number, serial, price in a table, stock count and date-stamp is JetBrains Mono. A price in a headline or hero can be Cormorant; a price next to a product is mono.
4. Spaced-caps labels (0.18em+) are only for text under 12px. Never letterspace Cormorant except the seal rim text inside the SVG.
5. Lists and tables use Inter 13px, not Cormorant.
6. The middle dot (·, U+00B7) is the separator in labels and metadata ("2021 · Full set"), never a slash, pipe or hyphen.
7. Product names follow the pattern Collection + distinguishing attribute, in Cormorant: "Royal Oak 41, Blue", "Nautilus 5711, Blue", "Daytona, Panda", "Submariner Date, Black". Never "Royal Oak Stainless Steel" repeated five times.
8. Numerals in Cormorant display sizes are lining (default in that font). Do not enable old-style figures.
9. Minimum body size 13px. Minimum any text 10px, and only for badges.

## Logo system

Three assets, all built from one geometry: a screw-down caseback seen straight on. Outer bezel ring, a notched grip ring with twelve notches, and an inner sealed disc. Save these three files exactly as given under `public/brand/`. They use `currentColor`, so colour is set by the parent element's CSS `color`.

### 1. Grip mark, `public/brand/grip-mark.svg`

Standalone mark. Favicon, app icon, footer, loading state, product tile stamp (small variant without the inner disc).

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" fill="none" stroke="currentColor" role="img" aria-label="Caseback">
  <circle cx="70" cy="70" r="66" stroke-width="3.5"/>
  <circle cx="70" cy="70" r="57" stroke-width="13" stroke-dasharray="12 17.85" stroke-dashoffset="6"/>
  <circle cx="70" cy="70" r="38" stroke-width="3.5"/>
</svg>
```

Small variant for 16 to 24px (favicon, tile stamp): drop the inner disc and thicken.

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" fill="none" stroke="currentColor" aria-hidden="true">
  <circle cx="70" cy="70" r="64" stroke-width="7"/>
  <circle cx="70" cy="70" r="50" stroke-width="22" stroke-dasharray="12 17.85" stroke-dashoffset="6"/>
</svg>
```

The dash maths: circumference at r=57 is 358.1; twelve notches means 358.1 / 12 = 29.85 per cycle; 12 on, 17.85 off. Keep these numbers; changing r means recomputing the gap or the notches will not close evenly.

### 2. Primary lockup, `public/brand/lockup.svg`

Grip mark left, wordmark "Caseback" in Cormorant Garamond 500 lowercase, descriptor "FINE WATCHES · MELBOURNE" underneath in Inter spaced caps. The gap between mark and wordmark equals 0.28 of the mark's height. The wordmark cap height aligns to the top of the mark; the descriptor baseline aligns to the bottom of the mark.

In HTML (preferred, so the fonts stay live and the text stays selectable):

```
<a href="/" class="cb-lockup" aria-label="Caseback, fine watches, Melbourne">
  <svg class="cb-lockup__mark" viewBox="0 0 140 140" fill="none" stroke="currentColor" aria-hidden="true">
    <circle cx="70" cy="70" r="66" stroke-width="3.5"/>
    <circle cx="70" cy="70" r="57" stroke-width="13" stroke-dasharray="12 17.85" stroke-dashoffset="6"/>
    <circle cx="70" cy="70" r="38" stroke-width="3.5"/>
  </svg>
  <span class="cb-lockup__text">
    <span class="cb-lockup__word">Caseback</span>
    <span class="cb-lockup__desc">Fine watches · Melbourne</span>
  </span>
</a>
```

```
.cb-lockup{display:inline-flex;align-items:center;gap:.28em;color:var(--cb-peat);text-decoration:none;font-size:40px}
.cb-lockup__mark{width:1em;height:1em;flex:none}
.cb-lockup__text{display:flex;flex-direction:column;gap:.1em}
.cb-lockup__word{font-family:"Cormorant Garamond",serif;font-weight:500;font-size:1em;line-height:.86;letter-spacing:-.015em}
.cb-lockup__desc{font-family:Inter,sans-serif;font-size:.3125em;letter-spacing:.34em;text-transform:uppercase;color:var(--cb-bottle);padding-left:.12em}
@media (max-width:768px){.cb-lockup{font-size:26px}.cb-lockup__desc{display:none}}
```

On a bottle green panel, set `color: var(--cb-on-dark)` on `.cb-lockup` and `color: var(--cb-straw)` on `.cb-lockup__desc`.

Clear space: one mark radius (half the mark height) on all sides. Minimum size: 26px font-size with descriptor hidden; 20px for the mark alone.

### 3. Seal, `public/brand/seal.svg`

The authentication seal: rim text in straw, grip ring, inspection number and date inside. Default colours are for use on bottle green. For use on chalk, replace `#C9B98A` with `#1F4A3C` and `#F1EFE8` with `#15201C`.

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" stroke="#F1EFE8" role="img" aria-label="Caseback authentication seal, inspected, authenticated, warranted">
  <defs><path id="cb-seal-rim" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs>
  <circle cx="100" cy="100" r="96" stroke-width="1.4"/>
  <circle cx="100" cy="100" r="90" stroke-width="0.5"/>
  <text font-family="Cormorant Garamond, serif" font-size="13.2" letter-spacing="3.6" font-weight="500" fill="#C9B98A" stroke="none">
    <textPath href="#cb-seal-rim">INSPECTED · AUTHENTICATED · WARRANTED · CASEBACK MELBOURNE ·</textPath>
  </text>
  <circle cx="100" cy="100" r="58" stroke-width="8" stroke-dasharray="12 18.37" stroke-dashoffset="6"/>
  <circle cx="100" cy="100" r="46" stroke-width="0.8"/>
  <text x="100" y="92" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="2.5" fill="#F1EFE8" stroke="none">NO. {{number}}</text>
  <path d="M80 100h40" stroke-width="0.6" stroke="#C9B98A"/>
  <text x="100" y="116" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="13" fill="#F1EFE8" stroke="none">{{date}}</text>
</svg>
```

`{{number}}` is the inspection number, five digits, format YY + four-digit sequence (04117 = 2026 inspection number 117, where 04 is years since a 2022 base; simpler alternative: use the last two digits of the year, 26117). `{{date}}` is day · month in Roman numerals · year, e.g. `04 · XI · 2026`. Generate the seal per watch from this template at build time or server-side; never hand-edit the text.

Reduced seal for tile corners (34px) and anywhere under 60px: rim text removed.

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true">
  <circle cx="100" cy="100" r="96" stroke-width="4"/>
  <circle cx="100" cy="100" r="58" stroke-width="16" stroke-dasharray="12 18.37" stroke-dashoffset="6"/>
</svg>
```

### Where each appears

| Asset | Place | Size | Colour |
| --- | --- | --- | --- |
| Lockup | Site header | 40px (26px mobile) | Peat on chalk |
| Lockup | Footer | 26px | Peat |
| Lockup | Email signature, invoices, business card front | 40px equivalent | Peat on chalk, or chalk on bottle |
| Grip mark | Favicon, Apple touch icon | 16, 32, 180px | Chalk on bottle (icon), peat (favicon .ico) |
| Grip mark | Image loading state | 48px | Mist on chalk, 40% opacity |
| Grip mark | Social avatar | 400px | Chalk on bottle circle |
| Seal (full) | Product page caseback report | 120px | Bottle on paper |
| Seal (full) | Authentication card PDF | 28mm | Bottle on paper |
| Seal (full) | Homepage hero panel | 760px, cropped off right edge | Chalk and straw on bottle |
| Seal (reduced) | Product tile corner | 34px | Bottle on chalk; straw on bottle tiles |
| Seal (reduced) | Swing tag, emboss | 20mm | Bottle; blind emboss |

### Do not

- Rotate the mark so a notch sits at 12 o'clock (dashoffset 6 is set so a notch straddles the top; leave it).
- Add a drop shadow, bevel, metallic gradient or outline glow.
- Put the lockup over a photograph.
- Use the old "SD" monogram, the Seven Dials wordmark, or any gold anywhere.
- Stretch the wordmark or change its weight. Cormorant 500 only.
- Use the engraved rim text at sizes where it cannot be read (under 90px); use the reduced seal instead.

## Design tokens

Save this as `tokens.css` and import it before any other stylesheet. Every component must reference these variables; a hard-coded hex, font-family or px size in a component is a bug.

```
/* Caseback design tokens, v1, 2026-11-09 */
:root{
  /* colour */
  --cb-chalk:#F1EFE8;
  --cb-paper:#F6F4EE;
  --cb-peat:#15201C;
  --cb-bottle:#1F4A3C;
  --cb-bottle-deep:#143127;
  --cb-straw:#C9B98A;
  --cb-stone:#5C5853;
  --cb-mist:#8A8479;
  --cb-rule:#D6D5CE;
  --cb-rule-dark:#2E5C4C;
  --cb-on-dark:#F1EFE8;
  --cb-on-dark-muted:#CFE0D8;
  --cb-on-peat-muted:#B9B2A3;
  --cb-ok:#2F6B4F;
  --cb-warn:#8A5A1E;
  --cb-error:#7A2E2E;

  /* semantic aliases: use these in components */
  --cb-bg:var(--cb-chalk);
  --cb-bg-raised:var(--cb-paper);
  --cb-fg:var(--cb-peat);
  --cb-fg-2:var(--cb-stone);
  --cb-fg-3:var(--cb-mist);
  --cb-accent:var(--cb-bottle);
  --cb-accent-hover:var(--cb-bottle-deep);
  --cb-line:var(--cb-peat);        /* section dividers */
  --cb-line-soft:var(--cb-rule);   /* inner hairlines */

  /* type */
  --cb-font-display:"Cormorant Garamond","Times New Roman",serif;
  --cb-font-ui:Inter,system-ui,-apple-system,sans-serif;
  --cb-font-mono:"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace;

  --cb-text-hero:112px;
  --cb-text-display:96px;
  --cb-text-h1:60px;
  --cb-text-h2:44px;
  --cb-text-h3:30px;
  --cb-text-h4:24px;
  --cb-text-wordmark:40px;
  --cb-text-body:16px;
  --cb-text-body-sm:13px;
  --cb-text-label:11px;
  --cb-text-badge:10px;
  --cb-text-mono:13px;
  --cb-text-mono-sm:11px;

  --cb-track-label:.2em;
  --cb-track-badge:.16em;
  --cb-track-desc:.34em;
  --cb-track-display:-.02em;

  --cb-leading-display:.92;
  --cb-leading-heading:1.05;
  --cb-leading-body:1.65;

  /* space, 8px base */
  --cb-s1:4px;--cb-s2:8px;--cb-s3:12px;--cb-s4:16px;--cb-s5:24px;--cb-s6:32px;--cb-s7:48px;--cb-s8:64px;--cb-s9:96px;--cb-s10:128px;

  /* layout */
  --cb-gutter:64px;
  --cb-max:1312px;
  --cb-col-gap:24px;
  --cb-radius:0;
  --cb-radius-icon:14px;

  /* motion */
  --cb-ease:cubic-bezier(.2,.6,.2,1);
  --cb-dur:180ms;
  --cb-dur-slow:320ms;
}

@media (max-width:1024px){:root{--cb-gutter:40px;--cb-text-hero:84px;--cb-text-display:72px;--cb-text-h1:48px;--cb-text-h2:36px}}
@media (max-width:768px){:root{--cb-gutter:20px;--cb-text-hero:64px;--cb-text-display:56px;--cb-text-h1:40px;--cb-text-h2:32px;--cb-text-h3:24px;--cb-text-wordmark:26px}}

/* base */
html{background:var(--cb-bg);color:var(--cb-fg);font-family:var(--cb-font-ui);font-size:var(--cb-text-body);line-height:var(--cb-leading-body);-webkit-font-smoothing:antialiased}
body{margin:0}
h1,h2,h3,h4{font-family:var(--cb-font-display);font-weight:300;letter-spacing:var(--cb-track-display);line-height:var(--cb-leading-display);margin:0}
h3,h4{font-weight:400;letter-spacing:0;line-height:var(--cb-leading-heading)}
h1{font-size:var(--cb-text-h1)}h2{font-size:var(--cb-text-h2)}h3{font-size:var(--cb-text-h3)}h4{font-size:var(--cb-text-h4)}
a{color:var(--cb-accent);text-decoration:none}a:hover{color:var(--cb-accent-hover)}
*{box-sizing:border-box}
button,input,select,textarea{font:inherit;border-radius:var(--cb-radius)}
::selection{background:var(--cb-bottle);color:var(--cb-on-dark)}
.cb-mono{font-family:var(--cb-font-mono);font-size:var(--cb-text-mono);letter-spacing:.02em}
.cb-mono-sm{font-family:var(--cb-font-mono);font-size:var(--cb-text-mono-sm);letter-spacing:.08em;color:var(--cb-fg-3)}
.cb-label{font-size:var(--cb-text-label);letter-spacing:var(--cb-track-label);text-transform:uppercase}
.cb-eyebrow{composes:cb-label;color:var(--cb-accent)}
.cb-rule{border-top:1px solid var(--cb-line)}
.cb-rule-soft{border-top:1px solid var(--cb-line-soft)}
.cb-container{max-width:var(--cb-max);margin-inline:auto;padding-inline:var(--cb-gutter)}
```

If the stack is Tailwind, map these into `theme.extend` (colors, fontFamily, fontSize, letterSpacing, spacing, borderRadius: {DEFAULT:'0', icon:'14px'}) and turn off the default `rounded` and `shadow` utilities in the project's lint rules so they cannot creep back in.

If the stack is Shopify (Liquid theme), put the `:root` block in `base.css` and remove the theme's own colour scheme settings from `settings_data.json`, or set every scheme to these values, so the theme editor cannot drift the palette.

## Layout and components

The system is hairlines and type, not boxes. Sections are separated by full-width 1px peat rules. Cards do not have borders or backgrounds; they have a top rule. The only filled panels are deliberate bottle green blocks.

### Grid

- Max content width 1312px inside 64px gutters (1440 total). 12 columns, 24px gap.
- Vertical rhythm on an 8px base. Section padding 56px top, 48px bottom on desktop; 40/32 on mobile.
- Full-width rules extend edge to edge of the viewport, not just the container.

### Header

| Element | Spec |
| --- | --- |
| Height | 92px desktop, 64px mobile. Not sticky in v1 (a sticky header on a light page needs a shadow, which we do not use). If sticky is required, use a 1px peat bottom rule only. |
| Left | Lockup at 40px (26px mobile, descriptor hidden). |
| Centre | Nav: Watches, Sell, Journal, Visit. 11px label style, peat. Hover: bottle. Active: 1px bottle underline, 6px offset. |
| Right | Phone number in mono 11px mist, then primary button "Enquire" (bottle fill, chalk text). Mobile: WhatsApp icon button only, 44px square. |
| Bottom | 1px peat rule, full width. |
| Remove | The marquee ticker, the SD monogram, the wishlist and cart icon cluster (keep a single "Saved" text link in the Watches dropdown if needed), the currency selector (move to footer). |

### Buttons

| Variant | Fill | Text | Border | Padding | Hover |
| --- | --- | --- | --- | --- | --- |
| Primary | peat | chalk | none | 18px 30px | bottle fill |
| Primary on green | chalk | peat | none | 18px 30px | paper fill |
| Secondary | transparent | peat | 1px peat | 17px 29px | peat fill, chalk text |
| Tertiary (text) | none | peat | 1px bottle bottom only, 4px offset | 0 0 4px | bottle text |
| Accent (Enquire, WhatsApp) | bottle | chalk | none | 12px 18px | bottle-deep |

All buttons: Inter 11px, uppercase, 0.2em tracking, square corners, minimum 44px tall on touch, transition 180ms on background and colour only. Never a loading spinner inside a button; disable and dim to 50%.

### Product tile

- No border, no background, no radius. A 1px peat rule on top. 24px column gap between tiles.
- Image area: fixed aspect 4:5 on desktop, photo centred, watch scaled so the case fills \~60% of the height, on chalk. Every third or featured tile may invert to a bottle background with the photo on it (only if the photography has been cut out).
- Reduced seal stamp, 34px, top right of the image area, bottle (straw on inverted tiles).
- Below the image, 14px gap, then one line: product name in Cormorant 24px left, price in mono 13px right, baseline aligned.
- Then one line in mono 11px mist: HOUSE · REFERENCE left, condition and year right in bottle ("2021 · FULL SET", "UNWORN", "2024 · CARD").
- Hover: the image lifts 4px (translateY) over 320ms, nothing else. No shadow.
- Loading state: grip mark at 48px, mist, 40% opacity, centred on chalk. Never a grey or beige block.

### Badges

10px Inter uppercase 0.16em, 7px 12px padding, 1px border, no fill, square. Default border and text peat. Condition and authentication badges: border straw-on-green / bottle-on-chalk, text bottle. Examples: FULL SET, UNWORN, FACTORY WARRANTY TO 03·2026, INSPECTED 04·11·2026.

### Inputs and forms

- Paper fill, 1px rule border, peat border on focus (no outline glow, but keep a visible 2px peat focus ring for keyboard users via `:focus-visible`).
- 14px Inter, 14px 16px padding, square. Labels above in 11px label style, mist. Helper text 13px stone. Errors 13px error colour with the field border turning error.
- Select elements styled the same, with a 1px chevron icon in peat.
- Checkboxes and radios: custom, 16px square or circle, 1px peat border, peat fill when checked with a chalk tick. Never the browser default white box on dark.

### Filters (search and collection sidebar)

- Sidebar 240px, no background, sections separated by soft rules. Group titles in 11px label style, bottle.
- Each group collapsed to its top 6 options with a "+ 23 more" tertiary link. Brand group has a 13px search field at the top.
- Counts right-aligned in mono 11px mist.
- Selected filters appear as removable badges above the grid.
- On mobile the sidebar becomes a full-screen sheet opened by a "Filter · 3" secondary button.

### Tables (specs, caseback report, index)

- Hairline rows (soft rule), header row in mono 10px label style mist with a 1px peat rule beneath.
- Reference, serial, price, date and timing columns in mono. Price right-aligned. Names in Inter 15px/500.
- Row hover: paper background. No zebra striping.

### Ledger strip (the four houses)

Four equal columns, 1px peat rules between and above and below. House name in Cormorant 30px left, count in mono 11px mist right, baseline aligned. Each column is a link to that house's collection.

### WhatsApp button

One floating element only: a 56px circle, bottle fill, chalk WhatsApp glyph, bottom right, 24px from edges, no shadow, no label. Appears after 300px of scroll. Everything else that currently floats (SELL, CS, the degree symbol, back-to-top) is removed; Sell lives in the nav, back-to-top is not needed.

### Footer

Three columns on a peat rule: lockup 26px with the address and licence in mono 11px; nav links in label style; the tagline "Known before it is worn" in Cormorant 20px italic, bottle. Currency selector and the legal line ("Independent dealer, not affiliated with any brand shown. Prices in AUD include GST.") in 11px mist at the very bottom.

### Motion

Only opacity, colour, background and small translateY. 180ms for interface, 320ms for images. No parallax, no scroll-jacking, no entrance animations on first paint except a 320ms fade of the hero image.

## Page by page

Each page below is specified top to bottom. Build in this order: homepage, search/collection, product, sell, then mobile passes on each.

### Homepage

1. **Header** as specified in Components.
2. **Hero, 780px tall, split 52/48.** Left on chalk: eyebrow "— Melbourne · By appointment" (36px bottle rule then 11px label), headline "Known before it is worn." at 112px Cormorant 300 with "it is worn." in italic, three lines; 16px stone paragraph max 420px: "Every watch we sell has been opened, measured and sealed in our Queen Street workshop before you ever see it. Five thousand pieces, one standard."; primary button "View the collection" and tertiary link "Sell a watch"; bottom-left mono strip "5 667 PIECES · 4 HOUSES · EST. MMXXVI" (pull the count live). Right panel solid bottle: the full seal at 760px positioned so its right third is cropped off the panel edge, chalk strokes, straw rim text, 50% opacity; over it, a 300×380px chalk tile with the hero watch photo and a mono caption "5711/1A-010 · A$199 100" (pull from a featured product); bottom-left of the panel, Cormorant italic 20px straw "Sealed 04 · XI · 2026" (today's date in the seal format). On mobile the panel stacks under the copy at 420px tall.
3. **Ledger strip**: four houses with live counts, as specified.
4. **Sealed this week**: h2 44px left, tertiary link "All 112 →" right (live count of items added in last 7 days). Three product tiles (newest three), middle one inverted on bottle only if cut-out photography exists, else all on chalk. Mobile: horizontal scroll, 80% width tiles.
5. **The promise**: full-width peat rule, then four columns each with a Roman numeral eyebrow (I to IV) in bottle, Cormorant 24px title, 13px stone line. I Inspected by hand / Movement, case, serial, papers. II Warranty carried / Remaining factory cover, transferred to you. III Delivered insured / Australia-wide, five to seven days. IV Bought back / Trade in or sell, same-day offer.
6. **By house**: four tiles in a row, each a house name in Cormorant 30px with a representative photo on chalk and a mono count, linking to the house collection. No vertical "SEVEN DIALS" text, no "explore collection" arrows; the whole tile is the link.
7. **Visit**: split block, left a map or photo of 99 Queen Street on chalk, right on paper: "Level 1, 99 Queen Street, Melbourne", hours "Mon to Sat, 9:30 to 6, by appointment", named contacts Peter (Watches) and Mina (Sourcing and trade) with WhatsApp and email, one secondary button "Book an appointment".
8. **Journal**: two latest posts, title in Cormorant 24px, date in mono, one line excerpt. Skip in v1 if no posts exist; do not ship placeholder posts.
9. **Footer** as specified.

Remove from the current homepage: the marquee ticker, the "Access beyond retail" hero, the six-icon shortcut bar under the hero, the brand ticker, the Rolex horizontal carousel (replaced by By house), all floating buttons except WhatsApp.

### Search and collection pages

1. Breadcrumb in mono 11px mist: WATCHES / ROLEX / SUBMARINER, last item peat.
2. Title row: h2 at 44px. For a collection, the house or model name. For search with a query, "Results for "daytona"" in Cormorant with the query in italic. For search with no query, "All watches". Never show empty quotes. Count beside the title in mono 11px mist ("5 667 pieces"). Sort select right, styled per Inputs, options Featured, Newest, Price low to high, Price high to low, Reference.
3. Sidebar filters per Components. Groups: House, Model, Condition (Unworn, Pre-owned, Vintage; retire "Enquire" as a condition), Case material, Dial colour, Size, Year, Price range (two inputs), Papers (Full set, Box only, Watch only).
4. Grid: 3 columns on desktop at 1312px (not 5; five columns made every watch tiny). 2 columns on tablet, 1 on mobile with a smaller tile variant (image left 40%, text right).
5. Pagination: mono numbers, current in peat with a 1px underline, others mist. "Load more" secondary button is also acceptable. Show "1 to 48 of 5 667".
6. Empty result: Cormorant 30px "Nothing matches that yet.", 16px stone "Tell us what you are after and we will source it.", primary button "Ask us to source it" opening the sourcing form.

### Product page

1. Header, then breadcrumb WATCHES / PATEK PHILIPPE / NAUTILUS / 5711/1A-010.
2. Two columns, 7/5 split, 64px gap. **Left**: main image in a 1px peat frame, 4:5, photo on chalk, mono caption bottom-left "01 / 09 · DIAL", italic Cormorant 16px bottle top-right "Photographed as it is". Below, six thumbnails in a row, each labelled in mono 10px: DIAL, CASEBACK, CLASP, SERIAL, PAPERS, ON WRIST. The CASEBACK and SERIAL shots are mandatory for every listing; the SERIAL shot masks the last digits. Selected thumbnail has a peat border, others rule.
3. **Right, buy panel**: eyebrow house name 11px label bottle; product name h1 60px Cormorant 300 with the attribute in italic on the second line ("Nautilus 5711, / blue dial"); mono 12px stone metadata line "5711/1A-010 · 2021 · STAINLESS STEEL · 40 MM"; 1px peat rule; price in mono 34px with "incl. GST · insured delivery included" in 11px mist beside; badges row (FULL SET, FACTORY WARRANTY TO 03·2026, INSPECTED 04·11·2026 in bottle); primary button full width "Enquire on WhatsApp" (deep link with the reference pre-filled), secondary full width "Reserve for 48 hours" (opens a form, takes name, phone, email; no payment), 12px mist centred "Or see it in person. Level 1, 99 Queen Street, by appointment."
4. **The caseback report** (in the right column, below the buttons): paper panel with 1px peat border, title Cormorant 26px "The caseback report" with the full seal at 120px right. Two-column key/value grid in 13px with soft rules: Movement (calibre and "genuine"), Serial (masked, mono, e.g. "6 0•• •43"), Case (polish state), Bracelet (links present, wear), Timing (mono, "+2 s/day, 6 positions"), Papers (what is included). Footer line 12px stone: "Inspected by {{staff}} at 99 Queen Street. Full serial revealed on purchase." and a tertiary link "How we authenticate →". If any field is missing from the data, hide the row; never show "N/A".
5. **Specifications**: full-width peat rule, then a four-column strip (Case, Movement, Dial, Water resistance) with 10px label and Cormorant 22px value. Additional specs in a two-column table below if the data exists.
6. **From the journal** (optional) and **Similar pieces**: three tiles from the same model or house, standard tile component.
7. Structured data: Product schema with price, availability, brand, sku = reference, and an `additionalProperty` for inspection date. Open Graph image = the DIAL shot.

### Sell your watch page

1. Hero on bottle (the one green hero on the site): display 96px chalk "Sell or trade. Same-day offer." with "Same-day offer." italic; 16px on-dark-muted paragraph "Send the reference, a photo of the dial and a photo of the caseback. Peter replies with a number within the working day."
2. Three steps as numbered Roman columns (I Tell us the reference, II Send two photos, III Receive an offer, pay-out same day on acceptance).
3. **The form** on chalk, max 640px: House (select), Model or reference (text, mono input), Year (select), Condition (radio: Unworn, Excellent, Worn), Box and papers (radio: Full set, Box only, Papers only, Watch only), Photos (drag-drop, two required, labelled Dial and Caseback), Asking price optional (mono input, A$ prefix), Name, Phone, Email, Preferred contact (WhatsApp or Email). Primary button "Send for an offer". Under it 12px mist: "We reply within one working day. Nothing is listed or shared until you accept."
4. **Buy-price guide**: a table of the 20 most-traded references with mono reference, model, year range, condition and "we pay from" price, updated monthly with a date chip. Title "What we are paying this month".
5. Trust block: licence number, insured transit for posted watches, named contact.

### Mobile

- Header 64px: lockup 26px without descriptor left, WhatsApp icon button right, hamburger (24px, 1px strokes) far right. Menu is a full-screen chalk sheet with Cormorant 44px links.
- Hero headline 64px, panel stacks beneath at 420px with the seal cropped top-right and the watch tile centred.
- Ledger becomes a 2×2 grid. Promise becomes a vertical list with the numeral left.
- Product tiles: one per row, image left 40% on chalk, text right. Seal stamp 24px.
- Product page: gallery first as a swipeable strip with the six labels as dots-plus-labels beneath; buy panel follows; caseback report full width; buttons become a fixed bottom bar (Enquire on WhatsApp primary, Reserve secondary) 72px tall on chalk with a 1px peat top rule.
- Filters open as a sheet from a "Filter · 3" button beside the sort.
- Touch targets 44px minimum. Side gutter 20px. No hover-only interactions.

## Photography and images

The photographs are the product; the brand's job is to get out of their way. Consistency matters more than drama.

| Rule | Spec |
| --- | --- |
| Background | Pure white (#FFFFFF) or chalk (#F1EFE8) seamless. Pick one for the whole catalogue and never mix. White is acceptable because the tile has no border; the photo edge disappears into chalk at a 1px difference that the eye forgives. |
| Angle | Straight-on, dial at 12 o'clock vertical, hands at 10:10 for the dial shot. |
| Scale | Case fills 60% of the frame height on every listing, so a 36mm and a 44mm watch read at their true relative size across a grid. Crop ratio 4:5. |
| Required shots per listing | Dial, caseback (serial masked in post, last 3 to 4 digits blurred), clasp, papers spread, on-wrist. Minimum five. |
| Light | Soft, even, no hard reflections on crystal, no dramatic shadows. Colour-balanced so blue dials are blue, not purple. |
| Retouching | Dust and fingerprints only. Never remove scratches, never polish in post; the brand promise is "photographed as it is". |
| File | WebP, 1600px on the long edge for the main image, 800px for tiles, quality 82. Descriptive file names: `patek-nautilus-5711-1a-010-dial.webp`. Alt text: "Patek Philippe Nautilus 5711/1A-010, blue dial, front view". |
| Loading | Grip mark outline at 48px, mist 40%, centred on chalk, fades to the image over 320ms. Never a grey or beige block. |
| Lifestyle | Only on the Visit block and Journal. No stock imagery of wrists in cuffs. |
| Brand logos | Never reproduce Rolex, AP, Patek or RM logos or crowns as graphics on the site. The house name in Cormorant is the only brand reference. The legal line "not affiliated with any brand shown" stays in the footer. |

Migration note for the existing catalogue: the current images are on cream squares at inconsistent scale. Prompt 7 in the sequence handles this by re-cropping to 4:5, normalising the case height to 60%, and replacing the cream with the chosen background using a batch script; anything the script cannot normalise gets flagged for reshoot.

## Copy and microcopy

Fixed strings for the interface. Use them verbatim so the voice does not drift between pages.

| Place | Copy |
| --- | --- |
| Hero headline | Known before it is worn. |
| Hero paragraph | Every watch we sell has been opened, measured and sealed in our Queen Street workshop before you ever see it. Five thousand pieces, one standard. |
| Hero buttons | View the collection · Sell a watch |
| Nav | Watches · Sell · Journal · Visit |
| Header button | Enquire |
| New arrivals heading | Sealed this week |
| New arrivals link | All 112 → (live count) |
| Promise I | Inspected by hand. Movement, case, serial, papers. |
| Promise II | Warranty carried. Remaining factory cover, transferred to you. |
| Promise III | Delivered insured. Australia-wide, five to seven days. |
| Promise IV | Bought back. Trade in or sell, same-day offer. |
| Search, no query | All watches |
| Search, query | Results for "daytona" |
| Empty results | Nothing matches that yet. Tell us what you are after and we will source it. |
| Empty results button | Ask us to source it |
| Product primary | Enquire on WhatsApp |
| Product secondary | Reserve for 48 hours |
| Product note | Or see it in person. Level 1, 99 Queen Street, by appointment. |
| Report title | The caseback report |
| Report footer | Inspected by Peter at 99 Queen Street. Full serial revealed on purchase. |
| Report link | How we authenticate → |
| Price note | incl. GST · insured delivery included |
| Sell hero | Sell or trade. Same-day offer. |
| Sell paragraph | Send the reference, a photo of the dial and a photo of the caseback. Peter replies with a number within the working day. |
| Sell button | Send for an offer |
| Sell reassurance | We reply within one working day. Nothing is listed or shared until you accept. |
| Buy-price guide title | What we are paying this month |
| Visit heading | Level 1, 99 Queen Street |
| Visit hours | Mon to Sat, 9:30 to 6, by appointment |
| Visit button | Book an appointment |
| Footer tagline | Known before it is worn |
| Footer legal | Caseback Pty Ltd. Second-hand dealer licence SHD-0016602 (VIC). Prices in AUD include GST. Independent dealer, not affiliated with any brand shown. |
| Form success | Received. Peter will be in touch within one working day. |
| Form error, generic | That did not go through. Try again, or WhatsApp us on +61 499 005 000. |
| 404 | This reference is not in the ledger. Try the collection, or ask us to source it. |
| WhatsApp prefill | Hello, I am interested in {{house}} {{model}}, ref. {{reference}}, listed at {{price}}. |
| Email subject, enquiry | Enquiry · {{reference}} |
| Page title pattern | {{Model}}, {{attribute}} · {{House}} {{reference}} · Caseback |
| Meta description pattern | {{House}} {{model}} {{reference}}, {{year}}, {{papers}}. Inspected and sealed in Melbourne, delivered insured Australia-wide. A${{price}} incl. GST. |

Condition vocabulary (the only allowed values): Unworn, Excellent, Very good, Worn, Vintage. Papers vocabulary: Full set, Box only, Papers only, Watch only. Never "Mint", "New" for a pre-owned piece, "Like new", "Hot", "Special", or "Display item" (fold display items into Excellent with a note in the report).

## Prompt sequence for Claude Code

Run these in order, one per session or one per commit. Each prompt assumes `CLAUDE.md`, `tokens.css` and the three brand SVGs are already in the repo (prompt 0 does that). Paste each prompt exactly; the wording is deliberate. After each one, review in the browser against this document before moving on.

### Prompt 0: foundations

```
Read CLAUDE.md in full before doing anything. Then:

1. Tell me what framework, CSS approach and hosting this project uses (Next, Shopify Liquid, plain HTML, Tailwind, etc.) and where global styles live. Do not change anything yet.
2. Create public/brand/grip-mark.svg, public/brand/grip-mark-small.svg, public/brand/lockup.html-snippet (or a Lockup component in the framework's idiom) and public/brand/seal.svg using EXACTLY the SVG code in the section "Logo system" of the brand document I am about to paste. Do not redraw, simplify or "improve" the geometry.
3. Create the tokens file from the section "Design tokens" of the brand document, at the path you identified in step 1, and import it before every other stylesheet. If Tailwind, also map the tokens into theme.extend and disable rounded-* and shadow-* utilities via a lint rule or safelist.
4. Add the Google Fonts link from the "Typography" section to the document head, with preconnects, and remove every other font import (Montserrat, Poppins, the current serif, anything else).
5. Generate favicon.ico (peat on transparent), favicon.svg, apple-touch-icon.png (chalk grip mark on bottle, 14px radius on 180px) and a 400px social avatar PNG from grip-mark.svg.
6. Commit as "brand: Caseback foundations (tokens, fonts, marks)". List every file you created or changed.

I will now paste the Logo system, Design tokens and Typography sections.
```

Then paste those three sections from this document.

### Prompt 1: strip the old brand

```
Remove every trace of the Seven Dials brand and the old visual system. Specifically:
- Replace every instance of "Seven Dials", "SD", "sevendials" and "7mgmt" in UI text, titles, meta, alt text, email templates and config with "Caseback" / "caseback" (keep the domain config untouched until I say so).
- Delete the SD monogram asset and any gold/black logo variants.
- Remove the top marquee ticker component entirely.
- Remove the floating side buttons (SELL, CS, the circle button, back-to-top). Keep only one WhatsApp button, which prompt 2 will restyle.
- Remove the six-icon shortcut bar under the hero and the horizontal brand ticker.
- Remove all hard-coded colours from components: every hex, rgb() or named colour must become a var(--cb-*) token. Grep for "#" in CSS and in style attributes and show me the list before and after.
- Remove all border-radius above 3px and all box-shadow, text-shadow and gradient declarations.
- Remove any font-weight above 500 on Inter and any font-weight on Cormorant other than 300, 400, 500.
- Set the page background to var(--cb-bg) and body text to var(--cb-fg).
Do not redesign anything yet; this step is subtraction only. Commit as "brand: remove Seven Dials system". Show me the diff summary.
```

### Prompt 2: header, footer, buttons, WhatsApp

```
Build the global chrome from the "Layout and components" section I am pasting. In order:
1. Header: 92px desktop / 64px mobile, lockup component left at 40px (26px mobile, descriptor hidden), nav centre (Watches, Sell, Journal, Visit) in .cb-label style, phone in mono + "Enquire" accent button right (WhatsApp icon button only on mobile), 1px peat rule beneath, not sticky. Mobile menu = full-screen chalk sheet, Cormorant 44px links.
2. Buttons: implement primary, primary-on-green, secondary, tertiary and accent as a single Button component with a variant prop, exactly to the table in the pasted section. 44px min height on touch.
3. WhatsApp: one 56px bottle circle, chalk glyph, bottom right 24px, no shadow, appears after 300px scroll, deep-links to https://wa.me/61499005000.
4. Footer: three columns on a peat rule as specified, with lockup at 26px, address and licence in mono 11px, tagline in Cormorant 20px italic bottle, legal line and currency selector in 11px mist at the bottom.
5. Apply the base element styles from tokens.css (h1 to h4, a, selection).
Commit as "brand: global chrome". Then open the homepage and screenshot header and footer at 1440 and 390 wide for me.
```

Paste the Layout and components section.

### Prompt 3: product tile and grid

```
Rebuild the product tile and the collection grid from the "Product tile", "Badges" and "Filters" specs I am pasting, plus the "Search and collection pages" spec.
- Tile: 1px peat top rule, no border, no background, 4:5 image on chalk, reduced seal stamp 34px top right in bottle, name in Cormorant 24px left with price in mono 13px right on one baseline, then HOUSE · REFERENCE left and condition/year right in mono 11px. Hover lifts the image 4px over 320ms. Loading state is the grip mark at 48px, mist, 40% opacity.
- Product titles: write a helper that builds "Collection, Attribute" from the data (dial colour, else size, else material), so no two adjacent tiles show identical titles. Show me ten examples from real data before applying.
- Grid: 3 columns at desktop, 2 tablet, 1 mobile (mobile tile variant: image left 40%, text right).
- Title row: "All watches" when there is no query, "Results for \"query\"" with the query italic when there is. Never render empty quotes. Count in mono beside it.
- Filters: collapse each group to 6 with "+ N more", brand search box, mono counts, selected filters as removable badges above the grid, full-screen sheet on mobile. Rename condition "Enquire" to the correct value or remove it.
- Pagination in mono, or a Load more secondary button, with "1 to 48 of 5 667".
- Empty state copy from the "Copy and microcopy" table.
Commit as "brand: tiles, grid, filters". Screenshot /search and one house collection at 1440 and 390.
```

Paste Product tile, Badges, Filters, the Search and collection page spec, and the Copy table.

### Prompt 4: homepage

```
Rebuild the homepage to the "Homepage" spec I am pasting, section by section, in this order: hero, ledger strip, Sealed this week, The promise, By house, Visit, Journal (skip if no posts), footer. Use the exact copy from the "Copy and microcopy" table. Pull live counts for pieces, houses and items added in the last 7 days. For the hero right panel, place seal.svg at 760px so its right third is cropped by the panel, at 50% opacity, with a 300x380 chalk tile holding the featured product photo over it and a mono caption. Render the "Sealed" date in the seal format (DD · ROMAN-MONTH · YYYY). Hero headline is Cormorant 300 at var(--cb-text-hero) with "it is worn." in italic. Do not add any section that is not in the spec. Commit as "brand: homepage". Screenshot at 1440 and 390 and show me.
```

Paste the Homepage spec and the Copy table.

### Prompt 5: product page

```
Rebuild the product page to the "Product page" spec I am pasting. Gallery left (4:5 main image in a 1px peat frame, mono caption, six labelled thumbnails DIAL/CASEBACK/CLASP/SERIAL/PAPERS/ON WRIST), buy panel right (eyebrow, h1 with italic attribute line, mono metadata, rule, mono 34px price, badges, full-width Enquire on WhatsApp with the reference prefilled using the WhatsApp prefill string from the copy table, full-width Reserve for 48 hours opening a form with name/phone/email, note line). Then The caseback report: paper panel, 1px peat border, title + seal.svg at 120px recoloured bottle, key/value grid for Movement, Serial (masked), Case, Bracelet, Timing, Papers, hide rows with no data, footer line with staff name and the authenticate link. Then the four-column specs strip, then Similar pieces (three tiles). Add Product JSON-LD with sku=reference and an additionalProperty for inspectionDate. Mobile: fixed bottom bar with the two buttons. Commit as "brand: product page". Screenshot at 1440 and 390.
```

Paste the Product page spec, the Copy table and the seal SVG.

### Prompt 6: sell page

```
Build /sell to the "Sell your watch" spec: bottle hero (the only green hero on the site) with display headline "Sell or trade. Same-day offer." and paragraph from the copy table; three Roman-numeral steps; the form with the exact fields and options listed, two required photo uploads labelled Dial and Caseback, mono inputs for reference and asking price, primary button "Send for an offer", reassurance line; the buy-price guide table (create a data file with 20 rows I will fill, mono reference column, right-aligned price, date chip for "updated"); trust block. Wire the form to the existing form handler or to a mailto fallback and tell me which. Commit as "brand: sell page".
```

### Prompt 7: image normalisation

```
Write a script (Node with sharp, or Python with Pillow) that processes every product image: detect the watch bounding box, crop to 4:5, scale so the case height is 60% of the frame, replace near-cream background (#EDE9E0 to #F3F0E9 range) with #F1EFE8 or pure white (ask me which, then use one), export WebP 1600 and 800 at quality 82 with the descriptive filename pattern house-model-reference-view.webp, and write alt text into the data. Produce a CSV of images it could not confidently normalise so they can be reshot. Run it on 20 images first and show me a before/after contact sheet before running on all.
```

### Prompt 8: authentication card and seal generation

```
Build a server-side or build-time function that generates a per-watch seal SVG from the seal template (NO. {{number}} and {{date}} replaced), where number is the inspection number from the data and date is DD · ROMAN-MONTH · YYYY. Then build a printable A6 (105x148mm) authentication card PDF per product matching the card on the identity board: lockup top, product name in Cormorant with italic attribute, mono metadata block, key/value inspection grid, inspector name, seal bottom right at 28mm in bottle. Add a "Download card" link in the admin or order flow only, not on the public page. Commit as "brand: seal and card generation".
```

### Prompt 9: QA pass

```
Audit the whole site against CLAUDE.md and report, do not fix yet:
- Any hex colour, font-family or px font-size not coming from a token.
- Any border-radius above 3px, any shadow, any gradient.
- Any uppercase heading, any Inter above weight 500, any Cormorant weight not in 300/400/500.
- Any product title repeated on adjacent tiles.
- Any instance of the banned words list.
- Any em dash.
- Any image without alt text or with a camera filename.
- Contrast failures below 4.5:1 for text under 24px.
- Touch targets under 44px on mobile.
- Lighthouse scores on home, a collection and a product page.
Give me the list grouped by file. Then fix everything in the list and commit as "brand: QA pass".
```

### Fix prompts (use when a step comes back wrong)

- Colour drift: `You introduced a colour not in tokens.css. Replace it with the nearest token and explain which token you chose and why.`
- Type drift: `This heading is bold or uppercase. Caseback headlines are Cormorant 300, sentence case, italic for emphasis. Fix every instance on this page.`
- Box creep: `These cards have borders, backgrounds or radius. The system is hairlines and type. Remove the box, keep the 1px top rule.`
- Hype creep: `This copy uses urgency or banned words. Rewrite in the Caseback voice: short, specific, calm. Use the Copy table where a string exists.`
- Logo tampering: `The mark geometry has changed. Restore the exact SVG from the brand document; do not redraw it.`

### What to tell Claude Code at the start of every later session

```
This is the Caseback site. Read CLAUDE.md first. Brand rules there override your defaults. Before adding any new component, check the "Layout and components" spec in the brand document and reuse the Button, Tile, Badge and Input components rather than creating new ones.
```

## Before launch

### Decisions still open (owner: the business, not Claude Code)

| Decision | Options | Recommendation |
| --- | --- | --- |
| Legal entity and trading name | Register "Caseback" as a business name under the existing Pty Ltd, or new entity | Business name under existing entity; update the licence record with Consumer Affairs Victoria |
| Domain | caseback.com.au, caseback.au, both | Both; .com.au primary, .au redirects. Keep 7mgmt.com redirecting for 12 months |
| Photo background | Pure white or chalk | Chalk if reshooting; white if keeping most existing photos (less work to normalise) |
| Inspection number format | 04117 (base-year scheme) or 26117 (year-prefixed) | 26117, self-explanatory |
| Condition for "Display items" | Keep as a category or fold into Excellent | Fold in, note "ex-display" in the report |
| Reserve for 48 hours | Free hold or small deposit | Free hold for v1, deposit later if abuse appears |
| Journal at launch | Ship with 3 posts or hide | Hide until 3 posts exist |

### Trade mark and name checks

- [ ] IP Australia search, classes 14 (watches) and 35 (retail services), for CASEBACK and close variants
- [ ] ASIC business name register search
- [ ] Domains: caseback.com.au, caseback.au, caseback.com (check who holds it and whether it matters)
- [ ] Instagram, TikTok, Facebook handle availability (@caseback, @caseback.melbourne, @casebackwatches)
- [ ] Google Business Profile renamed, with the new logo, once the site is live
- [ ] Consumer Affairs Victoria second-hand dealer licence updated with the trading name

### Technical launch checklist

- [ ] CLAUDE.md, tokens.css and brand SVGs committed
- [ ] All nine prompts run and reviewed
- [ ] QA pass (prompt 9) clean
- [ ] 301 redirects from every old URL, including the #search hash routes, to the new structure
- [ ] Title and meta description patterns applied to every product
- [ ] Product JSON-LD validates in Google's Rich Results test
- [ ] Open Graph and Twitter card images use the DIAL shot on chalk with no overlay
- [ ] Favicon, touch icon and social avatar in place
- [ ] WhatsApp deep links tested on iOS and Android
- [ ] Forms (enquire, reserve, sell) deliver to sales@ and produce the success copy from the table
- [ ] Lighthouse 90+ on performance and accessibility for home, collection, product
- [ ] Contrast checked with the mist colour at its smallest use
- [ ] Email signature and invoice template updated to the lockup
- [ ] Authentication card PDF printed and checked at A6 on paper stock
- [ ] Old gold/black assets deleted from the CDN so they cannot be cached back

### Handing the canvas over

The design canvas (homepage, identity board, logo exploration, product page, variations) is private until shared from its Share menu. Share it with your friend as view-only; the decisions it shows are recorded here, so he does not need to edit it. If anything in the canvas conflicts with this document, this document is the one to follow.

### Sources

Current site reviewed on 9 November 2026: [7mgmt.com](https://7mgmt.com/). Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).
