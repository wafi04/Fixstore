import { Loading } from "@/components/ui/loading/loading";
import { useAuthStore } from "@/hooks/auth/userAuthStore";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./navbar/Navbar";
import Sidebar from "./sidebar/SidebarDashboard";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

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
