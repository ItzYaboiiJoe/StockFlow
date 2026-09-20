import { supabase } from "@/lib/db/supabaseClient";

// Signout user from Supabase
export const signoutUSer = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
