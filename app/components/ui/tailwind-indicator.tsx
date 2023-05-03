import { useState } from "react";
import { ButtonIcon, Text } from "~/components";
import { configDev } from "~/configs";
import { X } from "~/icons";

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
  const [isVisible, setIsVisible] = useState(true);

  function handleCloseButton() {
    setIsVisible(false);
  }

  if (!isVisible) return null;
  if (!configDev.isDevelopment) return null;

  return (
    <div className="card-base bg-text-default fixed bottom-1 left-1 z-50 flex select-none rounded p-1 font-mono text-xs">
      <div className="queue-center-sm">
        <Text className="block sm:hidden">xs</Text>
        <Text className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </Text>
        <Text className="hidden md:block lg:hidden xl:hidden 2xl:hidden">
          md
        </Text>
        <Text className="hidden lg:block xl:hidden 2xl:hidden">lg</Text>
        <Text className="hidden xl:block 2xl:hidden">xl</Text>
        <Text className="hidden 2xl:block">2xl</Text>
        <ButtonIcon variant="ghost" size="xs" onClick={handleCloseButton}>
          <X className="size-xs" />
        </ButtonIcon>
      </div>
    </div>
  );
}
