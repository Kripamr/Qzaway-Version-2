import { MenuItem } from '../types';

export const MOCK_MENU: Record<string, MenuItem[]> = {
  '1': [ // Artisan Crust
    { id: 'ac1', name: 'Margherita Basilico', price: 450, description: 'Fresh mozzarella, san marzano tomatoes, and organic basil.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Pizza' },
    { id: 'ac2', name: 'Truffle Mushroom', price: 650, description: 'Wild mushrooms, black truffle oil, and fontina cheese.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Pizza' },
    { id: 'ac3', name: 'Garlic Knots', price: 250, description: 'Soft bread knots tossed in garlic butter and herbs.', image: 'https://images.unsplash.com/photo-1595013595535-7713b17c76cb?auto=format&fit=crop&w=300&q=80', category: 'Sides' },
    { id: 'ac4', name: 'Tiramisu', price: 350, description: 'Classic Italian coffee-flavored dessert.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80', category: 'Dessert' },
    { id: 'ac5', name: 'Pesto Pasta', price: 550, description: 'Creamy basil pesto with sun-dried tomatoes.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=300&q=80', category: 'Pasta' },
    { id: 'ac6', name: 'Bruschetta', price: 280, description: 'Toasted bread with tomato, garlic and balsamic.', image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=300&q=80', category: 'Sides' },
  ],
  '2': [ // The Green Bowl
    { id: 'gb1', name: 'Quinoa Power Bowl', price: 420, description: 'Quinoa, roasted sweet potato, kale, and tahini dressing.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Salads' },
    { id: 'gb2', name: 'Mediterranean Mix', price: 380, description: 'Hummus, falafel, cucumber, and feta over greens.', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Salads' },
    { id: 'gb3', name: 'Green Smoothie', price: 220, description: 'Spinach, apple, ginger, and lemon.', image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=300&q=80', category: 'Drinks' },
  ],
  '5': [ // Miso Happy
    { id: 'mh1', name: 'Salmon Sashimi', price: 750, description: 'Fresh Atlantic salmon, sliced thin with wasabi.', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Sushi' },
    { id: 'mh2', name: 'Dragon Roll', price: 850, description: 'Shrimp tempura, eel, and avocado topping.', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Sushi' },
    { id: 'mh3', name: 'Miso Soup', price: 150, description: 'Traditional dashi broth with tofu and seaweed.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=300&q=80', category: 'Sides' },
  ],
  '4': [ // Stackhouse Burgers
    { id: 'sb1', name: 'The Truffle Beast', price: 850, description: 'Aged wagyu beef, black truffle aioli, and wild mushrooms.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Burgers' },
    { id: 'sb2', name: 'Spicy Nashville', price: 550, description: 'Crispy buttermilk chicken, hot honey, and purple slaw.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Burgers' },
    { id: 'sb3', name: 'Sea Salt Fries', price: 180, description: 'Hand-cut russet potatoes, twice fried for crunch.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80', category: 'Sides' },
    { id: 'sb4', name: 'Panko Onion Rings', price: 220, description: 'Sweet yellow onions, hand-breaded in Japanese panko.', image: 'https://images.unsplash.com/photo-1639024471283-035188801981?auto=format&fit=crop&w=300&q=80', category: 'Sides' },
    { id: 'sb5', name: 'House Lemonade', price: 120, description: 'Freshly squeezed with organic agave.', image: 'https://images.unsplash.com/photo-1523371054106-bbf80586c38c?auto=format&fit=crop&w=300&q=80', category: 'Drinks' },
  ],
  '6': [ // Taco Fiesta
    { id: 'tf1', name: 'Al Pastor Tacos', price: 380, description: 'Marinated pork with pineapple and fresh cilantro.', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Tacos' },
    { id: 'tf2', name: 'Fresh Guacamole', price: 250, description: 'Hand-mashed avocado with lime and sea salt.', image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?auto=format&fit=crop&w=300&q=80', isSignature: true, category: 'Sides' },
    { id: 'tf3', name: 'Churros', price: 180, description: 'Fried dough pastry with cinnamon sugar.', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=300&q=80', category: 'Dessert' },
  ]
};

export const fetchMenuByRestaurantId = async (id: string): Promise<MenuItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_MENU[id] || [];
};
