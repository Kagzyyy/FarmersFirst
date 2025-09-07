import React, { useState, useContext } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { CropType, CulturalPractice, Crop } from '../../types';
import Icon from '../../components/Icon';
import Toast from '../../components/Toast';
import { CropContext } from '../../contexts/CropContext';
import { getRecommendedPrice } from '../../utils/priceRecommender';

interface AddCropScreenProps {
    onCropAdded: () => void;
}

const AddCropScreen: React.FC<AddCropScreenProps> = ({ onCropAdded }) => {
    const cropContext = useContext(CropContext);
    const [cropName, setCropName] = useState('');
    const [cropType, setCropType] = useState<CropType>(CropType.Vegetable);
    const [culturalPractice, setCulturalPractice] = useState<CulturalPractice>(CulturalPractice.Organic);
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
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
        if (!cropName.trim()) {
            setToast({ message: 'Please enter a crop name first.', type: 'error' });
            return;
        }
        const price = getRecommendedPrice(cropName, culturalPractice);
        setRecommendedPrice(price);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cropContext) {
            setToast({ message: 'Error: Crop service not available.', type: 'error' });
            return;
        }
        if (!imagePreview) {
            setToast({ message: 'Please upload an image for the crop.', type: 'error' });
            return;
        }

        setIsLoading(true);

        const newCrop: Omit<Crop, 'id'> = {
            name: cropName,
            type: cropType,
            culturalPractice: culturalPractice,
            pricePerKg: parseFloat(price) || 0,
            stockKg: parseInt(stock, 10) || 0,
            imageUrl: imagePreview,
        };

        cropContext.addCrop(newCrop);
        
        setIsLoading(false);
        setToast({ message: 'New crop added successfully!', type: 'success' });
        setTimeout(() => {
            onCropAdded();
        }, 1000);
    };

    return (
        <div className="p-4">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Add New Crop</h1>
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

                <div className="pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding Crop...' : 'Add Crop Listing'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddCropScreen;