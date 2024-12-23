import { ProductDetails, ProductForm } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ProductService } from "./product.crud";
import { BASE_URL } from "@/constants";
import { API_RESPONSE } from "@/types/interfaces";

const product = new ProductService();

export function UseCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["product"],
    mutationFn: (create: ProductForm) => product.create(create),
    onError: (error: AxiosError) => {
      toast.error(error.message);
      queryClient.cancelQueries({ queryKey: ["product"] });
    },
    onSuccess: () => {
      toast.success("Product Create Success");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
export function useGetAllProduct() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => product.getAll(),
    staleTime: 5 * 10 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    select: (response) => response.data,
  });

  return {
    data,
    isLoading,
    error,
  };
}
export function useGetProductById(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => product.GetById(id),
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    select: (response) => response.data,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useGetAllProductWithVariants() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", "variants"],
    queryFn: async () => {
      const req = await fetch(`${BASE_URL}/api/product/variants`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!req.ok) {
        throw new Error("Failed to fetch data");
      }

      return await req.json();
    },
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    select: (response) => response.data,
  });

  return {
    data,
    isLoading,
    error,
  };
}
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: (data: ProductForm) => product.update(data),
    onMutate: async (updatedProduct) => {
      // Cancel queries jika gagal
      await queryClient.cancelQueries({ queryKey: ["product"] });

      const previousProducts = queryClient.getQueryData(["product"]);

      queryClient.setQueryData(["product"], (oldData: any) => {
        if (Array.isArray(oldData?.data)) {
          return {
            ...oldData,
            data: oldData.data.map((product: ProductForm) =>
              product.id === updatedProduct.id
                ? { ...product, ...updatedProduct }
                : product
            ),
          };
        }
        return oldData;
      });

      queryClient.setQueryData(
        ["product", updatedProduct.id],
        (oldData: any) => ({
          ...oldData,
          ...updatedProduct,
        })
      );

      return { previousProducts };
    },
    onError: (error: AxiosError, context: any) => {
      toast.error(error.message);
      queryClient.setQueryData(["product"], context?.previousProducts);
    },
    onSuccess: (serverResponse, updatedProduct) => {
      toast.success("Product Update Success");

      // Ensure we update with the server's response
      queryClient.setQueryData(["product"], (oldData: any) => {
        if (Array.isArray(oldData?.data)) {
          return {
            ...oldData,
            data: oldData.data.map((product: ProductForm) =>
              product.id === updatedProduct.id ? serverResponse : product
            ),
          };
        }
        return oldData;
      });

      queryClient.invalidateQueries({
        queryKey: ["product"],
        exact: false,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: () => product.delete(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product"] });
      const previousProducts = queryClient.getQueryData(["product"]);
      queryClient.setQueryData(["product"], (oldData: any) => {
        if (Array.isArray(oldData?.data)) {
          return {
            ...oldData,
            data: oldData.data.filter(
              (product: ProductForm) => product.id !== id
            ),
          };
        }
        return oldData;
      });

      return { previousProducts };
    },
    onError: (error: AxiosError, context: any) => {
      // jika delete gagal maka datanya dikembalikan
      toast.error(error.message);
      queryClient.setQueryData(["product"], context?.previousProducts);
    },
    onSuccess: () => {
      // Show success toast
      toast.success("Product Deleted Successfully");

      // Invalidate product queries to mendpaatrkan  data  terbaru
      queryClient.invalidateQueries({
        queryKey: ["product"],
        exact: false,
        refetchType: "active",
      });
    },
    onSettled: () => {
      // Always refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

export function GetProductById(id: string) {
  const data = useQuery<API_RESPONSE<ProductDetails>>({
    queryKey: ["product", id],
    queryFn: async () => {
      console.log("Fetching URL:", `${BASE_URL}/api/product/${id}`);

      const res = await fetch(`${BASE_URL}/api/product/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", res.status);

      return res.json();
    },
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data: data.data?.data,
    isLoading: data.isLoading,
    error: data.error,
  };
}
