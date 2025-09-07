import React from 'react';
import { Crop } from '../types';
import Icon from './Icon';

interface CropCardProps {
  crop: Crop;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 flex flex-col">
      <img src={crop.imageUrl} alt={crop.name} className="w-full h-32 object-cover" />
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-bold text-slate-800">{crop.name}</h3>
        <div className="flex flex-wrap gap-1 my-1">
          <p className="text-xs text-green-800 bg-green-100 font-medium inline-block px-2 py-0.5 rounded-full">{crop.type}</p>
          <p className="text-xs text-sky-800 bg-sky-100 font-medium inline-block px-2 py-0.5 rounded-full">{crop.culturalPractice}</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center border-t pt-3">
          <div>
              <p className="text-sm text-slate-500">Price/kg</p>
              <p className="font-bold text-green-700 text-lg">₹{crop.pricePerKg}</p>
          </div>
          <div>
              <p className="text-sm text-slate-500">Stock</p>
              <p className="font-bold text-slate-800 text-lg">{crop.stockKg} kg</p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-3 flex justify-end gap-2 bg-slate-50 border-t">
        <button onClick={() => onEdit(crop.id)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
          <Icon name="edit" className="w-5 h-5" />
        </button>
        <button onClick={() => onDelete(crop.id)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors">
          <Icon name="delete" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CropCard;