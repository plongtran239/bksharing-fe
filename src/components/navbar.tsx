import { motion } from "framer-motion";
import Link from "next/link";

import { NavbarMenuItems } from "@/constants/menu-item";
import { cn } from "@/lib/utils";

interface IProps {
  isActive: (href: string) => boolean;
}

const Navbar = ({ isActive }: IProps) => {
  return (
    <ul className="flex-between gap-10 text-[#5B5B5B] dark:text-white max-lg:hidden">
      {NavbarMenuItems.map((item, index) => (
        <li
          key={index}
          className={cn({
            "font-semibold text-primary": isActive(item.href),
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
              <span className="max-xl:hidden">{item.icon}</span>
              {item.label}
            </Link>
          </motion.div>
        </li>
      ))}
    </ul>
  );
};
export default Navbar;
