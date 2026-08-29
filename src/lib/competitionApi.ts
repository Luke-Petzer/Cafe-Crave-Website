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
