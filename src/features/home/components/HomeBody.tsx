import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  IconPackages,
  IconShoppingCart,
  IconUsers,
  IconTruckDelivery,
  IconBuildingWarehouse,
  IconChartBar,
} from "@tabler/icons-react";

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
            {/* Dashboard Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Here&apos;s what&apos;s happening with your business.
                </p>
              </div>

              <Button variant="outline">Last 30 Days</Button>
            </div>

            {/* KPI Cards */}
            <div className="mt-8 grid grid-cols-4 gap-4">
              <div className="rounded-lg border p-5">
                <p className="text-sm text-muted-foreground">Revenue</p>

                <p className="mt-2 text-2xl font-bold">$42,820</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  +12.4% from last month
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <p className="text-sm text-muted-foreground">Orders</p>

                <p className="mt-2 text-2xl font-bold">642</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  +8.2% from last month
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <p className="text-sm text-muted-foreground">Products</p>

                <p className="mt-2 text-2xl font-bold">184</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Active products
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <p className="text-sm text-muted-foreground">Low Stock</p>

                <p className="mt-2 text-2xl font-bold">8</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Products need attention
                </p>
              </div>
            </div>
            {/* Dashboard Bottom Section */}
            <div className="mt-6 grid grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="rounded-lg border p-5">
                <div>
                  <p className="font-semibold">Revenue Overview</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Revenue from the last 30 days
                  </p>
                </div>

                {/* Fake Chart */}
                <div className="mt-8 flex h-48 items-end gap-3">
                  <div className="h-[35%] flex-1 rounded-t bg-muted" />
                  <div className="h-[50%] flex-1 rounded-t bg-muted" />
                  <div className="h-[42%] flex-1 rounded-t bg-muted" />
                  <div className="h-[65%] flex-1 rounded-t bg-muted" />
                  <div className="h-[58%] flex-1 rounded-t bg-muted" />
                  <div className="h-[78%] flex-1 rounded-t bg-muted" />
                  <div className="h-[70%] flex-1 rounded-t bg-muted" />
                  <div className="h-[90%] flex-1 rounded-t bg-muted" />
                </div>

                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span>Sep 1</span>
                  <span>Sep 8</span>
                  <span>Sep 15</span>
                  <span>Sep 22</span>
                  <span>Sep 30</span>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="rounded-lg border p-5">
                <div>
                  <p className="font-semibold">Recent Orders</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Latest customer orders
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">#10482</p>
                      <p className="text-sm text-muted-foreground">
                        John Smith
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">$128.00</p>
                      <p className="text-sm text-muted-foreground">
                        Processing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">#10481</p>
                      <p className="text-sm text-muted-foreground">
                        Lisa Jones
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">$84.00</p>
                      <p className="text-sm text-muted-foreground">Shipped</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">#10480</p>
                      <p className="text-sm text-muted-foreground">
                        Mark Davis
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">$210.00</p>
                      <p className="text-sm text-muted-foreground">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="rounded-xl border p-6">
              <IconPackages className="h-12 w-12" />
              <h3 className="mt-4 text-xl font-semibold">Inventory</h3>
              <p className="mt-2 text-muted-foreground">
                Manage your stock levels and track product movements.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <IconShoppingCart className="h-12 w-12" />
              <h3 className="mt-4 text-xl font-semibold">Orders</h3>
              <p className="mt-2 text-muted-foreground">
                Create and manage customer orders seamlessly.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <IconUsers className="h-12 w-12" />
              <h3 className="mt-4 text-xl font-semibold">Customers</h3>
              <p className="mt-2 text-muted-foreground">
                Maintain detailed records of your customer base.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <IconTruckDelivery className="h-12 w-12" />
              <h3 className="mt-4 text-xl font-semibold">Purchasing</h3>
              <p className="mt-2 text-muted-foreground">
                Streamline your procurement process and supplier management.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <IconBuildingWarehouse className="h-12 w-12" />
              <h3 className="mt-4 text-xl font-semibold">Suppliers</h3>
              <p className="mt-2 text-muted-foreground">
                Keep track of supplier information and communication.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <IconChartBar className="h-12 w-12" />
              <h3 className="mt-4 text-xl font-semibold">Analytics</h3>
              <p className="mt-2 text-muted-foreground">
                Gain insights into your business performance with detailed
                reports.
              </p>
            </div>
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
