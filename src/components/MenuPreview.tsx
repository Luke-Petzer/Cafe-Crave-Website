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

                {/* Food cards in newspaper classified ad style */}
				<div className="grid md:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto mb-12">
					{featuredItems.map((item, index) => (
                        <div key={item.id} className="flex justify-center">
                            {/* Newspaper Classified Ad / Coupon Style */}
                            <div className="group relative bg-paper border-2 border-ink p-4 shadow-newspaper hover:shadow-polaroid transition-all duration-300 w-full max-w-sm"
                                style={{ transform: index % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)' }}>

                                {/* Inner dashed border for "coupon" effect */}
                                <div className="absolute inset-1 border border-dashed border-ink/20 pointer-events-none"></div>

                                <div className="relative z-10">
                                    {/* Image with newspaper filter - grayscale to color on hover */}
                                    <div className="aspect-[4/3] overflow-hidden mb-4 border border-ink/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={`w-full h-full object-cover filter-newspaper ${item.imagePosition || 'object-center'}`}
                                            width="800"
                                            height="600"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Menu item details in typewriter style */}

                                    {/* Category stamp */}
                                    <span className="inline-block text-xs font-accent text-rust font-bold uppercase tracking-widest mb-2 px-2 py-1 border border-rust/30">
                                        {item.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-ink mb-2">
                                        {item.name}
                                    </h3>

                                    {/* Price in large accent font */}
                                    <p className="font-headline text-3xl font-bold text-rust mb-4">
                                        {item.price}
                                    </p>

                                    {/* Divider line with scissors icon for coupon feel */}
                                    <div className="border-t border-dashed border-ink/20 pt-3">
                                        <Link to="/menu" className="w-full font-accent text-xs tracking-widest uppercase text-ink hover:text-rust transition-colors flex items-center justify-center gap-2 py-2">
                                            <span>Order Now</span>
                                            <span className="text-lg leading-none">✂</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Full Menu CTA */}
                <div className="text-center">
                    <Link
                        to="/menu"
                        className="bg-ink text-paper px-8 py-4 rounded-sm inline-flex items-center justify-center font-accent tracking-wide transition-all duration-200 hover:bg-rust focus:outline-none focus:ring-2 focus:ring-rust uppercase"
                    >
                        View Full Menu
                        <ArrowRightIcon size={20} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

