import React from 'react';
import type { Review } from '../../types';
import StarRating from './StarRating';

interface ReviewListProps {
  reviews?: Review[];
}

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <div className="py-4 border-b border-slate-200 last:border-b-0">
    <div className="flex justify-between items-center mb-1">
      <h5 className="font-bold text-textPrimary">{review.reviewerName}</h5>
      <StarRating rating={review.rating} />
    </div>
    <p className="text-textSecondary italic">"{review.comment}"</p>
    <p className="text-right text-xs text-slate-400 mt-2">{review.date}</p>
  </div>
);

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 px-4 bg-slate-100 rounded-lg">
        <p className="text-textSecondary">No reviews yet for this product.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface p-4 rounded-lg border border-slate-200">
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;