import { motion } from 'framer-motion';
import Masthead from '../components/Masthead';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { BookIcon, MusicIcon, CoffeeIcon, UsersIcon, HeartIcon } from 'lucide-react';
import { TornEdge } from '../components/NewspaperComponents';

import coffeeImg from '../assets/cuppacino.webp';
import vinylRecordsImg from '../assets/vinyl-records.webp';
import boardGamesImg from '../assets/board-games.webp';
import cafeHeroImg from '../assets/cafe-crave-hero.webp';

export const About = () => {

// Timeline data
const timeline = [
	{
		year: '2020',
		title: 'The Beginning',
		description:
			'Founded in the heart of Claremont with a vision to create a community space where coffee culture meets vinyl nostalgia.',
	},
	{
		year: '2022',
		title: 'Expansion',
		description:
			'Expanded our vinyl collection to over 200 records and introduced board game nights, becoming a true community hub.',
	},
	{
		year: '2024',
		title: 'Today',
		description:
			'Proud to serve Cape Town with strictly halal offerings, artisan coffee, and a space that feels like home to hundreds daily.',
	},
];

// Team data
const team = [
	{
		name: 'Ahmed Hassan',
		role: 'Head Barista & Co-Founder',
		photo: coffeeImg,
	},
	{
		name: 'Sarah Williams',
		role: 'Music Curator',
		photo: vinylRecordsImg,
	},
	{
		name: 'Fatima Khan',
		role: 'Community Manager',
		photo: boardGamesImg,
	},
];

	return (
		<div className="min-h-screen bg-grain font-body">
			<SEO
				title="The Origin Story | Crave Café"
				description="Discover the story behind Crave Café. A retro-inspired community space in Cape Town where coffee culture meets vinyl records. Learn about our journey from 2020 to today."
				keywords="about café, café story, Cape Town coffee culture, community café, retro café, café values, local café, halal café"
			/>

			<Masthead />

			<main id="main-content">
				{/* SECTION 1: THE LEAD STORY (Hero) */}
				<section className="bg-paper py-20 md:py-28">
					<div className="max-w-7xl mx-auto px-6">
						{/* Dateline */}
						<span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-4">
							VOL. I — THE HISTORY OF CRAVE
						</span>

						{/* Split Layout */}
						<div className="grid md:grid-cols-5 gap-12 mt-8">
							{/* Left: Text (3 columns) */}
							<div className="md:col-span-3">
								<h1 className="font-headline text-6xl md:text-8xl font-bold text-ink mb-8 leading-[0.95]">
									THE ORIGIN
									<br /> STORY
								</h1>

								<div className="space-y-6 font-body text-lg leading-relaxed text-ink/80">
									<p className="text-justify">
										<span className="float-left font-headline text-7xl mr-3 mt-1 leading-none text-rust">
											I
										</span>
										n 2020, amidst global uncertainty, a vision was born in the heart of
										Claremont, Cape Town.
										<br />
										Café Crave emerged not just as another coffee shop, but as a deliberate
										answer to a question:
										<br />
										What if we could create a space that felt like a living room for the entire
										community?
									</p>

									<p className="text-justify">
										The founders, passionate about both artisan coffee and the warm crackle of
										vinyl records,
										<br />
										saw an opportunity to blend the old with the new. They envisioned a place
										where the ritual
										<br />
										of brewing the perfect cup would be accompanied by the soundtrack of
										classic albums spinning
										<br />
										on a turntable.
									</p>

									<p className="text-justify">
										From day one, the commitment was clear: strictly halal offerings, ethically
										sourced beans,
										<br />
										and a space where everyone—families, students, remote workers, and vinyl
										enthusiasts—would
										<br />
										feel welcome to stay awhile.
									</p>
								</div>
							</div>

							{/* Right: Image (2 columns) */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="md:col-span-2"
							>
								<div className="relative border-2 border-ink/20 p-4 bg-paper shadow-newspaper">
									<img
										src={cafeHeroImg}
										alt="Café Crave - The early days"
										className="w-full aspect-[3/4] object-cover filter-newspaper"
									/>
									<p className="font-body italic text-sm text-ink/70 mt-3 text-center">
										Fig. 1 — The first pour, Est. 2020
									</p>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				<TornEdge />

				{/* SECTION 2: THE NARRATIVE (Column Layout) */}
				<section className="bg-paper py-20">
					<div className="max-w-6xl mx-auto px-6">
						<span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-8">
							Feature Article
						</span>

						{/* Two-Column Article with Hyphenation */}
						<div className="columns-1 md:columns-2 gap-12 font-body text-lg leading-relaxed text-justify text-ink/80 newspaper-columns">
							<p>
								Our journey began with a simple question: what makes a café more than just a
								place to grab coffee?
								<br />
								The answer, we discovered, lies in the details. From the moment you step
								through our doors, every
								<br />
								element has been carefully considered—from the warm amber lighting that
								mimics the glow of a sunset
								<br />
								to the carefully curated playlist spinning on our vintage turntable.
							</p>

							<p>
								We source our coffee beans from ethical, sustainable farms, working directly
								with farmers who share
								<br />
								our commitment to quality. Each batch is roasted locally to ensure peak
								freshness, and our baristas
								<br />
								are trained not just in technique, but in the art of hospitality. Every cup
								is a conversation starter,
								<br />
								every visit a chance to discover something new.
							</p>

							{/* Pull Quote */}
							<div className="my-12 not-prose border-y-2 border-ink py-8 text-center break-inside-avoid -mx-6 px-6">
								<p className="font-headline italic text-2xl md:text-3xl text-rust leading-relaxed">
									"We didn't just want to serve coffee; we wanted to curate a soundtrack for
									your morning,
									<br />
									a refuge for your afternoon, and a gathering place for your community."
								</p>
								<span className="font-accent text-xs tracking-widest text-ink/60 mt-4 block uppercase">
									— Founders, 2020
								</span>
							</div>

							<p>
								The vinyl collection was never meant to be background noise. Each record is
								choosen with intention,
								<br />
								creating an atmosphere that shifts with the time of day. Morning brings
								mellow jazz and folk,
								<br />
								afternoon sees classic rock and soul, while evenings pulse with the energy
								of funk and disco.
								<br />
								This isn't a playlist on shuffle—it's a living, breathing part of the café's
								identity.
							</p>

							<p>
								But perhaps what we're most proud of is the community that has formed
								within these walls.
								<br />
								From the regular who arrives every morning at 7:30 to the families who
								gather for Sunday brunch,
								<br />
								from the students who've made our corner booths their study sanctuaries to
								the board game enthusiasts
								<br />
								who turn Tuesday nights into strategic battles—Café Crave has become
								exactly what we hoped:
								<br />
								a living room for Claremont.
							</p>

							<p>
								Today, we continue that mission with the same passion that sparked it all.
								<br />
								Every cup brewed, every record spun, every conversation facilitated—they're
								all part of a larger story.
								<br />
								Your story. Our story. The story of a community that found its rhythm in
								the crackle of vinyl and the aroma
								<br />
								of freshly ground beans.
							</p>
						</div>
					</div>
				</section>

				<TornEdge />

				{/* SECTION 3: THE ARCHIVE (Timeline) - With Textured Background */}
				<section className="bg-espresso-textured py-20">
					<div className="max-w-4xl mx-auto px-6">
						<div className="text-center mb-16">
							<span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-4">
								Historical Record
							</span>
							<h2 className="font-headline text-5xl md:text-6xl text-paper mb-4">
								THE ARCHIVE
							</h2>
							<div className="w-24 h-1 bg-rust mx-auto"></div>
						</div>

						{/* Timeline */}
						<div className="relative border-l-2 border-dotted border-rust/50 ml-12 md:ml-16">
							{timeline.map((event, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: idx * 0.2 }}
									viewport={{ once: true }}
									className="mb-16 relative"
								>
									{/* Stamp Marker */}
									<div className="absolute -left-[60px] md:-left-16 w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-rust bg-paper flex items-center justify-center shadow-newspaper">
										<span className="font-typewriter text-sm md:text-base font-bold text-rust">
											{event.year}
										</span>
									</div>

									{/* Content */}
									<div className="pl-8 md:pl-12">
										<h3 className="font-headline text-2xl md:text-3xl text-paper mb-3">
											{event.title}
										</h3>
										<p className="font-body text-paper/80 leading-relaxed">
											{event.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<TornEdge />

				{/* SECTION 4: THE MANIFESTO (Values Grid) */}
				<section className="bg-paper py-20">
					<div className="max-w-6xl mx-auto px-6">
						<div className="text-center mb-16">
							<span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-4">
								Our Principles
							</span>
							<h2 className="font-headline text-5xl md:text-6xl text-ink mb-4">
								THE MANIFESTO
							</h2>
							<div className="w-24 h-1 bg-rust mx-auto mb-6"></div>
							<p className="font-body text-lg text-ink/70 max-w-2xl mx-auto">
								Four pillars that define everything we do
							</p>
						</div>

						{/* 2x2 Grid */}
						<div className="grid md:grid-cols-2 gap-0 border-2 border-ink">
							{/* Cell 1 */}
							<div className="border-b-2 md:border-r-2 border-ink p-8 md:p-12 hover:bg-paper/50 transition-colors">
								<span className="font-headline text-6xl md:text-7xl text-rust/20 block mb-4">
									01
								</span>
								<div className="flex items-center gap-3 mb-4">
									<CoffeeIcon size={28} className="text-rust" />
									<h3 className="font-accent text-2xl uppercase tracking-wide text-ink">
										QUALITY FIRST
									</h3>
								</div>
								<p className="font-body text-justify text-ink/80 leading-relaxed">
									We source the finest ethically-traded beans, roast them locally, and train
									our baristas
									<br />
									to perfect their craft. Every cup is brewed with precision and care,
									because mediocre
									<br />
									coffee is never an option.
								</p>
							</div>

							{/* Cell 2 */}
							<div className="border-b-2 border-ink p-8 md:p-12 hover:bg-paper/50 transition-colors">
								<span className="font-headline text-6xl md:text-7xl text-rust/20 block mb-4">
									02
								</span>
								<div className="flex items-center gap-3 mb-4">
									<UsersIcon size={28} className="text-rust" />
									<h3 className="font-accent text-2xl uppercase tracking-wide text-ink">
										COMMUNITY HUB
									</h3>
								</div>
								<p className="font-body text-justify text-ink/80 leading-relaxed">
									More than a café, we're a gathering place. From families enjoying weekend
									brunch to
									<br />
									students finding their study sanctuary, from board game nights to impromptu
									vinyl listening
									<br />
									sessions—everyone has a place at our table.
								</p>
							</div>

							{/* Cell 3 */}
							<div className="md:border-r-2 border-ink p-8 md:p-12 hover:bg-paper/50 transition-colors">
								<span className="font-headline text-6xl md:text-7xl text-rust/20 block mb-4">
									03
								</span>
								<div className="flex items-center gap-3 mb-4">
									<MusicIcon size={28} className="text-rust" />
									<h3 className="font-accent text-2xl uppercase tracking-wide text-ink">
										VINYL SOUL
									</h3>
								</div>
								<p className="font-body text-justify text-ink/80 leading-relaxed">
									Our curated vinyl collection isn't decoration—it's the heartbeat of the
									space.
									<br />
									From jazz to rock, soul to funk, each record is chosen to create the
									perfect atmosphere
									<br />
									for whatever moment you're living.
								</p>
							</div>

							{/* Cell 4 */}
							<div className="p-8 md:p-12 hover:bg-paper/50 transition-colors">
								<span className="font-headline text-6xl md:text-7xl text-rust/20 block mb-4">
									04
								</span>
								<div className="flex items-center gap-3 mb-4">
									<HeartIcon size={28} className="text-rust" />
									<h3 className="font-accent text-2xl uppercase tracking-wide text-ink">
										HALAL CERTIFIED
									</h3>
								</div>
								<p className="font-body text-justify text-ink/80 leading-relaxed">
									Strictly halal, always. From our kitchen to our suppliers, we maintain the
									highest
									<br />
									standards of halal certification. Quality food and drink, prepared with
									integrity,
									<br />
									so everyone can enjoy with confidence.
								</p>
							</div>
						</div>
					</div>
				</section>

				<TornEdge />

				{/* SECTION 5: STAFF WRITERS (Team) */}
				<section className="bg-paper py-20">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-4">
								Meet The Team
							</span>
							<h2 className="font-headline text-5xl md:text-6xl text-ink mb-4">
								STAFF WRITERS
							</h2>
							<div className="w-24 h-1 bg-rust mx-auto mb-6"></div>
							<p className="font-body text-lg text-ink/70 max-w-2xl mx-auto">
								The people who make the magic happen daily
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
							{team.map((member, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.1 }}
									viewport={{ once: true }}
									className="relative border-2 border-ink/20 p-4 bg-paper shadow-newspaper hover:shadow-polaroid transition-all duration-300"
									style={{ transform: `rotate(${(idx % 2 === 0 ? -1 : 1) * 1}deg)` }}
								>
									{/* Photo */}
									<div className="aspect-[3/4] overflow-hidden border border-ink/10 mb-4">
										<img
											src={member.photo}
											alt={member.name}
											className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
										/>
									</div>

									{/* Details */}
									<h3 className="font-headline text-2xl font-bold text-ink">
										{member.name}
									</h3>
									<p className="font-typewriter italic text-sm text-ink/70 mt-1">
										{member.role}
									</p>

									{/* ON SHIFT Stamp */}
									<div className="absolute -top-2 -right-2 w-16 h-16 rounded-full border-2 border-rust rotate-12 bg-paper flex items-center justify-center shadow-lg">
										<span className="font-accent text-[8px] text-rust font-bold uppercase text-center leading-tight">
											ON
											<br />
											SHIFT
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<TornEdge />

				{/* SECTION 6: Call to Action */}
				<section className="bg-espresso py-16 md:py-20">
					<div className="max-w-4xl mx-auto px-6 text-center">
						<h2 className="font-headline text-4xl md:text-5xl text-paper mb-6">
							Ready to Be Part of the Story?
						</h2>
						<p className="font-body text-lg md:text-xl text-paper/80 mb-8 max-w-2xl mx-auto">
							Visit us in Claremont and experience what makes Café Crave more than just a
							coffee shop.
						</p>
						<a
							href="/contact"
							className="inline-flex items-center gap-3 bg-paper border-2 border-rust px-8 py-4
                         font-accent tracking-widest text-rust hover:bg-rust hover:text-paper
                         transition-colors shadow-newspaper hover:shadow-polaroid
                         transform hover:-translate-y-1 duration-300"
						>
							<BookIcon size={20} />
							<span>VISIT US TODAY</span>
						</a>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};
