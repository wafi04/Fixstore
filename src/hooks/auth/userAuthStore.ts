import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserData } from "@/types/user";
import { Api } from "@/utils/api";
import { API_RESPONSE } from "@/types/interfaces";

interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;

  login: (userData: UserData) => void;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  setLoading: (isLoading: boolean) => void;
}

const api = new Api();
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAdmin: false,

      login: (userData) => {
        set({
          user: userData,
          isAdmin: userData.role === "ADMIN",
          error: null,
        });
      },

      logout: async () => {
        try {
          const data = await api.post<void>(`/auth/logout`);
          return data.data;
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            isAdmin: false,
            error: null,
          });
        }
      },

      refreshToken: async () => {
        set({ isLoading: true });
        try {
          const refreshResponse = await api.post<void>("/api/refresh");

          if (refreshResponse.statusCode === 401) {
            throw new Error("Failed to refresh token");
          }

          const profileResponse = await api.get<API_RESPONSE<UserData>>(
            "/auth/profile"
          );

          if (profileResponse.statusCode === 401) {
            throw new Error("Failed to fetch profile");
          }

          const userData = profileResponse.data;
          console.log(userData);
          set({
            user: userData.data,
            isAdmin: userData.data.role === "ADMIN",
            isLoading: false,
          });

          return true;
        } catch (error) {
          set({
            user: null,
            isAdmin: false,
            error: error instanceof Error ? error : new Error("Refresh failed"),
            isLoading: false,
          });
          return false;
        }
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

export const useAuth = () => {
  const { user, isLoading, error, isAdmin, logout, refreshToken } =
    useAuthStore();

  return {
    user,
    isLoading,
    error,
    isAdmin,
    logout,
    refreshToken,
  };
};
