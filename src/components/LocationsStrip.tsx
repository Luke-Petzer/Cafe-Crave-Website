import { Link } from 'react-router-dom';

export const LocationsStrip = () => {
  return (
    <section className="section-red py-16">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
          Two spots, same crave
        </h2>
        <div className="mb-8 space-y-1">
          <p className="text-lg">Claremont — 219 Imam Haron Rd</p>
          <p className="text-lg">Plumstead — 120 Main Road</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 will-change-transform"
        >
          Visit Us
        </Link>
      </div>
    </section>
  );
};
