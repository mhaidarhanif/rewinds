import { buttonVariants, RemixLink } from "~/components";
import { cn } from "~/utils";

import type { RemixLinkProps } from "@remix-run/react/dist/components";
import type { VariantProps } from "class-variance-authority";

/**
 * Button Link
 *
 * Button with Link component.
 */

export interface ButtonLinkProps
  extends RemixLinkProps,
    VariantProps<typeof buttonVariants> {}

export const ButtonLink = ({
  to = "/",
  variant = "default",
  accent = "default",
  size = "default",
  align = "default",
  radius = "default",
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <RemixLink
      to={to}
      className={cn(
        buttonVariants({
          variant,
          accent,
          size,
          align,
          radius,
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
  accent = "default",
  size = "default",
  align = "default",
  radius = "default",
  isIcon,
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
          accent,
          size,
          align,
          radius,
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

export interface ButtonLinkIconProps
  extends RemixLinkProps,
    VariantProps<typeof buttonVariants> {}

export const ButtonLinkIcon = ({
  to = "/",
  variant = "default",
  accent = "default",
  size = "default",
  align = "default",
  radius = "default",
  className,
  children,
  ...props
}: ButtonLinkIconProps) => {
  return (
    <RemixLink
      to={to}
      className={cn(
        buttonVariants({
          variant,
          accent,
          size,
          align,
          radius,
          isIcon: true,
          className,
        })
      )}
      {...props}
    >
      {children}
    </RemixLink>
  );
};
ButtonLinkIcon.displayName = "ButtonLinkIcon";
