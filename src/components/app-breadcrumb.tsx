"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AppBreadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const pageName = segments[0];
  const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  const isProductDetails = segments[0] === "products" && segments.length === 2;

  return (
    <Breadcrumb>
      <BreadcrumbList className="ml-10">
        {isProductDetails ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/products" />}>
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Product Details</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
