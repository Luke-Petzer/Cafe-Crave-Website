
import { motion } from 'framer-motion';

const Stamp = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="hidden sm:flex absolute -top-12 -right-12 md:-right-16 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-rust items-center justify-center z-10 bg-paper/80 backdrop-blur-sm"
  >
    <div className="relative w-full h-full animate-spin-slow">
       <svg viewBox="0 0 100 100" className="w-full h-full absolute top-0 left-0">
         <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent"/>
         <text className="font-accent text-[11px] uppercase tracking-[0.2em] fill-rust font-bold">
           <textPath xlinkHref="#curve">
             Strictly Halal • Est 2020 • Best in Town •
           </textPath>
         </text>
       </svg>
    </div>
    <div className="absolute font-headline font-bold text-2xl text-rust">
      CC
    </div>
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex flex-col md:flex-row max-w-7xl mx-auto p-6 md:p-12 gap-8 md:gap-16 items-center">

      {/* Left Column: The Lead Article */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-8 relative z-10"
      >
        <span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm">
          VOL. IV — THE MORNING BREW
        </span>

        <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.9] text-ink">
          THE DAILY <br/>
          <span className="italic font-normal">GRIND.</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-ink/20 pl-6">
          <p className="font-body text-lg leading-relaxed text-ink/80 max-w-md text-justify">
            <span className="text-4xl float-left mr-2 mt-[-6px] font-headline">W</span>
            here the aroma of freshly roasted beans meets the crackle of vintage vinyl.
            Café Crave isn't just a coffee shop; it's a living room for the community,
            serving comfort food and culture in equal measure.
          </p>
        </div>

        <div className="pt-4">
           <button className="bg-ink text-paper px-8 py-3 font-accent tracking-widest hover:bg-rust transition-colors shadow-lg">
             READ MENU
           </button>
        </div>
      </motion.div>

      {/* Right Column: The Visual (Polaroid/Cutout style) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex-1 relative w-full aspect-[4/5] md:aspect-square"
      >
        {/* The Image Container */}
        <div className="relative w-full h-full bg-washed-brown/20 p-4 rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
          <div className="absolute inset-0 border border-ink/10 pointer-events-none"></div>

          {/* Hero Image with newspaper filter */}
          <img
            src="/src/assets/cafe-crave-hero.webp"
            alt="Signature Coffee"
            className="w-full h-full object-cover filter-newspaper shadow-xl"
          />

          {/* The Stamp Overlay */}
          <Stamp />
        </div>
      </motion.div>

    </section>
  );
};


export default HeroSection;

