import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components";
import { configDev } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import { cn } from "~/utils";

/**
 * Debug
 *
 * Preformat code component to show debugging information.
 * Can be toggled in app/configs/dev.ts: debugComponent
 */

export function Debug({
  name = "unknown",
  isCollapsibleOpen = false,
  isAlwaysShow,
  className,
  children,
}: {
  name?: string;
  isCollapsibleOpen?: boolean;
  isAlwaysShow?: boolean;
  className?: string;
  children: string | any | unknown | null | undefined | React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(isCollapsibleOpen);

  const { ENV } = useRootLoaderData();

  if (!isAlwaysShow || (ENV && ENV.NODE_ENV === "production")) {
    return null;
  }

  if (configDev.features.debugComponent !== true) {
    return null;
  }

  return (
    <div className="my-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
        <CollapsibleTrigger asChild>
          <code className="code cursor-pointer text-xs">
            <span className="font-bold">DEBUG: {name}</span>
          </code>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <pre
            className={cn(
              "my-1 overflow-scroll rounded border border-brand-500 p-1 text-xs",
              "bg-white dark:bg-black",
              "whitespace-pre-wrap", // alternative: break-spaces
              className
            )}
          >
            {JSON.stringify(children, null, 2)}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
