import { Link as RemixLink, NavLink as RemixNavLink } from "@remix-run/react";

import { cn } from "~/utils";

import type { RemixLinkProps } from "@remix-run/react/dist/components";

/**
 * Remix Link + Text
 *
 * Reexport Link and NavLink component from Remix.
 * Also Link Text and NavLink Text with some default styles.
 */

export { RemixLink, RemixNavLink };

interface Props extends RemixLinkProps {
  disabled?: boolean;
}

export function RemixLinkText({ to, children, disabled, className }: Props) {
  return (
    <RemixLink
      to={to}
      className={cn(
        "prose-a-styles",
        disabled && "cursor-not-allowed opacity-80",
        className
      )}
    >
      {children}
    </RemixLink>
  );
}

export function RemixNavLinkText({ to, children, disabled, className }: Props) {
  return (
    <RemixNavLink
      to={to}
      className={cn(
        "flex items-center text-lg font-semibold text-surface-600 transition-colors hover:text-surface-900 dark:text-surface-100 dark:hover:text-surface-300 sm:text-sm",
        disabled && "cursor-not-allowed opacity-80",
        className
      )}
      end
    >
      {children}
    </RemixNavLink>
  );
}
