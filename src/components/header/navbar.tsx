"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import { SheetClose } from "@/components/ui/sheet";
import { ROLES } from "@/constants/enum";
import { NavbarMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";

interface IProps {
  isSidebar?: boolean;
}

const Navbar = ({ isSidebar }: IProps) => {
  const t = useTranslations("navbar");

  const { user } = useAppContext();
  const path = usePathname();

  const isActive = useCallback(
    (href: string) => {
      return href === "/" ? path === href : path.startsWith(href);
    },
    [path]
  );

  return (
    <ul
      className={cn("flex-between gap-10 font-medium max-lg:hidden", {
        "max-lg:flex-between flex-col gap-10": isSidebar,
      })}
    >
      {NavbarMenuItems.map((item, index) => {
        if (
          item.label === "schedules" ||
          item.label === "mentors" ||
          item.label === "courses"
        ) {
          if (user?.accountType === ROLES.MENTOR) {
            return null;
          }
        }

        return (
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
                    {t(item.label)}
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
                    {t(item.label)}
                  </>
                )}
              </Link>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
};
export default Navbar;
