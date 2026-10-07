import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, DeliveryType } from '../types';
import { getSettings, saveOrder } from '../services/dataService';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  quickOrder: (product: Product) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  submitOrder: (formData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    deliveryType: DeliveryType;
    notes?: string;
  }) => Order;
  generateWhatsAppLink: (order: Order) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'fe_cart_items_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage error fallback
    }
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const activePrice = item.product.offerPrice && item.product.offerPrice > 0
      ? item.product.offerPrice
      : item.product.price;
    return sum + activePrice * item.quantity;
  }, 0);

  const settings = getSettings();
  const deliveryFee = subtotal > 0 && subtotal < settings.freeDeliveryThreshold
    ? settings.deliveryFee
    : 0;

  const grandTotal = subtotal + deliveryFee;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const quickOrder = (product: Product) => {
    addItem(product, 1);
    setIsCartOpen(true);
  };

  const submitOrder = (formData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    deliveryType: DeliveryType;
    notes?: string;
  }): Order => {
    const orderNumber = `FE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      items: items.map(item => {
        const itemPrice = item.product.offerPrice && item.product.offerPrice > 0
          ? item.product.offerPrice
          : item.product.price;
        return {
          productId: item.product.id,
          name: item.product.name,
          price: itemPrice,
          quantity: item.quantity,
          image: item.product.image,
        };
      }),
      subtotal: parseFloat(subtotal.toFixed(2)),
      deliveryFee: parseFloat(deliveryFee.toFixed(2)),
      total: parseFloat(grandTotal.toFixed(2)),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      deliveryAddress: formData.deliveryAddress,
      deliveryType: formData.deliveryType,
      notes: formData.notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    saveOrder(newOrder);
    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const generateWhatsAppLink = (order: Order): string => {
    const currentSettings = getSettings();
    const rawNumber = currentSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber || '15557893663';

    const itemLines = order.items
      .map(item => `• ${item.quantity}x ${item.name} (${currentSettings.currency}${(item.price * item.quantity).toFixed(2)})`)
      .join('\n');

    const deliveryNote = order.deliveryFee === 0 ? 'FREE' : `${currentSettings.currency}${order.deliveryFee.toFixed(2)}`;

    const text = `👋 *New Order for ${currentSettings.restaurantName}*
Order ID: #${order.orderNumber}

🍽️ *Items:*
${itemLines}

💵 Subtotal: ${currentSettings.currency}${order.subtotal.toFixed(2)}
🛵 Delivery: ${deliveryNote}
💰 *Total: ${currentSettings.currency}${order.total.toFixed(2)}*

👤 *Customer Details:*
• Name: ${order.customerName}
• Phone: ${order.customerPhone}
• Type: ${order.deliveryType.toUpperCase()}
• Address: ${order.deliveryAddress || 'N/A'}
${order.notes ? `• Note: ${order.notes}` : ''}

Please confirm my order. Thank you!`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        quickOrder,
        lastPlacedOrder,
        setLastPlacedOrder,
        submitOrder,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
