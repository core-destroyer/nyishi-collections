import React from 'react';
import { CATEGORIES } from '../data/products';

export const CategoryPills = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-6 border-b border-[#EBD9B0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-900">
            Browse by Craft & Form
          </h2>
          <span className="text-xs text-charcoal-600 hidden sm:inline">
            Curated tribal jewelry & bell metal art
          </span>
        </div>

        {/* Scrollable Horizontal Pills for Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all shadow-sm flex-shrink-0 ${
                  isActive
                    ? 'bg-[#231F1C] text-[#DFBE7D] shadow-md ring-2 ring-[#C5A059]'
                    : 'bg-white text-charcoal-700 border border-[#EBD9B0] hover:border-[#C5A059] hover:text-[#C5A059]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
