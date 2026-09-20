import { supabase } from "@/lib/db/supabaseClient";

export const checkUserBusiness = async () => {
  const userAuth = supabase.auth.getUser();
  const { count, error } = await supabase
    .from("business_users")
    .select("*", { count: "exact", head: true })
    .eq("user_id", (await userAuth).data.user!.id);

  if (error) throw error;
  return count;
};
