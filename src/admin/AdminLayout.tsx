import React, { useState } from 'react';
import {
  Product,
  Category,
  Order,
  RestaurantSettings,
  CustomerReview,
} from '../types';
import { adminLogout } from '../services/dataService';
import { AdminOverview } from './tabs/AdminOverview';
import { AdminProducts } from './tabs/AdminProducts';
import { AdminCategories } from './tabs/AdminCategories';
import { AdminOrders } from './tabs/AdminOrders';
import { AdminHomepage } from './tabs/AdminHomepage';
import { AdminSettings } from './tabs/AdminSettings';
import { AdminReviews } from './tabs/AdminReviews';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  ShoppingBag,
  Palette,
  Settings as SettingsIcon,
  Star,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

interface AdminLayoutProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: RestaurantSettings;
  reviews: CustomerReview[];
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  products,
  categories,
  orders,
  settings,
  reviews,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  // Lock scroll when mobile sidebar is open
  React.useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    {
      id: 'products',
      label: 'Products Management',
      icon: UtensilsCrossed,
      badge: products.length,
    },
    { id: 'categories', label: 'Categories', icon: Layers, badge: categories.length },
    {
      id: 'orders',
      label: 'Orders Queue',
      icon: ShoppingBag,
      alertBadge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
    },
    { id: 'homepage', label: 'Homepage Content', icon: Palette },
    { id: 'settings', label: 'Website Settings', icon: SettingsIcon },
    { id: 'reviews', label: 'Customer Reviews', icon: Star, badge: reviews.length },
  ];

  const handleLogout = () => {
    adminLogout();
    onExitAdmin();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-neutral-900 border-b border-neutral-800 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-sm">
            FE
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">{settings.restaurantName}</h2>
            <span className="text-[10px] text-amber-400 font-semibold uppercase">Admin Panel</span>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close admin menu" : "Open admin menu"}
          className="p-2 text-neutral-300 hover:text-white rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
        >
          {sidebarOpen ? <X className="h-6 w-6 text-amber-400" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-full md:h-screen w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between transition-transform duration-200 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col space-y-6">
          {/* Logo Branding */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-base shadow-sm">
                FE
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  Food Expert
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Admin Console</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80 active:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.alertBadge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-red-500 text-white animate-pulse">
                      {item.alertBadge}
                    </span>
                  )}

                  {!item.alertBadge && item.badge !== undefined && (
                    <span
                      className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-neutral-950/20 text-neutral-950' : 'text-neutral-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800/80 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold rounded-xl transition-colors min-h-[44px] active:scale-[0.99]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Live Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-red-400 hover:bg-red-500/10 text-xs font-semibold rounded-xl transition-colors min-h-[44px] active:scale-[0.99]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl overflow-y-auto">
        {activeTab === 'overview' && (
          <AdminOverview
            products={products}
            categories={categories}
            orders={orders}
            settings={settings}
            onNavigateTab={setActiveTab}
          />
        )}
        {activeTab === 'products' && (
          <AdminProducts
            products={products}
            categories={categories}
            settings={settings}
          />
        )}
        {activeTab === 'categories' && (
          <AdminCategories categories={categories} products={products} />
        )}
        {activeTab === 'orders' && (
          <AdminOrders orders={orders} settings={settings} />
        )}
        {activeTab === 'homepage' && (
          <AdminHomepage settings={settings} products={products} />
        )}
        {activeTab === 'settings' && <AdminSettings settings={settings} />}
        {activeTab === 'reviews' && <AdminReviews reviews={reviews} />}
      </main>
    </div>
  );
};
