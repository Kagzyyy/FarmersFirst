import React, { useState } from 'react';
// FIX: Import CulturalPractice to resolve type errors in mock data.
import { CropType, Order, CulturalPractice } from '../../types';

const mockCompletedOrders: Order[] = [
    // FIX: Add missing 'culturalPractice' property to conform to the Crop type.
    { id: 'o1', buyerName: 'City Grocers', crop: { id: 'c1', name: 'Red Tomatoes', imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400', type: CropType.Vegetable, culturalPractice: CulturalPractice.Organic, pricePerKg: 40, stockKg: 0 }, quantityKg: 50, date: '2023-10-15', status: 'Completed' },
    // FIX: Add missing 'culturalPractice' property to conform to the Crop type.
    { id: 'o2', buyerName: 'Fresh Mart', crop: { id: 'c3', name: 'Granny Smith Apples', imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400', type: CropType.Fruit, culturalPractice: CulturalPractice.Hybrid, pricePerKg: 120, stockKg: 0 }, quantityKg: 100, date: '2023-10-12', status: 'Completed' },
];

const mockOngoingOrders: Order[] = [
    // FIX: Add missing 'culturalPractice' property to conform to the Crop type.
    { id: 'o3', buyerName: 'Organic World', crop: { id: 'c2', name: 'Golden Wheat', imageUrl: 'https://images.pexels.com/photos/247597/pexels-photo-247597.jpeg?auto=compress&cs=tinysrgb&w=400', type: CropType.Grain, culturalPractice: CulturalPractice.Conventional, pricePerKg: 25, stockKg: 1200 }, quantityKg: 250, date: 'Est: 2023-11-05', status: 'Ongoing' },
    // FIX: Add missing 'culturalPractice' property to conform to the Crop type.
    { id: 'o4', buyerName: 'Local Market Co.', crop: { id: 'c4', name: 'Russet Potatoes', imageUrl: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=400', type: CropType.Vegetable, culturalPractice: CulturalPractice.Conventional, pricePerKg: 20, stockKg: 500 }, quantityKg: 100, date: 'Est: 2023-11-02', status: 'Pending Payment' },
];


const OrdersScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'completed' | 'ongoing'>('completed');

    const statusClasses = {
        'Ongoing': 'bg-blue-100 text-blue-800',
        'Pending Payment': 'bg-yellow-100 text-yellow-800',
        'Completed': 'bg-green-100 text-green-800'
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4">
                <h1 className="text-3xl font-bold text-slate-800">Your Orders</h1>
            </div>
            <div className="border-b border-slate-200 px-4">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`${activeTab === 'completed' ? 'border-green-600 text-green-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => setActiveTab('ongoing')}
                        className={`${activeTab === 'ongoing' ? 'border-green-600 text-green-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Ongoing
                    </button>
                </nav>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
                {activeTab === 'completed' && (
                    <div>
                        {mockCompletedOrders.length === 0 && <p className="text-center text-slate-500 mt-8">No completed orders yet.</p>}
                        {mockCompletedOrders.map(order => (
                            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center mb-3">
                                <img src={order.crop.imageUrl} alt={order.crop.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                <div className="flex-grow">
                                    <p className="font-bold text-slate-800">{order.crop.name}</p>
                                    <p className="text-sm text-slate-600">Sold to: {order.buyerName}</p>
                                    <p className="text-sm text-slate-500">{order.quantityKg} kg on {order.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'ongoing' && (
                    <div>
                        {mockOngoingOrders.length === 0 && <p className="text-center text-slate-500 mt-8">No ongoing orders.</p>}
                        {mockOngoingOrders.map(order => (
                             <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center mb-3">
                                <img src={order.crop.imageUrl} alt={order.crop.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                <div className="flex-grow">
                                    <p className="font-bold text-slate-800">{order.crop.name}</p>
                                    <p className="text-sm text-slate-600">To: {order.buyerName} ({order.quantityKg} kg)</p>
                                    <p className="text-sm text-slate-500">Date: {order.date}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[order.status]}`}>
                                    {order.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersScreen;