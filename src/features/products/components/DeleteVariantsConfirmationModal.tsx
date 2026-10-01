"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProductVariantsInfo } from "../actions/fetchProducts";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { deleteVariant } from "../actions/deleteVariants";

const DeleteVariantsConfirmationModal = ({
  open,
  onOpenChange,
  variant,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: ProductVariantsInfo;
}) => {
  const [loading, setLoading] = useState(false);
  // Handle the deletion of the variant
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteVariant(variant.id);
      toast.add({
        type: "success",
        description: `Variant ${variant.variant_name} deleted successfully`,
        priority: "high",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete variant:", error);
      toast.add({
        type: "error",
        description: `Failed to delete variant ${variant.variant_name}`,
        priority: "high",
      });
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            <span className="font-bold">{variant.variant_name}</span> variant
            from this product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={handleDelete}
            variant={"destructive"}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner className="size-4" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVariantsConfirmationModal;
