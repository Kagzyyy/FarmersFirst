import React from 'react';
import type { Crop } from '../types';
import StarRating from './common/StarRating';

interface CropCardProps {
  crop: Crop;
  onClick: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onClick }) => {
  return (
    <div 
      className="bg-surface rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow transform hover:-translate-y-1"
      onClick={onClick}
    >
      <img src={crop.imageUrl} alt={crop.name} className="w-full h-24 object-cover" />
      <div className="p-3">
        <h3 className="text-lg font-bold text-textPrimary text-center truncate">{crop.name}</h3>
        
        <div className="flex justify-around items-center my-2 text-center">
            <div>
                <p className="text-xs text-textSecondary uppercase tracking-wider">Stock</p>
                <p className="text-sm font-semibold text-textPrimary">{crop.stockKg.toLocaleString()} kg</p>
            </div>
            <div className="h-8 border-l border-slate-200"></div>
            <div>
                <p className="text-xs text-textSecondary uppercase tracking-wider">Price</p>
                <p className="text-sm font-semibold text-primary">₹{crop.pricePerKg}/kg</p>
            </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
          <p className="text-sm text-textSecondary truncate">{crop.sellerName}</p>
          <div className="flex items-center space-x-1">
            <StarRating rating={crop.rating} />
            <span className="text-sm font-bold text-slate-600">{crop.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCard;