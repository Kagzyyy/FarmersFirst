
import React, { useState, useCallback } from 'react';
import type { User } from '../types';
import Button from './common/Button';
import Input from './common/Input';

interface RegistrationWizardProps {
  onComplete: (user: User) => void;
}

const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    otp: '',
    gstId: '',
    bankAccountNumber: '',
    ifsc: '',
    upiId: '',
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const validateField = useCallback((id: string, value: string): string | null => {
    switch(id) {
        case 'contactNumber':
            if (!/^\d{10}$/.test(value)) return "Contact number must be exactly 10 digits.";
            break;
        case 'gstId':
            if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) return "Please enter a valid GST ID format.";
            break;
        case 'bankAccountNumber':
            if (!/^\d{9,18}$/.test(value)) return "Please enter a valid bank account number.";
            break;
        case 'ifsc':
            if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) return "Please enter a valid IFSC code.";
            break;
        case 'upiId':
            if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(value)) return "Please enter a valid UPI ID (e.g., yourname@bank).";
            break;
    }
    return null;
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Only validate if there is a value
    if (value) {
        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    } else {
        // Clear error if field is empty
        setErrors(prev => ({ ...prev, [id]: null }));
    }
  };
  
  const nextStep = () => setStep(s => s + 1);
  
  const handleFinalSubmit = () => {
    const newUser: User = {
        ...formData,
        registeredDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
        // FIX: Initialize walletBalance to satisfy the User type.
        walletBalance: 0,
    };
    onComplete(newUser);
  };
  
  const isStep2Valid = formData.name.trim() && formData.contactNumber && !errors.contactNumber;
  const isStep3Valid = formData.otp === '123456';
  const isStep4Valid = formData.gstId && !errors.gstId;
  const isStep5Valid = formData.bankAccountNumber && !errors.bankAccountNumber && formData.ifsc && !errors.ifsc && formData.upiId && !errors.upiId;

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="text-center p-8 flex flex-col items-center justify-center h-full bg-green-50">
            <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Crop Connect</h1>
            <p className="text-lg text-textSecondary mb-8">Connecting Farmers and Vendors Seamlessly</p>
            <Button onClick={nextStep} className="w-1/2">Get Started</Button>
          </div>
        );
      case 2:
        return (
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Your Details</h2>
            <Input id="name" label="Full Name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe"/>
            <Input id="contactNumber" label="Contact Number" value={formData.contactNumber} onChange={handleChange} type="tel" placeholder="e.g. 9876543210" error={errors.contactNumber} />
            <Button onClick={nextStep} fullWidth disabled={!isStep2Valid}>Next</Button>
          </div>
        );
      case 3:
        return (
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Verify Contact</h2>
            <p className="text-center text-textSecondary">An OTP has been sent to {formData.contactNumber}. (Hint: use 123456)</p>
            <Input id="otp" label="Enter OTP" value={formData.otp} onChange={handleChange} type="number" placeholder="6-digit code"/>
            <Button onClick={nextStep} fullWidth disabled={!isStep3Valid}>Verify</Button>
          </div>
        );
      case 4:
        return (
            <div className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">Vendor Verification</h2>
                <p className="text-center text-textSecondary">Please enter your GST Identification Number to proceed.</p>
                <Input id="gstId" label="GST ID" value={formData.gstId} onChange={handleChange} placeholder="e.g. 29ABCDE1234F1Z5" error={errors.gstId} />
                <Button onClick={nextStep} fullWidth disabled={!isStep4Valid}>Verify GST ID</Button>
            </div>
        );
      case 5:
        return (
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Bank Details</h2>
            <Input id="bankAccountNumber" label="Bank Account Number" value={formData.bankAccountNumber} onChange={handleChange} error={errors.bankAccountNumber} />
            <Input id="ifsc" label="IFSC Code" value={formData.ifsc} onChange={handleChange} error={errors.ifsc} />
            <Input id="upiId" label="UPI ID" value={formData.upiId} onChange={handleChange} error={errors.upiId} placeholder="yourname@bank" />
            <Button onClick={nextStep} fullWidth disabled={!isStep5Valid}>Confirm Details</Button>
          </div>
        );
      case 6:
        return (
          <div className="text-center p-8 flex flex-col items-center justify-center h-full bg-green-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-4xl font-bold text-primary mb-4">Successfully Registered!</h1>
            <p className="text-lg text-textSecondary mb-8">You are all set to use Crop Connect.</p>
            <Button onClick={handleFinalSubmit} className="w-1/2">Go to Dashboard</Button>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex-grow flex flex-col justify-center">
      {renderStep()}
    </div>
  );
};

export default RegistrationWizard;
