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
import { InventoryInfo } from "../actions/fetchInventory";

const AdjustInventoryModal = ({
  children,
  inventory,
}: {
  children: React.ReactElement;
  inventory: InventoryInfo[];
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
        <AdjustInventoryForm
          onSuccess={() => setOpen(false)}
          inventory={inventory}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdjustInventoryModal;
