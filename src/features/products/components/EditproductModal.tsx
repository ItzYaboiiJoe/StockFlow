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

const EditProductModal = () => {
  return (
    <Dialog>
      <DialogTrigger />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit Product Information</DialogDescription>
        </DialogHeader>
        Edit Product Form Here
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
