import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const pageHeaderVariants = cva("", {
  variants: {
    size: {
      xs: "py-4 sm:py-8",
      sm: "py-6 sm:py-10",
      default: "py-12 sm:py-20",
    },
    containSize: {
      default: "",
      sm: "contain-sm",
    },
    direction: {
      row: "flex-row items-center",
      col: "flex-col",
    },
    isTextCentered: { true: "text-center", false: "" },
    withContainer: { true: "", false: "" },
    withMarginBottom: { true: "", false: "" },
    withBackground: {
      true: "bg-brand-100 dark:bg-brand-800/20",
      false: "",
    },
  },
  compoundVariants: [
    { size: "xs", withMarginBottom: true, class: "mb-4" },
    { size: "sm", withMarginBottom: true, class: "mb-8" },
    { size: "default", withMarginBottom: true, class: "mb-16" },
  ],
  defaultVariants: {
    size: "default",
    direction: "row",
    isTextCentered: false,
    withMarginBottom: true,
    withBackground: true,
  },
});

interface Props
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {}

export function PageHeader({
  size = "default",
  containSize = "default",
  isTextCentered = false,
  withMarginBottom = true,
  withBackground = true,
  withContainer = true,
  className,
  children,
  ...props
}: Props) {
  return (
    <header
      className={cn(
        pageHeaderVariants({
          size,
          containSize,
          isTextCentered,
          withMarginBottom,
          withBackground,
          className,
        })
      )}
      {...props}
    >
      <div className={cn("space-y-2", withContainer && "contain")}>
        {children}
      </div>
    </header>
  );
}

export function PageAdminHeader({
  size,
  direction,
  isTextCentered,
  withBackground,
  className,
  children,
  ...props
}: Props) {
  return (
    <header
      className={cn(
        "px-layout flex flex-wrap gap-2",
        pageHeaderVariants({
          size,
          direction,
          isTextCentered,
          withBackground,
          className,
        })
      )}
      {...props}
    >
      {children}
    </header>
  );
}
