import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { forwardRef } from "react";

import { cn } from "~/utils";

/**
 * Separator or Divider
 *
 * Visually or semantically separates or divides content.
 */

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-surface-200 dark:bg-surface-700",
        orientation === "horizontal" ? "h-0.5 w-full" : "h-full w-0.5",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
