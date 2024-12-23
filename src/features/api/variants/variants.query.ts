import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import VariantsService from "./variants.crud";

const variants = new VariantsService();

export function useCreateVariants() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["variants", "crud"],
    mutationFn: (data: FormData) => variants.create(data),
    onError: (error: AxiosError) => {
      toast.error(error.message);
      queryClient.cancelQueries({ queryKey: ["variants", "crud"] });
    },
    onSuccess: () => {
      toast.success("Variants Create Success");
      queryClient.invalidateQueries({ queryKey: ["variants", "crud"] });
    },
  });
}

export function useGetAllVariantsByProduct(id: string) {
  return useQuery({
    queryKey: ["variants", id],
    queryFn: () => variants.getAll(id),

    staleTime: 5 * 10 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    select: (response) => response.data,
  });
}
