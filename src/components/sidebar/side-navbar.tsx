"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROLES } from "@/constants/enum";
import { SidebarMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";

type Role = Exclude<keyof typeof ROLES, "STUDENT">;

const SideNavbar = ({ role }: { role: keyof typeof ROLES }) => {
  const pathname = usePathname();

  return (
    <nav className="mt-20 flex flex-col gap-6 text-secondary-foreground">
      {SidebarMenuItems[role as Role].map((item) => {
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
