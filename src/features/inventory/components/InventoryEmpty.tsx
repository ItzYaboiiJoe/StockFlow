import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const InventoryEmpty = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-xl border py-20">
      <h2 className="text-xl font-semibold">No inventory yet</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Add a product and variant to start tracking inventory.
      </p>

      <Link href="/products" className={cn(buttonVariants(), "mt-6")}>
        Add Product
      </Link>
    </div>
  );
};

export default InventoryEmpty;
