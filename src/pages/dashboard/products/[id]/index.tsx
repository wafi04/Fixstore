import { useGetAllVariantsByProduct } from "@/features/api/variants/variants.query";
import { ButtonCreate } from "@/features/components/dialog/variants/ButtonCreate";
import { VariantsCard } from "@/features/components/styling/variants/VariantsCard";
import { HeaderDashboard } from "@/layouts/header/HeaderDashboard";
import { VariantsData } from "@/types/variants";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function ProductById() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { data } = useGetAllVariantsByProduct(id as string);
  return (
    <>
      <HeaderDashboard
        title="Variants"
        subTitle="Manage your Product  Variants here">
        <ButtonCreate
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          productId={id as string}
        />
      </HeaderDashboard>
      {data &&
        data.map((item: VariantsData) => (
          <VariantsCard key={item.id} data={item} />
        ))}
    </>
  );
}
