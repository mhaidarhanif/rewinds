import { buttonVariants } from "~/components";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

export interface ButtonIconAnchorProps
  extends React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    VariantProps<typeof buttonVariants> {}

export const ButtonIconAnchor = ({
  href = "/",
  variant = "default",
  size = "default",
  accent = "default",
  noIndicator = false,
  className,
  children,
  ...props
}: ButtonIconAnchorProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "flex gap-2",
        buttonVariants({
          variant,
          size,
          accent,
          isIcon: true,
          className,
        })
      )}
      {...props}
    >
      {children}
    </a>
  );
};
ButtonIconAnchor.displayName = "ButtonIconAnchor";
