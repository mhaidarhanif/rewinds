import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const pageHeaderVariants = cva("", {
  variants: {
    size: {
      xs: "py-3 sm:py-6",
      sm: "py-6 sm:py-10",
      default: "py-12 sm:py-20",
    },
    isTextCentered: { true: "text-center", false: "" },
    withContainer: { true: "", false: "" },
    withMarginBottom: { true: "", false: "" },
    withBackground: {
      true: "bg-surface-100 dark:bg-surface-800/20",
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
          isTextCentered,
          withMarginBottom,
          withBackground,
          className,
        })
      )}
      {...props}
    >
      <div className={cn(withContainer && "contain space-y-2")}>{children}</div>
    </header>
  );
}

export function PageAdminHeader({
  size,
  isTextCentered,
  withBackground,
  className,
  children,
  ...props
}: Props) {
  return (
    <header
      className={cn(
        pageHeaderVariants({ size, isTextCentered, withBackground, className })
      )}
      {...props}
    >
      <div
        className={cn("px-layout flex flex-wrap items-center gap-2 sm:gap-4")}
      >
        {children}
      </div>
    </header>
  );
}
