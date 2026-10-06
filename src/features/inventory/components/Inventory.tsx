import { fetchInventory } from "../actions/fetchInventory";
import InventoryEmpty from "./InventoryEmpty";
import InventoryHeader from "./InventoryHeader";
import InventorySummary from "./InventorySummary";

const Inventory = async () => {
  const inventory = await fetchInventory();

  return (
    <div className="p-10">
      {/* Header */}
      <InventoryHeader inventory={inventory} />
      {/* If there are no inventory that means no products have been added yet then display a message and button to go create a product and variant */}
      {inventory.length === 0 ? (
        <InventoryEmpty />
      ) : (
        <InventorySummary inventory={inventory} />
      )}
    </div>
  );
};

export default Inventory;
