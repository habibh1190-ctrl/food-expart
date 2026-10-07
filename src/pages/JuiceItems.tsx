import React from 'react';
import { Product, Category, RestaurantSettings } from '../types';
import { CategoryPage } from './CategoryPage';

interface JuiceItemsProps {
  products: Product[];
  categories: Category[];
  settings: RestaurantSettings;
  onBackToHome: () => void;
  onNavigateCategory: (slug: string) => void;
}

export const JuiceItems: React.FC<JuiceItemsProps> = ({
  products,
  categories,
  settings,
  onBackToHome,
  onNavigateCategory,
}) => {
  const category = categories.find(c => c.slug === 'juice-items') || {
    id: 'cat-juice-items',
    name: 'Juice Items',
    slug: 'juice-items',
    image: '/images/products/juice_fresh_tropical.jpg',
    description: 'Freshly pressed natural fruit juices, iced coolers, and tropical refreshers.',
    active: true,
    displayOrder: 2,
  };

  return (
    <CategoryPage
      category={category}
      products={products}
      settings={settings}
      onBackToHome={onBackToHome}
      onNavigateCategory={onNavigateCategory}
      allCategories={categories}
    />
  );
};
