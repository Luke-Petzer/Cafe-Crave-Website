import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

// Import featured menu images
import cheesecakeImg from '../assets/Pasted_Graphic_4.webp';
import lambChopsImg from '../assets/Pasted_Graphic_5.webp';
import matchaImg from '../assets/Pasted_Graphic_3.webp';

const featuredItems = [
    {
        id: 1,
        name: 'Biscoff Cheesecake',
        category: 'Dessert',
        price: 'R95',
        image: cheesecakeImg,
        imagePosition: '', // Or 'object-center'
    },
    {
        id: 2,
        name: 'Lamb Chops',
        category: 'Lunch',
        price: 'R175',
        image: lambChopsImg,
        imagePosition: '', // Or 'object-center'
    },
    {
        id: 3,
        name: 'Iced Matcha',
        category: 'Beverages',
        price: 'R65',
        image: matchaImg,
        imagePosition: 'object-[50%_25%]'
    },
];
export const MenuPreview: React.FC = () => {
    return (
        <section className="section-animate py-20 md:py-28" style={{ backgroundColor: 'transparent' }}>
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
                {/* Newspaper-style header on aged paper */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="paper-container newspaper-border p-8 md:p-10">
                        <h2 className="vintage-headline text-3xl md:text-4xl mb-4">
                            Featured Menu Items
                        </h2>
                        <div className="w-32 h-0.5 bg-ink-black mx-auto mb-6" style={{ borderTop: '3px double #1A1512' }}></div>
                        <p className="typewriter-text text-base md:text-lg">
                            Crafted with care, served with love
                        </p>
                    </div>
                </div>

                {/* Food cards on dark coasters/placemats */}
				<div className="grid md:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto mb-12">
					{featuredItems.map((item, index) => (
                        <div key={item.id} className="flex justify-center">
                            {/* Dark coaster/placemat sitting on wood background */}
                            <div className="dark-coaster p-6 w-full max-w-sm">
                                {/* Aged paper card on top of coaster */}
                                <div
                                    className="paper-container overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                    style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
                                >
                                    {/* Vintage food photo */}
                                    <div className="aspect-[4/3] overflow-hidden bg-white">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={`w-full h-full object-cover vintage-photo transition-transform duration-300 hover:scale-105 ${item.imagePosition || 'object-center'}`}
                                            width="800"
                                            height="600"
                                            loading="lazy"
                                        />
                                    </div>
                                    {/* Menu item details in typewriter style */}
                                    <div className="p-6 border-t-2 border-ink-black border-opacity-20">
                                        <span className="text-xs text-sepia-tone font-bold uppercase tracking-widest" style={{ fontFamily: 'Courier New, monospace' }}>
                                            {item.category}
                                        </span>
                                        <h3 className="text-xl font-serif font-bold text-ink-black mt-2 mb-3">
                                            {item.name}
                                        </h3>
                                        <p className="text-2xl font-bold text-sepia-tone" style={{ fontFamily: 'Playfair Display, serif' }}>
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
					))}
				</div>

                {/* CTA button on aged paper */}
				<div className="text-center">
                    <div className="inline-block paper-container p-6 rounded-sm">
                        <Link
                            to="/menu"
                            className="bg-sepia-tone hover:bg-opacity-90 text-vintage-cream px-8 py-4 rounded-sm inline-flex items-center justify-center font-bold transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sepia-tone focus:ring-opacity-50 will-change-transform uppercase tracking-wide border-2 border-ink-black text-lg"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            View Full Menu
                            <ArrowRightIcon size={20} className="ml-2" />
                        </Link>
                    </div>
				</div>
			</div>
		</section>
	);
};

