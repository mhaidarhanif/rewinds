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

export const formatDateTime = (date: string | Date | undefined) => {
  return dayjs(date).locale("en").format("H:mm [on] D MMM YYYY");
};

export const formatDateTimeTimezone = (date: string | Date | undefined) => {
  return dayjs(date).locale("en").format("D MMM YYYY, H:mm:ss Z");
};

export const formatDate = (date: string | Date | undefined) => {
  return dayjs(date).locale("en").format("D MMM YYYY");
};

export const formatDateLastMod = (date: string | Date | undefined) => {
  return dayjs(date).locale("en").format("YYYY-MM-DD");
};

/**
 * Relative time
 */

export const formatRelativeTime = (date: string | Date | undefined) => {
  return dayjs(date).locale("en").fromNow();
};
