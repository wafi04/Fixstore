import { CategoryForm } from "@/types/categories";
import { API_RESPONSE } from "@/types/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoriesService } from "./categories.crud";

const category = new CategoriesService();
export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["category", "crud"],
    mutationFn: (data: CategoryForm) => category.create(data),
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
    queryFn: () => category.getCategory(),
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
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["category", "crud"],
    mutationFn: (data: CategoryForm) => category.updateCategory(data),
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
                category.id === updateCategory.id
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
    onSuccess: (serverResponse, updateCategory) => {
      toast.success("Update Categories Success");

      // Update the query cache with the server's response
      queryClient.setQueryData(
        ["category", "crud"],
        (oldData: API_RESPONSE<CategoryForm[]>) => {
          if (Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.map((category) =>
                category.id === updateCategory.id ? serverResponse : category
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
    mutationFn: (categoryId: string) => category.Delete(categoryId),
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
