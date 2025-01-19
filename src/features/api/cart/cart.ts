import { BASE_URL } from "@/constants";
import { useAuth } from "@/hooks/auth/userAuthStore";
import { CartData, CartDto } from "@/types/cart";
import { API_RESPONSE } from "@/types/interfaces";
import { Api } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const api = new Api();
interface CountCart {
  items: number;
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (data: CartDto) => {
      const req = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return req.json();
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["cart"] });
      toast.error("Failed Add To Cart ");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Success Add To Cart");
    },
  });
}

export function useGetCountCart() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<API_RESPONSE<CountCart>>({
    queryKey: ["cart", "count"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<CountCart>>("/cart/count");
      return req.data;
    },
    enabled: !!user?.id,
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (data?.data.items === 0) {
    return null;
  }

  return {
    isLoading,
    count: data?.data.items as number,
    error,
  };
}

export function useGetCart() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<API_RESPONSE<CartData>>({
    queryKey: ["cart"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<CartData>>("/cart");
      return req.data;
    },
    enabled: !!user?.id,
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    cart: data?.data,
    isLoading,
    error,
  };
}

export function useRemoveCartItems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (cartItemsId: string) => {
      const req = await api.delete(`/cart/items/${cartItemsId}`);

      return req.data;
    },
    onError: () => {
      toast.error("failed remove cart items from cart");
      queryClient.cancelQueries({ queryKey: ["cart"] });
    },
    onSuccess: () => {
      toast.success("Remove items from cart success");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async () => {
      const req = await api.delete(`/cart`);

      return req.data;
    },
    onError: () => {
      toast.error("failed remove cart items from cart");
      queryClient.cancelQueries({ queryKey: ["cart"] });
    },
    onSuccess: () => {
      toast.success("Remove items from cart success");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
