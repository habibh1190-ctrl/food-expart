import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { settings } from '../../config/settings.js';
import { contact } from '../../config/contact.js';
import { getCartItems, calculateCartTotals, generateWhatsAppOrderUrl, saveCartItems } from './cart.js';
import { validateCheckoutForm, createOrderRecord } from './checkout.js';
import { ArrowLeft, ShoppingBag, MessageSquare, CheckCircle, Trash2, Plus, Minus } from 'lucide-react';
import '../styles/main.css';

function CheckoutApp() {
  const [items, setItems] = useState(getCartItems);
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    saveCartItems(items);
  }, [items]);

  const totals = calculateCartTotals(items);

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev: any[]) => {
      return prev
        .map((item: any) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev: any[]) => prev.filter((item: any) => item.product.id !== productId));
  };

  const handlePlaceOrder = (isWhatsApp = false) => {
    const validation = validateCheckoutForm({
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryType,
    });

    if (!validation.valid) {
      setError(validation.error || 'Please fill required fields.');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty. Please select food items first.');
      return;
    }

    setError('');
    const order = createOrderRecord(items, {
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryType,
      notes,
    });

    // Clear cart
    saveCartItems([]);

    if (isWhatsApp) {
      const waUrl = generateWhatsAppOrderUrl(order);
      window.open(waUrl, '_blank');
    }

    window.location.href = `/success.html?orderId=${order.orderNumber}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between pb-6 border-b border-neutral-800">
        <a
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Restaurant</span>
        </a>

        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-xs">
            FE
          </div>
          <span className="font-extrabold text-white text-base tracking-tight">
            {settings.restaurantName} Checkout
          </span>
        </div>
      </header>

      <main className="my-8">
        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <ShoppingBag className="mx-auto h-12 w-12 text-neutral-600" />
            <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto">
              You do not have any items in your checkout session yet.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors min-h-[48px]"
            >
              Browse Food Menu
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-white">1. Dining & Delivery Preference</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'delivery', label: '🛵 Delivery' },
                    { id: 'takeaway', label: '🛍️ Takeaway' },
                    { id: 'dinein', label: '🍽️ Dine-In' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDeliveryType(tab.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-colors min-h-[44px] flex items-center justify-center active:scale-[0.98] ${
                        deliveryType === tab.id
                          ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-sm'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-white">2. Customer Information</h3>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="e.g. +1 555-0192"
                      className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[48px]"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        placeholder="Street, Building, Flat / Door number"
                        className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[72px]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Special Order Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="e.g. Extra spicy, garlic sauce on the side..."
                      className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[48px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items & Totals */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Order Summary</h3>

                <div className="divide-y divide-neutral-800/80 max-h-60 overflow-y-auto pr-1">
                  {items.map((item: any) => {
                    const price = item.product.offerPrice && item.product.offerPrice > 0
                      ? item.product.offerPrice
                      : item.product.price;

                    return (
                      <div key={item.product.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.product.name}</p>
                          <p className="text-[11px] text-amber-400 font-semibold tabular-nums">
                            {settings.currency}{price.toFixed(2)} each
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="h-8 w-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white flex items-center justify-center active:scale-95"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white px-1.5 tabular-nums min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="h-8 w-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white flex items-center justify-center active:scale-95"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-neutral-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 ml-1 active:scale-95"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white tabular-nums">
                      {settings.currency}{totals.subtotal.toFixed(2)}
                    </span>
                  </div>

                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-neutral-400">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-white tabular-nums">
                        {totals.deliveryFee === 0 ? (
                          <span className="text-emerald-400 font-bold">FREE</span>
                        ) : (
                          `${settings.currency}${totals.deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm">
                    <span className="font-bold text-white">Grand Total</span>
                    <span className="font-black text-amber-400 text-lg tabular-nums">
                      {settings.currency}{totals.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="pt-4 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handlePlaceOrder(true)}
                    className="w-full min-h-[48px] py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-[0.99]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Order via WhatsApp ({settings.currency}{totals.grandTotal.toFixed(2)})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlaceOrder(false)}
                    className="w-full min-h-[46px] py-3 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99]"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Place Order Directly</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="pt-6 border-t border-neutral-900 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {settings.restaurantName}. {settings.tagline}
      </footer>
    </div>
  );
}

const rootEl = document.getElementById('checkout-root');
if (rootEl) {
  createRoot(rootEl).render(<CheckoutApp />);
}
