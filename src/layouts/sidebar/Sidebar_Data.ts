import {
  Home,
  BarChart,
  Settings,
  User,
  ShoppingBag,
  ShoppingCart,
  Bell,
  Layers,
} from "lucide-react";

export const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Layers,
    label: "Categories",
    path: "/dashboard/category",
    adminOnly: true, // Added explicit admin flag
  },
  {
    icon: BarChart,
    label: "Products",
    path: "/dashboard/product",
    adminOnly: true, // Added explicit admin flag
  },
  {
    icon: ShoppingBag,
    label: "Cart",
    path: "/dashboard/cart",
  },
  {
    icon: ShoppingCart,
    label: "Checkout",
    path: "/dashboard/checkout",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/dashboard/notifications",
  },
  {
    icon: User,
    label: "Profile",
    path: "/dashboard/profile",
  },
];

// Helper function to filter menu items based on user role
export const getFilteredMenuItems = (isAdmin: boolean) => {
  return menuItems.filter(
    (item) => !item.adminOnly || (item.adminOnly && isAdmin)
  );
};
