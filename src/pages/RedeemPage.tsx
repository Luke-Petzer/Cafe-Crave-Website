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
