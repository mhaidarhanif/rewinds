import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

require("dayjs/locale/en");

dayjs.extend(relativeTime);

export { dayjs };

export function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}

/**
 * Date time format
 */

export const formatDate = (date: string | Date | undefined) => {
  const formatted = dayjs(date).locale("en").format("D MMM YYYY, H:mm:ss");
  return formatted;
};
export const formatDateOnly = (date: string | Date | undefined) => {
  const formatted = dayjs(date).locale("en").format("D MMM YYYY");
  return formatted;
};

export const formatDateId = (date: string | Date | undefined) => {
  const formatted = dayjs(date)
    .locale("id")
    .format("D MMMM YYYY [jam] H:mm:ss");
  return formatted;
};

/**
 * Relative time
 */

export const formatRelativeTime = (date: string | Date | undefined) => {
  const formatted = dayjs(date).locale("en").fromNow();
  return formatted;
};

export const formatRelativeTimeId = (date: string | Date | undefined) => {
  const formatted = dayjs(date).locale("id").fromNow();
  return formatted;
};
