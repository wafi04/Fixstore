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
import { CategoryUpdate } from "@/types/categories";
import { FormCategory } from "./FormCategory";
import { useDeleteCategory } from "@/features/api/categories/category.query";

export function HandleOther(initialData: CategoryUpdate) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const deletes = useDeleteCategory();
  const handleOpen = useCallback((open: boolean, type: "delete" | "update") => {
    if (type === "delete") {
      setOpenDelete(!open);
    } else {
      setOpenUpdate(!open);
    }
  }, []);

  const handleDelete = () => {
    if (initialData && initialData.id) {
      deletes.mutate(initialData.id);
    }
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
          <DropdownMenuItem onClick={() => handleOpen(openUpdate, "update")}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deletes.isPending} onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
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
            <FormCategory
              onClose={() => setOpenUpdate(false)}
              open={openUpdate}
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
