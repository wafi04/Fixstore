import { AddressDto } from "@/schema/address";
import { API_RESPONSE } from "@/types/interfaces";
import { AddressData } from "@/types/user";
import { Api } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const api = new Api();
interface ResponseProvincies {
  id: string;
  name: string;
}
export interface ResponseCities extends ResponseProvincies {
  province_id: string;
}

export function useGetProvincies() {
  const { data, isLoading, error } = useQuery<ResponseProvincies[]>({
    queryKey: ["provinces"],
    queryFn: async () => {
      const req = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );

      return req.data;
    },
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}
export function useGetCities(provinceId: string) {
  const { data, isLoading, error } = useQuery<ResponseCities[]>({
    queryKey: ["cities"],
    queryFn: async () => {
      const req = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );

      return req.data;
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["address"],
    mutationFn: async (data: AddressDto) => {
      const req = await api.post("/address", data);
      return req.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Create Address Succesfuly");
    },
    onError: (error) => {
      queryClient.cancelQueries({ queryKey: ["address"] });
      toast.error(error.message);
    },
  });
}

export function useGetAddress() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["address"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<AddressData[]>>("/address");

      return req.data;
    },
    staleTime: 1 * 24 * 60 * 60 * 1000,
    gcTime: 2 * 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
  };
}
