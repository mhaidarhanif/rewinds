import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Progress
 *
 * Displays an indicator showing the completion progress of a task,
 * typically displayed as a progress bar.
 */

export const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-800",
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-4",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface ProgressProps
  extends ProgressPrimitive.ProgressProps,
    VariantProps<typeof progressVariants> {
  hasGradient?: boolean;
}

export const Progress = ({
  value = 0,
  size = "default",
  hasGradient = false,
  className,
  ...props
}: ProgressProps) => (
  <ProgressPrimitive.Root
    className={cn(progressVariants({ size, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all",
        !hasGradient && "bg-surface-600 dark:bg-surface-400",
        hasGradient &&
          "bg-gradient-to-r from-surface-500 from-10% via-brand-500 via-30% to-teal-500 to-60%"
      )}
      style={{ transform: `translateX(-${100 - Number(value)}%)` }}
    />
  </ProgressPrimitive.Root>
);
Progress.displayName = ProgressPrimitive.Root.displayName;
