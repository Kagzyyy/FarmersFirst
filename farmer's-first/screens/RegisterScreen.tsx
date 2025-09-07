
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Toast from '../components/Toast';

interface RegisterScreenProps {
  onGoToLogin: () => void;
  onBack: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onGoToLogin, onBack }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [farmId, setFarmId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      setError("All fields are required.");
      return;
    }
    // Simulate OTP verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const newFarmId = await authContext?.register(name, email, contact, password);
      if (newFarmId) {
        setFarmId(newFarmId);
        setStep(3);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
       {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      <div className="p-8 flex flex-col h-full">
        <button onClick={onBack} className="self-start text-green-700 font-medium mb-4">&larr; Back to Welcome</button>
        
        {step === 1 && (
          <>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-green-800">Create Account</h2>
              <p className="text-slate-500 mt-2">Join our farming community.</p>
            </div>
            <div className="my-6">
                <img src="https://picsum.photos/seed/farmer/400/200" alt="Farmer" className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg" />
            </div>
            <form onSubmit={handleDetailsSubmit} className="flex-grow flex flex-col justify-center space-y-4">
              <Input label="Name" id="name" type="text" value={name} onChange={e => setName(e.target.value)} icon="user" required />
              <Input label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} icon="email" required />
              <Input label="Contact Number" id="contact" type="tel" value={contact} onChange={e => setContact(e.target.value)} icon="phone" required />
              <div className="pt-2">
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Continue'}
                </Button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
            <>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-800">Set Password</h2>
                    <p className="text-slate-500 mt-2">Create a secure password for your account.</p>
                </div>
                <form onSubmit={handlePasswordSubmit} className="flex-grow flex flex-col justify-center space-y-4">
                    <Input label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} icon="lock" required />
                    <Input label="Confirm Password" id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} icon="lock" required />
                     <div className="pt-2">
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Register'}
                        </Button>
                    </div>
                </form>
            </>
        )}

        {step === 3 && (
            <div className="flex-grow flex flex-col justify-center items-center text-center">
                <Icon name="check" className="w-24 h-24 text-green-500" />
                <h2 className="text-2xl font-bold text-green-800 mt-4">Registration Successful!</h2>
                <p className="text-slate-600 mt-2">Your FarmId is:</p>
                <p className="text-2xl font-bold bg-green-100 text-green-800 px-4 py-2 rounded-lg my-4">{farmId}</p>
                <p className="text-slate-500 text-sm">Please save this ID for logging in.</p>
                <div className="w-full mt-8">
                    <Button onClick={onGoToLogin}>Go to Login</Button>
                </div>
            </div>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <button onClick={onGoToLogin} className="font-bold text-green-700 hover:underline">Log In</button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterScreen;
