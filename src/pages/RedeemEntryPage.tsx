import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { isValidVoucherCode } from '../lib/format';

export const RedeemEntryPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalised = code.trim().toUpperCase();
    if (!isValidVoucherCode(normalised)) {
      setError("That's not a valid voucher code — check the format.");
      return;
    }
    setError(null);
    navigate('/redeem/' + normalised);
  };

  return (
    <div className="min-h-screen">
      <SEO title="Redeem Voucher | Staff" description="Café Crave staff voucher redemption." />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="section-dark py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-md text-center">
            <h1 className="text-3xl font-serif font-bold mb-8">Voucher check</h1>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                className="w-full p-3 rounded-md text-primary text-center text-2xl tracking-widest font-mono"
                type="text"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="CRAVE-XXXX-XXXX"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                aria-label="Voucher code"
              />
              {error && <p className="text-lg font-bold text-accent">{error}</p>}
              <button
                type="submit"
                className="w-full bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md font-medium text-lg transition-all duration-200 disabled:opacity-60"
              >
                Check voucher
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
