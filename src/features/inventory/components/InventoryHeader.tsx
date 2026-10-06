import { Button } from "@/components/ui/button";
import AdjustInventoryModal from "./AdjustInventoryModal";

const InventoryHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Manage your inventory and log stock changes.
      </p>
      <AdjustInventoryModal>
        <Button>Adjust Inventory</Button>
      </AdjustInventoryModal>
    </div>
  );
};

export default InventoryHeader;
