import React, { useState, useContext } from 'react';
import { Crop } from '../../types';
import CropCard from '../../components/CropCard';
import Toast from '../../components/Toast';
import EditCropScreen from './EditCropScreen';
import { CropContext } from '../../contexts/CropContext';

const HomeScreen: React.FC = () => {
    const cropContext = useContext(CropContext);
    const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
    const [editingCrop, setEditingCrop] = useState<Crop | null>(null);

    if (!cropContext) {
        return <div>Loading crops...</div>
    }

    const { crops, updateCrop, deleteCrop } = cropContext;

    const handleEdit = (id: string) => {
        const cropToEdit = crops.find(c => c.id === id);
        if (cropToEdit) {
            setEditingCrop(cropToEdit);
        }
    };

    const handleUpdateCrop = (updatedCrop: Crop) => {
        updateCrop(updatedCrop);
        setEditingCrop(null);
        setToast({ message: 'Crop updated successfully!', type: 'success' });
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            deleteCrop(id);
            setToast({message: 'Crop listing deleted!', type: 'success'});
        }
    };

    if (editingCrop) {
        return <EditCropScreen crop={editingCrop} onUpdate={handleUpdateCrop} onCancel={() => setEditingCrop(null)} />;
    }
    
    return (
        <div className="p-4">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Your Listings</h1>
            <div className="grid grid-cols-2 gap-4">
                {crops.map(crop => (
                    <CropCard key={crop.id} crop={crop} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>
             {crops.length === 0 && (
                <div className="col-span-2 text-center py-16">
                    <p className="text-slate-500">No crop listings yet.</p>
                    <p className="text-slate-500">Click 'Add Crop' below to get started.</p>
                </div>
            )}
        </div>
    );
};

export default HomeScreen;