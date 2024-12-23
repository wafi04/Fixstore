"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormCategory } from "./FormCategory";

export function HandleCreate() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        <p>Create</p>
      </Button>
      {open && (
        <FormCategory
          title="Create Category"
          open={open}
          subTitle=""
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
