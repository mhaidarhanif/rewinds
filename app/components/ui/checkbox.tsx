import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef } from "react";

import { Check } from "~/icons";
import { cn } from "~/utils";

/**
 * Checkbox
 *
 * A control that allows the user to toggle between checked and not checked.
 */

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "size-sm peer shrink-0 rounded-sm border border-surface-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-700 dark:text-surface-50 dark:focus-visible:ring-surface-400 dark:focus-visible:ring-offset-surface-900",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center")}
    >
      <Check className="size-sm" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
