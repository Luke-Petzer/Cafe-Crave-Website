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
