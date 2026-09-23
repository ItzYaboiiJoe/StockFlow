import { ProductInfo } from "../actions/fetchProducts";

const ProductsTable = ({ products }: { products: ProductInfo[] }) => {
  console.log(products);
  return <div>Products Table here</div>;
};

export default ProductsTable;
