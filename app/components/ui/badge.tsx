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
    "select-none border font-bold tracking-wide inline-flex items-center gap-1 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 hover:bg-brand/80 text-brand-50 border-transparent",
        surface:
          "bg-surface-600 hover:bg-secondary/80 text-surface-50 border-transparent",
        desctructive:
          "bg-red hover:bg-secondary/80 text-red-500 border-transparent",
        outline: "text-500",
      },
      size: {
        xs: "text-xs",
        sm: "text-xs px-0.5 py-0.5",
        default: "text-xs px-1 py-0.5",
        lg: "text-sm px-3 py-2",
      },
      radius: {
        default: "rounded",
        full: "rounded-full",
      },
      transform: {
        default: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
        normal: "normal-case",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
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
