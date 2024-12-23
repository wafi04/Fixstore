"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface InitialDataLogin {
  name: string;
  password: string;
}

interface LoginErrors extends Record<keyof InitialDataLogin, string> {
  submit?: string;
}

interface LoginStore {
  // State
  loginData: InitialDataLogin;
  errors: LoginErrors;
  isLoading: boolean;

  // Actions
  setLoginData: (field: keyof InitialDataLogin, value: string) => void;
  setErrors: (errors: Partial<LoginErrors>) => void;
  setIsLoading: (loading: boolean) => void;
  validateField: (field: keyof InitialDataLogin, value: string) => boolean;
  handleChange: (field: keyof InitialDataLogin, value: string) => void;
  resetForm: () => void;
}

const initialLoginData: InitialDataLogin = {
  name: "",
  password: "",
};

const initialErrors: LoginErrors = {
  name: "",
  password: "",
};

export const useLoginStore = create<LoginStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      loginData: initialLoginData,
      errors: initialErrors,
      isLoading: false,

      // Actions
      setLoginData: (field, value) =>
        set((state) => ({
          loginData: {
            ...state.loginData,
            [field]: value,
          },
        })),

      setErrors: (newErrors) =>
        set((state) => ({
          errors: {
            ...state.errors,
            ...newErrors,
          },
        })),

      setIsLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      validateField: (field, value) => {
        let error = "";

        switch (field) {
          case "password":
            if (!value) {
              error = "Password is required";
            } else if (value.length < 8) {
              error = "Password must be at least 8 characters";
            } else if (!/[A-Z]/.test(value)) {
              error = "Password must contain at least one uppercase letter";
            } else if (!/[0-9]/.test(value)) {
              error = "Password must contain at least one number";
            }
            break;

          case "name":
            if (!value) {
              error = "Name is required";
            } else if (value.length < 3) {
              error = "Name must be at least 3 characters";
            }
            break;

          default:
            break;
        }

        get().setErrors({ [field]: error });
        return error === "";
      },

      handleChange: (field, value) => {
        const store = get();
        store.setLoginData(field, value);
      },
      resetForm: () => {
        set({
          loginData: initialLoginData,
          errors: initialErrors,
        });
      },
    }),
    {
      name: "login-store",
    }
  )
);
