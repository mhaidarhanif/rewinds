import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

require("dayjs/locale/en");

dayjs.extend(relativeTime);

export { dayjs };

export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Date time format
 */

export function formatDateTime(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("H:mm [on] D MMM YYYY");
}

export function formatDateTimeTimezone(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("D MMM YYYY, H:mm:ss Z");
}

export function formatDate(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("D MMM YYYY");
}

export function formatDateLastMod(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("YYYY-MM-DD");
}

/**
 * Relative time
 */

export function formatRelativeTime(date: string | Date | undefined) {
  return dayjs(date).locale("en").fromNow();
}

/**
 * Converter
 */

export function convertDaysToSeconds(days: number) {
  // seconds * minutes * hours * days
  return 60 * 60 * 24 * days;
}
