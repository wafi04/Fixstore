"use client";
import { useGetAllVariantsByProduct } from "@/features/api/variants/variants.query";
import { VariantsData } from "@/types/variants";
import { useState } from "react";
import { VariantsCard } from "./VariantsCard";
import { HeaderDashboard } from "@/layouts/header/HeaderDashboard";
import { ButtonCreate } from "@/features/components/dialog/variants/ButtonCreate";

export function ProductVariantPage({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const { data } = useGetAllVariantsByProduct(productId);
  return (
    <>
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
    </>
  );
}
