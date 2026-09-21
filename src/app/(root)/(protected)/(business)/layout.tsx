import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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

  // Fetch user information
  const { data: userInfo, error: userInfoError } = await supabase
    .from("users")
    .select("first_name, last_name, email")
    .eq("user_id", user!.id)
    .single();

  if (userInfoError) throw userInfoError;

  return (
    <SidebarProvider>
      <AppSidebar
        businessName={business.name}
        user={{
          name: `${userInfo.first_name} ${userInfo.last_name}`,
          email: userInfo.email,
        }}
      />

      <SidebarInset>
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BusinessLayout;
