import { fetchInventory } from "../actions/fetchInventory";
import InventoryEmpty from "./InventoryEmpty";
import InventoryHeader from "./InventoryHeader";

const Inventory = async () => {
  const inventory = await fetchInventory();

  return (
    <div className="p-10">
      {/* Header */}
      <InventoryHeader />
      {/* If there are no inventory that means no products have been added yet then display a message and button to go create a product and variant */}
      {inventory.length === 0 ? <InventoryEmpty /> : <div>Inventory UI</div>}
    </div>
  );
};

export default Inventory;
