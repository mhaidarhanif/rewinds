import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  cn(
    "select-none font-bold tracking-wide uppercase inline-flex items-center gap-1"
  ),
  {
    variants: {
      variant: {
        default: "text-white bg-brand-600",
        surface: "text-white bg-surface-600",
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
