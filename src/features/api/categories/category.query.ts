import { BASE_URL } from "@/constants";
import { CategoryData, CategoryForm } from "@/types/categories";
import { API_RESPONSE } from "@/types/interfaces";
import { Api } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
const api = new Api();
export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["category", "crud"],
    mutationFn: async (data: FormData) => {
      const req = await axios.post(`${BASE_URL}/api/category`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return req.data;
    },
    onSuccess: () => {
      toast.success("create Categories success");
      queryClient.invalidateQueries({ queryKey: ["category", "crud"] });
    },
    onError: () => {
      toast.error("Error creating category");
      queryClient.cancelQueries({ queryKey: ["category", "crud"] });
    },
  });
}

export function useGetCategory() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["category", "crud"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<CategoryData[]>>("/api/category");

      return req.data;
    },
    staleTime: 6 * 10 * 60,
    retry: false,
    select: (response) => response.data || [],
  });
  return {
    category: data,
    error,
    isLoading,
  };
}
export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["category", "crud"],
    mutationFn: async (data: FormData) => {
      const req = await api.put(`/api/category/${id}`, data);
      return req.data;
    },
    onMutate: async (updateCategory) => {
      await queryClient.cancelQueries({
        queryKey: ["category", "crud"],
      });
      const previousCategory = queryClient.getQueryData(["category", "crud"]);

      // Optimistically update the UI
      queryClient.setQueryData(
        ["category", "crud"],
        (oldData: API_RESPONSE<CategoryForm[]>) => {
          if (Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.map((category) =>
                category.id === id
                  ? { ...category, ...updateCategory }
                  : category
              ),
            };
          }
          return oldData;
        }
      );

      // Return a context object with the previous data
      return { previousCategory };
    },

    // On Successful Update
    onSuccess: (serverResponse) => {
      toast.success("Update Categories Success");

      // Update the query cache with the server's response
      queryClient.setQueryData(
        ["category", "crud"],
        (oldData: API_RESPONSE<CategoryForm[]>) => {
          if (Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.map((category) =>
                category.id === id ? serverResponse : category
              ),
            };
          }
          return oldData;
        }
      );

      // Invalidate and refetch queries to ensure data freshness
      queryClient.invalidateQueries({
        queryKey: ["category", "crud"],
        exact: false,
        refetchType: "active",
      });
    },

    onError: (error, updateCategory, context) => {
      toast.error("Error Updating Category");

      // Rollback to previous state if update fails
      if (context?.previousCategory) {
        queryClient.setQueryData(
          ["category", "crud"],
          context.previousCategory
        );
      }

      queryClient.cancelQueries({ queryKey: ["category", "crud"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["category", "crud"],
    mutationFn: async (categoryId: string) => {
      const req = await api.delete(`/api/category/${categoryId}`);
      return req.data;
    },
    onSuccess: () => {
      toast.success("Delete Categories success");
      queryClient.invalidateQueries({ queryKey: ["category", "crud"] }); // Fix the query key to match
    },
    onError: () => {
      toast.error("Error creating category");
      queryClient.cancelQueries({ queryKey: ["category", "crud"] });
    },
  });
}
