import {
  GraduationCapIcon,
  HomeIcon,
  KeyRoundIcon,
  LibraryIcon,
  TextQuoteIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react";

type MenuItemsType = {
  label: string;
  href: string;
  icon: JSX.Element;
}[];

const NavbarMenuItems: MenuItemsType = [
  { label: "Home", href: "/", icon: <HomeIcon size={18} strokeWidth={2.5} /> },
  {
    label: "Courses",
    href: "/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "Mentors",
    href: "/mentors",
    icon: <GraduationCapIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: <TextQuoteIcon size={18} strokeWidth={2.5} />,
  },
];

const AvatarDropdownMenuItems: MenuItemsType = [
  {
    label: "Profile",
    href: "/users/id",
    icon: <UserIcon size={16} />,
  },
  {
    label: "Change Password",
    href: "/change-password",
    icon: <KeyRoundIcon size={16} />,
  },
  {
    label: "Meeting",
    href: "/meeting",
    icon: <VideoIcon size={16} />,
  },
];

export { NavbarMenuItems, AvatarDropdownMenuItems };
