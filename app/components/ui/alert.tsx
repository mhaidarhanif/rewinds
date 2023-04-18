import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Alert
 *
 * Displays an alert after something happened for user attention.
 */

export const alertVariants = cva(cn("flex items-center border-l border-l-2"), {
  variants: {
    variant: {
      default:
        "border-brand-800 bg-brand-100 text-brand-900 dark:border-brand-500 dark:bg-brand-800 dark:text-brand-50",
      info: "border-blue-800 bg-blue-100 text-blue-900 dark:border-blue-500 dark:bg-blue-800 dark:text-blue-50",
      success:
        "border-green-800 bg-green-100 text-green-900 dark:border-green-500 dark:bg-green-800 dark:text-green-50",
      warning:
        "border-yellow-800 bg-yellow-100 text-yellow-900 dark:border-yellow-500 dark:bg-yellow-800 dark:text-yellow-50",
      danger:
        "border-red-800 bg-red-100 text-red-900 dark:border-red-500 dark:bg-red-800 dark:text-red-50",
    },
    size: {
      sm: "gap-2 px-1 py-0.5 text-xs",
      default: "gap-2 px-2 py-1 text-sm",
      lg: "gap-3 px-3 py-2 text-lg",
    },
    radius: {
      default: "",
      rounded: "rounded",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    radius: "default",
  },
});

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  isShown?: string | boolean | undefined;
}

export function Alert({
  isShown = true,
  variant = "default",
  size = "default",
  radius = "default",
  className,
  children,
  ...props
}: Props) {
  if (!isShown) {
    return null;
  }

  if (!children) {
    return null;
  }

  return (
    <div
      className={cn(
        alertVariants({
          variant,
          radius,
          size,
          className,
        })
      )}
      role="alert"
      {...props}
    >
      <p>{children}</p>
    </div>
  );
}
