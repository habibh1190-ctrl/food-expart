import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  onViewAll?: () => void;
  categoryName?: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  title = 'Signature Favorites',
  subtitle = 'Chef-crafted crispy chicken buckets, all-natural juices, and savory snacks.',
  onViewAll,
  categoryName,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 tracking-wider uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Featured Selection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={categoryName}
          />
        ))}
      </div>
    </section>
  );
};
