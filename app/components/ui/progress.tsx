import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

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
    VariantProps<typeof progressVariants> {}

const Progress = ({ value = 0, size, className, ...props }: ProgressProps) => (
  <ProgressPrimitive.Root
    className={cn(progressVariants({ size, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all",
        // "bg-surface-900 dark:bg-surface-400",
        "from-10% via-30% to-90% bg-gradient-to-r from-surface-500 via-teal-500 to-brand-500"
      )}
      style={{ transform: `translateX(-${100 - Number(value)}%)` }}
    />
  </ProgressPrimitive.Root>
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
