import * as Ariakit from "@ariakit/react";
import { cn } from "~/utils";

/**
 * Tooltip from Ariakit
 *
 * Display information related to an anchor element when
 * the element receives keyboard focus or the mouse hovers over it.
 * This component is based on the WAI-ARIA Tooltip Pattern
 * and has better mobile support than the Tooltip from Radix UI
 *
 * Docs:
 * - Ariakit Tooltip: https://ariakit.org/components/tooltip
 *
 * Alternatives:
 * - https://ui.shadcn.com/docs/components/tooltip
 * - https://radix-ui.com/docs/primitives/components/tooltip
 */

export function TooltipAuto({
  className,
  children,
  content,
}: {
  className?: string;
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}) {
  const tooltip = Ariakit.useTooltipStore();

  return (
    <>
      <Ariakit.TooltipAnchor store={tooltip}>{children}</Ariakit.TooltipAnchor>

      <Ariakit.Tooltip
        portal={false}
        store={tooltip}
        className={cn(
          "z-50 overflow-hidden px-2 py-1 text-base shadow animate-in fade-in-50",
          "rounded border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900",
          "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
          className
        )}
      >
        {content}
      </Ariakit.Tooltip>
    </>
  );
}
