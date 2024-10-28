"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROLES } from "@/constants/enum";
import {
  AdminSidebarMenuItems,
  MentorSidebarMenuItems,
} from "@/constants/menu-item";
import { cn } from "@/lib/utils";

const SideNavbar = ({ role }: { role: string }) => {
  const pathname = usePathname();

  return (
    <nav className="mt-20 flex flex-col gap-6 text-secondary-foreground">
      {role === ROLES.ADMIN &&
        AdminSidebarMenuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-start gap-4 rounded-lg p-4",
                {
                  "bg-primary text-white": isActive,
                }
              )}
            >
              {item.icon}
              <span
                className={cn("text-lg font-semibold max-lg:hidden", {
                  "text-white": isActive,
                })}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

      {role === ROLES.MENTOR &&
        MentorSidebarMenuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-start gap-4 rounded-lg p-4",
                {
                  "bg-primary text-white": isActive,
                }
              )}
            >
              {item.icon}
              <span
                className={cn("text-lg font-semibold max-lg:hidden", {
                  "text-white": isActive,
                })}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
    </nav>
  );
};
export default SideNavbar;
