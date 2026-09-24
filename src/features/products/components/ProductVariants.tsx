import { fetchVariants } from "../actions/fetchProducts";
import ProductVariantsTable from "./ProductVariantsTable";

const ProductVariants = async ({ productId }: { productId: string }) => {
  const variants = await fetchVariants(productId);

  return (
    <div className="p-10">
      <ProductVariantsTable variants={variants} />
    </div>
  );
};

export default ProductVariants;
