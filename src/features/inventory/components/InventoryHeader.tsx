import { Button } from "@/components/ui/button";
import AdjustInventoryModal from "./AdjustInventoryModal";
import { InventoryInfo } from "../actions/fetchInventory";

const InventoryHeader = ({ inventory }: { inventory: InventoryInfo[] }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Manage your inventory and log stock changes.
      </p>
      <AdjustInventoryModal inventory={inventory}>
        <Button>Adjust Inventory</Button>
      </AdjustInventoryModal>
    </div>
  );
};

export default InventoryHeader;
