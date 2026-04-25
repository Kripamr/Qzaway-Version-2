export type Screen = 
  | 'mall-selection' 
  | 'restaurant-directory' 
  | 'restaurant-menu' 
  | 'cart' 
  | 'order-tracking'
  | 'profile';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  restaurant: string;
  image: string;
  quantity: number;
  customization?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isSignature?: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  image: string;
  isOpen: boolean;
  isPureVeg?: boolean;
  popularItems?: string[];
  waitTime?: string;
  distance?: string;
}
