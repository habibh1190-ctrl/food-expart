import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  totalCount?: number;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  totalCount,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 touch-scroll-x -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors min-h-[44px] shrink-0 flex items-center active:scale-95 ${
          selectedCategory === 'all'
            ? 'bg-amber-500 text-neutral-950 shadow-sm font-black'
            : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800 active:bg-neutral-800'
        }`}
      >
        All Items {totalCount !== undefined ? `(${totalCount})` : ''}
      </button>

      {categories.filter(c => c.active).map(cat => {
        const isSelected = selectedCategory === cat.id || selectedCategory === cat.slug;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors min-h-[44px] shrink-0 flex items-center active:scale-95 ${
              isSelected
                ? 'bg-amber-500 text-neutral-950 shadow-sm font-black'
                : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800 active:bg-neutral-800'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};
