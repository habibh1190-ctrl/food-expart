import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { settings } from '../../config/settings.js';

interface HeroProps {
  onOrderNow?: () => void;
  onExploreMenu?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExploreMenu }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-6 lg:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full max-w-full truncate">
              <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span className="truncate">Handcrafted Fresh Daily · Fast Express Delivery</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.08] text-balance">
              {settings.heroTitle}
            </h1>

            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              {settings.heroDescription}
            </p>

            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={onOrderNow}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 min-h-[48px] active:scale-[0.99]"
              >
                <span>{settings.ctaOrderText}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-sm sm:text-base rounded-xl transition-colors flex items-center justify-center min-h-[48px] active:scale-[0.99]"
              >
                <span>{settings.ctaMenuText}</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-3 sm:pt-4 border-t border-neutral-800/80 w-full grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-400">
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm sm:text-lg">100% Real</span>
                <span className="text-[10px] xs:text-[11px] sm:text-xs">Farm ingredients</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm sm:text-lg">25-35 min</span>
                <span className="text-[10px] xs:text-[11px] sm:text-xs">Express delivery</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm sm:text-lg">4.9 / 5.0</span>
                <span className="text-[10px] xs:text-[11px] sm:text-xs">Top customer rating</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Banner */}
          <div className="lg:col-span-5 relative mt-2 sm:mt-4 lg:mt-0">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[300px] xs:max-h-[340px] sm:max-h-none rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
              {!imgError ? (
                <img
                  src={settings.heroImage}
                  alt={settings.restaurantName}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  loading="eager"
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-amber-500 font-bold">
                  {settings.restaurantName} Kitchen
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

              {/* Bottom Feature Card */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 p-2.5 sm:p-3.5 rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                    🔥
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Mega Chicken Bucket</p>
                    <p className="text-[10px] sm:text-[11px] text-amber-400 truncate">Save 20% on family combos</p>
                  </div>
                </div>
                <button
                  onClick={onExploreMenu}
                  className="text-xs font-bold text-neutral-950 bg-amber-500 px-3 py-1.5 rounded-lg hover:bg-amber-400 whitespace-nowrap min-h-[38px] shrink-0 active:scale-95"
                >
                  View Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
