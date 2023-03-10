import { forwardRef } from "react";

import { cn } from "~/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bg-surface-50 dark:bg-surface-900",
          "flex h-20 w-full rounded-md border border-surface-300 py-2 px-3 text-sm placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-surface-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-700 dark:text-surface-50 dark:placeholder:text-surface-700 dark:focus:ring-surface-400 dark:focus:ring-offset-surface-900",
          className
        )}
        ref={ref}
        spellCheck="false"
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
