
import React from 'react';
import { MainPage } from '../types';
import Icon from './Icon';
import type { IconName } from './Icon';

interface NavItemProps {
  label: string;
  icon: IconName;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'text-green-700';
  const inactiveClasses = 'text-slate-500 hover:text-green-700';

  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-1/4 pt-2 pb-1 transition-colors">
      <Icon name={icon} className={`h-7 w-7 mb-1 ${isActive ? activeClasses : inactiveClasses}`} />
      <span className={`text-xs font-medium ${isActive ? activeClasses : inactiveClasses}`}>{label}</span>
    </button>
  );
};

interface BottomNavProps {
  activePage: MainPage;
  onPageChange: (page: MainPage) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onPageChange }) => {
  return (
    <nav className="w-full bg-white border-t border-slate-200 shadow-md flex justify-around mt-auto">
      <NavItem
        label="Home"
        icon="home"
        isActive={activePage === MainPage.Home}
        onClick={() => onPageChange(MainPage.Home)}
      />
      <NavItem
        label="Add Crop"
        icon="add"
        isActive={activePage === MainPage.AddCrop}
        onClick={() => onPageChange(MainPage.AddCrop)}
      />
      <NavItem
        label="Orders"
        icon="orders"
        isActive={activePage === MainPage.Orders}
        onClick={() => onPageChange(MainPage.Orders)}
      />
      <NavItem
        label="Profile"
        icon="user"
        isActive={activePage === MainPage.Profile}
        onClick={() => onPageChange(MainPage.Profile)}
      />
    </nav>
  );
};

export default BottomNav;
