import { supabase } from "@/lib/db/supabaseClient";

export const adjustInventory = async (
  productVariantId: number,
  quantity: number,
  reason: string,
  note: string | undefined,
) => {
  const { error } = await supabase.from("inventory_transactions").insert([
    {
      product_variant_id: productVariantId,
      quantity_change: quantity,
      reason: reason,
      note: note,
    },
  ]);
  if (error) throw error;
};
