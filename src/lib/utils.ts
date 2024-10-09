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
  text = text.replaceAll("_", " ");

  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function covertCamelCaseToTitleCase(text: string): string {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export function normalizePath(path: string) {
  return path.startsWith("/") ? path.slice(1) : path;
}
