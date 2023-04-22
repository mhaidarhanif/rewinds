import { useState } from "react";

import {
  ButtonIcon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components";
import { configDev } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import { X } from "~/icons";
import { cn, jsonStringify } from "~/utils";

/**
 * Debug
 *
 * Preformat code component to show debugging information.
 * Can be toggled in app/configs/dev.ts: debugComponent
 */

export function Debug({
  name = "unknown",
  isCollapsibleOpen = false,
  isAlwaysShow = false,
  className,
  children,
}: {
  name?: string;
  isCollapsibleOpen?: boolean;
  isAlwaysShow?: boolean;
  className?: string;
  children: string | any | unknown | null | undefined | React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(isCollapsibleOpen);

  const { ENV } = useRootLoaderData();

  function handleCloseButton() {
    setIsVisible(false);
  }

  if (!isAlwaysShow && ENV && ENV.NODE_ENV === "production") {
    return null;
  }

  if (configDev.features.debugComponent !== true) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="my-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
        <CollapsibleTrigger asChild>
          <span className="code inline-flex cursor-pointer items-center gap-2 py-0 ps-2 text-xs">
            <code className="font-bold">DEBUG: {name}</code>
            <ButtonIcon variant="ghost" size="xs" onClick={handleCloseButton}>
              <X className="size-xs" />
            </ButtonIcon>
          </span>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <pre
            className={cn(
              "my-1 overflow-scroll rounded border p-1 text-xs",
              "border-surface-200 bg-white dark:border-surface-800 dark:bg-black",
              "whitespace-pre-wrap", // alternative: break-spaces
              className
            )}
          >
            {jsonStringify(children)}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
