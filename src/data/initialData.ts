import { Category, Product, RestaurantSettings, CustomerReview, Order } from '../types';
import { products as CONFIG_PRODUCTS, categories as CONFIG_CATEGORIES } from '../../config/products.js';
import { settings as CONFIG_SETTINGS } from '../../config/settings.js';
import { contact as CONFIG_CONTACT } from '../../config/contact.js';

export const INITIAL_CATEGORIES: Category[] = CONFIG_CATEGORIES.map(c => ({
  id: c.id.startsWith('cat-') ? c.id : `cat-${c.id}`,
  name: c.name,
  slug: c.slug,
  image: c.image,
  description: c.description,
  active: c.active,
  displayOrder: c.displayOrder,
}));

export const INITIAL_PRODUCTS: Product[] = CONFIG_PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  description: p.description,
  categoryId: p.category.startsWith('cat-') ? p.category : `cat-${p.category}`,
  category: p.category,
  image: p.image,
  price: p.price,
  offerPrice: p.offerPrice && p.offerPrice > 0 ? p.offerPrice : undefined,
  discount: p.discount,
  available: p.available,
  featured: p.featured,
  displayOrder: p.displayOrder,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const INITIAL_SETTINGS: RestaurantSettings = {
  restaurantName: CONFIG_SETTINGS.restaurantName,
  tagline: CONFIG_SETTINGS.tagline,
  logoText: CONFIG_SETTINGS.logoText,
  phone: CONFIG_CONTACT.phone,
  whatsappNumber: CONFIG_CONTACT.whatsapp,
  address: CONFIG_CONTACT.address,
  openingHours: CONFIG_CONTACT.openingHours,
  currency: CONFIG_SETTINGS.currency,
  deliveryFee: CONFIG_SETTINGS.deliveryFee,
  freeDeliveryThreshold: CONFIG_SETTINGS.freeDeliveryThreshold,
  socialLinks: {
    facebook: CONFIG_CONTACT.facebook,
    instagram: CONFIG_CONTACT.instagram,
  },
  heroTitle: CONFIG_SETTINGS.heroTitle,
  heroDescription: CONFIG_SETTINGS.heroDescription,
  heroImage: CONFIG_SETTINGS.heroImage,
  ctaOrderText: CONFIG_SETTINGS.ctaOrderText,
  ctaMenuText: CONFIG_SETTINGS.ctaMenuText,
  aboutTitle: CONFIG_SETTINGS.aboutTitle,
  aboutDescription: CONFIG_SETTINGS.aboutDescription,
  aboutFeatures: CONFIG_SETTINGS.aboutFeatures,
  bannerPromoText: CONFIG_SETTINGS.bannerPromoText,
  bannerPromoEnabled: CONFIG_SETTINGS.bannerPromoEnabled,
  specialOfferBadge: CONFIG_SETTINGS.specialOfferBadge,
  specialOfferTitle: CONFIG_SETTINGS.specialOfferTitle,
  specialOfferDescription: CONFIG_SETTINGS.specialOfferDescription,
};

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Marcus Reynolds',
    rating: 5,
    review: 'The Crispy Family Bucket was genuinely the best fried chicken we have had in the city. The skin stayed perfectly crunchy on arrival, and the meat was succulent and well seasoned.',
    date: '2 days ago',
    verified: true,
    active: true,
  },
  {
    id: 'rev-2',
    customerName: 'Sophia Lin',
    rating: 5,
    review: 'Ordering through WhatsApp was extraordinarily convenient! I placed the order in seconds, received an immediate confirmation, and the Mango Passion juice was wonderfully refreshing.',
    date: '4 days ago',
    verified: true,
    active: true,
  },
  {
    id: 'rev-3',
    customerName: 'David K. Miller',
    rating: 5,
    review: 'Truffle loaded fries and chicken sliders are insane value. Hot, fast delivery and very professional food packaging. Food Expert is now our weekly office lunch staple.',
    date: '1 week ago',
    verified: true,
    active: true,
  },
  {
    id: 'rev-4',
    customerName: 'Elena Rostova',
    rating: 5,
    review: 'Unbeatable quality for the price. The bucket offers have generous portions and the sauces taste hand-crafted rather than industrial. Highly recommend!',
    date: '2 weeks ago',
    verified: true,
    active: true,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'FE-1001',
    items: [
      {
        productId: 'prod-bucket-1',
        name: 'Crispy Family Mega Bucket',
        price: 27.99,
        quantity: 1,
        image: '/images/products/bucket_crispy_feast.jpg',
      },
      {
        productId: 'prod-juice-1',
        name: 'Tropical Mango Passion Breeze',
        price: 4.99,
        quantity: 2,
        image: '/images/products/juice_fresh_tropical.jpg',
      },
    ],
    subtotal: 37.97,
    deliveryFee: 0,
    total: 37.97,
    customerName: 'Alexander Hayes',
    customerPhone: '+1 (555) 342-9981',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B',
    deliveryType: 'delivery',
    notes: 'Please buzz 4B. Extra garlic sauce if possible!',
    status: 'preparing',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'ord-1002',
    orderNumber: 'FE-1002',
    items: [
      {
        productId: 'prod-snack-1',
        name: 'Truffle & Herb Loaded Fries',
        price: 6.49,
        quantity: 1,
        image: '/images/products/snacks_loaded_bites.jpg',
      },
      {
        productId: 'prod-snack-2',
        name: 'Crispy Buttermilk Slider Trio',
        price: 9.99,
        quantity: 1,
        image: '/images/products/snacks_loaded_bites.jpg',
      },
    ],
    subtotal: 16.48,
    deliveryFee: 2.99,
    total: 19.47,
    customerName: 'Jessica Taylor',
    customerPhone: '+1 (555) 891-2304',
    deliveryAddress: 'Pick up at store counter',
    deliveryType: 'takeaway',
    notes: 'Will pick up in 20 minutes',
    status: 'delivered',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];
