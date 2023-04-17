import { forwardRef } from "react";

import { buttonVariants } from "~/components";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Button Icon
 *
 * Button with icon content.
 */

export interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ variant, accent, size, radius, className, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            accent,
            radius,
            size,
            isIcon: true,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonIcon.displayName = "ButtonIcon";
