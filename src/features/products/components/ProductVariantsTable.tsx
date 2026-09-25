import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ProductVariantsInfo } from "../actions/fetchProducts";
import { Badge } from "@/components/ui/badge";

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
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell className="max-w-80 px-5 font-medium">
                <HoverCard>
                  <HoverCardTrigger className="block truncate">
                    {variant.variant_name}
                  </HoverCardTrigger>
                  <HoverCardContent>{variant.variant_name}</HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell className="max-w-80 truncate">{variant.sku}</TableCell>
              <TableCell>${Number(variant.price).toFixed(2)}</TableCell>
              <TableCell>
                {variant.cost !== null
                  ? `$${Number(variant.cost).toFixed(2)}`
                  : "—"}
              </TableCell>
              <TableCell>{variant.low_stock_threshold}</TableCell>
              <TableCell>
                <Badge variant={variant.active ? "default" : "destructive"}>
                  {variant.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductVariantsTable;
