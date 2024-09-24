import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { DATE_TIME_FORMAT_OPTIONS, LOCALE } from "@/constants/date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDateToLocaleDateString(date: Date): string {
  return date.toLocaleDateString(LOCALE, DATE_TIME_FORMAT_OPTIONS);
}

export function convertToCapitalizeCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
