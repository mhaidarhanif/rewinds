import { forwardRef } from "react";

import { buttonVariants } from "~/components";
import { Loader2 } from "~/icons";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Button Loading
 *
 * Button with loading indicator props.
 */

export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isSubmitting: boolean;
  loadingText: React.ReactNode;
}

export const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      type = "button",
      variant = "default",
      accent = "default",
      size = "default",
      weight = "default",
      radius = "default",
      align = "default",
      className,
      children,
      isSubmitting,
      loadingText,
      name,
      value,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        disabled={isSubmitting}
        className={cn(
          buttonVariants({
            variant,
            accent,
            size,
            weight,
            radius,
            align,
            isIcon: false,
            className,
          })
        )}
        name={name}
        value={value}
        {...props}
      >
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? loadingText : children}
      </button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";
