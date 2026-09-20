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

  const { count, error } = await supabase
    .from("business_users")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  if (error) throw error;

  if (count! === 0) {
    redirect("/onboarding");
  }

  return <>{children}</>;
};

export default BusinessLayout;
