import React from 'react';
import { RestaurantSettings } from '../types';
import { Phone, MapPin, Clock, MessageSquare, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  settings: RestaurantSettings;
  setCurrentTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  setCurrentTab,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    scrollToTop();
  };

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black text-base shadow-sm">
                FE
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {settings.restaurantName}
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {settings.tagline}. Handcrafted crispy chicken buckets, fresh cold-pressed fruit juices, and loaded savory snacks prepared hot and delivered fresh.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Explore Menu
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => handleNav('bucket-offer')}
                  className="hover:text-amber-400 transition-colors text-left py-1.5 min-h-[38px] flex items-center"
                >
                  Bucket Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('juice-items')}
                  className="hover:text-amber-400 transition-colors text-left py-1.5 min-h-[38px] flex items-center"
                >
                  Juice Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('snacks-items')}
                  className="hover:text-amber-400 transition-colors text-left py-1.5 min-h-[38px] flex items-center"
                >
                  Snacks Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-amber-400 transition-colors text-left py-1.5 min-h-[38px] flex items-center"
                >
                  Full Menu & Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-400 transition-colors text-left py-1.5 min-h-[38px] flex items-center"
                >
                  About Food Expert
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-400 transition-colors text-left py-1.5 min-h-[38px] flex items-center"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Delivery */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Hours & Service
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Opening Hours</span>
                  <span>{settings.openingHours}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-900 text-xs leading-relaxed">
                <span>Free delivery on orders over {settings.currency}{settings.freeDeliveryThreshold.toFixed(2)}. Standard delivery: {settings.currency}{settings.deliveryFee.toFixed(2)}.</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors py-1 min-h-[38px] flex items-center">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors py-1 min-h-[38px] flex items-center"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {settings.restaurantName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-neutral-500 hover:text-amber-400 transition-colors min-h-[44px] px-2"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Admin Portal</span>
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors min-h-[44px] px-2"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
