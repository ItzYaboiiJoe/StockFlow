"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>

        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Button className="mt-6" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
