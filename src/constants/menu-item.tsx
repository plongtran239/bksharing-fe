import {
  BookCopyIcon,
  GraduationCapIcon,
  HomeIcon,
  InfoIcon,
  KeyRoundIcon,
  LibraryIcon, // TextQuoteIcon,
  UserIcon,
  VideoIcon,
  ViewIcon,
} from "lucide-react";

import {
  COURSE_STATUS,
  MEETING_STATUS,
  MENTOR_STATUS,
  ROLES,
} from "@/constants/enum";
import { convertToCapitalizeCase } from "@/lib/utils";

type MenuItemsType = {
  label: string;
  href: string;
  icon: JSX.Element;
  subs?: { label: string; href: string }[];
  hasSeparator?: boolean;
}[];

const NavbarMenuItems: MenuItemsType = [
  { label: "Home", href: "/", icon: <HomeIcon size={18} strokeWidth={2.5} /> },
  {
    label: "Mentors",
    href: "/mentors",
    icon: <GraduationCapIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
  },
  // {
  //   label: "Blogs",
  //   href: "/blogs",
  //   icon: <TextQuoteIcon size={18} strokeWidth={2.5} />,
  // },
];

const StudentAvatarDropdownMenuItems: MenuItemsType = [
  {
    label: "Change Password",
    href: "/change-password",
    icon: <KeyRoundIcon size={16} />,
  },
  {
    label: "Personal Information",
    href: "/user-info",
    icon: <InfoIcon size={16} />,
  },
];

const MentorAvatarDropdownMenuItems: MenuItemsType = [
  {
    label: "Profile",
    href: "/users/profile",
    icon: <UserIcon size={16} />,
  },
  ...StudentAvatarDropdownMenuItems,
  {
    label: "Mentor Dashboard",
    href: "/mentor/courses",
    icon: <ViewIcon size={16} />,
    hasSeparator: true,
  },
  {
    label: "Student View",
    href: "/",
    icon: <ViewIcon size={16} />,
    hasSeparator: true,
  },
];

const AdminAvatarDropdownMenuItems: MenuItemsType = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <HomeIcon size={16} />,
  },
];

const AdminSidebarMenuItems: MenuItemsType = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <HomeIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "Mentors",
    href: "/admin/mentors",
    icon: <GraduationCapIcon size={18} strokeWidth={2.5} />,
    subs: Object.values(MENTOR_STATUS).map((status) => ({
      label: convertToCapitalizeCase(status),
      href: `/admin/mentors?status=${status}`,
    })),
  },
  {
    label: "Meetings",
    href: "/admin/meetings",
    icon: <VideoIcon size={18} strokeWidth={2.5} />,
    subs: Object.values(MEETING_STATUS).map((status) => ({
      label: convertToCapitalizeCase(status),
      href: `/admin/meetings?status=${status}`,
    })),
  },
  {
    label: "Courses",
    href: "/admin/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
    subs: [
      COURSE_STATUS.PENDING,
      COURSE_STATUS.APPROVED,
      COURSE_STATUS.REJECTED,
    ].map((status) => ({
      label: convertToCapitalizeCase(status),
      href: `/admin/courses?status=${status}`,
    })),
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: <BookCopyIcon size={18} strokeWidth={2.5} />,
  },
];

const MentorSidebarMenuItems: MenuItemsType = [
  {
    label: "Courses",
    href: "/mentor/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
    subs: [
      COURSE_STATUS.DRAFT,
      COURSE_STATUS.PENDING,
      COURSE_STATUS.APPROVED,
      COURSE_STATUS.REJECTED,
    ].map((status) => ({
      label: convertToCapitalizeCase(status),
      href: `/mentor/courses?status=${status}`,
    })),
  },
];

const AvatarDropdownMenuItems = {
  [ROLES.STUDENT]: StudentAvatarDropdownMenuItems,
  [ROLES.MENTOR]: MentorAvatarDropdownMenuItems,
  [ROLES.ADMIN]: AdminAvatarDropdownMenuItems,
};

const SidebarMenuItems = {
  [ROLES.MENTOR]: MentorSidebarMenuItems,
  [ROLES.ADMIN]: AdminSidebarMenuItems,
};

export {
  NavbarMenuItems,
  AvatarDropdownMenuItems,
  SidebarMenuItems,
  AdminSidebarMenuItems,
};
