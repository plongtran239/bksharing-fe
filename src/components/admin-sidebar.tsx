"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AvatarDropdown from "@/components/avatar-dropdown";
import { Separator } from "@/components/ui/separator";
import { AdminSidebarMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";

const AdminSidebar = () => {
  const pathname = usePathname();

  const { user } = useAppContext();

  return (
    <aside className="sticky left-0 top-0 flex h-screen flex-col justify-between bg-secondary p-6 max-sm:hidden lg:w-[280px]">
      <div>
        <Link
          href="/admin/dashboard"
          className="max-lg:flex-center flex lg:gap-4 lg:px-4"
        >
          <Image
            src="/images/logo-icon.png"
            alt="logo"
            width={35}
            height={35}
            priority
          />

          <span className="text-xl text-secondary-foreground max-lg:hidden">
            BK Sharing
          </span>
        </Link>

        <nav className="mt-20 flex flex-col gap-6 text-secondary-foreground">
          {AdminSidebarMenuItems.map((item) => {
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
      </div>

      <div className="">
        <Separator className="mb-5 bg-secondary-foreground" />
        <div className="flex-center">
          <AvatarDropdown
            name={user?.name}
            avatar={user?.avatar?.originalUrl}
            role={user?.accountType}
          />
        </div>
      </div>
    </aside>
  );
};
export default AdminSidebar;
