import { cn } from "~/utils";

import type { ReactNode } from "react";

/**
 * Anchor
 *
 * Link to external URL
 */

interface Props {
  className?: string;
  href: string;
  children: ReactNode;
  withIndicator?: boolean;
}

// Anchor without significant styles
export function Anchor({
  href = "/",
  withIndicator = true,
  className,
  children,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "cursor-pointer leading-[initial]",
        withIndicator && "after:content-['_↗']",
        className
      )}
    >
      {children}
    </a>
  );
}

// Anchor with default styles from Prose config
export function AnchorText({ className, href, children }: Props) {
  return (
    <Anchor href={href} className={cn("prose-a-styles", className)}>
      {children}
    </Anchor>
  );
}
