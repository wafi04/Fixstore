import { createBrowserRouter, Outlet } from "react-router-dom";

// Layout Components
import { PublicLayout } from "@/layouts/AuthLayout";
import { ProtectedLayout } from "@/layouts/ProtectedLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

// Providers
import { AuthProvider } from "@/providers/AuthProvider";

// Pages
import App from "@/App";
import { LoginPage } from "@/pages/auth/Login";
import { RegisterPage } from "@/pages/auth/Register";
import ProductDetailsPage from "@/pages/productDetails/productDetails";
import { CartUserPage } from "@/pages/cart/CartUser";
import { CategoriesDahsboard } from "@/pages/dashboard/categories";
import { ProductsDashoard } from "@/pages/dashboard/products";
import { ProductById } from "@/pages/dashboard/products/[id]";
import { DashboardProfile } from "@/pages/dashboard/profile";

// Route Configuration
const authRoutes = {
  path: "auth",
  element: (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  ),
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
};

const dashboardRoutes = {
  path: "/dashboard",
  element: (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
  children: [
    {
      index: true,
      element: <div>sksksk</div>,
    },
    {
      path: "category",
      element: <CategoriesDahsboard />,
    },
    {
      path: "product",
      element: <ProductsDashoard />,
    },
    {
      path: "product/:id",
      element: <ProductById />,
    },
    {
      path: "profile",
      element: <DashboardProfile />,
    },
  ],
};

const mainRoutes = [
  {
    path: "/p/:id",
    element: (
      <ProtectedLayout>
        <ProductDetailsPage />
      </ProtectedLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedLayout>
        <CartUserPage />
      </ProtectedLayout>
    ),
  },
  {
    path: "/",
    element: (
      // <ProtectedLayout>
      <App />
      // </ProtectedLayout>
    ),
  },
];

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [authRoutes, ...mainRoutes, dashboardRoutes],
  },
]);
