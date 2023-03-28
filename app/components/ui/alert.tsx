import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const alertVariants = cva(cn("flex items-center border-l border-l-2"), {
  variants: {
    variant: {
      default:
        "text-brand-900 dark:text-brand-50 bg-brand-100 border-brand-800 dark:bg-brand-800 dark:border-brand-500",
      info: "text-blue-900 dark:text-blue-50 bg-blue-100 border-blue-800 dark:bg-blue-800 dark:border-blue-500",
      success:
        "text-green-900 dark:text-green-50 bg-green-100 border-green-800 dark:bg-green-800 dark:border-green-500",
      warning:
        "text-yellow-900 dark:text-yellow-50 bg-yellow-100 border-yellow-800 dark:bg-yellow-800 dark:border-yellow-500",
      danger:
        "text-red-900 dark:text-red-50 bg-red-100 border-red-800 dark:bg-red-800 dark:border-red-500",
    },
    size: {
      sm: "py-0.5 px-1 text-xs gap-2",
      default: "py-1 px-2 text-sm gap-2",
      lg: "py-2 px-3 text-lg gap-3",
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
    VariantProps<typeof alertVariants> {}

export function Alert({
  variant = "default",
  size = "default",
  radius = "default",
  className,
  children,
  ...props
}: Props) {
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
