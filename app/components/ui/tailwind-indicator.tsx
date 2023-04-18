import { Text } from "~/components";

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
      <Text>dev:</Text>
      <Text className="block sm:hidden">xs</Text>
      <Text className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </Text>
      <Text className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</Text>
      <Text className="hidden lg:block xl:hidden 2xl:hidden">lg</Text>
      <Text className="hidden xl:block 2xl:hidden">xl</Text>
      <Text className="hidden 2xl:block">2xl</Text>
    </div>
  );
}
