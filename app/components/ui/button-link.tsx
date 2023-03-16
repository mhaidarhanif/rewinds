import { buttonVariants, RemixLink } from "~/components";
import { cn } from "~/utils";

import type { RemixLinkProps } from "@remix-run/react/dist/components";
import type { VariantProps } from "class-variance-authority";

export interface ButtonLinkProps
  extends RemixLinkProps,
    VariantProps<typeof buttonVariants> {}

export const ButtonLink = ({
  to = "/",
  variant = "default",
  size = "default",
  align = "default",
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <RemixLink
      to={to}
      className={cn(
        "inline-flex gap-2",
        buttonVariants({
          variant,
          size,
          align,
          isIcon: false,
          className,
        })
      )}
      {...props}
    >
      {children}
    </RemixLink>
  );
};
ButtonLink.displayName = "ButtonLink";

export interface ButtonNavLinkProps
  extends RemixLinkProps,
    VariantProps<typeof buttonVariants> {}

export const ButtonNavLink = ({
  to = "/",
  variant = "default",
  size = "default",
  align = "default",
  className,
  children,
  ...props
}: ButtonNavLinkProps) => {
  return (
    <RemixLink
      to={to}
      className={cn(
        buttonVariants({
          variant,
          size,
          align,
          isIcon: false,
          className,
        })
      )}
      {...props}
    >
      {children}
    </RemixLink>
  );
};
ButtonNavLink.displayName = "ButtonNavLink";
