import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, MessageSquare, CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { getSettings } from '../services/dataService';
import { DeliveryType } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    grandTotal,
    submitOrder,
    generateWhatsAppLink,
  } = useCart();

  const settings = getSettings();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const validateForm = () => {
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 6) {
      setErrorMessage('Please enter a valid phone number.');
      return false;
    }
    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please enter your delivery address.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;

    const order = submitOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      deliveryType,
      notes: notes.trim(),
    });

    const waLink = generateWhatsAppLink(order);
    window.open(waLink, '_blank');
    closeCart();
  };

  const handleDirectOrder = () => {
    if (!validateForm()) return;

    submitOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      deliveryType,
      notes: notes.trim(),
    });

    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col h-full z-10 overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-5 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-white">Your Food Order</h2>
            <span className="text-xs text-neutral-400">
              ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-neutral-800/80 flex items-center justify-center text-neutral-500 mb-4">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Your cart is empty</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mb-6">
              Browse our crispy buckets, tropical fresh juices, and snacks to start your order.
            </p>
            <button
              onClick={closeCart}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 min-h-[48px] active:scale-[0.99]"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 sm:space-y-6">
            {/* Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
                <span>Selected Items</span>
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 transition-colors py-1 px-1.5 min-h-[32px] flex items-center"
                >
                  Clear all
                </button>
              </div>

              {items.map(item => {
                const activePrice = item.product.offerPrice && item.product.offerPrice > 0
                  ? item.product.offerPrice
                  : item.product.price;
                const itemTotal = activePrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 bg-neutral-950/70 p-3 rounded-xl border border-neutral-800/80"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 rounded-lg object-cover bg-neutral-900 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-amber-400 font-semibold tabular-nums mt-0.5">
                        {settings.currency}{activePrice.toFixed(2)} each
                      </p>

                      {/* Quantity Stepper with 36px touch targets */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-9 w-9 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white transition-colors flex items-center justify-center shrink-0 active:scale-95"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-bold text-white px-2 tabular-nums min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-9 w-9 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white transition-colors flex items-center justify-center shrink-0 active:scale-95"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end justify-between self-stretch">
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-neutral-400 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-bold text-white tabular-nums">
                        {settings.currency}{itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Option */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Dining Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['delivery', 'takeaway', 'dinein'] as DeliveryType[]).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDeliveryType(type)}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all min-h-[44px] flex items-center justify-center active:scale-[0.98] ${
                      deliveryType === type
                        ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-sm'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {type === 'delivery' && '🛵 Delivery'}
                    {type === 'takeaway' && '🛍️ Takeaway'}
                    {type === 'dinein' && '🍽️ Dine-In'}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Customer Information
              </label>

              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                  {errorMessage}
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 min-h-[48px]"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number (for order updates) *"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 min-h-[48px]"
                />
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <textarea
                    rows={2}
                    placeholder="Delivery Address (Street, Building, Flat #) *"
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 min-h-[72px]"
                  />
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="Special Instructions / Allergies (Optional)"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 min-h-[48px]"
                />
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-2 text-sm">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white tabular-nums">
                  {settings.currency}{subtotal.toFixed(2)}
                </span>
              </div>

              {deliveryType === 'delivery' && (
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-white tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `${settings.currency}${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
              )}

              {subtotal < settings.freeDeliveryThreshold && deliveryType === 'delivery' && (
                <p className="text-[11px] text-amber-400/90 pt-1">
                  💡 Add {settings.currency}{(settings.freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery!
                </p>
              )}

              <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                <span className="font-bold text-white text-base">Total</span>
                <span className="font-black text-amber-400 text-xl tabular-nums">
                  {settings.currency}{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 bg-neutral-950 border-t border-neutral-800 space-y-2.5 pb-safe shrink-0">
            {/* WhatsApp Order Button */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full min-h-[48px] py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 active:scale-[0.99] text-sm sm:text-base"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Order via WhatsApp ({settings.currency}{grandTotal.toFixed(2)})</span>
            </button>

            {/* Direct Order Button */}
            <button
              type="button"
              onClick={handleDirectOrder}
              className="w-full min-h-[46px] py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Confirm & Place Order Directly</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

