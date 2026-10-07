import React, { useState } from 'react';
import { CustomerReview } from '../../types';
import { saveReview, deleteReview } from '../../services/dataService';
import { Plus, Edit2, Trash2, Star, X, Check } from 'lucide-react';

interface AdminReviewsProps {
  reviews: CustomerReview[];
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<CustomerReview | null>(null);

  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [formDate, setFormDate] = useState('Recently');
  const [formActive, setFormActive] = useState(true);

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormName('');
    setFormRating(5);
    setFormText('');
    setFormDate('Just now');
    setFormActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r: CustomerReview) => {
    setEditingReview(r);
    setFormName(r.customerName);
    setFormRating(r.rating);
    setFormText(r.review);
    setFormDate(r.date);
    setFormActive(r.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) return;

    const reviewData: CustomerReview = {
      id: editingReview ? editingReview.id : `rev-${Date.now()}`,
      customerName: formName.trim(),
      rating: Number(formRating),
      review: formText.trim(),
      date: formDate.trim() || 'Recently',
      verified: true,
      active: formActive,
    };

    saveReview(reviewData);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete review from "${name}"?`)) {
      deleteReview(id);
    }
  };

  const handleToggleActive = (r: CustomerReview) => {
    saveReview({ ...r, active: !r.active });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Customer Reviews Management
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Highlight real diner experiences and testimonials shown on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleActive(rev)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                    rev.active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {rev.active ? 'Visible' : 'Hidden'}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                "{rev.review}"
              </p>

              <div className="pt-2 text-xs flex items-center justify-between text-neutral-400 border-t border-neutral-800/80">
                <span className="font-bold text-white">{rev.customerName}</span>
                <span>{rev.date}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(rev)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(rev.id, rev.customerName)}
                className="p-1.5 bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-lg text-xs transition-colors"
                title="Delete Review"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
              <h3 className="text-lg font-bold text-white">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Jessica Thompson"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Rating (Stars)
                  </label>
                  <select
                    value={formRating}
                    onChange={e => setFormRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Date / Timeframe
                  </label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    placeholder="e.g. 3 days ago"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Review Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formText}
                  onChange={e => setFormText(e.target.value)}
                  placeholder="What did they love about their meal?"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formActive}
                  onChange={e => setFormActive(e.target.checked)}
                  className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-0 h-4 w-4"
                />
                <span className="text-xs font-semibold text-neutral-200">Active (Visible on website)</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md"
                >
                  {editingReview ? 'Save Changes' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
