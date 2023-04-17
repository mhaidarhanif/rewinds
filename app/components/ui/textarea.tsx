import { forwardRef } from "react";

import { cn } from "~/utils";

/**
 * Textarea
 *
 * Displays a form textarea or a component that looks like a textarea.
 */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bg-white dark:bg-surface-950",
          "rounded-md border-2 border-surface-100 focus-visible:border-surface-100 dark:border-surface-800",
          "focus-visible:ring-brand-600 dark:focus-visible:ring-brand-400",
          "flex w-full px-3 py-2 text-sm placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-surface-50 dark:placeholder:text-surface-700 dark:focus-visible:ring-offset-surface-900",
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
