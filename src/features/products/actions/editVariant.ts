import { supabase } from "@/lib/db/supabaseClient";

export const updateVariantInfo = async (
  id: number,
  sku: string,
  vName: string,
  price: number,
  cost: number | undefined,
  lowStockThreshold: number,
  status: boolean,
) => {
  const { error } = await supabase
    .from("product_variant")
    .update({
      sku: sku,
      variant_name: vName,
      price: price,
      cost: cost,
      low_stock_threshold: lowStockThreshold,
      active: status,
    })
    .eq("id", id);

  if (error) throw error;
};
