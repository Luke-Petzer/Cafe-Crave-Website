import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Hero = () => {
  return <section className="section-dark relative min-h-[600px] md:min-h-[650px] flex items-center pt-20" aria-label="Hero section">
      <div className="absolute inset-0 z-0 opacity-60 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div id="main-content" className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-['Rockwell',serif] font-bold mb-6 leading-tight">
            Cafe<span className="text-secondary">Crave</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif mb-6">
            Great Coffee. Classic Vinyl. Your Local Hangout.
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            A retro-inspired cafe where memories are made over exceptional
            coffee and board games.
          </p>
          <Link to="/menu" className="bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md inline-flex items-center font-medium transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
            View Our Menu
            <ArrowRightIcon size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>;
};