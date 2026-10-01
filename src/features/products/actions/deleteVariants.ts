import { supabase } from "@/lib/db/supabaseClient";

// Delete a product variant by its ID
export const deleteVariant = async (id: number) => {
  const { error } = await supabase
    .from("product_variant")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
