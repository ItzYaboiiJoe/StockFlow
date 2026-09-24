import { fetchVariants, specificProductInfo } from "../actions/fetchProducts";
import ProductVariantsTable from "./ProductVariantsTable";
import ProductVariantsDetails from "./ProductVariantsDetails";
import { Button } from "@/components/ui/button";

const ProductVariants = async ({ productId }: { productId: string }) => {
  const variants = await fetchVariants(productId);
  const productInfo = await specificProductInfo(productId);

  return (
    <div className="p-10">
      <ProductVariantsDetails product={productInfo} />
      <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between">
        <h2 className="text-lg font-semibold">Variants</h2>

        <Button>Add Variant</Button>
      </div>
      <ProductVariantsTable variants={variants} />
    </div>
  );
};

export default ProductVariants;
