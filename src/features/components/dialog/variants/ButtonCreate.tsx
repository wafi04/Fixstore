import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormVariants } from "./FormVariants";

export function ButtonCreate({
  open,
  onOpen,
  onClose,
  productId,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  productId: string;
}) {
  return (
    <>
      <Button onClick={onOpen}>
        <Plus className="size-4" />
        <p>Create</p>
      </Button>
      {open && (
        <FormVariants
          open={open}
          onClose={onClose}
          title="Create Variants"
          subTitle="Add Variants Product"
          productId={productId}
        />
      )}
    </>
  );
}
