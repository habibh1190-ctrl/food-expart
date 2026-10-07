import { settings } from '../../config/settings.js';
import { contact } from '../../config/contact.js';

const CART_KEY = 'fe_cart_items_v1';

export function getCartItems() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function calculateCartTotals(items) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.offerPrice && item.product.offerPrice > 0
      ? item.product.offerPrice
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 0 && subtotal < settings.freeDeliveryThreshold
    ? settings.deliveryFee
    : 0;

  const grandTotal = subtotal + deliveryFee;

  return {
    totalItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    deliveryFee: parseFloat(deliveryFee.toFixed(2)),
    grandTotal: parseFloat(grandTotal.toFixed(2)),
    currency: settings.currency
  };
}

export function generateWhatsAppOrderUrl(order) {
  const cleanNumber = contact.whatsapp.replace(/[^0-9]/g, '');

  const itemLines = order.items
    .map(i => `• ${i.quantity}x ${i.name} (${settings.currency}${(i.price * i.quantity).toFixed(2)})`)
    .join('\n');

  const deliveryText = order.deliveryFee === 0 ? 'FREE' : `${settings.currency}${order.deliveryFee.toFixed(2)}`;

  const message = `👋 *New Order for ${settings.restaurantName}*
Order ID: #${order.orderNumber}

🍽️ *Items:*
${itemLines}

💵 Subtotal: ${settings.currency}${order.subtotal.toFixed(2)}
🛵 Delivery: ${deliveryText}
💰 *Total: ${settings.currency}${order.total.toFixed(2)}*

👤 *Customer Details:*
• Name: ${order.customerName}
• Phone: ${order.customerPhone}
• Type: ${(order.deliveryType || 'delivery').toUpperCase()}
• Address: ${order.deliveryAddress || 'N/A'}
${order.notes ? `• Note: ${order.notes}` : ''}

Please confirm my order. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
