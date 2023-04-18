import { cn } from "~/utils"

/**
 * Skeleton
 *
 * Use to show a placeholder while content is loading.
 *
 * Docs:
 * - https://ui.shadcn.com/docs/components/skeleton
 */

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}
