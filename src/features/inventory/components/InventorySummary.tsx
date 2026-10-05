import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryInfo } from "../actions/fetchInventory";

const InventorySummary = ({ inventory }: { inventory: InventoryInfo[] }) => {
  // Calculate the total units available in inventory
  let totalUnits = 0;
  inventory.forEach((product) => {
    product.product_variant.forEach((variant) => {
      variant.inventory_transactions.forEach((transaction) => {
        totalUnits += transaction.quantity_change;
      });
    });
  });

  // Calculate the total low stock and out of stock available in inventory
  let lowStock = 0;
  let outOfStock = 0;

  inventory.forEach((product) => {
    product.product_variant.forEach((variant) => {
      let variantStock = 0;
      variant.inventory_transactions.forEach((transaction) => {
        variantStock += transaction.quantity_change;
      });
      // Counting low stock
      if (variantStock > 0 && variantStock <= variant.low_stock_threshold) {
        lowStock++;
      }
      // Counting out of stock
      if (variantStock === 0) {
        outOfStock++;
      }
    });
  });

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Units</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{totalUnits}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Low Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{lowStock}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Out of Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{outOfStock}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventorySummary;
