export const formatZAR = (cents: number): string => `R${(cents / 100).toFixed(2)}`;

// CRAVE- + 2×4 chars, alphabet excludes 0/O/1/I
export const VOUCHER_CODE_RE = /^CRAVE-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;

export const isValidVoucherCode = (code: string): boolean =>
  VOUCHER_CODE_RE.test(code.trim().toUpperCase());
