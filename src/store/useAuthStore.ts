import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Admin {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock admin credentials for demonstration
const MOCK_ADMIN = {
  email: 'admin@example.com',
  password: 'admin123',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string): Promise<boolean> => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Mock authentication logic
        if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
          const admin: Admin = {
            id: '1',
            email: email,
            name: 'Admin User',
          };
          set({ admin, isAuthenticated: true });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({ admin: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
