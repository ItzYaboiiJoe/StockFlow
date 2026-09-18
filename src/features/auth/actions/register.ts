import { supabase } from "@/lib/db/supabaseClient";

// Register a new user with email and password
export const registerUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw error;
  return data;
};

// Create user in DB Table
export const createUser = async (
  user_id: string,
  firstName: string,
  lastName: string,
  email: string,
) => {
  const { error } = await supabase
    .from("users")
    .insert([
      {
        user_id: user_id,
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    ]);
  if (error) throw error;
};

// Check if email exists in the database
export const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email);
  if (error) throw error;
  return data;
};
