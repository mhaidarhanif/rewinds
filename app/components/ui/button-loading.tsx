import { forwardRef } from "react";

import { buttonVariants } from "~/components";
import { Loader2 } from "~/icons";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isSubmitting: boolean;
  loadingText: React.ReactNode;
}

export const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      variant,
      accent,
      size,
      radius,
      className,
      isSubmitting,
      loadingText,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            accent,
            radius,
            size,
            className,
          })
        )}
        disabled={isSubmitting}
        ref={ref}
        {...props}
      >
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? loadingText : children}
      </button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";
