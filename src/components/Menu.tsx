import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
export const Menu = () => {
  const [activeItem, setActiveItem] = useState(0);
  const menuItems = [{
    id: 1,
    name: 'Artisan Latte',
    price: 'R50',
    description: 'Single shot espresso, steamed milk, small foam layer',
    image: 'src/assets/breakfast.webp'
  }, {
    id: 2,
    name: 'The Crave Breakfast',
    price: 'R135',
    description: '2 free range eggs, 2 sausages, 1 slice of spiced beef, sautéed mushrooms, beans and grilled tomato',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }, {
    id: 3,
    name: 'The Crave Beef Burger',
    price: 'R150',
    description: '200g beef patty with red onion, lettuce, tomato, cucumber',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1899&q=80'
  }, {
    id: 4,
    name: 'Vietnamese Iced Coffee',
    price: 'R65',
    description: 'Double shot espresso, condensed milk, milk, ice',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }, {
    id: 5,
    name: 'Chicken & Feta Wrap',
    price: 'R125',
    description: 'Fillet chicken strips, tomato, cucumber, feta, spinach',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }, {
    id: 6,
    name: 'Tropical Escape',
    price: 'R65',
    description: 'Pineapple, pineapple juice, coconut milk, lime, ice',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80'
  }];
  return <section id="menu" className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-light mb-4">
            Menu Sneak Peek
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-light opacity-80 max-w-2xl mx-auto text-lg">
            A taste of what we offer, from handcrafted coffees to delicious food
          </p>
        </div>
        <div className="max-w-5xl mx-auto mb-12">
          {/* Featured Item Display */}
          <div className="bg-primary border border-secondary rounded-lg overflow-hidden shadow-xl mb-8">
            <div className="h-64 md:h-80 overflow-hidden">
              <img src={menuItems[activeItem].image} alt={menuItems[activeItem].name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-3">
                <h3 className="text-2xl font-medium text-light">
                  {menuItems[activeItem].name}
                </h3>
                <span className="text-secondary font-bold text-xl">
                  {menuItems[activeItem].price}
                </span>
              </div>
              <p className="text-light opacity-90">
                {menuItems[activeItem].description}
              </p>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {menuItems.map((item, index) => <button key={item.id} onClick={() => setActiveItem(index)} className={`relative rounded-lg overflow-hidden aspect-square shadow-md transition-all duration-200 will-change-transform ${activeItem === index ? 'ring-4 ring-accent scale-[1.02]' : 'hover:scale-[1.02] hover:shadow-lg'}`} aria-label={`View ${item.name}`} aria-current={activeItem === index}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary bg-opacity-40 flex items-end">
                  <div className="w-full p-2 bg-primary bg-opacity-80">
                    <p className="text-xs md:text-sm text-light truncate text-center">
                      {item.name}
                    </p>
                  </div>
                </div>
              </button>)}
          </div>
        </div>
        <div className="text-center">
          <Link to="/menu" className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors">
            Explore Full Menu
            <ArrowRightIcon size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>;
};