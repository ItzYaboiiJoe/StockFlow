import Navbar from "@/components/shared/Navbar";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { redirect } from "next/navigation";

const BusinessLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch business id
  const { data: businessUser, error: businessUserError } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user!.id)
    .maybeSingle();

  if (businessUserError) throw businessUserError;

  if (!businessUser) {
    redirect("/onboarding");
  }

  // Fetch business name
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("name")
    .eq("id", businessUser.business_id)
    .single();

  if (businessError) throw businessError;

  return (
    <>
      <Navbar businessName={business.name} />
      {children}
    </>
  );
};

export default BusinessLayout;
