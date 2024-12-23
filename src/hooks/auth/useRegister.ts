"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface InitialDataRegister {
  name: string;
  password: string;
  email: string;
}

interface RegisterErrors
  extends Partial<Record<keyof InitialDataRegister, string>> {
  submit?: string;
}

interface RegisterStore {
  registerData: InitialDataRegister;
  errors: RegisterErrors;
  isLoading: boolean;
  isValidForm: boolean;
  setRegisterData: (field: keyof InitialDataRegister, value: string) => void;
  setErrors: (errors: Partial<RegisterErrors>) => void;
  setIsLoading: (loading: boolean) => void;
  validateField: (field: keyof InitialDataRegister, value: string) => boolean;
  handleChange: (field: keyof InitialDataRegister, value: string) => void;
  resetForm: () => void;
}

const initialRegisterData: InitialDataRegister = {
  name: "",
  password: "",
  email: "",
};

const initialErrors: RegisterErrors = {
  name: "",
  email: "",
  password: "",
};

export const useRegisterStore = create<RegisterStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      registerData: initialRegisterData,
      errors: initialErrors,
      isLoading: false,
      isValidForm: false,

      // Actions
      setRegisterData: (field, value) =>
        set((state) => ({
          registerData: {
            ...state.registerData,
            [field]: value,
          },
        })),

      setErrors: (newErrors) =>
        set((state) => {
          const updatedErrors = {
            ...state.errors,
            ...newErrors,
          };

          // Update isValidForm whenever errors change
          const isValid = !Object.values(updatedErrors).some(
            (error) => error !== "" && error !== undefined
          );

          return {
            errors: updatedErrors,
            isValidForm: isValid,
          };
        }),

      setIsLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      validateField: (field, value) => {
        let error = "";

        switch (field) {
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
              error = "Email is required";
            } else if (!emailRegex.test(value)) {
              error = "Invalid email format";
            }
            break;

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
        store.setRegisterData(field, value);
        store.validateField(field, value);
      },

      resetForm: () => {
        set({
          registerData: initialRegisterData,
          errors: initialErrors,
          isValidForm: false,
        });
      },
    }),
    {
      name: "register-store",
    }
  )
);
