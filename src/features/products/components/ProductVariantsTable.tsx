import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductVariantsInfo } from "../actions/fetchProducts";

const ProductVariantsTable = ({
  variants,
}: {
  variants: ProductVariantsInfo[];
}) => {
  return (
    <div className="mt-5 max-w-4xl mx-auto overflow-hidden rounded-xl border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="px-5">Variant</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Low Stock Threshold</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell className="max-w-80 truncate px-5 font-medium">
                {variant.variant_name}
              </TableCell>
              <TableCell className="max-w-80 truncate">{variant.sku}</TableCell>
              <TableCell>${Number(variant.price).toFixed(2)}</TableCell>
              <TableCell>
                {variant.cost !== null
                  ? `$${Number(variant.cost).toFixed(2)}`
                  : "—"}
              </TableCell>
              <TableCell>{variant.low_stock_threshold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductVariantsTable;
