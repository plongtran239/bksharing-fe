import {
  BookCheckIcon,
  BookCopyIcon,
  CalendarIcon,
  GraduationCapIcon,
  HomeIcon,
  InfoIcon,
  KeyRoundIcon,
  LibraryIcon,
  MessageCircleIcon,
  MessageSquareWarningIcon,
  UserIcon,
  UserPlusIcon,
  VideoIcon,
  ViewIcon,
} from "lucide-react";

import {
  COURSE_STATUS,
  MEETING_STATUS,
  MENTOR_STATUS,
  REPORT_STATUS,
  ROLES,
  SUBSCRIPTION_STATUS,
} from "@/constants/enum";

type MenuItemsType = {
  label: string;
  href: string;
  icon: JSX.Element;
  subs?: { label: string; href: string }[];
  hasSeparator?: boolean;
}[];

const NavbarMenuItems: MenuItemsType = [
  { label: "home", href: "/", icon: <HomeIcon size={18} strokeWidth={2.5} /> },
  {
    label: "mentors",
    href: "/mentors",
    icon: <GraduationCapIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "courses",
    href: "/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "schedules",
    href: "/subscriptions",
    icon: <VideoIcon size={18} strokeWidth={2.5} />,
  },
];

const StudentAvatarDropdownMenuItems: MenuItemsType = [
  {
    label: "profile",
    href: "/student/profile",
    icon: <UserIcon size={16} />,
  },
  {
    label: "changePassword",
    href: "/change-password",
    icon: <KeyRoundIcon size={16} />,
  },
  {
    label: "personalInformation",
    href: "/user-info",
    icon: <InfoIcon size={16} />,
  },
];

const MentorAvatarDropdownMenuItems: MenuItemsType = [
  {
    label: "profile",
    href: "/users/profile",
    icon: <UserIcon size={16} />,
  },
  ...StudentAvatarDropdownMenuItems,
  {
    label: "mentorDashboard",
    href: "/mentor/appointments",
    icon: <ViewIcon size={16} />,
    hasSeparator: true,
  },
];

const AdminAvatarDropdownMenuItems: MenuItemsType = [
  {
    label: "dashboard",
    href: "/admin/dashboard",
    icon: <HomeIcon size={16} />,
  },
];

const AdminSidebarMenuItems: MenuItemsType = [
  {
    label: "dashboard",
    href: "/admin/dashboard",
    icon: <HomeIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "mentors",
    href: "/admin/mentors",
    icon: <GraduationCapIcon size={18} strokeWidth={2.5} />,
    subs: [
      {
        label: "all",
        href: "/admin/mentors",
      },
      ...Object.values(MENTOR_STATUS).map((status) => ({
        label: status.toLowerCase(),
        href: `/admin/mentors?status=${status}`,
      })),
    ],
  },
  {
    label: "meetings",
    href: "/admin/meetings",
    icon: <VideoIcon size={18} strokeWidth={2.5} />,
    subs: [
      {
        label: "all",
        href: "/admin/meetings",
      },
      ...Object.values(MEETING_STATUS).map((status) => ({
        label: status.toLowerCase(),
        href: `/admin/meetings?status=${status}`,
      })),
    ],
  },
  {
    label: "courses",
    href: "/admin/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
    subs: [
      {
        label: "all",
        href: "/admin/courses",
      },
      ...[
        COURSE_STATUS.PENDING,
        COURSE_STATUS.APPROVED,
        COURSE_STATUS.REJECTED,
      ].map((status) => ({
        label: status.toLowerCase(),
        href: `/admin/courses?status=${status}`,
      })),
    ],
  },
  {
    label: "subscriptions",
    href: "/admin/subscriptions",
    icon: <UserPlusIcon size={18} strokeWidth={2.5} />,
    subs: [
      {
        label: "all",
        href: "/admin/subscriptions",
      },
      ...Object.values(SUBSCRIPTION_STATUS).map((status) => ({
        label: status.toLowerCase(),
        href: `/admin/subscriptions?status=${status}`,
      })),
    ],
  },
  {
    label: "reports",
    href: "/admin/reports",
    icon: <MessageSquareWarningIcon size={18} strokeWidth={2.5} />,
    subs: [
      {
        label: "all",
        href: "/admin/reports",
      },
      ...Object.values(REPORT_STATUS).map((status) => ({
        label: status.toLowerCase(),
        href: `/admin/reports?status=${status}`,
      })),
    ],
  },
  {
    label: "categories",
    href: "/admin/categories",
    icon: <BookCopyIcon size={18} strokeWidth={2.5} />,
  },
];

const MentorSidebarMenuItems: MenuItemsType = [
  {
    label: "dashboard",
    href: "/mentor/dashboard",
    icon: <HomeIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "schedule",
    href: "/mentor/schedule",
    icon: <CalendarIcon size={18} strokeWidth={2.5} />,
  },
  {
    label: "appointments",
    href: "/mentor/appointments",
    icon: <VideoIcon size={18} strokeWidth={2.5} />,
    subs: [
      {
        label: "all",
        href: "/mentor/appointments",
      },
      ...Object.values(MEETING_STATUS).map((status) => ({
        label: status.toLowerCase(),
        href: `/mentor/appointments?status=${status}`,
      })),
    ],
  },
  {
    label: "subscriptions",
    href: "/mentor/subscriptions",
    icon: <BookCheckIcon size={18} strokeWidth={2.5} />,
    subs: [
      ...Object.values([
        SUBSCRIPTION_STATUS.ACTIVE,
        SUBSCRIPTION_STATUS.ENDED,
      ]).map((status) => ({
        label: status.toLowerCase(),
        href: `/mentor/subscriptions?status=${status}`,
      })),
    ],
  },
  {
    label: "requests",
    href: "/mentor/requests",
    icon: <UserPlusIcon size={18} strokeWidth={2.5} />,
    subs: [
      ...Object.values([
        SUBSCRIPTION_STATUS.PENDING,
        SUBSCRIPTION_STATUS.ACCEPTED,
        SUBSCRIPTION_STATUS.CANCELED,
        SUBSCRIPTION_STATUS.EXPIRED,
        SUBSCRIPTION_STATUS.REJECTED,
      ]).map((status) => ({
        label: status.toLowerCase(),
        href: `/mentor/requests?status=${status}`,
      })),
    ],
  },
  {
    label: "courses",
    href: "/mentor/courses",
    icon: <LibraryIcon size={18} strokeWidth={2.5} />,
    subs: [
      {
        label: "all",
        href: "/mentor/courses",
      },
      ...[
        COURSE_STATUS.DRAFT,
        COURSE_STATUS.PENDING,
        COURSE_STATUS.APPROVED,
        COURSE_STATUS.REJECTED,
      ].map((status) => ({
        label: status.toLowerCase(),
        href: `/mentor/courses?status=${status}`,
      })),
    ],
  },
  {
    label: "chat",
    href: "/mentor/chat",
    icon: <MessageCircleIcon size={18} strokeWidth={2.5} />,
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
