import { cn } from "~/utils";

import type { ReactNode } from "react";

interface Props {
  className?: string;
  href: string;
  children: ReactNode;
  noIndicator?: boolean;
}

// Anchor without significant styles
export function Anchor({
  href = "/",
  noIndicator = false,
  className,
  children,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "min-h-tap min-w-tap cursor-pointer leading-[initial]",
        !noIndicator && "after:content-['_↗']", // TODO: change to SVG
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
