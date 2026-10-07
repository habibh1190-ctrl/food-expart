import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { settings } from '../../config/settings.js';
import { contact } from '../../config/contact.js';
import { CheckCircle2, MessageSquare, ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import '../styles/main.css';

function SuccessApp() {
  const [orderId, setOrderId] = useState('FE-XXXX');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    if (id) {
      setOrderId(id);
    } else {
      try {
        const raw = localStorage.getItem('fe_restaurant_orders_v1');
        if (raw) {
          const orders = JSON.parse(raw);
          if (orders && orders.length > 0) {
            setOrderId(orders[0].orderNumber);
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const cleanWaNumber = contact.whatsapp.replace(/[^0-9]/g, '');
  const waCheckUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    `Hello ${settings.restaurantName}, I am following up on my order #${orderId}. Could you please confirm the delivery status?`
  )}`;

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-xl mx-auto text-center">
      <div className="pt-8">
        <a href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-sm">
            FE
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">
            {settings.restaurantName}
          </span>
        </a>

        {/* Success Icon */}
        <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h1 className="text-3xl font-black text-white tracking-tight">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Your order reference is <strong className="text-amber-400 font-mono">#{orderId}</strong>
        </p>

        {/* Info Box */}
        <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left space-y-3.5 text-xs text-neutral-300">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <span className="text-neutral-400">Kitchen Status:</span>
            <span className="font-bold text-amber-400 uppercase tracking-wider">
              Preparing Your Feast
            </span>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold block">Estimated Delivery</span>
              <span className="text-neutral-400">25 – 35 minutes directly to your address</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold block">Dispatched From</span>
              <span className="text-neutral-400">{contact.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold block">Kitchen Hotline</span>
              <span className="text-neutral-400">{contact.phone}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <a
            href={waCheckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Confirm / Track via WhatsApp</span>
          </a>

          <a
            href="/"
            className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-bold text-xs sm:text-sm rounded-xl border border-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Menu</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <footer className="pt-8 border-t border-neutral-900 text-xs text-neutral-500">
        © {new Date().getFullYear()} {settings.restaurantName}. {settings.tagline}
      </footer>
    </div>
  );
}

const rootEl = document.getElementById('success-root');
if (rootEl) {
  createRoot(rootEl).render(<SuccessApp />);
}
