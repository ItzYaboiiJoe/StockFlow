import { createSupabaseServerClient } from "@/lib/db/supabaseServer";

export type InventoryInfo = {
  id: number;
  name: string;
  product_variant: {
    id: number;
    sku: string;
    variant_name: string;
    low_stock_threshold: number;
    inventory_transactions: {
      id: number;
      quantity_change: number;
      reason: string;
      note: string | null;
      created_by: string;
      created_at: string;
    }[];
  }[];
};

// Fetch inventory data from 3 tables to calculate the stock amount and display it in the inventory page logs
export const fetchInventory = async () => {
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  // Fetch current user's business
  const { data: businessUser, error: businessUserError } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user.user?.id)
    .single();

  if (businessUserError) throw businessUserError;

  // Fetch inventory
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      product_variant(
        id,
        sku,
        variant_name,
        low_stock_threshold,
        inventory_transactions(
          id,
          quantity_change,
          reason,
          note,
          created_by,
          created_at
        )
      )
    `,
    )
    .eq("business_id", businessUser.business_id);

  if (error) throw error;

  return data;
};
