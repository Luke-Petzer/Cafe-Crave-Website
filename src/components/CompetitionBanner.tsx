import { Link } from 'react-router-dom';
import { competition } from '../data/competition';
import { formatZAR } from '../lib/format';

export const CompetitionBanner = () => {
  if (!competition.active) return null;
  return (
    <section className="section-red py-12">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Win {competition.prize}</h2>
        <p className="text-lg mb-6 opacity-90">
          Buy a {formatZAR(competition.priceCents)} voucher online — every voucher is an entry into the draw.
        </p>
        <Link
          to="/competition"
          className="inline-flex items-center justify-center bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg"
        >
          Enter the Draw
        </Link>
      </div>
    </section>
  );
};
