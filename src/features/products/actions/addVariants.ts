import { supabase } from "@/lib/db/supabaseClient";

// Add Variant to DB
export const addNewVariant = async (
  productId: string,
  sku: string,
  variantName: string,
  price: number,
  cost: number | undefined,
  lowStockThreshold: number,
) => {
  const { error } = await supabase.from("product_variant").insert([
    {
      product_id: productId,
      sku: sku,
      variant_name: variantName,
      price: price,
      cost: cost,
      low_stock_threshold: lowStockThreshold,
    },
  ]);

  if (error) throw error;
};
