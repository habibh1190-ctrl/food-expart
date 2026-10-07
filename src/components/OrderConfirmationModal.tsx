import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { getSettings } from '../services/dataService';

export const OrderConfirmationModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, generateWhatsAppLink } = useCart();
  const settings = getSettings();

  if (!lastPlacedOrder) return null;

  const handleClose = () => {
    setLastPlacedOrder(null);
  };

  const handleWhatsAppSend = () => {
    const link = generateWhatsAppLink(lastPlacedOrder);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-center z-10 overflow-hidden">
        {/* Success Icon */}
        <div className="mx-auto h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-extrabold text-white tracking-tight">
          Order Successfully Received!
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          Order Reference <span className="font-mono text-amber-400 font-bold">#{lastPlacedOrder.orderNumber}</span>
        </p>

        {/* Status card */}
        <div className="mt-5 p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 text-left space-y-2.5 text-xs text-neutral-300">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Customer:</span>
            <span className="font-semibold text-white">{lastPlacedOrder.customerName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Phone:</span>
            <span className="font-semibold text-white">{lastPlacedOrder.customerPhone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Service:</span>
            <span className="font-semibold text-amber-400 uppercase tracking-wide">
              {lastPlacedOrder.deliveryType}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-neutral-800">
            <span className="text-neutral-500">Total Amount:</span>
            <span className="font-bold text-white tabular-nums text-sm">
              {settings.currency}{lastPlacedOrder.total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-400/90 font-medium">
          <Clock className="h-4 w-4" />
          <span>Estimated prep & delivery: 25 - 35 minutes</span>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="w-full min-h-[48px] py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.99] shadow-md shadow-emerald-950/40"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Send Order via WhatsApp Now</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full min-h-[46px] py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 active:scale-[0.99]"
          >
            <span>Back to Menu</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
