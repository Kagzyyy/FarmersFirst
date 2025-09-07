
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <main className={`w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden ${className}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
