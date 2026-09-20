import Onboarding from "@/features/onboarding/components/Onboarding";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count, error } = await supabase
    .from("business_users")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  if (error) throw error;

  if (count! > 0) {
    redirect("/dashboard");
  }

  return <Onboarding />;
};

export default OnboardingPage;
