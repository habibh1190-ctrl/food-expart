import React from 'react';
import { Product, Category, Order, RestaurantSettings, OrderStatus } from '../../types';
import { updateOrderStatus } from '../../services/dataService';
import { Utensils, Layers, ShoppingBag, DollarSign, Clock, MessageSquare, Check, ArrowRight } from 'lucide-react';

interface AdminOverviewProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: RestaurantSettings;
  onNavigateTab: (tabId: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  products,
  categories,
  orders,
  settings,
  onNavigateTab,
}) => {
  const activeProducts = products.filter(p => p.available);
  const featuredProducts = products.filter(p => p.featured);
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending');

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
  };

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Restaurant Overview
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Welcome to the {settings.restaurantName} operations and menu management system.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Products */}
        <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Products</span>
            <Utensils className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tabular-nums">{products.length}</span>
            <span className="text-xs text-emerald-400 font-medium">({activeProducts.length} active)</span>
          </div>
          <p className="text-[11px] text-neutral-500">Across {categories.length} categories</p>
        </div>

        {/* Categories */}
        <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Categories</span>
            <Layers className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tabular-nums">
              {categories.filter(c => c.active).length}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500">Buckets, Juices, Snacks & more</p>
        </div>

        {/* Orders */}
        <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Orders Received</span>
            <ShoppingBag className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tabular-nums">{orders.length}</span>
            {pendingOrders.length > 0 && (
              <span className="text-xs text-amber-400 font-bold">({pendingOrders.length} pending)</span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500">Online & WhatsApp orders</p>
        </div>

        {/* Revenue */}
        <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Sales Volume</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tabular-nums">
              {settings.currency}{totalRevenue.toFixed(2)}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500">Excludes cancelled orders</p>
        </div>
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateTab('products')}
          className="p-4 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-xl text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              Manage Food Menu
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">Add dishes, change prices & discounts</p>
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => onNavigateTab('orders')}
          className="p-4 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-xl text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              View All Orders
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">Kitchen prep status & delivery tracking</p>
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => onNavigateTab('homepage')}
          className="p-4 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 rounded-xl text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              Edit Homepage Content
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">Headline, promo banners & hero image</p>
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Customer Orders</h3>
            <p className="text-xs text-neutral-400">Live order queue from online and WhatsApp checkout</p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-amber-400 hover:underline"
          >
            View all ({orders.length})
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 text-center text-sm text-neutral-500">
            No orders received yet.
          </div>
        ) : (
          <div className="divide-y divide-neutral-800 overflow-x-auto">
            {orders.slice(0, 5).map(order => {
              const cleanCustomerPhone = order.customerPhone.replace(/[^0-9]/g, '');

              return (
                <div
                  key={order.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-850 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-amber-400">
                        #{order.orderNumber}
                      </span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-sm font-bold text-white">{order.customerName}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-xs text-neutral-400 uppercase font-medium">
                        {order.deliveryType}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-1">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>

                    <div className="text-[11px] text-neutral-500 flex items-center gap-3">
                      <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>{order.customerPhone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-sm font-black text-white tabular-nums">
                      {settings.currency}{order.total.toFixed(2)}
                    </span>

                    {/* Status select */}
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                        order.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : order.status === 'confirmed'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : order.status === 'preparing'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                          : order.status === 'delivered'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    {/* WhatsApp contact icon */}
                    {cleanCustomerPhone && (
                      <a
                        href={`https://wa.me/${cleanCustomerPhone}?text=${encodeURIComponent(
                          `Hello ${order.customerName}, this is ${settings.restaurantName} regarding your order #${order.orderNumber}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                        title="Chat with customer on WhatsApp"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
