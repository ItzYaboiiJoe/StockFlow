import { Button } from "@/components/ui/button";
import { IconPackage, IconPlus } from "@tabler/icons-react";
import AddProductModal from "./AddProductModal";

const ProductsEmpty = () => {
  return (
    <div className="mt-10 flex min-h-72 items-center justify-center rounded-lg border border-dashed">
      <div className="text-center">
        <IconPackage className="mx-auto mb-4 size-10 text-muted-foreground" />
        <p className="font-medium">No products yet</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Add your first product to start tracking inventory.
        </p>
        <AddProductModal>
          <Button className="mt-4">
            <IconPlus />
            Add Product
          </Button>
        </AddProductModal>
      </div>
    </div>
  );
};

export default ProductsEmpty;
