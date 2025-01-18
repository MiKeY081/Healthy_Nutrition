import { create } from 'zustand';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signUp: async (username: string, email: string, password: string) => {
    try {
      set({ loading: true });
      const { data } = await api.post('/auth/register', { username, email, password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, loading: false });
      toast.success('Successfully registered');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, loading: false });
      toast.success('Successfully signed in');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Sign in failed');
    }
  },
  signOut: () => {
    localStorage.removeItem('token');
    set({ user: null });
    toast.success('Successfully signed out');
  },
}));