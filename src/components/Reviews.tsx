import React from 'react';
import { CustomerReview } from '../types';
import { Star } from 'lucide-react';

interface ReviewsProps {
  reviews: CustomerReview[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const activeReviews = reviews.filter(r => r.active);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400" />
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Loved By Over 10,000+ Foodies
        </h2>
        <p className="text-sm text-neutral-400 mt-2">
          Read real reviews from our dining and delivery customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeReviews.map(review => (
          <div
            key={review.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                "{review.review}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="font-bold text-white">{review.customerName}</span>
              <span className="text-neutral-500">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
