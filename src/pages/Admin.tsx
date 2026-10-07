import React from 'react';
import { AdminLayout } from '../admin/AdminLayout';
import { Product, Category, Order, RestaurantSettings, CustomerReview } from '../types';

interface AdminProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: RestaurantSettings;
  reviews: CustomerReview[];
  onExitAdmin: () => void;
}

export const Admin: React.FC<AdminProps> = (props) => {
  return <AdminLayout {...props} />;
};
