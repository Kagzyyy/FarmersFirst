import React from 'react';
import type { Crop } from '../types';
import Header from './common/Header';
import Button from './common/Button';
import StarRating from './common/StarRating';
import ReviewList from './common/ReviewList';

interface CropDetailProps {
  crop: Crop;
  onBack: () => void;
  onBuyNow: () => void;
}

const CropDetail: React.FC<CropDetailProps> = ({ crop, onBack, onBuyNow }) => {
  return (
    <div className="flex flex-col h-full">
      <Header title={crop.name} onBack={onBack} />
      <div className="flex-grow overflow-y-auto">
        <img src={crop.imageUrl} alt={crop.name} className="w-full h-48 object-cover" />
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-textPrimary">{crop.name}</h2>
              <p className="text-lg text-textSecondary">from {crop.sellerName}</p>
            </div>
            <div className="text-right">
                <p className="text-3xl font-bold text-primary">₹{crop.pricePerKg}</p>
                <p className="text-md text-textSecondary">per kg</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <StarRating rating={crop.rating} />
            <span className="text-lg font-bold text-slate-700">{crop.rating.toFixed(1)} rating</span>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-textPrimary">Stock Available</h4>
            <p className="text-2xl text-primary font-bold">{crop.stockKg.toLocaleString()} kg</p>
          </div>

          <div>
            <h4 className="font-bold text-lg text-textPrimary mb-2">Description</h4>
            <p className="text-textSecondary leading-relaxed">{crop.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-lg text-textPrimary mb-2">Vendor Reviews</h4>
            <ReviewList reviews={crop.reviews} />
          </div>
        </div>
      </div>
      <div className="p-4 bg-surface border-t">
        <Button onClick={onBuyNow} fullWidth>Buy Now</Button>
      </div>
    </div>
  );
};

export default CropDetail;