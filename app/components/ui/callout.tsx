import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

/**
 * Callout
 *
 * Displays a callout for user attention.
 *
 * Docs:
 * - https://ui.shadcn.com/docs/components/alert
 */

export const calloutVariants = cva(
  "relative w-full rounded-md border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-surface-950 dark:[&>svg]:text-surface-50",
  {
    variants: {
      variant: {
        default:
          "bg-surface-50 text-surface-950 dark:bg-surface-950 dark:text-surface-50",
        destructive:
          "border-red-700/50 text-red-700 dark:border-red-700 [&>svg]:text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Callout = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof calloutVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(calloutVariants({ variant }), className)}
    {...props}
  />
));
Callout.displayName = "Callout";

export const CalloutTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
CalloutTitle.displayName = "CalloutTitle";

export const CalloutDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
CalloutDescription.displayName = "CalloutDescription";
