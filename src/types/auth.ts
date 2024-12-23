import { LucideIcon } from "lucide-react";
import { UserData } from "./user";
import { InitialDataRegister } from "@/schema/auth";
import { FormEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  error: Error | null;
  logout: () => Promise<void>;
  isAdmin: boolean;
  refreshToken: () => Promise<boolean>;
}
export type InputFields = {
  name: string;
  id: string;
  Icon: React.ReactElement<LucideIcon>;
  value: string;
  label: string;
  type: "email" | "string";
  placeholder: string;
  isPassword?: boolean;
  error?: string;
};

export interface PropsAuth {
  fields: {
    id: string;
    name: string;
    type?: string;
    placeholder: string;
    onChange: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
      ref: React.Ref<HTMLInputElement>;
      name: string;
    };
    label: string;
    error?: string;
    isPassword?: boolean;
    value: string;
  }[];
  image: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  step: "signin" | "signup";
  isLoading: boolean;
}
