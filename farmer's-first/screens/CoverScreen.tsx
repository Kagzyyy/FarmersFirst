import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

interface CoverScreenProps {
  onFinish: () => void;
}

const CoverScreen: React.FC<CoverScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // Wait for 2.5 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [onFinish]);

  return (
    <Layout className="relative !p-0">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1499529112087-7cb3b7226cd2?q=80&w=1740&auto=format&fit=crop')"}}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 flex flex-col h-full justify-center items-center p-8 text-white text-center animate-fade-in">
        <Logo className="mb-6 w-28 h-28" />
        <h1 className="text-5xl font-extrabold tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Farmer's First</h1>
      </div>
    </Layout>
  );
};

export default CoverScreen;
