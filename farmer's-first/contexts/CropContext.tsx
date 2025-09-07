import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Crop, CropType, CulturalPractice } from '../types';

// Mock data with reliable image URLs
const mockCrops: Crop[] = [
  { id: '1', name: 'Red Tomatoes', type: CropType.Vegetable, culturalPractice: CulturalPractice.Organic, pricePerKg: 40, stockKg: 150, imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Golden Wheat', type: CropType.Grain, culturalPractice: CulturalPractice.Conventional, pricePerKg: 25, stockKg: 1200, imageUrl: 'https://images.pexels.com/photos/247597/pexels-photo-247597.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', name: 'Granny Smith Apples', type: CropType.Fruit, culturalPractice: CulturalPractice.Hybrid, pricePerKg: 120, stockKg: 200, imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '4', name: 'Russet Potatoes', type: CropType.Vegetable, culturalPractice: CulturalPractice.Conventional, pricePerKg: 20, stockKg: 500, imageUrl: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '5', name: 'Red Onions', type: CropType.Vegetable, culturalPractice: CulturalPractice.Organic, pricePerKg: 30, stockKg: 450, imageUrl: 'https://images.pexels.com/photos/1759978/pexels-photo-1759978.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '6', name: 'Kent Mangoes', type: CropType.Fruit, culturalPractice: CulturalPractice.Organic, pricePerKg: 80, stockKg: 300, imageUrl: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=400' },
];


interface CropContextType {
  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (crop: Crop) => void;
  deleteCrop: (id: string) => void;
}

export const CropContext = createContext<CropContextType | null>(null);

export const CropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [crops, setCrops] = useState<Crop[]>([]);

  useEffect(() => {
    try {
      const storedCrops = localStorage.getItem('farmerCrops');
      if (storedCrops) {
        setCrops(JSON.parse(storedCrops));
      } else {
        // Initialize with mock data if nothing is in localStorage
        setCrops(mockCrops);
        localStorage.setItem('farmerCrops', JSON.stringify(mockCrops));
      }
    } catch (error) {
      console.error("Failed to load crops from localStorage", error);
      setCrops(mockCrops);
    }
  }, []);

  const saveCrops = (updatedCrops: Crop[]) => {
      setCrops(updatedCrops);
      localStorage.setItem('farmerCrops', JSON.stringify(updatedCrops));
  }

  const addCrop = useCallback((cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: new Date().toISOString(), // simple unique id
    };
    saveCrops([ ...crops, newCrop]);
  }, [crops]);

  const updateCrop = useCallback((updatedCrop: Crop) => {
    const updatedCrops = crops.map(c => c.id === updatedCrop.id ? updatedCrop : c);
    saveCrops(updatedCrops);
  }, [crops]);

  const deleteCrop = useCallback((id: string) => {
    const updatedCrops = crops.filter(c => c.id !== id);
    saveCrops(updatedCrops);
  }, [crops]);

  return (
    <CropContext.Provider value={{ crops, addCrop, updateCrop, deleteCrop }}>
      {children}
    </CropContext.Provider>
  );
};
