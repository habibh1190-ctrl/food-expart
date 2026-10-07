import React from 'react';
import { Product, Category, RestaurantSettings } from '../types';
import { CategoryPage } from './CategoryPage';

interface SnacksItemsProps {
  products: Product[];
  categories: Category[];
  settings: RestaurantSettings;
  onBackToHome: () => void;
  onNavigateCategory: (slug: string) => void;
}

export const SnacksItems: React.FC<SnacksItemsProps> = ({
  products,
  categories,
  settings,
  onBackToHome,
  onNavigateCategory,
}) => {
  const category = categories.find(c => c.slug === 'snacks-items') || {
    id: 'cat-snacks-items',
    name: 'Snacks Items',
    slug: 'snacks-items',
    image: '/images/products/snacks_loaded_bites.jpg',
    description: 'Crisp hand-cut fries, savory sliders, cheese sticks, and spicy tender bites.',
    active: true,
    displayOrder: 3,
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
