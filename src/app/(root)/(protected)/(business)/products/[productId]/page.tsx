import ProductVariants from "@/features/products/components/ProductVariants";

const ProductIdPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  return <ProductVariants productId={productId} />;
};

export default ProductIdPage;
