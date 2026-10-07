import React from 'react';
import { RestaurantSettings } from '../types';
import { ShieldCheck, Heart, Award, Sparkles, Clock, Users, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  settings: RestaurantSettings;
  onNavigateMenu: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onNavigateMenu }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          <span>Our Story & Craft</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          About {settings.restaurantName}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          {settings.aboutDescription}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our 24-Hour Marinade Secret</h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Every batch of our chicken begins with farm-raised cuts marinated for a full 24 hours in a custom aromatic blend of buttermilk, garlic, paprika, and 11 herbs.
          </p>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">100% Real Cold-Pressed Juices</h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Never from concentrate. We press whole seasonal oranges, Alphonso mangoes, berries, and crisp greens daily to preserve essential vitamins and natural sweetness.
          </p>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Uncompromising Kitchen Standards</h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Commercial grade hygiene, state-of-the-art pressure frying systems, and eco-friendly insulated packaging ensure food reaches your table hot, crisp, and safe.
          </p>
        </div>
      </div>

      {/* Kitchen & Philosophy */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Food Made for Celebrations and Gatherings
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              We started Food Expert with a straightforward mission: eliminate soggy chicken and artificial drinks. We believe that family meals, late-night cravings, and office feasts deserve genuine culinary craftsmanship.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Whether you are sharing a 12-piece family bucket or sipping an icy tropical refresher, every bite is crafted to spark joy.
            </p>
            <div className="pt-2">
              <button
                onClick={onNavigateMenu}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <span>Discover the Menu</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {settings.aboutFeatures.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800"
              >
                <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-sm text-neutral-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
