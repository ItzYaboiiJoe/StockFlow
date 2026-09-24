import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProductInfo } from "../actions/fetchProducts";
import Link from "next/link";

const ProductsTable = ({ products }: { products: ProductInfo[] }) => {
  return (
    <div className="mt-10 max-w-4xl mx-auto overflow-hidden rounded-xl border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="px-5">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="p-0 font-medium">
                <Link
                  href={`/products/${product.id}`}
                  className="block px-5 py-4"
                >
                  {product.name}
                </Link>
              </TableCell>
              <TableCell className="p-0 text-muted-foreground">
                <Link
                  href={`/products/${product.id}`}
                  className="block px-2 py-4"
                >
                  {product.category || "—"}
                </Link>
              </TableCell>
              <TableCell className="p-0">
                <Link
                  href={`/products/${product.id}`}
                  className="block px-2 py-4"
                >
                  <Badge variant={product.active ? "default" : "destructive"}>
                    {product.active ? "Active" : "Inactive"}
                  </Badge>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
