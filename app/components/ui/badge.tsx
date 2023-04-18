import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Badge
 *
 * Displays a badge or a component that looks like a badge.
 */

export const badgeVariants = cva(
  cn(
    "border-2 select-none font-bold tracking-wide inline-flex items-center gap-1 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  ),
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-surface-950 text-surface-50 dark:bg-surface-50 dark:text-surface-950",
        brand: "border-transparent bg-brand-600 text-brand-50",
        surface: "border-transparent bg-surface-600 text-surface-50",
        danger: "border-transparent bg-red-600 text-red-50",
        outline:
          "border-2 border-surface-950 text-surface-950 dark:border-surface-50 dark:text-surface-50",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[0.5rem] uppercase",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-0.5 text-sm",
      },
      radius: {
        default: "",
        base: "rounded",
        full: "rounded-full",
      },
      transform: {
        default: "",
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
        normal: "normal-case",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "full",
      transform: "default",
    },
  }
);

interface Props
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  variant,
  size,
  radius,
  transform,
  className,
  children,
  ...props
}: Props) {
  return (
    <span
      className={cn(
        badgeVariants({
          variant,
          size,
          radius,
          transform,
          className,
        })
      )}
      {...props}
    >
      {children}
    </span>
  );
}
