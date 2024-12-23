"use client";
import { BASE_URL } from "@/constants";
import { InitialDataLogin, InitialDataRegister } from "@/schema/auth";
import { isValidEmail } from "@/types/auth";
import { ErrorResponse } from "@/types/interfaces";
import { Api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const api = new Api();

const register = async (data: InitialDataRegister) => {
  if (data.name.length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }
  if (data.password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (!isValidEmail(data.email)) {
    throw new Error("Please enter a valid email");
  }
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

// const refreshToken = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/refresh`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Token refresh failed");
//     }

//     return response.json();
//   } catch (error) {
//     throw error;
//   }
// };

export function useHandleLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
      toast.success("Login Succes");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred during logout.");
    },
  });
}
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const router = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onError: (err: ErrorResponse) => {
      queryClient.cancelQueries({ queryKey: ["user"] });
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast("Register Success");
      router("/login");
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: InitialDataLogin) => {
      const response = await api.post(`/auth/login`, data);

      return response.data;
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      queryClient.cancelQueries({ queryKey: ["user"] });
      toast.error(`Error: ${errorMessage}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login Success");
      router("/");
    },
  });
};
