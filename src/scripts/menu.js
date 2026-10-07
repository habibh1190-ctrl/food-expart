/**
 * Food Expert - Menu Filtering & Search Logic
 */

export function filterProducts(products, { category = 'all', query = '', sortBy = 'featured', onlyAvailable = false }) {
  return products
    .filter(product => {
      // Category filter
      if (category !== 'all' && product.category !== category) {
        return false;
      }

      // Availability filter
      if (onlyAvailable && !product.available) {
        return false;
      }

      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const priceA = a.offerPrice && a.offerPrice > 0 ? a.offerPrice : a.price;
      const priceB = b.offerPrice && b.offerPrice > 0 ? b.offerPrice : b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.displayOrder || 0) - (b.displayOrder || 0);
    });
}
