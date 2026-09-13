import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeBody = () => {
  return (
    <div>
      {/* Hero */}
      <div className="px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
            Inventory. Orders. Simplified.
          </p>

          <h1 className="text-6xl font-bold">Keep your business in motion.</h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Manage inventory, orders, customers, and purchasing from one
            organized platform built for growing businesses.
          </p>

          <div className="mt-8">
            <Button size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 rounded-xl border p-8 text-left">
            Dashboard Preview
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="border-t px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider">
              Everything You Need
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Run your operations from one place.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Keep the important parts of your business organized and connected.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="rounded-xl border p-6">Inventory</div>
            <div className="rounded-xl border p-6">Orders</div>
            <div className="rounded-xl border p-6">Customers</div>
            <div className="rounded-xl border p-6">Purchasing</div>
            <div className="rounded-xl border p-6">Suppliers</div>
            <div className="rounded-xl border p-6">Analytics</div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div id="how-it-works" className="border-t px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider">
              How It Works
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Simple enough for everyday work.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-2xl font-bold">01</p>
              <h3 className="mt-4 text-xl font-semibold">Add your products</h3>
              <p className="mt-2 text-muted-foreground">
                Create your products and starting inventory.
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">02</p>
              <h3 className="mt-4 text-xl font-semibold">Record activity</h3>
              <p className="mt-2 text-muted-foreground">
                Create orders and receive inventory.
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">03</p>
              <h3 className="mt-4 text-xl font-semibold">
                StockFlow tracks it
              </h3>
              <p className="mt-2 text-muted-foreground">
                Inventory, sales, and analytics update automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-xl border p-16 text-center">
          <h2 className="text-4xl font-bold">Ready to take control?</h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Keep your inventory, orders, and business organized with StockFlow.
          </p>

          <div className="mt-8">
            <Button size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="font-semibold">StockFlow</p>

          <p className="text-sm text-muted-foreground">© 2026 StockFlow</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
