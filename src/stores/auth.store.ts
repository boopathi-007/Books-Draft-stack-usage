import z from "zod";
import { create } from "zustand";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

type User = z.infer<typeof userSchema>;

type AuthState = {
  token: string | null;
  user: User | null;

  login: (token: string, user: User) => void;
  logout: () => void;

  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem("token"),
  user: null,

  login: (token, user) => {
    localStorage.setItem("token", token);

    set({
      token,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      user: null,
    });
  },

  isAuthenticated: () => !!get().token,
}));
