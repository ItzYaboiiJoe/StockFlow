import ProductsHeader from "./ProductsHeader";
import ProductsEmpty from "./ProductsEmpty";
import ProductsTable from "./ProductsTable";
import { fetchProducts } from "../actions/fetchProducts";

const Products = async () => {
  // Fetch Products
  const products = await fetchProducts();

  return (
    <div className="p-10">
      {/* Header */}
      <ProductsHeader />
      {/* If there are no products display an empty page with a message to add product else display the table with the current products */}
      {products.length === 0 ? (
        <ProductsEmpty />
      ) : (
        <ProductsTable products={products} />
      )}
    </div>
  );
};

export default Products;
