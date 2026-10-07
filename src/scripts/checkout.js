/**
 * Food Expert - Checkout & Order Processing
 */

import { calculateCartTotals, generateWhatsAppOrderUrl } from './cart.js';

export function validateCheckoutForm({ customerName, customerPhone, deliveryAddress, deliveryType }) {
  if (!customerName || !customerName.trim()) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  if (!customerPhone || customerPhone.trim().length < 6) {
    return { valid: false, error: 'Please enter a valid phone number.' };
  }
  if (deliveryType === 'delivery' && (!deliveryAddress || !deliveryAddress.trim())) {
    return { valid: false, error: 'Please enter a delivery address.' };
  }
  return { valid: true };
}

export function createOrderRecord(items, customerData) {
  const totals = calculateCartTotals(items);
  const orderNumber = `FE-${Math.floor(1000 + Math.random() * 9000)}`;

  const order = {
    id: `ord-${Date.now()}`,
    orderNumber,
    items: items.map(item => {
      const price = item.product.offerPrice && item.product.offerPrice > 0
        ? item.product.offerPrice
        : item.product.price;
      return {
        productId: item.product.id,
        name: item.product.name,
        price,
        quantity: item.quantity,
        image: item.product.image
      };
    }),
    subtotal: totals.subtotal,
    deliveryFee: totals.deliveryFee,
    total: totals.grandTotal,
    customerName: customerData.customerName.trim(),
    customerPhone: customerData.customerPhone.trim(),
    deliveryAddress: customerData.deliveryAddress ? customerData.deliveryAddress.trim() : '',
    deliveryType: customerData.deliveryType || 'delivery',
    notes: customerData.notes ? customerData.notes.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // Persist order in local store
  try {
    const raw = localStorage.getItem('fe_restaurant_orders_v1');
    const orders = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem('fe_restaurant_orders_v1', JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }

  return order;
}
