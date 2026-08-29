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
