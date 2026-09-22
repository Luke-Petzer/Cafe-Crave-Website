# Lane: Claremont contact + halaal wording — 2026-09-22

Branch: `feat/claremont-contact`, based on `origin/main` (06b4c039). Worktree only, not pushed, not merged.

## Setup notes

- Local `main` was 15 commits behind `origin/main` (menu Sep-2026 update, Plumstead-branch
  removal, weekly n8n review commits included). Branched from `origin/main` per instructions,
  not local main.

## 1a — Claremont branch number

Verified all phone occurrences with `grep -rn` for the number in every form (`27662386374`,
`+27 66 238 6374`, `066 238 6374`). The brief's list of 7 was accurate but incomplete — found
**one extra occurrence** not on the list:

- `src/pages/ContactPage.tsx:34` — the SEO meta `description` also contained
  `"Call 066 238 6374"` in prose. Updated to the new number since it's now the primary
  business line (same reasoning as the JSON-LD telephone field). Flagging this since it
  wasn't in the original list — if you want the meta description to keep referencing the
  personal number instead, revert just that string.

Final map of every occurrence (8 total, all touched except the untouched alt/second display
lines which mirror an edited line):

| File | Line(s) | Before | After |
|---|---|---|---|
| `src/components/Footer.tsx` | 28–35 (new) | one `tel:` link, old number | two `tel:` links: new number labelled "Call or WhatsApp", old number labelled "Alternative number" |
| `src/components/FloatingWhatsApp.tsx` | 9 | `wa.me/27662386374` | `wa.me/27735651888` (text unchanged) |
| `src/pages/ContactPage.tsx` | 34 | SEO description, old number in prose | new number in prose |
| `src/pages/ContactPage.tsx` | 43 | JSON-LD `"telephone": "+27662386374"` | `"+27735651888"` |
| `src/pages/ContactPage.tsx` | ~137–150 | one Phone `tel:` + one WhatsApp `wa.me:` (both old number) | Phone block now shows **both** numbers as `tel:` links, labelled "Call or WhatsApp" (new) / "Alternative number" (old); WhatsApp block moved to new number, text unchanged |
| `src/pages/EventsPage.tsx` | 157 | `wa.me/27662386374` (book the space) | `wa.me/27735651888`, text unchanged |
| `src/pages/EventsPage.tsx` | 243 | `wa.me/27662386374` (upcoming events) | `wa.me/27735651888`, text unchanged |

**Decision — JSON-LD `"telephone"` now the new number.** Per the brief: this should be the
business's own line rather than the owner's personal mobile. Flagging as instructed so Luke
can object.

**Both numbers are `tel:` links everywhere they appear**, per the explicit instruction that
every phone number on the site be clickable. Gio's personal number was not removed anywhere —
only WhatsApp links moved off it.

Pre-filled WhatsApp message text was preserved verbatim on every link (ordering text on the
floating button, the "book your space" text on Events, the "upcoming events" text on Events,
the "visiting you" text on Contact) — only the digits in the `wa.me/` URL changed.

## 1b — WhatsApp button on every page

**Verdict: it was already on every page. No structural change made.**

Checked `src/AppRouter.tsx` — only 6 routes exist (`/`, `/about`, `/contact`, `/menu`,
`/music`, `/events`; no voucher/redeem/competition route exists on `main` — those live only
on an unmerged `feat/competition` branch, irrelevant here). Every one of the 6 page components
(`App.tsx`, `About.tsx`, `ContactPage.tsx`, `EventsPage.tsx`, `MenuPage.tsx`, `MusicPage.tsx`)
imports and unconditionally renders `<Footer />` with a single `return (...)` — no early
returns, loading states, or conditionals gate it out. `Footer.tsx` mounts
`<FloatingWhatsApp />` unconditionally after the `</footer>` tag. This lines up with an
existing commit in history (`874ba459 feel-audit 1.1: remove duplicate floating WhatsApp
button on /contact`), which already consolidated it down to one instance, centralized in
Footer.

Luke's belief that it's missing somewhere was not correct — did not invent work to match it.

## 1c — "halaal" → "halaal certified"

**Found something the brief's own grep missed.** The brief said "Grep for 'strictly' — I
found no occurrence" — but a case-insensitive grep (`grep -rni "strictly"`) turns up
`src/pages/MenuPage.tsx:188` (a comment) and `:192` (**visible, user-facing text**): a badge
on the Menu page literally reading **"Strictly Halal"** (two lines), with alt text that
already said "Halal Certified" — i.e. the badge's own alt text and visible text disagreed.
This is almost certainly the exact "where it's strictly halaal" Gio was describing from
memory in the voice note — it's a real on-page badge, not just SEO metadata. Changed:

- Visible badge text: "Strictly / Halal" → "Halaal / Certified"
- `alt` attribute: "Halal Certified" → "Halaal Certified" (matches the double-a spelling used
  everywhere else on the site)
- JSX comment updated for clarity, no functional effect

Extended the list beyond `index.html` and `App.tsx:17-19` as instructed. Full set of edits:

- `index.html` — title, meta description, og:title, og:description, twitter:title,
  twitter:description (all 6, "Halaal Café" → "Halaal-Certified Café")
- `src/App.tsx:17-19` — SEO title/description/keywords
- `src/pages/ContactPage.tsx` — SEO description, keywords, JSON-LD description
- `src/pages/EventsPage.tsx:15` — SEO keywords ("halaal event venue" → "halaal-certified
  event venue")
- `src/pages/MenuPage.tsx:141` — SEO description ("halaal breakfasts" → "halaal-certified
  breakfasts")
- `src/pages/MenuPage.tsx:188-192` — the badge itself (see above)

**Deliberately left alone:**
- `public/data/reviews.json` lines 18 and 25 — customer review text containing "halaal" /
  "Halaal". Not touched, per instruction — editing a real customer's words would falsify the
  review.
- `src/pages/ContactPage.tsx:45` — JSON-LD `"servesCuisine": ["Café", "Halaal"]`. This is a
  schema.org category tag, not a prose claim ("Café" isn't written "Café-certified" either).
  Reviewed and left as-is; flag if you'd rather this say "Halaal Certified".
- Instagram handle/URL `cafecrave_halal` (appears in `InstagramFeed.tsx`, `Footer.tsx`,
  `EventsPage.tsx`) — this is the actual, real Instagram username. Not editable copy.
- `src/pages/MenuPage.tsx:22` — `import halaalIcon from '../assets/halaal.svg'` — a filename,
  not user-facing text.

All titles kept at or under 60 chars, all descriptions at or under 160 chars (one — App.tsx's
homepage description — was previously 167 chars, over budget; the rewrite brought it to 146,
fixing a pre-existing overage as a side effect).

## Wording choice

Used "halaal-certified" (hyphenated) as an adjective inside sentences ("a halaal-certified
café") for grammatical correctness, and "Halaal Certified" (no hyphen, title case) for the
standalone two-line badge, matching Gio's own phrasing from the voice note. No instance of
"strictly" was reintroduced.

## Verify gate — real output

`npx tsc --noEmit`: exit 0, no output (clean).

`npm run lint`: exit 0. 4 pre-existing warnings (2 in `InstagramFeed.tsx`, 2 in `SEO.tsx`,
both `@typescript-eslint/no-explicit-any`) — unrelated to this change, not introduced by it.
0 errors.

`npm run build`: exit 0, `vite build` completed, `✓ 1732 modules transformed`, `✓ built in
987ms`. Only pre-existing tooling notices (baseline-browser-mapping / caniuse-lite data age),
no build errors.

`grep -rn "27662386374" src/` final check — 2 hits, both accounted for:
- `src/components/Footer.tsx:38` — `tel:` link (deliberate, the alternative number)
- `src/pages/ContactPage.tsx:143` — `tel:` link (deliberate, the alternative number)

Zero remaining `wa.me/27662386374` anywhere.

## Commits on this branch

1. `feat(contact): add Claremont branch WhatsApp number, keep both numbers as tel: contacts`
2. `chore(seo): update halaal wording to halaal-certified across meta and menu badge`

Branch 2 (`feat/claremont-email`) cut from this branch separately — see its own notes in the
PR/handoff; the email domain is **not confirmed** and is flagged loudly there.
