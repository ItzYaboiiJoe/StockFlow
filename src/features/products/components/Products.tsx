import ProductsHeader from "./ProductsHeader";
import ProductsEmpty from "./ProductsEmpty";

const Products = () => {
  return (
    <div className="p-10">
      {/* Header */}
      <ProductsHeader />
      <ProductsEmpty />
    </div>
  );
};

export default Products;
