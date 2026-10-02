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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { ProductInfo } from "../actions/fetchProducts";
import { deleteProduct } from "../actions/deleteProduct";
import { useRouter } from "next/navigation";

const DeleteProductModal = ({
  children,
  product,
}: {
  children: React.ReactElement;
  product: ProductInfo;
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle Product Deletion
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(product.id);
      toast.add({
        type: "success",
        description: `Product ${product.name} deleted successfully`,
        priority: "high",
      });
      router.push("/products");
    } catch (error) {
      toast.add({
        type: "error",
        description: `Failed to delete product ${product.name} : ${error}`,
        priority: "high",
      });
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold">{product.name}</span> Product.
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

export default DeleteProductModal;
