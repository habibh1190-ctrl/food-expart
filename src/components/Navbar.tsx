import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Shield, Phone, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RestaurantSettings } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  settings: RestaurantSettings;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  settings,
  onOpenAdmin,
}) => {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'bucket-offer', label: 'Bucket Offer' },
    { id: 'juice-items', label: 'Juice Items' },
    { id: 'snacks-items', label: 'Snacks Items' },
    { id: 'menu', label: 'Full Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 transition-colors">
      {/* Optional Promotional Announcement Banner */}
      {settings.bannerPromoEnabled && settings.bannerPromoText && !bannerDismissed && (
        <div className="bg-amber-500 text-neutral-950 px-3 sm:px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 mx-auto truncate px-1">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{settings.bannerPromoText}</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss banner"
            className="hover:opacity-75 p-1 text-neutral-900 min-h-[32px] min-w-[32px] flex items-center justify-center shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar: 3 Zones Contract */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Wordmark & Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group flex items-center gap-2 sm:gap-2.5 focus:outline-none min-h-[44px] shrink-0"
          aria-label={`${settings.restaurantName} - Go to homepage`}
        >
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black text-sm sm:text-base tracking-tighter shadow-md shrink-0">
            FE
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors truncate max-w-[125px] xs:max-w-[175px] sm:max-w-none">
              {settings.restaurantName}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium hidden sm:block truncate">
              {settings.tagline}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navLinks.map(link => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 text-sm tracking-normal transition-colors relative whitespace-nowrap min-h-[40px] flex items-center ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Cart Button + Order Now + Hamburger) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Call icon on desktop */}
          {settings.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 min-h-[40px]"
              title="Call restaurant"
            >
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              <span>{settings.phone}</span>
            </a>
          )}

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            aria-label={`View Order Cart (${totalItems} items)`}
            className="relative p-2 sm:p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition-all flex items-center gap-1.5 sm:gap-2 min-h-[44px] min-w-[44px] justify-center active:scale-95"
          >
            <ShoppingBag className="h-5 w-5 text-amber-400 shrink-0" />
            <span className="hidden md:inline text-xs font-semibold">Cart</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-amber-500 text-neutral-950 rounded-full tabular-nums min-w-[18px]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Order Now CTA */}
          <button
            onClick={() => {
              if (currentTab === 'menu') {
                openCart();
              } else {
                handleNavClick('menu');
              }
            }}
            className="px-2.5 xs:px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap shadow-sm min-h-[44px] flex items-center justify-center active:scale-95"
          >
            Order Now
          </button>

          {/* Admin Portal Entry (visible on tablets/desktop, in mobile drawer on small screens) */}
          <button
            onClick={onOpenAdmin}
            aria-label="Admin Portal"
            className="hidden md:flex p-2 text-neutral-500 hover:text-amber-400 hover:bg-neutral-900 rounded-lg transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
            title="Admin Dashboard"
          >
            <Shield className="h-4 w-4" />
          </button>

          {/* Mobile Hamburger Toggle with 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 text-neutral-200 hover:text-white rounded-lg focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-amber-400" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 sm:top-20 bg-black/75 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="relative z-40 lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map(link => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors min-h-[48px] flex items-center ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20'
                      : 'text-neutral-200 hover:bg-neutral-900 hover:text-white active:bg-neutral-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl font-bold text-sm flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.99] shadow-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>View Cart ({totalItems} items)</span>
            </button>

            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Phone className="h-3.5 w-3.5 text-amber-500" />
                <span>Call Restaurant: {settings.phone}</span>
              </a>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 text-neutral-400 hover:text-white rounded-xl text-xs flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

