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

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BusinessLayout;
