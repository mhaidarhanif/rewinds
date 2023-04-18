import { DayPicker } from "react-day-picker";

import { cn } from "~/utils";
import { buttonVariants } from "~/components";
import { ChevronLeft, ChevronRight } from "~/icons";

/**
 * Calendar
 *
 * A date field component that allows users to enter and edit date.
 *
 * Docs:
 * - https://ui.shadcn.com/docs/components/calendar
 * - https://react-day-picker.js.org
 */

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline", isIcon: true }),
          "size-lg p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-brand-700 dark:text-brand-300 rounded-md w-9 font-semibold text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "text-center text-sm p-0 relative rounded-md focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-surface-200 dark:[&:has([aria-selected])]:bg-surface-800"
        ),
        day: cn(
          buttonVariants({ variant: "none" }),
          "h-9 w-9 p-0 font-semibold aria-selected:opacity-100"
        ),
        day_selected:
          "bg-brand-700 text-brand-200 focus:bg-brand-800 focus:text-brand-300 hover:opacity-90",
        day_today: "bg-surface-200 dark:bg-surface-800",
        day_outside: "text-surface-300 dark:text-surface-700 opacity-50",
        day_disabled: "text-surface-300 dark:text-surface-700 opacity-50",
        day_range_middle: cn(
          "aria-selected:bg-surface-200 aria-selected:text-surface-800",
          "aria-selected:bg-surface-800 aria-selected:text-surface-200"
        ),
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="size-sm" />,
        IconRight: ({ ...props }) => <ChevronRight className="size-sm" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";
