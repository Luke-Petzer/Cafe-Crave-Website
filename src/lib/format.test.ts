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
