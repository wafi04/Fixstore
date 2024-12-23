import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InventoryForm } from "@/types/variants";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { InventoryFormDialog } from "./varianst-form/FormInventory";

export type FormDropdown = {
  openUpdate: boolean;
  openDelete: boolean;
  openInventory: boolean;
  openImage: boolean;
};

export function ButtonDialogVariants({
  inventory,
  variantId,
}: {
  inventory: InventoryForm[];
  variantId: string;
}) {
  console.log(inventory);
  const [formData, setFormData] = useState<FormDropdown>({
    openDelete: false,
    openImage: false,
    openInventory: false,
    openUpdate: false,
  });

  const handleOpen = (field: keyof FormDropdown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  const handleClose = (field: keyof FormDropdown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: false,
    }));
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-2 size-4 bg-white text-black hover:bg-gray-200 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleOpen("openUpdate")}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpen("openDelete")}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpen("openInventory")}>
            Inventory
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpen("openImage")}>
            Images
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {
        <Dialog
          open={formData.openInventory}
          onOpenChange={() => handleClose("openInventory")}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form Inventory</DialogTitle>
              <DialogDescription>Form Inventory </DialogDescription>
            </DialogHeader>
            <InventoryFormDialog data={inventory} variantId={variantId} />
          </DialogContent>
        </Dialog>
      }
    </>
  );
}
