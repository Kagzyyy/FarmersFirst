import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Icon from '../../components/Icon';
import StarRating from '../../components/StarRating';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import Toast from '../../components/Toast';

const mockReviews = [
    {
        buyerName: 'City Grocers',
        rating: 5,
        cropName: 'Red Tomatoes',
        comment: 'Excellent quality and very fresh. The tomatoes were perfect for our salads. Will definitely buy again!',
    },
    {
        buyerName: 'Fresh Mart',
        rating: 4,
        cropName: 'Granny Smith Apples',
        comment: 'Good quality apples, very crisp. A few had some blemishes, but overall a great purchase for our store.',
    },
    {
        buyerName: 'Organic World',
        rating: 5,
        cropName: 'Golden Wheat',
        comment: 'High-quality grain, clean and well-packaged. Our customers are very happy with the flour we produced from it.',
    }
];

const ProfileInfoRow: React.FC<{ icon: any, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center p-4 border-b border-slate-200 bg-white">
        <Icon name={icon} className="w-6 h-6 text-green-700" />
        <div className="ml-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-md font-medium text-slate-800">{value}</p>
        </div>
    </div>
);

const ProfileScreen: React.FC = () => {
    const authContext = useContext(AuthContext);
    const averageRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    if (!authContext || !authContext.user) {
        return <div>Loading profile...</div>;
    }

    const { user, logout, updateProfilePic, changePassword } = authContext;
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    updateProfilePic(reader.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleProfilePicClick = () => {
        fileInputRef.current?.click();
    };

    const handlePasswordSave = async (currentPassword: string, newPassword: string) => {
        const result = await changePassword(currentPassword, newPassword);
        setToast({ message: result.message, type: result.success ? 'success' : 'error' });
        if (result.success) {
            setIsModalOpen(false);
        }
    };

    const profileImageUrl = user.profilePic || `https://i.pravatar.cc/150?u=${user.farmId}`;

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {isModalOpen && <ChangePasswordModal onClose={() => setIsModalOpen(false)} onSave={handlePasswordSave} />}
             <div className="p-4 bg-green-700 text-white text-center shadow-md">
                <div className="relative w-24 h-24 mx-auto mb-2">
                    <img 
                      src={profileImageUrl} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" 
                    />
                    <button
                        onClick={handleProfilePicClick}
                        className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                        aria-label="Change profile picture"
                    >
                        <Icon name="camera" className="w-5 h-5 text-green-700" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                <h1 className="text-2xl font-bold">{user.name}</h1>
                 <div className="mt-2 flex items-center justify-center gap-2">
                    <StarRating rating={averageRating} />
                    <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    <span className="text-sm text-green-200">({mockReviews.length} reviews)</span>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="bg-white shadow-sm">
                    <ProfileInfoRow icon="farm" label="Farm ID" value={user.farmId} />
                    <ProfileInfoRow icon="email" label="Email" value={user.email} />
                    <ProfileInfoRow icon="phone" label="Contact Number" value={user.contactNumber} />
                </div>
                 <div className="p-4">
                    <h2 className="text-xl font-bold text-slate-700 mb-3">Top Reviews</h2>
                    <div className="space-y-4">
                        {mockReviews.slice(0, 3).map((review, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <p className="font-bold text-slate-800">{review.buyerName}</p>
                                        <p className="text-xs text-slate-500 italic">on "{review.cropName}"</p>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-slate-600 text-sm mt-2">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-4 space-y-3 bg-white border-t">
                 <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center p-3 bg-stone-200 text-green-800 font-bold rounded-lg hover:bg-stone-300 transition-colors">
                     <Icon name="lock" className="w-5 h-5 mr-2" />
                     Change Password
                 </button>
                 <button onClick={logout} className="w-full flex items-center justify-center p-3 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors">
                     <Icon name="logout" className="w-5 h-5 mr-2" />
                     Logout
                 </button>
            </div>
        </div>
    );
};

export default ProfileScreen;