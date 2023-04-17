import { Badge } from "~/components";

/**
 * Tailwind Indicator
 *
 * Shows the currently active screen with responsive breakpoint.
 * Can be toggled in app/configs/dev.ts: debugScreens
 *
 * Similar with Tailwind CSS Debug Screens:
 * https://github.com/jorenvanhee/tailwindcss-debug-screens
 *
 * Inspirations:
 * - https://github.com/shadcn/taxonomy/blob/main/components/tailwind-indicator.tsx
 */

export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex select-none items-center justify-center rounded bg-brand-800 p-1 font-mono text-xs text-white">
      <Badge size="sm">dev:</Badge>
      <Badge size="sm" className="block sm:hidden">
        xs
      </Badge>
      <Badge
        size="sm"
        className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
      >
        sm
      </Badge>
      <Badge
        size="sm"
        className="hidden md:block lg:hidden xl:hidden 2xl:hidden"
      >
        md
      </Badge>
      <Badge size="sm" className="hidden lg:block xl:hidden 2xl:hidden">
        lg
      </Badge>
      <Badge size="sm" className="hidden xl:block 2xl:hidden">
        xl
      </Badge>
      <Badge size="sm" className="hidden 2xl:block">
        2xl
      </Badge>
    </div>
  );
}
