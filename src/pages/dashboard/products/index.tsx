import { HandleCreateProduct } from "@/features/components/dialog/product/HandleCreate";
import { ProductsSectionDashboard } from "@/pages/dashboard/products/Products";
import { HeaderDashboard } from "@/layouts/header/HeaderDashboard";

export function ProductsDashoard() {
  return (
    <>
      <HeaderDashboard
        title="Product"
        subTitle="Optimize  your Product  in here">
        <HandleCreateProduct />
      </HeaderDashboard>
      <ProductsSectionDashboard />
    </>
  );
}
