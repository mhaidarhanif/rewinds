import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { forwardRef } from "react";

import { cn } from "~/utils";

/**
 * Hover Card
 *
 * For sighted users to preview content available behind a link.
 */

export const HoverCard = HoverCardPrimitive.Root;

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border border-surface-100 bg-white p-4 shadow-md outline-none animate-in zoom-in-90 dark:border-surface-800 dark:bg-surface-800",
      className
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
