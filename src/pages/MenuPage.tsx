import React, { useState, useMemo } from 'react';
import { Product, Category, RestaurantSettings } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, Sparkles, Filter, X } from 'lucide-react';

interface MenuPageProps {
  products: Product[];
  categories: Category[];
  settings: RestaurantSettings;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  products,
  categories,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Category filter
        if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
          return false;
        }

        // Available filter
        if (onlyAvailable && !product.available) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.offerPrice && a.offerPrice > 0 ? a.offerPrice : a.price;
        const priceB = b.offerPrice && b.offerPrice > 0 ? b.offerPrice : b.price;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.displayOrder - b.displayOrder;
      });
  }, [products, selectedCategory, searchQuery, sortBy, onlyAvailable]);

  // Lookup map for category names
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach(c => map.set(c.id, c.name));
    return map;
  }, [categories]);

  const activeCategories = categories.filter(c => c.active);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          <span>Full Culinary Menu</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore Our Complete Menu
        </h1>
        <p className="text-sm text-neutral-400">
          Everything from party-sized crispy chicken buckets and chilled fruit coolers to mouthwatering snack sides.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Search bar with touch-friendly input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search food by name, spices, ingredients..."
            className="w-full pl-11 pr-11 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 min-h-[48px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Tabs (Touch-friendly horizontal scrollbar) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 touch-scroll-x -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors min-h-[44px] shrink-0 flex items-center active:scale-95 ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-neutral-950 shadow-sm font-black'
                : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800 active:bg-neutral-800'
            }`}
          >
            All Items ({products.length})
          </button>

          {activeCategories.map(cat => {
            const count = products.filter(p => p.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors min-h-[44px] shrink-0 flex items-center active:scale-95 ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 shadow-sm font-black'
                    : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800 active:bg-neutral-800'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Quick controls: Sort + Availability */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-800/80 text-xs text-neutral-300">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-neutral-400 font-medium">
              Showing <strong className="text-white">{filteredProducts.length}</strong> items
            </span>

            <label className="flex items-center gap-2 cursor-pointer min-h-[44px] py-1 select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={e => setOnlyAvailable(e.target.checked)}
                className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 h-4 w-4"
              />
              <span>In-stock only</span>
            </label>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <span className="text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-neutral-950 border border-neutral-800 text-white rounded-xl px-3.5 py-2.5 text-base sm:text-xs focus:outline-none focus:border-amber-500 min-h-[44px]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-3">
          <p className="text-base font-bold text-white">No dishes matched your criteria</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search query, selecting another category, or unchecking the in-stock filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyAvailable(false);
            }}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-xl transition-colors min-h-[44px]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={categoryMap.get(product.categoryId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
