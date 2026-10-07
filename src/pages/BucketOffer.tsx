import React from 'react';
import { Product, Category, RestaurantSettings } from '../types';
import { CategoryPage } from './CategoryPage';

interface BucketOfferProps {
  products: Product[];
  categories: Category[];
  settings: RestaurantSettings;
  onBackToHome: () => void;
  onNavigateCategory: (slug: string) => void;
}

export const BucketOffer: React.FC<BucketOfferProps> = ({
  products,
  categories,
  settings,
  onBackToHome,
  onNavigateCategory,
}) => {
  const category = categories.find(c => c.slug === 'bucket-offer') || {
    id: 'cat-bucket-offer',
    name: 'Bucket Offer',
    slug: 'bucket-offer',
    image: '/images/products/bucket_crispy_feast.jpg',
    description: 'Generous crispy golden chicken buckets and feast combos designed for sharing.',
    active: true,
    displayOrder: 1,
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
