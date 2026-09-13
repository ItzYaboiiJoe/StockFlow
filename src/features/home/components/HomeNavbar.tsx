import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomeNavbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Title */}
        <Link href="/" className="text-xl font-bold">
          StockFlow
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link href="#features">Features</Link>
          <Link href="#how-it-works">How It Works</Link>
        </div>

        {/* Account Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <Link href="/login">Sign In</Link>
          </Button>

          <Button>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
