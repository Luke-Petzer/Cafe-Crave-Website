import { CoffeeIcon, UsersIcon, HeartIcon } from 'lucide-react';
export const About = () => {
  return <section id="about" className="bg-light py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            About Cafe Crave
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CoffeeIcon size={32} className="text-light" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              Quality Coffee
            </h3>
            <p className="text-subtext">
              We source and brew exceptional coffee beans with care and
              precision for the perfect cup every time.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UsersIcon size={32} className="text-light" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              Community Hub
            </h3>
            <p className="text-subtext">
              More than just a cafe, we're a gathering space where neighbors
              become friends.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon size={32} className="text-light" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Retro Vibes</h3>
            <p className="text-subtext">
              Our space blends nostalgic charm with modern comfort for a unique
              experience.
            </p>
          </div>
        </div>
      </div>
    </section>;
};