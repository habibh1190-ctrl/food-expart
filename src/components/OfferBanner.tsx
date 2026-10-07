import React from 'react';
import { MessageSquare } from 'lucide-react';
import { settings } from '../../config/settings.js';
import { contact } from '../../config/contact.js';

interface OfferBannerProps {
  onClaimOffer?: () => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ onClaimOffer }) => {
  const cleanWaNumber = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 p-8 sm:p-10 lg:p-12 text-neutral-950 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block text-xs font-black uppercase tracking-widest bg-neutral-950 text-amber-400 px-3 py-1 rounded-md mb-3">
            {settings.specialOfferBadge}
          </span>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {settings.specialOfferTitle}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-neutral-900/90 leading-relaxed font-medium">
            {settings.specialOfferDescription}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onClaimOffer}
              className="px-6 py-3 bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              Claim Offer Now
            </button>
            <a
              href={`https://wa.me/${cleanWaNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white/20 hover:bg-white/30 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 border border-neutral-950/20"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
