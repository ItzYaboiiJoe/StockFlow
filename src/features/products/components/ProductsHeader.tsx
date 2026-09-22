import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import AddProductModal from "./AddProductModal";

const ProductsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Manage your products and variants.
      </p>
      <AddProductModal>
        <Button>
          <IconPlus />
          Add Product
        </Button>
      </AddProductModal>
    </div>
  );
};

export default ProductsHeader;
