import React, { useState } from 'react';
import { Product, Category, RestaurantSettings, CustomerReview } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Star, Flame, Sparkles, Clock, MapPin, Phone, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  settings: RestaurantSettings;
  reviews: CustomerReview[];
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  settings,
  reviews,
  onNavigate,
}) => {
  const { openCart } = useCart();
  const [heroImgLoaded, setHeroImgLoaded] = useState(true);

  // Filter buckets
  const bucketCategory = categories.find(c => c.slug === 'bucket-offer');
  const bucketProducts = products.filter(
    p => p.categoryId === (bucketCategory?.id || 'cat-bucket-offer')
  );

  // Featured items
  const featuredProducts = products.filter(p => p.featured);

  // Juice items
  const juiceCategory = categories.find(c => c.slug === 'juice-items');
  const juiceProducts = products
    .filter(p => p.categoryId === (juiceCategory?.id || 'cat-juice-items'))
    .slice(0, 4);

  // Snacks items
  const snacksCategory = categories.find(c => c.slug === 'snacks-items');
  const snacksProducts = products
    .filter(p => p.categoryId === (snacksCategory?.id || 'cat-snacks-items'))
    .slice(0, 4);

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-4 sm:pt-8 lg:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full max-w-full truncate">
                <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span className="truncate">Handcrafted Fresh Daily · Fast Express Delivery</span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.08] text-balance">
                {settings.heroTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                {settings.heroDescription}
              </p>

              {/* CTA Group */}
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 min-h-[48px] active:scale-[0.99]"
                >
                  <span>{settings.ctaOrderText}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('bucket-offer')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-sm sm:text-base rounded-xl transition-colors flex items-center justify-center min-h-[48px] active:scale-[0.99]"
                >
                  <span>Explore Bucket Offers</span>
                </button>
              </div>

              {/* Key Trust Signals (No static pills, clean metadata) */}
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
                  <span className="text-[10px] xs:text-[11px] sm:text-xs">Customer rating</span>
                </div>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5 relative mt-2 sm:mt-4 lg:mt-0">
              <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[300px] xs:max-h-[340px] sm:max-h-none rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
                {heroImgLoaded ? (
                  <img
                    src={settings.heroImage}
                    alt={settings.restaurantName}
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgLoaded(false)}
                    loading="eager"
                    className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-amber-500 font-bold">
                    Food Expert Kitchen
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                
                {/* Floating highlight badge */}
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
                    onClick={() => onNavigate('bucket-offer')}
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

      {/* 2. CATEGORY TILES NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.filter(c => c.active).map(cat => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.slug)}
              className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 p-6 text-left transition-all hover:border-neutral-700 hover:bg-neutral-850"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800 text-neutral-300 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors shrink-0 ml-3">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. BUCKET OFFERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 tracking-wider uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Signature Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bucket Offers
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Generous golden chicken buckets marinated for 24 hours, paired with signature dips and sides.
            </p>
          </div>
          <button
            onClick={() => onNavigate('bucket-offer')}
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Bucket Combos</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bucketProducts.slice(0, 4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName="Bucket Offer"
            />
          ))}
        </div>
      </section>

      {/* 4. SPECIAL PROMO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 p-6 sm:p-10 lg:p-12 text-neutral-950 shadow-xl">
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
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('bucket-offer')}
                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-sm rounded-xl transition-colors shadow-md min-h-[48px] flex items-center justify-center active:scale-[0.99]"
              >
                Claim Offer Now
              </button>
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 bg-white/20 hover:bg-white/30 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-neutral-950/20 min-h-[48px] active:scale-[0.99]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FRESH JUICE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
              <span>All Natural Refreshment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Fresh Juices & Smoothies
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              100% natural cold-pressed fruit juices with zero artificial sweeteners.
            </p>
          </div>
          <button
            onClick={() => onNavigate('juice-items')}
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All Juices</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {juiceProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName="Juice Items"
            />
          ))}
        </div>
      </section>

      {/* 6. SNACKS & SIDES HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 tracking-wider uppercase mb-1">
              <span>Crisp & Savory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Snacks & Loaded Sides
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Double-cooked seasoned fries, artisan sliders, and crunchy cheese sticks.
            </p>
          </div>
          <button
            onClick={() => onNavigate('snacks-items')}
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All Snacks</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {snacksProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName="Snacks Items"
            />
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE US / QUALITY STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 block">
                Quality Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {settings.aboutTitle}
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                {settings.aboutDescription}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                >
                  <span>Learn more about our standards</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.aboutFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-start gap-3"
                >
                  <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-neutral-300 leading-snug">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Loved By Over 10,000+ Foodies
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Read what our customers have to say about their meals and fast delivery experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.filter(r => r.active).map(review => (
            <div
              key={review.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{review.review}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{review.customerName}</span>
                <span className="text-neutral-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. RESTAURANT HOURS & ORDERING CTA */}
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
                {settings.openingHours}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                {settings.address}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors shadow-md min-h-[48px] flex items-center justify-center active:scale-[0.99]"
            >
              Order Online Now
            </button>
            <a
              href={`https://wa.me/${cleanWaNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-emerald-500/30 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.99]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
