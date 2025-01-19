import { useAuthStore } from "@/hooks/auth/userAuthStore";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function PublicLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user } = useAuthStore();

  if (user && location.pathname.startsWith("/auth/")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
