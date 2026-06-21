import { create } from "zustand";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  restaurantName: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (params: {
    name: string;
    email: string;
    password: string;
    restaurantName: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    if (!email.trim() || !password.trim()) {
      return { success: false, error: "Email and password are required." };
    }
    await new Promise<void>((r) => setTimeout(r, 600));
    set({
      isAuthenticated: true,
      user: { id: "u1", name: "Rahul A.", email, restaurantName: "Spice Garden" },
    });
    return { success: true };
  },

  register: async ({ name, email, password, restaurantName }) => {
    if (!name.trim() || !email.trim() || !password.trim() || !restaurantName.trim()) {
      return { success: false, error: "All fields are required." };
    }
    await new Promise<void>((r) => setTimeout(r, 700));
    set({
      isAuthenticated: true,
      user: { id: "u2", name, email, restaurantName },
    });
    return { success: true };
  },

  logout: () => set({ user: null, isAuthenticated: false }),
}));
