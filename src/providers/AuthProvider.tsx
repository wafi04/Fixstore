import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/hooks/auth/userAuthStore";
import { Api } from "@/utils/api";
import { UserData } from "@/types/user";
import { API_RESPONSE } from "@/types/interfaces";

const api = new Api();

export function AuthCheck() {
  // const navigate = useNavigate();
  const { login, setLoading } = useAuthStore();

  const { data, isLoading } = useQuery<API_RESPONSE<UserData>>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await api.get<API_RESPONSE<UserData>>(`/auth/profile`);
        return response.data;
      } catch (error) {
        // const refreshed = await refreshToken();
        // if (!refreshed) {
        //   navigate("/auth/login");
        // }
        console.log(error);
        throw error;
      }
    },
    retry: 1,
  });

  useEffect(() => {
    setLoading(isLoading);
    if (data?.data) {
      console.log(data.data);
      login(data.data);
    }
  }, [data, isLoading, login, setLoading]);

  return null;
}
export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthCheck />
      {children}
    </>
  );
}
