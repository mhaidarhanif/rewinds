import { buttonVariants } from "~/components";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Button Icon Anchor
 *
 * Button with both icon content and anchor element.
 */

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
  withIndicator = false,
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
