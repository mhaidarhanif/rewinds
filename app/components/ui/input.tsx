import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "~/icons";
import { cn } from "~/utils";

import { Button } from "~/components";

/**
 * Input
 *
 * Displays a form input field or a component that looks like an input field.
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        spellCheck={false}
        className={cn(
          "bg-white dark:bg-surface-950",
          "rounded-md border-2 border-surface-100 focus-visible:border-surface-100 dark:border-surface-800",
          "focus-visible:ring-brand-600 dark:focus-visible:ring-brand-400",
          "flex h-10 w-full px-3 py-2 text-sm placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-surface-50 dark:placeholder:text-surface-700 dark:focus-visible:ring-offset-surface-900",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export function InputPassword({
  type = "password",
  placeholder = "Enter password",
  className,
  ...props
}: InputProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  function handleClick() {
    setIsShown(!isShown);
  }

  return (
    <div className="relative">
      <Input
        data-component="input-password"
        type={isShown ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <Button
        type="button"
        size="xs"
        variant="subtle"
        onClick={handleClick}
        className={cn(
          "height-[inherit] absolute inset-y-0 right-0 my-2 me-2 font-mono"
        )}
      >
        {isShown ? <EyeOff className="size-xs" /> : <Eye className="size-xs" />}
        <span>{isShown ? "Hide" : "Show"}</span>
      </Button>
    </div>
  );
}
