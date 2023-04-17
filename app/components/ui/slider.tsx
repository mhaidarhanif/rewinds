import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef } from "react";

import { cn } from "~/utils";

/**
 * Slider
 *
 * An input where the user selects a value from within a given range.
 */

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-200 dark:bg-surface-800">
      <SliderPrimitive.Range className="absolute h-full bg-surface-900  dark:bg-surface-400" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="size-md block rounded-full border-2 border-surface-900 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-surface-100 dark:bg-surface-400 dark:focus-visible:ring-surface-400 dark:focus-visible:ring-offset-surface-900" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
