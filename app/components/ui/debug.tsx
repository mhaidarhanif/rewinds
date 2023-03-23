import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  TextCode,
} from "~/components";
import { configDev } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import { cn } from "~/utils";

export function Debug({
  name = "unknown",
  isCollapsibleOpen = false,
  className,
  children,
}: {
  name?: string;
  isCollapsibleOpen?: boolean;
  className?: string;
  children: unknown;
}) {
  const [isOpen, setIsOpen] = useState(isCollapsibleOpen);

  const { ENV } = useRootLoaderData();

  if (ENV && ENV.NODE_ENV === "production") {
    return null;
  }

  if (configDev.features.debugComponent !== true) {
    return null;
  }

  return (
    <div className="my-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
        <CollapsibleTrigger asChild>
          <TextCode className="cursor-pointer text-xs">
            <span className="font-bold">DEBUG: </span>
            <code>{name}</code>
          </TextCode>
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
