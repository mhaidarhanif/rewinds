import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const pageHeaderVariants = cva("", {
  variants: {
    size: {
      xs: "py-3 sm:py-6",
      sm: "py-6 sm:py-10 mb-6",
      default: "py-12 sm:py-20 mb-12",
    },
    isTextCentered: {
      true: "text-center",
      false: "",
    },
    withBackground: {
      true: "bg-surface-100 dark:bg-surface-800/20",
    },
  },
  defaultVariants: {
    size: "default",
    isTextCentered: false,
    withBackground: true,
  },
});

interface Props
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {}

export function PageHeader({
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
      <div className={cn("contain space-y-2")}>{children}</div>
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
        className={cn(
          "flex flex-wrap items-center gap-2 px-2 sm:gap-4 sm:px-4"
        )}
      >
        {children}
      </div>
    </header>
  );
}
