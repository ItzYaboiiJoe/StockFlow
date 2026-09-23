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

const ProductsTable = ({ products }: { products: ProductInfo[] }) => {
  return (
    <div className="mt-10 overflow-hidden rounded-xl border">
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
            <TableRow key={product.id} className="h-14">
              <TableCell className="px-5 font-medium">{product.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {product.category || "—"}
              </TableCell>
              <TableCell>
                <Badge variant={product.active ? "default" : "destructive"}>
                  {product.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
