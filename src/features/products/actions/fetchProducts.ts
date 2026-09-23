import { createSupabaseServerClient } from "@/lib/db/supabaseServer";

export type ProductInfo = {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  active: boolean;
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
