
import React, { useState } from 'react';
import type { Order } from '../types';
import Button from './common/Button';

interface AddReviewModalProps {
  order: Order;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const StarInput: React.FC<{ rating: number; onRate: (rating: number) => void }> = ({ rating, onRate }) => (
    <div className="flex justify-center space-x-2">
        {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <button key={starValue} onClick={() => onRate(starValue)} type="button">
                    <svg className={`w-10 h-10 transition-colors ${starValue <= rating ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-200'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            )
        })}
    </div>
);


const AddReviewModal: React.FC<AddReviewModalProps> = ({ order, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
    } else {
      alert('Please provide a rating.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="text-center">
            <h2 className="text-2xl font-bold">Leave a Review</h2>
            <p className="text-textSecondary">for your order of {order.cropName}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-center text-md font-medium text-textSecondary mb-2">Your Rating</label>
                <StarInput rating={rating} onRate={setRating} />
            </div>
            <div>
                 <label htmlFor="comment" className="block text-md font-medium text-textSecondary mb-2">Comment (Optional)</label>
                 <textarea
                    id="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg text-md bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="Tell others about your experience..."
                 />
            </div>
            <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={onClose} fullWidth>Cancel</Button>
                <Button type="submit" fullWidth disabled={rating === 0}>Submit Review</Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
