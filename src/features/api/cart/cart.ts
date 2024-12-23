import { BASE_URL } from "@/constants";
import { useAuth } from "@/hooks/auth/userAuthStore";
import { CartDto } from "@/types/cart";
import { Api } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const api = new Api();

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

export function useGetCart() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const req = await api.get("/cart");
      return req.data;
    },
    enabled: !!user?.id,
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    select: (data: any) => data.data,
  });
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
