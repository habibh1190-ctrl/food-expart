/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  getProducts,
  getCategories,
  getSettings,
  getReviews,
  getOrders,
  subscribeToDataChanges,
  isAdminAuthenticated,
} from './services/dataService';
import { Product, Category, RestaurantSettings, CustomerReview, Order } from './types';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';

export default function App() {
  const [products, setProducts] = useState<Product[]>(getProducts);
  const [categories, setCategories] = useState<Category[]>(getCategories);
  const [settings, setSettings] = useState<RestaurantSettings>(getSettings);
  const [reviews, setReviews] = useState<CustomerReview[]>(getReviews);
  const [orders, setOrders] = useState<Order[]>(getOrders);

  // Navigation tab state ('home', 'bucket-offer', 'juice-items', 'snacks-items', 'menu', 'about', 'contact')
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Admin routing
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Sync state on updates across tabs or admin edits
  useEffect(() => {
    const refreshData = () => {
      setProducts(getProducts());
      setCategories(getCategories());
      setSettings(getSettings());
      setReviews(getReviews());
      setOrders(getOrders());
    };

    const unsubscribe = subscribeToDataChanges(refreshData);
    return () => unsubscribe();
  }, []);

  // Update dynamic browser title when settings or tab changes
  useEffect(() => {
    const tabTitles: Record<string, string> = {
      home: `${settings.restaurantName} – ${settings.tagline}`,
      'bucket-offer': `Bucket Offers – ${settings.restaurantName}`,
      'juice-items': `Fresh Juices – ${settings.restaurantName}`,
      'snacks-items': `Snacks & Sides – ${settings.restaurantName}`,
      menu: `Full Menu & Deals – ${settings.restaurantName}`,
      about: `About Us – ${settings.restaurantName}`,
      contact: `Contact & Location – ${settings.restaurantName}`,
    };

    document.title = tabTitles[currentTab] || `${settings.restaurantName} – ${settings.tagline}`;
  }, [currentTab, settings]);

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated()) {
      setIsAdminView(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setShowAdminLogin(false);
    setIsAdminView(true);
  };

  const handleExitAdmin = () => {
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if currentTab is a category slug
  const matchedCategory = categories.find(c => c.slug === currentTab);

  if (isAdminView) {
    return (
      <AdminLayout
        products={products}
        categories={categories}
        orders={orders}
        settings={settings}
        reviews={reviews}
        onExitAdmin={handleExitAdmin}
      />
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
        {/* Navigation Top Bar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          settings={settings}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Main Routed Content */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <HomePage
              products={products}
              categories={categories}
              settings={settings}
              reviews={reviews}
              onNavigate={setCurrentTab}
            />
          )}

          {matchedCategory && (
            <CategoryPage
              category={matchedCategory}
              products={products}
              settings={settings}
              onBackToHome={() => setCurrentTab('home')}
              onNavigateCategory={slug => setCurrentTab(slug)}
              allCategories={categories}
            />
          )}

          {currentTab === 'menu' && (
            <MenuPage
              products={products}
              categories={categories}
              settings={settings}
            />
          )}

          {currentTab === 'about' && (
            <AboutPage
              settings={settings}
              onNavigateMenu={() => setCurrentTab('menu')}
            />
          )}

          {currentTab === 'contact' && (
            <ContactPage settings={settings} />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          settings={settings}
          setCurrentTab={setCurrentTab}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Order Placed Confirmation */}
        <OrderConfirmationModal />

        {/* Floating WhatsApp Action Button */}
        <WhatsAppButton />

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <AdminLogin
            onSuccess={handleAdminLoginSuccess}
            onCancel={() => setShowAdminLogin(false)}
          />
        )}
      </div>
    </CartProvider>
  );
}
