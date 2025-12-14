import { motion } from 'framer-motion';

const records = [
  { rank: "01", album: "A Night at the Opera", artist: "Queen", year: "1975" },
  { rank: "02", album: "Born in the U.S.A.", artist: "Bruce Springsteen", year: "1984" },
  { rank: "03", album: "Rumours", artist: "Fleetwood Mac", year: "1977" },
  { rank: "04", album: "Abbey Road", artist: "The Beatles", year: "1969" },
  { rank: "05", album: "Hotel California", artist: "Eagles", year: "1976" }
];

export const VinylSection = () => {
  return (
    <section className="bg-espresso text-paper py-20 relative overflow-hidden">
      {/* Background Pattern (Optional opacity) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left: The "Now Spinning" Visual */}
        <motion.div
          initial={{ rotate: -5, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative aspect-square max-w-md mx-auto"
        >
            {/* The Sleeve */}
            <div className="absolute inset-0 bg-paper transform -rotate-3 rounded-sm shadow-xl"></div>
            {/* The Record (Black Circle) */}
            <div className="absolute inset-2 bg-black rounded-full shadow-2xl flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full relative"
                >
                  {/* The Label */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-rust rounded-full border-4 border-white/20"></div>
                </motion.div>
            </div>
            {/* The "Cover" Image (Actually playing) */}
            <div
              className="absolute inset-0 m-4 shadow-inner border border-white/10 bg-center bg-cover rounded-sm"
              style={{ backgroundImage: "url('/src/assets/queen-night-at-the-opera.webp')" }}
            >
            </div>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-paper text-ink px-6 py-2 font-accent tracking-widest shadow-lg text-sm whitespace-nowrap">
                NOW SPINNING
            </div>
        </motion.div>

        {/* Right: The Charts List */}
        <div>
          <h2 className="font-headline text-5xl mb-2 text-paper">ON THE AIR</h2>
          <p className="font-body text-white/60 mb-10 italic">Curated selections from our vintage vault.</p>

          <ul className="space-y-6">
            {records.map((record) => (
              <motion.li
                key={record.rank}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="group flex items-center gap-6 border-b border-white/10 pb-6 hover:border-rust transition-colors cursor-pointer"
              >
                <span className="font-headline text-4xl text-rust opacity-50 group-hover:opacity-100 transition-opacity">
                  {record.rank}
                </span>
                <div className="flex-1">
                  <h3 className="font-headline text-2xl group-hover:text-rust transition-colors">
                    {record.album}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-accent text-sm tracking-wider text-white/60">{record.artist}</span>
                    <span className="font-typewriter text-xs text-white/40 border border-white/20 px-2 py-0.5 rounded-full">
                      {record.year}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

