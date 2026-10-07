import React, { useState } from 'react';
import { Category, Product, RestaurantSettings } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowLeft, ArrowUpDown } from 'lucide-react';

interface CategoryPageProps {
  category: Category;
  products: Product[];
  settings: RestaurantSettings;
  onBackToHome: () => void;
  onNavigateCategory: (slug: string) => void;
  allCategories: Category[];
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  products,
  onBackToHome,
  onNavigateCategory,
  allCategories,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter products belonging to this category
  const categoryProducts = products.filter(p => p.categoryId === category.id);

  const filteredProducts = categoryProducts
    .filter(p => (onlyAvailable ? p.available : true))
    .sort((a, b) => {
      const priceA = a.offerPrice && a.offerPrice > 0 ? a.offerPrice : a.price;
      const priceB = b.offerPrice && b.offerPrice > 0 ? b.offerPrice : b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.displayOrder - b.displayOrder;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Back button & Category tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors min-h-[44px] self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        {/* Quick sibling category switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 touch-scroll-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {allCategories.filter(c => c.active).map(cat => (
            <button
              key={cat.id}
              onClick={() => onNavigateCategory(cat.slug)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors min-h-[44px] shrink-0 flex items-center active:scale-95 ${
                cat.id === category.id
                  ? 'bg-amber-500 text-neutral-950 font-black shadow-sm'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 active:bg-neutral-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Hero Banner */}
      <div className="relative rounded-2xl bg-neutral-900 border border-neutral-800 p-5 sm:p-10 overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            <span>Category Collection</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {category.name}
          </h1>
          <p className="mt-2 text-xs sm:text-base text-neutral-300 leading-relaxed">
            {category.description || 'Explore our chef-prepared specialties in this category.'}
          </p>
          <div className="mt-3 sm:mt-4 text-xs text-neutral-400">
            Showing <span className="text-white font-bold">{filteredProducts.length}</span> delicious items
          </div>
        </div>

        {category.image && (
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
            <img
              src={category.image}
              alt=""
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-neutral-900/60 rounded-xl border border-neutral-800">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer min-h-[44px] select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={e => setOnlyAvailable(e.target.checked)}
              className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 h-4 w-4"
            />
            <span>In-stock only</span>
          </label>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-neutral-300">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-neutral-800 border border-neutral-700 text-white rounded-xl px-3.5 py-2.5 text-base sm:text-xs focus:outline-none focus:border-amber-500 min-h-[44px]"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-neutral-900/40 rounded-xl border border-neutral-800">
          <p className="text-sm text-neutral-400">No items available in this category with current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={category.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};
