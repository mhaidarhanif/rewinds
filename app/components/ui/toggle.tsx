import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Toggle
 *
 * A two-state button that can be either on or off.
 */

export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-surface-200 dark:text-surface-100 dark:hover:bg-surface-800 dark:hover:text-surface-100 dark:focus-visible:ring-offset-surface-900  dark:data-[state=on]:bg-surface-700 dark:data-[state=on]:text-surface-100",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-surface-200 bg-transparent hover:bg-surface-100 dark:border-surface-700",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;
