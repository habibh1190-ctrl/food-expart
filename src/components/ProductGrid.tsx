import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categoryName?: string;
  categoryMap?: Map<string, string>;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categoryName,
  categoryMap,
  emptyMessage = 'No menu items available at this moment.',
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-neutral-900/40 rounded-xl border border-neutral-800">
        <p className="text-sm text-neutral-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          categoryName={categoryName || categoryMap?.get(product.categoryId)}
        />
      ))}
    </div>
  );
};
