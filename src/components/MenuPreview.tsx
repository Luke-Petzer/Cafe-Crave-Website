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
        price: 'R35',
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
        price: 'R42',
        image: matchaImg,
        imagePosition: 'object-[50%_25%]'
    },
];
export const MenuPreview: React.FC = () => {
    return (
        <section className="section-animate section-red py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
                <div className="text-center mb-12">
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
							className="bg-lightBg rounded-lg overflow-hidden shadow-md border border-redText border-opacity-20 transform transition-all duration-150 hover:-translate-y-2 hover:shadow-lg"
						>
							{/*
								Image Container Adjustment Guide (Aspect Ratio Method):

								Aspect Ratio Options:
								- aspect-video = 16:9 ratio (Current - best for landscape food photos)
								- aspect-[4/3] = 4:3 ratio (slightly taller, more traditional)
								- aspect-square = 1:1 ratio (square images)
								- aspect-[3/2] = 3:2 ratio (classic photo ratio)

								Object Fit Options:
								- object-cover = Fills container, minimal cropping (Current - best with aspect ratios)
								- object-contain = Shows entire image, may have white space

								Vertical Alignment:
								- object-top = Aligns image to top
								- object-center = Centers image (default)
								- object-bottom = Aligns image to bottom

								Example: To use a taller 4:3 ratio and align to top:
								Change: className="aspect-video overflow-hidden bg-white"
								To:     className="aspect-[4/3] overflow-hidden bg-white"
								And:    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
							*/}
                            <div className="aspect-[4/3] overflow-hidden bg-white">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${item.imagePosition || 'object-center'}`}
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
						className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
					>
						View Full Menu
						<ArrowRightIcon size={18} className="ml-2" />
					</Link>
				</div>
			</div>
		</section>
	);
};

