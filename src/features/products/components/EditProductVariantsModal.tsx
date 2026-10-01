"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProductVariantForm from "./EditProductVariantForm";
import { ProductVariantsInfo } from "../actions/fetchProducts";

const EditProductVariantsModal = ({
  open,
  onOpenChange,
  variant,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: ProductVariantsInfo;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Variant</DialogTitle>
          <DialogDescription>Edit the product variant.</DialogDescription>
        </DialogHeader>
        <EditProductVariantForm
          variant={variant}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductVariantsModal;
