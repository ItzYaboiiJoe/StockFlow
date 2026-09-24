import { createSupabaseServerClient } from "@/lib/db/supabaseServer";

export type ProductInfo = {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  active: boolean;
};

export type ProductVariantsInfo = {
  id: number;
  sku: string;
  variant_name: string;
  price: number;
  cost: number | null;
  low_stock_threshold: number;
};

// Fetch Products
export const fetchProducts = async () => {
  const supabase = await createSupabaseServerClient();
  const user = await supabase.auth.getUser();

  const { data: businessUser, error: businessUserError } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user.data.user!.id)
    .single();

  if (businessUserError) throw businessUserError;

  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, category, active")
    .eq("business_id", businessUser.business_id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// Fetch Product Variants
export const fetchVariants = async (productID: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product_variant")
    .select("id, sku, variant_name, price, cost, low_stock_threshold")
    .eq("product_id", productID)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};
