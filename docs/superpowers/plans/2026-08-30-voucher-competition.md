# Voucher Competition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sell R100 Café Crave vouchers online with automatic QR voucher delivery, single-use PIN-gated redemption, and a one-query prize draw.

**Architecture:** Static SPA talks only to four n8n webhook endpoints; n8n holds all secrets and drives Yoco Checkout, Supabase (free tier, client's org), and Zoho SMTP. Redemption is one atomic UPDATE. See the spec for full flows.

**Tech Stack:** Vite + React 18 + TypeScript + Tailwind (existing), `react-qr-code` (new runtime dep), `vitest` (new dev dep), n8n (built by Luke in GUI from the guide), Supabase Postgres, Yoco Checkout API (Paystack documented as fallback).

**Spec:** `docs/superpowers/specs/2026-08-30-voucher-competition-design.md`

## Global Constraints

- Brand string is exactly `Café Crave` everywhere user-visible.
- Branch: `feat/competition` cut from `fix/site-tuneup` (or `main` once that branch has merged). Never push/merge to `main` — Luke does that.
- Commits authored: `git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit ...`
- Only new runtime dependency allowed: `react-qr-code`. Only new dev dependency: `vitest`.
- No secrets in the repo. The SPA reads exactly one env var: `VITE_COMPETITION_API_BASE`.
- All campaign-variable copy lives in `src/data/competition.ts` — pages must not hardcode prize/price/dates.
- Every task ends with `npx tsc --noEmit` clean and `npm run build` succeeding (run from the repo root `Clients/Cafe-Crave/Codebase/Cafe-Crave-Website`).
- Follow existing page conventions: pages compose `<SEO/>`, `<ScrollAnimationObserver/>`, `<Header/>`, `<main id="main-content" className="pt-16 md:pt-20">`, `<Footer/>`; sections use `section-light` / `section-red` / `section-dark` + `container mx-auto px-6 md:px-10 lg:px-16`.

## Prerequisites (do not start Tasks 8–10 handover steps without them)

Gio's go-ahead; his Yoco (or Paystack) keys; a Supabase free project in HIS org; WhatsApp Channel invite link; a staff PIN. Tasks 1–8 are buildable before these arrive (`competition.active` stays `false`).

---

### Task 1: Branch + vitest tooling

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (add `test` script + vitest devDependency)
- Test: `src/lib/format.test.ts` (placeholder smoke test, replaced in Task 2)

**Interfaces:**
- Produces: `npm test` runs vitest (`vitest run`).

- [ ] **Step 1: Create the branch**

```bash
git fetch origin && git checkout fix/site-tuneup && git checkout -b feat/competition
```

- [ ] **Step 2: Install vitest**

```bash
npm install -D vitest
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Add the script** — in `package.json` `"scripts"`, add `"test": "vitest run"`.

- [ ] **Step 5: Write a smoke test** at `src/lib/format.test.ts`

```ts
import { describe, it, expect } from 'vitest';

describe('vitest wiring', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run it** — `npm test` — Expected: 1 passed.

- [ ] **Step 7: Verify build unaffected** — `npx tsc --noEmit && npm run build` — Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "chore: add vitest test tooling"
```

---

### Task 2: Types, campaign config, format helpers (TDD)

**Files:**
- Create: `src/types/voucher.ts`, `src/data/competition.ts`, `src/lib/format.ts`
- Test: `src/lib/format.test.ts` (replace smoke test)

**Interfaces:**
- Produces: `VoucherStatus`, `CheckoutRequest`, `RedeemResult` types; `competition` config object; `formatZAR(cents: number): string`; `isValidVoucherCode(code: string): boolean`.

- [ ] **Step 1: Write failing tests** — replace `src/lib/format.test.ts` with:

```ts
import { describe, it, expect } from 'vitest';
import { formatZAR, isValidVoucherCode } from './format';

describe('formatZAR', () => {
  it('formats whole rand', () => expect(formatZAR(10000)).toBe('R100.00'));
  it('formats cents', () => expect(formatZAR(9950)).toBe('R99.50'));
});

describe('isValidVoucherCode', () => {
  it('accepts a valid code', () => expect(isValidVoucherCode('CRAVE-ABCD-2345')).toBe(true));
  it('is case/space tolerant', () => expect(isValidVoucherCode('  crave-abcd-2345 ')).toBe(true));
  it('rejects ambiguous chars', () => expect(isValidVoucherCode('CRAVE-AB0D-2345')).toBe(false));
  it('rejects wrong shape', () => expect(isValidVoucherCode('CRAVE-ABCD')).toBe(false));
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` — Expected: FAIL (module `./format` not found).

- [ ] **Step 3: Create `src/lib/format.ts`**

```ts
export const formatZAR = (cents: number): string => `R${(cents / 100).toFixed(2)}`;

// CRAVE- + 2×4 chars, alphabet excludes 0/O/1/I
export const VOUCHER_CODE_RE = /^CRAVE-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;

export const isValidVoucherCode = (code: string): boolean =>
  VOUCHER_CODE_RE.test(code.trim().toUpperCase());
```

- [ ] **Step 4: Run tests** — `npm test` — Expected: all pass.

- [ ] **Step 5: Create `src/types/voucher.ts`**

```ts
export interface VoucherStatus {
  code: string;
  buyerName: string;
  amountCents: number;
  campaign: string;
  paid: boolean;
  redeemedAt: string | null;
}

export interface CheckoutRequest {
  name: string;
  email: string;
  phone: string;
}

export type RedeemResult =
  | { ok: true; buyerName: string; redeemedAt: string }
  | {
      ok: false;
      reason: 'invalid_pin' | 'not_found' | 'not_paid' | 'already_redeemed';
      redeemedAt?: string;
    };
```

- [ ] **Step 6: Create `src/data/competition.ts`** (real defaults; `active: false` gates everything; Luke edits per campaign per the runbook)

```ts
export const competition = {
  active: false, // flip true only when prize/dates/channelUrl are confirmed with Gio
  campaign: 'launch-2026',
  priceCents: 10000,
  prize: 'a R1,000 Café Crave voucher',
  drawDate: '2026-10-31',
  channelUrl: '', // WhatsApp Channel invite link; CTAs render only when non-empty
  rules: [
    'Buy a R100 Café Crave voucher online — every voucher purchased is one entry into the draw.',
    'The voucher is redeemable once, in store, at either branch, and stays valid for 3 years from purchase (Consumer Protection Act s63).',
    'The draw closes on the draw date shown above. The winner is selected at random from all paid vouchers in this campaign.',
    'The winner is announced on the Café Crave WhatsApp Channel and contacted by email.',
    'Entrants must be 18 or older. Café Crave staff and their immediate families may not enter.',
    'The prize is not transferable for cash.',
  ],
};
```

- [ ] **Step 7: Verify** — `npm test && npx tsc --noEmit && npm run build` — Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "feat: competition types, campaign config, format helpers"
```

---

### Task 3: API client (TDD)

**Files:**
- Create: `src/lib/competitionApi.ts`
- Test: `src/lib/competitionApi.test.ts`

**Interfaces:**
- Consumes: types from `src/types/voucher.ts`.
- Produces: `createCheckout(req: CheckoutRequest): Promise<string>` (returns redirect URL), `getVoucher(code: string): Promise<VoucherStatus | null>`, `redeemVoucher(code: string, pin: string): Promise<RedeemResult>`. Base URL from `import.meta.env.VITE_COMPETITION_API_BASE`.

- [ ] **Step 1: Write failing tests** at `src/lib/competitionApi.test.ts`

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCheckout, getVoucher, redeemVoucher } from './competitionApi';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);
vi.stubEnv('VITE_COMPETITION_API_BASE', 'https://n8n.example/webhook');

const jsonRes = (status: number, body: unknown) =>
  ({ ok: status < 400, status, json: async () => body }) as Response;

beforeEach(() => mockFetch.mockReset());

describe('createCheckout', () => {
  it('POSTs the buyer and returns redirectUrl', async () => {
    mockFetch.mockResolvedValue(jsonRes(200, { redirectUrl: 'https://pay.yoco/x' }));
    const url = await createCheckout({ name: 'A', email: 'a@b.c', phone: '0821112222' });
    expect(url).toBe('https://pay.yoco/x');
    const [target, init] = mockFetch.mock.calls[0];
    expect(target).toBe('https://n8n.example/webhook/cc-checkout');
    expect(JSON.parse((init as RequestInit).body as string).email).toBe('a@b.c');
  });
  it('throws on error response', async () => {
    mockFetch.mockResolvedValue(jsonRes(400, { error: 'bad' }));
    await expect(createCheckout({ name: '', email: '', phone: '' })).rejects.toThrow();
  });
});

describe('getVoucher', () => {
  it('returns null on 404', async () => {
    mockFetch.mockResolvedValue(jsonRes(404, { error: 'nf' }));
    expect(await getVoucher('CRAVE-ABCD-2345')).toBeNull();
  });
  it('returns the voucher and URL-encodes the code', async () => {
    mockFetch.mockResolvedValue(
      jsonRes(200, { code: 'CRAVE-ABCD-2345', buyerName: 'A', amountCents: 10000, campaign: 'c', paid: true, redeemedAt: null }),
    );
    const v = await getVoucher('CRAVE-ABCD-2345');
    expect(v?.paid).toBe(true);
    expect(mockFetch.mock.calls[0][0]).toBe('https://n8n.example/webhook/cc-voucher?code=CRAVE-ABCD-2345');
  });
});

describe('redeemVoucher', () => {
  it('returns the result body', async () => {
    mockFetch.mockResolvedValue(jsonRes(200, { ok: false, reason: 'invalid_pin' }));
    const r = await redeemVoucher('CRAVE-ABCD-2345', '0000');
    expect(r.ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` — Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/lib/competitionApi.ts`**

```ts
import { CheckoutRequest, RedeemResult, VoucherStatus } from '../types/voucher';

const base = (): string => import.meta.env.VITE_COMPETITION_API_BASE as string;

export async function createCheckout(req: CheckoutRequest): Promise<string> {
  const res = await fetch(`${base()}/cc-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('checkout_failed');
  const data = (await res.json()) as { redirectUrl?: string };
  if (!data.redirectUrl) throw new Error('checkout_failed');
  return data.redirectUrl;
}

export async function getVoucher(code: string): Promise<VoucherStatus | null> {
  const res = await fetch(`${base()}/cc-voucher?code=${encodeURIComponent(code)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('lookup_failed');
  return (await res.json()) as VoucherStatus;
}

export async function redeemVoucher(code: string, pin: string): Promise<RedeemResult> {
  const res = await fetch(`${base()}/cc-redeem`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, pin }),
  });
  if (!res.ok) throw new Error('redeem_failed');
  return (await res.json()) as RedeemResult;
}
```

- [ ] **Step 4: Run tests** — `npm test` — Expected: all pass.

- [ ] **Step 5: Verify** — `npx tsc --noEmit && npm run build` — clean.

- [ ] **Step 6: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "feat: competition API client for n8n endpoints"
```

---

### Task 4: Competition page + route

**Files:**
- Create: `src/pages/CompetitionPage.tsx`
- Modify: `src/AppRouter.tsx` (add route)

**Interfaces:**
- Consumes: `competition` config, `formatZAR`, `createCheckout`.
- Produces: route `/competition`.

- [ ] **Step 1: Create `src/pages/CompetitionPage.tsx`**

```tsx
import { useState, FormEvent } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';
import { competition } from '../data/competition';
import { formatZAR } from '../lib/format';
import { createCheckout } from '../lib/competitionApi';

export const CompetitionPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !/.+@.+\..+/.test(email)) {
      setError('Please fill in your name and a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const url = await createCheckout({ name: name.trim(), email: email.trim(), phone: phone.trim() });
      window.location.href = url;
    } catch {
      setError('Something went wrong starting your payment. Please try again.');
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full p-3 rounded-md border border-lightText border-opacity-30 bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-accent';

  return (
    <div className="min-h-screen">
      <SEO
        title="Win with Café Crave | Voucher Competition"
        description={`Buy a ${formatZAR(competition.priceCents)} Café Crave voucher online and stand a chance to win ${competition.prize}.`}
      />
      <ScrollAnimationObserver />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="section-dark py-16 md:py-20 text-center">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Win {competition.prize}</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Buy a {formatZAR(competition.priceCents)} Café Crave voucher — spend it on anything in store,
              and every voucher is an entry into our draw on {competition.drawDate}.
            </p>
          </div>
        </section>

        {competition.active ? (
          <section className="section-light py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-xl">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">Get your voucher</h2>
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <input className={inputClass} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Full name" />
                <input className={inputClass} type="email" placeholder="Email (your voucher is sent here)" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email" />
                <input className={inputClass} type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
                {error && <p className="text-accent font-medium" role="alert">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md font-medium text-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Taking you to secure payment…' : `Pay ${formatZAR(competition.priceCents)} securely`}
                </button>
                <p className="text-sm opacity-70">
                  We use your details only to deliver your voucher and contact you if you win. Payment is
                  processed on our payment provider's secure page — your card details never touch our site.
                </p>
              </form>
            </div>
          </section>
        ) : (
          <section className="section-light py-16 md:py-20 text-center">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <p className="text-xl">The competition isn't open right now — follow us on social media to catch the next one.</p>
            </div>
          </section>
        )}

        <section className="section-red py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Competition rules</h2>
            <ol className="list-decimal list-inside space-y-3 opacity-90">
              {competition.rules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
```

- [ ] **Step 2: Add the route** — in `src/AppRouter.tsx`, import `CompetitionPage` and add inside `<Routes>`:

```tsx
<Route path="/competition" element={<CompetitionPage />} />
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run build`, then `npm run preview` and load `http://localhost:4173/competition` — Expected: closed-state page renders (active is false), rules listed, no console errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "feat: competition page with buy form and CPA rules"
```

---

### Task 5: Voucher page (printable, QR)

**Files:**
- Create: `src/pages/VoucherPage.tsx`
- Modify: `src/AppRouter.tsx` (route), `src/index.css` (print rules), `src/components/FloatingWhatsApp.tsx` (add `no-print` class), `package.json` (react-qr-code)

**Interfaces:**
- Consumes: `getVoucher`, `isValidVoucherCode`, `formatZAR`, `competition`.
- Produces: route `/voucher/:code`; QR encodes `https://cafecravecpt.co.za/redeem/{code}`.

- [ ] **Step 1: Install the QR dependency**

```bash
npm install react-qr-code
```

- [ ] **Step 2: Add print CSS** — append to `src/index.css`:

```css
/* Voucher printing: strip chrome, keep the voucher card */
@media print {
  header, footer, .no-print { display: none !important; }
  body { background: #fff !important; }
  main { padding-top: 0 !important; }
}
```

- [ ] **Step 3: Tag the WhatsApp button** — in `src/components/FloatingWhatsApp.tsx`, add `no-print` to the anchor's className list.

- [ ] **Step 4: Create `src/pages/VoucherPage.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { competition } from '../data/competition';
import { formatZAR } from '../lib/format';
import { isValidVoucherCode } from '../lib/format';
import { getVoucher } from '../lib/competitionApi';
import { VoucherStatus } from '../types/voucher';

const POLL_MS = 5000;
const MAX_POLLS = 24; // ~2 minutes of "payment processing"

export const VoucherPage = () => {
  const { code = '' } = useParams();
  const [voucher, setVoucher] = useState<VoucherStatus | null>(null);
  const [state, setState] = useState<'loading' | 'invalid' | 'pending' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!isValidVoucherCode(code)) {
      setState('invalid');
      return;
    }
    let polls = 0;
    let timer: number | undefined;
    const load = async () => {
      try {
        const v = await getVoucher(code.toUpperCase());
        if (!v) {
          setState('invalid');
          return;
        }
        setVoucher(v);
        if (v.paid) {
          setState('ready');
        } else if (polls < MAX_POLLS) {
          polls += 1;
          setState('pending');
          timer = window.setTimeout(load, POLL_MS);
        } else {
          setState('error');
        }
      } catch {
        setState('error');
      }
    };
    load();
    return () => window.clearTimeout(timer);
  }, [code]);

  return (
    <div className="min-h-screen">
      <SEO title="Your Café Crave Voucher" description="Your printable Café Crave voucher." />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="section-light py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-2xl text-center">
            {state === 'loading' && <p className="text-xl">Loading your voucher…</p>}
            {state === 'invalid' && <p className="text-xl">We couldn't find that voucher. Check the link in your email.</p>}
            {state === 'error' && <p className="text-xl">We couldn't confirm your payment yet. Refresh in a minute — if this keeps happening, WhatsApp us on 066 238 6374.</p>}
            {state === 'pending' && <p className="text-xl">Payment received — confirming with the bank. This page will update automatically.</p>}

            {state === 'ready' && voucher && (
              <>
                <div className="bg-white border-4 border-primary rounded-lg p-8 md:p-10 text-left shadow-xl">
                  <p className="font-serif text-3xl font-bold text-primary mb-1">Café Crave</p>
                  <p className="text-sm text-lightText opacity-70 mb-6">Claremont · Plumstead</p>
                  <p className="text-5xl font-serif font-bold text-accent mb-6">{formatZAR(voucher.amountCents)}</p>
                  <p className="text-lg mb-1"><span className="opacity-70">Holder:</span> {voucher.buyerName}</p>
                  <p className="text-lg mb-6"><span className="opacity-70">Code:</span> <span className="font-mono font-bold">{voucher.code}</span></p>
                  <div className="bg-white p-2 inline-block">
                    <QRCode value={`https://cafecravecpt.co.za/redeem/${voucher.code}`} size={140} />
                  </div>
                  <p className="text-sm opacity-70 mt-6">
                    Redeemable once, in store, at either branch. Valid for 3 years from purchase.
                    Every voucher is one entry in the draw on {competition.drawDate}.
                  </p>
                </div>

                <div className="mt-8 space-y-4 no-print">
                  <button
                    onClick={() => window.print()}
                    className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md font-medium transition-all duration-200"
                  >
                    Print your voucher
                  </button>
                  {competition.channelUrl && (
                    <p className="text-lg">
                      The winner is announced on our WhatsApp Channel —{' '}
                      <a href={competition.channelUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-accent">
                        join it here
                      </a>{' '}
                      so you don't miss the draw.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
```

- [ ] **Step 5: Add the route** — in `src/AppRouter.tsx`:

```tsx
<Route path="/voucher/:code" element={<VoucherPage />} />
```

- [ ] **Step 6: Verify** — `npm test && npx tsc --noEmit && npm run build`; `npm run preview`, load `/voucher/CRAVE-XXXX` (invalid shape) — Expected: "couldn't find that voucher" state, no crash.

- [ ] **Step 7: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "feat: printable voucher page with QR and channel CTA"
```

---

### Task 6: Redeem page (staff)

**Files:**
- Create: `src/pages/RedeemPage.tsx`
- Modify: `src/AppRouter.tsx` (route)

**Interfaces:**
- Consumes: `getVoucher`, `redeemVoucher`, `isValidVoucherCode`, `formatZAR`.
- Produces: route `/redeem/:code`.

- [ ] **Step 1: Create `src/pages/RedeemPage.tsx`**

```tsx
import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { formatZAR, isValidVoucherCode } from '../lib/format';
import { getVoucher, redeemVoucher } from '../lib/competitionApi';
import { VoucherStatus, RedeemResult } from '../types/voucher';

export const RedeemPage = () => {
  const { code = '' } = useParams();
  const [voucher, setVoucher] = useState<VoucherStatus | null>(null);
  const [state, setState] = useState<'loading' | 'invalid' | 'ready' | 'error'>('loading');
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RedeemResult | null>(null);

  useEffect(() => {
    if (!isValidVoucherCode(code)) {
      setState('invalid');
      return;
    }
    getVoucher(code.toUpperCase())
      .then((v) => {
        if (!v) setState('invalid');
        else {
          setVoucher(v);
          setState('ready');
        }
      })
      .catch(() => setState('error'));
  }, [code]);

  const onRedeem = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      setResult(await redeemVoucher(code.toUpperCase(), pin));
    } catch {
      setState('error');
    } finally {
      setBusy(false);
    }
  };

  const reasonText: Record<string, string> = {
    invalid_pin: 'Wrong staff PIN.',
    not_found: 'Voucher not found.',
    not_paid: 'This voucher was never paid for — do NOT accept it.',
    already_redeemed: 'Already redeemed — do NOT accept it again.',
  };

  return (
    <div className="min-h-screen">
      <SEO title="Redeem Voucher | Staff" description="Café Crave staff voucher redemption." />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="section-dark py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-md text-center">
            <h1 className="text-3xl font-serif font-bold mb-8">Voucher check</h1>

            {state === 'loading' && <p className="text-xl">Checking…</p>}
            {state === 'invalid' && <p className="text-xl">Not a valid voucher code.</p>}
            {state === 'error' && <p className="text-xl">Connection problem — try again.</p>}

            {state === 'ready' && voucher && !result && (
              <>
                <div className={`p-6 rounded-lg mb-8 ${voucher.paid && !voucher.redeemedAt ? 'bg-lightBg text-lightText' : 'bg-accent text-light'}`}>
                  <p className="font-mono font-bold text-xl mb-2">{voucher.code}</p>
                  <p className="text-lg mb-1">{voucher.buyerName} · {formatZAR(voucher.amountCents)}</p>
                  {!voucher.paid && <p className="text-xl font-bold mt-3">NOT PAID — do not accept</p>}
                  {voucher.redeemedAt && <p className="text-xl font-bold mt-3">ALREADY REDEEMED<br />{new Date(voucher.redeemedAt).toLocaleString()}</p>}
                  {voucher.paid && !voucher.redeemedAt && <p className="text-xl font-bold mt-3 text-accent">VALID ✓</p>}
                </div>

                {voucher.paid && !voucher.redeemedAt && (
                  <form onSubmit={onRedeem} className="space-y-4">
                    <input
                      className="w-full p-3 rounded-md text-primary text-center text-2xl tracking-widest"
                      type="password"
                      inputMode="numeric"
                      placeholder="Staff PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      aria-label="Staff PIN"
                    />
                    <button
                      type="submit"
                      disabled={busy || pin.length < 4}
                      className="w-full bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md font-medium text-lg transition-all duration-200 disabled:opacity-60"
                    >
                      {busy ? 'Redeeming…' : 'Mark redeemed'}
                    </button>
                  </form>
                )}
              </>
            )}

            {result && (
              <div className={`p-6 rounded-lg text-xl font-bold ${result.ok ? 'bg-lightBg text-lightText' : 'bg-accent text-light'}`}>
                {result.ok
                  ? <>Redeemed ✓<br /><span className="font-normal text-base">{result.buyerName} · {new Date(result.redeemedAt).toLocaleString()}</span></>
                  : reasonText[result.reason]}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
```

- [ ] **Step 2: Add the route** — in `src/AppRouter.tsx`:

```tsx
<Route path="/redeem/:code" element={<RedeemPage />} />
```

- [ ] **Step 3: Verify** — `npm test && npx tsc --noEmit && npm run build`; preview `/redeem/CRAVE-BAD` — Expected: "Not a valid voucher code."

- [ ] **Step 4: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "feat: staff redeem page with PIN gate"
```

---

### Task 7: Homepage banner

**Files:**
- Create: `src/components/CompetitionBanner.tsx`
- Modify: `src/App.tsx` (mount between `<GoogleReviews />` and `<InstagramFeed />`)

**Interfaces:**
- Consumes: `competition`, `formatZAR`.
- Produces: `<CompetitionBanner />` — renders `null` when `competition.active` is false.

- [ ] **Step 1: Create `src/components/CompetitionBanner.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { competition } from '../data/competition';
import { formatZAR } from '../lib/format';

export const CompetitionBanner = () => {
  if (!competition.active) return null;
  return (
    <section className="section-red py-12">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Win {competition.prize}</h2>
        <p className="text-lg mb-6 opacity-90">
          Buy a {formatZAR(competition.priceCents)} voucher online — every voucher is an entry into the draw.
        </p>
        <Link
          to="/competition"
          className="inline-flex items-center justify-center bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg"
        >
          Enter the Draw
        </Link>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Mount it** — in `src/App.tsx`, import and place `<CompetitionBanner />` between `<GoogleReviews />` and `<InstagramFeed />`.

- [ ] **Step 3: Verify both states** — `npx tsc --noEmit && npm run build`; preview `/` — Expected: NO banner (active=false). Temporarily flip `active: true` in `src/data/competition.ts`, `npm run build`, preview — banner shows. **Flip back to `false`** before committing; confirm with `git diff src/data/competition.ts` (must be empty).

- [ ] **Step 4: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "feat: homepage competition banner (gated on campaign active flag)"
```

---

### Task 8: Supabase schema file

**Files:**
- Create: `supabase/competition-schema.sql`

**Interfaces:**
- Produces: the `public.vouchers` table DDL applied (by Luke) to Gio's Supabase project; the atomic-redeem and draw statements used verbatim by the n8n guide (Task 9).

- [ ] **Step 1: Create `supabase/competition-schema.sql`** — exactly the DDL from the spec's Data model section (table + `enable row level security` + the two indexes), followed by the atomic-redeem UPDATE and draw SELECT as commented reference statements:

```sql
-- Café Crave voucher competition — apply once in the client's Supabase project (SQL editor).
create table public.vouchers (
  id                   uuid primary key default gen_random_uuid(),
  code                 text not null unique,
  buyer_name           text not null,
  buyer_email          text not null,
  buyer_phone          text,
  amount_cents         integer not null default 10000,
  campaign             text not null,
  provider             text not null default 'yoco',
  provider_checkout_id text unique,
  paid_at              timestamptz,
  redeemed_at          timestamptz,
  redeemed_note        text,
  created_at           timestamptz not null default now()
);
alter table public.vouchers enable row level security; -- no policies: service-role (n8n) only
create index vouchers_campaign_idx on public.vouchers (campaign);

-- Atomic redemption (used by the n8n redeem webhook; $1 = code, $2 = note):
-- update public.vouchers
-- set redeemed_at = now(), redeemed_note = $2
-- where code = $1 and paid_at is not null and redeemed_at is null
-- returning code, buyer_name, redeemed_at;

-- Draw (run manually; $1 = campaign):
-- select code, buyer_name, buyer_email from public.vouchers
-- where campaign = $1 and paid_at is not null
-- order by random() limit 1;
```

- [ ] **Step 2: Verify the SQL parses** — run it against any scratch Postgres if available (`psql -f`), else re-read against the spec for drift; the live apply happens in the runbook once Gio's project exists.

- [ ] **Step 3: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "feat: supabase schema for voucher competition"
```

---

### Task 9: n8n build guide + voucher email template

**Files:**
- Create: `automation/n8n-competition-workflow.md`, `automation/voucher-email.html`

**Interfaces:**
- Consumes: API contract (spec), schema (Task 8).
- Produces: the guide Luke follows in the n8n GUI; the email HTML he pastes into the SMTP node.

- [ ] **Step 1: Create `automation/voucher-email.html`** — branded, table-based (email-safe), palette `#322C2B`/`#F7F3EE`/`#803D3B`, using n8n expressions `{{ $json.code }}`, `{{ $json.buyer_name }}`, `{{ $json.voucher_url }}`, `{{ $json.channel_url }}`. Body: "Your Café Crave voucher", value R100, the code in large monospace, a button "View & print your voucher" → voucher_url, a line "Winner announced on our WhatsApp Channel — join here" → channel_url, and the 3-year-validity + draw-date footer.

- [ ] **Step 2: Create `automation/n8n-competition-workflow.md`** with these sections (each with exact node type, parameters, and code):
  1. **Credentials to create**: Supabase Postgres (connection string from Gio's project, service role), Yoco secret key (HTTP Header Auth `Authorization: Bearer sk_...`), Zoho SMTP (existing), env-style PIN stored in the workflow's Set node.
  2. **Workflow A — checkout** (`POST /cc-checkout`): Webhook node (respond via Respond-to-Webhook, CORS header `Access-Control-Allow-Origin: https://cafecravecpt.co.za`) → Code node generating the voucher code:
     ```js
     const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
     const g = (n) => Array.from({length: n}, () => A[Math.floor(Math.random() * A.length)]).join('');
     const code = `CRAVE-${g(4)}-${g(4)}`;
     const b = $json.body;
     if (!b.name || !/.+@.+\..+/.test(b.email || '')) throw new Error('bad_input');
     return { json: { code, name: b.name.slice(0,120), email: b.email.slice(0,200), phone: (b.phone||'').slice(0,30) } };
     ```
     → Postgres node INSERT (code, buyer fields, campaign, provider) → HTTP node `POST https://payments.yoco.com/api/checkouts` body `{"amount": 10000, "currency": "ZAR", "successUrl": "https://cafecravecpt.co.za/voucher/{{ $json.code }}", "cancelUrl": "https://cafecravecpt.co.za/competition", "metadata": {"voucherCode": "{{ $json.code }}"}}` → Postgres UPDATE `provider_checkout_id` → Respond `{"redirectUrl": "{{ $json.redirectUrl }}"}`.
  3. **Workflow B — payment webhook** (`POST /cc-yoco`): Webhook node (raw body ON) → Code node verifying the svix-style HMAC:
     ```js
     const crypto = require('crypto');
     const h = $json.headers;
     const secret = 'whsec_PASTE_FROM_YOCO_PORTAL';
     const signedContent = `${h['webhook-id']}.${h['webhook-timestamp']}.${$json.rawBody}`;
     const expected = crypto.createHmac('sha256', Buffer.from(secret.split('_')[1], 'base64'))
       .update(signedContent).digest('base64');
     const given = (h['webhook-signature'] || '').split(' ').map(s => s.split(',')[1]);
     if (!given.includes(expected)) throw new Error('bad_signature');
     return { json: JSON.parse($json.rawBody) };
     ```
     → IF node `type === 'payment.succeeded'` → Postgres UPDATE `paid_at = now() where provider_checkout_id = metadata... and paid_at is null` → SMTP node sending `voucher-email.html` → Respond 200.
  4. **Workflow C — voucher lookup** (`GET /cc-voucher`): Webhook → Postgres SELECT by code (columns: code, buyer_name, amount_cents, campaign, paid_at, redeemed_at) → Code node mapping to `{code, buyerName, amountCents, campaign, paid: !!paid_at, redeemedAt}` → Respond (404 branch when no rows). CORS header as in A.
  5. **Workflow D — redeem** (`POST /cc-redeem`): Webhook → IF `body.pin === PIN` (else respond `{ok:false, reason:'invalid_pin'}`) → Postgres running the atomic UPDATE from the schema file → Code node: 1 row → `{ok:true,...}`; 0 rows → SELECT to distinguish `not_found` / `not_paid` / `already_redeemed` → Respond. CORS header as in A.
  6. **Yoco setup**: register the webhook URL in the Yoco portal, copy the `whsec_` secret into Workflow B; test-mode keys for the dry run.
  7. **Paystack fallback**: swap Workflow A's HTTP node for `POST https://api.paystack.co/transaction/initialize` (`amount` in kobo-style cents, `callback_url` = voucher URL) and Workflow B's verify for Paystack's `x-paystack-signature` HMAC-SHA512 of the raw body; everything else unchanged.
  8. **curl smoke tests** for each endpoint with expected JSON.

- [ ] **Step 3: Self-check the guide** — every node's SQL matches `supabase/competition-schema.sql`; every endpoint name and response shape matches `src/lib/competitionApi.ts`. Fix drift now.

- [ ] **Step 4: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "docs: n8n workflow build guide and voucher email template"
```

---

### Task 10: Runbook + end-to-end checklist

**Files:**
- Create: `docs/competition-runbook.md`

**Interfaces:**
- Consumes: everything above.
- Produces: the operational doc Luke follows to launch, run, draw, and close a campaign.

- [ ] **Step 1: Create `docs/competition-runbook.md`** with these sections, each a concrete checklist:
  - **Go-live prerequisites**: Gio's campaign details; Yoco keys + webhook secret; Supabase project (Gio's org) with schema applied; Channel invite link; staff PIN set in n8n; `VITE_COMPETITION_API_BASE` set in Vercel env.
  - **Launch**: edit `src/data/competition.ts` (campaign id, prize, drawDate, channelUrl, `active: true`) → PR → Luke merges → verify live.
  - **End-to-end dry run (Yoco TEST mode, before real launch)**: buy with test card → email arrives → voucher page shows paid → scan QR → wrong PIN rejected → right PIN redeems → second redeem attempt shows already_redeemed → row correct in Supabase.
  - **During campaign**: weekly glance at the vouchers table; unpaid rows older than 24h are abandoned checkouts (ignore or delete).
  - **The draw**: run the draw SELECT (from the schema file) filtered to the campaign; email the winner; Gio posts the announcement on the WhatsApp Channel.
  - **Close**: set `active: false` (page shows closed state; vouchers stay redeemable — CPA s63).
  - **Refunds**: refund in the Yoco portal, then manually set `redeemed_at = now(), redeemed_note = 'refunded'` on the row.

- [ ] **Step 2: Final full verification** — `npm test && npx tsc --noEmit && npm run build` — all clean; `git log --oneline` shows one commit per task.

- [ ] **Step 3: Commit**

```bash
git add -A && git -c user.name="Luke Petzer" -c user.email="luke.petzer@icloud.com" commit -m "docs: competition launch and operations runbook"
```

---

## Self-review notes

- Spec coverage: pages (Tasks 4–7), data model (8), API + automation (9), payments + fallback (9 §2/§7), legal copy (Task 2 rules + Task 4 rules section + voucher 3-year line, Task 5), channel funnel (Tasks 5, 9 email), draw + ops (10). Prereqs gate go-live, not the build.
- Type consistency: `VoucherStatus`/`RedeemResult` defined in Task 2, consumed unchanged in Tasks 3, 5, 6; endpoint names `cc-checkout`/`cc-voucher`/`cc-redeem`/`cc-yoco` identical in spec, Task 3, and Task 9.
- No placeholders: config uses real defaults gated by `active:false`; the only secrets ("whsec_PASTE_FROM_YOCO_PORTAL") are values that cannot exist until Gio's accounts do, and the runbook lists them as go-live prerequisites.
