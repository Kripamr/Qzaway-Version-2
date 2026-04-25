import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, Restaurant, CartItem, MenuItem } from './types';
import { fetchMenuByRestaurantId, MOCK_MENU } from './services/menuService';
import qzawayLogo from './assets/images/logo2.png';

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img src={qzawayLogo} alt="QzAway Logo" className="w-full h-full object-contain" />
    </div>
  );
};

const TopAppBar = ({ 
  title, 
  onBack, 
  showProfile = true,
  cartCount = 0,
  totalQuantityAllItems,
  onCartClick,
  onProfileClick
}: { 
  title?: string; 
  onBack?: () => void; 
  showProfile?: boolean;
  cartCount?: number;
  totalQuantityAllItems: number;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}) => (
  <nav className="fixed top-0 w-full max-w-md z-50 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 py-4">
    <div className="flex items-center gap-3">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low text-primary hover:opacity-80 transition-opacity active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}
      {!onBack && (
        <Logo className="w-10 h-10" />
      )}
      <span className="text-2xl font-black text-on-surface italic tracking-tight font-headline">
        {title || 'QzAway'}
      </span>
    </div>
    <div className="flex items-center gap-3">
      <button 
        onClick={onCartClick}
        className="relative text-primary material-symbols-outlined hover:opacity-80 transition-opacity active:scale-95"
      >
        shopping_cart
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
            {totalQuantityAllItems}
          </span>
        )}
      </button>
      {showProfile && (
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary/10 active:scale-95 transition-transform"
        >
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPoxqbfsHQlt6qogCtp2WS6bNlvEiSNpHagPuiCq7i-T-ajSUD-rscbK6hOoHe66G9N9-XfNsCs-iI3Rgj_X-fh6mEBjYf1x7i-oMkI4BQHJic60TF__a2qeay0-_lkQktSFtviiONO_4fbukoGG_9Atcy36ZHS6z5JXIyK-RjOjbjZwVOoemG-lCZci9zpOlTEGat18jdNmsvVwP5cnCcdX5utPAHNG-2dbIHTbKcXe_eo-Ns3TnqsjH5wpKWUed8VdFLo7RoAa4" 
            alt="Profile" 
            referrerPolicy="no-referrer"
          />
        </button>
      )}
    </div>
  </nav>
);

const BottomNavBar = ({ 
  activeScreen, 
  onNavigate 
}: { 
  activeScreen: Screen; 
  onNavigate: (s: Screen, dir?: number) => void 
}) => {
  const tabs = [
    { id: 'mall-selection', icon: 'home', label: 'Home' },
    { id: 'restaurant-directory', icon: 'search', label: 'Search' },
    { id: 'order-tracking', icon: 'receipt_long', label: 'Orders' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md z-50 flex justify-around items-end pb-6 px-8 bg-surface/80 backdrop-blur-xl rounded-t-[32px] shadow-[0_-4px_32px_rgba(27,28,27,0.06)]">
      {tabs.map((tab) => {
        const isActive = activeScreen === tab.id || (tab.id === 'restaurant-directory' && activeScreen === 'restaurant-menu');
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id as Screen, 0)}
            className={`flex flex-col items-center justify-center p-2 transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-br from-secondary to-primary text-white rounded-full p-3 mb-2 scale-110 -translate-y-2 shadow-lg' 
                : 'text-on-surface-variant hover:text-primary active:scale-90'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>
              {tab.icon}
            </span>
            {!isActive && (
              <span className="font-label text-[10px] font-semibold tracking-wide uppercase mt-1">
                {tab.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

// --- Screens ---

const MallSelection = ({ onConfirm }: { onConfirm: () => void }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-center p-6 pb-40 overflow-hidden">
    <div 
      className="absolute inset-0 blur-[4px] scale-105 z-0" 
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(27, 28, 27, 0.4), rgba(27, 28, 27, 0.8)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuBtZ8cM4klqgaJxlgUVIeDYp5mlVhMr4-VJaxlexQd4QB28NFyNXKnt0xUGMumNaKS95OXe86LZCPxBp0CY-vMR8b-dli97uHkOnrjYCGTYWAiUSa4LJIq5Z3Hq3K4id-MwIFCcMv0ecmQM1YYQ-RhGbN10Ul0wbREVyaAJv4hZUtEtdf3MGWjaeqGsIwL_SLEBr32wInNrAYxKreEtxvVzBqB_svDUqvdWNgGRMYBqyKF8Bs31m_Rrf7Pp7xt8FUWXKlc3diJxMOU)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
    <main className="relative z-10 w-full max-w-md flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="font-headline font-black text-5xl tracking-tighter text-white drop-shadow-lg italic">
          QzAway
        </h1>
        <p className="font-label text-white/90 text-xs mt-3 tracking-[0.2em] uppercase font-bold bg-secondary/30 backdrop-blur-md px-4 py-1.5 rounded-full inline-block">
          Skip the Queue Forever
        </p>
      </header>

      <section className="w-full bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.25)] flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
          <Logo className="w-32 h-32" />
        </div>

        <div className="space-y-3 mb-8">
          <h2 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight">
            Phoenix Marketcity
          </h2>
          <p className="font-body text-on-surface-variant text-sm leading-relaxed px-4">
            Ready to <span className="font-bold text-primary">skip the line</span>? We've detected you're at the main atrium.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low px-5 py-2.5 rounded-full mb-8">
          <span className="w-2.5 h-2.5 bg-secondary rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
            Live Location Sync
          </span>
        </div>

        <button 
          onClick={onConfirm}
          className="w-full bg-gradient-to-r from-secondary to-primary text-white font-headline font-extrabold py-5 rounded-2xl shadow-[0_16px_32px_rgba(249,115,22,0.3)] hover:scale-[0.98] active:scale-95 transition-all duration-200 flex flex-col items-center gap-1 group"
        >
          <div className="flex items-center gap-3">
            Confirm & Start Ordering
            <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
          <span className="text-[10px] opacity-80 font-medium uppercase tracking-widest">Average wait time: 0 mins</span>
        </button>

        <button className="mt-8 text-on-surface-variant font-body text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">search</span>
          Not here? Select mall manually
        </button>
      </section>

      <footer className="mt-10 flex flex-col items-center gap-4">
        <div className="flex -space-x-4">
          {[1, 2, 3].map(i => (
            <img 
              key={i}
              className="w-11 h-11 rounded-full border-2 border-white object-cover shadow-sm" 
              src={`https://picsum.photos/seed/user${i}/100/100`} 
              alt="user"
              referrerPolicy="no-referrer"
            />
          ))}
          <div className="w-11 h-11 rounded-full border-2 border-white bg-tertiary-container flex items-center justify-center text-[10px] font-bold text-on-tertiary-container shadow-sm">
            +2k
          </div>
        </div>
        <p className="text-white font-medium tracking-wide text-sm bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full">
          2,400+ foodies are skipping queues right now
        </p>
      </footer>
    </main>
  </div>
);

const RestaurantDirectory = ({ onSelect }: { onSelect: (r: Restaurant) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPureVeg, setIsPureVeg] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  const restaurants: Restaurant[] = [
    { id: '1', name: 'Artisan Crust', cuisine: 'Italian', priceRange: '$$', rating: 4.8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj2ataBEgMk58waRq59ijtSTW_K9gsfqUNDRmmLlh1uLGM2_q5at_6uXSZ-D5oWpSK0JJSrXyPSjHVzRQLQ6H2PAn26k5cDvkR8cn0WvAR5F9DBOxDavWHDQjiJ-UrPZOCygxIISIDwPafT6CryuFXmO7K5HgQA73A_33iEXtLXL4vmZSbxL0S-wpw5DMISDQ6WAcO7xIIRIz-vvJqCmCWSmpQRmy1CIYc4Ce4yFf4naZsdbwRgMzGxecJBxonVmFRy6qtgq9jmXU', isOpen: true, isPureVeg: false, popularItems: ['Pizza', 'Pasta', 'Lasagna'] },
    { id: '2', name: 'The Green Bowl', cuisine: 'Salads', priceRange: '$', rating: 4.5, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY4NMnPw6tXERcBF9TF1YzYn8bU-Ife66MpTp0Cz3Q7ZPC88EZDrCQqCqotCna4ne599bfgsF398Q3R7F6IL4d-u6RbJiu-zgiv3GDYzvrCAbz-hIUnq8EUTHgeR9XAgMEkkZegKYkfhCWoGr7WAnDQYAg3Gb0ejAUXqSJydwj3d91_gAXrGPCQ3cvH9rSuVnedpmMm228cPznjpJ2HLnUDQXKklIfLZURGng5JR7DE9KE5T5BPgSAPxcAwgz5dNcOCOJYqVPYuWE', isOpen: true, isPureVeg: true, popularItems: ['Caesar Salad', 'Quinoa Bowl', 'Smoothie'] },
    { id: '3', name: 'Spice Route', cuisine: 'Indian', priceRange: '$$$', rating: 4.9, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK3zI67eLvVDJc-RcOOI7UGqXcDXmaHahhJIvx-QShqu_gvfUhmpYpvRTKiA_BxOjyRdWiamGbxGD7isfMAcnVmCFkerm5zoeLBc8WAu8HK56YBAu0frxLN8QxP3NZEgLzRhB1C_gcaWf1ywsO3q0VPTa9hS_IM66qrdZ6RxuPx4gy6xRFTx69ticUFWiKYk5P5IgPBB4aNL8s4CN3kHpWD4TVW9jkh7t8XU_XYZUkTcdbcSzf2yLG-1Hi2KgsDCePpww_PqFooXM', isOpen: false, isPureVeg: true, popularItems: ['Butter Chicken', 'Naan', 'Biryani'] },
    { id: '4', name: 'Stackhouse Burgers', cuisine: 'Burgers', priceRange: '$$', rating: 4.2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgvw2H-iov5JZ7aK2yMMb0B7epW3Opiq8WpFAyLDI_x_cVrXpXzqZ3tqAwhm-a3s2mX8mCKnkSP-Av7EHgpgbiIkGfdza4gcXrX9mFZu3wF1SH0c7oZI5xtMUOCOix80bg4IzRX_mdJdkaYYoC4QEo-xP49i9JLibMapfE1H7pihXDaVAt_eg9KsTdWLYgEpxA8H88PtIh8hNSGg8ecm-_X4nf9y7N1r_qNq-rt25cyFglRACEu7qc6qAnbiGbbh-yNijVv8JrPHY', isOpen: true, isPureVeg: false, popularItems: ['Cheeseburger', 'Fries', 'Milkshake'] },
    { id: '5', name: 'Miso Happy', cuisine: 'Japanese', priceRange: '$$$', rating: 4.7, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsv2RqKFdQKfoV-DKwbVbQ9-__Rzqi1z9HcqmGwmZz18kVoL-hLmGBAa2-A4sZLN0U9l7B-oUAi2__tjE2lmibBnlWk77KkOyD7vQsbKKA0QkERh-DMzZFm9PDC9UcXWG8Rxcn_qLUP-pIp-Dh1Db671JrHCrThblR3MCOiWSquO9qjiWAEd1saZRmdsuwJyhTmaXDdhkPIhxUrK6HeFWP1vwirOaqCjNqjFbVv9S2nk9T7XFR7O43lGLLGNL1VjMc-YuSvc_qfQg', isOpen: true, isPureVeg: false, popularItems: ['Sushi', 'Ramen', 'Tempura'] },
    { id: '6', name: 'Taco Fiesta', cuisine: 'Mexican', priceRange: '$', rating: 4.4, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3PL1zBa7Selt7hny2DjlgPnSkgGw9JuB7nx2sJDuYsBC_JKudlmJzYz9GZEnq4AcxWCEhK7ptID5hrxRb234CCj9eX9RHywiDlMdn1sH6Vl4fcbepaULBWxg_rXEIicESxF9STVFZZXMq_-9eV3Hwx0dHyXzReFsxphsKyrJA3ZEh296w5U-4IXoLdZ4dk1tsThCZctKuKTO_DtGKfzrPPYm3cdnHOywfRE9kDXQWsffw_XTSDBEQP0q_zHHCzGIVO2_cwZEHed4', isOpen: true, isPureVeg: false, popularItems: ['Tacos', 'Burrito', 'Nachos'] },
  ];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const query = searchQuery.toLowerCase();
      
      // Check restaurant name and cuisine
      const matchesRestaurant = r.name.toLowerCase().includes(query) || 
                               r.cuisine.toLowerCase().includes(query);
      
      // Check popular items (quick search)
      const matchesPopular = r.popularItems?.some(item => item.toLowerCase().includes(query));
      
      // Check ALL menu items for this restaurant
      const restaurantMenu = MOCK_MENU[r.id] || [];
      const matchesMenu = restaurantMenu.some(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );

      const matchesSearch = matchesRestaurant || matchesPopular || matchesMenu;
      const matchesVeg = !isPureVeg || r.isPureVeg;
      const matchesOpen = !isOpenNow || r.isOpen;
      
      return matchesSearch && matchesVeg && matchesOpen;
    });
  }, [searchQuery, isPureVeg, isOpenNow]);

  return (
    <div className="pt-24 pb-48 px-6 max-w-screen-xl mx-auto">
      <section className="mb-8">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">The Seamless Table</h2>
            <p className="text-on-surface-variant body-md">Skip the queue. Explore the best flavors near you.</p>
          </div>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline" 
              placeholder="Search for food or restaurants..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            <button 
              onClick={() => {
                setIsPureVeg(false);
                setIsOpenNow(false);
                setSearchQuery('');
              }}
              className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all ${
                !isPureVeg && !isOpenNow && searchQuery === '' 
                ? 'bg-gradient-to-br from-secondary to-primary text-white shadow-md' 
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              All Restaurants
            </button>
            <button 
              onClick={() => setIsPureVeg(!isPureVeg)}
              className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all ${
                isPureVeg 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isPureVeg ? 'text-white' : 'text-secondary'} fill-1`}>eco</span>
              Pure Veg
            </button>
            <button 
              onClick={() => setIsOpenNow(!isOpenNow)}
              className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all ${
                isOpenNow 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              Open Now
            </button>
          </div>
        </div>
      </section>

      <section>
        {filteredRestaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">search_off</span>
            <h3 className="text-xl font-bold text-on-surface">No results found</h3>
            <p className="text-on-surface-variant mt-2">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredRestaurants.map((r) => (
              <div 
                key={r.id}
                onClick={() => onSelect(r)}
                className="group bg-surface-container-lowest rounded-[24px] overflow-hidden transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={r.image} 
                    alt={r.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[14px] fill-1">star</span>
                    <span className="text-[12px] font-bold text-on-surface">{r.rating}</span>
                  </div>
                  {r.isPureVeg && (
                    <div className="absolute top-3 right-3 bg-secondary/90 backdrop-blur p-1 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-white text-[14px] fill-1">eco</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-on-surface truncate tracking-tight">{r.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-on-surface-variant font-medium">{r.cuisine} • {r.priceRange}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      r.isOpen ? 'bg-secondary/10 text-secondary' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {r.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const RestaurantMenu = ({ 
  restaurant, 
  onAddToCart, 
  onUpdateQuantity,
  cartItems,
  cartTotal,
  totalQuantityAllItems,
  onViewCart 
}: { 
  restaurant: Restaurant; 
  onAddToCart: (item: any) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  cartItems: CartItem[];
  cartTotal: number;
  totalQuantityAllItems: number;
  onViewCart: () => void;
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      const data = await fetchMenuByRestaurantId(restaurant.id);
      setMenuItems(data);
      setLoading(false);
    };
    loadMenu();
  }, [restaurant.id]);

  const getItemQuantity = (id: string) => {
    return cartItems.find(i => i.id === id)?.quantity || 0;
  };

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    return items;
  }, [menuItems, selectedCategory, searchQuery]);

  const signatureItems = filteredItems.filter(item => item.isSignature);
  const otherItems = filteredItems.filter(item => !item.isSignature);

  const QuantitySelector = ({ id, item }: { id: string, item: any }) => {
    const qty = getItemQuantity(id);
    if (qty === 0) {
      return (
        <button 
          onClick={() => onAddToCart({ ...item, restaurant: restaurant.name })}
          className="bg-white text-primary border border-primary/20 px-4 py-1.5 rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-transform flex items-center gap-1"
        >
          ADD
        </button>
      );
    }
    return (
      <div className="flex items-center bg-white border border-primary/20 rounded-xl px-1 py-1 gap-3 shadow-lg">
        <button 
          onClick={() => onUpdateQuantity(id, -1)}
          className="w-6 h-6 flex items-center justify-center text-primary active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">remove</span>
        </button>
        <span className="text-xs font-bold w-4 text-center text-primary">{qty}</span>
        <button 
          onClick={() => onUpdateQuantity(id, 1)}
          className="w-6 h-6 flex items-center justify-center text-primary active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">add</span>
        </button>
      </div>
    );
  };

  const SignatureQuantitySelector = ({ id, item }: { id: string, item: any }) => {
    const qty = getItemQuantity(id);
    if (qty === 0) {
      return (
        <button 
          onClick={() => onAddToCart({ ...item, restaurant: restaurant.name })}
          className="mt-3 w-full bg-primary text-on-primary py-2 rounded-xl font-bold text-xs active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          Add to Cart
        </button>
      );
    }
    return (
      <div className="mt-3 w-full flex items-center justify-between bg-primary/5 rounded-xl p-1 border border-primary/10">
        <button 
          onClick={() => onUpdateQuantity(id, -1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-primary active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">remove</span>
        </button>
        <span className="text-base font-black text-primary">{qty}</span>
        <button 
          onClick={() => onUpdateQuantity(id, 1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-primary active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">add</span>
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-on-surface-variant font-medium">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-64 px-6 max-w-5xl mx-auto">
      <section className="mb-10 relative flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="font-headline font-black text-5xl text-on-surface tracking-tight leading-tight">{restaurant.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-medium text-sm">
            <div className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm fill-1">star</span>
              <span className="font-bold">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">schedule</span>
              <span>25-35 mins</span>
            </div>
          </div>
        </div>
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
          <img 
            className="w-full h-full object-cover" 
            src={restaurant.image} 
            alt={restaurant.name}
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="mb-10 flex flex-col gap-4 sticky top-[80px] z-40 bg-surface/90 backdrop-blur-md py-4">
        <div className="relative group mb-2">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline text-sm" 
            placeholder={`Search in ${restaurant.name}...`} 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 hide-scrollbar overflow-x-auto pb-1">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All' 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            All Menu
          </button>
          {Array.from(new Set(menuItems.map(i => i.category))).map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-12">
        {signatureItems.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-8 border-l-4 border-secondary pl-4">
              <h2 className="font-headline font-black text-3xl">Signature Items</h2>
              <span className="text-on-surface-variant font-bold text-xs uppercase tracking-tighter bg-surface-container px-3 py-1 rounded-full">{signatureItems.length} Items</span>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {signatureItems.map(item => (
                <div key={item.id} className="group bg-surface-container-lowest p-4 rounded-3xl flex flex-col sm:flex-row gap-5 hover:shadow-xl transition-all duration-300 border border-surface-container">
                  <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-surface-container">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={item.image} 
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h3 className="font-headline font-extrabold text-lg leading-tight">{item.name}</h3>
                        <span className="text-primary font-black whitespace-nowrap">₹{item.price}</span>
                      </div>
                      <p className="text-on-surface-variant text-sm line-clamp-2 leading-snug">{item.description}</p>
                    </div>
                    <SignatureQuantitySelector id={item.id} item={item} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {otherItems.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-8 border-l-4 border-outline pl-4">
              <h2 className="font-headline font-black text-3xl">All Items</h2>
              <span className="text-on-surface-variant font-bold text-xs uppercase tracking-tighter bg-surface-container px-3 py-1 rounded-full">{otherItems.length} Items</span>
            </div>
            <div className="space-y-6">
              {otherItems.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-2 border-b border-surface-container pb-6 last:border-0">
                  <div className="flex-1">
                    <h3 className="font-bold text-on-surface text-lg">{item.name}</h3>
                    <p className="text-primary font-black text-sm mt-1">₹{item.price}</p>
                    <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface-container">
                      <img 
                        className="w-full h-full object-cover" 
                        src={item.image} 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <QuantitySelector id={item.id} item={item} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
          <button 
            onClick={onViewCart}
            className="w-full bg-gradient-to-r from-secondary to-primary p-4 rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div className="text-left">
                <p className="font-black text-sm leading-none">{totalQuantityAllItems} Items</p>
                <p className="text-xs font-medium opacity-90">View your cart</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="font-black text-2xl">₹{cartTotal}</span>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

const Cart = ({ 
  items, 
  onUpdateQuantity,
  onRemoveItem,
  onConfirm 
}: { 
  items: CartItem[]; 
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onConfirm: () => void 
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const platformFee = 25;
  const total = subtotal + platformFee;

  const groupedItems = useMemo(() => {
    const groups: Record<string, CartItem[]> = {};
    items.forEach(item => {
      if (!groups[item.restaurant]) groups[item.restaurant] = [];
      groups[item.restaurant].push(item);
    });
    return groups;
  }, [items]);

  return (
    <main className="pt-24 pb-36 px-6 max-w-2xl mx-auto">
      <div className="bg-primary/5 p-4 rounded-2xl mb-8 flex items-center gap-4 border border-primary/10">
        <span className="material-symbols-outlined text-primary fill-1">info</span>
        <p className="text-on-surface-variant font-medium text-sm">Bundle confirmed: Skipping multiple queues.</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart</span>
          <p className="text-on-surface-variant font-bold">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedItems).map(([restaurantName, items]) => {
            const restaurantItems = items as CartItem[];
            return (
              <section key={restaurantName}>
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-cover" src={restaurantItems[0].image} alt={restaurantName} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-lg leading-tight">{restaurantName}</h2>
                    <span className="text-xs text-primary font-bold">Pick up in 15-20 mins</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {restaurantItems.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-3xl flex gap-5 shadow-[0_2px_12px_rgba(27,28,27,0.04)]">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" src={item.image} alt={item.name} referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-on-surface leading-tight">{item.name}</h3>
                          <div className="flex flex-col items-end">
                            <span className="text-on-surface font-extrabold">₹{item.price}</span>
                            <button 
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[10px] text-error font-bold uppercase mt-1 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-on-surface-variant font-medium">{item.customization || 'Standard'}</span>
                          <div className="flex items-center bg-surface-container/50 rounded-full px-1.5 py-1 gap-4">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-primary active:scale-90 transition-transform"
                            >
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-primary active:scale-90 transition-transform"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="mt-12 bg-surface-container/40 p-8 rounded-[2.5rem] border border-surface-container">
            <h3 className="font-headline font-bold text-xl mb-6">Checkout Details</h3>
            <div className="space-y-4 border-b border-outline/10 pb-6 mb-6">
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Items Total</span>
                <span className="text-on-surface">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">Queue Skip (Priority)</span>
                <span className="text-primary font-bold px-3 py-1 bg-primary/10 rounded-full text-xs">FREE BUNDLE</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Platform Fee</span>
                <span className="text-on-surface">₹{platformFee}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-10">
              <span className="font-headline font-bold text-xl">Total Payable</span>
              <span className="font-headline font-black text-3xl text-primary">₹{total}</span>
            </div>
            <button 
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-secondary to-primary text-white font-extrabold py-5 px-8 rounded-full shadow-[0_16px_32px_rgba(249,115,22,0.25)] flex items-center justify-center gap-3 active:scale-95 transition-all duration-200"
            >
              <span className="text-lg">Confirm & Skip Queue</span>
              <span className="material-symbols-outlined">bolt</span>
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

const OrderTracking = ({ liveOrders, pastOrders }: { liveOrders: CartItem[][], pastOrders: CartItem[][] }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'past'>('live');
  
  const ordersToDisplay = activeTab === 'live' ? liveOrders : pastOrders;

  return (
    <main className="pt-24 pb-48 px-6 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Orders</h1>
        <p className="text-on-surface-variant body-md">Track your progress and view history.</p>
      </div>

      <div className="flex gap-2 mb-8 bg-surface-container-low p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('live')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'live' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container'}`}
        >
          Live Orders
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'past' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container'}`}
        >
          Past Orders
        </button>
      </div>

      {ordersToDisplay.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-[32px] p-12 text-center border border-dashed border-outline/30">
          <span className="material-symbols-outlined text-6xl text-outline/50 mb-4">receipt_long</span>
          <p className="text-on-surface-variant font-bold text-lg">No {activeTab} orders</p>
          <p className="text-on-surface-variant/60 text-sm mt-1">Your {activeTab} orders will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-12">
          {ordersToDisplay.map((orderItems, orderIdx) => {
            const groupedOrders: Record<string, CartItem[]> = {};
            orderItems.forEach(item => {
              if (!groupedOrders[item.restaurant]) groupedOrders[item.restaurant] = [];
              groupedOrders[item.restaurant].push(item);
            });

            return (
              <div key={orderIdx} className="space-y-4">
                {Object.entries(groupedOrders).map(([restaurantName, items]) => {
                  const restaurantItems = items as CartItem[];
                  return (
                    <div key={restaurantName} className="bg-surface-container-lowest rounded-[24px] overflow-hidden flex flex-col border border-surface-container shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-on-surface tracking-tight">{restaurantName}</h3>
                            <div className="flex items-center gap-2 mt-1 bg-primary/5 px-2 py-1 rounded-lg w-fit">
                              <span className="material-symbols-outlined text-primary text-xs animate-pulse">schedule</span>
                              <span className="text-primary text-[10px] font-black uppercase tracking-wider">
                                {activeTab === 'live' ? 'Prepping: 12 mins' : 'Completed'}
                              </span>
                            </div>
                          </div>
                          <div className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase">
                            #QA-{Math.floor(1000 + Math.random() * 9000)}
                          </div>
                        </div>

                        <div className="relative pt-2 pb-6 px-2">
                          <div className="flex justify-between mb-2 relative z-10">
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-lg ${activeTab === 'live' || true ? 'bg-primary text-white shadow-primary/20' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                                <span className="material-symbols-outlined text-base fill-1">check</span>
                              </div>
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${activeTab === 'live' || true ? 'text-primary' : 'text-on-surface-variant'}`}>Confirmed</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-lg ${activeTab === 'live' || true ? 'bg-primary text-white shadow-primary/20' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                                <span className="material-symbols-outlined text-base fill-1">restaurant</span>
                              </div>
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${activeTab === 'live' || true ? 'text-primary' : 'text-on-surface-variant'}`}>Preparing</span>
                            </div>
                            <div className={`flex flex-col items-center ${activeTab === 'live' ? 'opacity-30' : ''}`}>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-lg ${activeTab === 'past' ? 'bg-primary text-white shadow-primary/20' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                                <span className="material-symbols-outlined text-base">shopping_bag</span>
                              </div>
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${activeTab === 'past' ? 'text-primary' : 'text-on-surface-variant'}`}>Ready</span>
                            </div>
                          </div>
                          <div className="absolute top-7 left-0 w-full h-1 bg-surface-container rounded-full overflow-hidden">
                            <div className={`h-full bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.4)] ${activeTab === 'live' ? 'w-[65%]' : 'w-full'}`}></div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-surface-container flex items-center justify-between">
                          <div className="flex -space-x-1.5">
                            {restaurantItems.slice(0, 3).map((item, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            ))}
                            {restaurantItems.length > 3 && (
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                                +{restaurantItems.length - 3}
                              </div>
                            )}
                          </div>
                          <p className="text-xs font-bold text-on-surface-variant">
                            {restaurantItems.reduce((sum, i) => sum + i.quantity, 0)} items • ₹{restaurantItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      <section className="mt-16 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Mall Promotions</h2>
            <p className="text-on-surface-variant body-md mt-2">Exclusive perks from our partners while you wait.</p>
          </div>
          <button className="text-primary font-bold text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">View All</button>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 gap-4 h-[450px]">
          <div className="col-span-6 md:col-span-4 row-span-2 relative rounded-[40px] overflow-hidden group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" 
              alt="Fashion"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent p-10 flex flex-col justify-end">
              <span className="inline-block bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-4 self-start">Fashion Week</span>
              <h3 className="text-white text-4xl font-extrabold tracking-tighter mb-2">40% OFF at Velour</h3>
              <p className="text-white/80 max-w-sm">Present your QzAway order at the counter for an exclusive discount today.</p>
              <div className="mt-6">
                <button className="bg-white text-on-surface px-8 py-3 rounded-full font-bold hover:bg-primary-container hover:text-white transition-colors">Claim Offer</button>
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-2 row-span-1 relative rounded-[40px] overflow-hidden group">
            <img 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80" 
              alt="Cinema"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end backdrop-blur-[1px]">
              <h4 className="text-white font-bold text-lg leading-tight">Free Popcorn<br/>at CineLux</h4>
            </div>
          </div>
          <div className="col-span-3 md:col-span-2 row-span-1 relative rounded-[40px] overflow-hidden group bg-surface-container-high">
            <div className="p-6 h-full flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary text-4xl">local_parking</span>
              <div>
                <h4 className="text-on-surface font-bold text-lg leading-tight">Validate Parking</h4>
                <p className="text-on-surface-variant text-sm mt-1">2 Hours Free Credit</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Profile = () => (
  <main className="pt-24 pb-48 px-6 max-w-screen-xl mx-auto">
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Profile</h1>
      <p className="text-on-surface-variant body-md">Manage your account and preferences.</p>
    </div>
    <div className="bg-surface-container-lowest rounded-[32px] p-8 border border-surface-container shadow-sm">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-surface-container-highest overflow-hidden border-4 border-primary/10">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPoxqbfsHQlt6qogCtp2WS6bNlvEiSNpHagPuiCq7i-T-ajSUD-rscbK6hOoHe66G9N9-XfNsCs-iI3Rgj_X-fh6mEBjYf1x7i-oMkI4BQHJic60TF__a2qeay0-_lkQktSFtviiONO_4fbukoGG_9Atcy36ZHS6z5JXIyK-RjOjbjZwVOoemG-lCZci9zpOlTEGat18jdNmsvVwP5cnCcdX5utPAHNG-2dbIHTbKcXe_eo-Ns3TnqsjH5wpKWUed8VdFLo7RoAa4" 
            alt="Profile" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Alex Johnson</h2>
          <p className="text-on-surface-variant">alex.j@example.com</p>
        </div>
      </div>
      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">settings</span>
            <span className="font-bold text-on-surface">Settings</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">payment</span>
            <span className="font-bold text-on-surface">Payment Methods</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-error">logout</span>
            <span className="font-bold text-error">Logout</span>
          </div>
        </button>
      </div>
    </div>
  </main>
);

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('mall-selection');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<CartItem[][]>([]);
  const [direction, setDirection] = useState(1);

  const totalQuantityAllItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const navigate = (screen: Screen, dir: number = 1) => {
    setDirection(dir);
    setCurrentScreen(screen);
  };

  const addToCart = (item: any) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const confirmOrder = () => {
    if (cartItems.length > 0) {
      setOrders(prev => [[...cartItems], ...prev]);
      setCartItems([]);
      navigate('order-tracking');
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction >= 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction >= 0 ? '-100%' : '100%',
      opacity: 0,
    })
  };

  const slideUpVariants = {
    enter: { y: '100%', opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 }
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-surface flex justify-center">
      <div className="w-full max-w-md bg-surface min-h-screen relative shadow-2xl shadow-on-surface/5">
        <AnimatePresence mode="wait" custom={direction}>
          {currentScreen !== 'mall-selection' && (
            <TopAppBar 
              title={
                currentScreen === 'restaurant-menu' ? '' : 
                currentScreen === 'cart' ? 'Cart' : 
                currentScreen === 'order-tracking' ? 'Orders' : 
                currentScreen === 'profile' ? 'Profile' :
                undefined
              }
              onBack={
                currentScreen === 'restaurant-menu' ? () => navigate('restaurant-directory', -1) : 
                currentScreen === 'cart' ? () => navigate('restaurant-menu', -1) :
                currentScreen === 'profile' ? () => navigate('mall-selection', -1) :
                undefined
              }
              cartCount={cartItems.length}
              totalQuantityAllItems={totalQuantityAllItems}
              onCartClick={() => navigate('cart')}
              onProfileClick={() => navigate('profile')}
            />
          )}
        </AnimatePresence>

        <div className="relative overflow-hidden min-h-screen">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentScreen}
              custom={direction}
              variants={currentScreen === 'cart' ? slideUpVariants : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="w-full"
            >
              {currentScreen === 'mall-selection' && (
                <MallSelection onConfirm={() => navigate('restaurant-directory')} />
              )}
              {currentScreen === 'restaurant-directory' && (
                <RestaurantDirectory onSelect={(r) => {
                  setSelectedRestaurant(r);
                  navigate('restaurant-menu');
                }} />
              )}
              {currentScreen === 'restaurant-menu' && selectedRestaurant && (
                <RestaurantMenu 
                  restaurant={selectedRestaurant} 
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateQuantity}
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                  totalQuantityAllItems={totalQuantityAllItems}
                  onViewCart={() => navigate('cart')}
                />
              )}
              {currentScreen === 'cart' && (
                <Cart 
                  items={cartItems} 
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onConfirm={confirmOrder} 
                />
              )}
              {currentScreen === 'order-tracking' && (
                <OrderTracking liveOrders={orders} pastOrders={[]} />
              )}
              {currentScreen === 'profile' && (
                <Profile />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {currentScreen !== 'mall-selection' && (
            <BottomNavBar 
              activeScreen={currentScreen} 
              onNavigate={(s) => navigate(s, 0)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
