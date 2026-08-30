# Café Crave Voucher Competition — Design Spec

Date: 2026-08-30 · Author: Luke Petzer (with Claude) · Status: awaiting client go-ahead

## Purpose

Let Café Crave sell R100 vouchers online. Each purchase doubles as one entry into a
prize draw. Each voucher carries a unique code + QR so staff can verify and redeem it
exactly once at the till. The flow funnels every buyer into the Café Crave WhatsApp
Channel, which is where the winner is announced.

## Goals

- Customer pays online (card, hosted payment page — no card data ever touches our code).
- Voucher delivered automatically by email: printable, branded, unique code, QR.
- Staff can verify + redeem a voucher in under 10 seconds with any phone camera.
- A voucher can be redeemed exactly once, even if two staff scan it simultaneously.
- Drawing a winner is one SQL query.
- Every buyer is prompted (email + voucher page) to join the WhatsApp Channel.
- Running cost to the client: R0/month + payment-provider transaction fees only.

## Non-goals (YAGNI)

- No customer accounts, logins, or order history.
- No admin dashboard — the Supabase table view and one draw query are the admin UI.
- No WhatsApp bot / Business API. The Channel is manual (Gio posts from his phone).
- No refund flow in v1 — refunds happen in the Yoco portal; mark the row manually.
- No multi-prize / multi-tier campaigns in v1. One campaign, one prize, one price.

## Architecture

```
Browser (static SPA on Vercel)
   │  only ever calls n8n webhooks (VITE_COMPETITION_API_BASE)
   ▼
n8n (n8n.lpwebstudio.co.za) — the ONLY holder of secrets
   │  ├─ Yoco Checkout API (create hosted checkout)
   │  ├─ Yoco webhook (signed, payment.succeeded)
   │  ├─ Supabase Postgres (service role, vouchers table)
   │  └─ Zoho SMTP (voucher email, Gio's existing mailbox)
   ▼
Supabase free tier — project in GIO'S OWN org (client-infra-on-client-billing)
```

The SPA holds zero secrets. Supabase RLS stays fully locked (no anon policies);
only n8n's service-role connection reads/writes.

## Payment provider

- **Default: Yoco** Checkout API. `POST https://payments.yoco.com/api/checkouts`
  with secret key → `{redirectUrl, id}`. Webhook `payment.succeeded` is
  HMAC-signed (svix-style headers) and MUST be verified in n8n.
- **Fallback if Gio has no Yoco: Paystack** (2.9% + R1 local cards, ~1-day
  onboarding). The provider touches exactly two n8n nodes (create-checkout call,
  webhook verify); everything else is provider-agnostic.
- The Yoco/Paystack account MUST belong to Gio — payouts go to the account
  holder's bank.

## Data model (Supabase)

One table. `code` is the only secret a customer holds.

```sql
create table public.vouchers (
  id                   uuid primary key default gen_random_uuid(),
  code                 text not null unique,        -- CRAVE-XXXX-XXXX
  buyer_name           text not null,
  buyer_email          text not null,
  buyer_phone          text,
  amount_cents         integer not null default 10000,
  campaign             text not null,               -- e.g. 'spring-2026'
  provider             text not null default 'yoco',
  provider_checkout_id text unique,
  paid_at              timestamptz,                 -- set by payment webhook
  redeemed_at          timestamptz,                 -- set once, atomically
  redeemed_note        text,
  created_at           timestamptz not null default now()
);
alter table public.vouchers enable row level security;  -- no policies: service-role only
```

Atomic redemption (single statement, no race):

```sql
update public.vouchers
set redeemed_at = now(), redeemed_note = $2
where code = $1 and paid_at is not null and redeemed_at is null
returning code, buyer_name, redeemed_at;
```

Draw (paid entries only):

```sql
select code, buyer_name, buyer_email from public.vouchers
where campaign = $1 and paid_at is not null
order by random() limit 1;
```

Voucher code format: `CRAVE-` + two groups of 4 from alphabet
`ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no 0/O/1/I). ~1×10⁹ combinations per
campaign; unguessable at cafe volume. Generated in n8n; unique constraint is the
backstop.

## API contract (n8n webhook endpoints)

Base URL ships to the SPA as `VITE_COMPETITION_API_BASE`
(e.g. `https://n8n.lpwebstudio.co.za/webhook`). All responses JSON with CORS
header `Access-Control-Allow-Origin: https://cafecravecpt.co.za`.

| Endpoint | Method | Request | Response |
|---|---|---|---|
| `/cc-checkout` | POST | `{name, email, phone}` | `200 {redirectUrl}` · `400 {error}` |
| `/cc-voucher?code=` | GET | query `code` | `200 {code, buyerName, amountCents, campaign, paid, redeemedAt}` · `404 {error}` |
| `/cc-redeem` | POST | `{code, pin}` | `200 {ok:true, buyerName, redeemedAt}` · `200 {ok:false, reason}` where reason ∈ `invalid_pin \| not_found \| not_paid \| already_redeemed` |
| `/cc-yoco` | POST | Yoco signed event | `200` (after HMAC verify; else `401`) |

Checkout flow detail: `/cc-checkout` generates the code FIRST, inserts the row
with `paid_at = null`, sets Yoco `successUrl = https://cafecravecpt.co.za/voucher/{code}`,
`metadata.voucherCode = code`. The voucher page shows a "payment processing"
state (poll every 5s) until the webhook sets `paid_at` — normally seconds.

## Pages (SPA routes)

- **`/competition`** — prize, how-it-works, competition rules (CPA s36), buy form
  (name, email, phone), POPIA one-liner, pay button → redirect to Yoco. Hidden
  from nav; reached via homepage banner (and campaign links).
- **`/voucher/:code`** — printable branded voucher: value, code, holder name, QR
  (encodes the full `/redeem/{code}` URL), campaign + draw date, WhatsApp
  Channel join CTA, "valid 3 years" line. Print CSS strips header/footer.
- **`/redeem/:code`** — staff-facing: status (valid / not paid / already
  redeemed at TIME), holder name, 4–6 digit staff PIN input, "Mark redeemed".
  The PIN lives only in n8n; the page just forwards it.
- **Homepage banner** — slim band linking to `/competition`; renders nothing
  when `competition.active` is false.

All campaign variables (active flag, campaign id, price, prize copy, draw date,
rules, channel URL) live in ONE file: `src/data/competition.ts`.

## Legal & compliance (in-scope copy, not legal advice)

- **Framing:** customers BUY a R100 voucher (full value); draw entry is free
  with purchase → promotional competition under CPA s36, not a lottery. The
  competition page must publish the rules (eligibility, dates, draw method,
  prize, one-entry-per-voucher).
- **CPA s63:** the voucher is a prepaid instrument — redeemable for 3 YEARS.
  The draw closes on the campaign date; the R100 value does not lapse.
- **POPIA:** form collects name/email/phone solely to deliver the voucher and
  contact the winner; a one-line notice says so. No marketing use — the
  WhatsApp Channel is opt-in by design.

## Security

- Secrets (Yoco keys, Supabase service key, SMTP, staff PIN) live only in n8n.
- Yoco webhook HMAC signature verified before any DB write.
- Redemption is PIN-gated and atomic; the QR/voucher code alone cannot redeem.
- PIN brute-force lockout (REQUIRED in the n8n redeem workflow, Task 9): log failed
  PIN attempts (code + source IP + timestamp, e.g. a `pin_attempts` table or n8n
  static data); after 5 failures within 15 minutes for the same code or IP, respond
  `{ok:false, reason:'invalid_pin'}` without checking further attempts for 15 minutes.
- The staff redeem surface stays on the main domain: every voucher's QR prints the
  redeem URL, so a separate subdomain adds no secrecy; protection = unguessable codes
  + server-side PIN + lockout. (Optional cosmetic: a staff.cafecravecpt.co.za DNS
  redirect to /redeem may be added at any time; no build dependency.)
- n8n webhook paths include the random tokens n8n generates (not guessable).
- Flag (existing backlog): the netcup VPS hosting n8n is unhardened — the
  security-floor task gains urgency once money flows through it.

## Prerequisites (blockers before build)

1. Gio's go-ahead + campaign details (prize, price, dates, once-off vs monthly).
2. Gio's Yoco account (or Paystack fallback decision) + API keys.
3. Supabase free project created in Gio's org; keys handed to Luke.
4. WhatsApp Channel created; invite link supplied.
5. Staff PIN chosen by Gio.

## Testing strategy

- Pure logic (code format validation, currency formatting, API client parsing)
  → vitest unit tests (new dev-dependency; repo currently has no test runner).
- Pages → typecheck + build + manual verification against a mock n8n endpoint,
  then a full end-to-end dry run in Yoco TEST mode before go-live (checklist in
  the runbook).
- n8n → built by Luke in the GUI from the build guide; each webhook exercised
  with curl examples provided in the guide.
