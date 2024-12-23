import { BASE_URL } from "@/constants";
import { InventoryForm } from "@/types/variants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useCreateOrUpdateInventory(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["inventory"],
    mutationFn: async (data: InventoryForm[]) => {
      console.log(data);
      const req = await axios.post(
        `${BASE_URL}/api/variants/inventory/${id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );

      return req.data;
    },
    onError: () => {
      toast.error("Internal Server Error");
      queryClient.cancelQueries({ queryKey: ["inventory"] });
    },
    onSuccess: () => {
      toast.success("Create Inventory Success");
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
}
