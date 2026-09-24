import { fetchVariants, specificProductInfo } from "../actions/fetchProducts";
import ProductVariantsTable from "./ProductVariantsTable";
import ProductVariantsDetails from "./ProductVariantsDetails";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

const ProductVariants = async ({ productId }: { productId: string }) => {
  const variants = await fetchVariants(productId);
  const productInfo = await specificProductInfo(productId);

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

        <Button>Add Variant</Button>
      </div>
      {/* Variants Table */}
      <ProductVariantsTable variants={variants} />
    </div>
  );
};

export default ProductVariants;
