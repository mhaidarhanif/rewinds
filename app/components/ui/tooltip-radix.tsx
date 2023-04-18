import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

import { cn } from "~/utils";

/**
 * Tooltip from Radix UI
 *
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 *
 * Docs:
 * - https://ui.shadcn.com/docs/components/tooltip
 * - https://radix-ui.com/docs/primitives/components/tooltip
 *
 * Alternatives:
 * - Ariakit Tooltip: https://ariakit.org/components/tooltip
 */

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = ({ ...props }) => <TooltipPrimitive.Root {...props} />;
Tooltip.displayName = TooltipPrimitive.Tooltip.displayName;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden px-2 py-1 text-sm shadow animate-in fade-in-50",
      "rounded border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900",
      "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export function TooltipAutoRadix({
  className,
  children,
  content,
  side,
}: {
  className?: string;
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}) {
  return (
    <Tooltip className={className}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
}
