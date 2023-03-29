import { forwardRef } from "react";

import { cn } from "~/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bg-white dark:bg-surface-900",
          "flex w-full rounded-md border-2 border-surface-300 px-3 py-2 text-sm placeholder:text-surface-400 focus:border-surface-300 focus:outline-none focus:ring-2 focus:ring-surface-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-surface-700 dark:text-surface-50 dark:placeholder:text-surface-700 dark:focus:ring-surface-400 dark:focus:ring-offset-surface-900",
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
