import React, { useState, useMemo } from 'react';
import Button from './common/Button';
import Input from './common/Input';

interface AddMoneyModalProps {
  currentBalance: number;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ currentBalance, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(1000);
  const [upiPin, setUpiPin] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(isNaN(value) ? 0 : value);
  };
  
  const handlePresetClick = (presetAmount: number) => {
    setAmount(prev => prev + presetAmount);
  };

  const handleFinalSubmit = () => {
    if (amount > 0) {
      onSubmit(amount);
    } else {
        onClose(); // Close if amount is invalid, though button should be disabled
    }
  };
  
  const newBalance = useMemo(() => currentBalance + amount, [currentBalance, amount]);
  const isUpiPinValid = upiPin.length === 4 || upiPin.length === 6;


  const renderContent = () => {
    switch (step) {
      case 1: // Amount Entry
        return (
          <>
            <div className="text-center">
                <h2 className="text-2xl font-bold">Add Money to Wallet</h2>
            </div>
            <div className="space-y-6">
                <div>
                    <label htmlFor="amount" className="block text-md font-medium text-textSecondary mb-2">Amount to Add (₹)</label>
                    <input id="amount" type="number" value={amount <= 0 ? '' : amount} onChange={handleAmountChange} className="w-full px-4 py-3 border rounded-lg text-lg bg-slate-800 text-white placeholder-slate-400 focus:ring-2 outline-none transition border-slate-700 focus:ring-primary focus:border-primary" placeholder="e.g., 1000" min="1" aria-label="Amount to add"/>
                    <div className="flex justify-center space-x-2 mt-3">
                        {[500, 1000, 2000].map(val => (
                            <button type="button" key={val} onClick={() => handlePresetClick(val)} className="py-1 px-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition">+ ₹{val}</button>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-slate-100 rounded-lg text-lg space-y-1">
                    <div className="flex justify-between">
                        <span className="text-textSecondary">New Balance will be:</span>
                        <span className="font-bold text-primary">₹{newBalance.toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Button type="button" variant="outline" onClick={onClose} fullWidth>Cancel</Button>
                    <Button type="button" onClick={() => setStep(2)} fullWidth disabled={amount <= 0}>Proceed</Button>
                </div>
            </div>
          </>
        );
      case 2: // Authorize Mandate
        return (
             <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">Authorize Mandate</h2>
                <div className="p-6 bg-slate-100 rounded-lg">
                    <p className="text-lg text-textPrimary leading-relaxed">
                        You are authorizing a UPI mandate to add <span className="font-bold text-primary">₹{amount.toLocaleString()}</span> to your Crop Connect wallet.
                    </p>
                </div>
                <div className="flex space-x-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} fullWidth>Back</Button>
                    <Button type="button" onClick={() => setStep(3)} fullWidth>Authorize</Button>
                </div>
            </div>
        );
      case 3: // UPI PIN
         return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Enter UPI PIN</h2>
                <div className="p-6 bg-slate-800 rounded-lg text-white text-center">
                    <p className="text-slate-300">Amount to be added</p>
                    <p className="text-4xl font-bold my-2">₹{amount.toLocaleString()}</p>
                </div>
                <Input 
                    id="upiPin" 
                    label="Enter your 4 or 6 digit UPI PIN" 
                    value={upiPin} 
                    onChange={(e) => setUpiPin(e.target.value.replace(/[^0-9]/g, ''))} 
                    type="password"
                    maxLength={6}
                    className="text-center tracking-[1em]"
                    error={upiPin.length > 0 && !isUpiPinValid ? "PIN must be 4 or 6 digits." : null}
                />
                 <div className="flex space-x-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} fullWidth>Back</Button>
                    <Button type="button" onClick={() => setStep(4)} fullWidth disabled={!isUpiPinValid}>Confirm</Button>
                </div>
            </div>
        );
       case 4: // Success
         return (
             <div className="text-center p-4 space-y-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-3xl font-bold">Success!</h2>
                <p className="text-xl text-textPrimary">
                    <span className="font-bold text-primary">₹{amount.toLocaleString()}</span> has been added to your wallet.
                </p>
                <Button onClick={handleFinalSubmit} fullWidth>Done</Button>
            </div>
         );
      default:
        return null;
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-sm p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AddMoneyModal;
