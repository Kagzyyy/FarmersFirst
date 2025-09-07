
import React, { useState } from 'react';
import { MainPage } from '../types';
import Layout from '../components/Layout';
import BottomNav from '../components/BottomNav';
import HomeScreen from './main/HomeScreen';
import AddCropScreen from './main/AddCropScreen';
import OrdersScreen from './main/OrdersScreen';
import ProfileScreen from './main/ProfileScreen';

const MainScreen: React.FC = () => {
  const [activePage, setActivePage] = useState<MainPage>(MainPage.Home);

  const renderContent = () => {
    switch (activePage) {
      case MainPage.Home:
        return <HomeScreen />;
      case MainPage.AddCrop:
        return <AddCropScreen onCropAdded={() => setActivePage(MainPage.Home)} />;
      case MainPage.Orders:
        return <OrdersScreen />;
      case MainPage.Profile:
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <Layout>
      <div className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
      <BottomNav activePage={activePage} onPageChange={setActivePage} />
    </Layout>
  );
};

export default MainScreen;
