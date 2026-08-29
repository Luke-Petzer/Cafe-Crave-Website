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
