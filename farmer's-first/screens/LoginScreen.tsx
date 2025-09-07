
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import Toast from '../components/Toast';

interface LoginScreenProps {
  onGoToRegister: () => void;
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onGoToRegister, onBack }) => {
  const [name, setName] = useState('');
  const [farmId, setFarmId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !farmId || !password) {
      setError("All fields are required.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const success = await authContext?.login(name, farmId, password);
    setIsLoading(false);
    if (!success) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Layout>
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      <div className="p-8 flex flex-col h-full">
        <button onClick={onBack} className="self-start text-green-700 font-medium mb-4">&larr; Back to Welcome</button>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-800">Welcome Back!</h2>
          <p className="text-slate-500 mt-2">Log in to manage your farm.</p>
        </div>
        
        <form onSubmit={handleLogin} className="flex-grow flex flex-col justify-center space-y-6">
          <Input label="Name" id="name" type="text" value={name} onChange={e => setName(e.target.value)} icon="user" required />
          <Input label="FarmId" id="farmId" type="text" value={farmId} onChange={e => setFarmId(e.target.value)} icon="farm" required />
          <Input label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} icon="lock" required />
          
          <div className="pt-4">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Login'}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => alert('Password reset link sent to your verified email!')} className="text-sm text-green-700 hover:underline">Forgot Password?</button>
          <p className="text-sm text-slate-600 mt-2">
            Don't have an account?{' '}
            <button onClick={onGoToRegister} className="font-bold text-green-700 hover:underline">Register</button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginScreen;
