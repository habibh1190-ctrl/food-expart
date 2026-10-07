import React, { useState } from 'react';
import { Product, Category, RestaurantSettings } from '../../types';
import {
  saveProduct,
  deleteProduct,
  duplicateProduct,
} from '../../services/dataService';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Search,
  Check,
  X,
  Sparkles,
  Image as ImageIcon,
  SlidersHorizontal,
} from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  settings: RestaurantSettings;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  categories,
  settings,
}) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formOfferPrice, setFormOfferPrice] = useState<number | undefined>(undefined);
  const [formDiscount, setFormDiscount] = useState<number | undefined>(undefined);
  const [formAvailable, setFormAvailable] = useState(true);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formDisplayOrder, setFormDisplayOrder] = useState(1);

  // Quick preset images for convenience
  const PRESET_IMAGES = [
    { label: 'Crispy Feast Bucket', url: '/images/products/bucket_crispy_feast.jpg' },
    { label: 'Full Spread Table', url: '/images/banners/hero_food_expert_spread.jpg' },
    { label: 'Fresh Tropical Juice', url: '/images/products/juice_fresh_tropical.jpg' },
    { label: 'Loaded Fries & Snacks', url: '/images/products/snacks_loaded_bites.jpg' },
  ];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSlug('');
    setFormDesc('');
    setFormCategory(categories[0]?.id || 'cat-bucket-offer');
    setFormImage('/images/products/bucket_crispy_feast.jpg');
    setFormPrice(9.99);
    setFormOfferPrice(undefined);
    setFormDiscount(undefined);
    setFormAvailable(true);
    setFormFeatured(false);
    setFormDisplayOrder(products.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSlug(p.slug);
    setFormDesc(p.description);
    setFormCategory(p.categoryId);
    setFormImage(p.image);
    setFormPrice(p.price);
    setFormOfferPrice(p.offerPrice ?? undefined);
    setFormDiscount(p.discount);
    setFormAvailable(p.available);
    setFormFeatured(p.featured);
    setFormDisplayOrder(p.displayOrder);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const slug =
      formSlug.trim() ||
      formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const productData: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formName.trim(),
      slug,
      description: formDesc.trim(),
      categoryId: formCategory,
      image: formImage.trim() || '/images/products/bucket_crispy_feast.jpg',
      price: Number(formPrice),
      offerPrice: formOfferPrice && formOfferPrice > 0 ? Number(formOfferPrice) : undefined,
      discount: formDiscount && formDiscount > 0 ? Number(formDiscount) : undefined,
      available: formAvailable,
      featured: formFeatured,
      displayOrder: Number(formDisplayOrder),
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveProduct(productData);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateProduct(id);
  };

  const handleToggleAvailable = (product: Product) => {
    saveProduct({
      ...product,
      available: !product.available,
    });
  };

  const handleToggleFeatured = (product: Product) => {
    saveProduct({
      ...product,
      featured: !product.featured,
    });
  };

  const categoryMap = new Map<string, string>();
  categories.forEach(c => categoryMap.set(c.id, c.name));

  const filteredProducts = products.filter(p => {
    if (filterCategory !== 'all' && p.categoryId !== filterCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Product Management
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Add, update, discount, and manage inventory for all menu items.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-neutral-900 border border-neutral-800 p-3.5 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products by name or ingredient..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({products.filter(p => p.categoryId === c.id).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto touch-scroll-x">
          <table className="w-full min-w-[700px] text-left text-sm text-neutral-300">
            <thead className="bg-neutral-950 text-neutral-400 text-xs uppercase font-semibold border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4">Dish</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Offer Price</th>
                <th className="py-3.5 px-4 text-center">Available</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500 text-xs">
                    No products matched your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => {
                  return (
                    <tr key={product.id} className="hover:bg-neutral-850/60 transition-colors">
                      {/* Image & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="h-12 w-12 rounded-lg object-cover bg-neutral-950 shrink-0 border border-neutral-800"
                          />
                          <div className="min-w-0 max-w-xs">
                            <span className="font-bold text-white block truncate">
                              {product.name}
                            </span>
                            <span className="text-xs text-neutral-500 block truncate">
                              {product.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-xs">
                        <span className="text-neutral-300 font-medium">
                          {categoryMap.get(product.categoryId) || 'Unassigned'}
                        </span>
                      </td>

                      {/* Regular Price */}
                      <td className="py-3.5 px-4 text-xs font-semibold text-white tabular-nums">
                        {settings.currency}{product.price.toFixed(2)}
                      </td>

                      {/* Offer Price */}
                      <td className="py-3.5 px-4 text-xs tabular-nums">
                        {product.offerPrice ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-amber-400">
                              {settings.currency}{product.offerPrice.toFixed(2)}
                            </span>
                            {product.discount && (
                              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                                -{product.discount}%
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-neutral-500">—</span>
                        )}
                      </td>

                      {/* Availability Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleAvailable(product)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
                            product.available
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-neutral-800 text-neutral-500'
                          }`}
                        >
                          {product.available ? 'In Stock' : 'Sold Out'}
                        </button>
                      </td>

                      {/* Featured status toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(product)}
                          className={`p-2 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center mx-auto ${
                            product.featured
                              ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                              : 'text-neutral-600 hover:text-neutral-400'
                          }`}
                          title="Toggle Chef Pick / Featured"
                        >
                          <Sparkles className="h-4 w-4" />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(product)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95"
                            title="Edit Product"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(product.id)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95"
                            title="Duplicate Product"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Crispy Family Mega Bucket"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Ingredients, piece counts, marinade details, sides included..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Image URL & Quick Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-300">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] text-neutral-500 self-center">Quick presets:</span>
                  {PRESET_IMAGES.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormImage(preset.url)}
                      className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[11px]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-neutral-950/70 rounded-xl border border-neutral-800">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Regular Price ({settings.currency}) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Offer Price ({settings.currency}) (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formOfferPrice ?? ''}
                    onChange={e =>
                      setFormOfferPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    placeholder="e.g. 19.99"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Discount % (Badge)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={formDiscount ?? ''}
                    onChange={e =>
                      setFormDiscount(e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    placeholder="e.g. 20"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formAvailable}
                    onChange={e => setFormAvailable(e.target.checked)}
                    className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 h-4 w-4"
                  />
                  <span className="text-xs font-semibold text-neutral-200">Available / In Stock</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={e => setFormFeatured(e.target.checked)}
                    className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 h-4 w-4"
                  />
                  <span className="text-xs font-semibold text-neutral-200">Featured / Chef Pick</span>
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formDisplayOrder}
                    onChange={e => setFormDisplayOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
