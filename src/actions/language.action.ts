"use server";

import { cookies } from "next/headers";

export const ChangeLanguage = async (lang: string) => {
  cookies().set("lang", lang);
};
