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
import AdjustInventoryForm from "./AdjustInventoryForm";

const AdjustInventoryModal = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  // Control modal open and close
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Adjust Inventory</DialogTitle>
          <DialogDescription>
            Add or remove stock for a product variant and record the reason for
            the adjustment.
          </DialogDescription>
        </DialogHeader>
        <AdjustInventoryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AdjustInventoryModal;
