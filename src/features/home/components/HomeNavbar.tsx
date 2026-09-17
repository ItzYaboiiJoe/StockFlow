import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HomeNavbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Title */}
        <Link href="/" className="text-xl font-bold">
          StockFlow
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features">Features</Link>
          <Link href="#how-it-works">How It Works</Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost">
            <Link href="/login">Sign In</Link>
          </Button>

          <Button>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon">
                  <IconMenu2 className="h-5 w-5" />
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                render={<Link href="#features">Features</Link>}
              />

              <DropdownMenuItem
                render={<Link href="#how-it-works">How It Works</Link>}
              />

              <DropdownMenuSeparator />

              <DropdownMenuItem render={<Link href="/login">Sign In</Link>} />

              <DropdownMenuItem
                render={<Link href="/register">Get Started</Link>}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
