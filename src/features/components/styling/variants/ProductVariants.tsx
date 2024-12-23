"use client";
import { useGetAllVariantsByProduct } from "@/features/api/variants/variants.query";
import { HeaderDashboard } from "@/components/layout/header/HeaderDashboard";
import { VariantsData } from "@/types/variants";
import { useState } from "react";
import { ButtonCreate } from "../../dialog/variants/ButtonCreate";
import { VariantsCard } from "./VariantsCard";

export function ProductVariantPage({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const { data } = useGetAllVariantsByProduct(productId);
  return (
    <main className="p-6 space-y-6 ">
      <HeaderDashboard
        title="Variants"
        subTitle="Manage your Product  Variants here">
        <ButtonCreate
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          productId={productId}
        />
      </HeaderDashboard>
      {data &&
        data.map((item: VariantsData) => (
          <VariantsCard key={item.id} data={item} />
        ))}
    </main>
  );
}
