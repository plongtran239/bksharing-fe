const DATE_FORMAT = "DD/MM/YYYY";

const LOCALE: Intl.LocalesArgument = "vi-VN";

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const MIN_DATE = "01/01/1900";

const MAX_DATE = new Date().toLocaleDateString(
  LOCALE,
  DATE_TIME_FORMAT_OPTIONS
);

export { DATE_FORMAT, MIN_DATE, MAX_DATE, LOCALE, DATE_TIME_FORMAT_OPTIONS };
