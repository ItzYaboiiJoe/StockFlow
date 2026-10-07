import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InventoryInfo } from "../actions/fetchInventory";

const InventoryTable = ({ inventory }: { inventory: InventoryInfo[] }) => {
  return (
    <div className="mt-10 overflow-hidden rounded-xl border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Variant</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Low Stock At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((product) =>
            product.product_variant.map((variant) => {
              let currentStock = 0;
              variant.inventory_transactions.forEach((transaction) => {
                currentStock += transaction.quantity_change;
              });
              let status = "In Stock";
              if (currentStock <= 0) {
                status = "Out of Stock";
              } else if (currentStock <= variant.low_stock_threshold) {
                status = "Low Stock";
              }
              return (
                <TableRow key={variant.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{variant.variant_name}</TableCell>
                  <TableCell>{variant.sku}</TableCell>
                  <TableCell>{currentStock}</TableCell>
                  <TableCell>{variant.low_stock_threshold}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        status === "In Stock"
                          ? "bg-green-600 text-white"
                          : status === "Low Stock"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-600 text-white"
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            }),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
