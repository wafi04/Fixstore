import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/hooks/auth/userAuthStore";
import { Api } from "@/utils/api";
import { UserData } from "@/types/user";
import { API_RESPONSE } from "@/types/interfaces";
import { Loading } from "@/components/ui/loading/loading";
import { cn } from "@/lib/utils";
import { Navbar } from "@/layouts/navbar/Navbar";
import Footer from "@/layouts/Footer";
import Sidebar from "@/layouts/sidebar/SidebarDashboard";

const api = new Api();

export function AuthCheck() {
  const navigate = useNavigate();
  const { login, setLoading, refreshToken } = useAuthStore();

  const { data, isLoading } = useQuery<API_RESPONSE<UserData>>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await api.get<API_RESPONSE<UserData>>(`/auth/profile`);
        return response.data;
      } catch (error) {
        const refreshed = await refreshToken();
        if (!refreshed) {
          navigate("/auth/login");
        }
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

export function ProtectedLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const location = useLocation();
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (location.pathname.startsWith("/auth/")) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <main className={cn(``, className)}>{children}</main>
      <Footer />
    </>
  );
}

export function AdminLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const location = useLocation();
  const { user, isLoading, isAdmin } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Sidebar>
        <main className={cn(`mt-[80px] px-8`, className)}>{children}</main>
      </Sidebar>
      <Footer />
    </>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user } = useAuthStore();

  if (user && location.pathname.startsWith("/auth/")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
