import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

const featuredItems = [
	{
		id: 1,
		name: 'Café Latte',
		category: 'Coffee',
		price: 'R35',
		image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500',
	},
	{
		id: 2,
		name: 'Classic Burger',
		category: 'Food',
		price: 'R85',
		image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
	},
	{
		id: 3,
		name: 'Iced Mocha',
		category: 'Coffee',
		price: 'R42',
		image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500',
	},
];

export const MenuPreview: React.FC = () => {
	return (
		<section className="section-red py-20 md:py-28">
			<div className="container mx-auto px-6 md:px-10 lg:px-16">
				<div className="text-center mb-12 scroll-animate">
					<h2 className="text-3xl md:text-4xl font-['Rockwell',serif] font-bold mb-4">
						Featured Menu Items
					</h2>
					<div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
					<p className="max-w-2xl mx-auto text-lg">
						Crafted with care, served with love
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
					{featuredItems.map((item) => (
						<div
							key={item.id}
							className="bg-lightBg rounded-lg overflow-hidden shadow-md border border-redText border-opacity-20 transform transition-all duration-150 hover:-translate-y-2 hover:shadow-lg scroll-animate"
						>
							<div className="h-48 overflow-hidden">
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
								/>
							</div>
							<div className="p-6">
								<span className="text-xs text-accent font-medium uppercase tracking-wide">
									{item.category}
								</span>
								<h3 className="text-xl font-bold text-darkBg mt-2 mb-3">
									{item.name}
								</h3>
								<p className="text-2xl font-bold text-accent">
									{item.price}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="text-center">
					<Link
						to="/menu"
						className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
					>
						View Full Menu
						<ArrowRightIcon size={18} className="ml-2" />
					</Link>
				</div>
			</div>
		</section>
	);
};
