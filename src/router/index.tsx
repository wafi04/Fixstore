import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  AdminLayout,
  AuthProvider,
  ProtectedLayout,
  PublicLayout,
} from "@/providers/AuthProvider";
import { LoginPage } from "@/pages/auth/Login";
import { RegisterPage } from "@/pages/auth/Register";
import App from "@/App";
import ProductDetailsPage from "@/pages/productDetails/productDetails";
import { CartUserPage } from "@/pages/cart/CartUser";
import { CategoriesDahsboard } from "@/pages/dashboard/categories";
import { ProductsDAshoard } from "@/pages/dashboard/products";
import { ProductById } from "@/pages/dashboard/products/[id]";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
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
      },
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
          <ProtectedLayout>
            <App />
          </ProtectedLayout>
        ),
      },
      {
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
            element: <ProductsDAshoard />,
          },
          {
            path: "product/:id",
            element: <ProductById />,
          },
        ],
      },
    ],
  },
]);
