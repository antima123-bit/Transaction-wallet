import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
}

// Dummy user data for demonstration
const dummyUser: User = {
  id: '1',
  username: 'demo_user',
  email: 'demo@example.com',
  walletBalance: 1000,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email, password) => {
    // Simulate API call
    if (email === 'demo@example.com' && password === 'password') {
      set({ user: dummyUser });
    }
  },
  register: (username, email, password) => {
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(),
      username,
      email,
      walletBalance: 0,
    };
    set({ user: newUser });
  },
  logout: () => set({ user: null }),
}));