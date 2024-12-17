import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useAuthStore } from '@/store/useAuthStore';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email === 'demo@example.com' && password === 'password') {
      login(email, password);
      navigate('/');
    } else {
      setError('Invalid credentials. Use demo@example.com / password');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E3A8A] mb-4">
          <Wallet className="w-8 h-8 text-[#00BFFF]" />
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome to WalletApp</h1>
        <p className="text-gray-400 mt-2">Manage your finances with ease</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500">
            {error}
          </div>
        )}
        
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue="demo@example.com"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          defaultValue="password"
          required
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <p className="text-center mt-4 text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#00BFFF] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};