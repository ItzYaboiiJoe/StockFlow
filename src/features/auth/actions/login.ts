import { supabase } from "@/lib/db/supabaseClient";

// This API call is for logging in
export const loginUser = async (email: string, password: string) => {
  const { data: auth, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw error;
  return auth;
};

// This API call is to check the users table to check for authenticate value
export const checkUsersTable = async (uuid: string) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("user_uuid", uuid)
    .single();

  if (userError) throw userError;

  return user;
};

// This API call is to update authenticated column under users table to true
export const authenticateUser = async (uuid: string) => {
  const { error: updateError } = await supabase
    .from("users")
    .update({ authenticated: true })
    .eq("user_uuid", uuid);

  if (updateError) throw updateError;
};
