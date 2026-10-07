import React from 'react';
import { useCart } from '../context/CartContext';
import { getSettings } from '../services/dataService';

export const OrderSummary: React.FC = () => {
  const { subtotal, deliveryFee, grandTotal } = useCart();
  const settings = getSettings();

  return (
    <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-2 text-sm">
      <div className="flex justify-between text-neutral-400">
        <span>Subtotal</span>
        <span className="font-semibold text-white tabular-nums">
          {settings.currency}{subtotal.toFixed(2)}
        </span>
      </div>

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

      <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
        <span className="font-bold text-white text-base">Total</span>
        <span className="font-black text-amber-400 text-xl tabular-nums">
          {settings.currency}{grandTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
