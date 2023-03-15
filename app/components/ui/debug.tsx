import { configDev } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import { cn } from "~/utils";

export function Debug({
  name,
  className,
  children,
}: {
  name?: string;
  className?: string;
  children: unknown;
}) {
  const { ENV } = useRootLoaderData();

  if (ENV && ENV.NODE_ENV === "production") {
    return null;
  }

  if (configDev.enableDebugComponent !== true) {
    return null;
  }

  return (
    <div className="my-1">
      {name && (
        <h6 className="text-xs ">
          <span className="font-bold">DEBUG: </span>
          <code>{name}</code>
        </h6>
      )}
      <pre
        className={cn(
          "my-1 overflow-scroll rounded border border-brand-500 p-1 text-xs",
          "bg-white dark:bg-black",
          className
        )}
      >
        {JSON.stringify(children, null, 2)}
      </pre>
    </div>
  );
}
