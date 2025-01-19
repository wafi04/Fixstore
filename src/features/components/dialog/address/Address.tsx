import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import FormAddress from "./FormAddress";

export function DialogAddress({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make profile be complecated</DialogTitle>
          <DialogDescription>Make Profile Be complicated</DialogDescription>
          <FormAddress />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
