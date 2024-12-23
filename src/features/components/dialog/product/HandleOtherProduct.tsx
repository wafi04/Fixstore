"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/types/product";
import { FormProduct } from "./FormProduct";
// import { CategoryForm } from "@/types/categories";

export function HandleOtherProduct({
  initialData,
}: {
  initialData: ProductForm;
}) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = useCallback((open: boolean, type: "delete" | "update") => {
    if (type === "delete") {
      setOpenDelete(!open);
    } else {
      setOpenUpdate(!open);
    }
  }, []);

  const handleDelete = () => {
    if (initialData && initialData.id) {
      // deletes.mutate();
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="shadow-transparent p-2 size-5 bg-transparent  hover:bg-transparent">
            <Ellipsis className="text-gray-900" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleOpen(openUpdate, "update")}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openUpdate && (
        <Dialog open={openUpdate} onOpenChange={() => setOpenUpdate(false)}>
          <DialogContent>
            <DialogHeader className="border-b-2 pb-2">
              <DialogTitle>Update Category</DialogTitle>
              <DialogDescription>
                update Category form category
              </DialogDescription>
            </DialogHeader>
            <FormProduct
              onClose={() => setOpenUpdate(false)}
              open={openUpdate}
              text="Update Product"
              textSubmiting="Updating...."
              title="Update Categories"
              subTitle=""
              initialData={initialData}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
