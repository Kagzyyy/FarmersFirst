
import React, { useState } from 'react';
import type { Crop, Order, User } from '../types';
import { OrderStatus } from '../types';
import Header from './common/Header';
import Button from './common/Button';
import Input from './common/Input';

interface PaymentFlowProps {
  crop: Crop;
  user: User;
  onBack: () => void;
  onPaymentComplete: (order: Order) => void;
  onUpdateWalletBalance: (amount: number) => void;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({ crop, user, onBack, onPaymentComplete, onUpdateWalletBalance }) => {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(100); // Default quantity
  const [upiPin, setUpiPin] = useState('');
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [useWallet, setUseWallet] = useState(false);

  const totalAmount = quantity * crop.pricePerKg;
  const walletContribution = useWallet ? Math.min(user.walletBalance, totalAmount) : 0;
  const remainingAfterWallet = totalAmount - walletContribution;
  
  const blockedAmount = remainingAfterWallet * 0.25; // 25% blocked initially
  const remainingForInstallments = remainingAfterWallet - blockedAmount;

  const handleFinalizeOrder = (status: OrderStatus) => {
    if(useWallet) {
        onUpdateWalletBalance(-walletContribution);
    }
     const newOrder: Order = {
        id: `ord_${new Date().getTime()}`,
        cropName: crop.name,
        sellerName: crop.sellerName,
        totalAmount: totalAmount,
        status: status,
        date: new Date().toLocaleDateString('en-CA'),
    };
    onPaymentComplete(newOrder);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
        setQuantityError('Quantity is required.');
        setQuantity(0);
        return;
    }
    
    const numValue = Number(value);
    setQuantity(numValue);

    if (numValue <= 0) {
        setQuantityError('Quantity must be greater than 0.');
    } else if (numValue > crop.stockKg) {
        setQuantityError(`Quantity cannot exceed available stock of ${crop.stockKg} kg.`);
    } else {
        setQuantityError(null);
    }
  };
  
  const isUpiPinValid = upiPin.length === 4 || upiPin.length === 6;

  const renderStep = () => {
    switch(step) {
      case 1: // Order Summary
        return (
          <div className="p-6 space-y-6 flex-grow flex flex-col">
            <h2 className="text-2xl font-bold text-center">Order Summary</h2>
            <div className="flex items-center space-x-4 p-4 bg-slate-100 rounded-lg">
                <img src={crop.imageUrl} alt={crop.name} className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <h3 className="text-xl font-bold">{crop.name}</h3>
                    <p className="text-textSecondary">{crop.sellerName}</p>
                </div>
            </div>
            <div>
                <label htmlFor="quantity" className="block text-md font-medium text-textSecondary mb-2">Quantity (kg)</label>
                <input id="quantity" type="number" value={quantity <= 0 ? '' : quantity} onChange={handleQuantityChange} className={`w-full px-4 py-3 border rounded-lg text-lg bg-slate-800 text-white placeholder-slate-400 focus:ring-2 outline-none transition ${quantityError ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-primary focus:border-primary'}`} min="1" max={crop.stockKg} aria-invalid={!!quantityError} aria-describedby={quantityError ? 'quantity-error' : undefined}/>
                {quantityError && <p id="quantity-error" className="mt-2 text-sm text-red-500">{quantityError}</p>}
            </div>

            {user.walletBalance > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <label htmlFor="useWallet" className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" id="useWallet" checked={useWallet} onChange={() => setUseWallet(!useWallet)} className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"/>
                        <span className="text-lg">Use Wallet Balance (Available: <span className="font-bold">₹{user.walletBalance.toLocaleString()}</span>)</span>
                    </label>
                </div>
            )}

            {useWallet && totalAmount > user.walletBalance && user.walletBalance > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                    <p className="text-md text-yellow-800">
                        <strong>Insufficient Balance:</strong> Your wallet will cover part of the payment. The rest will be handled via UPI mandate.
                    </p>
                </div>
            )}
            
            <div className="flex-grow"></div>
            
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg space-y-2">
                <div className="flex justify-between text-lg"><span className="text-textSecondary">Total Amount:</span> <span className="font-semibold">₹{totalAmount.toLocaleString()}</span></div>
                {useWallet && <div className="flex justify-between text-lg"><span className="text-textSecondary">Wallet Deduction:</span> <span className="font-semibold text-blue-600">- ₹{walletContribution.toLocaleString()}</span></div>}
                <hr className="my-2"/>
                <div className="flex justify-between text-xl font-bold"><span className="text-textSecondary">Final Amount:</span> <span className="text-primary">₹{remainingAfterWallet.toLocaleString()}</span></div>
                 {remainingAfterWallet > 0 && <p className="text-sm text-center text-textSecondary pt-2">An initial 25% (₹{blockedAmount.toLocaleString()}) will be blocked via UPI mandate.</p>}
            </div>

            {remainingAfterWallet <= 0 ? (
                <Button onClick={() => handleFinalizeOrder(OrderStatus.FULLY_PAID)} fullWidth disabled={!!quantityError || quantity <= 0}>Pay ₹{totalAmount.toLocaleString()} from Wallet</Button>
            ) : (
                <Button onClick={() => setStep(2)} fullWidth disabled={!!quantityError || quantity <= 0}>Proceed to Mandate</Button>
            )}
          </div>
        );

      case 2: // Mandate Agreement
        return (
          <div className="p-6 space-y-6 flex-grow flex flex-col text-center">
            <h2 className="text-2xl font-bold">Authorize Mandate</h2>
            <div className="flex-grow flex items-center justify-center">
                <div className="p-6 bg-slate-100 rounded-lg">
                    <p className="text-lg text-textPrimary leading-relaxed">
                        You are authorizing a block of <span className="font-bold text-primary">₹{blockedAmount.toLocaleString()}</span> in your bank account now.
                    </p>
                    <p className="mt-4 text-md text-textSecondary">
                        The remaining <span className="font-bold">₹{remainingForInstallments.toLocaleString()}</span> will be collected in 3 monthly installments.
                    </p>
                </div>
            </div>
            <Button onClick={() => setStep(3)} fullWidth>Authorize & Pay</Button>
          </div>
        );

      case 3: // UPI Mandate Interface
        return (
            <div className="p-6 space-y-6 flex-grow flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-center">Enter UPI PIN</h2>
                <div className="p-6 bg-slate-800 rounded-lg text-white text-center">
                    <p className="text-slate-300">Amount to be blocked</p>
                    <p className="text-4xl font-bold my-2">₹{blockedAmount.toLocaleString()}</p>
                    <p className="text-slate-400 text-sm">Paying to {crop.sellerName}</p>
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
                <Button onClick={() => setStep(4)} fullWidth disabled={!isUpiPinValid}>Confirm Mandate</Button>
            </div>
        );
        
      case 4: // Confirmation
        const installmentDate = (months: number) => new Date(new Date().setMonth(new Date().getMonth() + months)).toLocaleDateString('en-GB');
        return (
            <div className="p-6 space-y-6 flex-grow flex flex-col text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-3xl font-bold">Order Placed!</h2>
                <p className="text-xl text-textPrimary">
                    <span className="font-bold text-primary">₹{blockedAmount.toLocaleString()}</span> has been successfully blocked.
                </p>
                <div className="space-y-3 text-left p-4 bg-slate-100 rounded-lg">
                    <h3 className="font-bold text-lg text-center">Installment Schedule</h3>
                    <div className="flex justify-between"><span>Installment 1 due:</span> <span className="font-bold">{installmentDate(1)}</span></div>
                    <div className="flex justify-between"><span>Installment 2 due:</span> <span className="font-bold">{installmentDate(2)}</span></div>
                    <div className="flex justify-between"><span>Installment 3 due:</span> <span className="font-bold">{installmentDate(3)}</span></div>
                </div>
                 <div className="flex-grow"></div>
                <Button onClick={() => handleFinalizeOrder(OrderStatus.BLOCKED)} fullWidth>Back to Dashboard</Button>
            </div>
        );
      default: return null;
    }
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      <Header title="Complete Your Order" onBack={onBack} />
      {renderStep()}
    </div>
  );
};

export default PaymentFlow;
