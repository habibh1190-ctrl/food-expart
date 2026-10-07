export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  category?: string;
  image: string;
  price: number;
  offerPrice?: number | null;
  discount?: number; // e.g. 20 for 20%
  available: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  active: boolean;
  displayOrder: number;
}

export interface RestaurantSettings {
  restaurantName: string;
  tagline: string;
  logoText: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  openingHours: string;
  currency: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  ctaOrderText: string;
  ctaMenuText: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutFeatures: string[];
  bannerPromoText: string;
  bannerPromoEnabled: boolean;
  specialOfferBadge: string;
  specialOfferTitle: string;
  specialOfferDescription: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  image?: string;
  date: string;
  verified: boolean;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
export type DeliveryType = 'delivery' | 'takeaway' | 'dinein';

export interface Order {
  id: string;
  orderNumber: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryType: DeliveryType;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}
