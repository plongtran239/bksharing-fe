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
import { convertToCapitalizeCase, getNameFromNameId } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";

const AppBreadCrumb = () => {
  const { user } = useAppContext();

  const path = usePathname().split("/").filter(Boolean);

  const status = useSearchParams().get("status") || undefined;

  const breadcrumb = status ? [...path, status] : path;

  if (!user) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, index) => (
          <div key={item} className="flex-center gap-2">
            <BreadcrumbItem>
              {index === 1 ? (
                <BreadcrumbLink
                  href={`/${user?.accountType.toLowerCase()}/${item}`}
                >
                  {convertToCapitalizeCase(item)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize">
                  {getNameFromNameId(decodeURIComponent(item).toLowerCase())}
                </BreadcrumbPage>
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
