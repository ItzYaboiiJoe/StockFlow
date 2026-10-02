import { supabase } from "@/lib/db/supabaseClient";

// Delete product from DB
export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw error;
};
