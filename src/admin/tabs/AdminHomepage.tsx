import React, { useState } from 'react';
import { RestaurantSettings, Product } from '../../types';
import { saveSettings } from '../../services/dataService';
import { Save, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

interface AdminHomepageProps {
  settings: RestaurantSettings;
  products: Product[];
}

export const AdminHomepage: React.FC<AdminHomepageProps> = ({ settings }) => {
  const [formData, setFormData] = useState<RestaurantSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof RestaurantSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Homepage Content Management
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Customize hero headlines, promotional banners, and special combo deal callouts in real time.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold">
            <Check className="h-4 w-4" />
            <span>Changes Published!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Promotional Announcement Banner */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Top Promotional Banner</h3>
              <p className="text-xs text-neutral-400">
                Displays at the very top of the navigation bar across the site.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bannerPromoEnabled}
                onChange={e => handleChange('bannerPromoEnabled', e.target.checked)}
                className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 h-4 w-4"
              />
              <span className="text-xs font-semibold text-neutral-300">Enable Banner</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Banner Announcement Text
            </label>
            <input
              type="text"
              value={formData.bannerPromoText}
              onChange={e => handleChange('bannerPromoText', e.target.value)}
              placeholder="e.g. Save 20% on all Mega Bucket Offers this weekend!"
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 2. Hero Section Content */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-base font-bold text-white">Hero Section</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Hero Main Headline *
              </label>
              <input
                type="text"
                required
                value={formData.heroTitle}
                onChange={e => handleChange('heroTitle', e.target.value)}
                placeholder="Delicious Food. Better Moments."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Hero Subtitle / Description *
              </label>
              <textarea
                rows={3}
                required
                value={formData.heroDescription}
                onChange={e => handleChange('heroDescription', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Hero Food Image Asset / URL
              </label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={e => handleChange('heroImage', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaOrderText}
                onChange={e => handleChange('ctaOrderText', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaMenuText}
                onChange={e => handleChange('ctaMenuText', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Special Combo Offer Banner */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Promotional Offer Card</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Badge Text
              </label>
              <input
                type="text"
                value={formData.specialOfferBadge}
                onChange={e => handleChange('specialOfferBadge', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Offer Title
              </label>
              <input
                type="text"
                value={formData.specialOfferTitle}
                onChange={e => handleChange('specialOfferTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Offer Description
              </label>
              <textarea
                rows={2}
                value={formData.specialOfferDescription}
                onChange={e => handleChange('specialOfferDescription', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Save className="h-4 w-4" />
            <span>Save Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
