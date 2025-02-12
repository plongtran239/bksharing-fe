"use client";

import { useTranslations } from "next-intl";

import { COURSE_STATUS } from "@/constants/enum";

const Status = ({ status }: { status: COURSE_STATUS }) => {
  const t = useTranslations("courseStatus");

  return <>{t(status.toLowerCase())}</>;
};
export default Status;
