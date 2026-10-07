/**
 * Food Expert - Tracking & Analytics Configuration
 * Configure public measurement IDs here. Never place private/secret API keys here.
 */

export const tracking = {
  enabled: false, // Set to true once IDs are supplied
  googleAnalyticsId: "", // e.g. "G-XXXXXXXXXX"
  googleTagManagerId: "", // e.g. "GTM-XXXXXXX"
  metaPixelId: "", // e.g. "123456789012345"

  /**
   * Safe tracking event dispatcher (no-op if disabled or unconfigured)
   */
  trackEvent: (eventName, params = {}) => {
    if (typeof window === "undefined") return;

    // Google Analytics (gtag)
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }

    // Meta Pixel (fbq)
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, params);
    }
  }
};
