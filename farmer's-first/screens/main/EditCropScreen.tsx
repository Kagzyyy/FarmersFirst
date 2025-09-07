import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Crop, CropType, CulturalPractice } from '../../types';
import Icon from '../../components/Icon';
import { getRecommendedPrice } from '../../utils/priceRecommender';

interface EditCropScreenProps {
    crop: Crop;
    onUpdate: (crop: Crop) => void;
    onCancel: () => void;
}

const EditCropScreen: React.FC<EditCropScreenProps> = ({ crop, onUpdate, onCancel }) => {
    const [cropName, setCropName] = useState(crop.name);
    const [cropType, setCropType] = useState<CropType>(crop.type);
    const [culturalPractice, setCulturalPractice] = useState<CulturalPractice>(crop.culturalPractice);
    const [price, setPrice] = useState(crop.pricePerKg.toString());
    const [stock, setStock] = useState(crop.stockKg.toString());
    const [imagePreview, setImagePreview] = useState<string | null>(crop.imageUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedPrice, setRecommendedPrice] = useState<number | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGetRecommendation = () => {
        if (!cropName.trim()) return;
        const price = getRecommendedPrice(cropName, culturalPractice);
        setRecommendedPrice(price);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const updatedCrop: Crop = {
            ...crop,
            name: cropName,
            type: cropType,
            culturalPractice: culturalPractice,
            pricePerKg: parseFloat(price) || 0,
            stockKg: parseInt(stock, 10) || 0,
            imageUrl: imagePreview || crop.imageUrl,
        };
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onUpdate(updatedCrop);
        }, 1000);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Crop Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center">
                    <label htmlFor="crop-image" className="cursor-pointer">
                        <div className="w-32 h-32 bg-stone-200 rounded-lg flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-300">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Crop preview" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <div className="text-center">
                                    <Icon name="camera" className="w-8 h-8 mx-auto" />
                                    <span className="text-sm">Upload Image</span>
                                </div>
                            )}
                        </div>
                    </label>
                    <input id="crop-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
                
                <Input label="Crop Name" id="cropName" type="text" value={cropName} onChange={e => setCropName(e.target.value)} required />
                
                <div>
                    <label htmlFor="cropType" className="block text-sm font-medium text-slate-700 mb-1">Crop Type</label>
                    <select id="cropType" value={cropType} onChange={e => setCropType(e.target.value as CropType)} className="block w-full text-lg border-slate-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500">
                        {Object.values(CropType).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="culturalPractice" className="block text-sm font-medium text-slate-700 mb-1">Cultural Practice</label>
                    <select id="culturalPractice" value={culturalPractice} onChange={e => setCulturalPractice(e.target.value as CulturalPractice)} className="block w-full text-lg border-slate-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500">
                        {Object.values(CulturalPractice).map(practice => (
                            <option key={practice} value={practice}>{practice}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-2">
                    <Button type="button" variant="secondary" onClick={handleGetRecommendation} disabled={!cropName.trim()}>
                        Get Recommended Price
                    </Button>
                </div>

                <div>
                    <Input label="Price per kg (₹)" id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                    {recommendedPrice !== null && (
                        <p className="text-sm text-green-700 text-center mt-1">
                            (Recommended: ₹{recommendedPrice})
                        </p>
                    )}
                </div>

                <Input label="Stock quantity (kg)" id="stock" type="number" value={stock} onChange={e => setStock(e.target.value)} required />

                <div className="pt-4 space-y-2">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditCropScreen;