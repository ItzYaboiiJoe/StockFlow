import { supabase } from "@/lib/db/supabaseClient";

// Fetch Business ID
export const getCurrentBusinessID = async () => {
  const userAuth = supabase.auth.getUser();
  const { data, error } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", (await userAuth).data.user!.id)
    .single();

  if (error) throw error;

  return data.business_id;
};

// Add Product to DB
export const addProductInfo = async (
  businessID: number,
  name: string,
  description: string,
  category: string,
) => {
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        business_id: businessID,
        name: name,
        description: description,
        category: category,
      },
    ])
    .select("id")
    .single();

  if (error) throw error;
  return data;
};

export const addProductVariant = async (
  productID: number,
  sku: string,
  variantName: string,
  price: number,
  cost: number,
  lowStockThreshold: number,
) => {
  const { error } = await supabase.from("product_variant").insert([
    {
      product_id: productID,
      sku: sku,
      variant_name: variantName,
      price: price,
      cost: cost,
      low_stock_threshold: lowStockThreshold,
    },
  ]);

  if (error) throw error;
};
