import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { FormProfile } from "./FormProfile";

export function DialogProfile({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make profile be complecated</DialogTitle>
          <DialogDescription>Make Profile Be complicated</DialogDescription>
          <FormProfile />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
