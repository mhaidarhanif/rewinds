import { cva } from "class-variance-authority";

import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export const pageHeaderVariants = cva(
  "bg-surface-100 dark:bg-surface-800/20 sm:py-20",
  {
    variants: {
      size: {
        sm: "py-6 sm:py-10 mb-6",
        default: "py-12 sm:py-20 mb-12",
      },
      isTextCentered: {
        true: "text-center",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface Props
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {}

export function PageHeader({
  size,
  isTextCentered,
  className,
  children,
  ...props
}: Props) {
  return (
    <header
      className={cn(
        "mb-10 bg-surface-100 py-12 dark:bg-surface-800/20 sm:py-20",
        pageHeaderVariants({ size, isTextCentered, className })
      )}
      {...props}
    >
      <div className="contain space-y-2">{children}</div>
    </header>
  );
}
