import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  DATE_FORMAT_OPTIONS,
  DATE_TIME_FORMAT_OPTIONS,
  LOCALE,
} from "@/constants/date";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function convertDateToLocaleDateString(date: Date): string {
  return date.toLocaleDateString(LOCALE, DATE_FORMAT_OPTIONS);
}

function convertDateToLocaleString(date: Date): string {
  return date
    .toLocaleString(LOCALE, DATE_TIME_FORMAT_OPTIONS)
    .split(" ")
    .reverse()
    .join(" ");
}

function convertMilisecondsToLocalString(
  miliseconds: string,
  locale = LOCALE,
  dateTimeFormatOptions = DATE_TIME_FORMAT_OPTIONS
): string {
  return new Date(parseInt(miliseconds)).toLocaleString(
    locale,
    dateTimeFormatOptions
  );
}

function convertToCapitalizeCase(text: string): string {
  text = text.replaceAll("_", " ");

  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function covertCamelCaseToTitleCase(text: string): string {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function normalizePath(path: string) {
  return path.startsWith("/") ? path.slice(1) : path;
}

export {
  cn,
  convertDateToLocaleString,
  convertDateToLocaleDateString,
  convertMilisecondsToLocalString,
  convertToCapitalizeCase,
  covertCamelCaseToTitleCase,
  normalizePath,
};
