"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { convertToCapitalizeCase } from "@/lib/utils";

const AppBreadCrumb = () => {
  const path = usePathname().split("/").filter(Boolean);

  const status = useSearchParams().get("status") || undefined;

  const breadcrumb = status ? [...path, status] : path;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, index) => (
          <div key={item} className="flex-center gap-2">
            <BreadcrumbItem>
              {index === 1 ? (
                <BreadcrumbLink href={item}>
                  {convertToCapitalizeCase(item)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{convertToCapitalizeCase(item)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default AppBreadCrumb;
