import { buttonVariants } from "~/components";
import { cn } from "~/utils";

import type { VariantProps } from "class-variance-authority";

/**
 * Button Anchor
 *
 * Button with anchor element.
 */

export interface ButtonAnchorProps
  extends React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    VariantProps<typeof buttonVariants> {}

export const ButtonAnchor = ({
  href = "/",
  variant = "default",
  size = "default",
  accent = "default",
  align = "default",
  withIndicator = true,
  className,
  children,
  ...props
}: ButtonAnchorProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "flex cursor-pointer flex-wrap gap-2",
        withIndicator && "after:content-['_↗']",
        buttonVariants({
          variant,
          size,
          accent,
          align,
          isIcon: false,
          className,
        })
      )}
      {...props}
    >
      {children}
    </a>
  );
};
ButtonAnchor.displayName = "ButtonAnchor";
