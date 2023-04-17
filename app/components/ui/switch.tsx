import * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";

import { cn } from "~/utils";

/**
 * Switch
 *
 * A control that allows the user to toggle between checked and not checked.
 */

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-surface-900 data-[state=unchecked]:bg-surface-200 dark:focus-visible:ring-surface-400 dark:focus-visible:ring-offset-surface-900 dark:data-[state=checked]:bg-surface-400 dark:data-[state=unchecked]:bg-surface-700",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "size-md pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;
