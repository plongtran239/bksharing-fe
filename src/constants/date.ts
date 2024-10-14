const DATE_FORMAT = "DD/MM/YYYY";

const LOCALE: Intl.LocalesArgument = "vi-VN";

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  ...DATE_FORMAT_OPTIONS,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const MIN_DATE = "01/01/1900";

const MAX_DATE = new Date().toLocaleDateString(LOCALE, DATE_FORMAT_OPTIONS);

export {
  DATE_FORMAT,
  MIN_DATE,
  MAX_DATE,
  LOCALE,
  DATE_FORMAT_OPTIONS,
  DATE_TIME_FORMAT_OPTIONS,
};
