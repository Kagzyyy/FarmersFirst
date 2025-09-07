import React, { useState } from 'react';
import type { User, Order } from '../types';
import { OrderStatus } from '../types';
import Header from './common/Header';
import Button from './common/Button';
import StarRating from './common/StarRating';
import AddReviewModal from './AddReviewModal';
import AddMoneyModal from './AddMoneyModal';

interface ProfileProps {
  user: User;
  orders: Order[];
  onBack: () => void;
  onUpdateOrder: (order: Order) => void;
  onUpdateWalletBalance: (amount: number) => void;
}

const statusColors: { [key in OrderStatus]: string } = {
  [OrderStatus.BLOCKED]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.INSTALLMENT_PAID]: 'bg-blue-100 text-blue-800',
  [OrderStatus.FULLY_PAID]: 'bg-green-100 text-green-800',
  [OrderStatus.DELIVERED]: 'bg-purple-100 text-purple-800',
};

const OrderItem: React.FC<{order: Order, onAddReview: () => void}> = ({ order, onAddReview }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-lg">{order.cropName}</h4>
                <p className="text-sm text-textSecondary">vs {order.sellerName} on {order.date}</p>
                <p className="text-lg font-semibold text-primary mt-1">₹{order.totalAmount.toLocaleString()}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[order.status]}`}>
                {order.status}
            </span>
        </div>
        {order.review ? (
            <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-sm font-semibold mb-1">Your Review:</p>
                <StarRating rating={order.review.rating} />
                <p className="text-sm text-textSecondary italic mt-1">"{order.review.comment}"</p>
            </div>
        ) : order.status === OrderStatus.DELIVERED && (
             <div className="mt-3 pt-3 border-t border-slate-200">
                <Button onClick={onAddReview} variant="outline" className="py-1 px-3 text-sm">Add Review</Button>
            </div>
        )}
    </div>
);

const Profile: React.FC<ProfileProps> = ({ user, orders, onBack, onUpdateOrder, onUpdateWalletBalance }) => {
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAddMoneyModalOpen, setAddMoneyModalOpen] = useState(false);

  const handleOpenReviewModal = (order: Order) => {
    setSelectedOrder(order);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedOrder(null);
    setReviewModalOpen(false);
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (selectedOrder) {
        onUpdateOrder({
            ...selectedOrder,
            review: { rating, comment },
        });
    }
    handleCloseReviewModal();
  };
  
  const handleAddMoneySubmit = (amount: number) => {
    onUpdateWalletBalance(amount);
    setAddMoneyModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <Header title="My Profile" onBack={onBack} />
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        <div className="bg-surface p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h3>
          <div className="space-y-2 text-lg">
            <p><span className="font-semibold text-textSecondary">Name:</span> {user.name}</p>
            <p><span className="font-semibold text-textSecondary">Contact:</span> {user.contactNumber}</p>
            <p><span className="font-semibold text-textSecondary">GST ID:</span> {user.gstId}</p>
            <p><span className="font-semibold text-textSecondary">Joined:</span> {user.registeredDate}</p>
          </div>
        </div>
        
        <div className="bg-surface p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Bank Details</h3>
           <div className="space-y-2 text-lg">
            <p><span className="font-semibold text-textSecondary">Account No:</span> {user.bankAccountNumber}</p>
            <p><span className="font-semibold text-textSecondary">IFSC:</span> {user.ifsc}</p>
            <p><span className="font-semibold text-textSecondary">UPI ID:</span> {user.upiId}</p>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">My Wallet</h3>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-textSecondary text-lg">Current Balance</p>
                    <p className="text-3xl font-bold text-primary">₹{user.walletBalance.toLocaleString()}</p>
                </div>
                <Button onClick={() => setAddMoneyModalOpen(true)}>Add Money</Button>
            </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Order History</h3>
          <div className="space-y-4">
            {orders.map(order => <OrderItem key={order.id} order={order} onAddReview={() => handleOpenReviewModal(order)} />)}
          </div>
        </div>
      </div>
      {isReviewModalOpen && selectedOrder && (
        <AddReviewModal 
            order={selectedOrder} 
            onClose={handleCloseReviewModal}
            onSubmit={handleReviewSubmit}
        />
      )}
       {isAddMoneyModalOpen && (
        <AddMoneyModal 
            currentBalance={user.walletBalance}
            onClose={() => setAddMoneyModalOpen(false)}
            onSubmit={handleAddMoneySubmit}
        />
      )}
    </div>
  );
};

export default Profile;