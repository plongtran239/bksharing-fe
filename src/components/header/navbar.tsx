"use client";

import { motion } from "framer-motion";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { ROLES } from "@/constants/enum";
import { NavbarMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";

interface IProps {
  role: string;
  isSidebar?: boolean;
}

const Navbar = ({ role, isSidebar }: IProps) => {
  const path = usePathname();

  const isActive = useCallback(
    (href: string) => {
      return href === "/" ? path === href : path.startsWith(href);
    },
    [path]
  );

  return (
    <ul
      className={cn("flex-between gap-10 max-lg:hidden", {
        "max-lg:flex-between flex-col gap-10": isSidebar,
      })}
    >
      {role !== ROLES.ADMIN ? (
        NavbarMenuItems.map((item, index) => (
          <li
            key={index}
            className={cn({
              "font-semibold text-primary": isActive(item.href),
              "flex-between w-full": isSidebar,
            })}
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
            >
              <Link href={item.href} className="flex-center gap-1">
                {isSidebar ? (
                  <SheetClose className="flex-center gap-1">
                    <span className="max-xl:hidden">{item.icon}</span>
                    {item.label}
                  </SheetClose>
                ) : (
                  <>
                    <span
                      className={cn("max-xl:hidden", {
                        "max-xl:inline": isSidebar,
                      })}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </>
                )}
              </Link>
            </motion.div>
          </li>
        ))
      ) : (
        <Link href="/admin/dashboard">
          <Button className="flex-center gap-2">
            <HomeIcon size={18} strokeWidth={2.5} />
            Go to dashboard
          </Button>
        </Link>
      )}
    </ul>
  );
};
export default Navbar;
