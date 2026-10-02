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
import EditProductForm from "./EditProductForm";
import { ProductInfo } from "../actions/fetchProducts";

const EditProductModal = ({
  children,
  product,
}: {
  children: React.ReactElement;
  product: ProductInfo;
}) => {
  // Control modal open and close
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit Product Information</DialogDescription>
        </DialogHeader>
        <EditProductForm onSuccess={() => setOpen(false)} product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
