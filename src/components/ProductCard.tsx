import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import { getSettings } from '../services/dataService';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName }) => {
  const { addItem, quickOrder } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const settings = getSettings();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.available) return;
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.available) return;
    quickOrder(product);
  };

  const hasOffer = product.offerPrice && product.offerPrice > 0 && product.offerPrice < product.price;
  const activePrice = hasOffer ? product.offerPrice! : product.price;

  return (
    <article
      className="group relative flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40"
    >
      {/* Media container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              !product.available ? 'grayscale opacity-50' : ''
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-neutral-500 text-sm">
            <span>{product.name}</span>
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {hasOffer && (
            <span className="bg-amber-500 text-neutral-950 font-bold text-xs px-2.5 py-0.5 rounded tracking-wide shadow-sm">
              {product.discount ? `${product.discount}% OFF` : 'SPECIAL OFFER'}
            </span>
          )}
          {product.featured && (
            <span className="bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 text-amber-400 font-medium text-[11px] px-2 py-0.5 rounded">
              Chef's Pick
            </span>
          )}
        </div>

        {!product.available && (
          <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-neutral-800 text-neutral-300 text-xs font-semibold px-3 py-1 rounded border border-neutral-700">
              Sold Out Today
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        {/* Category & Availability metadata (Unboxed, typographic separators) */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
          {categoryName && <span className="truncate max-w-[120px]">{categoryName}</span>}
          {categoryName && <span aria-hidden="true">·</span>}
          <span className={product.available ? 'text-emerald-400' : 'text-neutral-500'}>
            {product.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price & Actions Row */}
        <div className="mt-3 sm:mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2">
          {/* Price */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-white tabular-nums whitespace-nowrap">
                {settings.currency}{activePrice.toFixed(2)}
              </span>
              {hasOffer && (
                <span className="text-xs text-neutral-500 line-through tabular-nums whitespace-nowrap">
                  {settings.currency}{product.price.toFixed(2)}
                </span>
              )}
            </div>
            {hasOffer && (
              <span className="text-[10px] sm:text-[11px] text-amber-400 font-medium whitespace-nowrap">
                Save {settings.currency}{(product.price - activePrice).toFixed(2)}
              </span>
            )}
          </div>

          {/* Action Buttons with 44px touch targets */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.available}
              aria-label={`Add ${product.name} to cart`}
              className={`p-2.5 rounded-lg border transition-all text-xs font-medium min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 ${
                justAdded
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
              title="Add to order"
            >
              {justAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={handleQuickOrder}
              disabled={!product.available}
              className="px-3 sm:px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm min-h-[44px] justify-center active:scale-95"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
