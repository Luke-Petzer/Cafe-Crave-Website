import { useState, FormEvent } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';
import { competition } from '../data/competition';
import { formatZAR } from '../lib/format';
import { createCheckout } from '../lib/competitionApi';

export const CompetitionPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !/.+@.+\..+/.test(email)) {
      setError('Please fill in your name and a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const url = await createCheckout({ name: name.trim(), email: email.trim(), phone: phone.trim() });
      window.location.href = url;
    } catch {
      setError('Something went wrong starting your payment. Please try again.');
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full p-3 rounded-md border border-lightText border-opacity-30 bg-white text-lightText focus:outline-none focus:ring-2 focus:ring-accent';

  return (
    <div className="min-h-screen">
      <SEO
        title="Win with Café Crave | Voucher Competition"
        description={`Buy a ${formatZAR(competition.priceCents)} Café Crave voucher online and stand a chance to win ${competition.prize}.`}
      />
      <ScrollAnimationObserver />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="section-dark py-16 md:py-20 text-center">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Win {competition.prize}</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Buy a {formatZAR(competition.priceCents)} Café Crave voucher — spend it on anything in store,
              and every voucher is an entry into our draw on {competition.drawDate}.
            </p>
          </div>
        </section>

        {competition.active ? (
          <section className="section-light py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-xl">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">Get your voucher</h2>
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <input className={inputClass} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Full name" />
                <input className={inputClass} type="email" placeholder="Email (your voucher is sent here)" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email" />
                <input className={inputClass} type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
                {error && <p className="text-accent font-medium" role="alert">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md font-medium text-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Taking you to secure payment…' : `Pay ${formatZAR(competition.priceCents)} securely`}
                </button>
                <p className="text-sm opacity-70">
                  We use your details only to deliver your voucher and contact you if you win. Payment is
                  processed on our payment provider's secure page — your card details never touch our site.
                </p>
              </form>
            </div>
          </section>
        ) : (
          <section className="section-light py-16 md:py-20 text-center">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <p className="text-xl">The competition isn't open right now — follow us on social media to catch the next one.</p>
            </div>
          </section>
        )}

        <section className="section-red py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Competition rules</h2>
            <ol className="list-decimal list-inside space-y-3 opacity-90">
              {competition.rules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
