"use client";
import { BASE_URL } from "@/constants";
import { InitialDataLogin, InitialDataRegister } from "@/schema/auth";
import { ErrorResponse } from "@/types/interfaces";
import { Api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const api = new Api();

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
    mutationFn: async (data: InitialDataRegister) => {
      const req = await api.post("/auth/register", data);

      return req.data;
    },
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
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      const resp = await response.json();

      localStorage.setItem("token", resp.data.access_token);

      return resp;
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
