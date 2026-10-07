import React, { useState } from 'react';
import { Category, Product } from '../../types';
import { saveCategory, deleteCategory } from '../../services/dataService';
import { Plus, Edit2, Trash2, X, Check, ArrowUp, ArrowDown } from 'lucide-react';

interface AdminCategoriesProps {
  categories: Category[];
  products: Product[];
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({ categories, products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [formOrder, setFormOrder] = useState(1);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormName('');
    setFormSlug('');
    setFormDesc('');
    setFormImage('/images/products/bucket_crispy_feast.jpg');
    setFormActive(true);
    setFormOrder(categories.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCategory(c);
    setFormName(c.name);
    setFormSlug(c.slug);
    setFormDesc(c.description || '');
    setFormImage(c.image || '');
    setFormActive(c.active);
    setFormOrder(c.displayOrder);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const slug =
      formSlug.trim() ||
      formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const categoryData: Category = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: formName.trim(),
      slug,
      description: formDesc.trim(),
      image: formImage.trim(),
      active: formActive,
      displayOrder: Number(formOrder),
    };

    saveCategory(categoryData);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    const productCount = products.filter(p => p.categoryId === id).length;
    if (productCount > 0) {
      if (!window.confirm(`Warning: "${name}" has ${productCount} assigned products. Deleting it will leave those dishes uncategorized. Proceed?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Delete category "${name}"?`)) return;
    }
    deleteCategory(id);
  };

  const handleToggleActive = (c: Category) => {
    saveCategory({ ...c, active: !c.active });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Category Management
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Organize food categories, add new seasonal sections, and toggle display states.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => {
          const itemCount = products.filter(p => p.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-neutral-500">
                      slug: /{cat.slug}
                    </span>
                    <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  </div>

                  <button
                    onClick={() => handleToggleActive(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                      cat.active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {cat.active ? 'Active' : 'Disabled'}
                  </button>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {cat.description || 'No description set.'}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800/80">
                  <span>Assigned Items: <strong className="text-white">{itemCount}</strong></span>
                  <span>Order index: <strong className="text-white">{cat.displayOrder}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(cat)}
                  className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[38px] active:scale-95"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-xl text-xs transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95"
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
              <h3 className="text-lg font-bold text-white">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Gourmet Desserts"
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[46px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  URL Slug (Optional, auto-generated if empty)
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={e => setFormSlug(e.target.value)}
                  placeholder="e.g. gourmet-desserts"
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-xs min-h-[46px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Appears on category header and navigation cards..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[64px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Header Image URL / Asset
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-xs min-h-[46px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={e => setFormActive(e.target.checked)}
                    className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 h-4 w-4"
                  />
                  <span className="text-xs font-semibold text-neutral-200">Active / Visible</span>
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={e => setFormOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-xs text-white min-h-[44px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs rounded-xl min-h-[44px] active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md min-h-[44px] active:scale-95"
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
