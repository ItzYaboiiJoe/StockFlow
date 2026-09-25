"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddProductVariantsModal = ({
  children,
  productId,
}: {
  children: React.ReactElement;
  productId: string;
}) => {
  // Control modal open and close
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Variant</DialogTitle>
          <DialogDescription>
            Add a new product variant to your inventory.
          </DialogDescription>
        </DialogHeader>
        <div>Form Here:</div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductVariantsModal;
