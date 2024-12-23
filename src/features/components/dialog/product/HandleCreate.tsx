"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormProduct } from "./FormProduct";

export function HandleCreateProduct() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        <p>Create</p>
      </Button>
      {open && (
        <FormProduct
          title="Create Category"
          open={open}
          text="Create Product"
          textSubmiting="Creating...."
          subTitle=""
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
