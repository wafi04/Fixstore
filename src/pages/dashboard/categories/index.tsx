import { HandleCreate } from "@/features/components/dialog/categories/HandleCreate";
import { HeaderDashboard } from "@/layouts/header/HeaderDashboard";
import CategoriesDataPage from "./Categories";

export function CategoriesDahsboard() {
  return (
    <>
      <HeaderDashboard
        title="Category"
        subTitle="Manage your product categories here">
        <HandleCreate />
      </HeaderDashboard>
      <CategoriesDataPage />
    </>
  );
}
