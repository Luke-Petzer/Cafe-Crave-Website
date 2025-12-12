import React from 'react';
import { motion } from 'framer-motion';
import { newspaperVariants } from '../utils/newspaperAnimations';

const reviews = [
	{
		text: "Best coffee I've had outside of Italy. The vinyl selection is impeccable.",
		author: "Sarah M.",
		date: "Dec 2024",
	},
	{
		text: "The atmosphere is unmatched. Feels like stepping back in time to a cozy 1970s cafe.",
		author: "Michael T.",
		date: "Nov 2024",
	},
	{
		text: "Halaal options everywhere, and the breakfast is absolutely divine. This is my new Sunday ritual.",
		author: "Fatima K.",
		date: "Oct 2024",
	},
	{
		text: "Found my new favorite spot in Claremont. The burger is criminally good.",
		author: "James L.",
		date: "Sep 2024",
	},
	{
		text: "Love the retro vibe! Perfect place to work remotely with incredible coffee.",
		author: "Emma R.",
		date: "Aug 2024",
	},
	{
		text: "The vinyl collection alone is worth the visit. Plus the cortado is perfection.",
		author: "David P.",
		date: "Jul 2024",
	},
];

export const TestimonialsSection: React.FC = () => {
	return (
		<section className="bg-paper py-16 relative">
			<div className="max-w-7xl mx-auto px-6">
				{/* Section Header */}
				<div className="text-center mb-12">
					<span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-4">
						Community Voice
					</span>
					<h2 className="font-headline text-5xl md:text-6xl text-ink mb-4">
						Letters to the Editor
					</h2>
					<div className="w-24 h-1 bg-rust mx-auto mb-6"></div>
					<p className="font-body text-lg text-ink/70 max-w-2xl mx-auto">
						What our regulars are saying about their Café Crave experience
					</p>
				</div>

				{/* Masonry Grid of Reviews */}
				<motion.div
					variants={newspaperVariants.staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
					className="columns-1 md:columns-2 lg:columns-3 gap-8"
				>
					{reviews.map((review, idx) => (
						<motion.div
							key={idx}
							variants={newspaperVariants.staggerItem}
							className="break-inside-avoid mb-8 bg-paper p-6
                         border-b-2 border-ink/30 shadow-sm
                         font-typewriter text-sm
                         hover:shadow-md transition-shadow duration-300"
							style={{
								transform: `rotate(${(idx % 3 - 1) * 1.5}deg)`,
								clipPath:
									'polygon(0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 0 97%)',
							}}
						>
							{/* Quote Mark */}
							<div className="text-rust text-6xl font-headline leading-none mb-2 opacity-30">
								"
							</div>
              {/* Review Text */}
							{/* Review Text */}
							<p className="text-ink/80 italic mb-4 leading-relaxed">
								{review.text}
							</p>
              {/* Attribution */}
							{/* Attribution */}
							<div className="border-t border-ink/20 pt-3 mt-4">
								<p className="font-accent text-rust text-xs uppercase tracking-wider">
									— {review.author}
								</p>
								<p className="text-ink/50 text-xs mt-1 font-typewriter">
									{review.date}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
        {/* Call to Action */}
				{/* Call to Action - Postcard Style */}
				<div className="text-center mt-16 pt-8 border-t-2 border-dashed border-ink/20">
					<p className="font-body text-ink/70 mb-6 italic">
						Been here? Share your experience with us.
					</p>

					{/* Postcard Style Button */}
					<a
						href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 bg-paper border-2 border-rust px-8 py-4
                       font-accent tracking-widest text-rust hover:bg-rust hover:text-paper
                       transition-colors shadow-newspaper hover:shadow-polaroid
                       transform hover:-translate-y-1 duration-300"
						style={{
							borderStyle: 'dashed',
							backgroundImage:
								'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139,46,46,0.05) 10px, rgba(139,46,46,0.05) 20px)',
						}}
					>
						<span className="text-2xl">✍️</span>
						<span>WRITE TO THE EDITOR</span>
					</a>
				</div>
			</div>
		</section>
	);
};
