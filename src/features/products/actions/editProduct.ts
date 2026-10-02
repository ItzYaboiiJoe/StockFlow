import { supabase } from "@/lib/db/supabaseClient";

// Update Product Information
export const updateProductInfo = async (
  id: number,
  name: string,
  description: string,
  category: string,
  status: boolean,
) => {
  const { error } = await supabase
    .from("products")
    .update({
      name: name,
      description: description,
      category: category,
      active: status,
    })
    .eq("id", id);

  if (error) throw error;
};
