import { badgeVariants, RemixLink } from "~/components";
import { cn } from "~/utils";

import type { RemixLinkProps } from "@remix-run/react/dist/components";
import type { VariantProps } from "class-variance-authority";

/**
 * Badge Link
 *
 * Displays a badge with link to another route.
 */

export interface BadgeLinkProps
  extends RemixLinkProps,
    VariantProps<typeof badgeVariants> {}

export const BadgeLink = ({
  to = "/",
  variant = "default",
  size = "default",
  radius = "default",
  className,
  children,
  ...props
}: BadgeLinkProps) => {
  return (
    <RemixLink
      to={to}
      className={cn(
        badgeVariants({
          variant,
          size,
          radius,
          className,
        })
      )}
      {...props}
    >
      {children}
    </RemixLink>
  );
};
BadgeLink.displayName = "BadgeLink";
