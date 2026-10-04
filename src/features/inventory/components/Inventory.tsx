import { fetchInventory } from "../actions/fetchInventory";

const Inventory = async () => {
  const inventory = await fetchInventory();
  console.log(inventory);
  return <div className="p-10">Inventory Page</div>;
};

export default Inventory;
