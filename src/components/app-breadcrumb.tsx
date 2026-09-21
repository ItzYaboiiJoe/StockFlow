"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const AppBreadcrumb = () => {
  const pathname = usePathname();

  const pageName = pathname.split("/").filter(Boolean).at(-1);

  if (!pageName) return null;

  const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="ml-10">
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
