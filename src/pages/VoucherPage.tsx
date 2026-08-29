import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { competition } from '../data/competition';
import { formatZAR, isValidVoucherCode } from '../lib/format';
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
