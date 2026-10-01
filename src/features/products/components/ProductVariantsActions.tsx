"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EditProductVariantsModal from "./EditProductVariantsModal";
import { ProductVariantsInfo } from "../actions/fetchProducts";

const ProductVariantsActions = ({
  variant,
}: {
  variant: ProductVariantsInfo;
}) => {
  // State to open the edit variant modal
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size={"xs"} variant="ghost" />}>
          ⋮
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              Edit Variant
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              Delete Variant
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Edit Product Variants Modal */}
      <EditProductVariantsModal
        open={editOpen}
        onOpenChange={setEditOpen}
        variant={variant}
      />
    </>
  );
};

export default ProductVariantsActions;
