import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  DATE_FORMAT_OPTIONS,
  DATE_TIME_FORMAT_OPTIONS,
  LOCALE,
} from "@/constants/date";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import { AchivementType } from "@/schemas";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function convertDateToLocaleDateString(
  date: Date,
  locale = LOCALE,
  dateFormatOptions = DATE_FORMAT_OPTIONS
): string {
  return date.toLocaleDateString(locale, dateFormatOptions);
}

function convertDateToLocaleString(date: Date): string {
  return date
    .toLocaleString(LOCALE, DATE_TIME_FORMAT_OPTIONS)
    .split(" ")
    .reverse()
    .join(" ");
}

function convertMilisecondsToLocaleString(
  miliseconds: string,
  locale = LOCALE,
  dateTimeFormatOptions = DATE_TIME_FORMAT_OPTIONS
): string {
  return new Date(parseInt(miliseconds)).toLocaleString(
    locale,
    dateTimeFormatOptions
  );
}

function convertMilisecondsToLocaleDateString(
  miliseconds: string,
  locale = LOCALE,
  dateFormatOptions = DATE_FORMAT_OPTIONS
): string {
  return new Date(parseInt(miliseconds)).toLocaleDateString(
    locale,
    dateFormatOptions
  );
}

function convertToCapitalizeCase(text: string): string {
  text = text.replaceAll("_", " ");

  return text
    .toLowerCase()
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

function classifyAchievements(achievements: AchivementType[]) {
  return Object.values(ACHIEVEMENT_TYPES).map((type) => {
    return achievements.filter((achievement) => achievement.type === type);
  });
}

function generateNameId({ name, id }: { name: string; id: number }) {
  return `${name.toLowerCase().replaceAll(" ", "-")}-i${id}`;
}

function getIdFromNameId(nameId: string) {
  const arr = nameId.split("-i");
  return parseInt(arr[arr.length - 1]);
}

function getNameFromNameId(nameId: string) {
  return nameId.split("-i")[0].replaceAll("-", " ");
}

function getMondayOfCurrentWeek(date: Date): Date {
  const currentDay = date.getDay(); // Lấy thứ trong tuần (0: Chủ nhật, 1: Thứ 2, ...)
  const diff = currentDay === 0 ? -6 : 1 - currentDay; // Điều chỉnh để về thứ 2 (hoặc tuần trước nếu là Chủ nhật)
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
}

export {
  cn,
  convertDateToLocaleString,
  convertDateToLocaleDateString,
  convertMilisecondsToLocaleString,
  convertMilisecondsToLocaleDateString,
  convertToCapitalizeCase,
  covertCamelCaseToTitleCase,
  normalizePath,
  classifyAchievements,
  generateNameId,
  getIdFromNameId,
  getNameFromNameId,
  getMondayOfCurrentWeek,
};
