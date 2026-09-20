import { supabase } from "@/lib/db/supabaseClient";

// create a new business in the database
export const createBusiness = async (name: string) => {
  const { data, error } = await supabase
    .from("businesses")
    .insert([{ name: name }])
    .select("id")
    .single();

  if (error) throw error;
  return data;
};

// Create business user as owner
export const createBusinessOwner = async (businessID: number) => {
  const { error } = await supabase
    .from("business_users")
    .insert([{ business_id: businessID, role: "owner" }]);

  if (error) throw error;
};
