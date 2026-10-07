import {
  Category,
  Product,
  RestaurantSettings,
  CustomerReview,
  Order,
  OrderStatus,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_SETTINGS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
} from '../data/initialData';

const STORAGE_KEYS = {
  CATEGORIES: 'fe_restaurant_categories_v1',
  PRODUCTS: 'fe_restaurant_products_v1',
  SETTINGS: 'fe_restaurant_settings_v1',
  REVIEWS: 'fe_restaurant_reviews_v1',
  ORDERS: 'fe_restaurant_orders_v1',
  AUTH: 'fe_restaurant_admin_auth_v1',
  PASSWORD_HASH: 'fe_restaurant_admin_pwd_hash_v1',
};

// Default password hash for initial admin setup ("admin123")
// Can be updated securely anytime from the Admin panel settings
const DEFAULT_PASSWORD_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

// Quick SHA-256 helper using browser Web Crypto API
export async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Event notification for reactive UI updates
const EVENT_NAME = 'food_expert_data_updated';

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

export function subscribeToDataChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

// --- CATEGORIES ---
export function getCategories(): Category[] {
  if (typeof window === 'undefined') return INITIAL_CATEGORIES;
  const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveCategory(category: Category): void {
  const categories = getCategories();
  const existingIdx = categories.findIndex(c => c.id === category.id);
  if (existingIdx >= 0) {
    categories[existingIdx] = category;
  } else {
    categories.push(category);
  }
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  notifyChange();
}

export function deleteCategory(id: string): void {
  const categories = getCategories().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  notifyChange();
}

// --- PRODUCTS ---
export function getProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function saveProduct(product: Product): void {
  const products = getProducts();
  const existingIdx = products.findIndex(p => p.id === product.id);
  const now = new Date().toISOString();
  
  if (existingIdx >= 0) {
    products[existingIdx] = {
      ...product,
      updatedAt: now,
    };
  } else {
    products.push({
      ...product,
      createdAt: now,
      updatedAt: now,
    });
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  notifyChange();
}

export function duplicateProduct(id: string): Product | null {
  const product = getProductById(id);
  if (!product) return null;
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    name: `${product.name} (Copy)`,
    slug: `${product.slug}-copy-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveProduct(newProduct);
  return newProduct;
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  notifyChange();
}

// --- SETTINGS ---
export function getSettings(): RestaurantSettings {
  if (typeof window === 'undefined') return INITIAL_SETTINGS;
  const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }
  try {
    return { ...INITIAL_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: RestaurantSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  notifyChange();
}

// --- REVIEWS ---
export function getReviews(): CustomerReview[] {
  if (typeof window === 'undefined') return INITIAL_REVIEWS;
  const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_REVIEWS;
  }
}

export function saveReview(review: CustomerReview): void {
  const reviews = getReviews();
  const existingIdx = reviews.findIndex(r => r.id === review.id);
  if (existingIdx >= 0) {
    reviews[existingIdx] = review;
  } else {
    reviews.unshift(review);
  }
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  notifyChange();
}

export function deleteReview(id: string): void {
  const reviews = getReviews().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  notifyChange();
}

// --- ORDERS ---
export function getOrders(): Order[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  notifyChange();
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders().map(o => (o.id === orderId ? { ...o, status } : o));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  notifyChange();
}

// --- AUTHENTICATION ---
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const session = sessionStorage.getItem(STORAGE_KEYS.AUTH);
  if (!session) return false;
  try {
    const data = JSON.parse(session);
    // Simple 24h validity check
    return Boolean(data.token && data.expiresAt > Date.now());
  } catch {
    return false;
  }
}

export async function adminLogin(password: string): Promise<{ success: boolean; error?: string }> {
  const inputHash = await sha256(password);
  const storedHash = localStorage.getItem(STORAGE_KEYS.PASSWORD_HASH) || DEFAULT_PASSWORD_HASH;

  if (inputHash === storedHash) {
    const token = `adm_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(
      STORAGE_KEYS.AUTH,
      JSON.stringify({
        token,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        loggedInAt: new Date().toISOString(),
      })
    );
    notifyChange();
    return { success: true };
  }

  return { success: false, error: 'Incorrect administrator password.' };
}

export function adminLogout(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    notifyChange();
  }
}

export async function changeAdminPassword(oldPass: string, newPass: string): Promise<{ success: boolean; error?: string }> {
  const oldHash = await sha256(oldPass);
  const storedHash = localStorage.getItem(STORAGE_KEYS.PASSWORD_HASH) || DEFAULT_PASSWORD_HASH;

  if (oldHash !== storedHash) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  if (newPass.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters.' };
  }

  const newHash = await sha256(newPass);
  localStorage.setItem(STORAGE_KEYS.PASSWORD_HASH, newHash);
  return { success: true };
}

// Reset all store data back to clean initial demo state
export function resetDataToDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  notifyChange();
}
