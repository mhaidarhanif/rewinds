import { cva } from "class-variance-authority";

import { configSite } from "~/configs";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const logoVariants = cva("flex items-center font-brand font-semibold", {
  variants: {
    size: {
      xs: "gap-1 text-xs sm:text-sm",
      sm: "gap-1 text-sm sm:text-base",
      default: "gap-1 text-lg sm:gap-2 sm:text-2xl",
      lg: "gap-2 text-xl sm:gap-3 sm:text-3xl",
    },
    accent: {
      default: "text-black dark:text-white",
      brand: "text-brand-600",
      muted: "text-surface-600 grayscale dark:text-surface-100",
    },
  },
  defaultVariants: {
    size: "default",
    accent: "default",
  },
});

export const logoImageVariants = cva("", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      default: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof logoVariants> {}

export function Logo({
  size = "default",
  accent = "default",
  className,
  ...props
}: Props) {
  return (
    <div className={cn(logoVariants({ size, accent, className }))} {...props}>
      <span className={cn(logoVariants({ size, accent, className }))}>
        <img
          src="/favicons/apple-touch-icon.png"
          alt="Logo"
          width={20}
          height={20}
          className={cn(logoImageVariants({ size }))}
        />
      </span>
      <span
        className={cn(
          "inline-block",
          logoVariants({ size, accent, className })
        )}
      >
        {configSite?.name}
      </span>
    </div>
  );
}
