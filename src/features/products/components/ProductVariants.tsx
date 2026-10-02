import { fetchVariants, specificProductInfo } from "../actions/fetchProducts";
import ProductVariantsTable from "./ProductVariantsTable";
import ProductVariantsDetails from "./ProductVariantsDetails";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowLeft, IconPackage, IconPlus } from "@tabler/icons-react";
import AddProductVariantsModal from "./AddProductVariantsModal";
import { notFound } from "next/navigation";

const ProductVariants = async ({ productId }: { productId: string }) => {
  const variants = await fetchVariants(productId);
  const productInfo = await specificProductInfo(productId);

  if (!productInfo) {
    notFound();
  }

  return (
    <div className="p-10">
      {/* Back to products button */}
      <Link href="/products">
        <Button variant="ghost" className="mb-6">
          <IconArrowLeft />
          Back to Products
        </Button>
      </Link>

      {/* Header Product Information */}
      <ProductVariantsDetails product={productInfo} />
      <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between">
        <h2 className="text-lg font-semibold">Variants</h2>

        {/* Open Add Variants Modal */}
        <AddProductVariantsModal productId={productId}>
          <Button>Add Variant</Button>
        </AddProductVariantsModal>
      </div>

      {/* If there are no variants display an empty page with a message to add variant else display the table with all variants */}
      {variants.length === 0 ? (
        <div className="mt-10 flex min-h-72 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <IconPackage className="mx-auto mb-4 size-10 text-muted-foreground" />
            <p className="font-medium">No variants available</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add a variant to your product to start tracking inventory.
            </p>
            <AddProductVariantsModal productId={productId}>
              <Button className="mt-4">
                <IconPlus />
                Add Variant
              </Button>
            </AddProductVariantsModal>
          </div>
        </div>
      ) : (
        // Variants Table
        <ProductVariantsTable variants={variants} />
      )}
    </div>
  );
};

export default ProductVariants;
