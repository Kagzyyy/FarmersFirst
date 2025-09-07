import React from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

interface WelcomeScreenProps {
  onGoToLogin: () => void;
  onGoToRegister: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGoToLogin, onGoToRegister }) => {
  return (
    <Layout className="relative !p-0">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1499529112087-7cb3b7226cd2?q=80&w=1740&auto=format&fit=crop')"}}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between p-8 text-white text-center">
        <div className="flex flex-col items-center pt-12">
          <Logo className="mb-6" />
          <h1 className="text-5xl font-extrabold tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Farmer's First</h1>
          <p className="mt-4 text-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>Your Digital Crop Marketplace</p>
        </div>
        <div className="w-full space-y-4">
          <Button variant="primary" onClick={onGoToLogin}>Login</Button>
          <Button variant="secondary" onClick={onGoToRegister}>Register</Button>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomeScreen;