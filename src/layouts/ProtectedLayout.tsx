import { Loading } from "@/components/ui/loading/loading";
import { useAuthStore } from "@/hooks/auth/userAuthStore";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./navbar/Navbar";
import Footer from "./Footer";

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
      <main className={cn(`mt-[80px]`, className)}>{children}</main>
      <Footer />
    </>
  );
}
