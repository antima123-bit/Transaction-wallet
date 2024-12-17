import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useAuthStore } from '@/store/useAuthStore';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    register(
      formData.get('username') as string,
      formData.get('email') as string,
      formData.get('password') as string
    );
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E3A8A] mb-4">
          <Wallet className="w-8 h-8 text-[#00BFFF]" />
        </div>
        <h1 className="text-2xl font-bold text-white">Create an Account</h1>
        <p className="text-gray-400 mt-2">Join WalletApp today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          name="username"
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      <p className="text-center mt-4 text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-[#00BFFF] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};