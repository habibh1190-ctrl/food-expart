import React, { useState } from 'react';
import { Order, OrderStatus, RestaurantSettings } from '../../types';
import { updateOrderStatus } from '../../services/dataService';
import { Search, ShoppingBag, MessageSquare, Clock, MapPin, Phone, User, CheckCircle2 } from 'lucide-react';

interface AdminOrdersProps {
  orders: Order[];
  settings: RestaurantSettings;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, settings }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Order Management
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Track customer orders, update kitchen preparation stages, and communicate via WhatsApp.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-neutral-900 border border-neutral-800 p-3.5 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by order #, customer name, or phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto touch-scroll-x pb-1">
          {['all', 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-colors min-h-[40px] flex items-center shrink-0 active:scale-95 ${
                statusFilter === status
                  ? 'bg-amber-500 text-neutral-950 shadow-sm font-black'
                  : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800 active:bg-neutral-800'
              }`}
            >
              {status} ({orders.filter(o => (status === 'all' ? true : o.status === status)).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="py-16 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800">
          <ShoppingBag className="mx-auto h-10 w-10 text-neutral-600 mb-2" />
          <p className="text-sm font-bold text-white">No orders found</p>
          <p className="text-xs text-neutral-500 mt-1">No orders matched the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');

            const waMessage = `Hello ${order.customerName}, this is ${settings.restaurantName} regarding your order #${order.orderNumber}.
Current Status: ${order.status.toUpperCase()}
Total: ${settings.currency}${order.total.toFixed(2)}
Please let us know if you need any adjustments.`;

            return (
              <div
                key={order.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-neutral-700 transition-colors"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-extrabold text-amber-400">
                      #{order.orderNumber}
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300">
                      {order.deliveryType}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400">Status:</span>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none ${
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
                  </div>
                </div>

                {/* Details Grid: Customer Info & Items List */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Customer Info */}
                  <div className="lg:col-span-5 space-y-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-amber-500 shrink-0" />
                      <span className="font-bold text-white text-sm">{order.customerName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>{order.customerPhone}</span>
                      </div>
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-[11px] transition-colors"
                        >
                          <MessageSquare className="h-3 w-3" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>

                    {order.deliveryAddress && (
                      <div className="flex items-start gap-2 pt-1 border-t border-neutral-900">
                        <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{order.deliveryAddress}</span>
                      </div>
                    )}

                    {order.notes && (
                      <div className="pt-2 text-amber-400/90 italic border-t border-neutral-900">
                        Note: "{order.notes}"
                      </div>
                    )}
                  </div>

                  {/* Right: Items Table & Total */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-800/60"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-400 font-mono">
                              {item.quantity}x
                            </span>
                            <span className="text-white font-medium">{item.name}</span>
                          </div>
                          <span className="text-neutral-300 font-semibold tabular-nums">
                            {settings.currency}{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <div className="text-neutral-400">
                        <span>Subtotal: {settings.currency}{order.subtotal.toFixed(2)}</span>
                        {order.deliveryFee > 0 && (
                          <span className="ml-3">
                            Delivery: {settings.currency}{order.deliveryFee.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-neutral-400 mr-2">Grand Total:</span>
                        <span className="text-base font-black text-amber-400 tabular-nums">
                          {settings.currency}{order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
