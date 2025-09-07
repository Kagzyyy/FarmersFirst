import React, { useState, useCallback } from 'react';
import type { User, Crop, Order } from './types';
import { AppView } from './types';
import { MOCK_CROPS, MOCK_ORDERS } from './constants';
import RegistrationWizard from './components/RegistrationWizard';
import Dashboard from './components/Dashboard';
import CropDetail from './components/CropDetail';
import PaymentFlow from './components/PaymentFlow';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.REGISTRATION);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleRegistrationComplete = useCallback((registeredUser: User) => {
    setUser({...registeredUser, walletBalance: 500}); // Add initial wallet balance
    setCurrentView(AppView.DASHBOARD);
  }, []);

  const handleSelectCrop = useCallback((crop: Crop) => {
    setSelectedCrop(crop);
    setCurrentView(AppView.CROP_DETAIL);
  }, []);

  const handleBack = useCallback(() => {
    if (currentView === AppView.CROP_DETAIL || currentView === AppView.PROFILE) {
      setCurrentView(AppView.DASHBOARD);
    } else if (currentView === AppView.PAYMENT_FLOW) {
      setCurrentView(AppView.CROP_DETAIL);
    }
  }, [currentView]);

  const handleBuyNow = useCallback(() => {
    setCurrentView(AppView.PAYMENT_FLOW);
  }, []);
  
  const handlePaymentComplete = useCallback((newOrder: Order) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCurrentView(AppView.DASHBOARD);
    // In a real app, you would show a success toast/modal here.
    alert('Order Placed Successfully!');
  }, []);
  
  const navigateToProfile = useCallback(() => {
      setCurrentView(AppView.PROFILE);
  }, []);

  const handleUpdateOrder = useCallback((updatedOrder: Order) => {
    setOrders(prevOrders => 
        prevOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order)
    );
  }, []);

  const handleUpdateWalletBalance = useCallback((amount: number) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        const newBalance = prevUser.walletBalance + amount;
        if (amount > 0) {
            alert(`₹${amount.toLocaleString()} added to your wallet successfully!`);
        }
        return {
            ...prevUser,
            walletBalance: newBalance,
        };
    });
  }, []);

  const renderContent = () => {
    if (!user || currentView === AppView.REGISTRATION) {
      return <RegistrationWizard onComplete={handleRegistrationComplete} />;
    }

    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard crops={MOCK_CROPS} onSelectCrop={handleSelectCrop} onProfileClick={navigateToProfile} />;
      case AppView.CROP_DETAIL:
        return selectedCrop ? <CropDetail crop={selectedCrop} onBack={handleBack} onBuyNow={handleBuyNow} /> : <Dashboard crops={MOCK_CROPS} onSelectCrop={handleSelectCrop} onProfileClick={navigateToProfile} />;
      case AppView.PAYMENT_FLOW:
        return selectedCrop && user ? <PaymentFlow crop={selectedCrop} user={user} onBack={handleBack} onPaymentComplete={handlePaymentComplete} onUpdateWalletBalance={handleUpdateWalletBalance}/> : <Dashboard crops={MOCK_CROPS} onSelectCrop={handleSelectCrop} onProfileClick={navigateToProfile}/>;
      case AppView.PROFILE:
        return user ? <Profile user={user} orders={orders} onBack={handleBack} onUpdateOrder={handleUpdateOrder} onUpdateWalletBalance={handleUpdateWalletBalance} /> : null;
      default:
        return <RegistrationWizard onComplete={handleRegistrationComplete} />;
    }
  };

  return (
    <div className="container mx-auto max-w-md h-screen bg-background font-sans text-textPrimary flex flex-col shadow-lg">
      {renderContent()}
    </div>
  );
};

export default App;
