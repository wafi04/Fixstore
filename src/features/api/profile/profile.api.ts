import { ProfileSchema } from "@/schema/profile";
import { API_RESPONSE } from "@/types/interfaces";
import { ProfileData } from "@/types/user";
import { Api } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const api = new Api();
export function useCreateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["user", "profile"],
    mutationFn: async (data: ProfileSchema) => {
      const req = await api.post("/profile", data);
      return req.data;
    },
    onError: (error) => {
      queryClient.cancelQueries({ queryKey: ["user", "profile"] });
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      toast.success("Created Success");
    },
  });
}

export function useGetProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<ProfileData>>("/profile");
      return req.data;
    },
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
}
