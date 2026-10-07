import React from 'react';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { contact } from '../../config/contact.js';
import { settings } from '../../config/settings.js';

export const ContactSection: React.FC = () => {
  const cleanWaNumber = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Ready to Taste the Difference?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg">
            Order directly online or message us on WhatsApp. Hot, fresh, and delivered right on time.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-neutral-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              {contact.openingHours}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              {contact.address}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/checkout.html"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors shadow-md"
          >
            Checkout Directly
          </a>
          <a
            href={`https://wa.me/${cleanWaNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-emerald-500/30 font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
