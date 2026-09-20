"use client";

import { Button } from "@/components/ui/button";
import { signoutUSer } from "../actions/signout";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

const Signout = () => {
  const router = useRouter();
  const handleSignout = async () => {
    try {
      await signoutUSer();
      toast.add({
        type: "success",
        description: "Successfully signed out.",
        priority: "high",
      });
      router.push("/login");
    } catch (error) {
      toast.add({
        type: "error",
        description:
          "Error signing out. Please try again. Error: " +
          (error instanceof Error),
        priority: "high",
      });
    }
  };

  return (
    <Button variant="outline" onClick={handleSignout}>
      Sign Out
    </Button>
  );
};

export default Signout;
